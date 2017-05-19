const express = require('express');

const app = express();

// Server routes ..
app.get('/hello', (req, res) => res.send({hi: here}));


// check if we are not in production and use the middleware
if (process.env.NODE_ENV !== 'production') {

    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    // Tell our express app to use the middleware which in return use the config of
    // the webpack itself
    app.use(webpackMiddleware(webpack(webpackConfig)));
}else{
    app.use(express.static('dist')); // make dist directory to the web 
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    })
}

app.listen(process.env.PORT || 1234, () => console.log("here we go"));