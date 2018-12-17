const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Body Parser for middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Initialize routes folder
const kitsuRoutes = require('./api/routes');
app.use('/api/routes', kitsuRoutes);

// // Serve static assets if in production build
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/client/build')));

//   app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// };

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port: ${port}`));

