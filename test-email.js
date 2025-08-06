const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const emailjs = require('@emailjs/nodejs');
require('dotenv').config();

// Initialize Email.js
emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

// Quran API base URL
const QURAN_API_BASE = 'https://quranapi.pages.dev/api';

const getRandomVerse = async () => {
  try {
    const randomSurah = Math.floor(Math.random() * 114) + 1;
    const maxAyah = randomSurah === 1 ? 7 : (randomSurah === 2 ? 286 : 200);
    const randomAyah = Math.floor(Math.random() * Math.min(maxAyah, 50)) + 1;
    
    const response = await axios.get(`${QURAN_API_BASE}/${randomSurah}/${randomAyah}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching random verse:', error);
    try {
      const response = await axios.get(`${QURAN_API_BASE}/1/2.json`);
      return response.data;
    } catch (fallbackError) {
      console.error('Error fetching fallback verse:', fallbackError);
      return null;
    }
  }
};

const sendTestEmail = async () => {
  try {
    const testEmail = process.env.TEST_EMAIL;
    const testName = "Test User";
    
    if (!testEmail) {
      throw new Error("TEST_EMAIL environment variable not set");
    }

    const verseData = await getRandomVerse();
    if (!verseData) {
      throw new Error("Failed to fetch verse data");
    }

    const today = new Date();
    const templateParams = {
      to_name: testName,
      to_email: testEmail,
      subject: `🌅 Daily Quran Verse - ${verseData.surahName} ${verseData.surahNo}:${verseData.ayahNo}`,
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
      unsubscribe_link: `${process.env.CLIENT_URL || 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(testEmail)}`,
      preferences_link: `${process.env.CLIENT_URL || 'http://localhost:3000'}/preferences`,
      current_year: today.getFullYear()
    };

    console.log("Sending test email to:", testEmail);
    console.log("Verse:", `${verseData.surahName} ${verseData.surahNo}:${verseData.ayahNo}`);

    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Email sent successfully!', response);
  } catch (error) {
    console.error('❌ Error sending test email:', error);
  }
};

// Execute the test
sendTestEmail();