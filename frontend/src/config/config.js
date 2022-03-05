let server_type = process.env.NODE_ENV;

let domain = {
    production: "http://127.0.0.1:8081/",
    development: "http://127.0.0.1:8081/"
};

const config = {};

config.domain = domain[server_type];

export default config;