import { Editor } from './Editor/Editor.js'
import { Language } from './Language.js'
import { assert } from './Utils/Assert.js'

export class CodeChips {

    static Inject(
        $container,
        {
            languageJson,
            themeJson,
            toolboxJson,
        }
    ){  
        let language = CodeChips.ParseLanguageJson_(languageJson);
        if (!language){
            assert('Parsing the language resulted into an error');    
            return;
        }
        
        let editor = new Editor($container, language, toolboxJson, themeJson);
    }

    static ParseLanguageJson_(languageJson){
        return Language.FromJson(languageJson);
    }
    
}