export class Block {
    static count_priv = 0;
    extraCssClasses_priv = [];
    id_priv;
    $view_priv;
    $block_priv;
    $input_priv;

    static OnClick = () => {};
    static OnChange = (block, aliasedSymbol) => {console.log(block, aliasedSymbol)};
    static OnInput = (block, $input) => {};
    static GetCssClassesToApply = (block) => { return []; };

    typeId;
    parent;

    symbol;
    alternateSymbols;
    canRepeat = false;

    isEditable = false;
    userInput;

    generatedBy;

    constructor(symbol, alternateSymbols) {
        this.symbol = symbol;
        this.alternateSymbols = alternateSymbols;
        this.id_priv = "elem" + Block.count_priv++;
    }

    static CreateTab() {
        let elem = new Block('');
        elem.typeId = 'tab';
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
                $elem.addClass(Block.GetCssClassesToApply(this).join(' '));
                $container.append($elem);
                this.$view_priv = $elem;
            }else{
                $elem = $('<div/>').addClass('block');

                let $input = $('<input>').addClass('block-input');

                $elem.addClass(Block.GetCssClassesToApply(this).join(' '));
                $elem.append($input);
                $container.append($elem);
                
                $input.on('keypress', e => e.stopPropagation() );
                $input.on('keyup', e => e.stopPropagation() );
                $input.on('keydown', e => e.stopPropagation() );

                $input.attr('placeholder', this.symbol.alias || this.symbol.symbol.name);

                if (this.userInput !== undefined && this.userInput !== ''){
                    $input.val(this.userInput);
                    Block.OnInput(this, $input);
                }

                $elem.css('width', $input.textWidth($input.val() || $input.attr('placeholder')) + 20 + 'px');
                
                let lightenedColors = $elem.css('background-color')
                    .substring(4, $elem.css('background-color').length - 1)
                    .replace(/\s/g, '')
                    .split(',')
                    .map(color => { return Number(color) + 0.1 * (255 - Number(color)) });

                $input.css('background-color', 'rgb(' + lightenedColors.join(', ') + ')');
                if (this.canRepeat){
                    $input.addClass('block-can-repeat')
                }

                $input.on('input', (e) => {
                    this.userInput = $input.val();
                    Block.OnInput(this, $input);
                    $elem.css('width', $input.textWidth($input.val() || $input.attr('placeholder')) + 20 + 'px');
                    e.stopPropagation();
                });

                this.$input_priv = $input;
                this.$view_priv = $elem;
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
            
            $blockWithArrow.addClass(Block.GetCssClassesToApply(this).join(' '));
            this.$block_priv = $blockWithArrow;
            
            $container.append($elem);
            this.$view_priv = $elem;
        }
    }

    AddSelectionHighlight(){
        this.$block_priv.addClass('selected');
    }

    RemoveSelectionHighlight(){
        this.$block_priv.removeClass('selected');
    }

    SetParent(parent){
        this.parent = parent;
    }

    GetView(){
        return this.$view_priv;
    }

    GetInput(){
        return this.$input_priv;
    }

    SetCanRepeat(canRepeat){
        this.canRepeat = canRepeat;
    }

    SetEditable(isEditable){
        this.isEditable = isEditable;
    }

    Clone(){
        let block = new Block(this.symbol, this.alternateSymbols);
        block.isEditable = this.isEditable;
        return block;
    }

}