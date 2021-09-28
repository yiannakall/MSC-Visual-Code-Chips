export class PopupWindow {

    $container;
    $popup;
    $content;
    
    title;

    onClose;

    constructor($container, title){
        this.$container = $container;
        this.title = title;
    }

    // subclass may override

        Render_() {};

    //

    Render(){
        this.$content = $('<div/>').addClass('content')
        
        this.$popup = $('<div/>').addClass('popup-window');
        this.$popup.append( this.CreateHeaderBar_() );
        this.$popup.append(this.$content);
        
        this.$container.append(this.$popup);

        this.$popup.on('contextmenu', e => {
            e.stopPropagation();
        });

        this.Render_();
    }

    CreateHeaderBar_(){
        let $headerBar = $('<div/>').addClass('header-bar');
        let $title = $('<div/>').addClass('title').text(this.title);
        let $buttons = $('<div/>').addClass('buttons');
        
        $headerBar.append($title, $buttons);

        let $xButton = this.CreateHeaderButton_( 'close', () => {
            this.Destroy();
            
            if (this.onClose)
                this.onClose();
        });

        $buttons.append($xButton);

        return $headerBar;
    }

    CreateHeaderButton_(imgClass, action){
        let $button = $('<div/>').addClass('button');
        let $buttonIcon = $('<div/>').addClass('button-icon');

        $buttonIcon.addClass(imgClass);

        $button.append($buttonIcon);
        
        if (action)
            $button.on('click', action);
        
        return $button;
    }

    Destroy(){
        this.$popup?.remove();
        this.$popup = undefined;
    }

    SetOnClose(f){
        this.onClose = f;
    }

};