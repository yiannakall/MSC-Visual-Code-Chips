import { EditorElement, EditorElementTypes } from './EditorElement.js'

export class TabBlock extends EditorElement {
    constructor(){
        super(EditorElementTypes.Tab);
    }

    Clone_() {
        return new TabBlock();
    }

    Render_($container){
        let $elem = $('<div/>').addClass('block');
        $container.append($elem);
        this.$wholeView = this.$customizableView = $elem;
    }
}