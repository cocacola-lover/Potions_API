
const mysql = require('mysql');

const {host, user, password, database} = require('./../database_info.json');
const queries : Object = require('./jsons/create_table_queries.json');


// Function to create tables from jsons' instructions;
function createTables () {

  // Connect to database
  const connection = mysql.createConnection({
    host, user, password, database
  });

  // Create tables using string queries from jsons/create_table_queires.json
  for (let value of Object.values(queries)) {
  
    connection.query(value, function (error : any, results : any, fields : any) {
      if (error) console.log(error.toString());
    })

  }
  connection.end();
}

// Function to for reading csv
function readCSVAndMake<I>(filePath : string , fn : (json:I) => void) {
  const Fs = require('fs');
  const CsvReadableStream = require('csv-reader');

  let inputStream = Fs.createReadStream(filePath, 'utf8');

  inputStream
	  .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, asObject : true }))
	  .on('data', fn);
}

// Function to fill tables with data
function fillTables () {
  
}


module.exports = createTables;