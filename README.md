# 🚀 Innovator's Adda

**Connecting India's brightest minds across IITs and NITs**

A full-stack platform that breaks down the digital divide between premier engineering institutes, enabling students to find co-founders, collaborate on research, form competition teams, and build the next generation of startups together.

---

## ✨ Features

### Core Features
- ✅ **User Registration & Login** - Secure authentication with localStorage persistence
- ✅ **Email Verification** - Institute email validation (.ac.in domains from IIT/NIT/IIIT/BITS)
- ✅ **User Profiles** - Showcase skills, interests, projects, and institute details
- ✅ **Project Board** - Post ideas, research proposals, and startup concepts
- ✅ **Advanced Search** - Find students by skills, institute, or interests
- ✅ **Internal Messaging** - Direct communication between users
- ✅ **Skill Endorsements** - Build credibility with peer endorsements

### Bonus Features
- 💡 **Tinder-Style Matching** - Swipe to match co-founders with projects
- 🏆 **Competition Teams** - Dedicated section for finding teammates for national competitions (SIH, Inter-IIT, etc.)
- 🎨 **GSAP Animated Background** - Beautiful particle animations and gradient overlays
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🎯 **Smart Filtering** - Filter projects by competition, research, or startup
- ⚡ **No Backend Required** - Runs entirely on dummy data with localStorage

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Animations**: GSAP (GreenSock Animation Platform)
- **Styling**: Custom CSS with modern design system
- **State Management**: React Hooks + localStorage
- **Data**: Dummy data (no backend/database needed)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project folder**
```bash
cd "d:\mukesh hackathon"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
The app will automatically open at `http://localhost:3000`

---

## 📱 Demo Accounts

Use these credentials to login and explore:

| Email | Institute | Branch |
|-------|-----------|--------|
| `rahul.sharma@iitd.ac.in` | IIT Delhi | Computer Science |
| `priya.patel@nitk.ac.in` | NIT Karnataka | Electronics |
| `arjun.singh@iitb.ac.in` | IIT Bombay | Mechanical |
| `sneha.gupta@nitt.ac.in` | NIT Trichy | Computer Science |
| `vikram.reddy@iitm.ac.in` | IIT Madras | Computer Science |

**Password**: Any password (authentication is simulated)

---

## 🎯 Key Pages

### 1. **Authentication**
- Login and registration with institute email verification
- Beautiful animated background
- Form validation

### 2. **Dashboard**
- Welcome section with quick actions
- Trending projects showcase
- Suggested connections
- Platform statistics

### 3. **Profile**
- View and edit your profile
- Skills with endorsement counts
- Interests and bio
- Projects showcase

### 4. **Project Board**
- Browse all projects
- Filter by category (Competition, Research, Startup)
- Search functionality
- Create new projects with detailed forms

### 5. **Search**
- Find students across all institutes
- Filter by institute and skills
- Endorse skills
- Connect with students

### 6. **Match (Tinder-Style)**
- Swipe left to pass, right to express interest
- See project details, author info, and required skills
- Keyboard shortcuts (← →)
- Match notifications

### 7. **Messaging**
- Internal chat system
- Conversation list with unread indicators
- Real-time messaging simulation
- Clean, modern UI

---

## 🎨 Design Highlights

- **Dark Theme** - Easy on the eyes for long coding sessions
- **Glassmorphism** - Modern card designs with backdrop blur
- **Animated Particles** - GSAP-powered background with floating particles and connections
- **Gradient Accents** - Beautiful purple/blue gradient throughout
- **Smooth Transitions** - Buttery smooth animations on all interactions
- **Responsive Grid Layouts** - Perfect on any screen size

---

## 📦 Project Structure

```
d:\mukesh hackathon\
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx              # App entry point
    ├── App.jsx               # Main app with routing
    ├── styles.css            # All styles
    ├── data/
    │   └── dummy.js          # Dummy users, projects, messages
    └── components/
        ├── Auth.jsx          # Login/Register
        ├── Dashboard.jsx     # Home page
        ├── Profile.jsx       # User profile
        ├── ProjectBoard.jsx  # Projects listing
        ├── Search.jsx        # User search
        ├── Messaging.jsx     # Chat interface
        ├── TinderMatch.jsx   # Swipe matching
        └── AnimatedBg.jsx    # GSAP background
```

---

## 🌟 Key Functionality

### Registration
1. Validates institute email (.ac.in domain)
2. Simulates email verification
3. Stores user data in localStorage
4. Auto-login after registration

### Projects
1. Browse all projects with filters
2. Create new projects with skills needed
3. Tag projects with competitions
4. Express interest in projects

### Matching
1. Swipe through projects
2. Right swipe = interested, Left swipe = pass
3. Tracks matches
4. Shows skill compatibility

### Search
1. Find users by name, skills, or interests
2. Filter by institute or specific skill
3. Endorse skills (increases credibility)
4. Connect via messaging

---

## 🎯 Future Enhancements

- Real backend with authentication
- Database integration (MongoDB/PostgreSQL)
- Real-time chat with WebSockets
- Email notifications
- File uploads for project attachments
- Video call integration
- Advanced analytics dashboard
- Mobile app (React Native)

---

## 🐛 Known Limitations

- All data is dummy/mock data
- No persistent storage (uses localStorage)
- Messaging is simulated (not real-time)
- No actual email verification
- Limited to 5 demo users and 7 projects

---

## 📝 Scripts

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🤝 Contributing

This is a hackathon project. Feel free to fork and enhance!

---

## 📄 License

MIT License - Feel free to use this project for learning or as a starting point for your own platform.

---

## 👥 Credits

- **Design**: Custom design system inspired by modern UI trends
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Emoji-based icons for fun and clarity

---

## 💡 Tips

1. **Explore Demo Accounts**: Login with different demo accounts to see varied profiles
2. **Try Matching**: Go to the Match page and swipe through projects
3. **Create a Project**: Use the Project Board to post your own idea
4. **Endorse Skills**: Search for users and endorse their skills
5. **Send Messages**: Connect with other innovators via messaging

---

**Built with ❤️ for India's top engineering talent**

🚀 **Start connecting. Start innovating. Start building the future!**
