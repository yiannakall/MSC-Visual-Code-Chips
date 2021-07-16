import { assert } from '../../Utils/Assert.js';
import { EditorElement, EditorElementTypes, EditorElementViewMode } from './EditorElement.js'

export class Group extends EditorElement {
    elems = [];
    symbol;
    autoRendering = true;

    onRenderElem = (elem) => {};
    
    constructor(symbol, elems){
        super(EditorElementTypes.Group);
        elems.forEach( (elem) => elem.SetParent(this) );
        
        this.symbol = symbol;
        this.elems = elems;
    }

    GetSymbol(){
        return this.symbol;
    }

    GetElems(){
        return this.elems;
    }

    PushElem(elem){
        elem.SetParent(this);
        this.elems.push(elem);

        if (this.autoRendering && this.$wholeView)
            this.RenderChild_(elem);
    }

    PopElem(){
        let elem = this.elems.pop(elem);
        elem.SetParent(null);

        if (this.autoRendering && this.$wholeView)
            elem.RemoveRenderedView();

        return elem;
    }

    InsertAtIndex(i, elem){
        if (i < 0 && i > this.elems.length){
            assert(false, `Index ${i} is out of bounds`);
            return;
        }

        this.elems.splice(i, 0, elem);
        elem.SetParent(this);

        if (this.autoRendering && this.$wholeView){
            i === this.elems.length - 1 ?
                this.RenderChild_(elem) :
                this.RenderChildBefore_(this.elems[i + 1], elem);
        }
    }

    InsertBeforeElem_WithOffset(elem, offset, newElem){
        assert(elem.GetParent() === this, `${this} is not the parent of ${elem}`);
        
        let index = this.elems.indexOf(elem);
        assert(index !== -1, `${elem} is not a child of group ${this}`);

        this.InsertAtIndex(index + offset, newElem);
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
        
        if (index === -1){
            assert(false, `${elem} is not a child of group ${this}`);
            return;
        }

        this.RemoveElemAt(index);
    }

    RemoveElemAt(index){
        if (index < 0 && index >= this.elems.length){
            assert(false, `Index ${index} is out of bounds`);
            return;
        }

        let elem = this.GetElem(index);
        
        this.elems.splice(index, 1);
        elem.SetParent(null);

        if (this.autoRendering && this.$wholeView)
            elem.RemoveRenderedView();
    }

    ReplaceElem(elem, newElem) {
        this.InsertAfterElem(elem, newElem);
        this.RemoveElem(elem);
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

    ForEach(f){
        for (let i = 0; i < this.elems.length; ++i){
            let elem = this.elems[i];
            
            f(elem);
        }
    }

    ForEachRec(fPre, fPost){
        if (fPre) fPre(this);

        for (let i = 0; i < this.elems.length; ++i){
            let elem = this.elems[i];

            if (elem.GetType() === EditorElementTypes.Group || elem.GetType() === EditorElementTypes.RepetitionGroup){
                elem.ForEachRec(fPre, fPost);
            }else{
                if (fPre)   fPre(elem);
                if (fPost)  fPost(elem);
            }
        }

        if (fPost) fPost(this);
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

    Render_() {
        let $group = $('<div/>').addClass('group');
        $group.attr('title', this.symbol.tooltip || this.symbol.alias || this.symbol.symbol.name);

        this.$wholeView = $group, this.$customizableView = $group
    }

    RenderChild_(elem){
        elem.Render(this.$wholeView);
        this.onRenderElem(elem);
    }

    RenderChildBefore_(nextElem, elem){
        let $nextElem = nextElem.GetWholeView();
        if ($nextElem){
            elem.RenderBefore($nextElem);
            this.onRenderElem(elem);
        }
    }

    RenderChildAfter_(previousElem, elem){
        let $previousElem = previousElem.GetWholeView();
        if ($previousElem){
            elem.RenderAfter($previousElem);
            this.onRenderElem(elem);
        }
    }

    PastRendering_() { // needs to happen after being attached to a $container for the PastRendering_ of children elements
        for (let elem of this.elems)
            this.RenderChild_(elem);

        this.onRenderElem(this);
    }

    SetOnRenderElem(f){
        this.onRenderElem = f;
    }

    SetAutoRendering(autoRendering) {
        this.autoRendering = autoRendering;
    }
}