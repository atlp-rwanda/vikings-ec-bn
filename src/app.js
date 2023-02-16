import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import swaggerUI from 'swagger-ui-express';
import docs from './documentation';
import { sequelize } from './database/models';
import routes from './routes/index';
import fileUpload from 'express-fileupload';

let options = {
  validatorUrl: null,
  oauth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    appName: 'E-Commerce',
  },
};

dotenv.config();

const app = express();
app.use(
  session({
    secret: process.env.CAT,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (err) {
    console.log(`Database connection failed: ${err}`);
    process.exit(1);
  }
};
app.use(fileUpload(
    {
      useTempFiles: true
    }
));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs, false, options));
app.use('/api/v1', routes);

app.use('*', (req, res) => {  // keep this at the bottom
  res.status(404).json({error: 'resource not found'});
});
export default app;
