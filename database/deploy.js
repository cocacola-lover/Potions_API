"use strict";
const mysql = require('mysql');
const { host, user, password, database } = require('./../database_info.json');
const queries = require('./jsons/create_table_queries.json');
// Function to create tables from jsons' instructions;
function createTables() {
    // Connect to database
    const connection = mysql.createConnection({
        host, user, password, database
    });
    // Create tables using string queries from jsons/create_table_queires.json
    for (let value of Object.values(queries)) {
        connection.query(value, function (error, results, fields) {
            if (error)
                console.log(error.toString());
        });
    }
    connection.end();
}
module.exports = createTables;
