import { Editor } from './Editor/editor.js'
import { config, code } from './config.js'
import { Block } from './Editor/block.js'
import { Group } from './Editor/group.js'

/**
 * Load a LineElem including nested grouping
 * @param {Object | Array} obj {text: 'text', type: 'type} or [{text: 'text', type: 'type}, [...], ...]
 */
function LoadElem(obj){
    if (!Array.isArray(obj)){
        let elem = new Block(obj.text);
        elem.SetExtraCssClasses(config.type2styles[obj.type]);
        return elem;
    }

    let elems = [];
    for (let elem of obj){
        elems.push(LoadElem(elem));
    }
    return new Group(elems);
}

$(document).ready(function () {
    Editor.LoadStyles(config.styles);
    Editor.root = LoadElem(code);
    Editor.Init($('#injection-div'));
});