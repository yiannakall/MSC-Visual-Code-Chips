import { assert } from "./Assert.js";

export class ContainerResizer {

    $container;
    getContainerMinWidth;
    getContainerMinWidth;

    alreadyResizable = false;

    constructor($container, getContainerMaxWidth, getContainerMinWidth){
        this.$container = $container;
        this.getContainerMinWidth = getContainerMinWidth;
        this.getContainerMaxWidth = getContainerMaxWidth;
    }

    MakeResizable(){
        if (this.alreadyResizable){
            assert(false);
            return;
        }

        this.alreadyResizable = true;

        this.$container.css('position', 'relative');

        let $handler = $('<div/>');
        $handler.css({
            'background-color': 'transparent',
            'width': '8px',
            'height': '100%',
            'position': 'absolute',
            'top': '0',
            'right': '-4px',
            'display': 'flex',
            'justify-content': 'center',
            'cursor': 'ew-resize'
        });

        let $handlerLine = $('<div/>');
        $handlerLine.css({
            'background-color': '#007ACC',
            'width': '100%',
            'height': '100%',
            'display': 'none'
        });

        let dragging;

        $handler.on('mouseenter', () => {
            $handlerLine.fadeIn('fast');
        });

        $handler.on('mouseleave', () => {
            if (!dragging)
                $handlerLine.hide();
        });
        
        let mouseDown = (e) => {
            e.preventDefault();
            dragging = true;
            $('body').on('mousemove', onMouseMove);
            $('body').on('mouseup', onMouseUp);
        };

        let restrictWidth = (newWidth) => {
            let max = this.getContainerMaxWidth ? this.getContainerMaxWidth() : Number.POSITIVE_INFINITY;
            let min = this.getContainerMinWidth ? this.getContainerMinWidth() : Number.NEGATIVE_INFINITY;

            let restrictedWidth = newWidth > max ? max : newWidth < min ? min : newWidth; 
            return restrictedWidth;
        }

        let onMouseMove = (e) => {
            let mousePointX = e.pageX;
            let containerEndX = this.$container.offset().left + this.$container.width();

            let newWidth = restrictWidth(this.$container.width() + (mousePointX - containerEndX));
            this.$container.css('width', newWidth + 'px');
        }

        let onMouseUp = (e) => {
            dragging = false;
            $handlerLine.hide();
            $('body').off('mousemove', onMouseMove);
            $('body').off('mouseup', onMouseUp);
        };

        $handler.on('mousedown', mouseDown);

        $handler.append($handlerLine);
        this.$container.append($handler);

        $(window).resize(() => {
            let newWidth = restrictWidth(this.$container.width());
            this.$container.css('width', newWidth + 'px');
        });
    }

    SetMaxWidth(f){
        this.getContainerMaxWidth = f;
    }

    SetMinWidth(f){
        this.getContainerMinWidth = f;
    }

};