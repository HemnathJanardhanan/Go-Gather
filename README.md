# 🍚 **Go-Gather**

## 🎯 Overview

Go-Gather is a mobile application designed to help users discover, RSVP to, and create local events, all within an easy-to-use interface. Whether you’re looking for an event to attend or hosting one yourself, Go-Gather makes event management simple and engaging!

## 🛠️ **Features**

- 🚀 **Find Events**: Easily discover local events based on filters like type, location, and date.
- 📝 **RSVP**: Confirm your attendance to events and receive timely reminders.
- 📅 **Create Events**: Host your own events with simple tools for event management.
- 📍 **Geolocation**: View events near you using interactive maps and geofencing.
- 👤 **User Profiles**: View past RSVPs, manage settings, and more.

## 🛋️ **Installation & Setup**

### Frontend (Client)

1. **Clone the Repository:**

```bash
git clone https://github.com/HemnathJanardhanan/Go-Gather.git
cd Go-Gather
```

2. **Install Dependencies:**

Navigate to the `client` directory and install the required dependencies:

```bash
cd client
npm install
```

3. **Set API_URL for Authentication:**

In order for **signup and login functionality** to work correctly, update the `API_URL` inside `login.tsx` and `signup.tsx` to match your backend server URL.

Example:
```js
const API_URL = "http://YOUR_LOCAL_IP:3000/api/auth/login"; // For Login
const API_URL = "http://YOUR_LOCAL_IP:3000/api/auth/signup"; // For Signup
```
Replace `YOUR_LOCAL_IP` with the correct IP address of your backend server.

4. **Start the Expo App:**

Once dependencies are installed, start the application using Expo:

```bash
npx expo start
```

This will launch the app in your browser or on your mobile device using the Expo Go app.

### Backend (Server)

The backend is a MERN stack application, utilizing **Express**, **MongoDB**, and **Mongoose**.

1. **Set Up the Backend:**

Navigate to the `server` directory:

```bash
cd server
```

2. **Install Dependencies:**

Install the required backend dependencies:

```bash
npm install
```

3. **Start the Backend:**

Once the dependencies are installed, start the server:

```bash
npm start
```

This will run the backend server locally on `http://localhost:5000`.

---

## 🚀 **Usage**

After setting up both the frontend and backend, you can use the app via Expo Go or a mobile emulator. Start exploring events, RSVP-ing, and creating your own events!

---

## 🤝 **Contributing**

We welcome contributions! If you’d like to improve the project, follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-branch`).
5. Submit a pull request.

---

## 🧑‍💻 **Tech Stack**

- **Frontend**: React Native, Expo
- **Backend**: Express, Node.js, MongoDB
- **State Management**: React Context
- **Styling**: NativeWind (TailwindCSS for React Native)

---

## 📝 **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## 💬 **Need Help?**

If you have any questions or need assistance, feel free to open an issue or ask in the discussion section. We’re happy to help!

---
