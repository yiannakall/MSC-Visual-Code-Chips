import { Block } from "./block.js";
import { Group } from "./group.js";
import { AliasedGrammarSymbol, GrammarRuleRhs, GrammarProduction, Language} from '../language.js'

export const Editor = {
    code_priv: undefined,
    language_priv: undefined,
    $container_priv: undefined,
    $editor_priv: undefined,
    selected_priv: undefined,
    dynamicTerminalTypes_priv: undefined,
    terminalValidationPredicates: {
        int : (text) => {
            return Number.isInteger(Number(text));
        },
        float: (text) => {
            return Number.isFinite(Number(text));
        },
        char: (text) => {
            return text.length === 1;
        },
        string: (text) => {
            return true;
        },
        bool: (text) => {
            return text === 'true' || text === ' false';
        },
        identifier: (text) => {
            let matched = /[_A-Za-z]+[_A-Za-z0-9]*/g.exec(text);
            return matched && matched[0] === text;
        }
    },
    Init: ($container) => {
        Block.OnClick = Group.OnClick = (event, elem) => {
            Editor.Select_priv(elem);
            event.stopPropagation();
        }

        Block.OnInput = (block, $input) => {
            let type = Editor.dynamicTerminalTypes_priv.get(block.symbol.symbol);
            let isValid = Editor.terminalValidationPredicates[type];
            
            let text = $input.val();
            if ($input.val() === '' || isValid(text)){
                $input.removeClass('invalid-input');
            }else{
                $input.addClass('invalid-input');
            }

            if (block.symbol.repeatable){
                /* create code for a non repeating version of the GrammarSymbol */
                let vc = Editor.CreateVisualCode(
                    new AliasedGrammarSymbol(block.symbol.symbol, block.symbol.alias, false)
                );
                vc.generatedBy = block;

                /* simulate typing on the generated block and not on the repeatable block */
                vc.userInput = $input.val();
                block.userInput = undefined;

                Editor.InsertBeforeWithOffset_priv(block, 0, vc);

                Editor.Refresh();
                Editor.Select_priv(vc);
                vc.GetInput().focus();
            }
        }

        Block.OnChange = (block, selectedAliasedSymbol) => {
            let vc = Editor.CreateVisualCode(selectedAliasedSymbol);
            vc.generatedBy = block;

            Editor.InsertBeforeWithOffset_priv(block, 0, vc);

            if (!block.symbol.repeatable){
                Editor.DeleteWithOffset_priv(block, 0);
            }else{
                Editor.InsertBeforeWithOffset_priv(block, 0, Block.CreateNewLine());
            }

            Editor.Refresh();
            Editor.Select_priv(vc);
        }

        Block.GetCssClassesToApply = Group.GetCssClassesToApply = (elem) => {
            if (elem.symbol){
                return [elem.symbol.symbol.name];
            }else{
                return [elem.typeId];
            }
        }

        $container.empty();
        Editor.$editor_priv = $('<div class = "editor" tabIndex = "0"></div>');
        
        Editor.code_priv = new Group(
            new AliasedGrammarSymbol(Editor.language_priv.GetSymbol('program', false)),
            [
                Editor.CreateVisualCode(new AliasedGrammarSymbol(Editor.language_priv.GetSymbol('program', false)))
            ]
        );
        
        Editor.code_priv.Render(Editor.$editor_priv);
        $container.append(Editor.$editor_priv);

        Editor.InitKeyboardEvents_priv();
    },
    CreateVisualCode(aliasedSymbol){
        let symbol = aliasedSymbol.symbol;
        let productions = Editor.language_priv.GetProductions(symbol);
        
        let code;

        if (symbol.isTerminal){

            /* if the symbol is a terminal then create a block for it */
            
            code = new Block(aliasedSymbol, []);
            if (Editor.dynamicTerminalTypes_priv.get(symbol)){
                code.SetEditable(true);
            }
            
        }else{
            if (productions.length == 1){
        
                /* 
            /* 
                /* 
            /* 
                /* 
                    if the symbol has only one production then skip it and create 
                if the symbol has only one production then skip it and create 
                    if the symbol has only one production then skip it and create 
                if the symbol has only one production then skip it and create 
                    if the symbol has only one production then skip it and create 
                    code for its production's right hand side symbols
                */
                let production = productions[0];
                let aliasedSymbols = production.GetRhs().GetSymbols();
                let elems = [];
                for (let aliasedSymbol of aliasedSymbols){
                    elems.push(Editor.CreateVisualCode(aliasedSymbol));
                }
                code = elems.length === 1 ? elems[0] : new Group(aliasedSymbol, elems);
            
            }else{
    
                /*
                    if the symbol has more than 1 productions create a block for it
                    with its production right hand side symbols as alternative choices
                */
                let alternateSymbols = [];
                for (let production of productions){
                    let productionSymbols = production.GetRhs().GetSymbols();
                    if (productionSymbols.length > 1)
                        console.log('Error: block with an alternative selection of more than 1 symbols');
                    alternateSymbols.push(productionSymbols[0]);
                }
                code = new Block(aliasedSymbol, alternateSymbols);

            }
        }

        return code;
    },
    InitKeyboardEvents_priv: () => {
        let charCode2key = {
            16: 'shift',
            17: 'ctrl',
            13: 'enter',
            9:  'tab',
            8:  'backspace',
            46: 'delete',
            38: 'up',
            40: 'down',
            37: 'left',
            39: 'right'
        };

        let keyModifiers = {
            pressed: {
                shift: false,
            },
            UpdateUp: (key) => {
                keyModifiers.Update(key,false);
            },
            UpdateDown: (key) => {
                keyModifiers.Update(key, true);
            },
            Update(key, b){
                if (key && Object.keys(keyModifiers.pressed).includes(key)){
                    keyModifiers.pressed[key] = b;
                }
            }
        };

        Editor.$editor_priv.on('keyup', (e) => {
            let key = charCode2key[e.char || e.charCode || e.which];
            keyModifiers.UpdateUp(key);
        });

        Editor.$editor_priv.on('keydown', (e) => {
            let key = charCode2key[e.char || e.charCode || e.which];
            keyModifiers.UpdateDown(key);

            if (key){
                e.preventDefault();
                e.stopPropagation();
            }

            switch (key){
                case 'enter': {
                    if (Editor.selected_priv){
                        Editor.InsertBeforeWithOffset_priv(Editor.selected_priv, 0, Block.CreateNewLine());
                        Editor.Refresh();
                    }
                    break;
                }
                case 'tab': {
                    if (Editor.selected_priv){
                        if (keyModifiers.pressed['shift']){ /* delete previous if it's a tab */
                            Editor.DeleteWithOffset_priv(Editor.selected_priv, -1, (elem) => elem.typeId === 'tab');
                        }else{
                            Editor.InsertBeforeWithOffset_priv(Editor.selected_priv, 0, Block.CreateTab());
                        }
                        Editor.Refresh();
                    }
                    break;
                }
                case 'backspace': {
                    let selected = Editor.selected_priv;
                    let generatedBy;

                    if (selected){
                        Editor.DeleteWithOffset_priv(selected, -1, (prev) => {
                            generatedBy = prev.generatedBy;
                            return generatedBy || prev.typeId === 'tab' || prev.typeId === 'new_line';
                        });
                        
                        if (generatedBy && !generatedBy.symbol.repeatable){
                            Editor.InsertBeforeWithOffset_priv(selected, 0, generatedBy);
                        }

                        Editor.Refresh();
                    }
                    break;
                }
                case 'delete': {
                    let selected = Editor.selected_priv;
                    let generatedBy = selected.generatedBy;

                    if (selected && (generatedBy || selected.typeId == 'tab' || selected.typeId === 'new_line')){
                        if (generatedBy && !generatedBy.symbol.repeatable){
                            Editor.InsertBeforeWithOffset_priv(selected, 0, generatedBy);
                            Editor.Select_priv(generatedBy);
                        }else
                            Editor.StepRight();

                        Editor.DeleteWithOffset_priv(selected, 0);
                        Editor.Refresh();
                    }
                    break;
                }
                case 'up': {
                    Editor.StepUp();
                    break;
                }
                case 'down': {
                    Editor.StepDown();
                    break;
                }
                case 'left': {
                    Editor.StepLeft();
                    break;
                }
                case 'right': {
                    Editor.StepRight();
                    break;
                }
                case 'ctrl': {
                    keyModifiers.pressed['shift'] ? Editor.StepOut() : Editor.StepIn()
                }
            }
        });
    },
    Refresh: () => {
        Editor.$editor_priv.empty();
        Editor.code_priv.Render(Editor.$editor_priv);
        Editor.Select_priv(Editor.selected_priv);
    },
    Select_priv: (elem) => {
        if (Editor.selected_priv){
            Editor.selected_priv.RemoveSelectionHighlight();
        }
        Editor.selected_priv = elem;
        Editor.selected_priv.AddSelectionHighlight();
    },
    InsertBeforeWithOffset_priv: (elem, offset, newElem) => {
        let parent = elem.parent;
        if (parent){
            if (newElem.typeId !== 'new_line') 
                newElem.SetParent(parent);
            parent.elems.splice(parent.elems.indexOf(elem) + offset, 0, newElem);
        }
    },
    DeleteWithOffset_priv: (elem, offset, condition) => {
        let parent = elem.parent;
        if (parent){
            let prev = parent.elems.indexOf(elem) + offset;
            if (prev >= 0){
                if ( condition === undefined || condition(parent.elems[prev]) ){
                    parent.elems.splice(prev, 1);
                }
            }
        }
    },
    StepIn: () => {
        if (Editor.selected_priv && Editor.selected_priv.elems){
            Editor.Select_priv(Editor.selected_priv.elems[0]);
        }
    },
    StepOut: () => {
        if (Editor.selected_priv && Editor.selected_priv.parent){
            Editor.Select_priv(Editor.selected_priv.parent);
        }
    },
    StepLeft: () => {
        if (Editor.selected_priv && Editor.selected_priv.parent){
            let elems = Editor.selected_priv.parent.elems;
            let i = elems.indexOf(Editor.selected_priv) - 1;
            while (i >= 0){
                if (elems[i].typeId !== 'new_line'){
                    Editor.Select_priv(elems[i]);
                    break;
                }
                i--;
            }
        }
    },
    StepRight: () => {
        if (Editor.selected_priv && Editor.selected_priv.parent){
            let elems = Editor.selected_priv.parent.elems;
            let i = elems.indexOf(Editor.selected_priv) + 1;
            while (i < elems.length){
                if (elems[i].typeId !== 'new_line'){
                    Editor.Select_priv(elems[i]);
                    break;
                }
                i++;
            }
        }
    },
    StepUp: () => {
        if (Editor.selected_priv && Editor.selected_priv.parent){
            let elems = Editor.selected_priv.parent.elems;
            let i = elems.indexOf(Editor.selected_priv);
            while (i > 0){
                if (elems[i].typeId === 'new_line' && elems[i - 1].typeId !== 'new_line'){
                    Editor.Select_priv(elems[i - 1]);
                    break;
                }
                i--;
            }
        }
    },
    StepDown: () => {
        if (Editor.selected_priv && Editor.selected_priv.parent){
            let elems = Editor.selected_priv.parent.elems;
            let i = elems.indexOf(Editor.selected_priv);
            while (i < elems.length - 1){
                if (elems[i].typeId === 'new_line' && elems[i + 1].typeId !== 'new_line'){
                    Editor.Select_priv(elems[i + 1]);
                    break;
                }
                i++;
            }
        }
    },
    LoadStyles: (styles) => {
        let viewClasses = Object.keys(styles);
        for (let viewClass of viewClasses){
            let props = Object.keys(styles[viewClass]);
            let css =   '\n.' + viewClass + '{\n' 
                        + props.map(prop => '\t' + prop + ': ' + styles[viewClass][prop] + ';').join('\n')
                        + '\n}\n';
            
            let $style = $(`<style id = "${viewClass + '-style'}" type="text/css"></style>`);
            $style.append(css);
            $('head').append($style);
        }
    },
    LoadLanguage: (language) => {
        Editor.language_priv = new Language;
        
        for (let nt of language.non_terminals) {
            let lhs = Editor.language_priv.GetOrAddSymbol(nt.name, false);
            for (let rule of nt.alternate_rules) {
                let syms = [];
                for (let symObj of rule) {
                    let sym = new AliasedGrammarSymbol(
                        Editor.language_priv.GetOrAddSymbol(symObj.name, symObj.type === 'terminal'), 
                        symObj.alias,
                        symObj.repeatable,
                        symObj.optional
                    );
                    syms.push(sym);
                }
                Editor.language_priv.AddProduction(lhs, new GrammarRuleRhs(syms));
            }
        }

        Editor.dynamicTerminalTypes_priv = new Map();

        for (let t of language.terminals.dynamicText){
            let symbol = Editor.language_priv.GetSymbol(t.name, true);
            if (!symbol)
                alert('Error: Problem with the dynamic terminals from config file');
            if (!Object.keys(Editor.terminalValidationPredicates).includes(t.type)){
                alert('Error: Problem with the terminals type: ' + t.type);
            }
            Editor.dynamicTerminalTypes_priv.set(symbol, t.type);
        }
    }
}