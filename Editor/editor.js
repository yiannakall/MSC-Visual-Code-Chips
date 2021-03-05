import { Block } from "./block.js";
import { Group } from "./group.js";
import { AliasedGrammarSymbol, GrammarRuleRhs, GrammarProduction, Language} from '../language.js'

export const Editor = {
    code_priv: undefined,
    language_priv: undefined,
    $container_priv: undefined,
    $editor_priv: undefined,
    selected_priv: undefined,
    Init: ($container) => {
        Block.OnClick = Group.OnClick = (event, elem) => {
            Editor.Select_priv(elem);
            event.stopPropagation();
        }

        Block.OnChange = (block, selectedAliasedSymbol) => {
            let vc = Editor.CreateVisualCode(selectedAliasedSymbol);
            Editor.InsertBefore_priv(block, vc);
            Editor.DeleteWithOffset_priv(block, 0);
        }

        $container.empty();
        Editor.$editor_priv = $('<div class = "editor" tabIndex = "0"></div>');
        
        Editor.code_priv = new Group(
            [
                Editor.CreateVisualCode(
                    new AliasedGrammarSymbol(Editor.language_priv.GetSymbol('program', false))
                )
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
        if (!productions){
            
            /* if the symbol is a terminal then create a block for it */
            code = new Block(aliasedSymbol, [])
        
        }else if (productions.length == 1 /* TODO && no repetitions */){
        
            /* 
                if the symbol has only one production then skip it and create 
                code for its production's right hand side symbols
            */
            let production = productions[0];
            let aliasedSymbols = production.GetRhs().GetSymbols();
            let elems = [];
            for (let aliasedSymbol of aliasedSymbols){
                elems.push(Editor.CreateVisualCode(aliasedSymbol));
            }
            code = elems.length === 1 ? elems[0] : new Group(elems);
        
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

        return code;
    },
    InitKeyboardEvents_priv: () => {
        let charCode2key = {
            16: 'shift',
            17: 'ctrl',
            13: 'enter',
            9:  'tab',
            8:  'backspace',
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
                    if (Editor.selected_priv)
                        Editor.InsertBefore_priv(Editor.selected_priv, Block.CreateNewLine());
                    break;
                }
                case 'tab': {
                    if (Editor.selected_priv){
                        if (keyModifiers.pressed['shift']){ /* delete previous if it's a tab */
                            Editor.DeleteWithOffset_priv(Editor.selected_priv, -1, (elem) => elem.typeId === 'tab');
                        }else{
                            Editor.InsertBefore_priv(Editor.selected_priv, Block.CreateTab());
                        }
                    }
                    break;
                }
                case 'backspace': {
                    if (Editor.selected_priv){
                        Editor.DeleteWithOffset_priv(Editor.selected_priv, -1);
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
            Editor.selected_priv.GetView().removeClass('selected');
        }
        Editor.selected_priv = elem;
        Editor.selected_priv.GetView().addClass('selected');
    },
    InsertBefore_priv: (elem, newElem) => {
        let parent = elem.parent;
        if (parent){
            if (newElem.typeId !== 'new_line') 
                newElem.SetParent(parent);
            parent.elems.splice(parent.elems.indexOf(elem), 0, newElem);
            Editor.Refresh();
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
            Editor.Refresh();
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
                for (let symObj of rule.symbols) {
                    let sym = new AliasedGrammarSymbol(
                        Editor.language_priv.GetOrAddSymbol(symObj.name, symObj.type === 'terminal'), 
                        symObj.alias
                    );
                    syms.push(sym);
                }
                Editor.language_priv.AddProduction(lhs, new GrammarRuleRhs(syms, !!rule.infinite_repetitions));
            }
        }
    }
}