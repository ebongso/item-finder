const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const tasks = require('./routes/tasks');

const port = 3001;
const app = express();

//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', tasks);

app.listen(process.env.PORT || port, () => {
  console.log('env dev');
});