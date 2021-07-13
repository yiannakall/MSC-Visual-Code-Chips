import { assert } from "../../Utils/Assert.js";

export const EditorElementTypes = {
    NewLine: 'NEW_LINE',
    Tab: 'TAB_BLOCK',
    SimpleBlock: 'SIMPLE_BLOCK',
    InputBlock: 'INPUT_BLOCK',
    SelectionBlock: 'SELECTION_BLOCK',
    Group: 'GROUP',
    InvisibleBlock: 'INVISIBLE_BLOCK'
}

export const EditorElementViewMode = {
    BlockView: 'BlockView',
    PureTextView: 'PureTextView'
};

export class EditorElement {
    parent;
    generatedBy;
    type;
    viewMode = EditorElementViewMode.BlockView;

    $wholeView;
    $customizableView;

    isDraggable = true;
    isDroppable = true;

    onClick = (e, self) => {};
    onContextMenu = (e, self) => {};
    theme = (self) => { return ''; };
    
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
    ApplyViewMode(mode)                 { assert(false, 'Non implemented by subclass'); }
    PastRendering_()                    { }
    OnApplyViewMode_()                  { }

    /* --------------------- */

    Clone() {
        let instance = this.Clone_();

        instance.onClick = this.onClick.bind(instance);
        instance.onContextMenu = this.onContextMenu.bind(instance);
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
        this.$customizableView = this.$wholeView = undefined;
        this.Render_();
        assert(this.$customizableView), assert(this.$wholeView);
        $container.append(this.$wholeView);

        this.PastRendering();
    }
    
    RenderAfter($prev){
        this.$customizableView = this.$wholeView = undefined;
        this.Render_();
        assert(this.$customizableView), assert(this.$wholeView);
        $prev.after(this.$wholeView);

        this.PastRendering();
    }

    RenderBefore($next){
        this.$customizableView = this.$wholeView = undefined;
        this.Render_();
        assert(this.$customizableView), assert(this.$wholeView);
        $next.before(this.$wholeView);

        this.PastRendering();
    }

    RemoveRenderedView(){
        this.$wholeView.remove();
        this.$wholeView = this.$customizableView = undefined;
    }

    PastRendering(){
        this.ApplyTheme_();
        this.ApplyViewMode(this.viewMode);
        this.AddOnClick_();
        this.AddOnContextMenu_();
        
        if (this.isDraggable){
            this.MakeDraggable_();
        }
        if (this.isDroppable){
            this.MakeDroppable_();
        }

        this.PastRendering_();
    }

    ApplyTheme_(){
        let style = this.theme(this);
        this.$customizableView.addClass(style);
    }

    AddOnClick_() {
        this.$wholeView.on('click', (e) => {
            if (this.viewMode === EditorElementViewMode.PureTextView)
                return;

            this.onClick(e, this);
        });
    }

    AddOnContextMenu_(){
        this.$wholeView.on('contextmenu', (e) => {
            if (this.viewMode === EditorElementViewMode.PureTextView)
                return;

            this.onContextMenu(e, this);
        });
    }

    MakeDraggable_() {
        this.$customizableView.attr('draggable', 'true');

        this.$customizableView.on('dragstart', (e) => {
            if (this.viewMode === EditorElementViewMode.PureTextView)
                return;

            e.stopPropagation();
            e.originalEvent.dataTransfer.setData('block', this.ToString());
            this.onDragStart(e, this);
        });

        this.$customizableView.on('dragend', (e) => {
            if (this.viewMode === EditorElementViewMode.PureTextView)
                return;
            
            e.stopPropagation();
            this.onDragEnd(e, this);
        });
    }

    MakeDroppable_(){
        this.$customizableView.on('dragover', (e) => {
            if (this.viewMode === EditorElementViewMode.PureTextView)
                return;

            e.preventDefault();
        });

        this.$customizableView.on('drop', (e) => {
            if (this.viewMode === EditorElementViewMode.PureTextView)
                return;

            this.onDrop(e, this);
        });

        this.$customizableView.on('dragenter', (e) => {
            if (this.viewMode === EditorElementViewMode.PureTextView)
                return;

            e.preventDefault();
            e.stopPropagation();
            this.onDragEnter(e, this);
        });

        this.$customizableView.on('dragleave', (e) => {
            if (this.viewMode === EditorElementViewMode.PureTextView)
                return;

            this.onDragLeave(e, this);
        });
    }

    ApplyViewMode(mode){
        switch (mode) {
            case EditorElementViewMode.PureTextView:
                this.$wholeView?.addClass('pure-text');
                this.$customizableView?.attr('draggable', 'false');
                break;
            case EditorElementViewMode.BlockView:
                this.$wholeView?.removeClass('pure-text');
                this.$customizableView?.attr('draggable', this.isDraggable);
                break;
            default:
                assert(false, `Non supported view mode: "${mode}"`);
        }

        this.viewMode = mode;

        this.OnApplyViewMode_();
    }

    GetWholeView()                  { return this.$wholeView; }
    GetCustomizableView()           { return this.$customizableView; }
    GetViewMode()                   { return this.viewMode; }
    GetType()                       { return this.type; }
    GetGeneratedBy()                { return this.generatedBy; }
    GetParent()                     { return this.parent; }

    SetOnClick(f)                   { this.onClick = f; }
    SetOnContextMenu(f)             { this.onContextMenu = f; }
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