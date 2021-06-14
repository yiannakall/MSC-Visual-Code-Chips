import { assert } from "../../Utils/Assert.js";
import { EditorCommand } from "./Command.js";

export class DeleteAllCommand extends EditorCommand {
    code;

    constructor(editor){
        super(editor, 'Delete All');
    }

    Execute(){
        assert(!this.code);
        this.code = this.editor.code;

        this.editor.InitializeCode_();
        this.editor.RenderWorkspace();
    }

    Undo(){
        this.editor.code = this.code;
        this.editor.RenderWorkspace();
    }

    Redo(){
        this.editor.InitializeCode_();
        this.editor.RenderWorkspace();
    }
}