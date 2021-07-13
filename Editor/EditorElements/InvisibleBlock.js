import { assert } from "../../Utils/Assert.js";
import { EditorElementTypes, EditorElement, EditorElementViewMode } from "./EditorElement.js";

export class InvisibleBlock extends EditorElement {
    symbol;

    constructor(symbol){
        super(EditorElementTypes.InvisibleBlock);
        this.symbol = symbol;
        assert(this.symbol.textViewOnly);
    }

    Clone_() {
        return new InvisibleBlock(this.symbol.Clone());
    }

    ToJson_(){
        return {
            symbol: this.symbol,
        };
    }

    Render_(){
        let $elem = $('<div/>').addClass('invisible-block').html(this.symbol.alias || this.symbol.symbol.name);
        this.$wholeView = this.$customizableView = $elem;
    }

    GetSymbol(){
        return this.symbol;
    }
}