import { assert } from "../../Utils/Assert.js";
import { EditorCommand } from "./Command.js";

export class NewLineCommand extends EditorCommand{
    block;
    newLine;

    constructor(editor, block){
        super(editor, 'New Line');

        this.block = block;
    }
    
    Execute(){
        if (!this.newLine)
            this.newLine = this.editor.CreateNewLine();
        
        this.block.GetParent().InsertBeforeElem(this.block, this.newLine);
        this.editor.RenderWorkspace();
    }

    Undo(){
        assert(this.newLine);
        this.newLine.GetParent().RemoveElem(this.newLine);
        this.editor.RenderWorkspace();
    }

    Redo(){
        this.Execute();
    }
}