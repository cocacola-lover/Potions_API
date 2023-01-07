// This module is to create a function that deploys 
// tables to a mysql database. It extracts info from 
// csv files

// Imports
  // npm packages
import mysql = require('mysql');
import fs = require('fs');
const CsvReadableStream = require('csv-reader');

  // Json
const createQueries : Object = require('./../jsons/create_table_queries.json');
  // My modules
import makeFormatQueries = require('./makeQueries');

// Convert connection.query so it returns a promise
function makeAQuery (connection : mysql.Connection, value : string) {
  return new Promise((resolve) => {
    connection.query(value, function (error : any, results : any, fields : any) {
      if (error) {console.log(error.toString(), value);}
      resolve(true);
    })
  })
}

// Function to create tables from jsons' instructions;
async function createTables (connection : mysql.Connection) {

  // Create tables using string queries from jsons/create_table_queires.json
  for (let value of Object.values(createQueries)) await makeAQuery(connection, value);

}


// Function to for reading csv that returns a promise
function readCSVAndMake<I>(filePath : string , callback : (json:I) => Promise<unknown>) {
  
  return new Promise((resolve) => {
    let inputStream = fs.createReadStream(filePath, 'utf8');

    const promises :Promise<unknown>[] = [];

    inputStream
	    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, asObject : true }))
	    .on('data', (data:any) => promises.push(callback(data)))
      .on('end', () => Promise.all(promises).then(resolve));
    });

}

// Function that reads potionQuality.csv
async function readPotionQuality(connection : mysql.Connection) {
  
  await readCSVAndMake<Quality>('./csv/potionQuality.csv', async (json : Quality) => {
    return makeAQuery(connection, makeFormatQueries.insertIntoPotionQuality(json));
  })
}
// Fucntion that reads potions.csv
async function readPotions(connection : mysql.Connection) {

  const types = new Map<string, number>();
  let i = 1;

  await readCSVAndMake<Potion>('./csv/potions.csv', async (json : Potion) => {

    if ( !types.has(json.Type as string) ) {
      types.set(json.Type as string, i++);
      await makeAQuery(connection, makeFormatQueries.insertIntoPotionType(json.Type as string));
    }
    json.Type = types.get(json.Type as string) as number;

    return makeAQuery(connection, makeFormatQueries.insertIntoPotions(json));
  })

}
// Fucntion that reads ingredients.csv
async function readIngredients(connection : mysql.Connection) {

  const types = new Map<string, number>();
  const locations = new Map<string, number>();
  let ity = 1, ilo = 1;

  await readCSVAndMake<Ingredient>('./csv/ingredients.csv', async (json : Ingredient) => {

    if ( !types.has(json.Type as string) ) {

      types.set(json.Type as string, ity++);
      if (!locations.has(json.Location as string)) {
        locations.set(json.Location as string, ilo++);
        await makeAQuery(connection, makeFormatQueries.insertIntoIngredientOrigin(locations.get(json.Location as string) as number, json.Location as string))
      }
      await makeAQuery(connection, makeFormatQueries.insertIntoIngredientType(types.get(json.Type as string) as number, json.Type as string));
    } else if (!locations.has(json.Location as string)) {
      locations.set(json.Location as string, ilo++);
      await makeAQuery(connection, makeFormatQueries.insertIntoIngredientOrigin(locations.get(json.Location as string) as number, json.Location as string))
    }
    
    json.Type = types.get(json.Type as string) as number;
    json.Location = locations.get(json.Location as string) as number;

    return makeAQuery(connection, makeFormatQueries.insertIntoIngredients(json));
  })
}

// Function to fill tables with data
async function fillTables (connection : mysql.Connection) {
    await readPotionQuality(connection);
    await readPotions(connection);
    await readIngredients(connection);
}

async function checkIfDeployed(connection : mysql.Connection) : Promise<boolean> {
    return await new Promise((resolve) => {
      connection.query('SHOW TABLES;', function (err, results) {
        resolve( (results as any[])[0] !== undefined);
      });
    })
}

// Main function that deploys tables to database
async function deploy({host, user, password, database} : mainInput) {
  const connection = mysql.createConnection({
    host, user, password, database
  });
  if (await checkIfDeployed(connection)) {
    console.log('The database is not empty');
    connection.end();
    return;
  };

  await createTables(connection);

  await fillTables(connection);

  connection.end();
  console.log('All tables have been deployed 🌈');

}


module.exports = deploy;