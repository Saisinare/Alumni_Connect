import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import { connectToDatabase } from './db/mongoose.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

connectToDatabase()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });


