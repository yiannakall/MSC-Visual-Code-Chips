import { assert } from '../Utils/Assert.js'

export class ContextMenu {
    options;

    $contextMenu;
    
    $openInnerMenu;

    constructor($container, options){
        this.options = options;
        this.$container = $container;
    }

    Render(){
        this.$contextMenu = this.CreateContextMenu_(this.options);
        this.$container.append( this.$contextMenu );
        
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
            
            if (options){
                $option = $('<div/>').addClass('option-with-arrow').append($option);
                $option.append( $('<div/>').addClass('arrow') );
    
                let $contextMenu = this.CreateContextMenu_(options);
    
                $contextMenu.addClass('inner');
                $contextMenu.hide();
    
                $option.on('mouseover', () => this.ShowInnerMenu_($contextMenu) );
    
                $option.append($contextMenu);
            }else
                $option.on('mouseover', () => this.ClearInnerMenu_());

        }

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
    }

}