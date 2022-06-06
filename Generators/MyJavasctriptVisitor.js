import { AstVisitor } from "./AstVisitor";
import {assert} from '../Utils/Assert.js';
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
        'LEFT_SHIFT_ASSIGN':        { js: '<<=',    precedence: 3,    associativity: 'right',   assocParenthesis: 'never'   },
        'RIGHT_SHIFT_ASSIGN':       { js: '>>=',    precedence: 3,    associativity: 'right',   assocParenthesis: 'never'   },
        'UN_RIGHT_SHIFT_ASSIGN':    { js: '>>>=',   precedence: 3,    associativity: 'right',   assocParenthesis: 'never'   },
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

        this.SetVisitor( 'input_output_call',       elem => this.Visit_InputOutputCall(elem) );
        this.SetVisitor( 'math_call',               elem => this.Visit_MathCall(elem) );
        this.SetVisitor( 'user_function_call',      elem => this.Visit_UserFunctionCall(elem) );
        this.SetVisitor( 'ident_list',              elem => this.Visit_IdentList(elem) );
        this.SetVisitor( 'expr_list',               elem => this.Visit_ExprList(elem) );
        this.SetVisitor( 'element_list',            elem => this.Visit_ElementList(elem) );
        this.SetVisitor( 'array_method',            elem => this.Visit_ArrayMethod(elem) );
        this.SetVisitor( 'string_method',           elem => this.Visit_StringMethod(elem) );
        this.SetVisitor( 'array_method_call',       elem => this.Visit_ArrayMethodCall(elem) );
        this.SetVisitor( 'array_get',               elem => this.Visit_ArrayGet(elem) );
        this.SetVisitor( 'array_insert',            elem => this.Visit_ArrayInsert(elem) );
        this.SetVisitor( 'array_push_back',         elem => this.Visit_ArrayPushback(elem) );
        this.SetVisitor( 'array_set',               elem => this.Visit_ArraySet(elem) );
        this.SetVisitor( 'array_size',              elem => this.Visit_ArraySize(elem) );
        this.SetVisitor( 'string_method_call',      elem => this.Visit_StringMethodCall(elem) );
        this.SetVisitor( 'string_append',           elem => this.Visit_StringAppend(elem) );
        this.SetVisitor( 'string_get_character',    elem => this.Visit_StringGetCharacter(elem) );
        this.SetVisitor( 'string_get_substring',    elem => this.Visit_StringGetSubstring(elem) );
        this.SetVisitor( 'string_size',             elem => this.Visit_StringSize(elem) );
        this.SetVisitor( 'input_output_print',      elem => this.Visit_InputOutputPrint(elem) );
        this.SetVisitor( 'input_output_input',      elem => this.Visit_InputOutputInput(elem) );
        this.SetVisitor( 'math_pow',                elem => this.Visit_MathPow(elem) );
        this.SetVisitor( 'math_sqrt',               elem => this.Visit_MathSqrt(elem) );
        this.SetVisitor( 'math_round',              elem => this.Visit_MathRound(elem) );
        this.SetVisitor( 'math_floor',              elem => this.Visit_MathFloor(elem) );
        this.SetVisitor( 'math_ceiling',            elem => this.Visit_MathCeiling(elem) );
        this.SetVisitor( 'math_sin',                elem => this.Visit_MathSin(elem) );
        this.SetVisitor( 'math_cos',                elem => this.Visit_MathCos(elem) );

        this.SetVisitor( 'IDENT',                   elem => this.Visit_Ident(elem) );
        this.SetVisitor( 'INT_CONST',               elem => this.Visit_IntConst(elem) );
        this.SetVisitor( 'FLOAT_CONST',             elem => this.Visit_FloatConst(elem) );
        this.SetVisitor( 'BOOL_CONST',              elem => this.Visit_BoolConst(elem) );
        this.SetVisitor( 'CHAR_CONST',              elem => this.Visit_CharConst(elem) );
        this.SetVisitor( 'STRING_CONST',            elem => this.Visit_StringConst(elem) );
        this.SetVisitor( 'UMINUS',                  elem => this.Visit_Uminus(elem) );
        this.SetVisitor( 'PLUS',                    elem => this.Visit_Plus(elem) );
        this.SetVisitor( 'MINUS',                   elem => this.Visit_Minus(elem) );
        this.SetVisitor( 'TIMES',                   elem => this.Visit_Times(elem) );
        this.SetVisitor( 'BY',                      elem => this.Visit_By(elem) );
        this.SetVisitor( 'MODULO',                  elem => this.Visit_Modulo(elem) );
        this.SetVisitor( 'GREATER',                 elem => this.Visit_Greater(elem) );
        this.SetVisitor( 'LESS',                    elem => this.Visit_Less(elem) );
        this.SetVisitor( 'EQUAL_TO',                elem => this.Visit_EqualTo(elem) );
        this.SetVisitor( 'NOT_EQUAL_TO',            elem => this.Visit_NotEqualTo(elem) );
        this.SetVisitor( 'GREATER_EQUAL',           elem => this.Visit_GreaterEqual(elem) );
        this.SetVisitor( 'LESS_EQUAL',              elem => this.Visit_LessEqual(elem) );
        this.SetVisitor( 'AND',                     elem => this.Visit_And(elem) );
        this.SetVisitor( 'OR',                      elem => this.Visit_Or(elem) );
        this.SetVisitor( 'NOT',                     elem => this.Visit_Not(elem) );
        this.SetVisitor( 'EQUALS',                  elem => this.Visit_Equals(elem) );
        this.SetVisitor( 'true',                    elem => this.Visit_True(elem) );
        this.SetVisitor( 'false',                   elem => this.Visit_False(elem) );
        this.SetVisitor( 'BREAK',                   elem => this.Visit_Break(elem) );
        this.SetVisitor( 'CONTINUE',                elem => this.Visit_Continue(elem) );
        this.SetVisitor( 'RETURN',                  elem => this.Visit_Return(elem) );
        this.SetVisitor( 'IF',                      elem => this.Visit_If(elem) );
        this.SetVisitor( 'ELSE',                    elem => this.Visit_Else(elem) );
        this.SetVisitor( 'WHILE',                   elem => this.Visit_While(elem) );
        this.SetVisitor( 'FOR',                     elem => this.Visit_For(elem) );
        this.SetVisitor( 'CALL',                    elem => this.Visit_Call(elem) );
        this.SetVisitor( 'FUNCTION',                elem => this.Visit_Function(elem) );
        this.SetVisitor( 'OF',                      elem => this.Visit_Of(elem) );
        this.SetVisitor( 'WITH',                    elem => this.Visit_With(elem) );
        this.SetVisitor( 'ARRAY',                   elem => this.Visit_Array(elem) );
        this.SetVisitor( 'IN ARRAY',                elem => this.Visit_InArray(elem) );
        this.SetVisitor( 'get',                     elem => this.Visit_Get(elem) );
        this.SetVisitor( 'insert',                  elem => this.Visit_Insert(elem) );
        this.SetVisitor( 'push_back',               elem => this.Visit_PushBack(elem) );
        this.SetVisitor( 'set',                     elem => this.Visit_Set(elem) );
        this.SetVisitor( 'get_size',                elem => this.Visit_GetSize(elem) );
        this.SetVisitor( 'IN STRING',               elem => this.Visit_InString(elem) );
        this.SetVisitor( 'append',                  elem => this.Visit_Append(elem) );
        this.SetVisitor( 'get_character',           elem => this.Visit_GetCharacter(elem) );
        this.SetVisitor( 'get_substring',           elem => this.Visit_GetSubstring(elem) );
        this.SetVisitor( 'print',                   elem => this.Visit_Print(elem) );
        this.SetVisitor( 'input',                   elem => this.Visit_Input(elem) );
        this.SetVisitor( 'pow',                     elem => this.Visit_Pow(elem) );
        this.SetVisitor( 'sqrt',                    elem => this.Visit_Sqrt(elem) );
        this.SetVisitor( 'round',                   elem => this.Visit_Round(elem) );
        this.SetVisitor( 'floor',                   elem => this.Visit_Floor(elem) );
        this.SetVisitor( 'ceiling',                 elem => this.Visit_Ceiling(elem) );
        this.SetVisitor( 'sin',                     elem => this.Visit_Sin(elem) );
        this.SetVisitor( 'cos',                     elem => this.Visit_Cos(elem) );
    }
}

