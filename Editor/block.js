export class Block {
    static count_priv = 0;
    extraCssClasses_priv = [];
    id_priv;
    $view_priv;
    $block_priv;

    static OnClick = () => {};
    static OnChange = (block, aliasedSymbol) => {console.log(block, aliasedSymbol)};

    typeId;
    parent;

    symbol;
    alternateSymbols;
    canRepeat = false;

    isEditable = false;
    validationPredicate = (txt) => {return true};

    generatedBy;

    constructor(symbol, alternateSymbols) {
        this.symbol = symbol;
        this.alternateSymbols = alternateSymbols;
        this.id_priv = "elem" + Block.count_priv++;
    }

    static CreateTab() {
        let elem = new Block('');
        elem.typeId = 'tab';
        elem.SetExtraCssClasses(['tab']);
        return elem;
    }

    static CreateNewLine() {
        let elem = new Block('');
        elem.typeId = 'new_line';
        return elem;
    }

    Render($container) {
        let $elem;

        if (!this.alternateSymbols || this.alternateSymbols.length === 0){
            if (!this.isEditable){
                $elem = $('<div/>').addClass('block').html(this.symbol ? (this.symbol.alias || this.symbol.symbol.name) : '');
                $elem.addClass(this.extraCssClasses_priv.join(' '));
            }else{
                $elem = $('<div/>').addClass('block');
                let $input = $('<input>').addClass('block-input').val(this.symbol.alias || this.symbol.symbol.name);

                $input.on('keypress', e => e.stopPropagation() );
                $input.on('keyup', e => e.stopPropagation() );
                $input.on('keydown', e => e.stopPropagation() );

                $input.on('input', (e) => {
                    $elem.css('width', $input.textWidth() + 20 + 'px');
                    e.stopPropagation();
                });

                $elem.addClass(this.extraCssClasses_priv.join(' '));
                $elem.append($input);
                $elem.css('width', $input.textWidth() + 20 + 'px');
            }

            $elem.on('click', (event) => Block.OnClick(event, this));
            this.$block_priv = $elem;
        }else{
            $elem = $('<div/>').addClass('block-with-selections');
            let $block = $('<div/>').addClass('block');
            let $blockWithArrow = $('<div/>').addClass('block-with-arrow').append(
                $block,
                $('<div/>').addClass('arrow')
            );
            let $blockAlternateSelections = $('<div/>').addClass('block-alternate-selections').hide();
            $elem.append($blockWithArrow, $blockAlternateSelections);

            $block.html(this.symbol.alias || this.symbol.symbol.name);
                
            if (this.canRepeat){
                $blockWithArrow.addClass('block-can-repeat')
            }

            $blockWithArrow.on('click', (e) => {
                Block.OnClick(e, this);
                $('.block-alternate-selections').not($blockAlternateSelections).hide();
                $blockAlternateSelections.toggle();
            });

            for (let choice of this.alternateSymbols){
                let text = choice.alias || choice.symbol.name;
                let $choice = $('<div/>').addClass('block-alternate-selection').html(text);
                $choice.on('click', () => {
                    Block.OnChange(this, choice);
                });
                $blockAlternateSelections.append($choice);
            }
            
            $blockWithArrow.addClass(this.extraCssClasses_priv.join(' '));
            this.$block_priv = $blockWithArrow;
        }

        $container.append($elem);
        this.$view_priv = $elem;
    }

    AddSelectionHighlight(){
        this.$block_priv.addClass('selected');
    }

    RemoveSelectionHighlight(){
        this.$block_priv.removeClass('selected');
    }

    SetExtraCssClasses(extraCssClasses) {
        this.extraCssClasses_priv = extraCssClasses;
    }

    SetParent(parent){
        this.parent = parent;
    }

    GetView(){
        return this.$view_priv;
    }

    SetCanRepeat(canRepeat){
        this.canRepeat = canRepeat;
    }

    Clone(){
        return new Block(this.symbol, this.alternateSymbols);
    }

    MakeEditable(validationPredicate){
        this.isEditable = true;
        if(validationPredicate)
            this.validationPredicate = validationPredicate;
    }
}