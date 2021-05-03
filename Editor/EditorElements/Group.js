import { assert } from '../../Utils/Utils.js';
import { EditorElement, EditorElementTypes } from './EditorElement.js'

export class Group extends EditorElement {
    elems = [];
    symbol;
    
    constructor(symbol, elems){
        super(EditorElementTypes.Group);
        elems.forEach( (elem) => elem.SetParent(this) );
        
        this.symbol = symbol;
        this.elems = elems;
    }

    GetSymbol(){
        return this.symbol;
    }

    PushElem(elem){
        elem.SetParent(this);
        this.elems.push(elem);
    }

    PopElem(){
        let elem = this.elems.pop(elem);
        elem.SetParent(null);
        return elem;
    }

    InsertBeforeElem_WithOffset(elem, offset, newElem){
        assert(elem.GetParent() === this, `${this} is not the parent of ${elem}`);
        
        let index = this.elems.indexOf(elem);
        assert(index !== -1, `${elem} is not a child of group ${this}`)

        this.elems.splice(index + offset, 0, newElem);
        newElem.SetParent(this);
    }

    InsertBeforeElem(elem, newElem){
        this.InsertBeforeElem_WithOffset(elem, 0, newElem);
    }

    InsertAfterElem(elem, newElem){
        this.InsertBeforeElem_WithOffset(elem, 1, newElem);
    }

    RemoveElem(elem){
        assert(elem.GetParent() === this, `${this} is not the parent of ${elem}`);

        let index = this.elems.indexOf(elem);
        assert(index !== -1, `${elem} is not a child of group ${this}`)

        this.elems.splice(index, 1);
        elem.SetParent(null);
    }

    GetElem_WithOffset(elem, offset){
        assert(elem.GetParent() === this, `${this} is not the parent of ${elem}`);
        let index = this.elems.indexOf(elem);
        assert(index !== -1, `${elem} is not a child of group ${this}`)

        return this.elems[index + offset];
    }

    GetNextElem(elem){
        return this.GetElem_WithOffset(elem, 1);
    }

    GetPreviousElem(elem){
        return this.GetElem_WithOffset(elem, -1);
    }

    GetElem(i){
        return this.elems[i];
    }

    IndexOf(elem){
        return this.elems.indexOf(elem);
    }

    GetLength(){
        return this.elems.length;
    }

    Clone_(){
        let clonedElems = this.elems.map(elem => elem.CloneRec());
        return new Group(this.symbol.Clone(), clonedElems);
    }

    ToJson_(){
        let elems = this.elems.map(elem => elem.ToJsonRec());
        return {
            symbol: this.symbol,
            elems
        };
    }

    Render_($container) {
        let $group = $('<div class = "group"></div>');
        let $differentLines = $('<div class = "different-line-elems"></div>');
        let $inline = $('<div class = "inline-elems"></div>');

        $differentLines.append($inline);
        $group.append($differentLines);
        $container.append($group);

        this.$wholeView = this.$customizableView = $group;

        for (let elem of this.elems){
            if (elem.type === EditorElementTypes.NewLine){
                $inline = $('<div class = "inline-elems"></div>');
                $differentLines.append($inline);
            }else{
                elem.Render($inline);
            }
        }
    }

}