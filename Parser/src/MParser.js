const fs = require('fs');

class MParser {
    terminalTypes = [];
    definitions;

    constructor(){}

    LanguageToJson(){
        let language = {};

        language.definitions    = this.definitions;
        language.terminalTypes  = this.terminalTypes;

        return language;
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
    
    ParseDef(name, defType, items){
        if (!Array.isArray(items))
            items = [items];
    
        let def = {};
    
        def.name = name;
        def[defType] = items;
    
        return def;
    }

    ParseQuotedId(id){
        let escapedQuotes = /\\\"/g;
        return id.substring(1, id.length - 1).replace(escapedQuotes, "\"");
    }
    
    ParseItem(type, name, alias, tooltip){
        let item = { };
    
        item.type = type.type;
        item.name = name;
        
        if (alias)      item.alias = alias;
        if (tooltip)    item.tooltip = tooltip;
    
        if (type.basicType){
            let currentEntry = this.terminalTypes.find((entry) => entry.name === name);

            if (currentEntry){
                if (currentEntry.type !== type.basicType)
                    console.warn( `Warning: Trying to set type ${type.basicType} for terminal ${name} when its type was previously set to ${currentEntry.type}`);
            } else
                this.terminalTypes.push({name, type: type.basicType});
        }

        return item;
    }
    
    ParseItemType(type, basicType){
        return { type, basicType };
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