import { Editor } from './Editor/Editor.js'
import { Language } from './Language.js'
import { assert } from './Utils/Assert.js'

export class CodeChips {

    static Inject(
        $container,
        {
            languageJson,
            stylesJson,
            toolboxJson,
        }
    ){
        CodeChips.LoadStyles(stylesJson);
        
        let language = CodeChips.ParseLanguageJson_(languageJson);
        if (!language){
            assert('Parsing the language resulted into an error');    
            return;
        }

        new Editor(
            $container,
            language,
            toolboxJson
        );
    }

    static ParseLanguageJson_(languageJson){
        return Language.FromJson(languageJson);
    }

    static LoadStyles(stylesJson){
        let viewClasses = Object.keys(stylesJson);
        for (let viewClass of viewClasses){
            let props = Object.keys(stylesJson[viewClass]);
            let css =   '\n.' + viewClass + '{\n' 
                        + props.map(prop => '\t' + prop + ': ' + stylesJson[viewClass][prop] + ';').join('\n')
                        + '\n}\n';
            
            let $style = $(`<style id = "${viewClass + '-style'}" type="text/css"></style>`);
            $style.append(css);
            $('head').append($style);
        }
    }

}