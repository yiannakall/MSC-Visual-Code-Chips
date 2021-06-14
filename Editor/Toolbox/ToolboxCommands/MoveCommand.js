import { assert } from "../../../Utils/Assert.js";
import { ToolboxCommand } from "./ToolboxCommand.js";
import { DeleteCommand } from "./DeleteCommand.js";
import { InsertCommand } from "./InsertCommand.js";

export class MoveCommand {
    deleteCommand;
    insertCommand;

    constructor(toolbox, block, categoryFrom, categoryTo, destIndex){
        this.deleteCommand = new DeleteCommand(toolbox, block, categoryFrom);
        this.insertCommand = new InsertCommand(toolbox, block, categoryTo, destIndex);
    }

    Execute(){
        this.deleteCommand.Execute();
        this.insertCommand.Execute();
    }

    Undo(){
        this.insertCommand.Undo();
        this.deleteCommand.Undo();
    }

    Redo(){
        this.deleteCommand.Redo();
        this.insertCommand.Redo();
    }

}