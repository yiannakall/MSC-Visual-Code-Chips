export class Block {
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

    static CreateTab() {
        let elem = new Block('');
        elem.typeId = 'tab';
        elem.SetExtraCssClasses(['tab']);
        return elem;
    }

    static CreateNewLine() {
        let elem = new Block('');
        elem.typeId = 'new_line';
        return elem;
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