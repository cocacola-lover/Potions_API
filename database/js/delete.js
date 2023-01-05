"use strict";
// This module is to build function that drops all created Tables.
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
// json
const drop = require('./../jsons/drop_table_queries.json');
const { host, user, password, database } = require('./../../database_info.json');
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
function dropTables() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = mysql.createConnection({
            host, user, password, database
        });
        for (const value of Object.values(drop))
            yield makeAQuery(connection, value);
        connection.end();
    });
}
module.exports = dropTables;
