import { EditorElementTypes } from "../Editor/EditorElements/EditorElement.js";

export class AstVisitor {

    baseVisitors_   = {};
    visitors        = {};

    constructor(){
        this.InitBaseVisitors();
    }

    LogVisit_(elem){
        console.log( `Visited ${elem.GetType()} ` + (elem.GetSymbol?.().symbol.name || '') );
    }

    /* Subclass may overide */

    Visit_GroupBlock(elem)              { this.LogVisit_(elem); }
    Visit_RepetitionGroupBlock(elem)    { this.LogVisit_(elem); }
    Visit_SelectionBlock(elem)          { this.LogVisit_(elem); }
    Visit_SimpleBlock(elem)             { this.LogVisit_(elem); }
    Visit_InputBlock(elem)              { this.LogVisit_(elem); }
    Visit_OptionalBlock(elem)           { this.LogVisit_(elem); }
    Visit_NewLineBlock(elem)            { this.LogVisit_(elem); }
    Visit_TabBlock(elem)                { this.LogVisit_(elem); }

    //

    Visit(elem){
        let id = elem.GetSymbol?.().symbol.name;

        if (id && this.visitors[id]){
            return this.visitors[id](elem);
        }
        else if (this.baseVisitors_[elem.GetType()]){
            return this.baseVisitors_[elem.GetType()](elem);
        }

        return undefined;
    }

    InitBaseVisitors() {
        this.visitors[EditorElementTypes.Group]            = (elem) => this.Visit_GroupBlock(elem);
        this.visitors[EditorElementTypes.RepetitionGroup]  = (elem) => this.Visit_RepetitionGroupBlock(elem);
        this.visitors[EditorElementTypes.SelectionBlock]   = (elem) => this.Visit_SelectionBlock(elem);
        this.visitors[EditorElementTypes.SimpleBlock]      = (elem) => this.Visit_SimpleBlock(elem);
        this.visitors[EditorElementTypes.InputBlock]       = (elem) => this.Visit_InputBlock(elem);
        this.visitors[EditorElementTypes.OptionalBlock]    = (elem) => this.Visit_OptionalBlock(elem);
        this.visitors[EditorElementTypes.NewLine]          = (elem) => this.Visit_NewLineBlock(elem);
        this.visitors[EditorElementTypes.Tab]              = (elem) => this.Visit_TabBlock(elem);
    }

    SetVisitor(symbolName, f){
        this.visitors[symbolName] = f;
    }
}