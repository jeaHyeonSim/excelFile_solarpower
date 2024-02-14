let config = {};

// server env dev, prod
config.env = "dev"
// config.env = "prod"

// Server info
config.server_ip = "localhost";
config.server_port = "9099";
config.session_time = 1 * 30 * 1000;
config.cookie_time = 1 * 30 * 1000;

// DB info
// config.connection_info = {
//     host: "",
//     port: 5432,
//     user: "root",
//     password:"1234",
//     database:"SZ_SPPM",
//     connectionLimit: 10,
//     multipleStatements: true
// };

// 기상정보 접속 key
config.apiKey = "rFQGSmKC0okekhO4D79Zw0QJugOvcbC3gvWgQHOCeDm7sskr7Nru3gUQ0bp2G%2FlS7lgrx0xqI3fszVbEilxHwg%3D%3D";


module.exports = config;