import { EditorElementTypes } from "../Editor/EditorElements/EditorElement.js";
import { assert } from "../Utils/Assert.js";

export class AstHost {

    acceptors = {};
    visitor;

    constructor(visitor){
        this.visitor = visitor;
        this.InitAcceptors();
    }
    
    InitAcceptors() {
        this.acceptors[EditorElementTypes.Group]            = (elem) => this.Accept_GroupBlock(elem);
        this.acceptors[EditorElementTypes.RepetitionGroup]  = (elem) => this.Accept_RepetitionGroupBlock(elem);
        this.acceptors[EditorElementTypes.SelectionBlock]   = (elem) => this.Accept_SelectionBlock(elem);
        this.acceptors[EditorElementTypes.SimpleBlock]      = (elem) => this.Accept_SimpleBlock(elem);
        this.acceptors[EditorElementTypes.InputBlock]       = (elem) => this.Accept_InputBlock(elem);
        this.acceptors[EditorElementTypes.OptionalBlock]    = (elem) => this.Accept_OptionalBlock(elem);
        this.acceptors[EditorElementTypes.NewLine]          = (elem) => this.Accept_NewLineBlock(elem);
        this.acceptors[EditorElementTypes.Tab]              = (elem) => this.Accept_TabBlock(elem);
    }
    
    Accept(elem){
        this.acceptors[elem.GetType()](elem);
    }

    AcceptContainerBlock_(elem){
        let children = elem.GetElems();
        
        for (let child of children)
            this.Accept(child);

        this.visitor.Visit(elem);
    }

    Accept_GroupBlock(elem) {
        assert(elem.GetType() === EditorElementTypes.Group);
        this.AcceptContainerBlock_(elem);
    }

    Accept_RepetitionGroupBlock(elem) {
        assert(elem.GetType() === EditorElementTypes.RepetitionGroup);
        this.AcceptContainerBlock_(elem);
    }

    Accept_SelectionBlock(elem) {
        assert(elem.GetType() === EditorElementTypes.SelectionBlock);
        this.visitor.Visit(elem);
    }

    Accept_SimpleBlock(elem) {
        assert(elem.GetType() === EditorElementTypes.SimpleBlock);
        this.visitor.Visit(elem);
    }

    Accept_InputBlock(elem) {
        assert(elem.GetType() === EditorElementTypes.InputBlock);
        this.visitor.Visit(elem);
    }

    Accept_OptionalBlock(elem) {
        assert(elem.GetType() === EditorElementTypes.OptionalBlock);
        this.visitor.Visit(elem);
    }

    Accept_NewLineBlock(elem) {
        assert(elem.GetType() === EditorElementTypes.NewLine);
        this.visitor.Visit(elem);
    }

    Accept_TabBlock(elem) {
        assert(elem.GetType() === EditorElementTypes.Tab);
        this.visitor.Visit(elem);
    }

}