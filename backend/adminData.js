// backend/adminData.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Department = require('./models/Department');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const hods = [
  { name: 'Dr. A Kumar', email: 'hod.cse@example.com', password: '123456', role: 'hod', department: 'CSE' },
  { name: 'Dr. Annapurna P Patil', email: 'hod.ise@example.com', password: '123456', role: 'hod', department: 'ISE' },
  { name: 'Dr. B Reddy', email: 'hod.mech@example.com', password: '123456', role: 'hod', department: 'MECH' },
  { name: 'Dr. C Sharma', email: 'hod.civil@example.com', password: '123456', role: 'hod', department: 'CIVIL' },
  { name: 'Dr. D Nair', email: 'hod.ece@example.com', password: '123456', role: 'hod', department: 'ECE' },
  { name: 'Dr. E Singh', email: 'hod.eee@example.com', password: '123456', role: 'hod', department: 'EEE' },
];

const seedData = async () => {
  try {
    await User.deleteMany({ role: 'hod' });
    await Department.deleteMany();

    for (const hod of hods) {
      const hashedPassword = await bcrypt.hash(hod.password, 10);

      const newHod = new User({
        name: hod.name,
        email: hod.email,
        password: hashedPassword,
        role: 'hod',
        department: hod.department,
      });

      const savedHod = await newHod.save();

      const newDept = new Department({
        name: hod.department,
        hod: savedHod._id,
      });

      await newDept.save();

      console.log(`Created HOD ${hod.name} and department ${hod.department}`);
    }

    console.log('✅ All HODs and Departments seeded successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    mongoose.disconnect();
  }
};

seedData();
