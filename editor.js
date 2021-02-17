const NEW_LINE = {};
const TAB = {};

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
    
        Editor.$editor.on('keydown', (e) => {
            let charCode = e.char || e.charCode || e.which;
            switch (charCode){
                case 13: /* Enter Key */
                    let elem = Editor.selected;
                    if (elem){
                        let parent = elem.parent;
                        if (parent){
                            parent.elems.splice(parent.elems.indexOf(elem), 0, NEW_LINE)
                        }
                        Editor.Refresh();
                        break;
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
    }
}

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