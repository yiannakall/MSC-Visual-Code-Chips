import { assert } from "../../Utils/Assert.js";
import { EditorElementTypes } from "../EditorElements/EditorElement.js";
import { EditorCommand } from "./EditorCommand.js";
import { PasteCommand } from "./PasteCommand.js";

export class QuickReplaceCommand extends EditorCommand{
    dest;
    replacement;

    replacementResult;
    pasteCommands;

    constructor(editor, dest, replacement){
        super(editor, 
            `Replace ${
                dest.GetSymbol().alias || dest.GetSymbol().symbol.name
            } with ${
                replacement.GetSymbol().alias || replacement.GetSymbol().symbol.name
            }`
        );

        this.dest = dest, this.replacement = replacement;
        
        this.pasteCommands = [];
    }

    Replace_(){        
        let pc = new PasteCommand(this.editor, this.replacement, this.dest);
        pc.Execute();
        this.pasteCommands.push(pc);

        let elem = pc.GetPasteResult();
        let destSymbol = this.dest.GetSymbol().symbol.name;
        let to = this.replacement.GetSymbol().symbol.name

        if (this.dest.GetType() === EditorElementTypes.Group && elem.GetType() === EditorElementTypes.Group){
            let elems = elem.GetElems().filter(
                elem => elem.GetType() !== EditorElementTypes.NewLine && elem.GetType() !== EditorElementTypes.Tab
            );
            let elemMap = {};
            let elemConfig = this.editor.quickReplace[destSymbol][to][0];
            
            for (let i = 0; i < elemConfig.length; ++i){
                let configSymbol = elemConfig[i];

                if (
                    configSymbol.length >= 3 &&
                    configSymbol[0] === '$' &&
                    configSymbol[1] === '$' &&
                    configSymbol[2] === '_'
                ){
                    elemMap[configSymbol] = elems[i];
                }
            }
            
            let replacementConfig = this.editor.quickReplace[destSymbol][to][1];
            let destElems = this.dest.GetElems().filter(
                elem => elem.GetType() !== EditorElementTypes.NewLine && elem.GetType() !== EditorElementTypes.Tab
            );

            for (let i = 0; i < replacementConfig.length; ++i){
                let configSymbol = replacementConfig[i];

                if (
                    configSymbol.length >= 3 &&
                    configSymbol[0] === '$' &&
                    configSymbol[1] === '$' &&
                    configSymbol[2] === '_'
                ){
                    let emptyBlock = elemMap[configSymbol], original = destElems[i];

                    if (this.editor.CanPaste(original, emptyBlock)){
                        let pc = new PasteCommand(this.editor, original.CloneRec(), emptyBlock)
                        pc.Execute();
                        this.pasteCommands.push(pc);
                    }
                }
            }
        }

        return elem;
    }

    Execute(){
        this.replacementResult = this.Replace_();
        assert(this.replacementResult);
        this.editor.Select(this.replacementResult);
    }

    Undo(){
        for (let i = this.pasteCommands.length - 1; i >= 0; --i)
            this.pasteCommands[i].Undo();

        this.editor.Select(this.dest);
    }

    Redo(){
        for (let i = 0; i < this.pasteCommands.length; ++i)
            this.pasteCommands[i].Redo();

        this.editor.Select(this.replacementResult);
    }
    
}