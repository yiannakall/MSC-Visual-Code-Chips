import { Themeable, ThemeableProps } from '../Theme.js';
import { EditorElement, EditorElementTypes } from './EditorElement.js'

export class OptionalBlock extends EditorElement {
    symbol;
    newSymbol;

    onMouseOver;
    onMouseLeave;


    static themeableIds ={
        OptionalBlock: 'Optional Block',
        OptionalBlockOnHover: 'Optional Block On Hover',
    };

    static themeables = [
        {
            id: this.themeableIds.OptionalBlock,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.PaddingLeft,
                ThemeableProps.Props.PaddingRight,
                ThemeableProps.Props.PaddingTop,
                ThemeableProps.Props.PaddingBottom,
                ThemeableProps.Props.FontColor,
                ThemeableProps.Props.FontSize,
                ThemeableProps.Props.FontIsUnderlined,
                ThemeableProps.Props.FontIsBold,
                ThemeableProps.Props.FontIsItalic,
                ThemeableProps.Props.BorderWidth,
                ThemeableProps.Props.BorderColor,
                ThemeableProps.Props.BorderRadius,
                ThemeableProps.Props.FontIsUnderlined,
            ),
        },
        {
            id: this.themeableIds.OptionalBlockOnHover,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.FontColor,
                ThemeableProps.Props.BorderColor,
            ),
        },
    ];

    customizableViews = [
        {
            id: OptionalBlock.themeableIds.OptionalBlock,
            GetView: () => { return this.$wholeView; }
        },
        {
            id: OptionalBlock.themeableIds.OptionalBlockOnHover,
            ApplyTheme: (theme) => {
                let hoverBg = theme.Get(ThemeableProps.Props.BackgroundColor);
                let hoverFontColor = theme.Get(ThemeableProps.Props.FontColor);
                let hoverBorderColor = theme.Get(ThemeableProps.Props.BorderColor);
                
                let prevBg = this.$wholeView.css('background-color');
                let prevFontColor = this.$wholeView.css('color');
                let prevBorderColor = this.$wholeView.css('border-color');

                if(this.onMouseOver) this.$wholeView.off('mouseenter', this.onMouseOver);
                if(this.onMouseLeave) this.$wholeView.off('mouseenter', this.onMouseLeave);

                this.onMouseOver = () => {
                    if (hoverBg)            this.$wholeView.css('background-color', hoverBg);
                    if (hoverFontColor)     this.$wholeView.css('color', hoverFontColor);
                    if (hoverBorderColor)   this.$wholeView.css('border-color', hoverBorderColor);
                };
        
                this.onMouseLeave = () => {
                    if (prevBg)             this.$wholeView.css('background-color', prevBg);
                    if (prevFontColor)     this.$wholeView.css('color', prevFontColor);
                    if (prevBorderColor)   this.$wholeView.css('border-color', prevBorderColor);
                };

                this.$wholeView.on('mouseenter', this.onMouseOver);
                this.$wholeView.on('mouseleave', this.onMouseLeave);
            }
        },
    ];

    constructor(symbol, newSymbol){
        super(EditorElementTypes.OptionalBlock);
        this.symbol = symbol, this.newSymbol = newSymbol;
    }

    Clone_() {
        return new OptionalBlock(this.symbol.Clone(), this.newSymbol.Clone());
    }

    ToJson_(){
        return {
            symbol: this.symbol, newSymbol: this.newSymbol
        };
    }

    Render_(){
        let $elem = $('<div/>').addClass('optional-block').html(this.symbol.alias || this.symbol.symbol.name);
        $elem.attr('title', this.symbol.tooltip || this.symbol.alias || this.symbol.symbol.name);

        this.$wholeView = this.$customizableView = $elem;
    }

    GetSymbol(){
        return this.symbol;
    }

    GetNewSymbol(){
        return this.newSymbol;
    }
}