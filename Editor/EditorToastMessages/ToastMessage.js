import { assert } from "../../Utils/Assert.js";

export class ToastMessage {

    static Types = {
        Information: 'information',
        Warning: 'warning',
        Error: 'error',
    };

    $container;
    title;
    type;
    explanation;
    buttons;
    
    onClose = () => {};

    $view;

    /**
     * 
     * @param {{type: string, title: string, explanation: string, buttons: [{name: string, handler: () => void}]}} param1 
     */
    constructor({type, title, explanation, buttons}){
        assert(type === ToastMessage.Types.Information || type === ToastMessage.Types.Warning || type === ToastMessage.Types.Error);
        this.type = type;
        this.title = title;
        this.explanation = explanation;
        this.buttons = buttons;
    }

    Render($container){
        assert(!this.$container);
        this.$container = $container;

        let $toastMessage = $('<div/>').addClass('toast-message-container');

        let $titleBar = $('<div/>').addClass('title-bar');
        
        let $title = $('<div/>').addClass('title');
        let $icon = $('<div/>').addClass('icon').addClass(this.type);
        let $text = $('<div/>').addClass('text').text(this.title || '');
    
        let $closeContainer = $('<div/>').addClass('close-container').on( 'click', () => {
            this.onClose();
            this.Destroy();
        });

        let $close = $('<div/>').addClass('icon').addClass('close');
    
        let $content = $('<div/>').addClass('content');
        let $explanation = $('<div/>').addClass('explanation').text(this.explanation || '');
        let $buttons = this.CreateButtons_(this.buttons);

        this.$container.append(
            $toastMessage.append(
                $titleBar.append(
                    $title.append( $icon, $text ),
                    $closeContainer.append( $close )
                ),
                $content.append( $explanation, $buttons )
            ).hide()
        );

        $toastMessage.fadeIn();

        this.$view = $toastMessage;

        return this.$toastMessage;
    }

    CreateButtons_(buttons){
        let $buttons = $('<div/>').addClass('buttons');
        for (let button of buttons)
            $buttons.append(
                $('<div/>')
                    .addClass('button')
                    .text(button.name)
                    .on( 'click', () => button.handler(this) ) 
            );
        return $buttons;
    }

    Destroy(){
        this.$view?.remove();
        this.$view = undefined;
    }

    SetOnClose(f){
        this.onClose = f;
    }
}