"use strict";
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
const prompt = require("prompt-sync");
const promptS = prompt({ sigint: true });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const host = promptS('Please write host name: ');
        const user = promptS('Please write username: ');
        const password = promptS('Please write password: ');
        const database = promptS('Please write database name: ');
        const command = promptS('Do you want to deploy tables or drop them? Write "drop" or "deploy": ');
        if (command === 'drop') {
            const dropTables = require('./delete');
            yield dropTables({ host, user, password, database });
        }
        else if (command === 'deploy') {
            const createTables = require('./deploy');
            yield createTables({ host, user, password, database });
        }
        else {
            console.log('Wrong Input');
        }
    });
}
main();
