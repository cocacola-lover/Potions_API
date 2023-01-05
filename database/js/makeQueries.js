"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertIntoPotions = exports.insertIntoPotionType = exports.insertIntoPotionQuality = exports.insertIntoIngredients = exports.insertIntoIngredientType = exports.insertIntoIngredientOrigin = void 0;
function insertIntoPotionQuality({ Tier, S0, S1, S2, S3, S4, S5 }) {
    return `INSERT INTO PotionQuality (tier, zeroStar, oneStar, twoStar, threeStar, fourStar, fiveStar) VALUE ('${Tier}', ${S0}, ${S1}, ${S2}, ${S3}, ${S4}, ${S5});`;
}
exports.insertIntoPotionQuality = insertIntoPotionQuality;
function insertIntoPotions({ Potion, A, B, C, D, E, Type }) {
    return `INSERT INTO Potions (potionName, potionType, A, B, C, D, E) VALUE ("${Potion}", ${Type}, ${A}, ${B}, ${C}, ${D}, ${E});`;
}
exports.insertIntoPotions = insertIntoPotions;
function insertIntoIngredients({ Ingredient, Rarity, A, B, C, D, E, Total, BasePrice, Taste, Sensation, Aroma, Visual, Sound, Type, Location }) {
    return `INSERT INTO Ingredients (name, rarity, ingredientType, A, B, C, D, E, total, taste, sensation, aroma, visual, sound, base_price, ingredientOrigin) VALUE ("${Ingredient}", ${Rarity}, ${Type}, ${A}, ${B}, ${C}, ${D}, ${E}, ${Total}, ${Taste}, ${Sensation}, ${Aroma}, ${Visual}, ${Sound}, ${BasePrice}, ${Location});`;
}
exports.insertIntoIngredients = insertIntoIngredients;
function insertIntoIngredientType(id, ingredientType) {
    return `INSERT INTO IngredientType (id, ingredientType) VALUE (${id}, '${ingredientType}');`;
}
exports.insertIntoIngredientType = insertIntoIngredientType;
function insertIntoIngredientOrigin(id, ingredientOrigin) {
    return `INSERT INTO IngredientOrigin (id, ingredientOrigin) VALUE (${id}, '${ingredientOrigin}');`;
}
exports.insertIntoIngredientOrigin = insertIntoIngredientOrigin;
function insertIntoPotionType(potionType) {
    return `INSERT INTO PotionType (potionType) VALUE ('${potionType}');`;
}
exports.insertIntoPotionType = insertIntoPotionType;
