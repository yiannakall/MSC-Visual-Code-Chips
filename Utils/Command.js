import { assert } from "./Assert.js";

export class Command {
    description;

    Execute() { assert(false, 'Not implemented by subclass'); }

    constructor(description){
        this.description = description;
    }
}

export class ReversibleCommand extends Command {

    Undo()      { assert(false, 'Not implemented by subclass'); };
    Redo()      { assert(false, 'Not implemented by subclass'); };
    Execute()   { assert(false, 'Not implemented by subclass'); };

    constructor(description){
        super(description);
    }
}

export class CommandHistory {
    history = [];
    i = 0;

    constructor() {}

    Undo() {
        if (this.history.length === 0 || this.i === 0)
            return;
        else
            this.history[--this.i].Undo();
    }

    Redo() {
        if (this.history.length === 0 || this.i === this.history.length)
            return;
        else
            this.history[this.i++].Redo();
    }

    ExecuteAndAppend(command) {
        while (this.i !== this.history.length){
            this.history.pop();
        }

        this.history.push(command);
        command.Execute();
        ++this.i;
    }

    GetUndoSize() {
       return this.i; 
    }

    GetRedoSize() {
        return this.history.length - this.i;
    }

    GetCurrentUndo(){
        return this.GetUndoSize() ? this.history[this.i - 1] : null;
    }

    GetCurrentRedo(){
        return this.GetRedoSize() ? this.history[this.i] : null;
    }
}