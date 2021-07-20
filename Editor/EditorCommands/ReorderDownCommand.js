import { assert } from "../../Utils/Assert.js";
import { EditorElementTypes } from "../EditorElements/EditorElement.js";
import { EditorCommand } from "./EditorCommand.js";
import { ReorderUpCommand } from "./ReorderUpCommand.js";

export class ReorderDownCommand extends EditorCommand{

    block;
    currLine;
    nextLine;
    endl;

    constructor(editor, block){
        super(editor, `Reorder Down`);

        this.editor = editor;
        this.block = block;

        // editor has already checked it will succeed
        this.currLine = this.editor.GetElemLine(block);
        this.nextLine = this.editor.GetElemLine(block.parent.GetElem(this.currLine.end + 1));
    }
    
    Execute(){
        let selected = this.editor.selected;
        this.editor.ReorderContinuousLines(this.currLine, this.nextLine);
        this.editor.selected = undefined, this.editor.Select(selected);
    }

    Undo(){
        (new ReorderUpCommand(this.editor, this.block)).Execute();
    }

    Redo(){
        this.Execute();
    }
    
}