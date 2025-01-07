require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
// Improts
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const adminRoutes = require('./routes/admin.route');
const authRoutes = require('./routes/auth.route');
const categoryRoutes = require('./routes/category.route');
const uploadRoutes = require('./routes/upload.route');

const createdConnection = require('./database/database');
const errorHandler = require('./middleware/error.middleware');
const setupCloudinary = require('./config/cloudinary');


// Config cloudinary
setupCloudinary();

// Connect to MongoDB
createdConnection()

const { PORT } = process.env || 8080;

app.use(cors());
app.use(express.json());

app.use('/v1/api/user', userRoutes);
app.use('/v1/api/product', productRoutes);
app.use('/v1/api/admin', adminRoutes);
app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/category', categoryRoutes);
app.use('/v1/api/upload', uploadRoutes);

app.use(errorHandler);

// make the uploads folder accessible
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('API is running...');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});