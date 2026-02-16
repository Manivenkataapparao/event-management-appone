# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All authenticated endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

Response (201):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Login User
**POST** `/auth/login`

Request body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Verify Token
**GET** `/auth/verify`

Response (200):
```json
{
  "valid": true,
  "user": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "john@example.com"
  }
}
```

---

## Event Endpoints

### Get All Events
**GET** `/events?page=1&limit=10`

Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Events per page (default: 10)

Response (200):
```json
{
  "events": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "React Conference",
      "description": "Learn latest React features",
      "organizer": "Tech Events Inc",
      "location": "San Francisco, CA",
      "date": "2024-06-15T09:00:00Z",
      "time": "09:00 AM",
      "capacity": 500,
      "registeredCount": 250,
      "availableSeats": 250,
      "category": "Conference",
      "tags": ["React", "Web"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

---

### Search Events
**GET** `/events/search?q=react&page=1&limit=10`

Query Parameters:
- `q` (required): Search query
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10)

Response (200): Same as Get All Events

---

### Filter Events
**POST** `/events/filter`

Request body:
```json
{
  "startDate": "2024-06-01",
  "endDate": "2024-06-30",
  "location": "San Francisco",
  "category": "Conference",
  "page": 1,
  "limit": 10
}
```

All filter fields are optional.

Response (200): Same as Get All Events

---

### Get Single Event
**GET** `/events/:id`

Response (200):
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "React Conference",
  "description": "Learn latest React features",
  "organizer": "Tech Events Inc",
  "location": "San Francisco, CA",
  "date": "2024-06-15T09:00:00Z",
  "time": "09:00 AM",
  "capacity": 500,
  "registeredCount": 250,
  "availableSeats": 250,
  "category": "Conference",
  "tags": ["React", "Web"],
  "registeredUsers": [
    {
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "registeredAt": "2024-06-01T10:30:00Z"
    }
  ]
}
```

---

### Create Event
**POST** `/events` (requires authentication)

Request body:
```json
{
  "name": "Vue.js Workshop",
  "description": "Hands-on Vue.js development workshop",
  "organizer": "Tech Workshops",
  "location": "New York, NY",
  "date": "2024-07-01",
  "time": "10:00 AM",
  "capacity": 100,
  "category": "Workshop",
  "tags": ["Vue.js", "Frontend"],
  "image": "https://example.com/image.jpg"
}
```

Response (201):
```json
{
  "message": "Event created successfully",
  "event": {
    "_id": "507f1f77bcf86cd799439013",
    ...event data
  }
}
```

---

### Register for Event
**POST** `/events/:id/register` (requires authentication)

Response (200):
```json
{
  "message": "Successfully registered for the event",
  "event": {
    "_id": "507f1f77bcf86cd799439012",
    "registeredCount": 251,
    "availableSeats": 249,
    ...event data
  }
}
```

---

### Cancel Event Registration
**POST** `/events/:id/cancel` (requires authentication)

Response (200):
```json
{
  "message": "Successfully cancelled registration",
  "event": {
    "_id": "507f1f77bcf86cd799439012",
    "registeredCount": 250,
    "availableSeats": 250,
    ...event data
  }
}
```

---

## User Endpoints

### Get User Profile
**GET** `/users/profile` (requires authentication)

Response (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "registeredEvents": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "React Conference",
      ...event data
    }
  ]
}
```

---

### Get Dashboard
**GET** `/users/dashboard` (requires authentication)

Response (200):
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "registeredEvents": [
    {...event data}
  ],
  "upcomingEvents": [
    {...event data}
  ],
  "pastEvents": [
    {...event data}
  ],
  "summary": {
    "totalRegistered": 5,
    "upcomingCount": 3,
    "pastCount": 2
  }
}
```

---

### Get Upcoming Events
**GET** `/users/upcoming` (requires authentication)

Response (200):
```json
{
  "events": [
    {...event data}
  ]
}
```

---

### Get Past Events
**GET** `/users/past` (requires authentication)

Response (200):
```json
{
  "events": [
    {...event data}
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Error message describing what went wrong",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "message": "Event not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid data sent |
| 401 | Unauthorized - No token provided |
| 403 | Forbidden - Invalid/expired token |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting & Best Practices

- Maximum 100 requests per minute per IP
- Pagination recommended for large datasets
- Always include Content-Type: application/json header
- Tokens expire in 24 hours

---

## Example cURL Commands

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'
```

**Get Events:**
```bash
curl http://localhost:5000/api/events?page=1&limit=10
```

**Search Events:**
```bash
curl http://localhost:5000/api/events/search?q=React&page=1
```

**Register for Event:**
```bash
curl -X POST http://localhost:5000/api/events/507f1f77bcf86cd799439012/register \
  -H "Authorization: Bearer YOUR_TOKEN"
```
