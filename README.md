# 📝 Notes App (Expo + Node.js)

A full-stack Notes application with a **React Native (Expo)** mobile client and a **Node.js + Express + MongoDB** backend.
Supports full CRUD operations with a simple and responsive UI.

---

## 🚀 Tech Stack

* **Mobile:** React Native (Expo)
* **Backend:** Node.js, Express
* **Database:** MongoDB (Mongoose)

---

## ⚙️ Setup


###  Backend (Server)

```
cd server
npm install
```

Create `.env`:

```
MONGODB_URI=your_mongodb_uri
PORT=5000
```

Run server:

```
npm run dev
```

---

###  Mobile (Expo)

```
cd mobile
npm install
npx expo start
```

Scan the QR code using **Expo Go** to run the app.

---

## 🔌 API

* `GET /api/notes`
* `POST /api/notes`
* `PUT /api/notes/:id`
* `DELETE /api/notes/:id`

---

## 📂 Notes

* `mobile/assets/` is excluded from the repo
* Make sure backend URL is correctly set in the mobile app

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Your Name
https://github.com/toobamumtaz11
