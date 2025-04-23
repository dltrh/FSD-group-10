const express = require('express');
const app = express();
require('dotenv').config();

const db = require('./models'); // import sequelize + models

app.use(express.json());

// test database connection
db.sequelize.authenticate()
    .then(() => console.log('✅ Database connected...'))
    .catch(err => console.error('❌ Error: ' + err));

// optional: sync db
// db.sequelize.sync({ force: false });

app.get('/', (req, res) => {
    res.send('Hello from EventApp Server!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
