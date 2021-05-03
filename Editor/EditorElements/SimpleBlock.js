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

    Render_($container){
        let $elem = $('<div/>').addClass('block').html(this.symbol.alias || this.symbol.symbol.name);
        $container.append($elem);
        this.$wholeView = this.$customizableView = $elem;
    }

    GetSymbol(){
        return this.symbol;
    }
}