import { assert } from "../../../Utils/Assert.js";
import { ToolboxCommand } from "./ToolboxCommand.js";

export class DeleteCommand extends ToolboxCommand {
    block;
    categoryName;
    index;

    constructor(toolbox, block, categoryName){
        super(toolbox);
        this.block = block, this.categoryName = categoryName;
    }

    Execute(){
        assert(this.index === undefined);

        let blocks = this.toolbox.blocks[this.categoryName];
        this.index = blocks.indexOf(this.block);
        assert(this.index !== -1);
        blocks.splice(this.index, 1);

        this.toolbox.RenderAllBlocks();
    }

    Undo(){
        assert(this.index !== undefined);

        this.toolbox.SetBlockDragEvents(this.categoryName, this.block);
        this.toolbox.blocks[this.categoryName].splice(this.index, 0, this.block);
        this.index = undefined;

        this.toolbox.RenderAllBlocks();
    }

    Redo(){
        this.Execute();
    }

}