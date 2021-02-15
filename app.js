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

$(document).ready(function () {
    let code = config.code;
    let type2styles = config.type2styles;
    
    LoadStyles(config.styles);
    let editor = new Editor;

    for (let line of code){
        let lineElems = line.map( (elem) => {
            let lineElem = new LineElem(elem.text);
            lineElem.SetExtraCssClasses(type2styles[elem.type]);
            return lineElem;
        });
        editor.PushLine(new Line(lineElems));
    }

    editor.Render($('#injection-div'));
});