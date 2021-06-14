export class UndoRedoToolbar {
    $container;
    $view;

    onUndo;
    onRedo;

    constructor($container){
        this.$container = $container;
        this.Render();
    }

    SetUndoDescription(text){
        this.$container.find('.undo-redo-toolbar-container .undo-segment .action-text').text(text);
    }
    
    SetRedoDescription(text){
        this.$container.find('.undo-redo-toolbar-container .redo-segment .action-text').text(text);
    }

    SetUndoNumber(i){
        this.$container.find('.undo-redo-toolbar-container .undo-segment .actions-left').text(i);
    }

    SetRedoNumber(i){
        this.$container.find('.undo-redo-toolbar-container .redo-segment .actions-left').text(i);
    }

    CreateIcon(){
        let $iconContainer = $('<div/>').addClass('icon-container');
     
        let $icon = $('<div/>').addClass('icon');
        let $actionsLeft = $('<div/>').addClass('actions-left').text(0);
        
        $iconContainer.append($icon, $actionsLeft);
        
        return $iconContainer;
    }

    Render(){
        this.$view = $('<div/>').addClass('undo-redo-toolbar-container');
        let $toolbar = $('<div/>').addClass('undo-redo-toolbar');
        
        let $undoSegment = $('<div/>').addClass('undo-segment');
        let $undoIcon = this.CreateIcon();
        let $undoDescription = $('<div/>').addClass('action-text');
        
        $undoSegment.append($undoIcon, $undoDescription);
        $undoSegment.on( 'click', () => this.onUndo() );
        
        let $redoSegment = $('<div/>').addClass('redo-segment');
        let $redoIcon = this.CreateIcon();
        let $redoDescription = $('<div/>').addClass('action-text');
        
        $redoSegment.append($redoIcon, $redoDescription);
        $redoSegment.on( 'click', () => this.onRedo() );

        let $closeButton = $('<div/>').addClass('close-container')
            .append( $('<div/>').addClass('close') )
            .on('click', () => this.Hide() );
        
        let $separator = $('<div/>').addClass('separator');

        $toolbar.append($undoSegment, $separator, $redoSegment);
        this.$view.append($toolbar, $closeButton);

        this.Hide(), this.$container.append(this.$view);
    }

    SetOnUndo(f){
        this.onUndo = f;
    }

    SetOnRedo(f){
        this.onRedo = f;
    }

    Hide(){
        this.$view.hide();
    }

    Show(){
        this.$view.fadeIn();
    }

    Toggle(){
        $view.is(":visible") ? this.Hide() : this.Show();
    }
}