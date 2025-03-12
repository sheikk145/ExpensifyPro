**ExpensifyPro**
Enterprise Expense Management system

A web-based enterprise expense management system that allows employees to submit expenses and track approvals, while managers can review, approve, or reject expenses.  

Tech Stack

Frontend: React.js, Material UI, Axios, React Router  
Backend:(To be implemented) Node.js, Express, MongoDB/PostgreSQL (optional)  
Real-Time Updates: Socket.io  
Authentication:(To be added)  

Features & Functionality

1.User Authentication (Login & Signup)
✔ Employees and Managers can sign up & log in
✔ Redirects:  
   - Employees → Dashboard (`/dashboard`)
   - Managers → Manager Expense View (`/manager-expenses`)  
✔ Auth Data is stored for role-based access (e.g., Employee vs. Manager).  

Files:
- `src/components/auth/Login.js`
- `src/components/auth/Signup.js`


2.Employee Dashboard (`/dashboard`) 
✔ Displays only the logged-in employee's expenses  
✔ Shows:  
   - Total expenses (Monthly & Yearly)  
   - Recent expenses  
   - Expense status (Pending, Approved, Rejected)  
   - Submit Expense Button  

File: `src/components/Dashboard.js`  


3.Submit Expense (`/submit-expense`)
✔ Employees can submit expenses with:  
   - Employee ID  
   - Amount  
   - Category (Dropdown: Travel, Food, etc.)  
   - Description  
   - Date Picker  
   - Upload Invoice (PDF, <2MB)  

✔ After submitting, a "View Expense Status" button redirects to the tracking page.  

File:`src/components/SubmitExpense.js`  


4.Expense Status Tracking (`/expense-status`) 
✔ Employees can track their submitted expenses.  
✔ Displays:  
   - Expense ID, Amount, Category, Status
   - Reason for Rejection (if applicable)  
✔ Real-time updates using WebSockets (when manager approves/rejects).  //to be implemented

File:`src/components/ExpenseStatus.js`  


5️.Manager’s Expense View (`/manager-expenses`)
✔ Managers can see all employees' expenses.  
✔ Can filter expenses by Pending, Approved, Rejected.  
✔ Approve/Reject expenses in real-time.  
✔ See employee details & invoices.  

File:`src/components/ManagerExpense.js`  

---

6️.Logout Functionality 
✔ Logout button for managers in `ManagerExpense.js`
✔ Redirects to Signup (`/signup`)  

Files Updated:
- `src/components/ManagerExpense.js`  

---

Folder Structure
```
project-folder/
│── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   ├── Dashboard.js
│   │   ├── SubmitExpense.js
│   │   ├── ExpenseStatus.js
│   │   ├── ManagerExpense.js
│   ├── App.js
│   ├── index.js
│── package.json
│── README.md
```

---
How to Run the Project
1️.Install Dependencies
```bash
npm install
```
2️.Start the Development Server
```bash
npm start
```
3️.Open in Browser
http://localhost:3000  

---

## Upcoming Features
✔ Backend Implementation (Node.js, Express, MongoDB/PostgreSQL)  
✔ Authentication with JWT
✔ Role-Based Access Control (RBAC)  
✔ Notifications for Approvals/Rejections 
  

---

