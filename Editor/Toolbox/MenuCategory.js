export class MenuCategory {
    
    text;
    icon;
    color;

    $view;
    $text;
    $icon;
    $color;

    constructor(text, icon, color){
        this.text = text;
        this.icon = icon;
        this.color = color;
    }

    Render($container){
        this.$icon = $('<div/>').addClass('icon');

        if (this.icon.includes('.svg')){
            this.$icon.css({
                '-webkit-mask-image':   `url(${this.icon})`,
                'mask-image':           `url(${this.icon})`,
                'background-color':     this.color,
            });
        }else{
            this.$icon.css({
                'background-image':     `url(${this.icon})`,
            });
        }

        this.$text = $('<div/>').addClass('text').html(this.text).css('color', this.color);

        this.$view = $('<div/>').addClass('menu-category');
        this.$view.append(this.$text).append(this.$icon).append(this.$text);

        $container.append(this.$view);
    }

    SetColor(color){
        this.color = color;
        this.$icon?.css('background-color', this.color);
        this.$text?.css('color', this.color);
    }

    GetView(){
        return this.$view;
    }

    GetText(){
        return this.text;
    }

    GetColor(){
        return this.color;
    }

    GetIcon(){
        return this.icon;
    }
}