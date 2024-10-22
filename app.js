require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.port||3500;
const {logger} = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const corsOptions = require('./config/corsOptions');

app.use(logger);
app.use(cors());
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use('/',require('./routes/root'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')) {
        res.json({message: '404 Not found'});
    }else {
        res.type('txt').send('404 Not found');
    }
});

app.use(errorHandler);

app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
});
