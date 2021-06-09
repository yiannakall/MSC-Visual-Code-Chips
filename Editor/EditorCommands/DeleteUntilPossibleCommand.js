import { assert } from "../../Utils/Assert.js";
import { EditorCommand } from "./Command.js";
import { DeleteCommand } from "./DeleteCommand.js";

export class DeleteUntilPossibleCommand extends EditorCommand {
    block;
    commands = [];

    constructor(editor, block){
        super(editor, 'Delete Until Possible');
        this.block = block;
    }

    Execute(){
        assert(!this.commands.length);
        
        for (let elem = this.block; this.editor.CanRemoveElem(elem); elem = elem.GetGeneratedBy()){
            let command = new DeleteCommand(this.editor, elem);
            command.Execute();
            this.commands.push(command);
        }
    }

    Undo(){
        for (let i = this.commands.length - 1; i >= 0; --i)
            this.commands[i].Undo();
    }

    Redo(){
        this.commands.forEach(command => command.Redo());
    }
}