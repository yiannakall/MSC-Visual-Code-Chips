import { ContextMenu } from "./ContextMenu.js";
import { Theme } from "./Theme.js";

export class EditorToolbar {

    $contextMenus;
    $buttonCategories;

    buttonCategories = [];

    buttons = {};
    disabledButtons = {};

    currContextMenu;
    $selectedTitle;

    theme = {
        "Option Container": new Theme({
            "BackgroundColor": "#252526",
            "BorderWidth": "0px",
            "BorderColor": "transparent",
            "BorderRadius": "0px",
            "PaddingLeft": "0px",
            "PaddingRight": "0px",
            "PaddingTop": "5px",
            "PaddingBottom": "5px"
        }),
        "Option": new Theme({
            "BackgroundColor": "transparent",
            "PaddingLeft": "20px",
            "PaddingRight": "20px",
            "PaddingTop": "5px",
            "PaddingBottom": "5px"
        }),
        "Option On Hover":              new Theme({ "BackgroundColor": "#094771" }),
        "Option Text":                  new Theme({ "FontColor": "#d1d1d1" }),
        "Option Text On Hover":         new Theme({ "FontColor": "#ffffff" }),
        "Shortcut text":                new Theme({ "FontColor": "#a1a1a1" }),
        "Shortcut text On Hover":       new Theme({ "FontColor": "#ffffff" }),
        "Inner Option Arrow":           new Theme({ "BackgroundColor": "#a1a1a1" }),
        "Inner Option Arrow On Hover":  new Theme({ "BackgroundColor": "#ffffff" }),
        "Separator":                    new Theme({ "BackgroundColor": "#303031" })
    };

    constructor($container){
        let $toolbar = $('<div/>').addClass('editor-toolbar');
        let $title = $('<div/>').addClass('editor-toolbar-title').text('CodeChips');
        
        this.$contextMenus = $('<div/>').addClass('editor-toolbar-context-menus');
        this.$buttonCategories = $('<div/>').addClass('editor-toolbar-buttons');

        $toolbar.append($title, this.$contextMenus, this.$buttonCategories);

        $container.append($toolbar);
    }

    AddContextMenu(title, contextMenu){
        let $contextMenuButton = $('<div/>').addClass('context-menu-button');
        let $title = $('<div/>').addClass('title').text(title);
        let $contextMenuContainer = $('<div/>').addClass('context-menu-container');

        $contextMenuButton.append($title, $contextMenuContainer);

        $contextMenuButton.click(() => {
            if (this.$selectedTitle !== $title){
                this.CloseCurrentContextMenu();

                this.currContextMenu = new ContextMenu($contextMenuContainer, contextMenu);
                
                this.currContextMenu.SetOnDestroy(() => {
                    this.$selectedTitle?.removeClass('selected-title');
                    this.$selectedTitle = undefined;
                });

                this.currContextMenu.Render();

                this.currContextMenu.ApplyTheme(this.theme);
    
                $title.addClass('selected-title');
                this.$selectedTitle = $title;
            }else
                this.CloseCurrentContextMenu();
        });

        this.$contextMenus.append($contextMenuButton);
    }

    AddButtonCategory(buttons, highlightSelected){
        if (this.buttonCategories.length){
            this.$buttonCategories.append($('<div/>').addClass('separator'));
        }

        let $category = $('<div/>').addClass('editor-toolbar-button-category');
        this.$buttonCategories.append($category);

        for(let button of buttons){
            let handler = ($button) => {
                if (this.disabledButtons[button.class]) return;

                if (highlightSelected){
                    $category.children('.selected-button').removeClass('selected-button');
                    $button.addClass('selected-button');
                }
                
                button.handler();
            };

            this.AddToolbarButton($category, button.class, button.tooltip, handler, button.selected);
        }

        this.buttonCategories.push(buttons);
    }

    AddToolbarButton($category, buttonClass, tooltip, handler, selected){
        let $button = $('<div/>').addClass('button').addClass();
        let $icon = $('<div/>').addClass('icon').addClass(buttonClass);

        if (tooltip)
            $button.attr('title', tooltip);

        if (selected)
            $button.addClass('selected-button')

        $button.append($icon);

        $button.click( () => handler($button) );

        $category.append($button);

        this.buttons[buttonClass] = $button;
    }

    DisableButton(buttonClass){
        this.buttons[buttonClass].addClass('disabled-button');
        this.disabledButtons[buttonClass] = true;
    }

    EnableButton(buttonClass){
        this.buttons[buttonClass].removeClass('disabled-button');
        this.disabledButtons[buttonClass] = false;
    }

    CloseCurrentContextMenu(){
        this.currContextMenu?.Destroy();
        this.currContextMenu = undefined;

        this.$selectedTitle?.removeClass('selected-title');
        this.$selectedTitle = undefined;
    }
};