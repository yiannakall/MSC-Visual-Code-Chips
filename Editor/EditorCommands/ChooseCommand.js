import { assert } from "../../Utils/Assert.js";
import { EditorCommand } from "./Command.js";

export class ChooseCommand extends EditorCommand {
    selectionBlock;
    
    selectedSymbol;

    newBlock;
    newLine;

    constructor(editor, selectionBlock, selectedSymbol){
        super(editor, `Choose ${selectedSymbol.alias || selectedSymbol.symbol.name}`);
        this.selectionBlock = selectionBlock;
        this.selectedSymbol = selectedSymbol;
    }

    Execute(){
        if (!this.newBlock)
            this.newBlock = this.editor.CreateElem(this.selectedSymbol);

        if (!this.newLine && this.selectionBlock.GetSymbol().repeatable) 
            this.newLine = this.editor.CreateNewLine();

        this.newBlock.SetGeneratedBy(this.selectionBlock);

        this.selectionBlock.GetParent().InsertBeforeElem(this.selectionBlock, this.newBlock);

        if (!this.selectionBlock.GetSymbol().repeatable){
            this.selectionBlock.GetParent().RemoveElem(this.selectionBlock);
        }else{
            this.selectionBlock.GetParent().InsertBeforeElem(this.selectionBlock, this.newLine);
        }

        this.editor.RenderWorkspace();
        this.editor.Select(this.newBlock);
    }

    Redo(){
        this.Execute();
    }

    Undo(){
        assert(this.newBlock);

        this.newLine?.GetParent().RemoveElem(this.newLine);
        this.editor.RemoveElem_WithChecks(this.newBlock);
    }
}