# 🚪 Gate Pass Management System

A secure and efficient digital solution for managing gate passes in educational institutions. Built using **React**, **Tailwind CSS**, **MongoDB**, **Node.js**, and **Express**, this system eliminates the hassle and mishandling associated with traditional gate pass management.



## ✅ Problem Statement

Traditional gate pass systems often suffer from:
- Physical mishandling or loss of gate passes
- Negligence in submission or collection


### 🎯 Solution

This Gate Pass Management System:
- **Digitalizes the entire process**, making it secure and traceable
- **Prevents students from submitting multiple requests** simultaneously
- **Notifies guards** to approve requests, ensuring accountability
- **Saves time** for both students and guard staff
- Ensures **data integrity** and **access control** with login-based access

---

## 🛠️ Features

- 🔐 **Login / Registration System**
  - Separate roles for students and guards
- 📝 **Single Active Request Policy**
  - Students can only make a new request once the previous one is resolved
- 🧾 **Digital Gate Pass Request and Approval**
  - Track request status in real-time
- 📊 **Dashboard for Students and Guards**
  - View past and active passes, guard logs, etc.
- ✅ **Form Validations**
  - Prevent incomplete or invalid data entry
- 🗃️ **Three Connected Databases**
  - `students`, `guards`, and `gatepasses`

---

## ⚙️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Form validations using React state/hooks

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API routing

**Database Models:**
- 📚 `StudentLoginSystem`
- 🛡️ `GuardLoginSystem`
- 📝 `GatePassDatabase`

---



## 🔐 Access Control

| Role    | Abilities |
|---------|-----------|
| Student | Register/Login, Submit 1 active request, View status |
| Guard   | Login, Approve requests |

---



## 🙌 Contributions

Feel free to fork and raise pull requests if you'd like to improve or extend the project. Suggestions are welcome!

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).
