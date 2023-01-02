// This module is to create a function that deploys 
// tables to a mysql database. It extracts info from 
// csv files

// Imports
  // npm packages
import mysql = require('mysql');
import fs = require('fs');
const CsvReadableStream = require('csv-reader');

  // Jsons
const {host, user, password, database} = require('./../../database_info.json');
const createQueries : Object = require('./../jsons/create_table_queries.json');
  // My modules
import makeFormatQueries = require('./makeQueries');

// Convert connection.query so it returns a promise
function makeAQuery (connection : mysql.Connection, value : string) {
  return new Promise((resolve) => {
    connection.query(value, function (error : any, results : any, fields : any) {
      if (error) console.log(error.toString());
      resolve(true);
    })
  })
}

// Function to create tables from jsons' instructions;
async function createTables (connection : mysql.Connection) {

  // Create tables using string queries from jsons/create_table_queires.json
  for (let value of Object.values(createQueries)) await makeAQuery(connection, value);

  console.log('Tables have been deployed')
}


// Function to for reading csv that returns a promise
function readCSVAndMake<I>(filePath : string , callback : (json:I) => void) {
  
  return new Promise((resolve) => {
    let inputStream = fs.createReadStream(filePath, 'utf8');

    inputStream
	    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, asObject : true }))
	    .on('data', callback)
      .on('end', resolve);
    });
}

// Function that read potionQuality.csv
async function readPotionQuality(connection : mysql.Connection) {

  await readCSVAndMake<Quality>('./../csv/potionQuality.csv', async (json : Quality) => {
    console.log(`Reading ${json.Tier}`);
    await makeAQuery(connection, makeFormatQueries.insertIntoPotionQuality(json));
    console.log(`Read ${json.Tier}`);
  })
}

// Function to fill tables with data
async function fillTables (connection : mysql.Connection) {
    await readPotionQuality(connection);
}

// Main function that deploys tables to database
async function deploy() {
  const connection = mysql.createConnection({
    host, user, password, database
  });

  await createTables(connection);

  await fillTables(connection);

  connection.end();
}


module.exports = deploy;