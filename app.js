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
function LoadElem(obj){
    if (!Array.isArray(obj)){
        let elem = new Block(obj.text);
        elem.SetExtraCssClasses(config.type2styles[obj.type]);
        return elem;
    }

    let elems = [];
    for (let elem of obj){
        elems.push(LoadElem(elem));
    }
    return new Group(elems);
}

$(document).ready(function () {    
    LoadStyles(config.styles);
    
    Editor.root = LoadElem(config.code);
    Editor.Init($('#injection-div'));
});