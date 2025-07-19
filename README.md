# 🧠 MindFlow - AI Productivity & Wellbeing Companion

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen)](https://dashing-tanuki-43c910.netlify.app/)
[![Backend API](https://img.shields.io/badge/Backend%20API-Live-blue)](https://mindflow-backend-tk68.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-Netlify-00C7B7)](https://dashing-tanuki-43c910.netlify.app/)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7)](https://mindflow-backend-tk68.onrender.com)

> A comprehensive full-stack wellness and productivity tracking application that helps users manage their mental health, track tasks, and gain insights into their daily habits.

## 🚀 Live Demo

**🌐 Frontend:** [https://dashing-tanuki-43c910.netlify.app/](https://dashing-tanuki-43c910.netlify.app/)  
**🔗 Backend API:** [https://mindflow-backend-tk68.onrender.com](https://mindflow-backend-tk68.onrender.com)

## ✨ Key Features

### 🎯 Core Functionality
- **User Authentication** - Secure JWT-based login/signup system
- **Task Management** - Create, organize, and track tasks with priority levels
- **Wellness Tracking** - Monitor mood, stress levels, and wellness activities
- **Meditation Center** - Access guided meditation sessions and mindfulness features
- **Productivity Insights** - Analytics and insights on productivity patterns
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### 🎨 Design Highlights
- **Modern UI/UX** - Glassmorphism effects with purple-to-blue gradients
- **Smooth Animations** - Framer Motion powered transitions
- **Accessibility** - WCAG compliant design principles
- **Mobile-First** - Responsive design that works on all devices

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with excellent IDE support
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Production-ready motion library for React
- **Axios** - Promise-based HTTP client for API communication
- **React Router** - Declarative routing for React applications

### Backend
- **Spring Boot 3.5.3** - Enterprise-grade Java framework
- **Spring Security** - Comprehensive security framework
- **Spring Data JPA** - Simplified data access layer
- **JWT Authentication** - Stateless authentication mechanism
- **H2 Database** - In-memory database for development
- **Maven** - Dependency management and build automation

### Deployment & DevOps
- **Frontend:** Netlify (Free tier with auto-deploy)
- **Backend:** Render (Free tier with auto-deploy)
- **Version Control:** Git with GitHub integration
- **CI/CD:** Automatic deployments on code push

## 🏗️ Architecture Overview

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│                 │ ◄──────────────► │                 │
│  React Frontend │                  │ Spring Boot API │
│   (Netlify)     │                  │    (Render)     │
│                 │                  │                 │
└─────────────────┘                  └─────────────────┘
         │                                     │
         │                                     │
         ▼                                     ▼
┌─────────────────┐                  ┌─────────────────┐
│   Tailwind CSS  │                  │   H2 Database   │
│ Framer Motion   │                  │ Spring Security │
│   TypeScript    │                  │      JWT        │
└─────────────────┘                  └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Java** (v17 or higher)
- **Maven** (v3.6 or higher)
- **Git**

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/eanusha850-cloud/mindflow-fullstack.git
   cd mindflow-fullstack
   ```

2. **Start the Backend**
   ```bash
   cd mindflow-backend
   ./mvnw spring-boot:run
   ```
   Backend will run on `http://localhost:8080`

3. **Start the Frontend**
   ```bash
   # In a new terminal, from project root
   npm install
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

4. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8080/api`
   - H2 Console: `http://localhost:8080/h2-console`

## 📁 Project Structure

```
mindflow-fullstack/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── TaskManager.tsx     # Task management
│   │   ├── WellnessTracker.tsx # Wellness tracking
│   │   ├── MeditationCenter.tsx# Meditation features
│   │   └── ...
│   ├── api/                    # API configuration
│   └── App.tsx                 # Main application component
├── mindflow-backend/           # Backend source code
│   └── src/main/java/com/mindflow/backend/
│       ├── controller/         # REST controllers
│       ├── model/             # JPA entities
│       ├── repository/        # Data repositories
│       ├── config/            # Configuration classes
│       └── security/          # Security configuration
├── dist/                      # Frontend build output
├── package.json              # Frontend dependencies
└── README.md                 # Project documentation
```

## 🔧 Configuration

### Environment Variables

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

**Backend (application.properties)**
```properties
spring.profiles.active=dev
jwt.secret=mySecretKey123456789012345678901234567890
spring.datasource.url=jdbc:h2:mem:mindflowdb
```

## 🌐 Deployment

### Frontend (Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Backend (Render)
1. Connect GitHub repository to Render
2. Set build command: `./mvnw clean package -DskipTests`
3. Set start command: `java -jar target/mindflow-backend-0.0.1-SNAPSHOT.jar`
4. Configure environment variables in Render dashboard

## 🧪 Testing

### Frontend Testing
```bash
npm run test
```

### Backend Testing
```bash
cd mindflow-backend
./mvnw test
```

## 📈 Performance Features

- **Lazy Loading** - Components loaded on demand
- **Code Splitting** - Optimized bundle sizes
- **Caching** - Efficient API response caching
- **Responsive Images** - Optimized for different screen sizes
- **Progressive Web App** - Offline capabilities

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **CORS Configuration** - Proper cross-origin resource sharing
- **Input Validation** - Server-side validation for all inputs
- **SQL Injection Prevention** - JPA/Hibernate protection
- **XSS Protection** - React's built-in XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Your Name**
- GitHub: [@eanusha850-cloud](https://github.com/eanusha850-cloud)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)
- Portfolio: [Your Portfolio Website](https://your-portfolio.com)

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Spring Team** - For the robust Spring Boot framework
- **Netlify** - For free frontend hosting
- **Render** - For free backend hosting
- **Tailwind CSS** - For the utility-first CSS framework

---

⭐ **Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/eanusha850-cloud/mindflow-fullstack.svg?style=social&label=Star)](https://github.com/eanusha850-cloud/mindflow-fullstack)
