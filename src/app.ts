import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import path from 'path';
import { uploadFileMiddleware } from './middleware/uploadMiddleware';
import indexRoutes from './routes/index';
import config from './config';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: config.sessionKey, resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(uploadFileMiddleware);

// Routes
app.use('/', indexRoutes);

// Sync database
config.db.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Error synchronizing database:', error);
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});