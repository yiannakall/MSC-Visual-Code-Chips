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

    function turtle_canvas(){

        if(document.querySelector('#wrap')==null){
            $(document.body).append('<div id="wrap" style="position:absolute; width:fit-content; left: 70%; top: 50%;margin:0 auto; border-radius:25px; border:solid 1px rgb(221, 219, 219)"> <h1 style="font-family:Roboto; text-align:center; color:white">JavaScript Turtle</h1> <div id="midcolumn" style="left:0%; width:35%;"><button id="resetButton" style="font-family:Roboto;">Reset</button><br><br><canvas id="turtlecanvas" width="400" height="300" style="border-radius:25px; background:#fff;"></canvas><canvas id="imagecanvas" width="400" height="300" style="border-radius:25px; display:none"></canvas></div> </div>');
            const element = document.querySelector('#wrap');
    
            var isMouseDown,initX,initY,height = element.offsetHeight,width = element.offsetWidth;
    
            element.addEventListener('mousedown', function(e) {
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
                    element.style.left = cx + 'px';
                    element.style.top = cy + 'px';
                }
            })
    
            element.addEventListener('mouseup', function() {
                isMouseDown = false;
                document.body.classList.remove('no-select');
            })
    
            $(document.body).append('<script type="text/javascript" src="turtle.js"></script>');
        }
    }

    function output(color,...args) {
        var pName = 'PopUpText' + (popupNum-1);
        var prev = $('#'+pName).html()
        var content = '<br>';

        for(let i=0; i<args.length; i++){
            content += args[i] + " ";
        }

        $('#'+pName).html(prev + '<span style="color:' + color + '">' + content + '</span>');
    }

    function ChangeOutputColor(color){
        var pName = 'PopUpText' + (popupNum-1);
        var prev = $('#'+pName).html()
        $('#'+pName).html('<span style="color:' + color + '">' + prev + '</span>');
        //document.getElementById(pName).style.color = color;
    }

    let toJs = (code) => {
        let visitor = new MyJavascriptVisitor(popupNum);
        let host = new AstHost(visitor);

        host.Accept(code);

        return visitor.GetResult();
    };

    editors['Code Chips'].SetOnExecute(code => { popup(); turtle_canvas(); eval(toJs(code)); });
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