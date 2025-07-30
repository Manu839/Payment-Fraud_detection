# 💳 SafePayAI — AI-Powered Fraud Detection for Digital Payments

**SafePayAI** is an advanced fraud detection and prevention platform built to safeguard real-time digital transactions. It leverages modern machine learning models (like GANs and Random Forests) to detect suspicious activity in payment systems like **UPI**, offering a secure, scalable, and user-friendly experience.

---

## 🚀 Features

- 🔐 Real-time UPI fraud detection
- 🤖 Machine Learning models: GAN + Random Forest
- 📊 Interactive dashboard with live visualizations
- 👤 Google Sign-In Authentication
- ⚡ Responsive, mobile-friendly UI
- 🛡️ Fraud warnings and explanation popups
- 🔄 Firebase-based user & transaction storage

---
## Results 

<img width="1881" height="846" alt="dash" src="https://github.com/user-attachments/assets/a109ecae-c545-4c2f-8786-4eb806e8f21c" />

<img width="902" height="156" alt="acc" src="https://github.com/user-attachments/assets/6aa3d592-95e5-42d6-8b9d-20d3071ba8ea" />

<img width="1862" height="723" alt="hist" src="https://github.com/user-attachments/assets/22d6a9d0-b1fa-4ec1-8565-be92e8893413" />

<img width="1211" height="392" alt="fraud" src="https://github.com/user-attachments/assets/bdce6bcc-2f08-47b3-8970-a99741d7c2bd" />

<img width="756" height="570" alt="Screenshot 2025-07-31 031039" src="https://github.com/user-attachments/assets/650a57e2-9c3e-47cf-a9a3-631ff25aa6de" />


## 🧠 Tech Stack

-| Layer          | Tools / Libraries                                     |
-|----------------|--------------------------------------------------------|
-| Frontend       | React.js, TailwindCSS, Framer Motion, Recharts         |
-| Backend        | Firebase Firestore, Firebase Auth, Flask (ML API)      |
-| ML Algorithms  | Generative Adversarial Networks (GANs), Random Forest |
-| UI Components  | Lucide Icons, Custom ShadCN-like UI                    |
-| Deployment     | GitHub Pages / Firebase Hosting / Render (Flask)       |

---

## 📦 Folder Structure (Simplified)
- src/
- │
- ├── components/
- │ └── ui/ # All reusable components (buttons, inputs, cards)
- │ └── logic/ # Fraud simulation logic
- │
- ├── pages/
- │ ├── Homepage.jsx # Main payment dashboard
- │ ├── Dashboard.jsx # Charts + analytics
- │ ├── RecentTransactions.jsx
- │ ├── About.jsx # Project overview
- │ └── Header.jsx / SidebarContent.jsx
- │
- ├── firebase.js # Firebase config
- ├── data.js # Sample transaction data
- └── auth.js # Google Sign-In logic


---

## ⚙️ Setup Instructions

- ✅ Prerequisites: Node.js, Firebase project setup, Python 3 with Flask

### 1. Clone the Repository

```bash
git clone https://github.com/Manu839/Payment-Fraud_detection.git
cd safepay-ai
```
### Install Frontend Dependencies
```bash
npm install
```
### 3. Setup Firebase
- Go to Firebase Console

- Create a project

- Enable: Authentication > Sign-in method > Google

- Firestore Database

- Replace config inside firebase.js with your credentials

### 4. Setup the Flask Backend (for prediction)
- Located in a separate folder (/backend)

```bash
cd backend
pip install -r requirements.txt
python app.py
```
The backend will run at http://127.0.0.1:5000/.

### 5. Run the Frontend
```bash
npm run dev
```
App will be live at http://localhost:5173 (Vite).

### 🔍 How It Works
- When a user enters a UPI ID, SafePayAI fetches features from the Firestore dataset
- These features are sent to the Flask backend which predicts fraud likelihood using a trained Random Forest model
- If flagged as suspicious, the user gets a fraud alert + “See Why” breakdown (based on past transaction attributes)

### 🧪 Machine Learning Details
- Model	Use :
- GAN (synthetic data)	Augment fraud/no-fraud data
- Random Forest	Final fraud classification

Accuracy: 95% on benchmark UPI fraud datasets


### React + Vite

- This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

- Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

- If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

### 🙌 Acknowledgments
- Built with ❤️ using Firebase, Flask, and modern React
- Inspired by real-world fraud detection systems and financial security models
