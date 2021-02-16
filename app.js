function LoadStyles(styles){
    let viewClasses = Object.keys(styles);
    for (viewClass of viewClasses){
        let props = Object.keys(styles[viewClass]);
        let css =   '\n.' + viewClass + '{\n' 
                    + props.map( prop => '\t' + prop + ': ' + styles[viewClass][prop] + ';').join('\n')
                    + '\n}\n';
        
        let $style = $(`<style id = "${viewClass + '-style'}" type="text/css"></style>`);
        $style.append(css);
        $('head').append($style);
    }
}

/**
 * Load a LineElem including nested grouping
 * @param {Object | Array} obj {text: 'text', type: 'type} or [{text: 'text', type: 'type}, [...], ...]
 */
function LoadLineElem(obj){
    if (!Array.isArray(obj)){
        let lineElem = new Block(obj.text);
        lineElem.SetExtraCssClasses(config.type2styles[obj.type]);
        return lineElem;
    }

    let elems = [];
    for (let elem of obj){
        elems.push(LoadLineElem(elem));
    }
    return new Group(elems);
}

$(document).ready(function () {
    let code = config.code;
    let type2styles = config.type2styles;
    
    LoadStyles(config.styles);
    let editor = new Editor;

    for (let line of code){
        let lineElems = [];
        for (let obj of line){
            lineElems.push( LoadLineElem(obj) );
        }
        editor.PushLine(new Line(lineElems));
    }

    editor.Render($('#injection-div'));
});