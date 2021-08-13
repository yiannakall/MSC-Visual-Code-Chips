import { ApplyCssToStyle, Themeable, ThemeableProps } from "../Theme.js";

export class UndoRedoToolbar {
    $container;
    $view;

    onUndo = () => {};
    onRedo = () => {};
    onShow = () => {};
    onHide = () => [];

    static themeableIds = {
        UndoButton: 'Undo Button',
        UndoButtonOnHover: 'Undo Button On Hover',
        UndoIcon: 'Undo Icon',
        UndoNumberNotification: 'Undo Number Notification',
        Separator: 'Separator',
        CloseButton: 'Close Button',
        CloseButtonX: 'Close Button X',
        CloseButtonHover: 'Close Button On Hover',
        CloseButtonXHover: 'Close Button X On Hover'
    };

    static themeables = [
        {
            id: UndoRedoToolbar.themeableIds.UndoButton,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.FontColor,
                ThemeableProps.Props.FontSize
            ),
        },
        {
            id: UndoRedoToolbar.themeableIds.UndoButtonOnHover,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.FontColor,
                ThemeableProps.Props.FontSize
            ),
        },
        {
            id: UndoRedoToolbar.themeableIds.UndoIcon,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
            ),
        },
        {
            id: UndoRedoToolbar.themeableIds.UndoNumberNotification,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
            ),
        },
        {
            id: UndoRedoToolbar.themeableIds.Separator,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.Width,
            ),
        },
        {
            id: UndoRedoToolbar.themeableIds.CloseButton,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
            ),
        },
        {
            id: UndoRedoToolbar.themeableIds.CloseButtonX,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
            ),
        },
        {
            id: UndoRedoToolbar.themeableIds.CloseButtonHover,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
            ),
        },
        {
            id: UndoRedoToolbar.themeableIds.CloseButtonXHover,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
            ),
        },
    ];

    customizableViews = [
        {
            id: UndoRedoToolbar.themeableIds.UndoButton,
            GetView: () => { return this.$view.find('.undo-segment, .redo-segment'); }
        },
        {
            id: UndoRedoToolbar.themeableIds.UndoButtonOnHover,
            ApplyTheme: (theme) => {
                ApplyCssToStyle(
                    `${this.id}-undo-button-hover`,
                    [`#${this.id} .undo-segment:hover, #${this.id} .redo-segment:hover`],
                    [theme.ToCss()]
                )
            }
        },
        {
            id: UndoRedoToolbar.themeableIds.UndoIcon,
            GetView: () => { return this.$view.find('.icon'); }
        },
        {
            id: UndoRedoToolbar.themeableIds.UndoNumberNotification,
            GetView: () => { return this.$view.find('.actions-left'); }
        },
        {
            id: UndoRedoToolbar.themeableIds.Separator,
            GetView: () => { return this.$view.find('.separator'); }
        },
        {
            id: UndoRedoToolbar.themeableIds.CloseButton,
            GetView: () => { return this.$view.find('.close-container'); }
        },
        {
            id: UndoRedoToolbar.themeableIds.CloseButtonX,
            GetView: () => { return this.$view.find('.close'); }
        },
        {
            id: UndoRedoToolbar.themeableIds.CloseButtonHover,
            ApplyTheme: (theme) => {
                ApplyCssToStyle(
                    `${this.id}-close-button-hover`,
                    [`#${this.id} .close-container:hover`],
                    [theme.ToCss()]
                )
            }
        },
        {
            id: UndoRedoToolbar.themeableIds.CloseButtonXHover,
            ApplyTheme: (theme) => {
                ApplyCssToStyle(
                    `${this.id}-close-button-x-hover`,
                    [`#${this.id} .close-container:hover .close-container:hover .close`],
                    [theme.ToCss()]
                )
            }
        },
    ];

    static currId = 0;
    id;

    constructor($container){
        this.id = 'undo-toolbar' + UndoRedoToolbar.currId++;

        this.$container = $container;
        this.Render();
    }

    static CreateThemeStructure(){
        let theme = {};

        for (let themable of UndoRedoToolbar.themeables){
            theme[themable.id] = {};

            for (let prop of themable.themeable.props)
                theme[themable.id][prop] = '';
        }

        return theme;
    }

    ApplyTheme(themes){
        this.customizableViews.forEach((view) => {
            let theme = themes[view.id];
            if (!theme) return;
            
            (view.ApplyTheme) ? view.ApplyTheme(theme): view.GetView().css(theme.ToCss());
        });
    }

    SetUndoDescription(text){
        this.$view.find('.undo-segment .action-text').text(text);
    }
    
    SetRedoDescription(text){
        this.$view.find('.redo-segment .action-text').text(text);
    }

    SetUndoNumber(i){
        this.$view.find('.undo-segment .actions-left').text(i);
    }

    SetRedoNumber(i){
        this.$view.find('.redo-segment .actions-left').text(i);
    }

    CreateIcon(){
        let $iconContainer = $('<div/>').addClass('icon-container');
     
        let $icon = $('<div/>').addClass('icon');
        let $actionsLeft = $('<div/>').addClass('actions-left').text(0);
        
        $iconContainer.append($icon, $actionsLeft);
        
        return $iconContainer;
    }

    Render(){
        this.$view = $('<div/>').addClass('undo-redo-toolbar-container').attr('id', this.id);
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
        this.onHide();
    }

    Show(){
        this.$view.fadeIn(400, () => this.onShow());
    }

    Toggle(){
        $view.is(":visible") ? this.Hide() : this.Show();
    }

    SetOnShow(f){
        this.onShow = f;
    }

    SetOnHide(f){
        this.onHide = f;
    }
}