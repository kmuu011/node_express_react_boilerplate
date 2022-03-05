require('module-alias/register');

const app = require('../app');
const http = require('http');
const config = require(`config`);

app.set('port', config.server.port);

(async () => {
    const server = http.createServer(app);

    server.listen(app.get('port'));
})().catch(err => {
    throw err;
});
