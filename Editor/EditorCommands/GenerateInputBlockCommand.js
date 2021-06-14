import { assert } from "../../Utils/Assert.js";
import { EditorElementTypes } from "../EditorElements/EditorElement.js";
import { EditorCommand } from "./Command.js";

export class GenerateInputBlockCommand extends EditorCommand {
    inputBlock;
    text;
    newInputBlock;

    constructor(editor, inputBlock, text){
        super(editor, `New ${inputBlock.GetSymbol().alias || inputBlock.GetSymbol().symbol.name}`);
        this.inputBlock = inputBlock;
        this.text = text;
        assert(
            inputBlock.GetType() === EditorElementTypes.InputBlock &&
            inputBlock.GetSymbol().repeatable
        );
    }

    Execute(){
        assert(!this.newInputBlock);

        /* create code for a non repeating version of the GrammarSymbol */
        this.newInputBlock = this.inputBlock.Clone();
        this.newInputBlock.GetSymbol().repeatable = false;
        this.newInputBlock.SetGeneratedBy(this.inputBlock);
        /* simulate typing on the generated block and not on the repeatable block */
        this.newInputBlock.SetText(this.text);
        this.inputBlock.SetText(undefined);

        this.inputBlock.GetParent().InsertBeforeElem(this.inputBlock, this.newInputBlock);

        this.editor.RenderWorkspace();
        this.editor.Select(this.newInputBlock);
        this.newInputBlock.GetInput().focus();
    }

    Undo(){
        this.editor.RemoveElem_WithChecks(this.newInputBlock);
        this.editor.RenderWorkspace();
        this.editor.Select(this.inputBlock);
    }

    Redo(){
        this.inputBlock.GetParent().InsertBeforeElem(this.inputBlock, this.newInputBlock);

        this.editor.RenderWorkspace();
        this.editor.Select(this.newInputBlock);
    }
}