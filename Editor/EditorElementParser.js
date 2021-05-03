import { EditorElementTypes } from './EditorElements/EditorElement.js';
import { Group } from './EditorElements/Group.js'
import { InputBlock } from './EditorElements/InputBlock.js'
import { SelectionBlock } from './EditorElements/SelectionBlock.js'
import { SimpleBlock } from './EditorElements/SimpleBlock.js'
import { NewLine } from './EditorElements/NewLine.js'
import { TabBlock } from './EditorElements/TabBlock.js'

export class EditorElementParser {

    static ToString(elem){
        return elem.ToString();
    }

    static ToJson(elem){
        return elem.ToJsonRec();
    }

    static FromString(elemStr, bindElem){
        return this.FromJson(JSON.parse(elemStr), bindElem);
    }

    static FromJson(elemJson, bindElem){
        let elem;

        switch (elemJson.type) {
            case EditorElementTypes.Group:
                elem = new Group(elemJson.symbol, elemJson.elems.map(elem => this.FromJson(elem, bindElem)));
                break;
            case EditorElementTypes.InputBlock:
                elem = new InputBlock(elemJson.symbol);
                elem.SetText(elemJson.userInput_);
                break;
            case EditorElementTypes.SelectionBlock:
                elem = new SelectionBlock(elemJson.symbol, elemJson.alternateSymbols);
                break;
            case EditorElementTypes.SimpleBlock:
                elem = new SimpleBlock(elemJson.symbol);
                break;
            case EditorElementTypes.NewLine:
                elem = new NewLine();
                break;
            case EditorElementTypes.Tab:
                elem = new TabBlock();
                break;
            default:
                break;
        }

        if (elemJson.generatedBy){
            elem.SetGeneratedBy(
                this.FromJson(elemJson.generatedBy, bindElem)
            )
        }

        if (bindElem)
            bindElem(elem);
        
        return elem;
    }

};