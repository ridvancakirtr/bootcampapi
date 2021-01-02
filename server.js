const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const helmet = require("helmet");
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require("express-rate-limit");
const cors = require('cors');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

dotenv.config({ path: './config/config.env' })
const app = express()

//Dev logging middleware

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}


app.use(express.json());

//Connect to DB
connectDB();

//Apply to all requests limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//Parameter Pollution attacks
app.use(hpp());

//Prevent XSS Attack Clean
app.use(xss());

//Set security headers
app.use(helmet());

// Sanitize
app.use(mongoSanitize());

//File Upload
app.use(fileUpload());

//Cookie Parser
app.use(cookieParser());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const users = require('./routes/users')
const reviews = require('./routes/reviews')
const auth = require('./routes/auth')

//Mount files
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`.green.bold)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('Connection Error Reason:'.red.bold, reason.message);
    server.close(() => {
        process.exit(true);
    })
});