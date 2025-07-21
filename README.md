# 🛎️ Bible Quiz Buzzer App

A **real-time multiplayer buzzer web app** built for church events like Bible Quizzes.  
This app was created because most buzzer apps on the market require **premium subscriptions** to host more players.  
So we built our own — simple, free, and customized for our needs.

---

## ✨ Features

- 🎙️ Host-controlled buzzer round
- 👥 Real-time player join with custom names
- 🛎️ First-come buzzer detection
- 🔄 Buzzer reset between questions
- 🌐 Works across devices (phones, tablets, laptops)
- 🚫 No logins or premium limitations

---

## 🏗️ Tech Stack

- **Frontend**: React + Vite + Socket.io Client  
- **Backend**: Node.js + Express + Socket.io Server  
- **Deployment**: Netlify (frontend) + Render (backend)

---

## 🔧 How It Works

### 1. Home Page
- Enter your name and room code to join a game
- Or click **"Create Room"** to start a new buzzer session (generates a 4-character room code)

### 2. Host Page
- Shows all players in real time
- Indicates who buzzed first
- Reset buzzer between rounds

### 3. Player Page
- Players click **BUZZ** to answer
- Once someone buzzes in, others are blocked until reset
