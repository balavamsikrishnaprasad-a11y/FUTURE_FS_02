# 🌊 Ocean CRM System

A modern water-themed Customer Relationship Management (CRM) system built with React and Express.js with SQLite database.

## ✨ Features
- 🆕 Add leads with name, email, and source
- 📞 Update lead status (New → Contacted → Converted)
- 💭 Add and edit notes for each lead
- 🔍 Search & filter by name, email, or status
- 🔐 Admin login (Username: admin, Password: 1234)
- 🎨 Beautiful water-themed UI with glassmorphism design

## 🛠️ Tech Stack
- **Frontend**: React 19.0
- **Backend**: Express.js 5.2.1
- **Database**: SQLite3 (file-based, no setup needed)
- **Runtime**: Node.js
- **Styling**: CSS with water/ocean theme

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)

### Quick Start

**1. Clone the repository**
```bash
git clone <repository-url>
cd FUTURE_FS_02
```

**2. Install and run backend**
```bash
cd backend
npm install
node server.js
```
Backend will start on http://localhost:5000
You should see:
```
🌊 Server running on port 5000
✅ SQLite Database Connected
📊 Leads table ready
```

**3. In a new terminal, install and run frontend**
```bash
cd client
npm install
npm start
```
Frontend will open at http://localhost:3000

### Login Credentials
- **Username**: admin
- **Password**: admin@123

## 📱 Using the App
1. Login with admin credentials
2. Add leads using the form (Name, Email, Source required)
3. View all leads in the dashboard
4. Update status: Click "📞 Contacted" or "✅ Converted"
5. Add notes: Type in the notes field and click "💾 Save Notes"
6. Search/filter leads using the search box and status dropdown

## 📁 Project Structure
```
FUTURE_FS_02/
├── backend/
│   ├── server.js           # Express server entry point
│   ├── db.js              # SQLite database configuration
│   ├── routes/
│   │   └── leadRoutes.js  # All CRUD endpoints
│   ├── models/
│   │   └── Lead.js        # Lead model (deprecated, for reference)
│   ├── package.json
│   ├── .env               # Environment variables
│   └── leads.db           # SQLite database (auto-created)
└── client/
    ├── src/
    │   ├── App.js         # Main app component
    │   ├── App.css        # Water theme styling
    │   ├── index.css      # Global styles
    │   └── components/
    │       ├── Login.js
    │       ├── Dashboard.js
    │       └── LeadForm.js
    ├── public/
    │   └── index.html
    └── package.json
```

## 🌐 API Endpoints

All endpoints are at `http://localhost:5000/api/leads`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all leads |
| POST | `/add` | Create new lead |
| PUT | `/:id` | Update lead (status and/or notes) |
| DELETE | `/:id` | Delete lead |

### Example Requests

**Add Lead:**
```bash
curl -X POST http://localhost:5000/api/leads/add \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","source":"Website"}'
```

**Update Status:**
```bash
curl -X PUT http://localhost:5000/api/leads/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"Contacted"}'
```

## ✅ GitHub Deployment

This app is ready for GitHub! 

### What's included for GitHub:
- ✅ SQLite (file-based, no external database needed)
- ✅ .gitignore configured for node_modules and database
- ✅ Environment variables in .env
- ✅ No hardcoded credentials or API keys
- ✅ Auto-initializing database

### To deploy elsewhere:
- **Render**: Connect your GitHub repo, set start command to `cd backend && npm install && node server.js`
- **Railway**: Same setup as Render
- **GitHub Pages**: Frontend only (static build)

## 📝 Notes
- Database persists in `leads.db` file (excluded from git)
- Authentication is basic (admin/1234) - enhance for production
- All leads stored locally in SQLite

## 👨‍💻 Author
Bala Vamsi Krishna Prasad Bommali 

## 📄 License
MIT
