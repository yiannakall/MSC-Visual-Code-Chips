import { Themeable, ThemeableProps } from "../Theme.js";
import { EditorElementTypes } from "./EditorElement.js";
import { Group } from "./Group.js";

export class RepetitionGroup extends Group{

    repetitiveElem_;
    $repButton_;
    $plus_;
    
    isEditable_ = true;
    isButtonInline = 'auto';

    onCreate = (self) => {};

    static themeableIds = {
        Button: 'Button',
        ButtonPlusSign: 'Button Plus Sign',
        ButtonTooltip: 'Button Tooltip',
        ButtonOnHover: 'Button On Hover',
        ButtonPlusSignOnHover: 'Button Plus Sign On Hover',
    };

    static themeables = [
        ...Group.themeables,
        {
            id: RepetitionGroup.themeableIds.Button,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.PaddingLeft,
                ThemeableProps.Props.PaddingRight,
                ThemeableProps.Props.PaddingTop,
                ThemeableProps.Props.PaddingBottom,
                ThemeableProps.Props.BorderWidth,
                ThemeableProps.Props.BorderColor,
            ),
        },
        {
            id: RepetitionGroup.themeableIds.ButtonPlusSign,
            themeable: new Themeable(
                ThemeableProps.Props.Width,
                ThemeableProps.Props.Height,
                ThemeableProps.Props.BackgroundColor,
            ),
        },
        {
            id: RepetitionGroup.themeableIds.ButtonTooltip,
            themeable: new Themeable(
                ThemeableProps.Props.FontSize,
                ThemeableProps.Props.FontColor,
                ThemeableProps.Props.BackgroundColor,
            ),
        },
        {
            id: RepetitionGroup.themeableIds.ButtonOnHover,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
            ),
        },
        {
            id: RepetitionGroup.themeableIds.ButtonPlusSignOnHover,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
            ),
        },
    ];

    constructor(symbol, repetitiveElem, elems){
        super(symbol, elems);
        this.repetitiveElem_ = repetitiveElem;
        this.type = EditorElementTypes.RepetitionGroup;

        let buttonMouseOver, buttonMouseLeave, buttonPlusMouseOver, buttonPlusMouseLeave;

        this.customizableViews.push(
            {
                id: RepetitionGroup.themeableIds.Button,
                GetView: () => { return this.$repButton_; }
            },
            {
                id: RepetitionGroup.themeableIds.ButtonPlusSign,
                GetView: () => { return this.$plus_; }
            },
            {
                id: RepetitionGroup.themeableIds.ButtonOnHover,
                ApplyTheme: (theme) => {
                    let hoverBg = theme.Get(ThemeableProps.Props.BackgroundColor);
                    let prevBg = this.$repButton_.css('background-color');
    
                    if(buttonMouseOver) this.$repButton_.off('mouseenter', buttonMouseOver);
                    if(buttonMouseLeave) this.$repButton_.off('mouseenter', buttonMouseLeave);

                    buttonMouseOver = () => {
                        if (!this.isEditable_)  return;
                        if (hoverBg)            this.$repButton_.css('background-color', hoverBg);
                    };
            
                    buttonMouseLeave = () => {
                        if (!this.isEditable_)  return;
                        if (prevBg)             this.$repButton_.css('background-color', prevBg);
                    };

                    this.$repButton_.on('mouseenter', buttonMouseOver);
                    this.$repButton_.on('mouseleave', buttonMouseLeave);
                }
            },
            {
                id: RepetitionGroup.themeableIds.ButtonPlusSignOnHover,
                ApplyTheme: (theme) => {
                    let hoverBg = theme.Get(ThemeableProps.Props.BackgroundColor);
                    let prevBg = this.$plus_.css('background-color');

                    if(buttonPlusMouseOver) this.$repButton_.off('mouseenter', buttonPlusMouseOver);
                    if(buttonPlusMouseLeave) this.$repButton_.off('mouseenter', buttonPlusMouseLeave);
    
                    buttonPlusMouseOver = () => {
                        if (!this.isEditable_)  return;
                        if (hoverBg)            this.$plus_.css('background-color', hoverBg);
                    };
            
                    buttonPlusMouseLeave = () => {
                        if (!this.isEditable_)  return;
                        if (prevBg)             this.$plus_.css('background-color', prevBg);
                    }

                    this.$repButton_.on('mouseenter', buttonPlusMouseOver);
                    this.$repButton_.on('mouseleave', buttonPlusMouseLeave);
                }
            },
            {
                id: RepetitionGroup.themeableIds.ButtonTooltip,
                ApplyTheme: (theme) => {
                    let bg = theme.Get(ThemeableProps.Props.BackgroundColor);
                    let fColor = theme.Get(ThemeableProps.Props.FontColor);
                    let fSize = theme.Get(ThemeableProps.Props.FontSize);
    
                    let triangle = this.$repButton_.children('.tooltip-arrow');
                    let box = this.$repButton_.children('.tooltip-content');
    
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
        );
    }

    CreateButton_(){
        let $repButton = $('<div/>').addClass('repeat-button');
        let $plus = $('<div/>').addClass('plus');
        
        let tooltipText = 'New ' +  (
                                        this.repetitiveElem_.GetSymbol().alias ||
                                        this.repetitiveElem_.GetSymbol().symbol.name
                                    )
        ;

        if (this.isEditable_){
            $repButton.addClass('tooltip-container2');
            $repButton.append($('<div/>').addClass('tooltip-arrow'));
            $repButton.append($('<div/>').addClass('tooltip-content').text(tooltipText));
        }
        
        $repButton.attr('title', '');

        $repButton.append($plus);

        $repButton.on('click', (e) => {
            if (this.isEditable_){
                e.stopPropagation();
                this.onCreate(this);
            }
        });

        this.$repButton_ = $repButton;
        this.$plus_ = $plus;

        if (this.isButtonInline === 'auto'){
            this.MakeButtonPositionAuto();
        } else {
            this.isButtonInline ? this.PlaceButtonInline() : this.PlaceButtonInSeparateLine();
        }
    }

    Render_() {
        super.Render_();
        this.$wholeView.addClass('repetition-group');

        this.CreateButton_();
        this.$wholeView.append(this.$repButton_);
    }

    RenderChild_(elem){
        elem.RenderBefore(this.$repButton_);
        this.onRenderElem(elem);
    }

    Clone_(){
        let clonedElems = this.elems.map(elem => elem.CloneRec()), clonedRep = this.repetitiveElem_.CloneRec();
        let repGroup = new RepetitionGroup(this.symbol.Clone(), clonedRep, clonedElems);
        repGroup.SetOnCreate(this.onCreate.bind(repGroup));
        return repGroup;
    }

    ToJson_(){
        let elems = this.elems.map(elem => elem.ToJsonRec());
        let repetitiveElem = this.repetitiveElem_.ToJsonRec();
        return {
            symbol: this.symbol,
            elems,
            repetitiveElem
        };
    }

    SetEditable(isEditable){
        this.isEditable_ = !!isEditable;
    }

    SetOnCreate(f){
        this.onCreate = f;
    }

    GetRepetitiveElem(){
        return this.repetitiveElem_;
    }

    SetButtonPlacement(newline){
        this.isButtonInline = (newline === 'auto') ? 'auto' : !newline;

        if (!this.$repButton_) return;
        
        if (this.isButtonInline === 'auto'){
            this.MakeButtonPositionAuto();
        } else {
            this.isButtonInline ? this.PlaceButtonInline() : this.PlaceButtonInSeparateLine();
        }
    }

    PlaceButtonInline(){
        this.$repButton_.css({
            'display': 'inline-flex',
            'margin-top': '0px',
            'vertical-align': 'middle'
        });
    }

    PlaceButtonInSeparateLine(){
        this.$repButton_.css({
            'display': '',
            'margin-top': '',
            'vertical-align': ''
        });
    }

    MakeButtonPositionAuto(){
        (this.repetitiveElem_.GetType() === EditorElementTypes.InputBlock) ?
            this.PlaceButtonInline() : this.PlaceButtonInSeparateLine();
    }

}