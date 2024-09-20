# User Management

## Overview
User Management is a web application that allows users to perform CRUD (Create, Read, Update, Delete) operations on user data. This application is built using React for the frontend and Node.js with Express for the backend, connected to a MongoDB database.

## Features
- **User Registration**: Add new users with their details.
- **User List**: View a list of all registered users.
- **User Profile**: View and edit user details.
- **Image Upload**: Upload user profile images.
- **Validation**: Input validation for user details (name, email, phone number).

## Technologies Used
- **Frontend**: 
  - React
  - React Router
  - Axios
  - React Hot Toast (for notifications)
  
- **Backend**: 
  - Node.js
  - Express
  - Mongoose (for MongoDB interaction)
  - Multer (for file uploads)
  
- **Database**: MongoDB

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/userManagement.git
   cd userManagement
   ```

2. **Install backend dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `server` directory and add the following:
   ```plaintext
   PORT=server_port
   MONGO_ENDPOINT=your_mongo_endpoint
   DATABASE_NAME=your_database_name
   ```

4. **Install frontend dependencies**:
   ```bash
   cd ../client
   npm install
   ```

5. **Run the backend server**:
   ```bash
   cd server
   npm start
   ```

6. **Run the frontend application**:
   ```bash
   cd ../client
   npm run build
   ```

### Usage
- Navigate to `http://localhost:3000` in your browser to access the application.
- Use the provided UI to add, view, update, and delete users.

## API Endpoints
- **GET /api/user**: Retrieve all users.
- **GET /api/user/getUser/:id**: Retrieve a user by ID.
- **POST /api/user/addUser**: Add a new user.
- **PATCH /api/user/updateUser/:id**: Update an existing user.
- **DELETE /api/user/deleteUser/:id**: Delete a user by ID.