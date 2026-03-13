# Employee Management System — Architecture

## Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (jsonwebtoken + bcryptjs) |
| Frontend | React + Vite |

---

## Folder Structure

```
sample-repo-workshop/
├── server.js                        ← Express entry point
├── .env.example                     ← Environment variable template
├── package.json
├── routes/
│   ├── auth.js                      ← POST /api/auth/register, /api/auth/login
│   └── employees.js                 ← CRUD + stats routes (protected)
│   └── attendance.js                ← Attendance routes (protected)
├── controllers/
│   └── employeeController.js        ← Business logic for employee operations
│   └── attendanceController.js      ← Attendance logic
├── models/
│   └── Employee.js                  ← Mongoose schema
│   └── Attendance.js                ← Attendance schema
├── middleware/
│   ├── authMiddleware.js            ← JWT verifyToken
│   └── validate.js                  ← express-validator rules
└── client/                          ← React + Vite frontend
    ├── package.json
    ├── vite.config.js               ← Proxy /api → localhost:3000
    └── src/
        ├── App.jsx                  ← React Router (public + private routes)
        ├── api/
        │   ├── auth.js
        │   └── employees.js
        ├── components/
        │   ├── Navbar.jsx
        │   ├── EmployeeTable.jsx
        │   ├── EmployeeForm.jsx
        │   ├── AttendanceForm.jsx
        │   └── SearchFilter.jsx
        └── pages/
            ├── Login.jsx
            ├── Dashboard.jsx
            ├── Employees.jsx
            └── AttendancePage.jsx
```

---

## API Endpoints

All `/api/employees` and `/api/attendance` routes require `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register admin user |
| `POST` | `/api/auth/login` | Login → `{ token }` |
| `GET` | `/api/employees` | List (filter: `?department=&role=`) |
| `POST` | `/api/employees` | Create employee |
| `GET` | `/api/employees/stats` | Dashboard stats |
| `GET` | `/api/employees/:id` | Get single employee |
| `PUT` | `/api/employees/:id` | Update employee |
| `DELETE` | `/api/employees/:id` | Delete employee |
| `POST` | `/api/attendance` | Mark attendance |
| `GET` | `/api/attendance/:employeeId` | Get attendance for employee |
| `PUT` | `/api/attendance/:id` | Update attendance |
| `DELETE` | `/api/attendance/:id` | Delete attendance |

---

## Employee Schema

```js
{
  name:       String (required),
  email:      String (required, unique),
  department: String (required),
  role:       String (required),
  hireDate:   Date   (required),
  salary:     Number (required, min: 0),
  createdAt:  Date   (default: Date.now)
}
```

## Attendance Schema

```js
{
  employee:   ObjectId (ref: Employee, required),
  date:       Date (required),
  status:     String ('Present', 'Absent', 'Leave', required),
  createdAt:  Date (default: Date.now)
}
```

---

## Implementation Phases

### Phase 1 — Backend

1. Add `mongoose`, `express-validator`, `cors` to `package.json`
2. Create `models/Employee.js` — Mongoose schema
3. Create `models/Attendance.js` — Attendance schema
4. Create `middleware/validate.js` — input validation rules
5. Create `controllers/employeeController.js` — CRUD + stats logic
6. Create `controllers/attendanceController.js` — attendance logic
7. Create `routes/employees.js` — mount controllers with `verifyToken`
8. Create `routes/attendance.js` — mount attendance controllers
9. Update `server.js` — add CORS, Mongoose connection, mount `/api/employees` and `/api/attendance`
10. Update `.env.example` — add `MONGO_URI`

### Phase 2 — Frontend Scaffolding

11. Create `client/package.json` — React, react-router-dom, axios
12. Create `client/vite.config.js` — proxy `/api` to Express
13. Create `client/src/api/` — axios wrappers with JWT interceptor

### Phase 3 — Frontend Pages & Components

14. `Login.jsx` — login form, saves token, redirects to dashboard
15. `Dashboard.jsx` — stats cards (total, by department, avg salary)
16. `Employees.jsx` — table with search/filter bar
17. `EmployeeForm.jsx` — modal for create/edit with validation
18. `AttendancePage.jsx` — attendance management UI
19. `AttendanceForm.jsx` — modal for attendance marking
20. `App.jsx` — React Router with private route guard

---

## Key Design Decisions

- JWT stored in `localStorage`; attached via axios request interceptor
- Vite dev server proxies `/api` to Express — no CORS issues in development
- `express-validator` for backend validation
- No RBAC in scope — all authenticated users have full CRUD access
- Pagination out of scope for initial version

---

## Verification Checklist

- [ ] `GET /api/employees` returns `401` without token
- [ ] Register + login returns valid JWT
- [ ] CRUD operations return correct HTTP status codes
- [ ] Attendance endpoints work as expected
- [ ] Dashboard stats reflect actual DB state
- [ ] UI is responsive on mobile
