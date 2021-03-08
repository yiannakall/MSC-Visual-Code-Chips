export class Group{

    elems = [];
    parent;

    $view_priv;

    generatedBy;

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
            if (elem.typeId === 'new_line'){
                $inline = $('<div class = "inline-elems"></div>');
                $differentLines.append($inline);
            }else{
                elem.Render($inline);
            }
        }
        
        $group.on('click', (event) => Group.OnClick(event, this));
        $container.append($group);

        this.$view_priv = $group;
    }

    SetParent(parent){
        this.parent = parent;
    }

    GetView(){
        return this.$view_priv;
    }

}