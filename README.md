Zynetic - Weather Dashboard

🌐 Live Demo

skymist.netlify.app

// Website may shutdown as backend is hosted in render after 15 minutes of inactivity , will restart again when a new request is made


🚀 Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

API: OpenWeather API

Hosting: Netlify (Frontend), Render (Backend)

🛠 Setup Instructions

1️⃣ Clone the Repository

git clone https://github.com/nevinjreji/Zynetic.git
cd ZYNETIC

2️⃣ Install Dependencies

Frontend

cd FRONTEND
npm install

Backend

cd ../BACKEND
npm install

3️⃣ Setup Environment Variables

Create a .env file in the BACKEND/ folder and add:

OPENWEATHER_API_KEY=your_api_key_here
PORT=5000

4️⃣ Run the Project

Start Backend

cd BACKEND
npm start

Start Frontend

cd ../FRONTEND
npm run dev

🌩️ API Integration Details

API Used: Free OpenWeather API

Endpoint: /weather?city={city_name}

Rate Limits: Based on OpenWeather API plan || In this project we are using "Current weather data API by OpenWeather" which provides 60 API calls/minute
1,000,000 calls/month

 Security: API key is stored in .env and not exposed publicly.

📜 License

This project is open-source and available under the MIT License.

✅ Developed by

Nevin J Reji
