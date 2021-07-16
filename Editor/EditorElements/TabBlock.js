import { EditorElement, EditorElementTypes } from './EditorElement.js'

export class TabBlock extends EditorElement {
    constructor(){
        super(EditorElementTypes.Tab);
        this.SetDraggable(false);
        this.SetDroppable(false);
    }

    Clone_() {
        return new TabBlock();
    }

    ToJson_(){
        return {};
    }

    Render_(){
        let $elem = $('<div/>').addClass('tab');
        this.$wholeView = this.$customizableView = $elem;
    }
}