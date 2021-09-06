import { Themeable, ThemeableProps } from '../Theme.js';
import { EditorElement, EditorElementTypes, EditorElementViewMode } from './EditorElement.js' 

export class InputBlock extends EditorElement {
    symbol;
    userInput_;
    isEditable_ = true;

    onInput = () => {};

    static themeableIds ={
        InputContainer: 'Input Container',
        Input: 'Input',
    };

    static themeables = [
        {
            id: InputBlock.themeableIds.InputContainer,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.PaddingLeft,
                ThemeableProps.Props.PaddingRight,
                ThemeableProps.Props.PaddingTop,
                ThemeableProps.Props.PaddingBottom,
                ThemeableProps.Props.BorderWidth,
                ThemeableProps.Props.BorderColor,
                ThemeableProps.Props.BorderRadius,
            ),
        },
        {
            id: InputBlock.themeableIds.Input,
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
            )
        },
    ];

    customizableViews = [
        {
            id: InputBlock.themeableIds.InputContainer,
            GetView: () => { return this.$wholeView; }
        },
        {
            id: InputBlock.themeableIds.Input,
            GetView: () => { return this.$input; }
        },
    ];

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
            this.$input.css('width', this.$input.textWidth(this.$input.val() || this.$input.attr('placeholder')) + 10 + 'px') :
            this.$input.css('width', this.$input.textWidth(this.$input.val() || this.$input.attr('placeholder')) + 'px');
    }

    PastRendering_(){
        this.FitInput_();
    }

    ApplyTextViewTheme_(){
        let theme = this.textViewTheme(this), color = theme?.Get(ThemeableProps.Props.FontColor);
        if (theme && color) this.$input.css(ThemeableProps.ToCss(ThemeableProps.Props.FontColor, color));
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