# Personal Finance Tracker

A full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack to help users manage their personal finances efficiently.

This project allows users to track income and expenses, categorize transactions, set savings goals, visualize analytics through dashboards, and export data as CSV files.

---

## Project Overview

### Features
- Income and Expense Tracking
- Category-wise Financial Analysis
- Savings Goal Tracker
- User Authentication & Authorization
- Dashboard Analytics with Charts
- Export Data to CSV

Upcoming Feature:
- Integration with Stock Market Investment APIs

---

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Data Visualization: Chart.js
- CSV Export: csv-writer Library

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/harinimylsamy30/personalFinanceTracker.git
cd personal-finance-tracker
```

---

### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add:

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
```

Start the backend server:

```bash
npm run dev
```

The backend will run on:

```
http://localhost:5000
```

---

### 3. Frontend Setup

Navigate to the client directory:

```bash
cd client
npm install
```

Start the frontend:

```bash
npm start
```

The frontend will run on:

```
http://localhost:3000
```

---

## Developed By

### Harini Mylsamy

---

## License

This project is licensed under the MIT License.

