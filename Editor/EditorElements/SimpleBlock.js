import { Themeable, ThemeableProps } from '../Theme.js';
import { EditorElement, EditorElementTypes } from './EditorElement.js'

export class SimpleBlock extends EditorElement {
    symbol;

    static themeableIds ={
        SimpleBlock: 'Simple Block',
    };

    static themeables = [
        {
            id: this.themeableIds.SimpleBlock,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.PaddingLeft,
                ThemeableProps.Props.PaddingRight,
                ThemeableProps.Props.PaddingTop,
                ThemeableProps.Props.PaddingBottom,
                ThemeableProps.Props.FontColor,
                ThemeableProps.Props.FontSize,
                ThemeableProps.Props.FontIsItalic,
                ThemeableProps.Props.FontIsBold,
                ThemeableProps.Props.BorderWidth,
                ThemeableProps.Props.BorderColor,
                ThemeableProps.Props.BorderRadius,
            ),
        },
    ];

    customizableViews = [
        {
            id: SimpleBlock.themeableIds.SimpleBlock,
            GetView: () => { return this.$wholeView; }
        },
    ];

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

    ApplyTextViewTheme_(){
        let theme = this.textViewTheme(this), color = theme?.Get(ThemeableProps.Props.FontColor);

        if (theme && color) this.$wholeView.css(ThemeableProps.ToCss(ThemeableProps.Props.FontColor, color));
    }

    GetSymbol(){
        return this.symbol;
    }
}