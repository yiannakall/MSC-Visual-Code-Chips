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
                ThemeableProps.Props.Gap
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
            GetView: () => { return this.$option; }
        },
        {
            id: SelectionBlock.themeableIds.OptionOnHover,
            ApplyTheme: (theme) => {
                let hoverBg = theme.Get(ThemeableProps.Props.BackgroundColor);
                let hoverColor = theme.Get(ThemeableProps.Props.FontColor);

                let prevBg, prevColor;

                this.$option.on('mouseenter', () => {
                    if (!prevBg)
                        prevBg = this.$option.css('background-color');
                    if (!prevColor)
                        prevColor = this.$option.css('color');
                
                    if (hoverBg)
                        this.$option.css('background-color', hoverBg);
                    if (hoverColor)
                        this.$option.css('color', hoverColor);
                });

                this.$option.on('mouseleave', () => {
                    if (prevBg)
                        this.$option.css('background-color', prevBg);
                    if (prevColor)
                        this.$option.css('color', prevColor);
                });
            }
        },
        {
            id: SelectionBlock.themeableIds.OptionTooltip,
            ApplyTheme: (theme) => {
                let bg = theme.Get(ThemeableProps.Props.BackgroundColor);
                let fColor = theme.Get(ThemeableProps.Props.FontColor);
                let fSize = theme.Get(ThemeableProps.Props.FontSize);

                let triangle = this.$option.children('.tooltip-content');
                let box = this.$option.children('.tooltip-arrow');

                if (bg !== undefined){
                    triangle.css('border-left-color', bg);
                    box.css('background-color', bg);
                }

                if (fColor !== undefined)
                    box.css('font-color', fColor);
                
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
        this.$selectionBlock = 
            $('<div/>').addClass('selection-block').append(
                $('<div/>').addClass('text').html(this.symbol.alias || this.symbol.symbol.name),
                $('<div/>').addClass('arrow')
            );

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

    CreateChoiceView_(symbol){
        let text = symbol.alias || symbol.symbol.name;
        let $choice = $('<div/>').addClass('block-alternate-selection').html(text);

        $choice.on( 'click', () => {
            this.selectedSymbol = symbol;
            this.$optionContainer.toggle();
            this.onSelect(this);
        });
    
        if (symbol.tooltip){
            $choice.addClass('tooltip-container2');
            $choice.append($('<div/>').addClass('tooltip-arrow'));
            $choice.append($('<div/>').addClass('tooltip-content').text(symbol.tooltip));
        }

        if (symbol === this.selectedSymbol){
            $choice.addClass('selected-symbol');
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