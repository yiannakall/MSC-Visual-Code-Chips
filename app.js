import { config } from './Config.js'
import { CodeChips } from './CodeChips.js'

$(document).ready(function () {

    $.fn.textWidth = function(text, font) {
        if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
        var htmlText = text || this.val() || this.text();
        htmlText = $.fn.textWidth.fakeEl.text(htmlText).html(); //encode to Html
        htmlText = htmlText.replace(/\s/g, "&nbsp;"); //replace trailing and leading spaces
        $.fn.textWidth.fakeEl.html(htmlText).css('font', font || this.css('font'));
        return $.fn.textWidth.fakeEl.width();
    };

    CodeChips.Inject(
        $('#injection-div'), 
        {
            languageJson: config.language,
            themeJson: config.theme,
            toolboxJson: config.toolbox
        }
    );
});