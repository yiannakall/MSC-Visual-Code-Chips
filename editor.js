class Line {
    lineNo = 0;
    elems = [];

    constructor(elems) {
        if (elems)
            this.elems = elems;
    }

    Render($container) {
        let $line = $('<div class="line"></div>');
        let $lineNo = $(`<div class="line-number"> ${this.lineNo} </div>`);
        let $lineElems = $('<div class="line-elems"></div>');

        this.elems.forEach(elem => elem.Render($lineElems));

        $line.append($lineNo);
        $line.append($lineElems);
        $container.append($line);
    }
}

class Editor {
    lines = [];
    id;
    static count = 0;

    constructor() {
        this.id = "editor" + Editor.count++;
    }

    PushLine(line) {
        line.lineNo = this.lines.length + 1;
        this.lines.push(line);
    }

    Render($container) {
        $container.empty();
        let $lines = $('<div class = "lines"></div>');
        $container.append($lines);

        this.lines.forEach(line => line.Render($lines));
    }
}

class LineElem {
    textContent = "";
    extraCssClasses = [];
    id;

    typeId;
    userData;

    static count = 0;

    constructor(textContent) {
        this.textContent = textContent;
        this.id = "elem" + LineElem.count++;
    }

    Render($container) {
        let $lineElem = $(`<div class = "line-elem"> ${this.textContent} </div>`);
        $lineElem.addClass(this.extraCssClasses.join(' '));
        $container.append($lineElem);
    }

    SetExtraCssClasses(extraCssClasses) {
        this.extraCssClasses = extraCssClasses;
    }
}