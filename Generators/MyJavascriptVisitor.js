import { AstVisitor } from "./AstVisitor.js";
import { assert } from '../Utils/Assert.js';
import { EditorElementTypes } from '../Editor/EditorElements/EditorElement.js';
import { ReservedWords } from '../Utils/ReservedWords.js';

export class MyJavascriptVisitor extends AstVisitor {

    stack=[];
    scopeStack= [
       {
           args: [],
           vars: [],
           funcs: []
       } 
    ];

    operators = {
        'MEMBER_ACCESS':            { js: '.',      precedence: 20,   associativity: 'left',    },
        'BRACE_MEMBER_ACCESS':      { js: '[]',     precedence: 20,   associativity: 'left',    },
        'PARENTHESIS_CALL':         { js: '()',     precedence: 20,   associativity: 'left',    },
        'OBJECT_PAIR':              { js: ':',      precedence: 20,   associativity: 'left'     },
        'PLUS_PLUS':                { js: '++',     precedence: 17,   associativity: 'right'    },
        'SUB_SUB':                  { js: '--',     precedence: 17,   associativity: 'right'    },
        'UMINUS':                   { js: '-',      precedence: 17,   associativity: 'right',   assocParenthesis: 'when_same_ops'  },
        'UPLUS':                    { js: '+',      precedence: 17,   associativity: 'right',   assocParenthesis: 'when_same_ops'  },
        'PLUS':                     { js: '+',      precedence: 14,   associativity: 'left',    assocParenthesis: 'never'   },
        'SUB':                      { js: '-',      precedence: 14,   associativity: 'left',    assocParenthesis: 'never'   },
        'MULT':                     { js: '*',      precedence: 15,   associativity: 'left',    assocParenthesis: 'when_different_ops'  },
        'EXP':                      { js: '**',     precedence: 15,   associativity: 'right',   assocParenthesis: 'when_different_ops'  },
        'DIV':                      { js: '/',      precedence: 15,   associativity: 'left',    assocParenthesis: 'always'  },
        'MODULO':                   { js: '%',      precedence: 15,   associativity: 'left',    assocParenthesis: 'always'  },
        'GREATER':                  { js: '>',      precedence: 12,   associativity: 'left',    assocParenthesis: 'always'  },
        'LESS':                     { js: '<',      precedence: 12,   associativity: 'left',    assocParenthesis: 'always'  },
        'EQUAL_TO':                 { js: '==',     precedence: 11,   associativity: 'left',    assocParenthesis: 'always'  },
        'EQUAL_VALUE_TYPE':         { js: '===',    precedence: 11,   associativity: 'left',    assocParenthesis: 'always'  },
        'NOT_EQUAL_TO':             { js: '!==',    precedence: 11,   associativity: 'left',    assocParenthesis: 'always'  },
        'NOT_EQUAL_VALUE_TYPE':     { js: '!===',   precedence: 11,   associativity: 'left',    assocParenthesis: 'always'  },
        'GREATER_EQUAL':            { js: '>=',     precedence: 12,   associativity: 'left',    assocParenthesis: 'always'  },
        'LESS_EQUAL':               { js: '<=',     precedence: 12,   associativity: 'left',    assocParenthesis: 'always'  },
        'AND':                      { js: '&&',     precedence: 7,    associativity: 'left',    assocParenthesis: 'never'   },
        'OR':                       { js: '||',     precedence: 6,    associativity: 'left',    assocParenthesis: 'never'   },
        'NOT':                      { js: '!',      precedence: 17,   associativity: 'right',   assocParenthesis: 'never'   },
        'ASSIGN':                   { js: '=',      precedence: 3,    associativity: 'right',   assocParenthesis: 'never'   },
        'PLUS_ASSIGN':              { js: '+=',     precedence: 3,    associativity: 'right',   assocParenthesis: 'never'   },
        'SUB_ASSIGN':               { js: '-=',     precedence: 3,    associativity: 'right',   assocParenthesis: 'never'   },
        'MULT_ASSIGN':              { js: '*=',     precedence: 3,    associativity: 'right',   assocParenthesis: 'never'   },
        'DIV_ASSIGN':               { js: '/=',     precedence: 3,    associativity: 'right',   assocParenthesis: 'never'   },
        'MOD_ASSIGN':               { js: '%=',     precedence: 3,    associativity: 'right',   assocParenthesis: 'never'   },
        'EXP_ASSIGN':               { js: '**=',    precedence: 3,    associativity: 'right',   assocParenthesis: 'never'   },
    };

    currTabs = 0;
    currTabStr = '';

    IncreaseTabs(){
        this.currTabs++;
        this.currTabStr += '\t';
    }

    DecreaseTabs(){
        assert(this.currTabs >= 1, 'Trying to decrease to negative tabs');
        this.currTabs--;

        this.currTabStr = '\t'.repeat(this.currTabs);
    }

    TabIn(str, tabs = this.currTabs){
        if (tabs === 0)
            return str;
        
        if (tabs = this.currTabs)
            return this.currTabStr + str;
        else
            return '\t'.repeat(tabs) + str;
    }

    constructor() {
        super();
        this.InitVisitors();
    }

    InitVisitors() {
        this.SetVisitor( 'program',                 elem => this.Visit_Program(elem) );
        this.SetVisitor( 'stmts',                   elem => this.Visit_Stmts(elem) );
        this.SetVisitor( 'stmt',                    elem => this.Visit_Stmt(elem) );
        this.SetVisitor( 'defs',                    elem => this.Visit_Defs(elem) );
        this.SetVisitor( 'def',                     elem => this.Visit_Def(elem) );
        this.SetVisitor( 'consts',                  elem => this.Visit_Consts(elem) );
        this.SetVisitor( 'variable',                elem => this.Visit_Variable(elem) );
        this.SetVisitor( 'types',                   elem => this.Visit_Types(elem) );
        this.SetVisitor( 'ident_type',              elem => this.Visit_IdentType(elem) );
        this.SetVisitor( 'type_of',                 elem => this.Visit_TypeOf(elem) );

        this.SetVisitor( 'if_stmt',                 elem => this.Visit_IfStmt(elem) );
        this.SetVisitor( 'if_else_stmt',            elem => this.Visit_IfElseStmt(elem) );
        this.SetVisitor( 'while_stmt',              elem => this.Visit_WhileStmt(elem) );
        this.SetVisitor( 'for_stmt',                elem => this.Visit_ForStmt(elem) );
        this.SetVisitor( 'expr',                    elem => this.Visit_Expr(elem) );
        this.SetVisitor( 'ternary_stmt',            elem => this.Visit_TernaryStmt(elem));
        this.SetVisitor( 'break_stmt',              elem => this.Visit_BreakStmt(elem) );
        this.SetVisitor( 'continue_stmt',           elem => this.Visit_ContinueStmt(elem) );
        this.SetVisitor( 'return_stmt',             elem => this.Visit_ReturnStmt(elem) );

        this.SetVisitor( 'func_definition',         elem => this.Visit_FuncDef(elem) );
        this.SetVisitor( 'named_func',              elem => this.Visit_NamedFunc(elem));
        this.SetVisitor( 'anonymous_func',          elem => this.Visit_AnonymousFunc(elem));
        this.SetVisitor( 'new_array',               elem => this.Visit_NewArray(elem));
        this.SetVisitor( 'new_object',              elem => this.Visit_NewObject(elem));
    
        this.SetVisitor( 'arith_expr',              elem => this.Visit_ArithExpr(elem) );
        this.SetVisitor( 'rel_expr',                elem => this.Visit_RelExpr(elem) );
        this.SetVisitor( 'logical_expr',            elem => this.Visit_LogicalExpr(elem) );
        this.SetVisitor( 'assign_expr',             elem => this.Visit_AssignExpr(elem) );
        this.SetVisitor( 'call_expr',               elem => this.Visit_CallExpr(elem) );
        this.SetVisitor( 'primary_expr',            elem => this.Visit_PrimaryExpr(elem) );
        this.SetVisitor( 'binary_arith_expr',       elem => this.Visit_BinaryArithExpr(elem) );
        this.SetVisitor( 'unary_expr',              elem => this.Visit_UnaryExpr(elem) );
        this.SetVisitor( 'unary_expr_before',       elem => this.Visit_UnaryExprBefore(elem) );
        this.SetVisitor( 'unary_expr_after',        elem => this.Visit_UnaryExprAfter(elem) );
        
        this.SetVisitor( 'arith_op',                elem => this.Visit_ArithOp(elem) );
        this.SetVisitor( 'rel_op',                  elem => this.Visit_RelOp(elem) );
        this.SetVisitor( 'logical_binary_op',       elem => this.Visit_LogicalBinaryOp(elem) );
        this.SetVisitor( 'unary_op_af',             elem => this.Visit_UnaryOpAfter(elem) );
        this.SetVisitor( 'unary_op_bf',             elem => this.Visit_UnaryOpBefore(elem) );
        this.SetVisitor( 'assign_op',               elem => this.Visit_AssignOp(elem) );

        this.SetVisitor( 'binary_logical_expr',     elem => this.Visit_BinaryLogicalExpr(elem) );
        this.SetVisitor( 'not_expr',                elem => this.Visit_NotExpr(elem) );
        this.SetVisitor( 'BOOLEAN_CONST',           elem => this.Visit_BoolConst(elem) );
        this.SetVisitor( 'ARRAY_CONST',             elem => this.Visit_ArrayConst(elem) );
        this.SetVisitor( 'OBJECT_CONST',            elem => this.Visit_ObjectConst(elem) );

        this.SetVisitor( 'ident_list',              elem => this.Visit_IdentList(elem) );
        this.SetVisitor( 'expr_list',               elem => this.Visit_ExprList(elem) );
        this.SetVisitor( 'element_list',            elem => this.Visit_ElementList(elem) );
        this.SetVisitor( 'pair_element_list',       elem => this.Visit_PairElementList(elem) );
        this.SetVisitor( 'pair_element',            elem => this.Visit_PairElement(elem) );

        this.SetVisitor( 'math_call',               elem => this.Visit_MathCall(elem) );
        this.SetVisitor( 'string_method_call',      elem => this.Visit_StringMethodCall(elem) );
        this.SetVisitor( 'array_method_call',       elem => this.Visit_ArrayMethodCall(elem) );
        this.SetVisitor( 'object_method_call',      elem => this.Visit_ObjectMethodCall(elem) );
        this.SetVisitor( 'function_call',           elem => this.Visit_FunctionCall(elem) );
        this.SetVisitor( 'print_call',              elem => this.Visit_PrintCall(elem) );
        this.SetVisitor( 'callee',                  elem => this.Visit_Callee(elem) );
        this.SetVisitor( 'object_function',         elem => this.Visit_ObjectFunction(elem) );
        this.SetVisitor( 'array_function',          elem => this.Visit_ArrayFunction(elem) );

        this.SetVisitor( 'math_abs',                elem => this.Visit_MathAbs(elem) );
        this.SetVisitor( 'math_pow',                elem => this.Visit_MathPow(elem) );
        this.SetVisitor( 'math_sqrt',               elem => this.Visit_MathSqrt(elem) );
        this.SetVisitor( 'math_round',              elem => this.Visit_MathRound(elem) );
        this.SetVisitor( 'math_floor',              elem => this.Visit_MathFloor(elem) );
        this.SetVisitor( 'math_ceil',               elem => this.Visit_MathCeil(elem) );
        this.SetVisitor( 'math_sin',                elem => this.Visit_MathSin(elem) );
        this.SetVisitor( 'math_cos',                elem => this.Visit_MathCos(elem) );
        
        this.SetVisitor( 'string_method',           elem => this.Visit_StringMethod(elem) );
        this.SetVisitor( 'string_concat',           elem => this.Visit_StringConcat(elem) );
        this.SetVisitor( 'string_upperCase',        elem => this.Visit_StringUpperCase(elem) );
        this.SetVisitor( 'string_lowCase',          elem => this.Visit_StringLowCase(elem) );
        this.SetVisitor( 'string_substring',        elem => this.Visit_StringSubstring(elem) );
        this.SetVisitor( 'string_size',             elem => this.Visit_StringSize(elem) );
        this.SetVisitor( 'string_slice',            elem => this.Visit_StringSlice(elem) );

        this.SetVisitor( 'array_get',               elem => this.Visit_ArrayGet(elem) );
        this.SetVisitor( 'array_push',              elem => this.Visit_ArrayPush(elem) );
        this.SetVisitor( 'array_pop',               elem => this.Visit_ArrayPop(elem) );
        this.SetVisitor( 'array_set',               elem => this.Visit_ArraySet(elem) );
        this.SetVisitor( 'array_size',              elem => this.Visit_ArraySize(elem) );
        this.SetVisitor( 'array_join',              elem => this.Visit_ArrayJoin(elem) );
        this.SetVisitor( 'array_to_string',         elem => this.Visit_ArrayToString(elem) );

        this.SetVisitor( 'object_get',              elem => this.Visit_ObjectGet(elem) );
        this.SetVisitor( 'object_delete',           elem => this.Visit_ObjectDelete(elem) );
        this.SetVisitor( 'object_set',              elem => this.Visit_ObjectSet(elem) );
        this.SetVisitor( 'object_size',             elem => this.Visit_ObjectSize(elem) );
        this.SetVisitor( 'object_get_sq',           elem => this.Visit_ObjectGetSq(elem) );
        this.SetVisitor( 'object_get_dot',          elem => this.Visit_ObjectGetDot(elem) );

        this.SetVisitor( 'IDENT',                   elem => this.Visit_Ident(elem) );
        this.SetVisitor( 'INT_CONST',               elem => this.Visit_IntConst(elem) );
        this.SetVisitor( 'FLOAT_CONST',             elem => this.Visit_FloatConst(elem) );
        this.SetVisitor( 'BOOL_CONST',              elem => this.Visit_BoolConst(elem) );
        this.SetVisitor( 'CHAR_CONST',              elem => this.Visit_CharConst(elem) );
        this.SetVisitor( 'STRING_CONST',            elem => this.Visit_StringConst(elem) );

        this.SetVisitor( 'PLUSPLUS',                elem => this.Visit_PlusPlus(elem) );
        this.SetVisitor( 'SUBSUB',                  elem => this.Visit_SubSub(elem) );
        this.SetVisitor( 'UMINUS',                  elem => this.Visit_Uminus(elem) );
        this.SetVisitor( 'UPLUS',                   elem => this.Visit_Uplus(elem) );
        this.SetVisitor( 'PLUS',                    elem => this.Visit_Plus(elem) );
        this.SetVisitor( 'SUB',                     elem => this.Visit_Sub(elem) );
        this.SetVisitor( 'MULT',                    elem => this.Visit_Mult(elem) );
        this.SetVisitor( 'DIV',                     elem => this.Visit_Div(elem) );
        this.SetVisitor( 'EXP',                     elem => this.Visit_Exp(elem) );
        this.SetVisitor( 'MODULO',                  elem => this.Visit_Modulo(elem) );
        this.SetVisitor( 'GREATER',                 elem => this.Visit_Greater(elem) );
        this.SetVisitor( 'LESS',                    elem => this.Visit_Less(elem) );
        this.SetVisitor( 'EQUAL_TO',                elem => this.Visit_EqualTo(elem) );
        this.SetVisitor( 'EQUAL_VALUE_TYPE',        elem => this.Visit_EqualValueType(elem) );
        this.SetVisitor( 'NOT_EQUAL_TO',            elem => this.Visit_NotEqualTo(elem) );
        this.SetVisitor( 'NOT_EQUAL_VALUE_TYPE',    elem => this.Visit_NotEqualValueType(elem) );
        this.SetVisitor( 'GREATER_EQUAL',           elem => this.Visit_GreaterEqual(elem) );
        this.SetVisitor( 'LESS_EQUAL',              elem => this.Visit_LessEqual(elem) );
        this.SetVisitor( 'AND',                     elem => this.Visit_And(elem) );
        this.SetVisitor( 'OR',                      elem => this.Visit_Or(elem) );
        this.SetVisitor( 'NOT',                     elem => this.Visit_Not(elem) );
        this.SetVisitor( 'ASSIGN',                  elem => this.Visit_Assign(elem) );
        this.SetVisitor( 'PLUS_ASSIGN',             elem => this.Visit_PlusAssign(elem) );
        this.SetVisitor( 'SUB_ASSIGN',              elem => this.Visit_SubAssign(elem) );
        this.SetVisitor( 'MULT_ASSIGN',             elem => this.Visit_MultAssign(elem) );
        this.SetVisitor( 'DIV_ASSIGN',              elem => this.Visit_DivAssign(elem) );
        this.SetVisitor( 'MOD_ASSIGN',              elem => this.Visit_ModAssign(elem) );
        this.SetVisitor( 'EXP_ASSIGN',              elem => this.Visit_ExpAssign(elem) );
        this.SetVisitor( 'LP',                      elem => this.Visit_LeftParenth(elem) );
        this.SetVisitor( 'RP',                      elem => this.Visit_RightParenth(elem) );
        this.SetVisitor( 'LB',                      elem => this.Visit_LeftBracket(elem) );
        this.SetVisitor( 'RB',                      elem => this.Visit_RightBracket(elem) );
        this.SetVisitor( 'LSB',                     elem => this.Visit_LeftSquareBracket(elem) );
        this.SetVisitor( 'RSB',                     elem => this.Visit_RightSquareBracket(elem) );
        this.SetVisitor( 'COLON',                   elem => this.Visit_Colon(elem) );
        this.SetVisitor( 'SEMICOLON',               elem => this.Visit_Semicolon(elem) );
        this.SetVisitor( 'DOT',                     elem => this.Visit_Dot(elem) );
        this.SetVisitor( 'QM',                      elem => this.Visit_QuestionMark(elem) );
        this.SetVisitor( 'PARENTH_CALL',            elem => this.Visit_ParenthCall(elem) );
  
        this.SetVisitor( 'true',                    elem => this.Visit_True(elem) );
        this.SetVisitor( 'false',                   elem => this.Visit_False(elem) );
        this.SetVisitor( 'break',                   elem => this.Visit_Break(elem) );
        this.SetVisitor( 'continue',                elem => this.Visit_Continue(elem) );
        this.SetVisitor( 'return',                  elem => this.Visit_Return(elem) );
        this.SetVisitor( 'if',                      elem => this.Visit_If(elem) );
        this.SetVisitor( 'else',                    elem => this.Visit_Else(elem) );
        this.SetVisitor( 'while',                   elem => this.Visit_While(elem) );
        this.SetVisitor( 'for',                     elem => this.Visit_For(elem) );
        this.SetVisitor( 'function',                elem => this.Visit_Function(elem) );

        this.SetVisitor( 'var',                     elem => this.Visit_Var(elem) );        
        this.SetVisitor( 'let',                     elem => this.Visit_Let(elem) );
        this.SetVisitor( 'const',                   elem => this.Visit_Const(elem) );        
    
        this.SetVisitor( 'abs',                     elem => this.Visit_Abs(elem) );
        this.SetVisitor( 'pow',                     elem => this.Visit_Pow(elem) );
        this.SetVisitor( 'sqrt',                    elem => this.Visit_Sqrt(elem) );
        this.SetVisitor( 'round',                   elem => this.Visit_Round(elem) );
        this.SetVisitor( 'floor',                   elem => this.Visit_Floor(elem) );
        this.SetVisitor( 'ceil',                    elem => this.Visit_Ceil(elem) );
        this.SetVisitor( 'sin',                     elem => this.Visit_Sin(elem) );
        this.SetVisitor( 'cos',                     elem => this.Visit_Cos(elem) );

        this.SetVisitor( 'length',                  elem => this.Visit_Length(elem) );
        this.SetVisitor( 'concat',                  elem => this.Visit_Concats(elem) );
        this.SetVisitor( 'toUpperCase',             elem => this.Visit_ToUpperCase(elem) );
        this.SetVisitor( 'toLowerCase',             elem => this.Visit_ToLowerCase(elem) );
        this.SetVisitor( 'substring',               elem => this.Visit_Substring(elem) );      
        this.SetVisitor( 'slice',                   elem => this.Visit_Slice(elem) );
        this.SetVisitor( 'push',                    elem => this.Visit_Push(elem) );
        this.SetVisitor( 'pop',                     elem => this.Visit_Pop(elem) );
        this.SetVisitor( 'join',                    elem => this.Visit_Join(elem) );
        this.SetVisitor( 'tostring',                elem => this.Visit_toString(elem) );
        this.SetVisitor( 'delete',                  elem => this.Visit_Delete(elem) );
    }

    HandleVarDeclaration(id){
        if (    
            !this.scopeStack.some(f =>
                f.funcs.includes(id)    ||
                f.vars.includes(id)     ||
                f.args.includes(id)
            )
        )
            this.scopeStack[this.scopeStack.length - 1].vars.push(id);
    }

    PopScopeVars(){
        let vars = this.scopeStack.pop().vars.join(', ');

        if (vars)
            vars = `var ${vars};\n`;

        return vars;
    }

    PopChildrenFromStack(elem, resultKeys) {
        let numChildren =   elem.GetElems().length;

        if (resultKeys)
            assert(
                numChildren === resultKeys.length,
                `Expected node of type ${elem.GetSymbol().symbol} to have ${resultKeys.length} children but it has ${numChildren}`
            );

        assert(numChildren <= this.stack.length);

        let childrenCode = [];

        for (let i = 0; i < numChildren; ++i)
            childrenCode.unshift(this.stack.pop());

        if (!resultKeys)
            return childrenCode;
        else {
            let result  = {};
    
            for (let i = 0; i < numChildren; ++i)
                result[resultKeys[i]] = childrenCode[i];
        
            return result;
        }
    }

    HandleSemicolon(elem, code){
        let parent = elem.GetParent()?.GetSymbol().symbol.name;
        if (parent === 'stmts' || parent === 'defs')
            return code + ';'
        else
            return code;
    }

    ShouldParenthesize(outerOp, innerOp, innerOpPosition){
        if (innerOp.precedence < outerOp.precedence)
            return true;

        if (innerOp.precedence == outerOp.precedence){
            if (innerOp.assocParenthesis){
                switch(innerOp.assocParenthesis){
                    case 'always':
                        return true;
                    case 'never':
                        return false;
                    case 'when_different_ops':
                        return innerOp !== outerOp;
                    case 'when_same_ops':
                        return innerOp === outerOp;
                }
            }

            return innerOp.associativity !== innerOpPosition;
        }

        return false;
    }

    HandleBinaryExpr(elem){
        let code = this.PopChildrenFromStack(elem, ['expr1', 'op', 'expr2']);

        let elems = elem.GetElems();

        let outerOp = this.ToOperator(elems[1]), op1 = this.GetChildOperator(elems[0]), op2 = this.GetChildOperator(elems[2]);

        if ( op1 && this.ShouldParenthesize(outerOp, op1, 'left') )
            code.expr1 = `(${code.expr1})`;
        
        if ( op2 && this.ShouldParenthesize(outerOp, op2, 'right') )
            code.expr2 = `(${code.expr2})`;

        this.stack.push(
            this.HandleSemicolon(elem, `${code.expr1} ${code.op} ${code.expr2}`)
        );
    }

    HandleLeftUnaryExpr(elem){
        let code = this.PopChildrenFromStack(elem, ['op', 'expr']);

        let elems = elem.GetElems();

        let outerOp = this.ToOperator(elems[0]), op = this.GetChildOperator(elems[1]);
        
        if ( op && this.ShouldParenthesize(outerOp, op, 'right') )
            code.expr = `(${code.expr})`;

        this.stack.push(
            this.HandleSemicolon(elem, `${code.op}${code.expr}`)
        );
    }

    HandleRightUnaryExpr(elem){
        let code = this.PopChildrenFromStack(elem, ['expr', 'op']);

        let elems = elem.GetElems();

        let outerOp = this.ToOperator(elems[0]), op = this.GetChildOperator(elems[1]);
        
        if ( op && this.ShouldParenthesize(outerOp, op, 'left') )
            code.expr = `(${code.expr})`;

        this.stack.push(
            this.HandleSemicolon(elem, `${code.op}${code.expr}`)
        );
    }

    ToOperator(elem){
        if (elem.GetType() !== EditorElementTypes.SimpleBlock && elem.GetType() !== EditorElementTypes.SelectionBlock)
            return false;

        let op = elem.GetSymbol().symbol.name;

        /* handle operator placeholders */
        switch (op) {
            case 'arith_op':            return this.operators.PLUS;
            case 'rel_op':              return this.operators.GREATER;
            case 'logical_binary_op':   return this.operators.AND;
            case 'array_method':        return this.operators.MEMBER_ACCESS;
            case 'string_method':       return this.operators.MEMBER_ACCESS;
        }

        return this.operators[op];
    }

    GetChildOperator(elem){
        if (elem.GetType() !== EditorElementTypes.Group)
            return;

        /* Handle unary and binary arithmetic, relative, logical expressions */

        let children = elem.GetElems();

        for (let i = 0; i < children.length && i < 2; ++i){
            let operator = this.ToOperator(children[i]);

            if (operator) return operator;
        }

        /* Handle operators that appear in the generated code but not on the source blocks */

        let name = elem.GetSymbol().symbol.name;

        switch (name) {
            case 'math_abs':                    return this.operators.MEMBER_ACCESS;
            case 'math_pow':                    return this.operators.MEMBER_ACCESS;
            case 'math_sqrt':                   return this.operators.MEMBER_ACCESS;
            case 'math_round':                  return this.operators.MEMBER_ACCESS;
            case 'math_floor':                  return this.operators.MEMBER_ACCESS;
            case 'math_ceil':                   return this.operators.MEMBER_ACCESS;
            case 'math_sin':                    return this.operators.MEMBER_ACCESS;
            case 'math_cos':                    return this.operators.MEMBER_ACCESS;
            
            case 'array_get':                   return this.operators.MEMBER_ACCESS;
            case 'array_pop':                   return this.operators.MEMBER_ACCESS;
            case 'array_push':                  return this.operators.MEMBER_ACCESS;
            case 'array_set':                   return this.operators.EQUALS;
            
            case 'object_get_dot':              return this.operators.MEMBER_ACCESS;
            case 'object_get_sq':               return this.operators.MEMBER_ACCESS;
            case 'object_delete':               return this.operators.MEMBER_ACCESS;
            case 'object_set':                  return this.operators.EQUALS;

            case 'length':                      return this.operators.MEMBER_ACCESS;

            case 'string_concat':               return this.operators.MEMBER_ACCESS;
            case 'string_upperCase':            return this.operators.MEMBER_ACCESS;
            case 'string_lowCase':              return this.operators.MEMBER_ACCESS;
            case 'string_substring':            return this.operators.MEMBER_ACCESS;
            case 'string_slice':                return this.operators.MEMBER_ACCESS;

            case 'array_method_call':           return this.ToOperator(elem.GetElems()[3]) || this.GetChildOperator(elem.GetElems()[3]);
            case 'string_method_call':          return this.ToOperator(elem.GetElems()[3]) || this.GetChildOperator(elem.GetElems()[3]);
            case 'object_method_call':          return this.ToOperator(elem.GetElems()[3]) || this.GetChildOperator(elem.GetElems()[3]);
        }
    }

    GetResult(){
        if (this.stack.length === 1)
            return this.stack[0];
        else 
            assert(false, 'stack is either empty or contains more than 1 element');
    }

    Visit_Program(elem) {
        assert(false);
    }

    Visit_Stmts(elem) {
        console.log("stmts");
        let childrenCode = this.PopChildrenFromStack(elem).map( stmt => this.TabIn(stmt) ).join('\n');

        if (elem.GetParent()){
            this.stack.push(childrenCode);
        }else
            this.stack.push(
                this.TabIn( this.PopScopeVars() ) + childrenCode 
            );
    }

    Visit_Defs(elem) {
        let childrenCode = this.PopChildrenFromStack(elem).map( stmt => this.TabIn(stmt) ).join('\n');
        let vars = this.TabIn( this.PopScopeVars() );

        this.stack.push(vars + childrenCode);
    }

    Visit_Stmt(elem) {
        this.stack.push( ';' );
    }

    Visit_Def(elem) {
        this.stack.push( ';' );
    }

    Visit_Consts(elem)                  {this.stack.push(null);} //??
    Visit_Variable(elem)                {this.stack.push(null);} //??
    Visit_Types(elem)                   {this.stack.push('');} //??

    Visit_IdentType(elem) {
        let code = this.PopChildrenFromStack(elem, ['type', 'ident']);
        this.stack.push(`${code.type} ${code.ident};`);
    } 

    //??
    Visit_TypeOf(elem) {
        let code = this.PopChildrenFromStack(elem, ['typeof', 'item']);
        this.stack.push(`typeof ${code.item}`);
    }

    Visit_IfStmt(elem) {
        console.log("if");
        let code = this.PopChildrenFromStack(elem, ['if','lp','expr','rp','lb','stmts','rb']);
        console.log();
        this.DecreaseTabs();
        
        let rBrace = this.TabIn('}');

        this.stack.push( `${code.if} ${code.lp} ${code.expr} ${code.rp} ${code.lb}\n${code.stmts}\n${rBrace}` );
    }

    Visit_IfElseStmt(elem){
        // let code = this.PopChildrenFromStack(elem, ['if','(', 'expr',')','{', 'stmts1','}', 'else','{', 'stmts2', '}']);
        
        // this.DecreaseTabs();

        // let rBrace = this.TabIn('}');
        // let else_ = this.TabIn('else');

        // this.stack.push( `if (${code.expr}) {\n${code.stmts1}\n${rBrace}\n${else_} {\n${code.stmts2}\n${rBrace}` );
    }

    Visit_WhileStmt(elem){
        // let code = this.PopChildrenFromStack(elem, ['while','(', 'expr',')', '{', 'stmts', '}']);

        // this.DecreaseTabs();
        // let rBrace = this.TabIn('}');

        // this.stack.push( `while (${code.expr}) {\n${code.stmts}\n${rBrace}` );
    }

    Visit_ForStmt(elem){
        // let code = this.PopChildrenFromStack(elem, ['for','(', 'init',';', 'condition',';', 'step',')','{', 'stmts','}']);

        // this.DecreaseTabs();
        // let rBrace = this.TabIn('}');

        // this.stack.push( `for (${code.init}; ${code.condition}; ${code.step}) {\n${code.stmts}\n${rBrace}` );
    }

    Visit_Expr(elem){
        console.log("expr");
        this.stack.push(
            this.HandleSemicolon(elem, `0`)
        );
    }

    Visit_TernaryStmt(elem){
        // let code = this.PopChildrenFromStack(elem, ['expr', '?', 'expr1', ':', 'expr2']);
        // this.stack.push(`${code.expr} ? ${code.expr1} : ${code.expr2}`);
    }

    Visit_BreakStmt(elem) {
        assert(false);
    }

    Visit_ContinueStmt(elem){
        assert(false);
    }

    Visit_ReturnStmt(elem){
        let code = this.PopChildrenFromStack(elem, ['return', 'expr']);
        this.stack.push(`return ${code.expr};`);
    }

    //??
    Visit_FuncDef(elem){
        this.stack.push(null);
    }

    Visit_NamedFunc(elem){
        // let code = this.PopChildrenFromStack(elem, ['function', 'id', '(', 'params',')', '{', 'stmts', '}']);
        // let vars = this.TabIn( this.PopScopeVars() );

        // this.DecreaseTabs();
        // let rBrace = this.TabIn('}');

        // this.stack.push(`function ${code.id} (${code.params}) {\n${vars}\n${code.stmts}\n${rBrace}`);
    }

    Visit_AnonymousFunc(elem){
        // let code = this.PopChildrenFromStack(elem, ['function','(', 'params',')', '{', 'stmts', '}']);
        // let vars = this.TabIn( this.PopScopeVars() );

        // this.DecreaseTabs();
        // let rBrace = this.TabIn('}');

        // this.stack.push(`function (${code.params}) {\n${vars}\n${code.stmts}\n${rBrace}`);
    }    
    
    //??
    Visit_NewArray(elem){
        let code = this.PopChildrenFromStack(elem, ['array', '=', 'elements']);

        this.stack.push(
            this.HandleSemicolon(elem, `${code.array}=${code.elements}`)
        );
    }

    //??
    Visit_NewObject(elem){
        // let code = this.PopChildrenFromStack(elem, ['object', '=', 'elements']);

        // this.stack.push(
        //     this.HandleSemicolon(elem, `${code.object}=[${code.elements}]`)
        // );
    }

    Visit_ArithExpr(elem) {
        this.stack.push(
            this.HandleSemicolon(elem, `0`)
        );
    }

    Visit_RelExpr(elem){
        this.HandleBinaryExpr(elem);
    }

    Visit_LogicalExpr(elem){
        this.stack.push(
            this.HandleSemicolon(elem, `0`)
        );
    }

    Visit_AssignExpr(elem){
        this.HandleBinaryExpr(elem);
    }

    Visit_CallExpr(elem) {
        this.stack.push(
            this.HandleSemicolon(elem, `0`)
        );
    }

    Visit_PrimaryExpr(elem){
        this.stack.push(
            this.HandleSemicolon(elem, `0`)
        );
    }

    Visit_BinaryArithExpr(elem){
        this.HandleBinaryExpr(elem);
    }

    //??
    Visit_UnaryExpr(elem){
        this.stack.push(null);
    }

    Visit_UnaryExprBefore(elem){
        this.HandleLeftUnaryExpr(elem);
    }

    Visit_UnaryExprAfter(elem){
        this.HandleRightUnaryExpr(elem);
    }

    Visit_ArithOp(elem){
        this.stack.push(`+`);
    }

    Visit_RelOp(elem){
        this.stack.push(`>`);
    }

    Visit_LogicalBinaryOp(elem){
        this.stack.push(`&&`);
    }

    Visit_UnaryOpAfter(elem){
        this.stack.push(`++`);
    }

    Visit_UnaryOpBefore(elem){
        this.stack.push(`-`);
    }

    Visit_AssignOp(elem){
        this.stack.push(`=`);
    }

    Visit_BinaryLogicalExpr(elem){
        this.HandleBinaryExpr(elem);
    }

    Visit_NotExpr(elem){
        this.HandleLeftUnaryExpr(elem);
    }

    Visit_BoolConst(elem){
        this.stack.push(
            this.HandleSemicolon(elem, `false`)
        );
    }

    Visit_ArrayConst(elem){
        let code = this.PopChildrenFromStack(elem, ['[', 'elements', ']']);

        this.stack.push(
            this.HandleSemicolon(elem, `[${code.elements}]`)
        );
    }

    //?? 
    Visit_ObjectConst(elem){
        // let code = this.PopChildrenFromStack(elem, ['{', 'elements', '}']);

        // this.stack.push(
        //     this.HandleSemicolon(elem, `[${code.elements}]`)
        // );
    }

    Visit_IdentList(elem){
        let code = this.PopChildrenFromStack(elem).join(', ');
        this.stack.push(`${code}`);
    }

    Visit_ExprList(elem){
        let code = this.PopChildrenFromStack(elem).join(', ');
        this.stack.push(`${code}`);
    }

    Visit_ElementList(elem){
        let code = this.PopChildrenFromStack(elem).join(', ');
        this.stack.push(`${code}`);
    }

    //??
    Visit_PairElementList(elem){
        // let code = this.PopChildrenFromStack(elem).join(', ');
        // this.stack.push(`${code}`);
    }

    Visit_PairElement(elem){
        // let code = this.PopChildrenFromStack(elem, ['name', ':', 'value']);

        // this.stack.push(`${code.name} : ${code.value}`);
    }

    Visit_MathCall(elem){
        this.stack.push(
            this.HandleSemicolon(elem, `0`)
        );
    }

    //??
    Visit_StringMethodCall(elem){
        // let code = this.PopChildrenFromStack(elem, ['string', '.', 'method_call']);

        // let outerOp = this.ToOperator(elem.GetElems()[2]) || this.GetChildOperator(elem.GetElems()[2]);
        // let innerOp = this.GetChildOperator(elem.GetElems()[0]);

        // if ( innerOp && this.ShouldParenthesize(outerOp, innerOp, 'left') )
        //     code.string = `(${code.string})`;

        // this.stack.push(
        //     this.HandleSemicolon(elem, `${code.string}${code.method_call}`)
        // );
    }

    //??
    Visit_ArrayMethodCall(elem){
        this.stack.push(null);
    }

    //??
    Visit_ObjectMethodCall(elem){
        this.stack.push(null);
    }

    Visit_FunctionCall(elem){
        // let code = this.PopChildrenFromStack(elem, [ 'f', '(', 'args', ')']);

        // this.stack.push(
        //     this.HandleSemicolon(elem, `${code.f}(${code.args})`)
        // );
    }

    //?? na afiso window alert? 
    Visit_PrintCall(elem){
        // let code = this.PopChildrenFromStack(elem, ['console.log', '(', 'args', ')']);

        // this.stack.push(
        //     this.HandleSemicolon(elem, `window.alert(${code.args})`)
        // );
    }

    //??
    Visit_Callee(elem){
        //this.stack.push(null);
    }

    //??
    Visit_ObjectFunction(elem){
        // let code = this.PopChildrenFromStack(elem, ['object', '.', 'function']);

        // this.stack.push(`${code.object}.${code.function}`);
    }

    //??
    Visit_ArrayFunction(elem){
        // let code = this.PopChildrenFromStack(elem, ['array', '[', 'index', ']']);

        // this.stack.push(`${code.array}[${code.index}]`);
    } 

    Visit_MathAbs(elem){
        let code = this.PopChildrenFromStack(elem, ['Math', 'dot', 'abs', 'lp', 'number', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `Math ${code.dot} ${code.abs} ${code.lp} ${code.number} ${code.rp}`)
        );
    }

    Visit_MathPow(elem){
        let code = this.PopChildrenFromStack(elem, ['Math', 'dot', 'pow', 'lp', 'number', 'exponent', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `Math ${code.dot} ${code.pow} ${code.lp} ${code.number}, ${code.exponent} ${code.rp}`)
        );
    }

    Visit_MathSqrt(elem){
        let code = this.PopChildrenFromStack(elem, ['Math', 'dot', 'sqrt', 'lp', 'number', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `Math ${code.dot} ${code.sqrt} ${code.lp} ${code.number} ${code.rp}`)
        );
    }

    Visit_MathRound(elem){
        let code = this.PopChildrenFromStack(elem, ['Math', 'dot', 'round', 'lp', 'number', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `Math ${code.dot} ${code.round} ${code.lp} ${code.number} ${code.rp}`)
        );
    }

    Visit_MathFloor(elem){
        let code = this.PopChildrenFromStack(elem, ['Math', 'dot', 'floor', 'lp', 'number', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `Math ${code.dot} ${code.floor} ${code.lp} ${code.number} ${code.rp}`)
        );
    }

    Visit_MathCeil(elem){
        let code = this.PopChildrenFromStack(elem, ['Math', 'dot', 'ceil', 'lp', 'number', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `Math ${code.dot} ${code.ceil} ${code.lp} ${code.number} ${code.rp}`)
        );
    }

    Visit_MathSin(elem){
        let code = this.PopChildrenFromStack(elem, ['Math','dot', 'sin', 'lp', 'number', 'rp']);

        let innerOp = this.GetChildOperator(elem.GetElems()[4]);
        
        if ( innerOp && this.ShouldParenthesize(this.operators.BY, innerOp, 'left') )
            code.number = `(${code.number})`;

        this.stack.push(
            this.HandleSemicolon(elem, `Math ${code.dot} ${code.sin} ${code.lp} ${code.number} / 180 * Math.PI ${code.rp}`)
        );
    }

    Visit_MathCos(elem){
        let code = this.PopChildrenFromStack(elem, ['Math','dot', 'cos', 'lp', 'number', 'rp']);

        let innerOp = this.GetChildOperator(elem.GetElems()[4]);
        
        if ( innerOp && this.ShouldParenthesize(this.operators.BY, innerOp, 'left') )
            code.number = `(${code.number})`;

        this.stack.push(
            this.HandleSemicolon(elem, `Math ${code.dot} ${code.cos} ${code.lp} ${code.number} / 180 * Math.PI ${code.rp}`)
        );
    }

    //??
    Visit_StringMethod(elem){
        //this.stack.push(null);
    } 

    Visit_StringConcat(elem){
        // let code = this.PopChildrenFromStack(elem, ['concat', '(', 'string2', ')']);
        // this.stack.push(`.concat(${code.string2})`);
    }    

    Visit_StringUpperCase(elem){
        // let code = this.PopChildrenFromStack(elem, ['toUpperCase', '()']);
        // this.stack.push(`.toUpperCase()`);
    }

    Visit_StringLowCase(elem) {
        // let code = this.PopChildrenFromStack(elem, ['toLowerCase', '()']);
        // this.stack.push(`.toLowerCase()`);
    }

    Visit_StringSubstring(elem){
        // let code = this.PopChildrenFromStack(elem, ['substring', '(', 'start_index', ',', 'end_index', ')']);
        // this.stack.push(`.substring(${code.start_index}, ${code.end_index})`);
    }
    
    //??
    Visit_StringSize(elem){
        // this.stack.push(
        //     this.HandleSemicolon(elem, `.length`)
        // );
    }

    Visit_StringSlice(elem){
        // let code = this.PopChildrenFromStack(elem, ['slice', '(', 'start_index', ',', 'end_index', ')']);
        // this.stack.push(`.slice(${code.start_index}, ${code.end_index})`);
    }

    Visit_ArrayGet(elem){
        // let code = this.PopChildrenFromStack(elem, ['array', '[', 'index' , ']']);
        // this.stack.push(`${code.array}[${code.index}]`);
    }

    Visit_ArrayPush(elem){
        // let code = this.PopChildrenFromStack(elem, ['array', '.', 'push', '(', 'element', ')']);
        // this.stack.push(`${code.array}.push(${code.element})`);
    }

    Visit_ArrayPop(elem){
        // let code = this.PopChildrenFromStack(elem, ['array', '.', 'pop', '()']);
        // this.stack.push(`${code.array}.pop()`);
    }

    Visit_ArraySet(elem){
        // let code = this.PopChildrenFromStack(elem, ['array', '[', 'index', ']', '=', 'element']);
        // this.stack.push(`${code.array}[${code.index}] = ${code.element}`);
    }

    //??
    Visit_ArraySize(elem){
        // let code = this.PopChildrenFromStack(elem, ['array', '.', 'length']);
        // this.stack.push(`${code.array}.length`);
    }

    Visit_ArrayJoin(elem){
        // let code = this.PopChildrenFromStack(elem, ['array', '.', 'join', '(', 'seperator', ')']);
        // this.stack.push(`${code.array}.join(${code.seperator})`);
    }

    //??
    Visit_ArrayToString(elem){
        // let code = this.PopChildrenFromStack(elem, ['array', '.', 'tostring', '()']);
        // this.stack.push(`${code.array}.toString()`);
    }

    //??
    Visit_ObjectGet(elem){
        //this.stack.push(null);
    }

    Visit_ObjectDelete(elem){
        // let code = this.PopChildrenFromStack(elem, ['delete', 'object', '[', 'property', ']']);
        // this.stack.push(`delete${code.object}[${code.property}]`);
    }  

    Visit_ObjectSet(elem){
        // let code = this.PopChildrenFromStack(elem, ['object', '[', 'property', ']', '=', 'value']);
        // this.stack.push(`${code.object}[${code.property}] = ${code.value}`);
    }

    //??
    Visit_ObjectSize(elem){
        // let code = this.PopChildrenFromStack(elem, ['object', '.', 'length']);
        // this.stack.push(`${code.object}.length`);
    }

    Visit_ObjectGetSq(elem){
        // let code = this.PopChildrenFromStack(elem, ['object', '[', 'property' , ']']);
        // this.stack.push(`${code.object}[${code.property}]`);
    }

    Visit_ObjectGetDot(elem){
        // let code = this.PopChildrenFromStack(elem, ['object', '.', 'property' ]);
        // this.stack.push(`${code.object}.${code.property}`);
    }  
    
    /* terminals */
    Visit_Ident(elem){
        let id = elem.GetText() || '$$id';
        
        if (ReservedWords.IsReserved(id))
            id = '$' + id;
        
        this.stack.push(id);
        
        let parent = elem.GetParent().GetSymbol().symbol.name;

        if (parent === 'named_func'){
            this.scopeStack[this.scopeStack.length - 2].funcs.push(id); // don't care about duplicates
        }
        else if (parent === 'ident_list'){
            this.scopeStack[this.scopeStack.length - 1].args.push(id); // don't care about duplicates
        }
        else if (parent === 'ident_type'){
            //
        }
        else
            this.HandleVarDeclaration(id);
    }

    Visit_IntConst(elem){
        let num = Number(elem.GetText());

        if ( !Number.isInteger(num) )
            num = 0;
        
        this.stack.push(num);
    }

    Visit_FloatConst(elem){
        let num = Number(elem.GetText());

        if ( !Number.isFinite(num) )
            num = 0;
        
        this.stack.push(num);
    }

    Visit_BoolConst(elem){
        let bool = elem.GetText();

        if (bool !== 'false' && bool !== 'true')
            bool = 'false';

        this.stack.push(bool);
    }

    Visit_CharConst(elem){
        let text = elem.GetText();

        if      (text === '"')  text = '\\"';
        else if (text === '\\') text = '\\\\';

        this.stack.push(text);
    }

    Visit_StringConst(elem){
        let quotes = /\"/g;
        let backslashes = /\\/g;

        let text = '"' + elem.GetText().replace(backslashes, '\\\\').replace(quotes, '\\"') + '"';

        this.stack.push(text);
    }

    Visit_PlusPlus(elem)                    {this.stack.push('++');}
    Visit_SubSub(elem)                      {this.stack.push('--');}
    Visit_Uminus(elem)                      {this.stack.push('-');}
    Visit_Uplus(elem)                       {this.stack.push('+');}
    Visit_Plus(elem)                        {this.stack.push('+');}
    Visit_Sub(elem)                         {this.stack.push('-');}
    Visit_Mult(elem)                        {this.stack.push('*');}
    Visit_Div(elem)                         {this.stack.push('/');}
    Visit_Exp(elem)                         {this.stack.push('**');}
    Visit_Modulo(elem)                      {this.stack.push('%');}
    Visit_Greater(elem)                     {this.stack.push('>');}
    Visit_Less(elem)                        {this.stack.push('<');}
    Visit_EqualTo(elem)                     {this.stack.push('==');}
    Visit_EqualValueType(elem)              {this.stack.push('===');}
    Visit_NotEqualTo(elem)                  {this.stack.push('!=');}
    Visit_NotEqualValueType(elem)           {this.stack.push('!==');}
    Visit_GreaterEqual(elem)                {this.stack.push('>=');}
    Visit_LessEqual(elem)                   {this.stack.push('<=');}
    Visit_And(elem)                         {this.stack.push('&&');}
    Visit_Or(elem)                          {this.stack.push('||');}
    Visit_Not(elem)                         {this.stack.push('!');}
    Visit_Assign(elem)                      {this.stack.push('=');}   
    Visit_PlusAssign(elem)                  {this.stack.push('+=');}
    Visit_SubAssign(elem)                   {this.stack.push('-=');}
    Visit_MultAssign(elem)                  {this.stack.push('*=');}
    Visit_DivAssign(elem)                   {this.stack.push('/=');}
    Visit_ModAssign(elem)                   {this.stack.push('%=');}
    Visit_ExpAssign(elem)                   {this.stack.push('**=');}
    Visit_LeftParenth(elem)                 {this.stack.push('(');}
    Visit_RightParenth(elem)                {this.stack.push(')');}
    Visit_LeftBracket(elem)                 {this.stack.push('{');}
    Visit_RightBracket(elem)                {this.stack.push('}');}
    Visit_LeftSquareBracket(elem)           {this.stack.push('[');}
    Visit_RightSquareBracket(elem)          {this.stack.push(']');}
    Visit_Colon(elem)                       {this.stack.push(':');}
    Visit_Semicolon(elem)                   {this.stack.push(';');}
    Visit_Dot(elem)                         {this.stack.push('.');}
    Visit_QuestionMark(elem)                {this.stack.push('?');}
    Visit_ParenthCall(elem)                 {this.stack.push('()');}
    Visit_True(elem)                        {this.stack.push( this.HandleSemicolon(elem, 'true') ); }
    Visit_False(elem)                       {this.stack.push( this.HandleSemicolon(elem, 'false') );}
    Visit_Break(elem)                       {this.stack.push('break'); }
    Visit_Continue(elem)                    {this.stack.push('continue')}
    Visit_Return(elem)                      {this.stack.push('return');}
    Visit_If(elem)                          {this.IncreaseTabs(); this.stack.push('if');}
    Visit_Else(elem)                        {this.stack.push(null);}
    Visit_While(elem)                       {this.IncreaseTabs(); this.stack.push(null);}
    Visit_For(elem)                         {this.IncreaseTabs(); this.stack.push(null);}
    Visit_Function(elem)                    {this.stack.push(null);} //??
    Visit_Var(elem)                         {this.stack.push('var');} //??      
    Visit_Let(elem)                         {this.stack.push('let');} //??
    Visit_Const(elem)                       {this.stack.push('const');} //??
    Visit_Abs(elem)                         {this.stack.push('abs');}
    Visit_Pow(elem)                         {this.stack.push('pow');}
    Visit_Sqrt(elem)                        {this.stack.push('sqrt');}
    Visit_Round(elem)                       {this.stack.push('round');}
    Visit_Floor(elem)                       {this.stack.push('floor')}
    Visit_Ceil(elem)                        {this.stack.push('ceil');}
    Visit_Sin(elem)                         {this.stack.push('sin');}
    Visit_Cos(elem)                         {this.stack.push('cos');}
    Visit_Length(elem)                      {this.stack.push(null);} //??
    Visit_Concats(elem)                     {this.stack.push(null);}
    Visit_ToUpperCase(elem)                 {this.stack.push(null);}
    Visit_ToLowerCase(elem)                 {this.stack.push(null);}
    Visit_Substring(elem)                   {this.stack.push(null);}
    Visit_Slice(elem)                       {this.stack.push(null);}
    Visit_Push(elem)                        {this.stack.push(null);}
    Visit_Pop(elem)                         {this.stack.push(null);}
    Visit_Join(elem)                        {this.stack.push(null);}
    Visit_toString(elem)                    {this.stack.push(null);}
    Visit_Delete(elem)                      {this.stack.push(null);}   
}