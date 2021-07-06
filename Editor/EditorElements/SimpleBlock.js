import { EditorElement, EditorElementTypes } from './EditorElement.js'

export class SimpleBlock extends EditorElement {
    symbol;

    constructor(symbol){
        super(EditorElementTypes.SimpleBlock);
        this.symbol = symbol;
    }

    Clone_() {
        return new SimpleBlock(this.symbol.Clone());
    }

    ToJson_(){
        return {
            symbol: this.symbol,
        };
    }

    Render_(){
        let $elem = $('<div/>').addClass('simple-block').html(this.symbol.alias || this.symbol.symbol.name);
        this.$wholeView = this.$customizableView = $elem;
    }

    GetSymbol(){
        return this.symbol;
    }
}