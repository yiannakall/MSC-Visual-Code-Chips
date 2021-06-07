import { assert } from "../../Utils/Assert.js";

export class Command {
    description;

    Execute() { assert(false, 'Not implemented by subclass'); }

    constructor(description){
        this.description = description;
    }
}

export class EditorCommand extends Command {
    editor;

    Undo()      { console.log (`Undo ${this.description}`); };
    Redo()      { console.log (`Redo ${this.description}`); };
    Execute()   { console.log (`Execute ${this.description}`); };

    constructor(editor, description){
        super(description);
        this.editor = editor;
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
}