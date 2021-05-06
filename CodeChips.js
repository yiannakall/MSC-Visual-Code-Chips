import { Editor } from './Editor/Editor.js'
import { Language, AliasedGrammarSymbol, GrammarRuleRhs } from './Language.js'
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
        new Editor(
            $container, 
            CodeChips.ParseLanguageJson_(languageJson),
            toolboxJson
        );
    }

    static ParseLanguageJson_(languageJson){
        let lang = new Language;

        for (let nt of languageJson.non_terminals) {
            let lhs = lang.GetOrAddSymbol(nt.name, false);
            for (let rule of nt.alternate_rules) {
                let syms = [];
                for (let symObj of rule) {
                    let sym = new AliasedGrammarSymbol(
                        lang.GetOrAddSymbol(symObj.name, symObj.type === 'terminal'), 
                        symObj.alias,
                        symObj.repeatable,
                        symObj.optional
                    );
                    syms.push(sym);
                }
                lang.AddProduction(lhs, new GrammarRuleRhs(syms));
            }
        }

        for (let t of languageJson.terminals.dynamicText){
            let symbol = lang.GetSymbol(t.name, true);
            assert(symbol, 'Problem with the dynamic terminals from config file');
            lang.SetTerminalType(symbol, t.type);
        }
        return lang;
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