const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'api', timestamp: new Date().toISOString() });
});

app.get('/api/docs', (req, res) => {
  res.json({ 
    message: 'Documentation Operations Center API',
    version: '1.0.0',
    endpoints: [
      { path: '/health', method: 'GET', description: 'Health check endpoint' },
      { path: '/api/docs', method: 'GET', description: 'API documentation' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`API service listening on port ${PORT}`);
});
