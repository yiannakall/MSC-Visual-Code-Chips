import { assert } from "./Utils/Utils.js";

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
    repeatable; // bool
    optional; // bool

    constructor(symbol, alias, repeatable, optional){
        this.symbol = symbol, this.alias = alias;
        this.repeatable = !!repeatable;
        this.optional = !!optional; 
    }

    Clone(){
        return new AliasedGrammarSymbol(
            this.symbol,
            this.alias,
            this.repeatable,
            this.optional
        );
    }

    static FromJson(symbolJson){
        return new AliasedGrammarSymbol(
            new GrammarSymbol(
                symbolJson.symbol.name,
                symbolJson.symbol.isTerminal
            ),
            symbolJson.alias,
            symbolJson.repeatable,
            symbolJson.optional
        );
    }
}

export class GrammarRuleRhs {
    rhs = [];               // AliasedGrammarSymbol[]

    constructor(rhs){
        this.rhs = rhs;
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
    
    static TerminalType = {
        Static:         "STATIC",
        Int:            "INT",
        Bool:           "BOOL",
        Char:           "CHAR",
        String:         "STRING",
        Float:          "FLOAT",
        Identifier:     "IDENTIFIER",
        Includes(type){
            return typeof type === 'string' && Object.values(this).includes(type);
        }
    };

    terminalTypes = new Map;

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

    SetTerminalType(symbol, type){
        assert(symbol.isTerminal);
        assert(Language.TerminalType.Includes(type));
        this.terminalTypes.set(symbol, type);
    }

    GetTerminalType(symbol){
        let type = this.terminalTypes.get(symbol);
        return type || Language.TerminalType.Static;
    }
}