import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mail, User, ArrowLeft, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="card text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to the Community!</h2>
            <p className="text-gray-600 mb-6">
              Your registration was successful. You'll start receiving your daily dose of Quranic wisdom soon.
            </p>
            <div className="bg-primary-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-primary-700">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">Daily Dose of Quran</span>
            </div>
          </div>
        </div>
      </header>

      {/* Registration Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Community</h1>
          <p className="text-xl text-gray-600">
            Start your spiritual journey with daily Quranic verses and translations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card animate-slide-up">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary-600" />
                Personal Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary-600" />
                Contact Information
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Provide at least one contact method to receive your daily verses
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
            <div className="bg-gradient-to-r from-primary-50 to-indigo-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Preview: What you'll receive</h4>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="arabic-text text-2xl text-gray-800 mb-3">
                  وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
                </div>
                <div className="text-gray-700 mb-2 italic">
                  "And whoever fears Allah - He will make for him a way out."
                </div>
                <div className="text-sm text-gray-500">
                  Surah At-Talaq (65:2)
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`btn-primary w-full text-lg py-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-1'} transition-all duration-200`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Your Account...</span>
                </div>
              ) : (
                'Start My Spiritual Journey'
              )}
            </button>

            {/* Terms */}
            <p className="text-sm text-gray-500 text-center">
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
