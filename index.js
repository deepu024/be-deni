require('dotenv').config();

const express = require('express');
const app = express();

// Improts
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const adminRoutes = require('./routes/admin.route');

const createdConnection = require('./database/database');

createdConnection()

const { PORT } = process.env || 8080;

app.use(express.json());
app.use('/v1/api/user', userRoutes);
app.use('/v1/api/product', productRoutes);
app.use('/v1/api/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});