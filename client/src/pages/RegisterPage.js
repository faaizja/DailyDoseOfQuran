import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mail, User, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import VerseCard from '../components/VerseCard';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!formData.email.trim() && !formData.phone.trim()) {
      toast.error('Please provide either an email address or phone number');
      return;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (formData.phone && !/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/api/users/register', {
        name: formData.name.trim(),
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined
      });

      if (response.data.success) {
        setIsSuccess(true);
        toast.success('Registration successful! Welcome to Daily Dose of Quran!');
        
        // Redirect to home page after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen gradient-primary flex items-center justify-center container-padding">
        <div className="max-w-md w-full">
          <div className="card-glass text-center animate-scale-in">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-2xl">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h2 className="heading-display text-2xl mb-4">Welcome to the Community!</h2>
            <p className="text-body mb-6">
              Your registration was successful. You'll start receiving your daily dose of Quranic wisdom soon.
            </p>
            <div className="bg-sage-50 p-4 rounded-xl mb-6">
              <p className="text-sm text-sage-700">
                <strong>Next Steps:</strong> You'll start receiving your daily dose of Quranic wisdom soon. We'll send beautiful verses with translations to help guide your spiritual journey.
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="btn-primary w-full"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-primary">
      {/* Header */}
      <header className="glass border-b border-sage-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto container-padding py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sage-700 hover:text-sage-900 transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-sage-800 p-2 rounded-xl">
                <BookOpen className="w-6 h-6 text-cream-50" />
              </div>
              <span className="heading-display text-xl text-sage-900">Daily Dose of Quran</span>
            </div>
          </div>
        </div>
      </header>

      {/* Registration Form */}
      <div className="max-w-2xl mx-auto container-padding py-12">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-accent-100 p-4 rounded-2xl">
              <Sparkles className="w-8 h-8 text-accent-600" />
            </div>
          </div>
          <h1 className="heading-display text-4xl mb-4">Join Our Community</h1>
          <p className="text-responsive text-body">
            Start your spiritual journey with daily Quranic verses and translations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-glass animate-slide-up">
          <div className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-sage-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-sage-600" />
                Personal Information
              </h3>
              
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-sage-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-sage-600" />
                Contact Information
              </h3>
              <p className="text-sm text-muted mb-4">
                Provide at least one contact method to receive your daily verses
              </p>
              
              <div className="space-y-4">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Sample Preview */}
            <div className="gradient-accent p-6 rounded-xl">
              <h4 className="font-semibold text-sage-900 mb-3">Preview: What you'll receive</h4>
              <VerseCard
                arabicText="وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا"
                translation="And whoever fears Allah - He will make for him a way out."
                surah="Surah At-Talaq"
                ayah="65:2"
                variant="simple"
                showIcon={false}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`btn-primary w-full text-lg py-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-large transform hover:-translate-y-1'} transition-all duration-300`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="loading-spinner"></div>
                  <span>Creating Your Account...</span>
                </div>
              ) : (
                'Start My Spiritual Journey'
              )}
            </button>

            {/* Terms */}
            <p className="text-sm text-muted text-center">
              By registering, you agree to receive daily Quranic verses and acknowledge that you can 
              unsubscribe at any time. We respect your privacy and will never share your information.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
