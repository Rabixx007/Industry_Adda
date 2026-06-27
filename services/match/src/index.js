const express = require('express');
const app = express();
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'match' }));
app.listen(3003, () => console.log('Match running on 3003'));
