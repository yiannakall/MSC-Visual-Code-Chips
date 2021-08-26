import { assert } from '../../Utils/Assert.js';
import { Theme, Themeable, ThemeableProps } from '../Theme.js';
import { EditorElement, EditorElementTypes, EditorElementViewMode } from './EditorElement.js'

export class SelectionBlock extends EditorElement {
    symbol;
    alternateSymbols = [];
    selectedSymbol;
    isEditable_ = true;

    $selectionBlock;
    $arrow;
    $optionContainer;
    $option;                    // every option

    onSelect = () => {};

    static themeableIds = {
        SelectionBlock: 'Selection Block',
        Arrow: 'Arrow',
        OptionContainer: 'Option Container',
        Option: 'Option',
        OptionOnHover: 'Option On Hover',
        OptionTooltip: 'Option Tooltip'
    };

    static themeables = [
        {
            id: SelectionBlock.themeableIds.SelectionBlock,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.PaddingLeft,
                ThemeableProps.Props.PaddingRight,
                ThemeableProps.Props.PaddingTop,
                ThemeableProps.Props.PaddingBottom,
                ThemeableProps.Props.FontSize,
                ThemeableProps.Props.FontColor,
                ThemeableProps.Props.Gap,
                ThemeableProps.Props.BorderWidth,
                ThemeableProps.Props.BorderColor,
                ThemeableProps.Props.BorderRadius,
            ),
        },
        {
            id: SelectionBlock.themeableIds.Arrow,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.Width,
                ThemeableProps.Props.Height,
            )
        },
        {
            id: SelectionBlock.themeableIds.OptionContainer,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.PaddingLeft,
                ThemeableProps.Props.PaddingRight,
                ThemeableProps.Props.PaddingTop,
                ThemeableProps.Props.PaddingBottom,
            ),
        },
        {
            id: SelectionBlock.themeableIds.Option,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.PaddingLeft,
                ThemeableProps.Props.PaddingRight,
                ThemeableProps.Props.PaddingTop,
                ThemeableProps.Props.PaddingBottom,
                ThemeableProps.Props.FontSize,
                ThemeableProps.Props.FontColor,
            ),
        },
        {
            id: SelectionBlock.themeableIds.OptionOnHover,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.FontColor
            )
        },
        {
            id: SelectionBlock.themeableIds.OptionTooltip,
            themeable: new Themeable(
                ThemeableProps.Props.FontSize,
                ThemeableProps.Props.FontColor,
                ThemeableProps.Props.BackgroundColor,
            )
        },
    ];

    customizableViews = [
        {
            id: SelectionBlock.themeableIds.SelectionBlock,
            GetView: () => { return this.$selectionBlock; }
        },
        {
            id: SelectionBlock.themeableIds.Arrow,
            GetView: () => { return this.$arrow; }
        },
        {
            id: SelectionBlock.themeableIds.OptionContainer,
            GetView: () => { return this.$optionContainer; }
        },
        {
            id: SelectionBlock.themeableIds.Option,
            GetView: () => { return this.$option.not('.selected-symbol'); }
        },
        {
            id: SelectionBlock.themeableIds.OptionOnHover,
            ApplyTheme: (theme) => {
                let hoverBg = theme.Get(ThemeableProps.Props.BackgroundColor);
                let hoverColor = theme.Get(ThemeableProps.Props.FontColor);

                let prevBg, prevColor, isEditable = () => this.isEditable_;

                this.$option.off('mouseenter'), this.$option.off('mouseleave');

                this.$option.on('mouseenter', function () {
                    if ( isEditable() ){
                        if (!prevBg)
                            prevBg = $(this).css('background-color');
                        if (!prevColor)
                            prevColor = $(this).css('color');
                    
                        if (hoverBg)
                            $(this).css('background-color', hoverBg);
                        if (hoverColor)
                            $(this).css('color', hoverColor);
                    }
                });

                this.$option.on('mouseleave', function() {
                    if ( isEditable() ){
                        if (prevBg && hoverBg)
                            $(this).css('background-color', prevBg);
                        if (prevColor && hoverColor)
                            $(this).css('color', prevColor);
                    }
                });
            }
        },
        {
            id: SelectionBlock.themeableIds.OptionTooltip,
            ApplyTheme: (theme) => {
                let bg = theme.Get(ThemeableProps.Props.BackgroundColor);
                let fColor = theme.Get(ThemeableProps.Props.FontColor);
                let fSize = theme.Get(ThemeableProps.Props.FontSize);

                let triangle = this.$option.children('.tooltip-arrow');
                let box = this.$option.children('.tooltip-content');

                if (bg !== undefined){
                    triangle.css('border-right-color', bg);
                    box.css('background-color', bg);
                }

                if (fColor !== undefined)
                    box.css('color', fColor);
                
                if (fSize !== undefined)
                    box.css('font-size', fSize);
            }
        },
    ];

    constructor(symbol, alternateSymbols){
        super(EditorElementTypes.SelectionBlock);
        this.symbol = symbol;
        this.alternateSymbols = alternateSymbols;
    }

    Clone_() {
        let b = new SelectionBlock( this.symbol.Clone(), this.alternateSymbols );
        b.onSelect = this.onSelect.bind(b);
        b.isEditable_ = this.isEditable_;
        if (this.selectedSymbol){
            b.SetSelectedSymbol(this.alternateSymbols.indexOf(this.selectedSymbol));
        }
        return b;
    }

    ToJson_(){
        return {
            symbol: this.symbol,
            alternateSymbols: this.alternateSymbols,
            selectedSymbol: this.selectedSymbol && this.alternateSymbols.indexOf(this.selectedSymbol)
        };
    }

    Render_(){
        this.$selectionBlock = $('<div/>').addClass('selection-block');

        let $text = $('<div/>').addClass('text').html(this.symbol.alias || this.symbol.symbol.name);
        this.$arrow = $('<div/>').addClass('arrow');

        this.$selectionBlock.append($text, this.$arrow);

        this.$selectionBlock.attr('title', this.symbol.tooltip || this.symbol.alias || this.symbol.symbol.name);
        
        this.$selectionBlock.on('click', (e) => {
            if (this.isEditable_ && this.viewMode !== EditorElementViewMode.PureTextView){
                $('.block-alternate-selections').not(this.$optionContainer).hide();
                this.$optionContainer.toggle();
            }
        });
        
        this.$optionContainer = $('<div/>').addClass('block-alternate-selections').hide();

        for (let symbol of this.alternateSymbols){
            this.$optionContainer.append(this.CreateChoiceView_(symbol));
        }
        this.$optionContainer.attr('title', '');

        let $selectionBlockContainer = $('<div/>')
            .addClass('selection-block-container')
            .append(
                this.$selectionBlock,
                this.$optionContainer
            );

        this.$option = this.$optionContainer.children('.block-alternate-selection');

        this.$customizableView = this.$selectionBlock;
        this.$wholeView = $selectionBlockContainer;
    }

    ApplyTextViewTheme_(){
        let theme = this.textViewTheme(this), color = theme?.Get(ThemeableProps.Props.FontColor);

        if (theme && color) this.$selectionBlock.css(ThemeableProps.ToCss(ThemeableProps.Props.FontColor, color));
    }

    CreateChoiceView_(symbol){
        let text = symbol.alias || symbol.symbol.name;
        let $choice = $('<div/>').addClass('block-alternate-selection').html(text);

        $choice.on( 'click', () => {
            if (this.isEditable_){
                this.selectedSymbol = symbol;
                this.$optionContainer.toggle();
                this.onSelect(this);
            }
        });
    
        if (symbol.tooltip){
            $choice.addClass('tooltip-container2');
            $choice.append($('<div/>').addClass('tooltip-arrow'));
            $choice.append($('<div/>').addClass('tooltip-content').text(symbol.tooltip));
        }

        if (!this.isEditable_){
            $choice.addClass('tooltip-disabled');

            if (symbol === this.selectedSymbol){
                let theme = this.theme(this)?.[SelectionBlock.themeableIds.OptionOnHover];
    
                if (theme){
                    let hoverBg = theme.Get(ThemeableProps.Props.BackgroundColor);
                    let hoverColor = theme.Get(ThemeableProps.Props.FontColor);
    
                    if (hoverBg)
                        $choice.css('background-color', hoverBg);
                    
                    if (hoverColor)
                        $choice.css('color', hoverColor);
                }
    
                $choice.addClass('selected-symbol');
            }
        }

        return $choice;
    }

    GetSelectedSymbol(){
        return this.selectedSymbol;
    }

    SetSelectedSymbol(index){
        this.selectedSymbol = this.alternateSymbols[index];
    }

    SetOnSelect(f){
        this.onSelect = f;
    }

    GetSymbol(){
        return this.symbol;
    }

    SetEditable(editable){
        this.isEditable_ = !!editable;
    }
}