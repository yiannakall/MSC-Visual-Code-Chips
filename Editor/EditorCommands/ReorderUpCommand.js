import { assert } from "../../Utils/Assert.js";
import { EditorElementTypes } from "../EditorElements/EditorElement.js";
import { EditorCommand } from "./EditorCommand.js";
import { ReorderDownCommand } from "./ReorderDownCommand.js";

export class ReorderUpCommand extends EditorCommand{

    block;
    prevLine;
    currLine;

    constructor(editor, block){
        super(editor, `Reorder Up`);

        this.editor = editor;
        this.block = block;

        // editor has already checked it will succeed
        this.currLine = this.editor.GetElemLine(block);
        this.prevLine = this.editor.GetElemLine(block.parent.GetElem(this.currLine.start - 1));
    }
    
    Execute(){
        let selected = this.editor.selected;
        this.editor.ReorderContinuousLines(this.prevLine, this.currLine);
        this.editor.selected = undefined, this.editor.Select(selected);
    }

    Undo(){
        (new ReorderDownCommand(this.editor, this.block)).Execute();
    }

    Redo(){
        this.Execute();
    }
    
}