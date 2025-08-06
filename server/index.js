const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@supabase/supabase-js');
const Joi = require('joi');
const axios = require('axios');
const cron = require('node-cron');
const emailjs = require('@emailjs/nodejs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Initialize Email.js
emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

// Quran API base URL
const QURAN_API_BASE = 'https://quranapi.pages.dev/api';

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Validation schemas
const userRegistrationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional()
}).or('email', 'phone'); // At least one of email or phone is required

// Quran API Service Functions
const getRandomVerse = async () => {
  try {
    // Generate random surah (1-114) and ayah
    const randomSurah = Math.floor(Math.random() * 114) + 1;
    
    // For simplicity, we'll use a reasonable range for ayah numbers
    const maxAyah = randomSurah === 1 ? 7 : (randomSurah === 2 ? 286 : 200);
    const randomAyah = Math.floor(Math.random() * Math.min(maxAyah, 50)) + 1;
    
    const response = await axios.get(`${QURAN_API_BASE}/${randomSurah}/${randomAyah}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching random verse:', error);
    // Fallback to a known verse (Al-Fatiha 1:2)
    try {
      const response = await axios.get(`${QURAN_API_BASE}/1/2.json`);
      return response.data;
    } catch (fallbackError) {
      console.error('Error fetching fallback verse:', fallbackError);
      return null;
    }
  }
};

const getSpecificVerse = async (surahNo, ayahNo) => {
  try {
    const response = await axios.get(`${QURAN_API_BASE}/${surahNo}/${ayahNo}.json`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching verse ${surahNo}:${ayahNo}:`, error);
    return null;
  }
};

const sendDailyVerseEmail = async (userEmail, userName, verseData) => {
  try {
    if (!verseData) {
      console.error('No verse data provided for email');
      return false;
    }

    const today = new Date();
    const templateParams = {
      to_name: userName,
      to_email: userEmail,
      subject: ` Daily Quran Verse - ${verseData.surahName} ${verseData.surahNo}:${verseData.ayahNo}`,
      arabic1: verseData.arabic1,
      english: verseData.english,
      surahName: verseData.surahName,
      surahNameTranslation: verseData.surahNameTranslation,
      surahNo: verseData.surahNo,
      ayahNo: verseData.ayahNo,
      today_date: today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      unsubscribe_link: `${process.env.CLIENT_URL || 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(userEmail)}`,
      preferences_link: `${process.env.CLIENT_URL || 'http://localhost:3000'}/preferences`,
      current_year: today.getFullYear()
    };

    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully to:', userEmail);
    return true;
  } catch (error) {
    console.error('Error sending email to', userEmail, ':', error);
    return false;
  }
};

const sendDailyVersesToAllUsers = async () => {
  try {
    console.log('🕐 Starting daily verse email job...');
    
    // Get all active users with email addresses
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('is_active', true)
      .not('email', 'is', null);

    if (error) {
      console.error('Error fetching users:', error);
      return;
    }

    if (!users || users.length === 0) {
      console.log('No users found with email addresses');
      return;
    }

    // Get today's verse
    const verseData = await getRandomVerse();
    if (!verseData) {
      console.error('Failed to fetch verse data');
      return;
    }

    console.log(`📖 Sending verse ${verseData.surahName} ${verseData.surahNo}:${verseData.ayahNo} to ${users.length} users`);

    // Send emails to all users
    let successCount = 0;
    let failCount = 0;

    for (const user of users) {
      const success = await sendDailyVerseEmail(user.email, user.name, verseData);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
      
      // Add small delay between emails to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`✅ Daily verse email job completed: ${successCount} sent, ${failCount} failed`);
  } catch (error) {
    console.error('Error in daily verse email job:', error);
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Daily Dose of Quran API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/verses/random', async (req, res) => {
  try {
    const verseData = await getRandomVerse();
    if (!verseData) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch random verse'
      });
    }

    res.json({
      success: true,
      data: verseData
    });
  } catch (error) {
    console.error('Random verse endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.get('/api/verses/:surahNo/:ayahNo', async (req, res) => {
  try {
    const { surahNo, ayahNo } = req.params;
    
    if (!surahNo || !ayahNo || isNaN(surahNo) || isNaN(ayahNo)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid surah or ayah number'
      });
    }

    const verseData = await getSpecificVerse(parseInt(surahNo), parseInt(ayahNo));
    if (!verseData) {
      return res.status(404).json({
        success: false,
        message: 'Verse not found'
      });
    }

    res.json({
      success: true,
      data: verseData
    });
  } catch (error) {
    console.error('Specific verse endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.post('/api/users/register', async (req, res) => {
  try {
    const { error, value } = userRegistrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details[0].message
      });
    }

    const { name, email, phone } = value;

    let existingUser = null;
    if (email) {
      const { data } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();
      existingUser = data;
    }

    if (!existingUser && phone) {
      const { data } = await supabase
        .from('users')
        .select('id')
        .eq('phone', phone)
        .single();
      existingUser = data;
    }

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email or phone number'
      });
    }

    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{
        name,
        email: email || null,
        phone: phone || null,
        is_active: true,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Database error:', insertError);
      return res.status(500).json({
        success: false,
        message: 'Failed to register user'
      });
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Schedule daily verse emails (runs every day at 8:00 AM)
cron.schedule('0 8 * * *', () => {
  console.log('⏰ Running scheduled daily verse email job...');
  sendDailyVersesToAllUsers();
}, {
  timezone: 'UTC'
});

app.listen(PORT, () => {
  console.log(`🚀 Daily Dose of Quran server running on port ${PORT}`);
  console.log(`📖 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📧 Daily emails scheduled for 8:00 AM UTC`);
  console.log(`🌐 Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
});

module.exports = app;