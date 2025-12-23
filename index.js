const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/sync',(req, res) => {
    res.send('data is succesffully synced with postgresDb');
});

app.listen(PORT, () => console.log(`server started at ${PORT}`))