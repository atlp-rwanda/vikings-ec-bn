import dotenv from 'dotenv';
import app, { connectDB } from './src/app';

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();
