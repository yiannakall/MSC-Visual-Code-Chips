export class Block {
    static count_priv = 0;
    extraCssClasses_priv = [];
    id_priv;
    $view_priv;

    static OnClick = () => {};
    textContent = "";
    typeId;
    parent;
    userData;

    constructor(textContent) {
        this.textContent = textContent;
        this.id_priv = "elem" + Block.count_priv++;
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
        $elem.addClass(this.extraCssClasses_priv.join(' '));
        
        $elem.on('click', (event) => Block.OnClick(event, this));
        $container.append($elem);

        this.$view_priv = $elem;
    }

    SetExtraCssClasses(extraCssClasses) {
        this.extraCssClasses_priv = extraCssClasses;
    }

    SetParent(parent){
        this.parent = parent;
    }

    GetView(){
        return this.$view_priv;
    }
}