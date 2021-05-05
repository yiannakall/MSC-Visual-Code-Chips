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

    isDraggable = true;
    isDroppable = true;

    onClick = (self) => {};
    theme = (self) => { return ''; }
    
    onDragStart = (e, self) => { };
    onDragEnd = (e, self) => { };
    onDrop = (e, self) => { };
    onDragEnter = (e, self) => { };
    onDragLeave = (e, self) => { };
    
    constructor(type){
        this.type = type;
    }

    /* subclass may override */

    Clone_()                            { assert(false, 'Non implemented by subclass'); }
    ToJson_()                           { assert(false, 'Non implemented by subclass'); }
    Render_($container)                 { assert(false, 'Non implemented by subclass'); }
    PastStyling_()                      { }

    /* --------------------- */

    Clone() {
        let instance = this.Clone_();

        instance.onClick = this.onClick.bind(instance);
        instance.theme = this.theme.bind(instance);
        instance.onDragStart = this.onDragStart.bind(instance);
        instance.onDragEnd = this.onDragEnd.bind(instance);
        instance.onDrop = this.onDrop.bind(instance);
        instance.onDragEnter = this.onDragEnter.bind(instance);
        instance.onDragLeave = this.onDragLeave.bind(instance);

        instance.isDraggable = this.isDraggable;
        instance.isDroppable = this.isDroppable;

        return instance;
    }

    CloneRec() {
        let block = this.Clone();
        if (this.generatedBy){
            block.generatedBy = this.generatedBy.CloneRec();
        }
        return block;
    }

    ToString() {
        return JSON.stringify( this.ToJsonRec() );
    }

    ToJson() {
        let json = this.ToJson_();
        json.type = this.type;
        return json;
    }

    ToJsonRec() {
        let json = this.ToJson();
        if (this.generatedBy){
            json.generatedBy = this.generatedBy.ToJsonRec();
        }
        return json;
    }

    Render($container) {
        this.Render_($container);
        this.ApplyTheme_();
        this.PastStyling_();
        this.AddOnClick_();

        if (this.isDraggable){
            this.MakeDraggable_();
        }
        if (this.isDroppable){
            this.MakeDroppable_();
        }
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

    MakeDraggable_() {
        this.$customizableView.attr('draggable', 'true');

        this.$customizableView.on('dragstart', (e) => {
            e.stopPropagation();
            e.originalEvent.dataTransfer.setData('block', this.ToString());
            this.onDragStart(e, this);
        });

        this.$customizableView.on('dragend', (e) => {
            e.stopPropagation();
            this.onDragEnd(e, this);
        });
    }

    MakeDroppable_(){
        this.$customizableView.on('dragover', (e) => {
            e.preventDefault();
        });

        this.$customizableView.on('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.onDrop(e, this);
        });

        this.$customizableView.on('dragenter', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.onDragEnter(e, this);
        });

        this.$customizableView.on('dragleave', (e) => {
            this.onDragLeave(e, this);
        });
    }

    GetWholeView()                  { return this.$wholeView; }
    GetCustomizableView()           { return this.$customizableView; }
    GetType()                       { return this.type; }
    GetGeneratedBy()                { return this.generatedBy; }
    GetParent()                     { return this.parent; }

    SetOnClick(f)                   { this.onClick = f; }
    SetOnDragStart(f)               { this.onDragStart = f; }
    SetOnDragEnd(f)                 { this.onDragEnd = f; }
    SetOnDrop(f)                    { this.onDrop = f; }
    SetOnDragEnter(f)               { this.onDragEnter = f; }
    SetOnDragLeave(f)               { this.onDragLeave = f; }
    SetDraggable(isDraggable)       { this.isDraggable = !!isDraggable; }
    SetDroppable(isDroppable)       { this.isDroppable = !!isDroppable; }
    SetGeneratedBy(generatedBy)     { this.generatedBy = generatedBy; }
    SetParent(p)                    { this.parent = p; }
    SetTheme(f)                     { this.theme = f; }
}