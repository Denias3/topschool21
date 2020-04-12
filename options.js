var mysql = require('mysql');

// Connection MySQL
var now = new Date()
const connectMysql = {
    host: 'localhost',
    port: '3307',
    user: 'foo',
    password: 'qwer',
    database: 'topschooldb',
    connectTimeout: 1000 * 60 * 60,
    timezone: now
};

var connection;

// Application data

const UID = '134aa95d1779bbcc234248352c50c449522f3bf8b359c4ed2e3dde864895f793';
const SECRET = '1f2972bae3fbd338a71dca65e7fe7ba8b3428668f8aa5ef084631de2b04a69d2';
var token;

// URL

var cursus_users_url = new URL("https://api.intra.42.fr/v2/cursus/1/cursus_users");
var cursus_users_params = {"filter[campus_id]": 17, "page[size]": 100};

var users_url = new URL("https://api.intra.42.fr");

var projects_users_url = new URL("https://api.intra.42.fr");
var projects_users_params =  {"page[size]": 100};

module.exports= {
    connection: connection,
    connectMysql: connectMysql,
    UID: UID,
    SECRET: SECRET,
    cursus_users_url: cursus_users_url,
    cursus_users_params: cursus_users_params,
    users_url: users_url,
    projects_users_url: projects_users_url,
    projects_users_params: projects_users_params,
    token: token
};