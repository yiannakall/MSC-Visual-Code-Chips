import { assert } from "../../Utils/Assert.js";
import { EditorElementTypes } from "../EditorElements/EditorElement.js";
import { EditorCommand } from "./EditorCommand.js";

export class OutdentCommand extends EditorCommand{
    block;
    tab;

    constructor(editor, block){
        super(editor, 'Outdent');

        this.block = block;
    }
    
    Execute(){
        let previous = this.block.GetParent().GetPreviousElem(this.block);
        assert(previous.GetType() === EditorElementTypes.Tab);
        this.tab = previous;

        this.block.GetParent().RemoveElem(previous);
    }

    Undo(){
        assert(this.tab);
        this.block.GetParent().InsertBeforeElem(this.block, this.tab);
    }

    Redo(){
        this.Execute();
    }
}