interface Potion {
    Potion: string,
    A : number, B : number, C : number, D : number, E : number,
    Type : string | number
}

interface Quality {
    Tier : string,
    S0 : number, S1 : number, S2 : number, S3 : number, S4 : number, S5 : number
}

interface Ingredient {
    Ingredient : string,
    Rarity : number, A : number, B : number, C : number, D : number, E : number, Total : number, BasePrice : number,
    Taste : boolean, Sensation : boolean, Aroma : boolean, Visual : boolean, Sound : boolean,
    Type : string | number, Location : string | number
}

interface mainInput {
    host : string, user : string, password : string, database : string;
  }