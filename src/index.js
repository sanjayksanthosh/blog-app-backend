require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const os = require('os'); // ← added

const { port, mongoURI } = require('./config');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => res.send('Blog API is running'));

// Get local network IP
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "0.0.0.0";
}

async function start() {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');

    app.listen(port, () => {
      const localIP = getLocalIP();
      console.log(`\n🚀 Server is running:`);      
      console.log(`➡ Local:   http://localhost:${port}`);
      console.log(`➡ Network: http://${localIP}:${port}\n`);
    });

  } catch (err) {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  }
}

start();
