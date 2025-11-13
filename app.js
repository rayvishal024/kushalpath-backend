import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';

// Importing Routes
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js'
import userRoutes from './routes/user.routes.js'

// creating app
const app = express();

// setup Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: 'GET,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Routes Inilization
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
// app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/user', userRoutes);

// Default Route  
app.get('/', (req, res) => {
  res.send('This is kushalpath API Endpoint');
});

app.use(errorMiddleware);

export default app;