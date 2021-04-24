
import { AliasedGrammarSymbol, Language} from '../language.js'
import { assert } from "../Utils/utils.js";

import { EditorElementTypes } from './EditorElements/EditorElement.js'
import { Group } from './EditorElements/Group.js'
import { InputBlock } from './EditorElements/InputBlock.js'
import { NewLine } from './EditorElements/NewLine.js'
import { SelectionBlock } from './EditorElements/SelectionBlock.js'
import { SimpleBlock } from './EditorElements/SimpleBlock.js'
import { TabBlock } from './EditorElements/TabBlock.js'
import { KeyboardEventManager } from './../Utils/KeyboardEventManager.js'

export class Editor {

    $container;
    $editor;

    language;
    code;
    clipboard;
    selected;
    
    typeValidators = {
        INT : (text) => {
            return Number.isInteger(Number(text));
        },
        FLOAT: (text) => {
            return Number.isFinite(Number(text));
        },
        CHAR: (text) => {
            return text.length === 1;
        },
        STRING: (text) => {
            return true;
        },
        BOOL: (text) => {
            return text === 'true' || text === ' false';
        },
        IDENTIFIER: (text) => {
            let matched = /[_A-Za-z]+[_A-Za-z0-9]*/g.exec(text);
            return matched && matched[0] === text;
        }
    };

    keyboardEventManager;

    constructor($container, language){
        this.$container = $container;
        this.language = language;

        this.InitializeCode_();
        this.InitializeView_();
        this.InitializeEvents_();

        this.Render();
    }

    InitializeCode_(){
        let startingSymbol = new AliasedGrammarSymbol(this.language.GetSymbol('program', false));
        this.code = new Group(
            startingSymbol,
            [this.CreateElem(startingSymbol)]
        );
    }

    InitializeView_(){
        this.$editor = $('<div/>').addClass('editor');
        this.$container.empty();
        this.$container.append(this.$editor);
    }

    InitializeEvents_(){
        const Keys = KeyboardEventManager.Keys;
        
        this.keyboardEventManager = new KeyboardEventManager(this.$editor)
            .AddEventHandler( [Keys.UP],                () => this.EventHandler_NavigateUp_() )
            .AddEventHandler( [Keys.DOWN],              () => this.EventHandler_NavigateDown_() )
            .AddEventHandler( [Keys.LEFT],              () => this.EventHandler_NavigateLeft_() )
            .AddEventHandler( [Keys.RIGHT],             () => this.EventHandler_NavigateRight_() )
            .AddEventHandler( [Keys.ONE],               () => this.EventHandler_NavigateIn_() )
            .AddEventHandler( [Keys.TWO],               () => this.EventHandler_NavigateOut_() )
            .AddEventHandler( [Keys.BACKSPACE],         () => this.EventHandler_Backspace_() )
            .AddEventHandler( [Keys.DELETE],            () => this.EventHandler_Delete_() )
            .AddEventHandler( [Keys.ENTER],             () => this.EventHandler_NewLine_() )
            .AddEventHandler( [Keys.SHIFT, Keys.TAB],   () => this.EventHandler_Outdent_() )
            .AddEventHandler( [Keys.TAB],               () => this.EventHandler_Indent_() )
            .AddEventHandler( [Keys.CTRL, Keys.C],      () => this.EventHandler_Copy_() )
            .AddEventHandler( [Keys.CTRL, Keys.V],      () => this.EventHandler_Paste_() )
        ;
    }

    RemoveElem_WithChecks(elem){
        let group = elem?.GetParent();
        
        if (!group) return false;

        let generatedBy = elem.GetGeneratedBy();

        if (generatedBy && !generatedBy.GetSymbol().repeatable){
            group.InsertAfterElem(elem, generatedBy);
            this.Select(generatedBy);
        }

        if (
            generatedBy || 
            elem.GetType() === EditorElementTypes.Tab || 
            elem.GetType() === EditorElementTypes.NewLine
        ){
            if (elem === this.selected){
                this.NavigateRight() || this.NavigateOut() || (this.selected = undefined);
            }

            group.RemoveElem(elem);
            this.Render();
            return true;
        }

        return false;
    }

    Select(elem) {
        if (this.selected) {
            this.selected.GetCustomizableView()?.removeClass('selected');
        }
        elem.GetCustomizableView()?.addClass('selected');
        this.selected = elem;
    }

    Render(){
        this.$editor.empty();
        this.code.Render(this.$editor);
        if (this.selected){
            this.Select(this.selected);
        }
    }

    BindElemToEditor_(elem){
        switch(elem.GetType()){
            case EditorElementTypes.InputBlock:
                this.SetInputBlock_OnInput_(elem);
                break;
            case EditorElementTypes.SelectionBlock:
                this.SetSelectionBlock_OnSelect_(elem);
                break;
        }

        this.SetElem_OnClick_(elem);
        this.SetElem_Theme_(elem);
    }

    SetElem_Theme_(elem){
        elem.SetTheme((elem) => {
            let type = elem.GetType();
            let styles = type;
            if (type != EditorElementTypes.NewLine && type != EditorElementTypes.Tab){
                styles += ` ${elem.GetSymbol().symbol.name}`;
            }
            return styles;
        });
    }

    SetElem_OnClick_(elem){
        elem.SetOnClick((elem) => {
            this.Select(elem);
        });
    }

    SetSelectionBlock_OnSelect_(selectionBlock){
        selectionBlock.SetOnSelect((selectionBlock) => {
            let vc = this.CreateElem(selectionBlock.GetSelectedSymbol());
            vc.SetGeneratedBy(selectionBlock);

            selectionBlock.GetParent().InsertBeforeElem(selectionBlock, vc);

            if (!selectionBlock.GetSymbol().repeatable){
                selectionBlock.GetParent().RemoveElem(selectionBlock);
            }else{
                selectionBlock.GetParent().InsertBeforeElem(selectionBlock, this.CreateNewLine());
            }

            this.Render();
            this.Select(vc);
        });
    }

    SetInputBlock_OnInput_(inputBlock){
        inputBlock.SetOnInput((inputBlock) => {
            let type = this.language.GetTerminalType(inputBlock.GetSymbol().symbol);
            let isValid = this.typeValidators[type];
            
            let $input = inputBlock.GetInput(), text = $input.val();
            text === '' || isValid(text) ? $input.removeClass('invalid-input') : $input.addClass('invalid-input');

            if (inputBlock.GetSymbol().repeatable){
                /* create code for a non repeating version of the GrammarSymbol */
                let vc = inputBlock.Clone();
                vc.GetSymbol().repeatable = false;
                vc.SetGeneratedBy(block);

                /* simulate typing on the generated block and not on the repeatable block */
                vc.SetText(text);
                inputBlock.SetText(undefined);

                inputBlock.GetParent().InsertBeforeElem(inputBlock, vc);

                this.Render();
                this.Select(vc);

                vc.GetInput().focus();
            }
        });
    }

    CreateElem(aliasedSymbol){
        let symbol = aliasedSymbol.symbol;
        let productions = this.language.GetProductions(symbol);
        
        let elem;

        if (symbol.isTerminal){

            if (this.language.GetTerminalType(symbol) === Language.TerminalType.Static){
                elem = new SimpleBlock(aliasedSymbol);
            }else{
                elem = new InputBlock(aliasedSymbol);
            }
            
        }else{
            if (productions.length === 1){
        
                /*
                    if the symbol has only one production then skip it and create 
                    code for its production's right hand side symbols
                */
                let production = productions[0];
                let aliasedSymbols = production.GetRhs().GetSymbols();
                let elems = aliasedSymbols.map( (s) => this.CreateElem(s) );

                elem = elems.length === 1 ? elems[0] : new Group(aliasedSymbol, elems);
            
            }else{
    
                /*
                    if the symbol has more than 1 productions create a block for it
                    with its production right hand side symbols as alternative choices
                */
                let alternateSymbols = [];
                for (let production of productions){
                    let productionSymbols = production.GetRhs().GetSymbols();
                    assert(productionSymbols.length <= 1, 'Block with an alternative selection of more than 1 symbols');
                    alternateSymbols.push(productionSymbols[0]);
                }
                elem = new SelectionBlock(aliasedSymbol, alternateSymbols);

            }
        }

        this.BindElemToEditor_(elem);
        return elem;
    }

    CreateNewLine(){
        let nl = new NewLine();
        this.BindElemToEditor_(nl);
        return nl;
    }

    CreateTab(){
        let tab = new TabBlock();
        this.BindElemToEditor_(tab);
        return tab;
    }

    CopyToClipboard(elem){
        if (elem.GetSymbol() && !elem.GetSymbol().repeatable){
            this.clipboard = elem.CloneRec();
        }
    }

    FindCommonPredecessor(elem1, elem2){
        for (let iter1 = elem1; iter1; iter1 = iter1.GetGeneratedBy()){
            for (let iter2 = elem2; iter2; iter2 = iter2.GetGeneratedBy()){
                if (iter2.GetSymbol().symbol === iter1.GetSymbol().symbol){
                    return { elem1: iter1, elem2: iter2 };
                }
            }
        }
        return null;
    }

    Paste(source, dest){
        let preds = this.FindCommonPredecessor(source, dest);
        if (!preds) return false;

        let {elem1: sourcePoint, elem2: destPoint} = preds;
        
        for (var destRoot = destPoint; destRoot; destRoot = destRoot.generatedBy);
        
        if (destPoint.GetSymbol().repeatable){
            /* 1. the repeatable block gets created again to allow further repetitions */
            /* 2. the pasted block (or descendants) has to maintain repeatability, so that it is deletable */
            
            dest.GetParent().InsertAfterElem(dest, dest.CloneRec());
            if (!destPoint.GetSymbol().symbol.isTerminal){
                dest.GetParent().InsertAfterElem(dest, this.CreateNewLine());
                sourcePoint.symbol.repeatable = true;
            }else{
                assert(destPoint === destRoot && destPoint === dest);
                sourcePoint.SetGeneratedBy(destPoint);
            }

        }else
            sourcePoint.SetGeneratedBy(destPoint.GetGeneratedBy());

        sourcePoint.GetSymbol().alias = destPoint.GetSymbol().alias;
        dest.GetParent().InsertBeforeElem(dest, source);
        dest.GetParent().RemoveElem(dest);

        return true;
    }

    NavigateIn() {
        if (this.selected && this.selected.GetType() === EditorElementTypes.Group){
            this.Select(this.selected.GetElem(0));
            return true;
        }
        return false;
    }

    NavigateOut() {
        let parent = this.selected?.GetParent();
        if (parent){
            this.Select(parent);
            return true;
        }
        return false;
    }

    NavigateLeft() {
        if (this.selected && this.selected.GetParent()){
            let parent = this.selected.GetParent();
            assert(parent.GetType() === EditorElementTypes.Group);
            
            for (let i = parent.IndexOf(this.selected) - 1; i >= 0; --i){
                if (parent.GetElem(i).GetType() != EditorElementTypes.NewLine){
                    this.Select(parent.GetElem(i));
                    return true;
                }
            }
        }
        return false;
    }

    NavigateRight() {
        if (this.selected && this.selected.GetParent()){
            let parent = this.selected.GetParent();
            assert(parent.GetType() === EditorElementTypes.Group);

            for (let i = parent.IndexOf(this.selected) + 1; i < parent.GetLength(); ++i){
                if (parent.GetElem(i).GetType() != EditorElementTypes.NewLine){
                    this.Select(parent.GetElem(i));
                    return true;
                }
            }
        }
        return false;
    }

    NavigateUp() {
        let parent = this.selected?.GetParent();
        if (parent){
            assert(parent.GetType() === EditorElementTypes.Group);
            
            for (let i = parent.IndexOf(this.selected); i > 0; --i){
                if (
                    parent.GetElem(i).GetType() === EditorElementTypes.NewLine && 
                    parent.GetElem(i - 1).GetType() !== EditorElementTypes.NewLine
                ){
                    this.Select(parent.GetElem(i - 1));
                    return true;
                }
            }
        }
        return false;
    }

    NavigateDown() {
        if (this.selected && this.selected.GetParent()){
            let parent = this.selected.GetParent();
            assert(parent.GetType() === EditorElementTypes.Group);
            
            for (let i = parent.IndexOf(this.selected); i < parent.GetLength() - 1; ++i){
                if (
                    parent.GetElem(i).GetType() === EditorElementTypes.NewLine && 
                    parent.GetElem(i + 1).GetType() !== EditorElementTypes.NewLine
                ){
                    this.Select(parent.GetElem(i + 1));
                    return true;
                }
            }
        }
        return false;
    }

    EventHandler_NavigateUp_(){
        this.NavigateUp();
    }

    EventHandler_NavigateDown_(){
        this.NavigateDown();
    }

    EventHandler_NavigateLeft_(){
        this.NavigateLeft();
    }

    EventHandler_NavigateRight_(){
        this.NavigateRight();
    }

    EventHandler_NavigateIn_(){
        this.NavigateIn();
    }

    EventHandler_NavigateOut_(){
        this.NavigateOut();
    }

    EventHandler_Delete_(){
        this.RemoveElem_WithChecks(this.selected);
    }

    EventHandler_Backspace_(){
        this.RemoveElem_WithChecks(this.selected.GetParent().GetPreviousElem(this.selected));
    }

    EventHandler_Indent_(){
        if (this.selected && this.selected.GetParent()){
            this.selected.GetParent().InsertBeforeElem(this.selected, this.CreateTab());
            this.Render();
        }
    }

    EventHandler_Outdent_(){
        if (this.selected && this.selected.GetParent()){
            let previous = this.selected.GetParent().GetPreviousElem(this.selected);
            if (previous.type === EditorElementTypes.Tab){
                this.selected.GetParent().RemoveElem(previous);
                this.Render();
            }
        }
    }

    EventHandler_NewLine_(){
        if (this.selected && this.selected.GetParent()){
            this.selected.GetParent().InsertBeforeElem(this.selected, this.CreateNewLine());
            this.Render();
        }
    }

    EventHandler_Copy_(){
        if (this.selected){
            this.CopyToClipboard(this.selected);
        }
    }

    EventHandler_Paste_(){
        if (this.selected){
            let source = this.clipboard.CloneRec(), dest = this.selected;
            if (this.Paste(source, dest)){
                this.Render();
                this.Select(source);
            }
        }
    }
}

// export const Editor = {
//     code_priv: undefined,
//     language_priv: undefined,
//     $container_priv: undefined,
//     $editor_priv: undefined,
//     selected_priv: undefined,
//     dynamicTerminalTypes_priv: undefined,
//     clipboard: undefined,
//     terminalValidationPredicates: {
//         int : (text) => {
//             return Number.isInteger(Number(text));
//         },
//         float: (text) => {
//             return Number.isFinite(Number(text));
//         },
//         char: (text) => {
//             return text.length === 1;
//         },
//         string: (text) => {
//             return true;
//         },
//         bool: (text) => {
//             return text === 'true' || text === ' false';
//         },
//         identifier: (text) => {
//             let matched = /[_A-Za-z]+[_A-Za-z0-9]*/g.exec(text);
//             return matched && matched[0] === text;
//         }
//     },
//     Init: ($container) => {
//         Block.OnClick = Group.OnClick = (event, elem) => {
//             Editor.Select_priv(elem);
//             event.stopPropagation();
//         }

//         Block.OnInput = (block, $input) => {
//             let type = Editor.dynamicTerminalTypes_priv.get(block.symbol.symbol);
//             let isValid = Editor.terminalValidationPredicates[type];
            
//             let text = $input.val();
//             if ($input.val() === '' || isValid(text)){
//                 $input.removeClass('invalid-input');
//             }else{
//                 $input.addClass('invalid-input');
//             }

//             if (block.symbol.repeatable){
//                 /* create code for a non repeating version of the GrammarSymbol */
//                 let vc = Editor.CreateVisualCode(
//                     new AliasedGrammarSymbol(block.symbol.symbol, block.symbol.alias, false)
//                 );
//                 vc.generatedBy = block;

//                 /* simulate typing on the generated block and not on the repeatable block */
//                 vc.userInput = $input.val();
//                 block.userInput = undefined;

//                 Editor.InsertBeforeWithOffset_priv(block, 0, vc);

//                 Editor.Refresh();
//                 Editor.Select_priv(vc);
//                 vc.GetInput().focus();
//             }
//         }

//         Block.OnChange = (block, selectedAliasedSymbol) => {
//             let vc = Editor.CreateVisualCode(selectedAliasedSymbol);
//             vc.generatedBy = block;

//             Editor.InsertBeforeWithOffset_priv(block, 0, vc);

//             if (!block.symbol.repeatable){
//                 Editor.DeleteWithOffset_priv(block, 0);
//             }else{
//                 Editor.InsertBeforeWithOffset_priv(block, 0, Block.CreateNewLine());
//             }

//             Editor.Refresh();
//             Editor.Select_priv(vc);
//         }

//         Block.GetCssClassesToApply = Group.GetCssClassesToApply = (elem) => {
//             if (elem.symbol){
//                 return [elem.symbol.symbol.name];
//             }else{
//                 return [elem.typeId];
//             }
//         }

//         $container.empty();
//         Editor.$editor_priv = $('<div class = "editor" tabIndex = "0"></div>');
        
//         Editor.code_priv = new Group(
//             new AliasedGrammarSymbol(Editor.language_priv.GetSymbol('program', false)),
//             [
//                 Editor.CreateVisualCode(new AliasedGrammarSymbol(Editor.language_priv.GetSymbol('program', false)))
//             ]
//         );
        
//         Editor.code_priv.Render(Editor.$editor_priv);
//         $container.append(Editor.$editor_priv);

//         Editor.InitKeyboardEvents_priv();
//     },
//     CreateVisualCode(aliasedSymbol){
//         let symbol = aliasedSymbol.symbol;
//         let productions = Editor.language_priv.GetProductions(symbol);
        
//         let code;

//         if (symbol.isTerminal){

//             /* if the symbol is a terminal then create a block for it */
            
//             code = new Block(aliasedSymbol, []);
//             if (Editor.dynamicTerminalTypes_priv.get(symbol)){
//                 code.SetEditable(true);
//             }
            
//         }else{
//             if (productions.length == 1){
        
//                 /*
//                     if the symbol has only one production then skip it and create 
//                     code for its production's right hand side symbols
//                 */
//                 let production = productions[0];
//                 let aliasedSymbols = production.GetRhs().GetSymbols();
//                 let elems = [];
//                 for (let aliasedSymbol of aliasedSymbols){
//                     elems.push(Editor.CreateVisualCode(aliasedSymbol));
//                 }
//                 code = elems.length === 1 ? elems[0] : new Group(aliasedSymbol, elems);
            
//             }else{
    
//                 /*
//                     if the symbol has more than 1 productions create a block for it
//                     with its production right hand side symbols as alternative choices
//                 */
//                 let alternateSymbols = [];
//                 for (let production of productions){
//                     let productionSymbols = production.GetRhs().GetSymbols();
//                     assert(productionSymbols.length <= 1, 'Block with an alternative selection of more than 1 symbols');
//                     alternateSymbols.push(productionSymbols[0]);
//                 }
//                 code = new Block(aliasedSymbol, alternateSymbols);

//             }
//         }

//         return code;
//     },
//     InitKeyboardEvents_priv: () => {
//         let charCode2key = {
//             16: 'shift',
//             17: 'ctrl',
//             13: 'enter',
//             9:  'tab',
//             8:  'backspace',
//             46: 'delete',
//             38: 'up',
//             40: 'down',
//             37: 'left',
//             39: 'right',
//             67: 'c',
//             86: 'v',
//             49: '1',
//             50: '2'
//         };

//         let keyModifiers = {
//             pressed: {
//                 shift: false,
//                 ctrl: false
//             },
//             UpdateUp: (key) => {
//                 keyModifiers.Update(key,false);
//             },
//             UpdateDown: (key) => {
//                 keyModifiers.Update(key, true);
//             },
//             Update(key, b){
//                 if (key && Object.keys(keyModifiers.pressed).includes(key)){
//                     keyModifiers.pressed[key] = b;
//                 }
//             }
//         };

//         Editor.$editor_priv.on('keyup', (e) => {
//             let key = charCode2key[e.char || e.charCode || e.which];
//             keyModifiers.UpdateUp(key);
//         });

//         Editor.$editor_priv.on('keydown', (e) => {
//             let key = charCode2key[e.char || e.charCode || e.which];
//             keyModifiers.UpdateDown(key);

//             if (key){
//                 e.preventDefault();
//                 e.stopPropagation();
//             }

//             switch (key){
//                 case 'enter': {
//                     if (Editor.selected_priv){
//                         Editor.InsertBeforeWithOffset_priv(Editor.selected_priv, 0, Block.CreateNewLine());
//                         Editor.Refresh();
//                     }
//                     break;
//                 }
//                 case 'tab': {
//                     if (Editor.selected_priv){
//                         if (keyModifiers.pressed['shift']){ /* delete previous if it's a tab */
//                             Editor.DeleteWithOffset_priv(Editor.selected_priv, -1, (elem) => elem.typeId === 'tab');
//                         }else{
//                             Editor.InsertBeforeWithOffset_priv(Editor.selected_priv, 0, Block.CreateTab());
//                         }
//                         Editor.Refresh();
//                     }
//                     break;
//                 }
//                 case 'backspace': {
//                     let selected = Editor.selected_priv;
//                     let generatedBy;

//                     if (selected){
//                         Editor.DeleteWithOffset_priv(selected, -1, (prev) => {
//                             generatedBy = prev.generatedBy;
//                             return generatedBy || prev.typeId === 'tab' || prev.typeId === 'new_line';
//                         });
                        
//                         if (generatedBy && !generatedBy.symbol.repeatable){
//                             Editor.InsertBeforeWithOffset_priv(selected, 0, generatedBy);
//                         }

//                         Editor.Refresh();
//                     }
//                     break;
//                 }
//                 case 'delete': {
//                     let selected = Editor.selected_priv;
//                     let generatedBy = selected.generatedBy;

//                     if (selected && (generatedBy || selected.typeId == 'tab' || selected.typeId === 'new_line')){
//                         if (generatedBy && !generatedBy.symbol.repeatable){
//                             Editor.InsertBeforeWithOffset_priv(selected, 0, generatedBy);
//                             Editor.DeleteWithOffset_priv(selected, 0);
//                             Editor.Refresh();
//                             Editor.Select_priv(generatedBy);
//                         }else{
//                             Editor.StepRight(); // select the next block
//                             Editor.DeleteWithOffset_priv(selected, 0);
//                             Editor.Refresh();
//                         }
//                     }
//                     break;
//                 }
//                 case 'up': {
//                     Editor.StepUp();
//                     break;
//                 }
//                 case 'down': {
//                     Editor.StepDown();
//                     break;
//                 }
//                 case 'left': {
//                     Editor.StepLeft();
//                     break;
//                 }
//                 case 'right': {
//                     Editor.StepRight();
//                     break;
//                 }
//                 case '1': {
//                     Editor.StepOut(); 
//                     break;
//                 }
//                 case '2': {
//                     Editor.StepIn();
//                 }
//                 case 'c': {
//                     if (keyModifiers.pressed['ctrl']){
//                         Editor.CopyToClipboard(Editor.selected_priv);
//                     }
//                     break;
//                 }
//                 case 'v': {
//                     if (keyModifiers.pressed['ctrl'] && Editor.clipboard){
//                         let toPaste = Editor.clipboard.CloneRec();
//                         if (Editor.Paste(Editor.selected_priv, toPaste)){
//                             Editor.Select_priv(toPaste);
//                             Editor.Refresh();
//                         }
//                     }
//                 }
//             }
//         });
//     },
//     Refresh: () => {
//         Editor.$editor_priv.empty();
//         Editor.code_priv.Render(Editor.$editor_priv);
//         Editor.Select_priv(Editor.selected_priv);
//     },
//     Select_priv: (elem) => {
//         if (Editor.selected_priv){
//             Editor.selected_priv.GetView().removeClass('selected');
//         }
//         elem.GetView().addClass('selected');
//         Editor.selected_priv = elem;
//     },
//     InsertBeforeWithOffset_priv: (elem, offset, newElem) => {
//         let parent = elem.parent;
//         if (parent){
//             if (newElem.typeId !== 'new_line') 
//                 newElem.SetParent(parent);
//             parent.elems.splice(parent.elems.indexOf(elem) + offset, 0, newElem);
//         }
//     },
//     DeleteWithOffset_priv: (elem, offset, condition) => {
//         let parent = elem.parent;
//         if (parent){
//             let prev = parent.elems.indexOf(elem) + offset;
//             if (prev >= 0){
//                 if ( condition === undefined || condition(parent.elems[prev]) ){
//                     parent.elems.splice(prev, 1);
//                 }
//             }
//         }
//     },
//     StepIn: () => {
//         if (Editor.selected_priv && Editor.selected_priv.elems){
//             Editor.Select_priv(Editor.selected_priv.elems[0]);
//         }
//     },
//     StepOut: () => {
//         if (Editor.selected_priv && Editor.selected_priv.parent){
//             Editor.Select_priv(Editor.selected_priv.parent);
//         }
//     },
//     StepLeft: () => {
//         if (Editor.selected_priv && Editor.selected_priv.parent){
//             let elems = Editor.selected_priv.parent.elems;
//             let i = elems.indexOf(Editor.selected_priv) - 1;
//             while (i >= 0){
//                 if (elems[i].typeId !== 'new_line'){
//                     Editor.Select_priv(elems[i]);
//                     break;
//                 }
//                 i--;
//             }
//         }
//     },
//     StepRight: () => {
//         if (Editor.selected_priv && Editor.selected_priv.parent){
//             let elems = Editor.selected_priv.parent.elems;
//             let i = elems.indexOf(Editor.selected_priv) + 1;
//             while (i < elems.length){
//                 if (elems[i].typeId !== 'new_line'){
//                     Editor.Select_priv(elems[i]);
//                     break;
//                 }
//                 i++;
//             }
//         }
//     },
//     StepUp: () => {
//         if (Editor.selected_priv && Editor.selected_priv.parent){
//             let elems = Editor.selected_priv.parent.elems;
//             let i = elems.indexOf(Editor.selected_priv);
//             while (i > 0){
//                 if (elems[i].typeId === 'new_line' && elems[i - 1].typeId !== 'new_line'){
//                     Editor.Select_priv(elems[i - 1]);
//                     break;
//                 }
//                 i--;
//             }
//         }
//     },
//     StepDown: () => {
//         if (Editor.selected_priv && Editor.selected_priv.parent){
//             let elems = Editor.selected_priv.parent.elems;
//             let i = elems.indexOf(Editor.selected_priv);
//             while (i < elems.length - 1){
//                 if (elems[i].typeId === 'new_line' && elems[i + 1].typeId !== 'new_line'){
//                     Editor.Select_priv(elems[i + 1]);
//                     break;
//                 }
//                 i++;
//             }
//         }
//     },
//     CopyToClipboard(elem){
//         if (!elem.symbol.repeatable)
//             Editor.clipboard = elem.CloneRec();
//     },
//     Paste(placeholder, elem){
//         for (let source = elem; source; source = source.generatedBy){
//             for (let dest = placeholder; dest; dest = dest.generatedBy){
//                 if (dest.symbol.symbol === source.symbol.symbol){
//                     let destRoot = dest;
//                     while(destRoot.generatedBy)
//                         destRoot = destRoot.generatedBy;

//                     if (dest.symbol.repeatable){
//                         /* 1. the repeatable block gets created again to allow further repetitions */
//                         this.InsertBeforeWithOffset_priv(placeholder, 1, placeholder.CloneRec());
//                         if (!dest.symbol.symbol.isTerminal){
//                             this.InsertBeforeWithOffset_priv(placeholder, 1, Block.CreateNewLine());
//                         }
                        
//                         /* 2. the pasted block (or descendants) has to maintain repeatability, so that it is deletable */
//                         if (dest.symbol.symbol.isTerminal) {
//                             assert(dest === destRoot && dest === placeholder);
//                             source.generatedBy = dest;
//                         }else
//                             source.symbol.repeatable = true;
//                     }else
//                         source.generatedBy = dest.generatedBy;
                    
//                     source.symbol.alias = dest.symbol.alias;
//                     this.InsertBeforeWithOffset_priv(placeholder, 0, elem);
//                     this.DeleteWithOffset_priv(placeholder, 0);
//                     return true;
//                 }
//             }
//         }
//         return false;
//     },
//     LoadStyles: (styles) => {
//         let viewClasses = Object.keys(styles);
//         for (let viewClass of viewClasses){
//             let props = Object.keys(styles[viewClass]);
//             let css =   '\n.' + viewClass + '{\n' 
//                         + props.map(prop => '\t' + prop + ': ' + styles[viewClass][prop] + ';').join('\n')
//                         + '\n}\n';
            
//             let $style = $(`<style id = "${viewClass + '-style'}" type="text/css"></style>`);
//             $style.append(css);
//             $('head').append($style);
//         }
//     },
//     LoadLanguage: (language) => {
//         Editor.language_priv = new Language;
        
//         for (let nt of language.non_terminals) {
//             let lhs = Editor.language_priv.GetOrAddSymbol(nt.name, false);
//             for (let rule of nt.alternate_rules) {
//                 let syms = [];
//                 for (let symObj of rule) {
//                     let sym = new AliasedGrammarSymbol(
//                         Editor.language_priv.GetOrAddSymbol(symObj.name, symObj.type === 'terminal'), 
//                         symObj.alias,
//                         symObj.repeatable,
//                         symObj.optional
//                     );
//                     syms.push(sym);
//                 }
//                 Editor.language_priv.AddProduction(lhs, new GrammarRuleRhs(syms));
//             }
//         }

//         Editor.dynamicTerminalTypes_priv = new Map();

//         for (let t of language.terminals.dynamicText){
//             let symbol = Editor.language_priv.GetSymbol(t.name, true);
//             assert(symbol, 'Problem with the dynamic terminals from config file');
//             assert(
//                 Object.keys(Editor.terminalValidationPredicates).includes(t.type),
//                 'Problem with the terminals type: ' + t.type
//             );
            
//             Editor.dynamicTerminalTypes_priv.set(symbol, t.type);
//         }
//     },
//     GetLanguage(){
//         return this.language_priv;
//     }
// }