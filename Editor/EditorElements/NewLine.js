import { EditorElement, EditorElementTypes } from './EditorElement.js'
import { assert } from '../../Utils/Assert.js'

export class NewLine extends EditorElement {
    constructor(){
        super(EditorElementTypes.NewLine);
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