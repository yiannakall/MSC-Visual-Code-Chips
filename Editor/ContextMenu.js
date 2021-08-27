import { assert } from '../Utils/Assert.js'
import { Themeable, ThemeableProps } from './Theme.js';

export class ContextMenu {
    options;

    $contextMenu;
    
    $openInnerMenu;

    $previouslyFocused;

    static themeableIds = {
        OptionContainer: 'Option Container',
        Option: 'Option',
        OptionOnHover: 'Option On Hover',
        OptionText: 'Option Text',
        OptionTextOnHover: 'Option Text On Hover',
        ShortcutText: 'Shortcut text',
        ShortcutTextOnHover: 'Shortcut text On Hover',
        InnerOptionArrow: 'Inner Option Arrow',
        InnerOptionOnHover: 'Inner Option Arrow On Hover',
        Separator: 'Separator',
    };

    static themeables = [
        {
            id: ContextMenu.themeableIds.OptionContainer,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.BorderWidth,
                ThemeableProps.Props.BorderColor,
                ThemeableProps.Props.BorderRadius,
                ThemeableProps.Props.PaddingLeft,
                ThemeableProps.Props.PaddingRight,
                ThemeableProps.Props.PaddingTop,
                ThemeableProps.Props.PaddingBottom,
            ),
        },
        {
            id: ContextMenu.themeableIds.Option,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
                ThemeableProps.Props.PaddingLeft,
                ThemeableProps.Props.PaddingRight,
                ThemeableProps.Props.PaddingTop,
                ThemeableProps.Props.PaddingBottom,
            ),
        },
        {
            id: ContextMenu.themeableIds.OptionOnHover,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
            ),
        },
        {
            id: ContextMenu.themeableIds.OptionText,
            themeable: new Themeable(
                ThemeableProps.Props.FontColor,
            ),
        },
        {
            id: ContextMenu.themeableIds.OptionTextOnHover,
            themeable: new Themeable(
                ThemeableProps.Props.FontColor,
            ),
        },
        {
            id: ContextMenu.themeableIds.ShortcutText,
            themeable: new Themeable(
                ThemeableProps.Props.FontColor,
            ),
        },
        {
            id: ContextMenu.themeableIds.ShortcutTextOnHover,
            themeable: new Themeable(
                ThemeableProps.Props.FontColor,
            ),
        },
        {
            id: ContextMenu.themeableIds.InnerOptionArrow,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
            ),
        },
        {
            id: ContextMenu.themeableIds.InnerOptionOnHover,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
            ),
        },
        {
            id: ContextMenu.themeableIds.Separator,
            themeable: new Themeable(
                ThemeableProps.Props.BackgroundColor,
            ),
        },
    ];

    customizableViews = [
        {
            id: ContextMenu.themeableIds.OptionContainer,
            GetView: () => { return this.$contextMenu.add(this.$contextMenu.find('.context-menu')); }
        },
        {
            id: ContextMenu.themeableIds.Option,
            GetView: () => { return this.$contextMenu.find('.option'); }
        },
        {
            id: ContextMenu.themeableIds.OptionOnHover,
            ApplyTheme: (theme) => {
                let $optionContainer = this.$contextMenu.find('*:not(.option-with-arrow) > .option:not(.disabled)')
                                .add( this.$contextMenu.find('.option-with-arrow:not(.disabled)') );

                let hoverBg = theme.Get(ThemeableProps.Props.BackgroundColor);
                let prevBg;

                $optionContainer.on('mouseenter', function () {
                    let $option = $(this).hasClass('option') ? $(this) : $(this).children('.option');

                    if (!prevBg)
                        prevBg = $option.css('background-color');
                
                    if (hoverBg)
                        $option.css('background-color', hoverBg);
                });

                $optionContainer.on('mouseleave', function () {
                    let $option = $(this).hasClass('option') ? $(this) : $(this).children('.option');

                    if (prevBg && hoverBg)
                        $option.css('background-color', prevBg);
                });
            }
        },
        {
            id: ContextMenu.themeableIds.OptionText,
            GetView: () => { return this.$contextMenu.find('.option .label'); }
        },
        {
            id: ContextMenu.themeableIds.OptionTextOnHover,
            ApplyTheme: (theme) => {
                let $option = this.$contextMenu.find('*:not(.option-with-arrow) > .option:not(.disabled)')
                                .add( this.$contextMenu.find('.option-with-arrow:not(.disabled)') );

                let hoverFontColor = theme.Get(ThemeableProps.Props.FontColor);
                let prevFontColor;

                $option.on('mouseenter', function () {
                    let $label = $(this).children('.label').add( $(this).children().children('.label') );

                    if (!prevFontColor)
                        prevFontColor = $label.css('color');
                
                    if (hoverFontColor)
                        $label.css('color', hoverFontColor);
                });

                $option.on('mouseleave', function () {
                    let $label = $(this).children('.label').add( $(this).children().children('.label') );

                    if (prevFontColor && hoverFontColor)
                        $label.css('color', prevFontColor);
                });
            }
        },
        {
            id: ContextMenu.themeableIds.ShortcutText,
            GetView: () => { return this.$contextMenu.find('.option .shortcut'); }
        },
        {
            id: ContextMenu.themeableIds.ShortcutTextOnHover,
            ApplyTheme: (theme) => {
                let $option = this.$contextMenu.find('*:not(.option-with-arrow) > .option:not(.disabled)')
                                .add( this.$contextMenu.find('.option-with-arrow:not(.disabled)') );

                let hoverFontColor = theme.Get(ThemeableProps.Props.FontColor);
                let prevFontColor;

                $option.on('mouseenter', function () {
                    let $shortcut = $(this).children('.shortcut').add( $(this).children().children('.shortcut') );

                    if (!prevFontColor)
                        prevFontColor = $shortcut.css('color');
                
                    if (hoverFontColor)
                        $shortcut.css('color', hoverFontColor);
                });

                $option.on('mouseleave', function () {
                    let $shortcut = $(this).children('.shortcut').add( $(this).children().children('.shortcut') );

                    if (prevFontColor && hoverFontColor)
                        $shortcut.css('color', prevFontColor);
                });
            }
        },
        {
            id: ContextMenu.themeableIds.InnerOptionArrow,
            GetView: () => { return this.$contextMenu.find('.arrow'); }
        },
        {
            id: ContextMenu.themeableIds.InnerOptionOnHover,
            ApplyTheme: (theme) => {
                let $option = this.$contextMenu.find('.option-with-arrow:not(.disabled)');

                let hoverBgColor = theme.Get(ThemeableProps.Props.BackgroundColor);
                let prevBgColor;

                $option.on('mouseover', function () {
                    let $arrow = $(this).children('.arrow');

                    if (!prevBgColor)
                        prevBgColor = $arrow.css('background-color');
                
                    if (hoverBgColor)
                        $arrow.css('background-color', hoverBgColor);
                });

                $option.on('mouseleave', function () {
                    let $arrow = $(this).children('.arrow');

                    if (prevBgColor && hoverBgColor)
                        $arrow.css('background-color', prevBgColor);
                });
            }
        },
        {
            id: ContextMenu.themeableIds.Separator,
            GetView: () => { return this.$contextMenu.find('.separator'); }
        },
    ];

    static CreateThemeStructure(){
        let theme = {};

        for (let themable of ContextMenu.themeables){
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

    constructor($container, options){
        this.options = options;
        this.$container = $container;
    }

    Render(){
        this.$previouslyFocused = $(document.activeElement);
        
        this.$contextMenu = this.CreateContextMenu_(this.options);
        this.$container.append( this.$contextMenu );
        
        this.$contextMenu.focus();
        
        return this.$contextMenu;
    }

    CreateContextMenu_(categories){
        let $contextMenu = $('<div/>').addClass('context-menu').attr('tabIndex', 0);
    
        for (let i = 0; i < categories.length; i++){
            let category = categories[i];

            if (i != 0){
                let $separator = $('<div/>').addClass('separator');
                $contextMenu.append($separator);
            }

            $contextMenu.append( this.CreateCategory_(category) );
        }

        return $contextMenu;
    }

    CreateCategory_(options){
        let $category = $('<div/>').addClass('category');

        for (let option of options){
            $category.append( this.CreateOption_(option) )
        }

        return $category;
    }

    /**
     * 
     * @param {{name, handler, shortcut?, disabled?, needsFile?} | {name, options, disabled?}} option 
     */
    CreateOption_(option){
        let {name, shortcut, handler, options, disabled, needsFile} = option;
        assert(name && handler || name && options && !handler && !shortcut && !needsFile);

        let $option = $('<div/>').addClass('option');
        
        $option.append( $('<div/>').addClass('label').text(name) );
        
        if (shortcut)
            $option.append( $('<div/>').addClass('shortcut').text(shortcut) );
        
        $option.on('click', (e) => e.stopPropagation())

        if (disabled)
            $option.addClass('disabled');
        else {

            if (needsFile && handler){
                let $input = $('<input>').attr('type', 'file'), $label = $('<label/>');
                $option.append( $label.append($input) );

                $input.on('change', () => {
                    handler($input[0].files);
                    this.Destroy();
                });
            }
            
            if (!needsFile && handler){
                $option.on('click', () => {
                    handler();
                    this.Destroy();
                });
            }
        }

        if (options){
            $option = $('<div/>').addClass('option-with-arrow').append($option);
            $option.append( $('<div/>').addClass('arrow') );

            if (disabled){
                $option.addClass('disabled');
            }else{
                let $contextMenu = this.CreateContextMenu_(options);

                $contextMenu.addClass('inner');
                $contextMenu.hide();

                $option.on('mouseover', () => this.ShowInnerMenu_($contextMenu) );

                $option.append($contextMenu);
            }
        }else
            $option.on('mouseover', () => this.ClearInnerMenu_());

        return $option;
    }

    ShowInnerMenu_($innerMenu){
        this.ClearInnerMenu_();
        this.$openInnerMenu = $innerMenu;
        $innerMenu?.show();
    }

    ClearInnerMenu_(){
        this.$openInnerMenu?.hide();
        this.$openInnerMenu = undefined;
    }

    Destroy(){
        this.$contextMenu?.remove();
        this.$contextMenu = undefined;
        this.$openInnerMenu = undefined;

        this.$previouslyFocused.focus();
        this.$previouslyFocused = undefined;
    }

}