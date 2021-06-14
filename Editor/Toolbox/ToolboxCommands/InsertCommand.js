import { assert } from "../../../Utils/Assert.js";
import { ToolboxCommand } from "./ToolboxCommand.js";

export class InsertCommand extends ToolboxCommand {
    block;
    categoryName;
    index;

    constructor(toolbox, block, categoryName, index){
        super(toolbox);
        this.block = block, this.categoryName = categoryName, this.index = index;
    }

    Execute(){
        this.toolbox.blocks[this.categoryName].splice(this.index, 0, this.block);
        this.toolbox.SetBlockDragEvents(this.categoryName, this.block);
        this.toolbox.RenderAllBlocks();
    }

    Undo(){
        this.toolbox.blocks[this.categoryName].splice(this.index, 1);
        this.toolbox.RenderAllBlocks();
    }

    Redo(){
        this.Execute();
    }
}