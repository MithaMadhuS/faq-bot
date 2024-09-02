process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const faqRoutes = require('./routes/faq');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/faq', faqRoutes);

app.get('/', (req, res) => {
  res.send('FAQ Bot is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

