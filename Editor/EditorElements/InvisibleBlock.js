import { assert } from "../../Utils/Assert.js";
import { ThemeableProps } from "../Theme.js";
import { EditorElementTypes, EditorElement, EditorElementViewMode } from "./EditorElement.js";

export class InvisibleBlock extends EditorElement {
    constructor(symbol){
        super(EditorElementTypes.InvisibleBlock);
        this.symbol = symbol;
        assert(this.symbol.symbol.textViewOnly);
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

    ApplyTextViewTheme_(){
        let theme = this.textViewTheme(this), color = theme?.Get(ThemeableProps.Props.FontColor);
        
        if (theme && color) this.$wholeView.css(ThemeableProps.ToCss(ThemeableProps.Props.FontColor, color));
    }

    GetSymbol(){
        return this.symbol;
    }
}