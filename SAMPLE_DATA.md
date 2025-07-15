# Sample Data for Train Station Management API

This file contains sample data that can be used to populate the database for testing and demonstration purposes.

## Sample Stations

Use the bulk import endpoint (`POST /api/stations/admin/bulk-import`) with admin credentials to import these stations:

```json
{
  "stations": [
    {
      "name": "Grand Central Terminal",
      "location": {
        "type": "Point",
        "coordinates": [-73.9772, 40.7527]
      },
      "address": "89 E 42nd St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10017"
    },
    {
      "name": "Penn Station",
      "location": {
        "type": "Point",
        "coordinates": [-73.9928, 40.7505]
      },
      "address": "1 Penn Plaza",
      "city": "New York",
      "state": "NY",
      "zipCode": "10119"
    },
    {
      "name": "Union Station",
      "location": {
        "type": "Point",
        "coordinates": [-77.0063, 38.8973]
      },
      "address": "50 Massachusetts Ave NE",
      "city": "Washington",
      "state": "DC",
      "zipCode": "20002"
    },
    {
      "name": "30th Street Station",
      "location": {
        "type": "Point",
        "coordinates": [-75.1816, 39.9566]
      },
      "address": "2955 Market St",
      "city": "Philadelphia",
      "state": "PA",
      "zipCode": "19104"
    },
    {
      "name": "South Station",
      "location": {
        "type": "Point",
        "coordinates": [-71.0552, 42.3519]
      },
      "address": "700 Atlantic Ave",
      "city": "Boston",
      "state": "MA",
      "zipCode": "02111"
    },
    {
      "name": "Union Station Chicago",
      "location": {
        "type": "Point",
        "coordinates": [-87.6407, 41.8789]
      },
      "address": "225 S Canal St",
      "city": "Chicago",
      "state": "IL",
      "zipCode": "60606"
    },
    {
      "name": "King Street Station",
      "location": {
        "type": "Point",
        "coordinates": [-122.3301, 47.5990]
      },
      "address": "303 S Jackson St",
      "city": "Seattle",
      "state": "WA",
      "zipCode": "98104"
    },
    {
      "name": "Union Station Los Angeles",
      "location": {
        "type": "Point",
        "coordinates": [-118.2368, 34.0560]
      },
      "address": "800 N Alameda St",
      "city": "Los Angeles",
      "state": "CA",
      "zipCode": "90012"
    },
    {
      "name": "Emeryville Station",
      "location": {
        "type": "Point",
        "coordinates": [-122.2936, 37.8403]
      },
      "address": "5885 Landregan St",
      "city": "Emeryville",
      "state": "CA",
      "zipCode": "94608"
    },
    {
      "name": "Miami Central Station",
      "location": {
        "type": "Point",
        "coordinates": [-80.2103, 25.7785]
      },
      "address": "600 NW 1st Ave",
      "city": "Miami",
      "state": "FL",
      "zipCode": "33136"
    }
  ]
}
```

## Sample Admin User

The application automatically creates an admin user on startup with the credentials from your `.env` file:

- **Email**: Value from `ADMIN_EMAIL` (default: admin@trainstation.com)
- **Password**: Value from `ADMIN_PASSWORD` (default: admin123)
- **Role**: admin

## Sample API Requests

### 1. Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### 2. Login as admin
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@trainstation.com",
    "password": "admin123"
  }'
```

### 3. Create a station (Admin only)
```bash
curl -X POST http://localhost:5000/api/stations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Test Station",
    "location": {
      "type": "Point",
      "coordinates": [-74.0059, 40.7128]
    },
    "address": "123 Test Street",
    "city": "Test City",
    "state": "TS",
    "zipCode": "12345"
  }'
```

### 4. Find nearest stations
```bash
curl -X POST http://localhost:5000/api/user/nearest-station \
  -H "Content-Type: application/json" \
  -d '{
    "longitude": -73.9857,
    "latitude": 40.7484,
    "maxDistance": 10000,
    "limit": 3
  }'
```

### 5. Submit a complaint
```bash
curl -X POST http://localhost:5000/api/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "type": "complaint",
    "subject": "Station cleanliness issue",
    "message": "The restrooms at Grand Central need attention. They were not properly maintained during my visit today.",
    "senderName": "Jane Smith",
    "senderEmail": "jane@example.com",
    "senderPhone": "+1234567890",
    "priority": "medium"
  }'
```

## Testing Coordinates

Here are some coordinates you can use for testing location services:

- **New York City**: [-73.9857, 40.7484] (Times Square)
- **Los Angeles**: [-118.2437, 34.0522] (Downtown LA)
- **Chicago**: [-87.6298, 41.8781] (Downtown Chicago)
- **Boston**: [-71.0589, 42.3601] (Downtown Boston)
- **Washington DC**: [-77.0369, 38.9072] (Downtown DC)

## Database Indexes

The application automatically creates the following indexes:

1. **Stations Collection**:
   - 2dsphere index on `location` field for geospatial queries
   - Text index on `name`, `address`, and `city` fields for search

2. **Users Collection**:
   - Unique index on `email` field

3. **Complaints Collection**:
   - Compound index on `type` and `status`
   - Index on `senderEmail`
   - Index on `createdAt` (descending)

## Environment Setup for Testing

For testing purposes, you can use the following `.env` configuration:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/train-station-test-db
JWT_SECRET=test-jwt-secret-key-for-development-only
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-test-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-test-email@gmail.com
ADMIN_EMAIL=admin@trainstation.com
ADMIN_PASSWORD=admin123
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Note**: Make sure to use a separate test database and never use production credentials in development/testing environments.

