# UI Test Cases — Employee Management System

## Employees Page

### 1. Add Employee
- [ ] Open Employees page
- [ ] Click "+ Add Employee"
- [ ] Fill all fields with valid data
- [ ] Submit form
- [ ] Employee appears in table

### 2. Edit Employee
- [ ] Click "Edit" on an employee
- [ ] Change one or more fields
- [ ] Submit form
- [ ] Changes appear in table

### 3. Delete Employee
- [ ] Click "Delete" on an employee
- [ ] Confirm deletion
- [ ] Employee is removed from table

### 4. Form Validation
- [ ] Try submitting empty form
- [ ] Error messages shown for required fields
- [ ] Try invalid email/salary
- [ ] Error messages shown

### 5. Search/Filter
- [ ] Enter department/role in filter
- [ ] Table updates to show matching employees
- [ ] Click "Clear" resets filter

## Attendance Page

### 6. Mark Attendance
- [ ] Select employee
- [ ] Click "Mark Attendance"
- [ ] Fill date and status
- [ ] Submit form
- [ ] Attendance record appears in table

### 7. Attendance Validation
- [ ] Try submitting form with missing fields
- [ ] Error messages shown

### 8. Attendance Table
- [ ] Records show correct date/status
- [ ] Status chips are color-coded
- [ ] Table is scrollable on mobile

## Navigation

### 9. Navbar Links
- [ ] Click "Dashboard", "Employees", "Attendance"
- [ ] Each page loads correctly

### 10. Auth Flow
- [ ] Log out
- [ ] Try accessing protected pages
- [ ] Redirected to login
- [ ] Log in with valid credentials
- [ ] Access granted

---

For automated testing, use tools like React Testing Library, Cypress, or Playwright. Adapt these cases for your preferred framework.
