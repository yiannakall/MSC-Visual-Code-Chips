import { assert } from "../../Utils/Assert.js";
import { EditorCommand } from "./EditorCommand.js";
import { DeleteCommand } from "./DeleteCommand.js";

export class ReduceCommand extends EditorCommand {
    block;
    reducePoint;
    commands = [];

    constructor(editor, block, reducePoint){
        super(
            editor,
            `
                Reduce ${ block.GetSymbol().alias || block.GetSymbol().symbol.name } 
                To ${ reducePoint.GetSymbol().alias || reducePoint.GetSymbol().symbol.name }
            `
        );

        this.block = block, this.reducePoint = reducePoint;
    }

    Execute(){
        assert(!this.commands.length);
        
        for (let elem = this.block; elem !== this.reducePoint; elem = elem.GetGeneratedBy()){
            let command = new DeleteCommand(this.editor, elem);
            command.Execute();
            this.commands.push(command);
        }
    }

    Undo(){
        for (let i = this.commands.length - 1; i >= 0; --i)
            this.commands[i].Undo();
    }

    Redo(){
        this.commands.forEach(command => command.Redo());
    }
}