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

const createdConnection = require('./database/database');
const errorHandler = require('./middleware/error.middleware');

createdConnection()

const { PORT } = process.env || 8080;

app.use(express.json());
app.use(cors());
app.use('/v1/api/user', userRoutes);
app.use('/v1/api/product', productRoutes);
app.use('/v1/api/admin', adminRoutes);
app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/category', categoryRoutes);

app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('API is running...');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});