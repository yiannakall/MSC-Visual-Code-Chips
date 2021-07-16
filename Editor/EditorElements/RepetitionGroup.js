import { EditorElementTypes } from "./EditorElement.js";
import { Group } from "./Group.js";
import { NewLine } from "./NewLine.js";

export class RepetitionGroup extends Group{

    repetitiveElem_;
    $repButton_;
    
    isEditable_ = true;

    constructor(symbol, repetitiveElem, elems){
        super(symbol, elems);
        this.repetitiveElem_ = repetitiveElem;
        this.type = EditorElementTypes.RepetitionGroup;

        if (!elems || elems.length === 0)
            this.CreateElem();
    }

    CreateButton_(){
        let $repButton = $('<div/>').addClass('repeat-button');
        let $plus = $('<div/>').addClass('plus');
        
        $repButton.addClass('tooltip-container');
        $repButton.attr('tooltip', `New ${this.repetitiveElem_.GetSymbol().alias || this.repetitiveElem_.GetSymbol().symbol.name}`);
        $repButton.attr('title', '');

        $repButton.append($plus);

        $repButton.on('click', (e) => {
            if (this.isEditable_){
                e.stopPropagation();
                this.CreateElem();
            }
        });

        if (this.repetitiveElem_.GetType() === EditorElementTypes.InputBlock)
            $repButton.css({
                'display': 'inline-flex',
                'margin-top': '0px',
                'vertical-align': 'middle'
            });

        return $repButton;
    }

    CreateElem(){
        if (this.GetLength() !== 0 &&
            (
                this.repetitiveElem_.GetType() === EditorElementTypes.SelectionBlock ||
                this.repetitiveElem_.GetType() === EditorElementTypes.Group ||
                this.repetitiveElem_.GetType() === EditorElementTypes.RepetitionGroup
            )
        ){
            this.PushElem(new NewLine());
        }

        this.PushElem(this.repetitiveElem_.CloneRec());
    }

    Render_() {
        super.Render_();
        this.$wholeView.addClass('repetition-group');

        this.$repButton_ = this.CreateButton_();
        this.$wholeView.append(this.$repButton_);
    }

    RenderChild_(elem){
        elem.RenderBefore(this.$repButton_);
        this.onRenderElem(elem);
    }

    Clone_(){
        let clonedElems = this.elems.map(elem => elem.CloneRec());
        return new RepetitionGroup(this.symbol.Clone(), this.repetitiveElem_, clonedElems);
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

}