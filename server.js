const express = require('express');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const expressWs = require('express-ws');
expressWs(app);

const authRouter = require('./src/routes/authRouter');
const usersRouter = require('./src/routes/usersRouter');
const boardRouter = require('./src/routes/boardRouter');
const listRouter = require('./src/routes/listRouter');
const taskRouter = require('./src/routes/taskRouter');
const graphqlRouter = require('./src/graphql/graphqlRouter');
const wsRouter = require('./src/routes/wsRouter');

// DB CONNECTION =====================================================

mongoose.connect(config.database, {useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("connected");
});

// APP CONFIGURATION =================================================

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors(config.corsOptions));

app.use(morgan('dev'));

// PASSPORT INITIALIZE =================================================

app.use(passport.initialize());
require('./src/auth/passport')(passport);

function returnToken(req, res, next) {
  return res.json({
    token: getToken(req.user)
  });
}

// ROUTES FOR API =====================================================

// app.use('/api/', require('./routes'));
// app.use('/api/v2', require('./routes/v2'))

app.use('/api/auth', authRouter);
app.use('/api/auth/login/google', passport.authenticate('google', { scope: ['profile'] }));
app.use('/api/auth/login/google/callback', passport.authenticate('google'), returnToken);
app.use('/api/auth', authRouter);
app.use('/api/users', passport.authenticate('jwt', { session: false }), usersRouter);
app.use('/api/board', passport.authenticate('jwt', { session: false }), boardRouter);
app.use('/api/list', passport.authenticate('jwt', { session: false }), listRouter);
app.use('/api/task', taskRouter, passport.authenticate('jwt', { session: false }), taskRouter);

app.use('/api/graphql', graphqlRouter);
app.use('/api/ws', wsRouter);

//START SERVER ========================================================
app.listen(config.port);
console.log('Server start on port ' + config.port);
