import { assert } from "../../Utils/Assert.js";
import { EditorElementTypes } from "../EditorElements/EditorElement.js";
import { EditorCommand } from "./EditorCommand.js";

export class DeleteCommand extends EditorCommand{
    block;
    generatedBy;

    parent;
    index;

    constructor(editor, block){
        super(editor, `Delete ${
            block.GetType() === EditorElementTypes.NewLine ? 'New Line' :
            block.GetType() === EditorElementTypes.Tab ? 'Tab' :
            block.GetSymbol().alias || block.GetSymbol().symbol.name
        }`);

        this.block = block;
        this.parent = block.GetParent();
        this.index = this.parent.IndexOf(block);

        this.generatedBy = this.block.GetGeneratedBy();

        if (!this.generatedBy && this.parent.GetLength() !== 1 && this.block.GetType() !== EditorElementTypes.NewLine){
            let line = this.editor.GetElemLine(this.block);
            // if element is in a line by itself
            if (
                line.elems.length === 1 || 
                line.elems.length === 2 && line.elems[1].GetType() === EditorElementTypes.NewLine
            ){
                assert(this.index > 0 && this.parent.GetElem(this.index - 1).GetType() === EditorElementTypes.NewLine);
                this.newLine = this.parent.GetElem(this.index - 1);
            }
        }

        this.selected = this.editor.selected;
    }

    Execute(){
        if (this.newLine)
            this.editor.RemoveElem_WithChecks(this.newLine);

        this.editor.RemoveElem_WithChecks(this.block);
    }

    Undo(){
        if (this.generatedBy)
            this.generatedBy.GetParent().RemoveElem(this.generatedBy);
        
        if (this.newLine)
            this.parent.InsertAtIndex(this.index - 1, this.newLine);

        this.parent.InsertAtIndex(this.index, this.block);
        this.editor.Select(this.selected);
    }

    Redo(){
        this.Execute();
    }
}