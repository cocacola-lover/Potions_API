"use strict";
// This module is to create a function that deploys 
// tables to a mysql database. It extracts info from 
// csv files
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
// npm packages
const mysql = require("mysql");
const fs = require("fs");
const CsvReadableStream = require('csv-reader');
// Jsons
const { host, user, password, database } = require('./../../database_info.json');
const createQueries = require('./../jsons/create_table_queries.json');
// My modules
const makeFormatQueries = require("./makeQueries");
// Convert connection.query so it returns a promise
function makeAQuery(connection, value) {
    return new Promise((resolve) => {
        connection.query(value, function (error, results, fields) {
            if (error)
                console.log(error.toString());
            resolve(true);
        });
    });
}
// Function to create tables from jsons' instructions;
function createTables(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create tables using string queries from jsons/create_table_queires.json
        for (let value of Object.values(createQueries))
            yield makeAQuery(connection, value);
        console.log('Tables have been deployed');
    });
}
// Function to for reading csv that returns a promise
function readCSVAndMake(filePath, callback) {
    return new Promise((resolve) => {
        let inputStream = fs.createReadStream(filePath, 'utf8');
        inputStream
            .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, asObject: true }))
            .on('data', callback)
            .on('end', resolve);
    });
}
// Function that read potionQuality.csv
function readPotionQuality(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        yield readCSVAndMake('./../csv/potionQuality.csv', (json) => __awaiter(this, void 0, void 0, function* () {
            console.log(`Reading ${json.Tier}`);
            yield makeAQuery(connection, makeFormatQueries.insertIntoPotionQuality(json));
            console.log(`Read ${json.Tier}`);
        }));
    });
}
// Function to fill tables with data
function fillTables(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        yield readPotionQuality(connection);
    });
}
// Main function that deploys tables to database
function deploy() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = mysql.createConnection({
            host, user, password, database
        });
        yield createTables(connection);
        yield fillTables(connection);
        connection.end();
    });
}
module.exports = deploy;
