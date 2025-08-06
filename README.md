# Daily Dose of Quran

A beautiful web application that delivers daily Quranic verses with translations to users via email and SMS. Built with React.js, Node.js, and Supabase.

## Features

- 📖 Daily Quranic verses with authentic translations
- 🌍 Multi-language support (English, Arabic, Urdu, Bengali)
- 📧 Email and SMS delivery options
- ⏰ Customizable notification times
- 📱 Responsive design for all devices
- 🔒 Secure user registration and data management

## Tech Stack

### Frontend
- React.js 18
- Tailwind CSS
- React Router
- Axios for API calls
- React Hot Toast for notifications
- Lucide React for icons

### Backend
- Node.js with Express
- Supabase for database and authentication
- Joi for validation
- Helmet for security
- CORS enabled
- Rate limiting

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd DailyDoseOfQuran
```

2. Install dependencies for all packages:
```bash
npm run install-all
```

3. Set up Supabase:
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Create the users table (see Database Schema below)

4. Configure environment variables:
```bash
# In server directory
cp .env.example .env
# Edit .env with your Supabase credentials
```

5. Start the development servers:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Database Schema

Create the following table in your Supabase database:

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  preferences JSONB DEFAULT '{"language": "english", "notificationTime": "08:00"}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT users_contact_check CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_active ON users(is_active);
```

## API Endpoints

### User Registration
- `POST /api/users/register` - Register a new user
- `GET /api/users/:id/preferences` - Get user preferences
- `PUT /api/users/:id/preferences` - Update user preferences

### Health Check
- `GET /api/health` - Server health status

## Project Structure

```
DailyDoseOfQuran/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── index.css      # Tailwind styles
├── server/                # Node.js backend
│   ├── index.js          # Main server file
│   └── .env.example      # Environment variables template
└── package.json          # Root package.json
```

## Future Enhancements

- Integration with Quran API (https://quranapi.pages.dev)
- Email service integration (MailerSend recommended)
- SMS service integration
- User dashboard for managing preferences
- Unsubscribe functionality
- Daily verse scheduling system
- User analytics and engagement tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Quran API for providing authentic Quranic text and translations
- The Muslim community for inspiration and feedback
- All contributors who help make this project better

---

Made with ❤️ for the Muslim community
