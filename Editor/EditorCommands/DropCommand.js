import { assert } from "../../Utils/Assert.js";
import { EditorCommand } from "./EditorCommand.js";

export class DropCommand extends EditorCommand{

    parent;
    elem;
    dropIndex;
    newLine;

    constructor(editor, parent, elem, dropIndex){
        super(editor, `Drop new ${
            elem.GetSymbol().alias || elem.GetSymbol().symbol.name
        }`);

        this.parent = parent, this.elem = elem, this.dropIndex = dropIndex;
        
        if (this.parent.GetLength() !== 0)
            this.newLine = this.editor.CreateNewLine();
    }
    
    Execute(){
        if (this.parent.GetLength() === 0){
            this.parent.InsertAtIndex(this.dropIndex, this.elem);
        }
        else if (this.dropIndex === this.parent.GetLength()){
            this.parent.InsertAtIndex(this.dropIndex, this.elem);
            this.parent.InsertAtIndex(this.dropIndex, this.newLine);
        }
        else {
            this.parent.InsertAtIndex(this.dropIndex, this.newLine);
            this.parent.InsertAtIndex(this.dropIndex, this.elem);
        }
    }

    Undo(){
        this.parent.RemoveElemAt(this.dropIndex);

        if (this.newLine)
            this.parent.RemoveElemAt(this.dropIndex);
    }

    Redo(){
        this.Execute();
    }
    
}