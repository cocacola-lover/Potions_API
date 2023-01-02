function insertIntoPotionQuality({Tier, S0 , S1 , S2, S3, S4, S5} : Quality) {
    return `INSERT INTO PotionQuality (tier, zeroStar, oneStar, twoStar, threeStar, fourStar, fiveStar) VALUE ('${Tier}', ${S0}, ${S1}, ${S2}, ${S3}, ${S4}, ${S5});`
}

function insertIntoPotions ( {Potion, A, B, C, D, E, Type} : Potion) {
    return `INSERT INTO Potions (potionName, potionType, A, B, C, D, E) VALUE ('${Potion}', ${Type}, ${A}, ${B}, ${C}, ${D}, ${E});`
}

function insertIntoIngredients ( {Ingredient, Rarity, A, B,C, D, E, Total, BasePrice,Taste, Sensation, Aroma, Visual, Sound, Type, Location} : Ingredient) {
    return `INSERT INTO Potions (name, rarity, ingredientType, A, B, C, D, E, total, taste, sensation, aroma, visual, sound, base_price, ingredientOrigin) VALUE ('${Ingredient}', ${Rarity}, ${Type}, ${A}, ${B}, ${C}, ${D}, ${E}, ${Total}, ${Taste}, ${Sensation}, ${Aroma}, ${Visual}, ${Sound}, ${BasePrice}, ${Location});`
}

function insertIntoIngredientType(ingredientType : string) {
    return `INSERT INTO IngredientType (ingredientType) VALUE ('${ingredientType}');`;
}

function insertIntoIngredientOrigin(ingredientOrigin : string) {
    return `INSERT INTO IngredientOrigin (ingredientOrigin) VALUE ('${ingredientOrigin}');`;
}

function insertIntoPotionType(potionType : string) {
    return `INSERT INTO PotionType (potionType) VALUE ('${potionType}');`;
}

export {
    insertIntoIngredientOrigin,
    insertIntoIngredientType,
    insertIntoIngredients,
    insertIntoPotionQuality,
    insertIntoPotionType,
    insertIntoPotions
}