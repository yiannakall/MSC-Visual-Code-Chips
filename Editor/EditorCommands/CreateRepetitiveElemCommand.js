import { EditorElementTypes } from "../EditorElements/EditorElement.js";
import { EditorCommand } from "./EditorCommand.js";
import { NewLine } from "../EditorElements/NewLine.js";

export class CreateRepetitiveElemCommand extends EditorCommand {
    repetitionGroup;
    newLine;
    newElem;

    constructor(editor, repetitionGroup){
        super(editor, `Create New ${
                            repetitionGroup.GetRepetitiveElem().GetSymbol().alias || 
                            repetitionGroup.GetRepetitiveElem().GetSymbol().symbol.name
                        }`
        );
        this.repetitionGroup = repetitionGroup;
    }

    Execute(){
        if (this.repetitionGroup.GetLength() !== 0 &&
            (
                this.repetitionGroup.GetRepetitiveElem().GetType() === EditorElementTypes.SelectionBlock ||
                this.repetitionGroup.GetRepetitiveElem().GetType() === EditorElementTypes.Group ||
                this.repetitionGroup.GetRepetitiveElem().GetType() === EditorElementTypes.RepetitionGroup
            )
        ){
            this.repetitionGroup.PushElem( this.newLine || (this.newLine = new NewLine()) );
        }

        this.repetitionGroup.PushElem(this.newElem || (this.newElem = this.repetitionGroup.GetRepetitiveElem().CloneRec()) );
        this.editor.Select(this.newElem);
    }

    Undo(){
        if (this.newLine)
            this.editor.RemoveElem_WithChecks(this.newLine);
        
        this.editor.RemoveElem_WithChecks(this.newElem);
    }

    Redo(){
        this.Execute();
    }
}