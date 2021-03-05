export class GrammarSymbol {
    name;
    isTerminal;

    constructor(name, isTerminal){
        this.name = name, this.isTerminal = isTerminal;
    }
}

export class AliasedGrammarSymbol {
    symbol; // GrammarSymbol
    alias;  // string

    constructor(symbol, alias){
        this.symbol = symbol, this.alias = alias; 
    }
}

export class GrammarRuleRhs {
    rhs = [];               // AliasedGrammarSymbol[]
    canRepeatInfinitely;    // to allow a form of non-recursive repetitions

    constructor(rhs, canRepeatInfinitely){
        this.rhs = rhs, this.canRepeatInfinitely = canRepeatInfinitely;
    }

    CanRepeat(){
        return this.canRepeatInfinitely;
    }

    GetSymbols(){
        return this.rhs;
    }
}

export class GrammarProduction {
    lhs;                    // GrammarSymbol
    rhs;                    // GrammarRuleRhs

    constructor(lhs, rhs){
        this.lhs = lhs, this.rhs = rhs;
    }

    GetRhs(){
        return this.rhs;
    }

    GetLhs(){
        return this.lhs;
    }
}

export class Language {
    terminals = [];                     // GrammarSymbol[]
    nonTerminals = [];                  // GrammarSymbol[]
    productions = new Map;              // Map<GrammarSymbol, GrammarProduction[]>

    GetSymbol(nameStr, isTerminal){
        if (isTerminal === undefined)
            return this.GetSymbol(nameStr, true) | this.GetSymbol(nameStr, false)

        let container = isTerminal ? this.terminals : this.nonTerminals;
        return container.find(symbol => symbol.name === nameStr);
    }

    AddSymbol(symbol){
        let container = symbol.isTerminal ? this.terminals : this.nonTerminals;
        container.push(symbol);
    }

    GetOrAddSymbol(nameStr, isTerminal){
        let symbol = this.GetSymbol(nameStr, isTerminal);
        if (!symbol){
            symbol = new GrammarSymbol(nameStr, isTerminal);
            this.AddSymbol(symbol);
        }
        return symbol;
    }

    AddProduction(symbol, rhs){
        symbol.isTerminal ? alert('error') : false; 
        let symProductions = this.productions.get(symbol);
        if (!symProductions){
            this.productions.set(symbol, []);
            symProductions = this.productions.get(symbol);
        }
        symProductions.push(new GrammarProduction(symbol, rhs));
    }

    GetProductions(symbol) {
        return this.productions.get(symbol);
    }
}