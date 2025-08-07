import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Heart, Users, Clock, Mail, Phone, Star, Sparkles, Moon, Sun } from 'lucide-react';
import VerseCard from '../components/VerseCard';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-sage-700" />,
      title: "Daily Verses",
      description: "Receive beautiful Quranic verses every day with authentic translations"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Spiritual Growth",
      description: "Strengthen your connection with Allah through daily reflection"
    },
    {
      icon: <Users className="w-8 h-8 text-sage-600" />,
      title: "Community",
      description: "Join thousands of believers in their daily spiritual journey"
    },
    {
      icon: <Clock className="w-8 h-8 text-accent-600" />,
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
    <div className="min-h-screen gradient-primary">
      {/* Header */}
      <header className="relative overflow-hidden section-padding">
        <div className="islamic-pattern absolute inset-0 opacity-20"></div>
        <div className="relative max-w-7xl mx-auto container-padding">
          <div className="text-center">
            <div className="flex justify-center items-center mb-8">
              <div className="bg-sage-800 p-6 rounded-3xl shadow-large animate-float">
                <BookOpen className="w-12 h-12 text-cream-50" />
              </div>
            </div>
            <h1 className="heading-display heading-responsive mb-6">
              Daily Dose of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-700 to-sage-900">
                Quran
              </span>
            </h1>
            <p className="text-responsive text-body mb-8 max-w-3xl mx-auto leading-relaxed">
              Start each day with divine guidance. Receive beautiful Quranic verses with translations 
              delivered directly to your inbox or phone, helping you stay connected to your faith.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/register')}
                className="btn-primary text-lg px-8 py-4 shadow-large hover:shadow-large transform hover:-translate-y-1 transition-all duration-300"
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
      <section className="section-padding bg-cream-50/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl mb-4">Today's Inspiration</h2>
            <p className="text-muted text-lg">Here's an example of what you'll receive daily</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <VerseCard
              arabicText="وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا"
              translation="And whoever fears Allah - He will make for him a way out."
              surah="Surah At-Talaq"
              ayah="65:2"
              variant="accent"
              showIcon={false}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-display text-4xl mb-4">Why Choose Daily Dose of Quran?</h2>
            <p className="text-responsive text-body max-w-2xl mx-auto">
              Experience the beauty and wisdom of the Quran in your daily life
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-hover text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-center mb-6">
                  <div className="bg-sage-100 p-4 rounded-2xl">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="heading-display text-xl mb-3">{feature.title}</h3>
                <p className="text-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding gradient-sage">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-display text-4xl mb-4">How It Works</h2>
            <p className="text-responsive text-body">Simple steps to start your spiritual journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-slide-up">
              <div className="bg-sage-800 text-cream-50 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-medium">
                1
              </div>
              <h3 className="heading-display text-xl mb-3">Sign Up</h3>
              <p className="text-body">Register with your name and preferred contact method (email or phone)</p>
            </div>
            
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-sage-800 text-cream-50 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-medium">
                2
              </div>
              <h3 className="heading-display text-xl mb-3">Customize</h3>
              <p className="text-body">Choose your preferred language and time to receive daily verses</p>
            </div>
            
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-sage-800 text-cream-50 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-medium">
                3
              </div>
              <h3 className="heading-display text-xl mb-3">Receive & Reflect</h3>
              <p className="text-body">Get beautiful verses daily and let them guide your spiritual growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-cream-50/30">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-display text-4xl mb-4">What Our Community Says</h2>
            <p className="text-responsive text-body">Join thousands of believers who trust us with their daily inspiration</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-hover animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-500 fill-current" />
                  ))}
                </div>
                <p className="text-body mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold text-sage-900">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-accent">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="heading-display text-4xl mb-6 text-sage-900">Ready to Begin Your Spiritual Journey?</h2>
          <p className="text-responsive text-sage-800 mb-8 opacity-90">
            Join our community and receive daily inspiration from the Holy Quran
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-sage-900 text-cream-50 hover:bg-sage-800 font-medium py-4 px-8 rounded-xl transition-all duration-300 text-lg shadow-large hover:shadow-large transform hover:-translate-y-1"
            >
              Get Started Now
            </button>
            <div className="flex items-center gap-6 text-sm text-sage-700 opacity-75">
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
      <footer className="bg-sage-900 text-cream-50 py-12">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-sage-700 p-3 rounded-full">
                <BookOpen className="w-8 h-8 text-cream-50" />
              </div>
            </div>
            <h3 className="heading-display text-2xl mb-4 text-cream-50">Daily Dose of Quran</h3>
            <p className="text-sage-300 mb-6 max-w-2xl mx-auto">
              Bringing the wisdom and beauty of the Holy Quran to your daily life through 
              carefully curated verses and authentic translations.
            </p>
            <div className="text-sm text-sage-400">
              © 2024 Daily Dose of Quran. Made with ❤️ for the Muslim community.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
