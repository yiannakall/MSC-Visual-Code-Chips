import { AliasedGrammarSymbol } from "../../language.js";
import { assert } from "../../Utils/Assert.js";
import { EditorElementTypes } from "../EditorElements/EditorElement.js";
import { EditorCommand } from "./EditorCommand.js";

export class PasteCommand extends EditorCommand{
    source;
    dest;

    pasteResult;

    destClone;
    newLine;

    constructor(editor, source, dest){
        super(editor, `Paste ${
            source.GetType() === EditorElementTypes.NewLine ? 'New Line' :
            source.GetType() === EditorElementTypes.Tab ? 'Tab' :
            source.GetSymbol().alias || source.GetSymbol().symbol.name
        }`);

        this.source = source, this.dest = dest;
        
        this.destRoot = this.editor.GetGeneratedBys(dest).pop() || dest;
    }
    
    Paste_(source, dest){
        let from = this.destRoot.GetSymbol().symbol.name, to = source.GetSymbol().symbol.name;
        let path = this.editor.productionPaths[from][to];
        
        if (!path){
            assert(false);
            return;
        }

        path = path.slice(0, path.length - 1); // everything but the last production step
        path = path.map(rhsSymbol => rhsSymbol.Clone()); // blocks cannot have shared aliasedsymbols because of aliases and tooltips

        let pathElem = this.editor.CreateElemSequence(path);

        if (pathElem){
            let root = this.editor.GetGeneratedBys(pathElem).pop() || pathElem;
            root.GetSymbol().alias = this.destRoot.GetSymbol().alias;
            root.GetSymbol().tooltip = this.destRoot.GetSymbol().tooltip;

            pathElem.SetSelectedSymbol(
                pathElem.GetAlternateSymbols().findIndex(sym=> to === sym.symbol.name)
            );
        }  

        source.SetGeneratedBy(pathElem);
        dest.GetParent().InsertBeforeElem(dest, source);
        dest.GetParent().RemoveElem(dest);

        return source;
    }

    GetPasteResult(){
        return this.pasteResult;
    }

    Execute(){
        this.pasteResult = this.Paste_(this.source, this.dest);
        assert(this.pasteResult);
        
        this.editor.Select(this.pasteResult);
    }

    Undo(){
        let parent = this.pasteResult.GetParent();

        parent.InsertAfterElem(this.pasteResult, this.dest);
        parent.RemoveElem(this.pasteResult);

        this.editor.Select(this.dest);
    }

    Redo(){
        let parent = this.dest.GetParent();

        parent.InsertBeforeElem(this.dest, this.pasteResult);
        parent.RemoveElem(this.dest);

        this.editor.Select(this.pasteResult);
    }
    
}