module.exports = {
    'port': process.env.PORT || 8081,
    'database': 'mongodb://orelviacheslav:qwerty123@ds147450.mlab.com:47450/noderd',
    'corsOptions': {
        origin: 'http://localhost:8081',
        preflightContinue: true,
        optionsSuccessStatus: 200
    },
    'secret': 'verystrongpassword',
    'clientID': '420820097808-90u9use2l74bas2vfs08arib58lak74n.apps.googleusercontent.com',
    'clientSecret': 'nwc5MIUPDGZwZKzVY1bkv42h'
};
