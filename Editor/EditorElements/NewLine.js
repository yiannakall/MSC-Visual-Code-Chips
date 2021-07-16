import { EditorElement, EditorElementTypes } from './EditorElement.js'

export class NewLine extends EditorElement {
    constructor(){
        super(EditorElementTypes.NewLine);
        this.SetDraggable(false);
        this.SetDroppable(false);
    }

    Clone_() {
        return new NewLine();
    }

    ToJson_(){
        return {};
    }

    Render_(){
        let $newline = $('<div/>').addClass('new-line');

        this.$customizableView = this.$wholeView = $newline;
    }
}