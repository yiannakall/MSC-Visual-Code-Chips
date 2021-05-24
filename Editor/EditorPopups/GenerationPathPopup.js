import { PopupWindow } from "./PopupWindow.js";
import { EditorElementParser } from "../EditorElements/EditorElementParser.js"
import { EditorElementTypes } from "../EditorElements/EditorElement.js"
import { assert } from "../../Utils/Assert.js";
import { AliasedGrammarSymbol, GrammarSymbol } from "../../Language.js";
import { Group } from "../EditorElements/Group.js";

export class GenerationPathPopup extends PopupWindow {
    
    y;
    code;

    $generationPath;

    constructor($container, code) {
        super($container, 'Generation path');
        
        this.InitCode(code);

        this.y = code.GetWholeView().offset().top + code.GetWholeView().height() + 20;
    }

    InitCode(code){
        this.code = EditorElementParser.FromJson( code.ToJsonRec(), (elem) => {
            elem.SetTheme((elem) => {
                let type = elem.GetType();
                let styles = type;
                if (type != EditorElementTypes.NewLine && type != EditorElementTypes.Tab){
                    styles += ` ${elem.GetSymbol().symbol.name}`;
                }
                return styles;
            });

            if (elem.GetType() === EditorElementTypes.InputBlock || elem.GetType() === EditorElementTypes.SelectionBlock){
                elem.SetEditable(false);
            }
        });

        let startingSymbol = new AliasedGrammarSymbol(new GrammarSymbol('program', false));

        this.code = new Group( startingSymbol, [this.code] );

        // link so that elem.GetGeneratedBy().next == elem
        this.code.ForEachRec( (elem) => this.LinkGeneratedBySequence(elem) );

        // each group handles the child nodes so that they are in their starting state (i.e. for_stmt becomes stmt)
        this.code.ForEachRec( undefined , (elem) => { //postorder traversal
            if (elem.GetType() === EditorElementTypes.Group){
                elem.ForEach((childElem) => {
                    for (var root = childElem; root.GetGeneratedBy(); root = root.GetGeneratedBy());

                    if (root != childElem)  elem.ReplaceElem(childElem, root);
                });
            }
        });
    }

    RenderArrow(){
        this.$generationPath.append($('<div/>').addClass('arrow'));
    }

    RenderGenerationPathBlocks(){
        this.code.Render(this.$generationPath);

        // each group handles the child nodes so that they progress to their final state 1 step at a time
        this.code.ForEachRec((elem) => {
            if (elem.GetType() === EditorElementTypes.Group){
                elem.ForEach((childElem) => {
                    this.RenderIfSelectionBlock(childElem);

                    let prev = childElem;
                    
                    for (let curr = childElem.next; curr; prev = curr, curr = curr.next){
                        elem.ReplaceElem(prev, curr);
                        
                        this.RenderArrow();
                        this.code.Render(this.$generationPath);
                        
                        this.RenderIfSelectionBlock(curr);
                    }
                });
            }
        });
    }

    RenderIfSelectionBlock(elem){
        if (elem.GetType() === EditorElementTypes.SelectionBlock && elem.GetSelectedSymbol()){
            let elemWithSelections = elem.Clone();
            let parent = elem.GetParent();
            
            parent.ReplaceElem(elem, elemWithSelections);
            
            this.RenderArrow();
            this.code.Render(this.$generationPath);
            
            elemWithSelections.GetWholeView().find('.block-alternate-selections').css(
                {
                    display: 'flex',
                    position: 'unset'
                }
            );

            parent.ReplaceElem(elemWithSelections, elem);
        }
    }

    LinkGeneratedBySequence(elem){
        for (let i = elem; i; i = i.GetGeneratedBy()){
            let generatedBy = i.GetGeneratedBy()
            if (generatedBy) 
                generatedBy.next = i;
        }
    }

    GetGenerationSequence_ByGeneratedBy(elem){
        let generatedBys = [];
        for (let i = elem; i; i = i.GetGeneratedBy()){
            generatedBys.unshift(i);
        }
        return generatedBys;
    }

    Render_(){
        this.$popup.css('top', this.y);
        this.$popup.height(this.$popup.height() - this.y);

        this.$generationPath = $('<div/>').addClass('generation-path');
        this.$content.append(this.$generationPath);


        this.RenderGenerationPathBlocks();
    }



}