I understand - the HTML/markdown formatting is showing as raw text instead of rendering. Here's a clean, plain version without any complex formatting:

# 🌾 AgriTech AI - Smart Farming Assistant


## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation Guide](#-installation-guide)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🌱 Overview

**AgriTech AI** is a comprehensive smart farming platform that leverages artificial intelligence to empower farmers with cutting-edge technology. The platform integrates multilingual support, disease detection, personalized crop advisory, and weather alert systems to create an all-in-one agricultural assistant.

### 🎯 Key Benefits
- 👨‍🌾 **For Farmers**: Instant access to agricultural expertise
- 🌍 **Multilingual**: Breaking language barriers in farming communities
- 📱 **Accessible**: Web-based platform accessible from any device
- ⚡ **Real-time**: Live weather updates and alerts

## ✨ Features

### 1. 🤖 AI Multilingual Chatbot
- **Powered by Google Gemini AI**
- Supports multiple Indian and international languages
- Context-aware agricultural conversations
- 24/7 availability for farmer queries

### 2. 🍃 Leaf Disease Detector
- **Deep Learning-based detection**
- Instant disease identification from leaf images
- Treatment recommendations and preventive measures
- Support for multiple crop types

### 3. 🌾 AI-Powered Crop Advisory
- **Soil analysis-based recommendations**
- Personalized crop planning
- Fertilizer and irrigation scheduling
- Weather-integrated suggestions

### 4. ⚡ Weather Alert System
- **Real-time weather monitoring**
- Automated email alerts for severe conditions
- Location-based weather tracking
- Preventive action recommendations

## 🛠️ Tech Stack

### Frontend (Port 3000)
- **Framework**: React.js
- **Styling**: Material-UI / Tailwind CSS
- **HTTP Client**: Axios
- **Deployment**: Vercel

### Backend (Port 5000)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **External APIs**: Weather and AI services

### Python Backend (Port 8000)
- **Framework**: Flask
- **ML Libraries**: TensorFlow, PyTorch, OpenCV
- **External Services**: Weather and AI integration

### Python Backend (Railways)
- **Framework**: Flask
- **Email Service**: SMTP
- **Scheduling**: APScheduler
- **Deployment**: Railway.app

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher)
- **Python** (3.8 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **MongoDB Atlas** account
- **Code editor** (VS Code recommended)

## 🚀 Installation Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/agritech-ai.git
cd agritech-ai
```

### Step 2: Frontend Setup
```bash
cd frontend
npm install
npm run start
```
The frontend will be available at `http://localhost:3000`

### Step 3: Node.js Backend Setup
```bash
cd backend
npm install
npm run start
```
The backend will be available at `http://localhost:5000`

### Step 4: Python Backend Setup (ML Services)
```bash
cd python-backend

# Create virtual environment
python -m venv venv

# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```
The Python backend will be available at `http://localhost:8000`

### Step 5: Python Backend for Railways (Optional for Local Testing)
```bash
cd python-backend-railways

# Create virtual environment
python -m venv venv

# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run locally
python app.py
```

## 🔐 Environment Variables

### Frontend (.env in frontend/)
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_API_BASE_URL2=http://localhost:8000
REACT_APP_API_TIMEOUT=100000
```

### Backend (.env in backend/)
```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
OPENWEATHER_API_KEY=<your_openweather_api_key>
GEMINI_API_KEY=<your_google_gemini_api_key>
FRONTEND_URL=<your_frontend_url>
LOCAL_FRONTEND=http://localhost:3000
```

### Python Backend (.env in python-backend/)
```
OPENWEATHER_KEY=<your_openweather_api_key>
GEMINI_API_KEY=<your_google_gemini_api_key>
EMAIL_SENDER=<your_gmail_address>
EMAIL_PASSWORD=<your_gmail_app_password>
FRONTEND_URL=http://localhost:3000
```

### Python Backend Railways
- Configure environment variables directly in Railway dashboard

## ☁️ Deployment

### Frontend Deployment (Vercel)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

### Backend Deployment (Render/Heroku)
1. Create account on deployment platform
2. Connect GitHub repository
3. Add environment variables
4. Deploy the Node.js application

### Python Backend Deployment (Railway)
1. Install Railway CLI
2. Navigate to python-backend-railways
3. Run deployment commands:
```bash
railway login
railway init
railway up
```
4. Configure environment variables in Railway dashboard

## 🤝 Contributing Guidelines

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

### Development Standards
- Write clean, documented code
- Follow existing code style
- Add tests for new features
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues & Solutions

**Issue**: Frontend can't connect to backend
**Solution**: Check if all servers are running on correct ports

**Issue**: MongoDB connection failed
**Solution**: Verify IP whitelist in MongoDB Atlas

**Issue**: External services not responding
**Solution**: Check API key validity and usage quotas

**Issue**: Email alerts not sending
**Solution**: Verify email service credentials are correct

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 🙏 Acknowledgments

- **Google** for AI/ML capabilities
- **OpenWeather** for weather data services
- **MongoDB Atlas** for database services
- **Vercel** for frontend hosting
- **Railway** for backend deployment
- **Agricultural Universities** for domain expertise

## 📊 Project Status

- ✅ Frontend: Complete and deployed
- ✅ Backend: Complete and functional
- ✅ Python ML Services: Operational
- ✅ Weather Alerts: Active
- 🚀 Mobile App: Coming Soon

---

<div align="center">
  <p>Made with ❤️ for the farming community</p>
  <p>© 2024 AgriTech AI. All rights reserved.</p>
  <p><a href="#-agritech-ai---smart-farming-assistant">↑ Back to Top ↑</a></p>
</div>
```
deployed link-- https://bfb-hack.vercel.app/
---

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation Guide](#-installation-guide)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌱 Overview

**AgriTech AI** is a comprehensive smart farming platform that leverages artificial intelligence to empower farmers with cutting-edge technology. The platform integrates multilingual support, disease detection, personalized crop advisory, and weather alert systems to create an all-in-one agricultural assistant.

### 🎯 Key Benefits
| | |
|---|---|
| 👨‍🌾 **For Farmers** | Instant access to agricultural expertise |
| 🌍 **Multilingual** | Breaking language barriers in farming communities |
| 📱 **Accessible** | Web-based platform accessible from any device |
| ⚡ **Real-time** | Live weather updates and alerts |

---

## ✨ Features

### 1. 🤖 AI Multilingual Chatbot
- Powered by advanced language models
- Supports multiple Indian and international languages
- Context-aware agricultural conversations
- 24/7 availability for farmer queries

### 2. 🍃 Leaf Disease Detector
- Deep Learning-based detection
- Instant disease identification from leaf images
- Treatment recommendations and preventive measures
- Support for multiple crop types

### 3. 🌾 AI-Powered Crop Advisory
- Soil analysis-based recommendations
- Personalized crop planning
- Fertilizer and irrigation scheduling
- Weather-integrated suggestions

### 4. ⚡ Weather Alert System
- Real-time weather monitoring
- Automated email alerts for severe conditions
- Location-based weather tracking
- Preventive action recommendations

---

## 🛠️ Tech Stack

### Frontend (Port 3000)
| Technology | Purpose |
|------------|---------|
| React.js | Core Framework |
| Material-UI / Tailwind CSS | Styling |
| Axios | HTTP Client |
| Vercel | Deployment |

### Backend (Port 5000)
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB Atlas | Database |
| JWT | Authentication |
| External APIs | Weather & AI Services |

### Python Backend (Port 8000)
| Technology | Purpose |
|------------|---------|
| Flask | Web Framework |
| TensorFlow, PyTorch, OpenCV | Machine Learning |
| External Services | Weather & AI Integration |

### Python Backend (Railways)
| Technology | Purpose |
|------------|---------|
| Flask | Web Framework |
| SMTP | Email Notifications |
| APScheduler | Task Scheduling |
| Railway.app | Cloud Deployment |

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

| Requirement | Version |
|-------------|---------|
| Node.js | v14 or higher |
| Python | 3.8 or higher |
| npm or yarn | Latest |
| Git | Latest |
| MongoDB Atlas | Free tier account |
| Code Editor | VS Code recommended |

---

## 🚀 Installation Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/agritech-ai.git
cd agritech-ai
```

### Step 2: Frontend Setup
```bash
cd frontend
npm install
npm run start
```
The frontend will be available at `http://localhost:3000`

### Step 3: Node.js Backend Setup
```bash
cd backend
npm install
npm run start
```
The backend will be available at `http://localhost:5000`

### Step 4: Python Backend Setup (ML Services)
```bash
cd python-backend

# Create virtual environment
# Windows:
python -m venv venv
venv\Scripts\activate

# macOS/Linux:
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```
The Python backend will be available at `http://localhost:8000`

### Step 5: Python Backend for Railways (Optional for Local Testing)
```bash
cd python-backend-railways

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run locally
python app.py
```

---

## 🔐 Environment Variables

### Frontend Configuration
Create `.env` in the `frontend/` directory:
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_API_BASE_URL2=http://localhost:8000
REACT_APP_API_TIMEOUT=100000
```

### Backend Configuration
Create `.env` in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENWEATHER_API_KEY=your_openweather_api_key
GEMINI_API_KEY=your_google_gemini_api_key
FRONTEND_URL=your_frontend_url
LOCAL_FRONTEND=http://localhost:3000
```

### Python Backend Configuration
Create `.env` in the `python-backend/` directory:
```env
OPENWEATHER_KEY=your_openweather_api_key
GEMINI_API_KEY=your_google_gemini_api_key
EMAIL_SENDER=your_gmail_address
EMAIL_PASSWORD=your_gmail_app_password
FRONTEND_URL=http://localhost:3000
```

### Python Backend Railways
- Configure environment variables directly in Railway dashboard
- No local `.env` file required

---

## ☁️ Deployment

### Frontend Deployment (Vercel)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

### Backend Deployment (Render/Heroku)
1. Create account on deployment platform
2. Connect GitHub repository
3. Add environment variables
4. Deploy the Node.js application

### Python Backend Deployment (Railway)
1. Install Railway CLI
2. Navigate to python-backend-railways
3. Run deployment commands:
   ```bash
   railway login
   railway init
   railway up
   ```
4. Configure environment variables in Railway dashboard

---

## 🤝 Contributing Guidelines

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

### Development Standards
- Write clean, documented code
- Follow existing code style
- Add tests for new features
- Update documentation as needed

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Frontend can't connect to backend | Check if all servers are running on correct ports |
| MongoDB connection failed | Verify IP whitelist in MongoDB Atlas |
| External services not responding | Check API key validity and usage quotas |
| Email alerts not sending | Verify email service credentials are correct |

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 🙏 Acknowledgments

- **Google** for AI/ML capabilities
- **OpenWeather** for weather data services
- **MongoDB Atlas** for database services
- **Vercel** for frontend hosting
- **Railway** for backend deployment
- **Agricultural Universities** for domain expertise

---

## 📊 Project Status

| Component | Status |
|-----------|--------|
| Frontend | ✅ Complete and deployed |
| Backend | ✅ Complete and functional |
| Python ML Services | ✅ Operational |
| Weather Alerts | ✅ Active |
| Mobile App | 🚀 Coming Soon |

---

<div align="center">
  <br>
  <p>
    <strong>Made with ❤️ for the farming community</strong>
  </p>
  <p>
    © 2024 AgriTech AI. All rights reserved.
  </p>
  <br>
  <p>
    <a href="#-agritech-ai">↑ Back to Top ↑</a>
  </p>
</div>

