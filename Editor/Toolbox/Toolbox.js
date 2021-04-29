import { assert } from "../../Utils/Utils.js";
import { EditorElement } from "../EditorElements/EditorElement.js";
import { MenuCategory } from "./MenuCategory.js";

export class Toolbox {
    categories = {};
    blocks = {};
    $scrollTargets = {};

    selectedCategory;

    $container;
    $toolbox;
    $toolboxMenu;
    $blockContainer;

    autoScrolling = false;

    /**
     * 
     * @param {[{name: string, icon: string, blocks: [EditorElement]}]} categories 
     */
    constructor($container, categories) {
        assert($container);

        if (categories){
            for (let category of categories){
                this.categories[category.name] = (new MenuCategory(category.name, category.icon, '#A5A5A5'));
                this.blocks[category.name] = category.blocks;
            }
        }

        this.$container = $container;
        this.InitializeView_();

        this.$blockContainer.on('scroll', () => {
            if (!this.autoScrolling){
                let scrollTop = this.$blockContainer.scrollTop();
                let offsetTop = this.$blockContainer.offset().top;
                
                let closestCategory, min;
                for (let category in this.$scrollTargets){
                    let categoryY = this.$scrollTargets[category].offset().top + scrollTop - offsetTop - 20;
                    let offset = Math.ceil(scrollTop - categoryY);
                    if (min === undefined || (offset >= 0 && offset < min)){
                        closestCategory = category;
                        min = offset;
                    }
                }
                this.Select_(this.categories[closestCategory]);
            }
        });
    }
    
    InitializeView_(){
        this.$toolbox = $('<div/>').addClass('toolbox');
        this.$toolboxMenu = $('<div/>').addClass('toolbox-menu');
        this.$blockContainer = $('<div/>').addClass('toolbox-blocks');

        this.$toolbox.append(this.$toolboxMenu);
        this.$toolbox.append(this.$blockContainer);
        this.$container.append(this.$toolbox);
    }

    RenderToolboxMenu(){
        for (let categoryName in this.categories) {
            let category = this.categories[categoryName];

            let $categoryContainer = $('<div/>').addClass('category-container');
            category.Render($categoryContainer);

            this.$toolboxMenu.append($categoryContainer);

            category.GetView().on('click', () => {
                this.Select_(category);
                this.autoScrolling = true;
                this.$blockContainer.animate(
                    {
                        scrollTop: this.$scrollTargets[categoryName].offset().top 
                                    + this.$blockContainer.scrollTop() 
                                    - this.$blockContainer.offset().top
                                    - 20
                    }, 
                    400, 
                    () => {
                        this.autoScrolling = false;
                    }
                )
            });
        }
    }

    RenderBlocks(){
        for (let category in this.blocks){
            let $wholeCategory = $('<div/>').addClass('category');
            let $scrollTarget = $('<div/>').html(category).addClass('category-name');
            let $categoryBlocks = $('<div/>').addClass('category-blocks');
                        
            let blocks = this.blocks[category];
            for (let b of blocks){
                b.Render($categoryBlocks);
            }

            $wholeCategory.append($scrollTarget, $categoryBlocks);
            this.$blockContainer.append($wholeCategory);

            this.$scrollTargets[category] = $scrollTarget;
        }
    }

    Render() {
        this.RenderToolboxMenu();
        this.RenderBlocks();
    }

    Select_(category){
        this.selected?.SetColor('#A5A5A5');
        this.selected?.GetView()?.siblings().remove('.selected-line');
        
        category?.SetColor('#FAFAFA');
        category?.GetView()?.parent().append($('<div/>').addClass('selected-line'));

        this.selected = category;
    }

}