import { ReversibleCommand } from "../../../Utils/Command.js";

export class ToolboxCommand extends ReversibleCommand {
    toolbox;

    constructor(toolbox){
        super();
        this.toolbox = toolbox;
    }
}