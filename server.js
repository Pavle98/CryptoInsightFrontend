const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();

// Use the history API fallback middleware to handle potential 404 responses.
// This is especially useful if you are using Vue Router in 'history' mode.
app.use(history());

// Serve static assets from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle any other routes to the root of the app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
