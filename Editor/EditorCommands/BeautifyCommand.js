import { assert } from "../../Utils/Assert.js";
import { EditorElementTypes, EditorElementViewMode } from "../EditorElements/EditorElement.js";
import { EditorCommand } from "./EditorCommand.js";

export class BeautifyCommand extends EditorCommand {
    preBeautifyChars = [];
    beautifyChars = [];

    constructor(editor){
        super(editor, `Beautify`);
    }

    Execute(){
        this.editor.code.ForEachRec( elem => {
            if (elem.GetType() === EditorElementTypes.Group || elem.GetType() === EditorElementTypes.RepetitionGroup){
                for (let i = elem.GetLength() - 1; i >= 0; --i){
                    let child = elem.GetElem(i);

                    if (child.GetType() === EditorElementTypes.NewLine || child.GetType() === EditorElementTypes.Tab){
                        elem.RemoveElemAt(i);
                        
                        this.preBeautifyChars.push({index: i, indentationChar: child, parent: elem});
                    }
                }
            }
        });

        this.editor.code.ForEachRec(
            elem => {
                let chars = this.editor.ApplyPrettyPrint(elem, this.editor.theme['Pretty Print'], EditorElementViewMode.BlockView);
                
                if (chars){
                    chars.forEach(char => char.parent = elem);
                    this.beautifyChars.push(...chars);
                }
            }
        );
    }

    Redo(){
        for (let info of this.preBeautifyChars){
            assert(info.parent.GetElem(info.index) === info.indentationChar);
            info.parent.RemoveElemAt(info.index);
        }

        for (let info of this.beautifyChars){
            info.parent.InsertAtIndex(info.index, info.indentationChar);
        }
    }

    Undo(){
        for (let i = this.beautifyChars.length - 1; i >= 0; --i){
            let info = this.beautifyChars[i];
            assert(info.parent.GetElem(info.index) === info.indentationChar);
            
            info.parent.RemoveElemAt(info.index);
        }

        for (let i = this.preBeautifyChars.length - 1; i >= 0; --i){
            let info = this.preBeautifyChars[i];
            
            info.parent.InsertAtIndex(info.index, info.indentationChar);
        }
    }
}