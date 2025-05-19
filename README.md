
### COSC2769 | COSC2808 - FULL STACK DEVELOPMENT
# GROUP PROJECT -  Event Planning & Management System 
Repository for COSC2769|COSC2808 - Full-Stack Group Project - Team 10: https://github.com/dltrh/FSD-group-10

## Authors
- Quan Hung - s3980813
- Do Le Trang Hanh - s3977994
- Le Phuong Ngan - s3978567

## Description
Planny is a user-friendly and affordable event planning platform that designed for everyone. Whether you're hosting a small meetup or a large festival, Planny helps you create, manage, and promote events with ease — no tech skills required, no hidden costs, just simple and smooth event experiences.

## Key Deliverables
Fundamental funtions:
 - Login/Logout
 - Register
 - Forgot password
 - Reset password
 - Profile
 - display notification

For users:
  - create event
  - manage event
  - send invitation
  - join discussions
  - post questions and replies

For admin:
  - get all stats of users and events
  - edit and update users data or events data
  - delete unnecessary or inappropriate data

## Package dependencies
Client/ side (Frontend):
- Bootstrap
- ReactJS
- React-DOM
- React-icons
- React-Router-DOM

Server/ side (Backend):
- NodeJS
- bcrypt
- cookie-parser
- cors
- dotenv
- express
- express-session
- mongodb
- mongoose
- multer
- nodemon

## Guideline
The submission is compressed in a .zip file. Simply download the .zip file and Extract all files in it. Then do as follows: 

- Open the root project using your text editor
- Open a terminal
- Run the frontend part: 
```
cd client
npm i
npm run dev
```
- Open a second terminal
- Run the backend part: 
```
cd server
npm i
node server.js
```

## Testing guideline
In this project, we have only implemented tests for the web's client side. React Testing Library and Vitest were used for writing and executing the tests.
- Open a terminal
- Run tests:
```
cd client
npm i
npm run test
```

## Sample Accounts
User:
  Email: JohnDoe@@example.com
  Password: 123456

Admin:
  Email: admin@example.com
  Password: securePassword123

Note: Please select right button for login section. For admin login, there is a button that states "Login as admin."

## Additional details
Presentation and demonstration video of the project: https://rmiteduau-my.sharepoint.com/:v:/g/personal/s3978567_rmit_edu_vn/EeAB2ebKS3FKhooB1t01EmMBsQHnqfev5LSoLrkcVOtdGA?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&e=PdDGIx

Contribution: The contribution score of all members is attached in the report in section V in the group report
