const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/log', (req, res) => {
    console.log('Log received:', req.body);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Logging server running at http://localhost:${port}`);
});
