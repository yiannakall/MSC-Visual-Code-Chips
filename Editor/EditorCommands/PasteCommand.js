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

        let {elem1: sourcePoint, elem2: destPoint} = preds;
        
        sourcePoint.SetGeneratedBy(destPoint.GetGeneratedBy());
        sourcePoint.GetSymbol().alias = destPoint.GetSymbol().alias;
        dest.GetParent().InsertBeforeElem(dest, source);
        dest.GetParent().RemoveElem(dest);

        return true;
    }

    Execute(){
        let result = this.Paste_(this.source, this.dest);
        assert(result);
        
        this.editor.Select(this.source);
    }

    Undo(){
        let parent = this.source.GetParent();

        parent.InsertAfterElem(this.source, this.dest);
        parent.RemoveElem(this.source);

        this.editor.Select(this.dest);
    }

    Redo(){
        let parent = this.dest.GetParent();

        parent.InsertBeforeElem(this.dest, this.source);
        parent.RemoveElem(this.dest);

        this.editor.Select(this.source);
    }
    
}