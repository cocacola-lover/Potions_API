// This module is to build function that drops all created Tables.

// Imports
  // npm packages
import mysql = require('mysql');
  // json
const drop : Object = require('./../jsons/drop_table_queries.json');
const {host, user, password, database} = require('./../../database_info.json');

// Convert connection.query so it returns a promise
function makeAQuery (connection : mysql.Connection, value : string) {
    return new Promise((resolve) => {
      connection.query(value, function (error : any, results : any, fields : any) {
        if (error) console.log(error.toString());
        resolve(true);
      })
    })
  }


async function dropTables() {
  const connection = mysql.createConnection({
    host, user, password, database
  });

  for (const value of Object.values(drop)) await makeAQuery(connection, value);

  connection.end();
}

module.exports = dropTables;