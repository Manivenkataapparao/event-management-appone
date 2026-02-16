# Event Management Application - Setup Guide

## Overview
This is a complete MERN stack (MongoDB, Express.js, React.js, Node.js) Event Management Application that allows users to browse events, register/cancel registrations, and manage their event history.

## Features

### ✅ Authentication
- User registration with email and password
- User login and JWT token-based authentication
- Protected routes for authenticated users
- Token verification on app load

### ✅ Event Management
- Browse all available events with pagination
- View detailed event information
- Search events by text query
- Filter events by date, location, and category
- Register for events with capacity tracking
- Cancel event registrations
- Real-time seat availability updates

### ✅ User Dashboard
- View all registered events
- Upcoming events summary
- Past event history
- Event statistics

## Project Structure

```
event-management-app/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema with password hashing
│   │   └── Event.js         # Event schema with text indexing
│   ├── routes/
│   │   ├── authRoutes.js    # Auth endpoints (register, login, verify)
│   │   ├── eventRoutes.js   # Event endpoints (CRUD, register, search, filter)
│   │   └── userRoutes.js    # User endpoints (profile, dashboard, history)
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── server.js            # Express app setup and server start
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── apiClient.js # Axios API client with interceptors
│   │   ├── context/
│   │   │   └── AuthContext.js # Authentication state management
│   │   ├── components/
│   │   │   ├── Login.js         # Login form component
│   │   │   ├── Register.js      # Registration form component
│   │   │   ├── EventListing.js  # Events list with search/filter
│   │   │   ├── EventDetail.js   # Single event details & registration
│   │   │   ├── Dashboard.js     # User dashboard with tabs
│   │   │   ├── Navbar.js        # Navigation bar
│   │   │   └── ProtectedRoute.js # Route protection HOC
│   │   ├── styles/
│   │   │   ├── Auth.css         # Auth pages styling
│   │   │   ├── EventListing.css # Events listing styling
│   │   │   ├── EventDetail.css  # Event detail styling
│   │   │   ├── Dashboard.css    # Dashboard styling
│   │   │   ├── Navbar.css       # Navbar styling
│   │   │   └── App.css          # Global styling
│   │   ├── App.js           # Main app component with routes
│   │   ├── index.js         # React entry point
│   │   └── App.css          # Global styles
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── package.json         # Frontend dependencies
│   └── .env                 # Frontend environment variables
│
└── SETUP.md                 # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas)
- Git

## Installation & Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create or update `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/event-management
   JWT_SECRET=your_jwt_secret_key_change_in_production
   PORT=5000
   NODE_ENV=development
   ```

   **For MongoDB Atlas (Cloud):**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event-management
   JWT_SECRET=your_jwt_secret_key_change_in_production
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB (if using local):**
   ```bash
   # Windows
   mongod
   
   # macOS/Linux
   brew services start mongodb-community
   ```

5. **Start the backend server:**
   ```bash
   npm start          # production mode
   npm run dev        # development mode with nodemon
   ```

   Server runs on http://localhost:5000

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   App runs on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Events
- `GET /api/events` - Get all events (paginated)
- `GET /api/events/search?q=query` - Search events
- `POST /api/events/filter` - Filter events by date/location/category
- `GET /api/events/:id` - Get single event details
- `POST /api/events` - Create event (requires auth)
- `POST /api/events/:id/register` - Register for event (requires auth)
- `POST /api/events/:id/cancel` - Cancel registration (requires auth)

### User
- `GET /api/users/profile` - Get user profile (requires auth)
- `GET /api/users/dashboard` - Get dashboard with all data (requires auth)
- `GET /api/users/upcoming` - Get upcoming events (requires auth)
- `GET /api/users/past` - Get past events (requires auth)

## Usage Guide

### 1. User Registration
- Navigate to `/register`
- Fill in name, email, password, and optional phone
- Click "Register"
- Automatically logged in and redirected to events

### 2. Browsing Events
- Go to `/events`
- View all available events in grid format
- Each card shows: name, organizer, location, date, time, capacity
- Click "View Details" for full information

### 3. Searching Events
- Use search bar to find events by name, description, category, or tags
- Results update dynamically

### 4. Filtering Events
- Click "Show Filters" button
- Filter by:
  - Location (partial match)
  - Category (exact match)
  - Date range (start and end date)
- Click "Apply Filters"

### 5. Event Registration
- Click "View Details" on an event
- Review full event information
- Click "Register Now" if seats available
- Confirmation message on success

### 6. User Dashboard
- Click "Dashboard" in navbar (requires login)
- View three tabs:
  - **All Events**: All registered events
  - **Upcoming**: Events happening in future
  - **Past**: Completed events
- Each event shows location, date, category
- Upcoming events show available seats

### 7. Cancel Registration
- Go to event detail page
- If registered, button changes to "Cancel Registration"
- Click to remove from registered events

## Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  phone: String (optional),
  registeredEvents: [ObjectId], // References to Event
  createdAt: Date,
  updatedAt: Date
}
```

### Event Schema
```javascript
{
  name: String (required, indexed for search),
  description: String (required, indexed for search),
  organizer: String (required),
  location: String (required, indexed for filtering),
  date: Date (required, indexed for filtering),
  time: String (required),
  capacity: Number (required),
  registeredCount: Number (default: 0),
  category: String (required, indexed for filtering),
  tags: [String] (optional, indexed for search),
  image: String (optional),
  registeredUsers: [{
    userId: ObjectId,
    registeredAt: Date
  }],
  createdBy: ObjectId, // Reference to User
  createdAt: Date,
  updatedAt: Date
}
```

## Key Features Implementation

### 1. Efficient Event Discovery
- **Text Search**: Full-text search index on name, description, category, tags
- **Filtering**: Indexed fields on date, location, category for fast queries
- **Pagination**: Large datasets handled with skip/limit
- **Lazy Loading**: Pagination allows loading events as needed

### 2. Authentication & Authorization
- JWT tokens stored in localStorage
- Token automatically attached to all requests via interceptor
- Protected routes redirect unauthenticated users to login
- Token verification on app mount

### 3. Real-time Data Management
- Capacity tracking with registeredCount
- Availability calculated as: capacity - registeredCount
- Event registration updates both Event and User documents
- Cancellation removes from both documents

### 4. State Management
- AuthContext for user authentication state
- Local component state for events and filters
- Token persistence across page refreshes
- Automatic logout if token expires

## Performance Optimizations

1. **Database Indexing**: Text indexes for search, field indexes for filtering
2. **Pagination**: Limit number of events returned per page
3. **Request Optimization**: Selective field population in queries
4. **Frontend Caching**: Token stored locally to avoid re-login
5. **Lazy Loading**: Load events on demand with pagination

## Security Features

1. **Password Hashing**: bcryptjs with salt rounds
2. **JWT Authentication**: Secure token-based auth
3. **Protected Routes**: Client-side route protection
4. **CORS**: Configured for specific origins
5. **Environment Variables**: Sensitive data in .env files
6. **Input Validation**: express-validator for API endpoints

## Testing the Application

### Sample Test Data

**User Registration:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Create Event:**
```json
{
  "name": "React Conference 2024",
  "description": "Annual React developers conference",
  "organizer": "Tech Events Inc",
  "location": "San Francisco, CA",
  "date": "2024-06-15",
  "time": "09:00 AM",
  "capacity": 500,
  "category": "Conference",
  "tags": ["React", "Web", "Conference"],
  "image": "https://..."
}
```

### Test Scenarios

1. **Registration and Login**: Create account, logout, login again
2. **Event Discovery**: Search, filter, paginate through events
3. **Event Registration**: Register for multiple events
4. **Capacity Limits**: Try registering when event is full
5. **Dashboard**: Check upcoming and past events
6. **Cancel Registration**: Remove from events

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For MongoDB Atlas, verify whitelist IP

**Port Already in Use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Frontend Issues

**API Not Responding:**
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in .env
- Clear browser cache and restart

**Logout Issues:**
- Clear localStorage manually in browser DevTools
- Hard refresh the page

## Deployment

### Backend (Heroku/Railway)
1. Set environment variables on platform
2. Deploy package.json and server.js
3. Database: Use MongoDB Atlas

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Set REACT_APP_API_URL to production backend URL
3. Deploy build folder

## Future Enhancements

- [ ] Event creation interface for organizers
- [ ] Event image uploads
- [ ] Email notifications for registrations
- [ ] Rating and reviews system
- [ ] Calendar view for events
- [ ] Wishlist/bookmarks for events
- [ ] Advanced analytics for organizers
- [ ] Payment integration
- [ ] Event capacity notifications
- [ ] Admin dashboard

## Support

For issues or questions, check:
1. Browser console for error messages
2. Backend logs for API issues
3. MongoDB connection string format
4. Environment variables configuration

---

**Happy Event Managing!** 🎉
