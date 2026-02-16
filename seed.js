const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false,
});

const User = require('./models/User')(sequelize);
const Event = require('./models/Event')(sequelize);

// Association
Event.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });
User.hasMany(Event, { foreignKey: 'createdBy' });

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

const sampleEvents = [
  {
    name: 'React Conference 2024',
    description: 'Join industry leaders to learn about the latest React features and best practices',
    organizer: 'React Community',
    location: 'San Francisco, CA',
    date: new Date('2024-06-15'),
    time: '09:00 AM',
    capacity: 500,
    category: 'Conference',
    tags: JSON.stringify(['React', 'Web Development', 'JavaScript']),
  },
  {
    name: 'Node.js Workshop',
    description: 'Hands-on workshop to build scalable backend applications with Node.js',
    organizer: 'Node Academy',
    location: 'New York, NY',
    date: new Date('2024-06-20'),
    time: '10:00 AM',
    capacity: 100,
    category: 'Workshop',
    tags: JSON.stringify(['Node.js', 'Backend', 'JavaScript']),
  },
  {
    name: 'Web Design Masterclass',
    description: 'Learn modern web design principles and UI/UX best practices',
    organizer: 'Design Institute',
    location: 'Los Angeles, CA',
    date: new Date('2024-06-25'),
    time: '02:00 PM',
    capacity: 150,
    category: 'Masterclass',
    tags: JSON.stringify(['Design', 'UI/UX', 'Web']),
  },
  {
    name: 'MongoDB Database Optimization',
    description: 'Advanced techniques for optimizing database queries and indexes',
    organizer: 'Database Inc',
    location: 'Austin, TX',
    date: new Date('2024-07-01'),
    time: '11:00 AM',
    capacity: 200,
    category: 'Seminar',
    tags: JSON.stringify(['Database', 'Backend']),
  },
  {
    name: 'Full Stack Development Bootcamp',
    description: 'Intensive bootcamp covering frontend, backend, and database technologies',
    organizer: 'Tech Academy',
    location: 'Seattle, WA',
    date: new Date('2024-07-10'),
    time: '09:00 AM',
    capacity: 80,
    category: 'Bootcamp',
    tags: JSON.stringify(['Full Stack', 'MERN', 'Web Development']),
  },
  {
    name: 'AWS Cloud Computing Summit',
    description: 'Explore AWS services and cloud architecture for scalable applications',
    organizer: 'AWS Community',
    location: 'Boston, MA',
    date: new Date('2024-07-15'),
    time: '08:30 AM',
    capacity: 300,
    category: 'Summit',
    tags: JSON.stringify(['AWS', 'Cloud', 'DevOps']),
  }
];

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database tables created');

    const createdEvents = await Event.bulkCreate(sampleEvents);
    console.log(`Successfully created ${createdEvents.length} sample events`);

    console.log('\nSample Events:');
    createdEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.name}`);
    });

    await sequelize.close();
    console.log('\nDatabase seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
