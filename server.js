const express = require('express');
const cors = require('cors');
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false,
});

// Test connection
sequelize.authenticate()
  .then(() => console.log('SQLite database connected'))
  .catch(err => console.log('Database connection error:', err));

// Models
const User = require('./models/User')(sequelize);
const Event = require('./models/Event')(sequelize);

// Association
Event.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });
User.hasMany(Event, { foreignKey: 'createdBy' });

// Many-to-Many relationship for event registrations
Event.belongsToMany(User, { 
  through: 'EventRegistrations',
  as: 'registeredUsers',
  foreignKey: 'eventId'
});
User.belongsToMany(Event, { 
  through: 'EventRegistrations',
  as: 'registeredEvents',
  foreignKey: 'userId'
});

// Sync database
sequelize.sync({ alter: false })
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Sync error:', err));

// Routes with models
app.use('/api/auth', require('./routes/authRoutes')(User));
app.use('/api/events', require('./routes/eventRoutes')(Event, User));
app.use('/api/users', require('./routes/userRoutes')(User, Event));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
