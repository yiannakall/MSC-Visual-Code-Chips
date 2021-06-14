import { ReversibleCommand } from "../../Utils/Command.js";

export class EditorCommand extends ReversibleCommand {
    editor;

    constructor(editor, description){
        super(description);
        this.editor = editor;
    }
}