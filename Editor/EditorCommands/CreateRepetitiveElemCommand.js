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
        let nl = this.editor.theme['Pretty Print'][this.repetitionGroup.GetSymbol().symbol.name]['NewLine Between Blocks'];

        if ( this.repetitionGroup.GetLength() !== 0 ){
            if (!this.editor.autoPrettyPrint || nl === 'auto' || nl === undefined || nl === null){
                if (
                    this.repetitionGroup.GetRepetitiveElem().GetType() === EditorElementTypes.SelectionBlock ||
                    this.repetitionGroup.GetRepetitiveElem().GetType() === EditorElementTypes.Group ||
                    this.repetitionGroup.GetRepetitiveElem().GetType() === EditorElementTypes.RepetitionGroup
                ){
                    this.repetitionGroup.PushElem( this.newLine || (this.newLine = new NewLine()) );
                }
            }
            else if (nl === true){
                this.repetitionGroup.PushElem( this.newLine || (this.newLine = new NewLine()) );
            }
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