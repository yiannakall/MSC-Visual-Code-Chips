class Block {
    static count = 0;
    static OnClick = () => {};

    textContent = "";
    extraCssClasses = [];
    id;
    parent;
    typeId;
    userData;

    $view;

    constructor(textContent) {
        this.textContent = textContent;
        this.id = "elem" + Block.count++;
    }

    Render($container) {
        let $elem = $(`<div class = "block"> ${this.textContent} </div>`);
        $elem.addClass(this.extraCssClasses.join(' '));
        
        $elem.on('click', (event) => Block.OnClick(event, this));
        $container.append($elem);

        this.$view = $elem;
    }

    SetExtraCssClasses(extraCssClasses) {
        this.extraCssClasses = extraCssClasses;
    }

    SetParent(parent){
        this.parent = parent;
    }
}

class Group{

    elems = [];
    parent;

    $view;

    constructor(elems){
        if (elems){
            elems.forEach( (elem) => elem.SetParent(this) );
            this.elems = elems;
        }
    }

    PushElem(){
        elem.SetParent(this);
        this.elems.push(elem);
    }

    Render($container) {
        let $group = $('<div class = "group"></div>');
        let $differentLines = $('<div class = "different-line-elems"></div>');
        let $inline = $('<div class = "inline-elems"></div>');

        $differentLines.append($inline);
        $group.append($differentLines);

        for (let elem of this.elems){
            if (elem === NEW_LINE){
                $inline = $('<div class = "inline-elems"></div>');
                $differentLines.append($inline);
            }else{
                elem.Render($inline);
            }
        }
        
        $group.on('click', (event) => Group.OnClick(event, this));
        $container.append($group);

        this.$view = $group;
    }

    SetParent(parent){
        this.parent = parent;
    }

}


const NEW_LINE = {};

class Tab extends Block {
    constructor(){
        super('');
        this.typeId = 'tab';
        this.SetExtraCssClasses(['tab']);
    }
}

const Editor = {
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
                        Editor.InsertBefore(Editor.selected, NEW_LINE);
                    break;
                }
                case 'tab': {
                    if (Editor.selected){
                        if (keyModifiers.pressed['shift']){ /* delete previous if it's a tab */
                            Editor.DeleteBefore(Editor.selected, (elem) => elem.typeId === 'tab');
                        }else{
                            Editor.InsertBefore(Editor.selected, new Tab());
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
            if (newElem !== NEW_LINE) 
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
                if (elems[i] !== NEW_LINE){
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
                if (elems[i] !== NEW_LINE){
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
                if (elems[i] === NEW_LINE && elems[i - 1] !== NEW_LINE){
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
                if (elems[i] === NEW_LINE && elems[i + 1] !== NEW_LINE){
                    Editor.Select(elems[i + 1]);
                    break;
                }
                i++;
            }
        }
    }
}