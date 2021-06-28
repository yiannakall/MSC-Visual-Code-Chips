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

    Render_($container){
        this.$customizableView = this.$wholeView = $('<div/>').addClass('new-line');

        $container.append(this.$wholeView); 
    }
}