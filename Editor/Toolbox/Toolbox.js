import { assert } from "../../Utils/Utils.js";
import { EditorElement } from "../EditorElements/EditorElement.js";
import { MenuCategory } from "./MenuCategory.js";

export class Toolbox {
    categories = [];
    blocks = {};

    selectedCategory;

    $container;
    $toolboxMenu;
    $blockContainer;

    /**
     * 
     * @param {[{name: string, icon: string, blocks: [EditorElement]}]} categories 
     */
    constructor($container, categories) {
        assert($container);

        if (categories){
            for (let category of categories){
                this.categories.push(new MenuCategory(category.name, category.icon, '#A5A5A5'))
                this.blocks[category.name] = category.blocks;
            }
        }

        this.$container = $container;
        this.InitializeView_();
    }
    
    InitializeView_(){
        this.$toolboxMenu = $('<div/>').addClass('toolbox-menu');
        this.$blockContainer = $('<div/>').addClass('block-container');
        this.$container.append(this.$toolboxMenu);
        this.$container.append(this.$blockContainer);
    }

    RenderToolboxMenu(){
        for (let category of this.categories) {
            let $categoryContainer = $('<div/>').addClass('category-container');
            category.Render($categoryContainer);

            this.$toolboxMenu.append($categoryContainer);

            category.GetView().on('click', () => {
                this.Select_(category);
                //TODO show blocks based on category.GetName();
            });
        }
    }

    Render() {
        this.RenderToolboxMenu();
    }

    Select_(category){
        this.selected?.SetColor('#A5A5A5');
        this.selected?.GetView()?.siblings().remove('.selected-line');
        
        category?.SetColor('#FAFAFA');
        category?.GetView()?.parent().append($('<div/>').addClass('selected-line'));

        this.selected = category;
    }

}