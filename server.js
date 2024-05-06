import express from 'express';
const app = express();

app.use('/.well-known', express.static('public'));

app.listen(5000, () => {
  console.log('Server started on port 5000');
});