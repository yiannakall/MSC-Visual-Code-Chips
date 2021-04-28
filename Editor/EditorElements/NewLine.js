import { EditorElement, EditorElementTypes } from './EditorElement.js'
import { assert } from '../../Utils/Utils.js'

export class NewLine extends EditorElement {
    constructor(){
        super(EditorElementTypes.NewLine);
    }

    Clone_() {
        return new NewLine();
    }

    Render_($container){
        assert(false, 'Should not be rendered, as it just changes the parent group\'s layout');
    }
}