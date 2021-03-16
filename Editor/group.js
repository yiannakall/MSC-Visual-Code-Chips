export class Group{
    
    static OnClick = (event, elem) => {};
    static GetCssClassesToApply = (group) => { return []; };

    symbol;
    elems = [];
    parent;

    $view_priv;

    generatedBy;

    constructor(symbol, elems){
        this.symbol = symbol;
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

        $group.addClass(Group.GetCssClassesToApply(this).join(' '));

        $differentLines.append($inline);
        $group.append($differentLines);
        $container.append($group);

        this.$view_priv = $group;
        $group.on('click', (event) => Group.OnClick(event, this));

        for (let elem of this.elems){
            if (elem.typeId === 'new_line'){
                $inline = $('<div class = "inline-elems"></div>');
                $differentLines.append($inline);
            }else{
                elem.Render($inline);
            }
        }
    }

    SetParent(parent){
        this.parent = parent;
    }

    GetView(){
        return this.$view_priv;
    }

    AddSelectionHighlight(){
        this.$view_priv.addClass('selected');
    }

    RemoveSelectionHighlight(){
        this.$view_priv.removeClass('selected');
    }
}