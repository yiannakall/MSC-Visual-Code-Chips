import { assert } from '../../Utils/utils.js';
import { EditorElement, EditorElementTypes } from './EditorElement.js'

export class SelectionBlock extends EditorElement {
    symbol;
    alternateSymbols = [];
    selectedSymbol;
    onSelect = () => {};

    constructor(symbol, alternateSymbols){
        super(EditorElementTypes.SelectionBlock);
        this.symbol = symbol;
        this.alternateSymbols = alternateSymbols;
    }

    Clone_() {
        let b = new SelectionBlock( this.symbol.Clone(), this.alternateSymbols );
        b.onSelect = this.onSelect.bind(b);
        return b;
    }

    Render_($container){        
        let $blockWithArrow = 
            $('<div/>').addClass('block-with-arrow').append(
                $('<div/>').addClass('block').html(this.symbol.alias || this.symbol.symbol.name),
                $('<div/>').addClass('arrow')
            );

        if (this.symbol.repeatable){
            $blockWithArrow.addClass('block-can-repeat')
        }
        this.$customizableView = $blockWithArrow;

        let $blockAlternateSelections = $('<div/>').addClass('block-alternate-selections').hide();
        
        this.$wholeView = 
            $('<div/>').addClass('block-with-selections').append(
                $blockWithArrow,
                $blockAlternateSelections
            );

        $blockWithArrow.on('click', (e) => {
            $('.block-alternate-selections').not($blockAlternateSelections).hide();
            $blockAlternateSelections.toggle();
        });

        for (let symbol of this.alternateSymbols){
            $blockAlternateSelections.append(this.CreateChoiceView_(symbol));
        }
                
        $container.append(this.$wholeView);
    }

    CreateChoiceView_(symbol){
        let text = symbol.alias || symbol.symbol.name;
        let $choice = $('<div/>').addClass('block-alternate-selection').html(text);

        $choice.on( 'click', () => {
            this.selectedSymbol = symbol;
            this.onSelect(this);
        });
    
        return $choice;
    }

    GetSelectedSymbol(){
        return this.selectedSymbol;
    }

    SetOnSelect(f){
        this.onSelect = f;
    }

    GetSymbol(){
        return this.symbol;
    }
}