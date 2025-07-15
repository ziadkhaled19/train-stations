# 🚂 Train Station Management API

A robust and scalable RESTful API for managing train stations with geolocation services, user authentication, and a complaint management system, built with Node.js, Express, and MongoDB.

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication system
- User registration and login
- Password reset functionality via email
- Role-based access control (User/Admin)
- Secure cookie-based session management
- Password encryption using bcrypt

### 🗺️ Geolocation Services
- Locate nearest train stations using coordinates
- MongoDB geospatial queries with 2dsphere indexing
- Distance calculations (meters/kilometers)
- Location-based search functionality

### 👥 User Management
- Complete CRUD operations for users
- User profile management
- Advanced pagination and search capabilities
- Admin oversight for user management

### 📝 Complaint System
- Submit and manage user complaints
- Admin access to view and manage all complaints
- Input validation and message trimming

### 🔒 Security Features
- Rate limiting to prevent abuse
- Helmet.js for security headers
- Input validation and sanitization
- CORS configuration
- Error handling middleware

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, bcrypt, CORS
- **Email**: Nodemailer
- **Rate Limiting**: express-rate-limit
- **Logging**: Morgan
- **Environment**: dotenv

## 📁 Project Structure

```
├── config/
│   └── database.js           # Database connection setup
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── stationController.js  # Station management logic
│   ├── userController.js     # User management logic
│   └── complaintController.js # Complaint handling logic
├── middleware/
│   ├── auth.js              # Authentication middleware
│   └── errorHandler.js      # Global error handling
├── models/
│   ├── User.js              # User schema
│   ├── Station.js           # Station schema
│   └── Complaint.js         # Complaint schema
├── routes/
│   ├── authRoutes.js        # Authentication endpoints
│   ├── stationRoutes.js     # Station management endpoints
│   ├── userRoutes.js        # User management endpoints
│   └── complaintRoutes.js   # Complaint management endpoints
├── utils/
│   ├── apiError.js          # Custom error class
│   └── sendEmail.js         # Email utility
├── app.js                   # Express app configuration
├── server.js                # Server startup and database connection
└── package.json             # Dependencies and scripts
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/train-station-api.git
   cd train-station-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE=mongodb://localhost:27017/trainstation
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=30d
   JWT_COOKIE_EXPIRES_IN=30
   
   # Email Configuration
   HOST=smtp.gmail.com
   EPORT=587
   USERNAME=your-email@gmail.com
   PASSWORD=your-app-password
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start the application**
   ```bash
   # Development
   npm start
   
   # Production
   npm run start:prod
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PATCH /api/auth/updatedetails` - Update user details
- `PATCH /api/auth/updatepassword` - Update password
- `POST /api/auth/forgotpassword` - Request password reset
- `PATCH /api/auth/resetpassword/:resettoken` - Reset password

### Stations
- `GET /api/stations` - Get all stations
- `GET /api/stations/search` - Search stations by name
- `GET /api/stations/:id` - Get station by ID
- `GET /api/stations/tours-nearest/:latlng` - Get nearest stations
- `POST /api/stations` - Create station (Admin only)
- `PATCH /api/stations/:id` - Update station (Admin only)
- `DELETE /api/stations/:id` - Delete station (Admin only)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Complaints
- `POST /api/complaints` - Create complaint (User only)
- `GET /api/complaints` - Get all complaints (Admin only)
- `GET /api/complaints/:id` - Get complaint by ID (Admin only)

### Health Check
- `GET /api/health` - API health status

## 🔍 API Features

### Advanced Querying
- **Search**: `?name=stationName`
- **Geolocation**: `?latlng=40.7128,-74.0060`
- **Pagination**: `?page=2&limit=10`

### Example Requests

**Get nearest stations:**
```bash
GET /api/stations/tours-nearest/40.7128,-74.0060
```

**Create a complaint:**
```bash
POST /api/complaints
Content-Type: application/json
Authorization: Bearer <your-jwt-token>

{
  "message": "Issue with train schedule",
  "stationId": "64f8d4b2c1234567890abcde"
}
```

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

Or the API will automatically read from the `jwt` cookie if present.

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token expiration
- HTTP security headers via Helmet
- Input validation and sanitization
- Rate limiting infrastructure
- CORS configuration
- Error handling without information leakage
- Role-based access control

## 🗺️ Geolocation Features

### Station Schema
```javascript
{
  name: String,
  location: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  address: String,
  city: String,
  isActive: Boolean
}
```

## 🚀 Deployment

The application is configured for both development and production environments:

- Development: Detailed error messages and logging
- Production: Secure error handling and optimized performance

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Contact

For questions or support, please contact [your-email@example.com]

---

Built with ❤️ using Node.js and Express