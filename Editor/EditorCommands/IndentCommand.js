import { assert } from "../../Utils/Assert.js";
import { EditorCommand } from "./EditorCommand.js";

export class IndentCommand extends EditorCommand{
    block;
    tab;

    constructor(editor, block){
        super(editor, `Tab In`);

        this.block = block;
    }
    
    Execute(){        
        if (!this.tab)
            this.tab = this.editor.CreateTab();
        
        this.block.GetParent().InsertBeforeElem(this.block, this.tab);
    }

    Undo(){
        assert(this.tab);
        this.tab.GetParent().RemoveElem(this.tab);
    }

    Redo(){
        this.Execute();
    }
    
}