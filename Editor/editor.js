import { Block } from "./block.js";
import { Group } from "./group.js";

export const Editor = {
    root: undefined,
    $container: undefined,
    $editor: undefined,
    selected: undefined,
    Init: ($container) => {
        Block.OnClick = Group.OnClick = (event, elem) => {
            Editor.Select(elem);
            event.stopPropagation();
        }

        $container.empty();
        Editor.$editor = $('<div class = "editor" tabIndex = "0"></div>');
        Editor.root.Render(Editor.$editor);
        $container.append(Editor.$editor);

        Editor.InitKeyboardEvents();
    },
    InitKeyboardEvents: () => {
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

        Editor.$editor.on('keyup', (e) => {
            let key = charCode2key[e.char || e.charCode || e.which];
            keyModifiers.UpdateUp(key);
        });

        Editor.$editor.on('keydown', (e) => {
            let key = charCode2key[e.char || e.charCode || e.which];
            keyModifiers.UpdateDown(key);

            if (key){
                e.preventDefault();
                e.stopPropagation();
            }

            switch (key){
                case 'enter': {
                    if (Editor.selected)
                        Editor.InsertBefore(Editor.selected, Block.CreateNewLine());
                    break;
                }
                case 'tab': {
                    if (Editor.selected){
                        if (keyModifiers.pressed['shift']){ /* delete previous if it's a tab */
                            Editor.DeleteBefore(Editor.selected, (elem) => elem.typeId === 'tab');
                        }else{
                            Editor.InsertBefore(Editor.selected, Block.CreateTab());
                        }
                    }
                    break;
                }
                case 'backspace': {
                    if (Editor.selected){
                        Editor.DeleteBefore(Editor.selected);
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
        Editor.$editor.empty();
        Editor.root.Render(Editor.$editor);
        Editor.Select(Editor.selected);
    },
    Select: (elem) => {
        if (Editor.selected){
            Editor.selected.$view.removeClass('selected');
        }
        Editor.selected = elem;
        Editor.selected.$view.addClass('selected');
    },
    InsertBefore: (elem, newElem) => {
        let parent = elem.parent;
        if (parent){
            if (newElem.typeId !== 'new_line') 
                newElem.SetParent(parent);
            parent.elems.splice(parent.elems.indexOf(elem), 0, newElem);
            Editor.Refresh();
        }
    },
    DeleteBefore: (elem, condition) => {
        let parent = elem.parent;
        if (parent){
            let prev = parent.elems.indexOf(elem) - 1;
            if (prev >= 0){
                if ( condition === undefined || condition(parent.elems[prev]) ){
                    parent.elems.splice(prev, 1);
                }
            }
            Editor.Refresh();
        }
    },
    StepIn: () => {
        if (Editor.selected && Editor.selected.elems){
            Editor.Select(Editor.selected.elems[0]);
        }
    },
    StepOut: () => {
        if (Editor.selected && Editor.selected.parent){
            Editor.Select(Editor.selected.parent);
        }
    },
    StepLeft: () => {
        if (Editor.selected && Editor.selected.parent){
            let elems = Editor.selected.parent.elems;
            let i = elems.indexOf(Editor.selected) - 1;
            while (i >= 0){
                if (elems[i].typeId !== 'new_line'){
                    Editor.Select(elems[i]);
                    break;
                }
                i--;
            }
        }
    },
    StepRight: () => {
        if (Editor.selected && Editor.selected.parent){
            let elems = Editor.selected.parent.elems;
            let i = elems.indexOf(Editor.selected) + 1;
            while (i < elems.length){
                if (elems[i].typeId !== 'new_line'){
                    Editor.Select(elems[i]);
                    break;
                }
                i++;
            }
        }
    },
    StepUp: () => {
        if (Editor.selected && Editor.selected.parent){
            let elems = Editor.selected.parent.elems;
            let i = elems.indexOf(Editor.selected);
            while (i > 0){
                if (elems[i].typeId === 'new_line' && elems[i - 1].typeId !== 'new_line'){
                    Editor.Select(elems[i - 1]);
                    break;
                }
                i--;
            }
        }
    },
    StepDown: () => {
        if (Editor.selected && Editor.selected.parent){
            let elems = Editor.selected.parent.elems;
            let i = elems.indexOf(Editor.selected);
            while (i < elems.length - 1){
                if (elems[i].typeId === 'new_line' && elems[i + 1].typeId !== 'new_line'){
                    Editor.Select(elems[i + 1]);
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
    }
}