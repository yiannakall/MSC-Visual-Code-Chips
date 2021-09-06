import { assert } from "../../Utils/Assert.js";
import { EditorCommand } from "./EditorCommand.js";

export class ChooseCommand extends EditorCommand {
    selectionBlock;
    
    selectedSymbol;

    newBlock;

    constructor(editor, selectionBlock, selectedSymbol){
        super(editor, `Choose ${selectedSymbol.alias || selectedSymbol.symbol.name}`);
        this.selectionBlock = selectionBlock;
        this.selectedSymbol = selectedSymbol;
    }

    Execute(){
        if (!this.newBlock)
            this.newBlock = this.editor.CreateElem(this.selectedSymbol);

        this.newBlock.SetGeneratedBy(this.selectionBlock);
        this.newBlock.SetDraggable(true), this.newBlock.SetDroppable(true);

        this.selectionBlock.GetParent().InsertBeforeElem(this.selectionBlock, this.newBlock);
        this.selectionBlock.GetParent().RemoveElem(this.selectionBlock);

        window.requestAnimationFrame( () => this.editor.Select(this.newBlock) );
    }

    Redo(){
        this.Execute();
    }

    Undo(){
        assert(this.newBlock);
        this.editor.RemoveElem_WithChecks(this.newBlock);
    }
}