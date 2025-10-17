# 🏟️ Player Management System (PMS)

Keep your player records neat, secure, and easy to access — powered by **ASP.NET Core API + React**.

---

## 🌟 Why PMS Exists

Manually tracking players is a nightmare. Excel sheets are messy, offline tools are slow, and reporting is painful.

PMS solves that with:

- ⚡ Snappy React frontend
- 🔐 Rock-solid .NET backend
- 📊 Ready-to-use dashboards
- 🛠️ Modular, future-proof design

No more hunting through spreadsheets — everything’s centralized, secure, and scalable.

---

## 🏗️ Tech Stack

| Layer      | Tech & Tools |
|------------|--------------|
| Frontend   | React (Vite/CRA), TailwindCSS *(optional)* |
| Backend    | ASP.NET Core 7/8, C# |
| Database   | SQL Server + Entity Framework |
| Build      | Vite, MSBuild |
| Auth       | Identity / JWT *(future-ready)* |

---

## 📂 Project Layout

```
/PlayerManagement.sln       # .NET Solution
/PlayerManagement/          # Backend API
/frontend/                  # React App
vite.config.js              # Frontend Configuration
```

---

## 🚀 Quick Start

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/Sonia66Hub/PlayerManagementSystemtWithReact
cd PlayerManagement
```

### 2️⃣ Backend Setup

```bash
cd PlayerManagement
dotnet restore
dotnet run
# Runs at https://localhost:5001 or http://localhost:5000
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Runs at http://localhost:5173
```

---

## ✨ Key Features

- 🧑‍💼 Player CRUD: Add, Edit, Remove, View
- 🔐 Secure API with CORS
- 📊 Dashboard-ready analytics
- 📦 Modular & easy-to-extend architecture
- ⚡ Fast performance for large datasets

---

## ⚙️ Configuration

### Backend (`appsettings.json` or environment variables)

```
ConnectionStrings__DefaultConnection=your-sqlserver-connection
```

### Frontend (`.env`)

```
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Build & Deployment

### Backend

```bash
dotnet publish -c Release
```

### Frontend

```bash
npm run build
```

> Ready to deploy on **Azure, Vercel, or Docker**

---

## 📸 Screenshots *(Coming Soon)*

> C:\Users\Administrator\Pictures\Screenshots\Screenshot 2025-10-17 051952.png

---

## 🎥 Demo Video *(Coming Soon)*

> A short demo walkthrough will be added soon.

---

## 🤝 Contributing

1. Fork the repo  
2. Create a feature branch (`feature/your-feature`)  
3. Commit & push  
4. Open a Pull Request and celebrate 🎉

---

## 📜 License

Licensed under **MIT** — use it, improve it, or remix it freely.

---

✨ Made with ❤️ by **Sonia Khatun**
