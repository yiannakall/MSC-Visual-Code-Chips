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
    canRepeat;

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
            let text = (this.typeId == 'tab') ? '' : (this.symbol.alias || this.symbol.symbol.name)
            $elem = $(`<div class ="block"> ${text} </div>`);
            $elem.on('click', (event) => Block.OnClick(event, this));
            $elem.addClass(this.extraCssClasses_priv.join(' '));
            this.$block_priv = $elem;
        }else{
            $elem = $('<div></div>').addClass('block-with-selections');
            let $block = $('<div></div>').addClass('block');
            let $blockWithArrow = $('<div></div>').addClass('block-with-arrow').append(
                $block,
                $('<div></div>').addClass('arrow')
            );
            let $blockAlternateSelections = $('<div></div>').addClass('block-alternate-selections').hide();
            $elem.append($blockWithArrow, $blockAlternateSelections);

            let text = this.symbol.alias !== undefined ? this.symbol.alias : this.symbol.symbol.name;
            $block.html(text);
                
            if (this.canRepeat){
                $blockWithArrow.addClass('block-can-repeat')
            }

            $blockWithArrow.on('click', (e) => {
                Block.OnClick(e, this);
                $('.block-alternate-selections').not($blockAlternateSelections).hide();
                $blockAlternateSelections.toggle();
            });

            for (let choice of this.alternateSymbols){
                let text = choice.alias !== undefined ? choice.alias : choice.symbol.name;
                let $choice = $('<div></div>').addClass('block-alternate-selection').html(text);
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
}