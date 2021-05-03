import { config } from './Config.js'
import { CodeChips } from './CodeChips.js'
import { MenuCategory } from './Editor/Toolbox/MenuCategory.js';
import { Toolbox } from './Editor/Toolbox/Toolbox.js';

$(document).ready(function () {

    $.fn.textWidth = function(text, font) {
        if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
        var htmlText = text || this.val() || this.text();
        htmlText = $.fn.textWidth.fakeEl.text(htmlText).html(); //encode to Html
        htmlText = htmlText.replace(/\s/g, "&nbsp;"); //replace trailing and leading spaces
        $.fn.textWidth.fakeEl.html(htmlText).css('font', font || this.css('font'));
        return $.fn.textWidth.fakeEl.width();
    };

    {
        // temporary code for simulating toolbox blocks until blocks can be written into and loaded from JSON form
        let Rect = function (){
            this.RandomInt = (min, max) => {
                return Math.floor(Math.random() * (max - min) ) + min;
            }
            this.Render = ($continaer) => {
                let $div = $('<div > </div>').css({
                    'background-color': 
                        `rgb( ${this.RandomInt(0,255)}, ${this.RandomInt(0,255)}, ${this.RandomInt(0,255)} )`,
                    'width': '200px',
                    'height': '100px',
                });
                $continaer.append($div)
                this.$view = $div;
            }
            this.GetWholeView = () => {
                return this.$view;
            }
        }
    
        for (let toolboxInfo of config.toolbox) {
            let n = 5;
            for (let i = 0; i < n; i++)
                toolboxInfo.blocks.push(new Rect());
        }
    }

    CodeChips.Inject(
        $('#injection-div'), 
        {
            languageJson: config.language,
            stylesJson: config.styles,
            toolboxJson: config.toolbox
        }
    );
});