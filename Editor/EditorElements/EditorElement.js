export const EditorElementTypes = {
    NewLine: 'NEW_LINE',
    Tab: 'TAB_BLOCK',
    SimpleBlock: 'SIMPLE_BLOCK',
    InputBlock: 'INPUT_BLOCK',
    SelectionBlock: 'SELECTION_BLOCK',
    Group: 'GROUP'
}

export class EditorElement {
    parent;
    generatedBy;
    type;
    
    $wholeView;
    $customizableView;

    onClick = () => {};
    theme = () => { return ''; }

    constructor(type){
        this.type = type;
    }

    /* subclass may override */

    Clone_()                            { assert(false, 'Non implemented by subclass'); }
    Render_($container)                 { assert(false, 'Non implemented by subclass'); }
    PastStyling_()                      { }

    /* --------------------- */

    Clone() {
        let instance = this.Clone_();

        instance.onClick = this.onClick.bind(instance);
        instance.theme = this.theme.bind(instance);
        
        return instance;
    }

    Render($container) {
        this.Render_($container);
        this.ApplyTheme_();
        this.PastStyling_();
        this.AddOnClick_();
    }
    
    ApplyTheme_(){
        let style = this.theme(this);
        this.$customizableView.addClass(style);
    }

    AddOnClick_() {
        this.$wholeView.on('click', (e) => {
            this.onClick(this);
            e.stopPropagation();
        });
    }

    CloneRec() {
        let block = this.Clone();
        if (this.generatedBy){
            block.generatedBy = this.generatedBy.CloneRec();
        }
        return block;
    }

    GetWholeView()                  { return this.$wholeView; }
    GetCustomizableView()           { return this.$customizableView; }
    GetType()                       { return this.type; }
    GetGeneratedBy()                { return this.generatedBy; }
    GetParent()                     { return this.parent; }

    SetOnClick(f)                   { this.onClick = f; }
    SetGeneratedBy(generatedBy)     { this.generatedBy = generatedBy; }
    SetParent(p)                    { this.parent = p; }
    SetTheme(f)                     { this.theme = f; }
}