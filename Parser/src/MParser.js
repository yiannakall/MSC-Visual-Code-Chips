const fs = require('fs');

class MParser {
    types = {
        /* predefined types */
        IDENT:          'terminal',
        INT_CONST:      'terminal',
        FLOAT_CONST:    'terminal',
        STRING_CONST:   'terminal',
        CHAR_CONST:     'terminal',
        BOOL_CONST:     'terminal'
        /* more symbol types will be inserted while parsing */
    };
    definitions;

    constructor(){}

    LanguageToJson(){
        let language = { };
        
        language.definitions    = this.definitions;

        return language;
    }

    SetType(name, type){
        if (this.types[name]) {
            if (this.types[name] !== type)
                console.warn( `Warning: Trying to set type ${type} for ${name} when its type was previously set to ${this.types[name]}`);
        }
        else
            this.types[name] = type;
    }

    ParseProgram(defs) {
        this.definitions = defs;

        let language = this.LanguageToJson();
        fs.writeFileSync('./grammar.json', JSON.stringify(language, null, 4) , 'utf-8');

        return language;
    }
    
    ParseDefs(def, defs){
        if (!def)
            return [];
        else{
            defs.unshift(def);
            return defs;
        }
    }
    
    ParseTokenDef(type, names){
        for (let name of names)
            this.SetType(name, type);
    }

    ParseDef(name, defType, items){
        if (!Array.isArray(items))
            items = [items];
    
        let def = {};
    
        def.name = name;
        def[defType] = items;
    
        return def;
    }

    ParseIds(id, ids){
        ids.unshift(id);
        return ids;
    }
    
    ParseOptIds(id, ids){
        if (!id)
            return [];
        else{
            ids.unshift(id);
            return ids;
        }
    }

    ParseQuotedId(id){
        let escapedQuotes = /\\\"/g;
        return id.substring(1, id.length - 1).replace(escapedQuotes, "\"");
    }
    
    ParseItem(type, name, alias, tooltip){
        if (type){
            this.SetType(name, type);
        }
        else if (!this.types[name]){
            console.warn( `Warning: Missing type for ${name}, assuming terminal`);
            this.SetType(name, 'terminal');
        }

        let item = {};

        item.type = this.types[name];
        item.name = name;

        if (alias)      item.alias = alias;
        if (tooltip)    item.tooltip = tooltip;

        return item;
    }

    ParseItems(item, items){
        items.unshift(item);
        return items;
    }
    
    ParseOptItems(item, items){
        if (!item)
            return [];
        else{
            items.unshift(item);
            return items;
        }
    }
}

module.exports.MParser = MParser;