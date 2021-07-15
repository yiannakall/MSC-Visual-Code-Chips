import { EditorElement, EditorElementTypes, EditorElementViewMode } from './EditorElement.js' 

export class InputBlock extends EditorElement {
    symbol;
    userInput_;
    isEditable_ = true;

    onInput = () => {};

    constructor(symbol){
        super(EditorElementTypes.InputBlock);
        this.symbol = symbol;
    }

    Clone_() {
        let b = new InputBlock(this.symbol.Clone());
        b.userInput_ =  this.userInput_;
        b.onInput = this.onInput.bind(b);
        b.isEditable_ = this.isEditable_;
        return b;
    }

    ToJson_(){
        return {
            symbol: this.symbol,
            userInput_: this.userInput_
        };
    }

    Render_(){
        let $inputBlock = $('<div/>').addClass('input-block');
        $inputBlock.attr('title', this.symbol.tooltip || this.symbol.alias || this.symbol.symbol.name);

        this.CreateInput_();
        $inputBlock.append(this.$input);

        this.$wholeView = this.$customizableView = $inputBlock;
    }

    CreateInput_(){
        this.$input = $('<input>').addClass('input');
        this.$input.attr('placeholder', this.symbol.alias || this.symbol.symbol.name);

        if (this.userInput_ !== undefined && this.userInput_ !== ''){
            this.$input.val(this.userInput_);
            this.onInput(this);
        }

        this.$input?.prop("readonly", !this.isEditable_);

        this.$input.on('keypress', e => e.stopPropagation() );
        this.$input.on('keyup', e => e.stopPropagation() );
        this.$input.on('keydown', e => e.stopPropagation() );

        this.$input.on('input', (e) => {
            this.userInput_ = this.$input.val();
            this.onInput(this);
            this.FitInput_();
            e.stopPropagation();
        });
    }

    FitInput_(){
        this.viewMode === EditorElementViewMode.BlockView ?
            this.$wholeView.css('width', this.$input.textWidth(this.$input.val() || this.$input.attr('placeholder')) + 20 + 'px') :
            this.$wholeView.css('width', this.$input.textWidth(this.$input.val() || this.$input.attr('placeholder')) + 'px');
    }

    PastRendering_(){
        this.FitInput_();
        
        let lightenedColors = this.$wholeView.css('background-color')
            .substring(4, this.$wholeView.css('background-color').length - 1)
            .replace(/\s/g, '')
            .split(',')
            .map(color => { return Number(color) + 0.1 * (255 - Number(color)) });

        this.$input.css('background-color', 'rgb(' + lightenedColors.join(', ') + ')');
    }

    OnApplyViewMode_(){
        this.FitInput_();

        (this.viewMode === EditorElementViewMode.BlockView) ?
            this.$input?.prop("readonly", !this.isEditable_) :
            this.$input?.prop("readonly", true);
    }

    GetInput(){
        return this.$input;
    }

    SetText(text){
        this.userInput_ = text;
        this.$input?.val(this.userInput_);
    }

    SetOnInput(f){
        this.onInput = f;
    }

    GetSymbol(){
        return this.symbol;
    }

    SetEditable(isEditable){
        this.isEditable_ = !!isEditable;
        this.$input?.prop("readonly", !this.isEditable_);
    }
}