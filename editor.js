class Line {
    lineNo = 0;
    elems = [];

    constructor(elems){
        if (elems)
            this.elems = elems;
    }

    Render($container){
        let $line = $('<div class="line"></div>');
        let $lineNo = $(`<div class="line-number"> ${this.lineNo} </div>`);
        let $lineElems = $('<div class="line-elems"></div>');
        
        this.elems.forEach( elem => elem.Render($lineElems) );
        
        $line.append($lineNo);
        $line.append($lineElems);
        $container.append($line);
    }
}

class Editor{
    lines = [];
    id;
    static count = 0;

    constructor(){
        this.id = "editor" + Editor.count++;
    }

    PushLine(line){
        line.lineNo = this.lines.length + 1;
        this.lines.push(line);
    }

    Render($container){
        $container.empty();
        let $lines = $('<div class = "lines"></div>');
        $container.append($lines);

        this.lines.forEach( line => line.Render($lines) );
    }
}

class LineElem{
    textContent = "";
    typeId;
    userData;
    id;

    static count = 0;

    constructor(textContent){
        this.textContent = textContent;
        this.id = "elem"  + LineElem.count++;
    }

    Render($container){
        $container.append(`<div class = "line-elem identifier"> ${this.textContent} </div>`);
    }

}

$( document ).ready(function() {
    let editor = new Editor;
    
    // editor.PushLine(new Line([
    //     new LineElem('count'),
    //     new LineElem('='),
    //     new LineElem('1')
    // ]));
    
    // editor.PushLine(new Line([
    //     new LineElem('While'),
    //     new LineElem('count'),
    //     new LineElem('<'),
    //     new LineElem('3')
    // ]));

    // editor.PushLine(new Line([
    //     new LineElem(''),
    //     new LineElem('Print'),
    //     new LineElem('"Hello World"'),
    // ]));
    
    // editor.PushLine(new Line([
    //     new LineElem(''),
    //     new LineElem('count'),
    //     new LineElem('='),
    //     new LineElem('count'),
    //     new LineElem('+'),
    //     new LineElem('1'),
    // ]));

    // editor.PushLine(new Line([
    //     new LineElem('End While')
    // ]));

    // editor.Render($('#injection-div'));
});