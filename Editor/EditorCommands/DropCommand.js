import { assert } from "../../Utils/Assert.js";
import { EditorCommand } from "./EditorCommand.js";
import { PasteCommand } from "./PasteCommand.js";

export class DropCommand extends EditorCommand{

    parent;
    dropIndex;
    
    dest;
    newLine;
    pc;

    constructor(editor, parent, elem, dropIndex){
        super(editor, `Drop new ${
            elem.GetSymbol().alias || elem.GetSymbol().symbol.name
        }`);

        this.parent = parent, this.dropIndex = dropIndex;
        
        this.dest = this.editor.CreateElem(
            this.parent.GetRepetitiveElem().GetSymbol()
        );

        this.pasteCommand = new PasteCommand(this.editor, elem, this.dest);

        if (this.parent.GetLength() !== 0)
            this.newLine = this.editor.CreateNewLine();
    }
    
    InsertDest_(){
        if (this.parent.GetLength() === 0){
            this.parent.InsertAtIndex(this.dropIndex, this.dest);
        }
        else if (this.dropIndex === this.parent.GetLength()){
            this.parent.InsertAtIndex(this.dropIndex, this.dest);
            this.parent.InsertAtIndex(this.dropIndex, this.newLine);
        }
        else {
            this.parent.InsertAtIndex(this.dropIndex, this.newLine);
            this.parent.InsertAtIndex(this.dropIndex, this.dest);
        }
    }

    Execute(){
        this.InsertDest_();
        this.pasteCommand.Execute();
    }

    Undo(){
        this.pasteCommand.Undo();

        this.parent.RemoveElemAt(this.dropIndex);

        if (this.newLine)
            this.parent.RemoveElemAt(this.dropIndex);
    }

    Redo(){
        this.InsertDest_();
        this.pasteCommand.Redo();
    }
    
}