# Support Triage Desk

A simple ticket-routing application that automatically directs customer support tickets to the correct support team based on their category and order ID.

## Project Overview

Support Triage Desk helps support teams manage customer tickets efficiently. It checks the ticket category and order ID, then automatically decides which team should handle the ticket.

The application has a React frontend and a Node.js/Express backend.

## Features

- Submit customer support tickets.
- Select the appropriate ticket category.
- Enter an optional Order ID.
- Automatically route tickets to the correct support team.
- Display the original ticket category.
- Explain why a ticket is routed or held for manual review.
- Handle tickets without an Order ID according to the routing policy.

## Ticket Routing Rules

| Ticket Category | Order ID | Assigned Team |
|---|---|---|
| Billing | Available | Billing Support |
| Delivery | Available | Delivery Support |
| Account Access | Available | Account Support |
| Billing | Missing | Manual Review |
| Delivery | Missing | Manual Review |
| Account Access | Missing | Account Support |

**Important:** Billing and Delivery tickets without an Order ID are sent to Manual Review. Their original category remains visible, and the application explains why they were held.

Account Access tickets can go directly to Account Support even without an Order ID.

## Technologies Used

- React – Frontend
- JavaScript – Application logic
- Node.js – Backend runtime
- Express.js – Backend framework
- HTML and CSS – User interface
- Git and GitHub – Version control

## Project Structure

```text
support-triage-desk/
│
├── backend/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

*Note: Adjust the folder structure above if your actual project uses different folder names.*

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project folder

```bash
cd support-triage-desk
```

### 3. Start the backend

```bash
cd backend
npm install
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

### 4. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in your terminal (usually http://localhost:5173).

## Testing

The application was tested with different ticket categories and Order ID combinations to verify that tickets are assigned to the correct support teams.

Test scenarios include:

- Billing ticket with an Order ID.
- Billing ticket without an Order ID.
- Delivery ticket with an Order ID.
- Delivery ticket without an Order ID.
- Account Access ticket with an Order ID.
- Account Access ticket without an Order ID.

All routing test cases passed.

## Future Improvements

- Store tickets in a database.
- Add ticket history.
- Add an admin dashboard.
- Deploy the application online.

## Author

Developed as a Support Triage Desk project.
