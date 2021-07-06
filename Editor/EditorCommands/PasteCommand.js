import { assert } from "../../Utils/Assert.js";
import { EditorElementTypes } from "../EditorElements/EditorElement.js";
import { EditorCommand } from "./EditorCommand.js";

export class PasteCommand extends EditorCommand{
    source;
    dest;

    destClone;
    newLine;

    constructor(editor, source, dest){
        super(editor, `Paste ${
            source.GetType() === EditorElementTypes.NewLine ? 'New Line' :
            source.GetType() === EditorElementTypes.Tab ? 'Tab' :
            source.GetSymbol().alias || source.GetSymbol().symbol.name
        }`);

        this.source = source, this.dest = dest;
    }
    
    Paste_(source, dest){
        let preds = this.editor.FindCommonPredecessor(source, dest);
        if (!preds) return false;

        let newLine, destClone;
        let {elem1: sourcePoint, elem2: destPoint} = preds;
        
        if (destPoint.GetSymbol().repeatable && !source.GetSymbol().repeatable){
            /* The repeatable block gets created again to allow further repetitions */
            if (destPoint === dest){
                dest.GetParent().InsertAfterElem(dest, destClone = dest.CloneRec());
    
                if (!destPoint.GetSymbol().symbol.isTerminal)
                    dest.GetParent().InsertAfterElem(dest, newLine = this.editor.CreateNewLine());
            }

            /* The pasted block (or descendants) has to maintain repeatability, so that it is deletable */
            if (destPoint.GetSymbol().symbol.isTerminal) {
                sourcePoint.SetGeneratedBy(destPoint);
            }else
                sourcePoint.GetSymbol().repeatable = true;
        }else
            sourcePoint.SetGeneratedBy(destPoint.GetGeneratedBy());

        sourcePoint.GetSymbol().alias = destPoint.GetSymbol().alias;
        dest.GetParent().InsertBeforeElem(dest, source);
        dest.GetParent().RemoveElem(dest);

        return {
            newLine,
            destClone
        };
    }

    Execute(){
        let result = this.Paste_(this.source, this.dest);
        assert(result);
        this.newLine = result.newLine, this.destClone = result.destClone;
        
        this.editor.Select(this.source);
    }

    Undo(){
        let parent = this.source.GetParent();

        parent.InsertAfterElem(this.source, this.dest);

        if (this.newLine)   parent.RemoveElem(this.newLine);
        if (this.destClone) parent.RemoveElem(this.destClone);

        parent.RemoveElem(this.source);

        this.editor.Select(this.dest);
    }

    Redo(){
        let parent = this.dest.GetParent();

        parent.InsertBeforeElem(this.dest, this.source);

        if (this.destClone) parent.InsertAfterElem(this.source, this.destClone);
        if (this.newLine)   parent.InsertAfterElem(this.source, this.newLine);

        parent.RemoveElem(this.dest);

        this.editor.Select(this.source);
    }
    
}