import { EditorElement, EditorElementTypes } from './EditorElement.js'

export class SelectionBlock extends EditorElement {
    symbol;
    alternateSymbols = [];
    selectedSymbol;
    isEditable_ = true;

    $blockAlternateSelections;

    onSelect = () => {};

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

    Render_($container){
        let $blockWithArrow = 
            $('<div/>').addClass('selection-block').append(
                $('<div/>').addClass('text').html(this.symbol.alias || this.symbol.symbol.name),
                $('<div/>').addClass('arrow')
            );

        if (this.symbol.repeatable){
            $blockWithArrow.addClass('block-can-repeat');
        }
        $blockWithArrow.attr('title', this.symbol.tooltip || this.symbol.alias || this.symbol.symbol.name);
        
        $blockWithArrow.on('click', (e) => {
            if (this.isEditable_){
                $('.block-alternate-selections').not(this.$blockAlternateSelections).hide();
                this.$blockAlternateSelections.toggle();
            }
        });
        
        this.$customizableView = $blockWithArrow;
        this.$blockAlternateSelections = $('<div/>').addClass('block-alternate-selections').hide();
        
        this.$wholeView = 
            $('<div/>').addClass('selection-block-container').append(
                $blockWithArrow,
                this.$blockAlternateSelections
            );

        for (let symbol of this.alternateSymbols){
            this.$blockAlternateSelections.append(this.CreateChoiceView_(symbol));
        }
        this.$blockAlternateSelections.attr('title', '');

        $container.append(this.$wholeView);
    }

    CreateChoiceView_(symbol){
        let text = symbol.alias || symbol.symbol.name;
        let $choice = $('<div/>').addClass('block-alternate-selection').html(text);

        $choice.on( 'click', () => {
            this.selectedSymbol = symbol;
            this.onSelect(this);
        });
    
        if (symbol.tooltip){
            $choice.attr('tooltip', symbol.tooltip);
            $choice.addClass('tooltip-container');
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