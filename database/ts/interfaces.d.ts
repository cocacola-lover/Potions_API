interface Potion {
    Potion: string,
    A, B, C, D, E : number,
    Type : string | number
}

interface Quality {
    Tier : string,
    S0, S1, S2, S3, S4, S5 : number
}

interface Ingredient {
    Ingredient : string,
    Rarity, A, B,C, D, E, Total, BasePrice : number,
    Taste, Sensation, Aroma, Visual, Sound : boolean,
    Type, Location : string | number
}