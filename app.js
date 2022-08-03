import { config as codeChipsConfig } from './config.js'
import { CodeChips } from './CodeChips.js'
import { config as javaClassesConfig } from './javaClassDef.js'

import { MyJavascriptVisitor } from './Generators/MyJavascriptVisitor.js';
import { AstHost } from './Generators/AstHost.js';

var popupNum = 1;
$(document).ready(function () {

    $.fn.textWidth = function (text, font) {
        if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
        var htmlText = text || this.val() || this.text();
        htmlText = $.fn.textWidth.fakeEl.text(htmlText).html(); //encode to Html
        htmlText = htmlText.replace(/\s/g, "&nbsp;"); //replace trailing and leading spaces
        $.fn.textWidth.fakeEl.html(htmlText).css('font', font || this.css('font'));
        return $.fn.textWidth.fakeEl.width();
    };

    let editors = {
        'Code Chips': CodeChips.Inject(
            $('#injection-div2'),
            {
                languageJson: codeChipsConfig.language,
                themeJson: codeChipsConfig.darkColorfulTheme,
                toolboxJson: codeChipsConfig.toolbox,
                quickReplace: codeChipsConfig.quickReplace
            }
        ),
        'Java Classes': CodeChips.Inject(
            $('#injection-div1'),
            {
                languageJson: javaClassesConfig.language,
                themeJson: javaClassesConfig.darkTheme,
                toolboxJson: javaClassesConfig.toolbox,
                quickReplace: javaClassesConfig.quickReplace
            }
        ),
    };


    function popup() {
        var elem = document.createElement('div');
        elem.style.cssText = 'overflow: auto; border-radius: 25px; position: absolute; width:400px; height:200px; left: 50%; top: 50%; padding: 10px; background-color:rgb(221, 219, 219); text-align: justify; font-size:12px;';
        elem.tabIndex = '0';
        elem.id = 'PopUp' + popupNum;

        var h = document.createElement('h1');
        h.style.cssText = 'font-family:Roboto; top: 0px; text-align:center';
        h.innerHTML = 'Output ' +popupNum;

        var butt = document.createElement('button');
        butt.style.cssText = 'border-radius:5px; position:absolute; top:28px; right:10px';
        butt.type = "button";
        butt.id = popupNum;
        butt.onclick = function(){ $('#'+'PopUp' + butt.id).hide();}
        
        var im = document.createElement('img');
        im.style.height = "10px";
        im.src = "/Images/Crystal_button_cancel.svg.png";
        im.style.filter= "grayscale(100%)"
        butt.appendChild(im)
        
        var run = document.createElement('span')
        run.style.cssText = 'font-family:Roboto; font-size:17px;'
        run.innerHTML = "Program is running..<br>"

        var text = document.createElement('span')
        text.style.cssText = 'font-family:Roboto; font-size:15px;'
        text.id = 'PopUpText' + popupNum;

        var isMouseDown,initX,initY,height = elem.offsetHeight,width = elem.offsetWidth;

        elem.addEventListener('mousedown', function(e) {
            isMouseDown = true;
            document.body.classList.add('no-select');
            initX = e.offsetX;
            initY = e.offsetY;
        })

        document.addEventListener('mousemove', function(e) {
            if (isMouseDown) {
                var cx = e.clientX - initX,
                    cy = e.clientY - initY;
                if (cx < 0) { cx = 0;}
                if (cy < 0) { cy = 0; }
                if (window.innerWidth - e.clientX + initX < width) { cx = window.innerWidth - width;}
                if (e.clientY > window.innerHeight - height+ initY) {cy = window.innerHeight - height;}
                elem.style.left = cx + 'px';
                elem.style.top = cy + 'px';
            }
        })

        elem.addEventListener('mouseup', function() {
            isMouseDown = false;
            document.body.classList.remove('no-select');
        })

        elem.appendChild(h);
        elem.appendChild(butt);
        elem.appendChild(run);
        elem.appendChild(text);
        document.body.appendChild(elem);
        popupNum++;
    }

    function output(args) {
        var pName = 'PopUpText' + (popupNum-1)
        var prev = $('#'+pName).html()
        var content = prev + '<br>'+ args;
        $('#'+pName).html(content)
    }
    
    let toJs = (code) => {
        let visitor = new MyJavascriptVisitor(popupNum);
        let host = new AstHost(visitor);

        host.Accept(code);

        return visitor.GetResult();
    };

    editors['Code Chips'].SetOnExecute(code => { popup(); eval(toJs(code)); });
    editors['Code Chips'].SetOnConvertToJs(code => toJs(code));

    let themes = {
        'Code Chips': {
            'Dark Colorful Theme': codeChipsConfig.darkColorfulTheme,
            'Light Colorful Theme': codeChipsConfig.colorfulTheme,
            'Dark Theme': codeChipsConfig.darkTheme,
            'Light Theme': codeChipsConfig.lightTheme
        },
        'Java Classes': {
            'Dark Theme': javaClassesConfig.darkTheme,
            'Light Theme': javaClassesConfig.lightTheme
        }
    };

    let selectedThemes = {
        'Code Chips': 'Dark Colorful Theme',
        'Java Classes': 'Dark Theme'
    };

    let curr = 'Code Chips';

    for (let theme in themes[curr])
        $('#theme-selection').append(`<option value="${theme}"> ${theme} </option>`);

    editors['Java Classes'].$container.toggle();

    $('#language-selection').on('change', function () {
        editors[curr].$container.toggle();
        curr = this.value;
        editors[curr].$container.toggle();

        $('#theme-selection').empty();

        for (let theme in themes[curr])
            $('#theme-selection').append(`<option value="${theme}"> ${theme} </option>`);

        $('#theme-selection').val(selectedThemes[curr]);
    });

    $('#theme-selection').on('change', function () {
        editors[curr].SetTheme(themes[curr][this.value]);
        editors[curr].ApplyTheme();
        selectedThemes[curr] = this.value;
    });

});