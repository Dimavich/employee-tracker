const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3301,
    user:'root',
    password:'root',
    database:'employees_db',
});
