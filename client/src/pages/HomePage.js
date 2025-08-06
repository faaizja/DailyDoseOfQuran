import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Heart, Users, Clock, Mail, Phone, Star } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary-600" />,
      title: "Daily Verses",
      description: "Receive beautiful Quranic verses every day with authentic translations"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Spiritual Growth",
      description: "Strengthen your connection with Allah through daily reflection"
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Community",
      description: "Join thousands of believers in their daily spiritual journey"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Perfect Timing",
      description: "Choose your preferred time to receive your daily dose of wisdom"
    }
  ];

  const testimonials = [
    {
      name: "Aisha Rahman",
      text: "This app has transformed my daily routine. Starting each day with a verse brings me peace and guidance.",
      rating: 5
    },
    {
      name: "Omar Hassan",
      text: "Beautiful interface and authentic translations. It's like having a daily reminder from Allah.",
      rating: 5
    },
    {
      name: "Fatima Ali",
      text: "I love how I can receive verses both via email and SMS. Very convenient and spiritually uplifting.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="islamic-pattern absolute inset-0 opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-primary-600 p-4 rounded-full shadow-lg">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Daily Dose of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                Quran
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Start each day with divine guidance. Receive beautiful Quranic verses with translations 
              delivered directly to your inbox or phone, helping you stay connected to your faith.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/register')}
                className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                Start Your Journey
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sample Verse Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Today's Inspiration</h2>
            <p className="text-gray-600">Here's an example of what you'll receive daily</p>
          </div>
          
          <div className="card max-w-3xl mx-auto">
            <div className="text-center">
              <div className="arabic-text text-3xl md:text-4xl text-gray-800 mb-6 leading-loose">
                وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
              </div>
              <div className="text-lg text-gray-700 mb-4 italic">
                "And whoever fears Allah - He will make for him a way out."
              </div>
              <div className="text-sm text-gray-500 border-t pt-4">
                Surah At-Talaq (65:2)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Daily Dose of Quran?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the beauty and wisdom of the Quran in your daily life
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start your spiritual journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sign Up</h3>
              <p className="text-gray-600">Register with your name and preferred contact method (email or phone)</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customize</h3>
              <p className="text-gray-600">Choose your preferred language and time to receive daily verses</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Receive & Reflect</h3>
              <p className="text-gray-600">Get beautiful verses daily and let them guide your spiritual growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600">Join thousands of believers who trust us with their daily inspiration</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Spiritual Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community and receive daily inspiration from the Holy Quran
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-4 px-8 rounded-lg transition-colors duration-200 text-lg shadow-lg"
            >
              Get Started Now
            </button>
            <div className="flex items-center gap-6 text-sm opacity-75">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Email Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>SMS Option</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-primary-600 p-3 rounded-full">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Daily Dose of Quran</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Bringing the wisdom and beauty of the Holy Quran to your daily life through 
              carefully curated verses and authentic translations.
            </p>
            <div className="text-sm text-gray-500">
              © 2024 Daily Dose of Quran. Made with ❤️ for the Muslim community.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
