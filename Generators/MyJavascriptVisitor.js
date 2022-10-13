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
           decl_vars:[],
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
    day = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Athens' });
    popupNum = 0;

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

    constructor(popupNum) {
        super();
        this.popupNum = popupNum;
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
        this.SetVisitor( 'repeat_stmt',             elem => this.Visit_RepeatStmt(elem));
        this.SetVisitor( 'expr',                    elem => this.Visit_Expr(elem) );
        this.SetVisitor( 'turtle_functions',        elem => this.Visit_TurtleFunc(elem) );
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
        this.SetVisitor( 'input',                   elem => this.Visit_Input(elem) );
        this.SetVisitor( 'add_key_press',           elem => this.Visit_AddKeyPress(elem) );
        this.SetVisitor( 'remove_key_press',        elem => this.Visit_RemoveKeyPress(elem) );
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

        this.SetVisitor( 'PLUS_PLUS',               elem => this.Visit_PlusPlus(elem) );
        this.SetVisitor( 'SUB_SUB',                 elem => this.Visit_SubSub(elem) );
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

        this.SetVisitor( 'Math',                    elem => this.Visit_Math(elem) );
        this.SetVisitor( 'typeof',                  elem => this.Visit_Typeof(elem) );
        this.SetVisitor( 'console.log',             elem => this.Visit_Console(elem) );
        this.SetVisitor( 'prompt',                  elem => this.Visit_Prompt(elem) );
        this.SetVisitor( 'output_color',            elem => this.Visit_OutputColor(elem) );
        this.SetVisitor( 'add_on_key_press',        elem => this.Visit_AddOnKey(elem) );
        this.SetVisitor( 'remove_on_key_press',     elem => this.Visit_RemoveOnKey(elem) ); 

        this.SetVisitor( 'Escape',                  elem => this.Visit_Escape(elem) );
        this.SetVisitor( 'F1',                      elem => this.Visit_F1(elem) );
        this.SetVisitor( 'F2',                      elem => this.Visit_F2(elem) );
        this.SetVisitor( 'F3',                      elem => this.Visit_F3(elem) );
        this.SetVisitor( 'F4',                      elem => this.Visit_F4(elem) );
        this.SetVisitor( 'F5',                      elem => this.Visit_F5(elem) );
        this.SetVisitor( 'F6',                      elem => this.Visit_F6(elem) );
        this.SetVisitor( 'F7',                      elem => this.Visit_F7(elem) );
        this.SetVisitor( 'F8',                      elem => this.Visit_F8(elem) );
        this.SetVisitor( 'F9',                      elem => this.Visit_F9(elem) );
        this.SetVisitor( 'F10',                     elem => this.Visit_F10(elem) );
        this.SetVisitor( 'F11',                     elem => this.Visit_F11(elem) );
        this.SetVisitor( 'F12',                     elem => this.Visit_F12(elem) );
        this.SetVisitor( 'ScrollLock',              elem => this.Visit_ScrollLock(elem) );
        this.SetVisitor( 'Pause',                   elem => this.Visit_Pause(elem) );
        this.SetVisitor( 'Insert',                  elem => this.Visit_Insert(elem) );

        this.SetVisitor( 'Backquote',               elem => this.Visit_Backquote(elem) );
        this.SetVisitor( 'Digit0',                  elem => this.Visit_Digit0(elem) );
        this.SetVisitor( 'Digit1',                  elem => this.Visit_Digit1(elem) );
        this.SetVisitor( 'Digit2',                  elem => this.Visit_Digit2(elem) );
        this.SetVisitor( 'Digit3',                  elem => this.Visit_Digit3(elem) );
        this.SetVisitor( 'Digit4',                  elem => this.Visit_Digit4(elem) );
        this.SetVisitor( 'Digit5',                  elem => this.Visit_Digit5(elem) );
        this.SetVisitor( 'Digit6',                  elem => this.Visit_Digit6(elem) );
        this.SetVisitor( 'Digit7',                  elem => this.Visit_Digit7(elem) );
        this.SetVisitor( 'Digit8',                  elem => this.Visit_Digit8(elem) );
        this.SetVisitor( 'Digit9',                  elem => this.Visit_Digit9(elem) );
        this.SetVisitor( 'Minus',                   elem => this.Visit_Minus(elem) );
        this.SetVisitor( 'Equal',                   elem => this.Visit_Equal(elem) );
        this.SetVisitor( 'Backspace',               elem => this.Visit_Backspace(elem) );
        this.SetVisitor( 'End',                     elem => this.Visit_End(elem) );
        this.SetVisitor( 'Home',                    elem => this.Visit_Home(elem) );

        this.SetVisitor( 'Tab',                     elem => this.Visit_Tab(elem) );
        this.SetVisitor( 'BracketLeft',             elem => this.Visit_BracketLeft(elem) );
        this.SetVisitor( 'BracketRight',            elem => this.Visit_BracketRight(elem) );
        this.SetVisitor( 'Backslash',               elem => this.Visit_Backslash(elem) );
        this.SetVisitor( 'CapsLock',                elem => this.Visit_CapsLock(elem) );
        this.SetVisitor( 'Semicolon',               elem => this.Visit_SemicolonKey(elem) );
        this.SetVisitor( 'Quote',                   elem => this.Visit_Quote(elem) );
        this.SetVisitor( 'Enter',                   elem => this.Visit_Enter(elem) );
        this.SetVisitor( 'ShiftLeft',               elem => this.Visit_ShiftLeft(elem) );
        this.SetVisitor( 'Comma',                   elem => this.Visit_Comma(elem) );
        this.SetVisitor( 'Period',                  elem => this.Visit_Period(elem) );
        this.SetVisitor( 'Slash',                   elem => this.Visit_Slash(elem) );
        this.SetVisitor( 'ShiftRight',              elem => this.Visit_ShiftRight(elem) );

        this.SetVisitor( 'ControlLeft',             elem => this.Visit_ControlLeft(elem) );
        this.SetVisitor( 'OSLeft',                  elem => this.Visit_OSLeft(elem) );
        this.SetVisitor( 'AltLeft',                 elem => this.Visit_AltLeft(elem) );
        this.SetVisitor( 'Space',                   elem => this.Visit_Space(elem) );
        this.SetVisitor( 'AltRight',                elem => this.Visit_AltRight(elem) );
        this.SetVisitor( 'ContextMenu',             elem => this.Visit_ContextMenu(elem) );
        this.SetVisitor( 'ControlRight',            elem => this.Visit_ControlRight(elem) );
        this.SetVisitor( 'Delete',                  elem => this.Visit_Delete(elem) );
        this.SetVisitor( 'PageUp',                  elem => this.Visit_PageUp(elem) );
        this.SetVisitor( 'PageDown',                elem => this.Visit_PageDown(elem) );
        this.SetVisitor( 'ArrowLeft',               elem => this.Visit_ArrowLeft(elem) );
        this.SetVisitor( 'ArrowUp',                 elem => this.Visit_ArrowUp(elem) );
        this.SetVisitor( 'ArrowRight',              elem => this.Visit_ArrowRight(elem) );
        this.SetVisitor( 'ArrowDown',               elem => this.Visit_ArrowDown(elem) );

        this.SetVisitor( 'KeyA',                    elem => this.Visit_KeyA(elem) );
        this.SetVisitor( 'KeyB',                    elem => this.Visit_KeyB(elem) );
        this.SetVisitor( 'KeyC',                    elem => this.Visit_KeyC(elem) );
        this.SetVisitor( 'KeyD',                    elem => this.Visit_KeyD(elem) );
        this.SetVisitor( 'KeyE',                    elem => this.Visit_KeyE(elem) );
        this.SetVisitor( 'KeyF',                    elem => this.Visit_KeyF(elem) );
        this.SetVisitor( 'KeyG',                    elem => this.Visit_KeyG(elem) );
        this.SetVisitor( 'KeyH',                    elem => this.Visit_KeyH(elem) );
        this.SetVisitor( 'KeyI',                    elem => this.Visit_KeyI(elem) );
        this.SetVisitor( 'KeyJ',                    elem => this.Visit_KeyJ(elem) );
        this.SetVisitor( 'KeyK',                    elem => this.Visit_KeyK(elem) );
        this.SetVisitor( 'KeyL',                    elem => this.Visit_KeyL(elem) );
        this.SetVisitor( 'KeyM',                    elem => this.Visit_KeyM(elem) );
        this.SetVisitor( 'KeyN',                    elem => this.Visit_KeyN(elem) );
        this.SetVisitor( 'KeyO',                    elem => this.Visit_KeyO(elem) );
        this.SetVisitor( 'KeyP',                    elem => this.Visit_KeyP(elem) );
        this.SetVisitor( 'KeyQ',                    elem => this.Visit_KeyQ(elem) );
        this.SetVisitor( 'KeyR',                    elem => this.Visit_KeyR(elem) );
        this.SetVisitor( 'KeyS',                    elem => this.Visit_KeyS(elem) );
        this.SetVisitor( 'KeyT',                    elem => this.Visit_KeyT(elem) );
        this.SetVisitor( 'KeyU',                    elem => this.Visit_KeyU(elem) );
        this.SetVisitor( 'KeyV',                    elem => this.Visit_KeyV(elem) );
        this.SetVisitor( 'KeyW',                    elem => this.Visit_KeyW(elem) );
        this.SetVisitor( 'KeyX',                    elem => this.Visit_KeyX(elem) );
        this.SetVisitor( 'KeyY',                    elem => this.Visit_KeyY(elem) );
        this.SetVisitor( 'KeyZ',                    elem => this.Visit_KeyZ(elem) );

        this.SetVisitor( 'Numpad0',                 elem => this.Visit_Numpad0(elem) );
        this.SetVisitor( 'Numpad1',                 elem => this.Visit_Numpad1(elem) );
        this.SetVisitor( 'Numpad2',                 elem => this.Visit_Numpad2(elem) );
        this.SetVisitor( 'Numpad3',                 elem => this.Visit_Numpad3(elem) );
        this.SetVisitor( 'Numpad4',                 elem => this.Visit_Numpad4(elem) );
        this.SetVisitor( 'Numpad5',                 elem => this.Visit_Numpad5(elem) );
        this.SetVisitor( 'Numpad6',                 elem => this.Visit_Numpad6(elem) );
        this.SetVisitor( 'Numpad7',                 elem => this.Visit_Numpad7(elem) );
        this.SetVisitor( 'Numpad8',                 elem => this.Visit_Numpad8(elem) );
        this.SetVisitor( 'Numpad9',                 elem => this.Visit_Numpad9(elem) );
        this.SetVisitor( 'NumpadMultiply',          elem => this.Visit_NumpadMultiply(elem) );
        this.SetVisitor( 'NumpadAdd',               elem => this.Visit_NumpadAdd(elem) );
        this.SetVisitor( 'NumpadDecimal',           elem => this.Visit_NumpadDecimal(elem) );
        this.SetVisitor( 'NumpadSubstract',         elem => this.Visit_NumpadSubstract(elem) );
        this.SetVisitor( 'NumpadDivide',            elem => this.Visit_NumpadDivide(elem) );
        this.SetVisitor( 'NumLock',                 elem => this.Visit_NumLock(elem) );

        this.SetVisitor( 'forward_turtle',          elem => this.Visit_ForwardTurtle(elem) );
        this.SetVisitor( 'backward_turtle',         elem => this.Visit_BackwardTurtle(elem) );
        this.SetVisitor( 'turn_right',              elem => this.Visit_TurnRight(elem) );
        this.SetVisitor( 'turn_left',               elem => this.Visit_TurnLeft(elem) );
        this.SetVisitor( 'goto_position',           elem => this.Visit_GotoPosition(elem) );
        this.SetVisitor( 'define_angle',            elem => this.Visit_DefineAngle(elem) );
        this.SetVisitor( 'define_widthline',        elem => this.Visit_DefineWidthLine(elem) );
        this.SetVisitor( 'define_turtleshape',      elem => this.Visit_DefineTurtleShape(elem) );
        this.SetVisitor( 'change_color',            elem => this.Visit_ChangeColor(elem) );
        this.SetVisitor( 'write_msg',               elem => this.Visit_WriteMsg(elem) );
        this.SetVisitor( 'random_int',              elem => this.Visit_RandomInt(elem) );
        this.SetVisitor( 'set_redraw',              elem => this.Visit_SetRedraw(elem) );
        this.SetVisitor( 'set_wrap',                elem => this.Visit_SetWrap(elem) );
        this.SetVisitor( 'set_delay',               elem => this.Visit_SetDelay(elem) );
        this.SetVisitor( 'shapes',                  elem => this.Visit_Shapes(elem) );

        this.SetVisitor( 'forward',                 elem => this.Visit_Forward(elem) );
        this.SetVisitor( 'backward',                elem => this.Visit_Backward(elem) );
        this.SetVisitor( 'right',                   elem => this.Visit_Right(elem) );
        this.SetVisitor( 'left',                    elem => this.Visit_Left(elem) );
        this.SetVisitor( 'goto',                    elem => this.Visit_Goto(elem) );
        this.SetVisitor( 'clear',                   elem => this.Visit_Clear(elem) );
        this.SetVisitor( 'penup',                   elem => this.Visit_PenUp(elem) );
        this.SetVisitor( 'pendown',                 elem => this.Visit_PenDown(elem) );
        this.SetVisitor( 'reset',                   elem => this.Visit_Reset(elem) );
        this.SetVisitor( 'angle',                   elem => this.Visit_Angle(elem) );
        this.SetVisitor( 'width',                   elem => this.Visit_Width(elem) );
        this.SetVisitor( 'shape',                   elem => this.Visit_Shape(elem) );
        this.SetVisitor( 'colour',                  elem => this.Visit_Colour(elem) );
        this.SetVisitor( 'write',                   elem => this.Visit_Write(elem) );
        this.SetVisitor( 'random',                  elem => this.Visit_Random(elem) );
        this.SetVisitor( 'hide_turtle',             elem => this.Visit_HideTurtle(elem) );
        this.SetVisitor( 'show_turtle',             elem => this.Visit_ShowTurtle(elem) );
        this.SetVisitor( 'redrawOnMove',            elem => this.Visit_RedrawOnMove(elem) );
        this.SetVisitor( 'draw',                    elem => this.Visit_Draw(elem) );
        this.SetVisitor( 'wrap',                    elem => this.Visit_Wrap(elem) );
        this.SetVisitor( 'delay',                   elem => this.Visit_Delay(elem) );

        this.SetVisitor( 'triangle',                elem => this.Visit_Triangle(elem) );
        this.SetVisitor( 'circle',                  elem => this.Visit_Circle(elem) );
        this.SetVisitor( 'square',                  elem => this.Visit_Square(elem) );
        this.SetVisitor( 'turtle',                  elem => this.Visit_Turtle(elem) );

        this.SetVisitor( 'repeat',                  elem => this.Visit_Repeat(elem) );
        this.SetVisitor( 'set_console_color',       elem => this.Visit_ChangeOutputColor(elem) );

        this.SetVisitor( 'color',                   elem => this.Visit_Color(elem) );
        this.SetVisitor( 'black',                   elem => this.Visit_Black(elem) );
        this.SetVisitor( 'red',                     elem => this.Visit_Red(elem) );
        this.SetVisitor( 'blue',                    elem => this.Visit_Blue(elem) );
        this.SetVisitor( 'green',                   elem => this.Visit_Green(elem) );
        this.SetVisitor( 'yellow',                  elem => this.Visit_Yellow(elem) );
        this.SetVisitor( 'cyan',                    elem => this.Visit_Cyan(elem) );
        this.SetVisitor( 'magenta',                 elem => this.Visit_Magenta(elem) );
        this.SetVisitor( 'rgb_color',               elem => this.Visit_RgbColor(elem) );

        this.SetVisitor( 'widgets',                 elem => this.Visit_Widgets(elem) );
        this.SetVisitor( 'create_element',          elem => this.Visit_CreateElement(elem) );
        this.SetVisitor( 'change_attribute',        elem => this.Visit_ChangeAttribute(elem) );
        this.SetVisitor( 'add_event_handler',       elem => this.Visit_AddEventHandler(elem) );

        this.SetVisitor( 'new_window',              elem => this.Visit_NewWindow(elem) );
        this.SetVisitor( 'new_button',              elem => this.Visit_NewButton(elem) );
        this.SetVisitor( 'new_textfield',           elem => this.Visit_NewTextfield(elem) );
        this.SetVisitor( 'new_textarea',            elem => this.Visit_NewTextarea(elem) );
        this.SetVisitor( 'new_checkbox',            elem => this.Visit_NewCheckbox(elem) );
        this.SetVisitor( 'new_dropdown',            elem => this.Visit_NewDropdown(elem) );
        this.SetVisitor( 'new_slider',              elem => this.Visit_NewSlider(elem) );
        this.SetVisitor( 'on',                      elem => this.Visit_On(elem) );
        this.SetVisitor( 'options',                 elem => this.Visit_Options(elem) );
        this.SetVisitor( 'window',                  elem => this.Visit_Window(elem) );
        this.SetVisitor( 'button',                  elem => this.Visit_Button(elem) );
        this.SetVisitor( 'textfield',               elem => this.Visit_Textfield(elem) );
        this.SetVisitor( 'textarea',                elem => this.Visit_Textarea(elem) );
        this.SetVisitor( 'checkbox',                elem => this.Visit_Checkbox(elem) );
        this.SetVisitor( 'dropdown',                elem => this.Visit_Dropdown(elem) );
        this.SetVisitor( 'slider',                  elem => this.Visit_Slider(elem) );

        this.SetVisitor( 'change_window',           elem => this.Visit_ChangeWindow(elem ) );
        this.SetVisitor( 'change_button',           elem => this.Visit_ChangeButton(elem) );
        this.SetVisitor( 'change_textfield',        elem => this.Visit_ChangeTextfield(elem) );
        this.SetVisitor( 'change_textarea',         elem => this.Visit_ChangeTextarea(elem) );
        this.SetVisitor( 'change_checkbox',         elem => this.Visit_ChangeCheckbox(elem) );
        this.SetVisitor( 'change_dropdown',         elem => this.Visit_ChangeDropdown(elem) );
        this.SetVisitor( 'change_slider',           elem => this.Visit_ChangeSlider(elem) );

        this.SetVisitor( 'window_width',            elem => this.Visit_WindowWidth(elem) );
        this.SetVisitor( 'window_height',           elem => this.Visit_WindowHeight(elem) );
        this.SetVisitor( 'window_color',            elem => this.Visit_WindowColor(elem) );

        this.SetVisitor( 'button_disabled',         elem => this.Visit_ButtonDisabled(elem) );
        this.SetVisitor( 'button_text',             elem => this.Visit_ButtonText(elem) );
        this.SetVisitor( 'button_color',            elem => this.Visit_ButtonColor(elem) );
        this.SetVisitor( 'button_width',            elem => this.Visit_ButtonWidth(elem) );
        this.SetVisitor( 'button_height',           elem => this.Visit_ButtonHeight(elem) );
        this.SetVisitor( 'button_position',         elem => this.Visit_ButtonPosition(elem) );

        this.SetVisitor( 'textfield_width',         elem => this.Visit_TextfieldWidth(elem) );
        this.SetVisitor( 'textfield_position',      elem => this.Visit_TextfieldPosition(elem) );
        this.SetVisitor( 'textfield_value',         elem => this.Visit_TextfieldValue(elem) );
        this.SetVisitor( 'textfield_maxlength',     elem => this.Visit_TextfieldMaxlenght(elem) );

        this.SetVisitor( 'textarea_height',         elem => this.Visit_TextareaHeight(elem) );
        this.SetVisitor( 'textarea_width',          elem => this.Visit_TextareaWidth(elem) );
        this.SetVisitor( 'textarea_position',       elem => this.Visit_TextareaPosition(elem) );
        this.SetVisitor( 'textarea_maxlength',      elem => this.Visit_TextareaMaxlenght(elem) );

        this.SetVisitor( 'checkbox_position',       elem => this.Visit_CheckboxPosition(elem) );
        this.SetVisitor( 'checkbox_text',           elem => this.Visit_CheckboxText(elem) );
        this.SetVisitor( 'checkbox_checked',        elem => this.Visit_CheckboxChecked(elem) );

        this.SetVisitor( 'dropdown_position',       elem => this.Visit_DropdownPosition(elem) );
        this.SetVisitor( 'dropdown_multiple',       elem => this.Visit_DropdownMultiple(elem) );
        this.SetVisitor( 'dropdown_add_option',     elem => this.Visit_DropdownAddOption(elem) );

        this.SetVisitor( 'slider_position',         elem => this.Visit_SliderPosition(elem) );
        this.SetVisitor( 'slider_label',            elem => this.Visit_SliderLabel(elem) );
        this.SetVisitor( 'slider_min',              elem => this.Visit_SliderMin(elem) );
        this.SetVisitor( 'slider_max',              elem => this.Visit_SliderMax(elem) );

        this.SetVisitor( 'button_event',            elem => this.Visit_ButtonEvent(elem) );
        this.SetVisitor( 'checkbox_event',          elem => this.Visit_CheckboxEvent(elem) );
        this.SetVisitor( 'dropdown_event',          elem => this.Visit_DropdownEvent(elem) );

        this.SetVisitor( 'change',                  elem => this.Visit_Change(elem) );
        this.SetVisitor( 'disable',                 elem => this.Visit_Disable(elem) );
        this.SetVisitor( 'text',                    elem => this.Visit_Text(elem) );
        this.SetVisitor( 'label',                   elem => this.Visit_Label(elem) );
        this.SetVisitor( 'new_width',               elem => this.Visit_NewWidth(elem) );
        this.SetVisitor( 'new_height',              elem => this.Visit_NewHeight(elem) );
        this.SetVisitor( 'background',              elem => this.Visit_Background(elem) );
        this.SetVisitor( 'checked',                 elem => this.Visit_Checked(elem) );
        this.SetVisitor( 'multiple',                elem => this.Visit_Multiple(elem) );
        this.SetVisitor( 'new_option',              elem => this.Visit_NewOption(elem) );
        this.SetVisitor( 'min',                     elem => this.Visit_Min(elem) );
        this.SetVisitor( 'max',                     elem => this.Visit_Max(elem) );
        this.SetVisitor( 'on_press',                elem => this.Visit_OnPress(elem) );
        this.SetVisitor( 'on_select',               elem => this.Visit_OnSelect(elem) );
        
    }

    HandleVarDeclaration(id){
        if (    
            !this.scopeStack.some(f =>
                f.funcs.includes(id)        ||
                f.vars.includes(id)         ||
                f.decl_vars.includes(id)    ||
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
        let numChildren = elem.GetElems().length;

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
            this.HandleSemicolon(elem, `${code.expr}${code.op}`)
        );
    }

    ToOperator(elem){
        if (elem.GetType() !== EditorElementTypes.SimpleBlock && elem.GetType() !== EditorElementTypes.SelectionBlock)
            return false;

        let op = elem.GetSymbol().symbol.name;

        /* handle operator placeholders */
        switch (op) {
            case 'arith_op':                return this.operators.PLUS;
            case 'unary_op_af':             return this.operators.PLUS_PLUS;
            case 'unary_op_bf':             return this.operators.UMINUS;
            case 'rel_op':                  return this.operators.GREATER;
            case 'logical_binary_op':       return this.operators.AND;
            case 'assign_op':               return this.operators.ASSIGN;
            case 'array_method_call':       return this.operators.MEMBER_ACCESS;
            case 'object_get_sq':           return this.operators.BRACE_MEMBER_ACCESS;
            case 'object_method_call':      return this.operators.MEMBER_ACCESS;
            case 'string_method':           return this.operators.MEMBER_ACCESS;
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
            case 'array_size':                  return this.operators.MEMBER_ACCESS;
            case 'array_join':                  return this.operators.MEMBER_ACCESS;
            case 'array_to_string':             return this.operators.MEMBER_ACCESS;
            
            case 'object_get_dot':              return this.operators.MEMBER_ACCESS;
            case 'object_get_sq':               return this.operators.MEMBER_ACCESS;
            case 'object_delete':               return this.operators.MEMBER_ACCESS;
            case 'object_set':                  return this.operators.EQUALS;
            case 'object_size':                 return this.operators.MEMBER_ACCESS;

            case 'length':                      return this.operators.MEMBER_ACCESS;

            case 'string_concat':               return this.operators.MEMBER_ACCESS;
            case 'string_upperCase':            return this.operators.MEMBER_ACCESS;
            case 'string_lowCase':              return this.operators.MEMBER_ACCESS;
            case 'string_substring':            return this.operators.MEMBER_ACCESS;
            case 'string_size':                 return this.operators.MEMBER_ACCESS;
            case 'string_slice':                return this.operators.MEMBER_ACCESS;

            case 'string_method_call':          return this.ToOperator(elem.GetElems()[2]) || this.GetChildOperator(elem.GetElems()[2]);        
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
        this.stack.push("//Javascript Code generated by Code Chips at "+ this.day + "\n\n" 
                      +vars + childrenCode);
    }

    Visit_Stmt(elem) {
        this.stack.push( ';' );
    }

    Visit_Def(elem) {
        this.stack.push( ';' );
    }

    Visit_Consts(elem)                  {this.stack.push(``);}
    Visit_Variable(elem)                {this.stack.push(``);}
    Visit_Types(elem)                   {this.stack.push(``);}

    Visit_IdentType(elem) {
        let code = this.PopChildrenFromStack(elem, ['type', 'ident']);
        this.stack.push(this.HandleSemicolon(elem, `${code.type} ${code.ident}`));
    } 

    Visit_TypeOf(elem) {
        let code = this.PopChildrenFromStack(elem, ['typeof', 'item']);
        this.stack.push(this.HandleSemicolon(elem, `${code.typeof} ${code.item}`));
    }

    Visit_IfStmt(elem) {
        let code = this.PopChildrenFromStack(elem, ['if','lp','expr','rp','lb','stmts','rb']);
        
        this.DecreaseTabs();
        let rBrace = this.TabIn('}');

        this.stack.push( `${code.if} ${code.lp} ${code.expr} ${code.rp} ${code.lb}\n${code.stmts}\n${rBrace}` );
    }

    Visit_IfElseStmt(elem){
        let code = this.PopChildrenFromStack(elem, ['if','lp', 'expr','rp','lb', 'stmts1','rb', 'else','lb', 'stmts2', 'rb']);
        
        this.DecreaseTabs();
        let rBrace = this.TabIn('}');
        let else_ = this.TabIn('else');

        this.stack.push( `${code.if} ${code.lp} ${code.expr} ${code.rp} ${code.lb}\n${code.stmts1}\n${rBrace}\n${else_} ${code.lb}\n${code.stmts2}\n${rBrace}` );
    }

    Visit_WhileStmt(elem){
        let code = this.PopChildrenFromStack(elem, ['while','lp', 'expr','rp', 'lb', 'stmts', 'rb']);

        this.DecreaseTabs();
        let rBrace = this.TabIn('}');

        this.stack.push( `${code.while} ${code.lp} ${code.expr} ${code.rp} ${code.lb}\n${code.stmts}\n${rBrace}` );
    }

    Visit_ForStmt(elem){
        let code = this.PopChildrenFromStack(elem, ['for','lp', 'init','semi', 'condition','semi', 'step','rp','lb', 'stmts','rb']);

        this.DecreaseTabs();
        let rBrace = this.TabIn('}');

        this.stack.push( `${code.for} ${code.lp} ${code.init} ${code.semi} ${code.condition} ${code.semi} ${code.step}${code.rp} ${code.lb} \n${code.stmts}\n${rBrace}` );
    }

    Visit_RepeatStmt(elem) {
        let code = this.PopChildrenFromStack(elem, ['repeat', 'times','stmts']);

        this.DecreaseTabs();
        let rBrace = this.TabIn('}');

        this.stack.push( `(() => {
        for(let i=0; i<${code.times}; i++){
            ${code.stmts}
        }
${rBrace})();`)
    }

    Visit_Expr(elem){
        let parent = elem.GetParent().GetSymbol().symbol.name;
        
        if(parent === 'element_list'){
            this.stack.push(``);
        }else {
            this.stack.push( this.HandleSemicolon(elem, `0`)); 
        }
    }

    Visit_TurtleFunc(elem) {
        this.stack.push(``);
    }

    Visit_TernaryStmt(elem){
        let code = this.PopChildrenFromStack(elem, ['expr', 'qm', 'expr1', 'colon', 'expr2']);
        this.stack.push(`(${code.expr}) ${code.qm} (${code.expr1}) ${code.colon} (${code.expr2})`);
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

    Visit_FuncDef(elem){
        this.stack.push(';');
    }

    Visit_NamedFunc(elem){
        let code = this.PopChildrenFromStack(elem, ['function', 'id', 'lp', 'params', 'rp', 'lb', 'stmts', 'rb']);
        let vars = this.TabIn( this.PopScopeVars() );

        this.DecreaseTabs();
        let rBrace = this.TabIn('}');

        this.stack.push(`${code.function} ${code.id} ${code.lp} ${code.params} ${code.rp} ${code.lb}\n${vars}\n${code.stmts}\n${rBrace}`);
    }

    Visit_AnonymousFunc(elem){
        let code = this.PopChildrenFromStack(elem, ['function','lp', 'params','rp', 'lb', 'stmts', 'rb']);
        let vars = this.TabIn( this.PopScopeVars() );

        this.DecreaseTabs();
        let rBrace = this.TabIn('}');

        this.stack.push(`${code.function} ${code.lp} ${code.params} ${code.rp} ${code.lb}\n${vars}\n${code.stmts}\n${rBrace}`);
    }    

    Visit_NewArray(elem){
        let code = this.PopChildrenFromStack(elem, ['array', '=', 'elements']);

        this.stack.push(
            this.HandleSemicolon(elem, `${code.array}=${code.elements}`)
        );
    }

    Visit_NewObject(elem){
        let code = this.PopChildrenFromStack(elem, ['object', '=', 'elements']);

        this.stack.push(
            this.HandleSemicolon(elem, `${code.object}=${code.elements}`)
        );
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

    Visit_ObjectConst(elem){
        let code = this.PopChildrenFromStack(elem, ['{', 'elements', '}']);

        this.stack.push(
            this.HandleSemicolon(elem, `{${code.elements}}`)
        );
    }

    Visit_IdentList(elem){
        let code = this.PopChildrenFromStack(elem).join(', ');
        this.stack.push(`${code}`);
    }

    Visit_ExprList(elem){
        let code;
        code = this.PopChildrenFromStack(elem).join(', ');
        
        this.stack.push(`${code}`);
    }

    Visit_ElementList(elem){
        let code = this.PopChildrenFromStack(elem).join(', ');
        this.stack.push(`${code}`);
    }

    Visit_PairElementList(elem){
        let code = this.PopChildrenFromStack(elem).join(', ');
        this.stack.push(`${code}`);
    }

    Visit_PairElement(elem){
        let code = this.PopChildrenFromStack(elem, ['name', ':', 'value']);

        this.stack.push(`${code.name} : ${code.value}`);
    }

    Visit_MathCall(elem){
        this.stack.push(
            this.HandleSemicolon(elem, `0`)
        );
    }

    Visit_StringMethodCall(elem){
        let code = this.PopChildrenFromStack(elem, ['string', 'dot', 'method_call']);

        let outerOp = this.ToOperator(elem.GetElems()[2]) || this.GetChildOperator(elem.GetElems()[2]);
        let innerOp = this.GetChildOperator(elem.GetElems()[0]);

        if ( innerOp && this.ShouldParenthesize(outerOp, innerOp, 'left') )
            code.string = `(${code.string})`;

        this.stack.push(
            this.HandleSemicolon(elem, `${code.string}${code.dot}${code.method_call}`)
        );
    }

    Visit_ArrayMethodCall(elem){
        this.stack.push(null);
    }

    Visit_ObjectMethodCall(elem){
        this.stack.push(null);
    }

    Visit_FunctionCall(elem){
        let code = this.PopChildrenFromStack(elem, [ 'f', 'lp', 'args', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `${code.f}${code.lp}${code.args}${code.rp}`)
        );
    }

    Visit_PrintCall(elem){
        let code = this.PopChildrenFromStack(elem, ['console','color', 'lp', 'args', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `${code.console}${code.lp}${code.color},${code.args}${code.rp}`)
        );
    }

    Visit_OutputColor(elem){
        let code = this.PopChildrenFromStack(elem, ['setCol','color']);

        this.stack.push(
            this.HandleSemicolon(elem, `SetOutputColor(${code.color})`)
        );
    }

    Visit_Input(elem){
        let code = this.PopChildrenFromStack(elem,['prompt', 'lp', 'string', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `${code.prompt}${code.lp}${code.string}${code.rp}`)
        )
    }

    Visit_AddKeyPress(elem) {
        let code = this.PopChildrenFromStack(elem, ['keypress', 'key', 'stmts']);
        
        var pName = 'PopUp' + (this.popupNum-1);
        $('#'+pName).focus();

        this.stack.push(`(()=>{
    const element = document.querySelector('#${pName}');
    let f_listener = (event) => {
        const code = event.code;
        if (code === '${code.key}') {
            ${code.stmts}
        } 
    };
    element.addEventListener('keypress', f_listener, false);
    return f_listener;
})();`);
    }

    Visit_RemoveKeyPress(elem){
        let code = this.PopChildrenFromStack(elem, ['on_key_press', 'listener']);

        var pName = 'PopUp' + (this.popupNum-1)
        this.stack.push(`const element = document.querySelector('#${pName}'); 
element.removeEventListener('keypress',${code.listener},false);`);
    }

    Visit_Callee(elem){
        this.stack.push(null);
    }

    Visit_ObjectFunction(elem){
        let code = this.PopChildrenFromStack(elem, ['object', 'dot', 'function']);

        this.stack.push(`${code.object}${code.dot}${code.function}`);
    }

    Visit_ArrayFunction(elem){
        let code = this.PopChildrenFromStack(elem, ['array', 'lsb', 'index', 'rsb']);

        this.stack.push(`${code.array}${code.lsb}${code.index}${code.rsb}`);
    } 

    Visit_MathAbs(elem){
        let code = this.PopChildrenFromStack(elem, ['Math', 'dot', 'abs', 'lp', 'number', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `${code.Math}${code.dot}${code.abs}${code.lp} ${code.number} ${code.rp}`)
        );
    }

    Visit_MathPow(elem){
        let code = this.PopChildrenFromStack(elem, ['Math', 'dot', 'pow', 'lp', 'number', 'exponent', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `${code.Math}${code.dot}${code.pow}${code.lp} ${code.number}, ${code.exponent} ${code.rp}`)
        );
    }

    Visit_MathSqrt(elem){
        let code = this.PopChildrenFromStack(elem, ['Math', 'dot', 'sqrt', 'lp', 'number', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `${code.Math}${code.dot}${code.sqrt}${code.lp} ${code.number} ${code.rp}`)
        );
    }

    Visit_MathRound(elem){
        let code = this.PopChildrenFromStack(elem, ['Math', 'dot', 'round', 'lp', 'number', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `${code.Math}${code.dot}${code.round}${code.lp} ${code.number} ${code.rp}`)
        );
    }

    Visit_MathFloor(elem){
        let code = this.PopChildrenFromStack(elem, ['Math', 'dot', 'floor', 'lp', 'number', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `${code.Math}${code.dot}${code.floor}${code.lp} ${code.number} ${code.rp}`)
        );
    }

    Visit_MathCeil(elem){
        let code = this.PopChildrenFromStack(elem, ['Math', 'dot', 'ceil', 'lp', 'number', 'rp']);

        this.stack.push(
            this.HandleSemicolon(elem, `${code.Math}${code.dot}${code.ceil}${code.lp} ${code.number} ${code.rp}`)
        );
    }

    Visit_MathSin(elem){
        let code = this.PopChildrenFromStack(elem, ['Math','dot', 'sin', 'lp', 'number', 'rp']);

        let innerOp = this.GetChildOperator(elem.GetElems()[4]);
        
        if ( innerOp && this.ShouldParenthesize(this.operators.BY, innerOp, 'left') )
            code.number = `(${code.number})`;

        this.stack.push(
            this.HandleSemicolon(elem, `${code.Math}${code.dot}${code.sin}${code.lp} ${code.number} / 180 * Math.PI ${code.rp}`)
        );
    }

    Visit_MathCos(elem){
        let code = this.PopChildrenFromStack(elem, ['Math','dot', 'cos', 'lp', 'number', 'rp']);

        let innerOp = this.GetChildOperator(elem.GetElems()[4]);
        
        if ( innerOp && this.ShouldParenthesize(this.operators.BY, innerOp, 'left') )
            code.number = `(${code.number})`;

        this.stack.push(
            this.HandleSemicolon(elem, `${code.Math}${code.dot}${code.cos}${code.lp} ${code.number} / 180 * Math.PI ${code.rp}`)
        );
    }

    Visit_StringMethod(elem){
        this.stack.push(null);
    } 

    Visit_StringConcat(elem){
        let code = this.PopChildrenFromStack(elem, ['concat', 'lp', 'string2', 'rp']);
        this.stack.push(`${code.concat}${code.lp} ${code.string2} ${code.rp}`);
    }    

    Visit_StringUpperCase(elem){
        let code = this.PopChildrenFromStack(elem, ['toUpperCase', 'pc']);
        this.stack.push(`${code.toUpperCase}${code.pc}`);
    }

    Visit_StringLowCase(elem) {
        let code = this.PopChildrenFromStack(elem, ['toLowerCase', 'pc']);
        this.stack.push(`${code.toLowerCase}${code.pc}`);
    }

    Visit_StringSubstring(elem){
        let code = this.PopChildrenFromStack(elem, ['substring', 'lp', 'start_index', 'end_index', 'rp']);
        this.stack.push(`${code.substring}${code.lp}${code.start_index}, ${code.end_index}${code.rp}`);
    }
    
    Visit_StringSize(elem){
        this.stack.push(
            this.HandleSemicolon(elem, `.length`)
        );
    }

    Visit_StringSlice(elem){
        let code = this.PopChildrenFromStack(elem, ['slice', 'lp', 'start_index','end_index', 'rp']);
        this.stack.push(`${code.slice}${code.lp}${code.start_index}, ${code.end_index}${code.rp}`);
    }

    Visit_ArrayGet(elem){
        let code = this.PopChildrenFromStack(elem, ['array', 'lsb', 'index' , 'rsb']);
        this.stack.push(`${code.array}${code.lsb}${code.index}${code.rsb}`);
    }

    Visit_ArrayPush(elem){
        let code = this.PopChildrenFromStack(elem, ['array', 'dot', 'push', 'lp', 'element', 'rp']);
        this.stack.push(`${code.array}${code.dot}${code.push}${code.lp}${code.element}${code.rp}`);
    }

    Visit_ArrayPop(elem){
        let code = this.PopChildrenFromStack(elem, ['array', 'dot', 'pop', 'pc']);
        this.stack.push(`${code.array}${code.dot}${code.pop}${code.pc}`);
    }

    Visit_ArraySet(elem){
        let code = this.PopChildrenFromStack(elem, ['array', 'lsb', 'index', 'rsb', '=', 'element']);
        this.stack.push(`${code.array}${code.lsb}${code.index}${code.rsb} = ${code.element}`);
    }

    Visit_ArraySize(elem){
        let code = this.PopChildrenFromStack(elem, ['array', 'dot', 'length']);
        this.stack.push(`${code.array}${code.dot}length`);
    }

    Visit_ArrayJoin(elem){
        let code = this.PopChildrenFromStack(elem, ['array', 'dot', 'join', 'lp', 'seperator', 'rp']);
        this.stack.push(`${code.array}${code.dot}${code.join}${code.lp}${code.seperator}${code.rp}`);
    }

    Visit_ArrayToString(elem){
        let code = this.PopChildrenFromStack(elem, ['array', 'dot', 'tostring', 'pc']);
        this.stack.push(`${code.array}${code.dot}${code.tostring}${code.pc}`);
    }

    Visit_ObjectGet(elem){
        this.stack.push(null);
    }

    Visit_ObjectDelete(elem){
        let code = this.PopChildrenFromStack(elem, ['delete', 'object', 'lsb', 'property', 'rsb']);
        this.stack.push(`${code.delete} ${code.object}${code.lsb}${code.property}${code.rsb}`);
    }  

    Visit_ObjectSet(elem){
        let code = this.PopChildrenFromStack(elem, ['object', 'lsb', 'property', 'rsb', '=', 'value']);
        this.stack.push(`${code.object}${code.lsb}${code.property}${code.rsb} = ${code.value}`);
    }

    Visit_ObjectSize(elem){
        let code = this.PopChildrenFromStack(elem, ['object', 'dot', 'length']);
        this.stack.push(` Object.keys(${code.object})${code.dot}length `);
    }

    Visit_ObjectGetSq(elem){
        let code = this.PopChildrenFromStack(elem, ['object', 'lsb', 'property' , 'rsb']);
        this.stack.push(`${code.object}${code.lsb}${code.property}${code.rsb}`);
    }

    Visit_ObjectGetDot(elem){
        let code = this.PopChildrenFromStack(elem, ['object', 'dot', 'property' ]);
        this.stack.push(`${code.object}${code.dot}${code.property}`);
    }  
    
    Visit_Ident(elem){
        let id = elem.GetText() || '$$id';
        
        if (ReservedWords.IsReserved(id))
            id = '$' + id;
        
        this.stack.push(id);
        
        let parent = elem.GetParent().GetSymbol().symbol.name;

        if (parent === 'named_func'){
            this.scopeStack[this.scopeStack.length - 2].funcs.push(id); // don't care about duplicates
        }
        else if (parent === 'ident_list' || parent === 'pair_element'){
            this.scopeStack[this.scopeStack.length - 1].args.push(id); // don't care about duplicates
        }
        else if (parent === 'ident_type'){
            this.scopeStack[this.scopeStack.length - 1].decl_vars.push(id);
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

        if (elem.GetText() != undefined) {
            let text = '"' + elem.GetText().replace(backslashes, '\\\\').replace(quotes, '\\"') + '"';

            this.stack.push(text);   
        } else {
            this.stack.push(` `);
        }
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
    Visit_While(elem)                       {this.IncreaseTabs(); this.stack.push('while');}
    Visit_For(elem)                         {this.IncreaseTabs(); this.stack.push('for');}

    Visit_Function(elem){
        this.IncreaseTabs();

        this.scopeStack.push({
            args:       [],
            vars:       [],
            decl_vars:  [],
            funcs:      [],
        });

        this.stack.push('function');
    }

    Visit_Var(elem)                         {this.stack.push('var');}      
    Visit_Let(elem)                         {this.stack.push('let');}
    Visit_Const(elem)                       {this.stack.push('const');}
    Visit_Abs(elem)                         {this.stack.push('abs');}
    Visit_Pow(elem)                         {this.stack.push('pow');}
    Visit_Sqrt(elem)                        {this.stack.push('sqrt');}
    Visit_Round(elem)                       {this.stack.push('round');}
    Visit_Floor(elem)                       {this.stack.push('floor')}
    Visit_Ceil(elem)                        {this.stack.push('ceil');}
    Visit_Sin(elem)                         {this.stack.push('sin');}
    Visit_Cos(elem)                         {this.stack.push('cos');}
    Visit_Length(elem)                      {this.stack.push('length');}
    Visit_Concats(elem)                     {this.stack.push('concat');}
    Visit_ToUpperCase(elem)                 {this.stack.push('toUpperCase');}
    Visit_ToLowerCase(elem)                 {this.stack.push('toLowerCase');}
    Visit_Substring(elem)                   {this.stack.push('substring');}
    Visit_Slice(elem)                       {this.stack.push('slice');}
    Visit_Push(elem)                        {this.stack.push('push');}
    Visit_Pop(elem)                         {this.stack.push('pop');}
    Visit_Join(elem)                        {this.stack.push('join');}
    Visit_toString(elem)                    {this.stack.push('toString');}
    Visit_Delete(elem)                      {this.stack.push('delete');} 

    Visit_Math(elem)                        {this.stack.push('Math');}
    Visit_Typeof(elem)                      {this.stack.push('typeof');}
    Visit_Console(elem)                     {this.stack.push(`output`);}
    Visit_Prompt(elem)                      {this.stack.push('prompt');}
    Visit_AddOnKey(elem)                    {this.stack.push(``);}
    Visit_RemoveOnKey(elem)                 {this.stack.push(``);}

    Visit_Escape(elem)                      {this.stack.push('Escape');}
    Visit_F1(elem)                          {this.stack.push('F1');}
    Visit_F2(elem)                          {this.stack.push('F2');}
    Visit_F3(elem)                          {this.stack.push('F3');}
    Visit_F4(elem)                          {this.stack.push('F4');}
    Visit_F5(elem)                          {this.stack.push('F5');}
    Visit_F6(elem)                          {this.stack.push('F6');}
    Visit_F7(elem)                          {this.stack.push('F7');}
    Visit_F8(elem)                          {this.stack.push('F8');}
    Visit_F9(elem)                          {this.stack.push('F9');}
    Visit_F10(elem)                         {this.stack.push('F10');}
    Visit_F11(elem)                         {this.stack.push('F11');}
    Visit_F12(elem)                         {this.stack.push('F12');}
    Visit_ScrollLock(elem)                  {this.stack.push('ScrollLock');}
    Visit_Pause(elem)                       {this.stack.push('Pause');}
    Visit_Insert(elem)                      {this.stack.push('Insert');}
    Visit_Backquote(elem)                   {this.stack.push('Backquote');}
    Visit_Digit0(elem)                      {this.stack.push('Digit0');}
    Visit_Digit1(elem)                      {this.stack.push('Digit1');}
    Visit_Digit2(elem)                      {this.stack.push('Digit2');}
    Visit_Digit3(elem)                      {this.stack.push('Digit3');}
    Visit_Digit4(elem)                      {this.stack.push('Digit4');}
    Visit_Digit5(elem)                      {this.stack.push('Digit5');}
    Visit_Digit6(elem)                      {this.stack.push('Digit6');}
    Visit_Digit7(elem)                      {this.stack.push('Digit7');}
    Visit_Digit8(elem)                      {this.stack.push('Digit8');}
    Visit_Digit9(elem)                      {this.stack.push('Digit9');}   
    Visit_Minus(elem)                       {this.stack.push('Minus');}
    Visit_Equal(elem)                       {this.stack.push('Equal');}
    Visit_Backspace(elem)                   {this.stack.push('Backspace');}
    Visit_End(elem)                         {this.stack.push('End');}
    Visit_Home(elem)                        {this.stack.push('Home');}
    Visit_Tab(elem)                         {this.stack.push('Tab');}
    Visit_BracketLeft(elem)                 {this.stack.push('BracketLeft');}
    Visit_BracketRight(elem)                {this.stack.push('BracketRight');}
    Visit_Backslash(elem)                   {this.stack.push('Backslash');}
    Visit_CapsLock(elem)                    {this.stack.push('CapsLock');}
    Visit_SemicolonKey(elem)                {this.stack.push('Semicolon');}
    Visit_Quote(elem)                       {this.stack.push('Quote');}
    Visit_Enter(elem)                       {this.stack.push('Enter');}
    Visit_ShiftLeft(elem)                   {this.stack.push('ShiftLeft');}
    Visit_Comma(elem)                       {this.stack.push('Comma');}
    Visit_Period(elem)                      {this.stack.push('Period');}
    Visit_Slash(elem)                       {this.stack.push('Slash');}
    Visit_ShiftRight(elem)                  {this.stack.push('ShiftRight');}
    Visit_ControlLeft(elem)                 {this.stack.push('ControlLeft');}
    Visit_OSLeft(elem)                      {this.stack.push('OSLeft');}
    Visit_AltLeft(elem)                     {this.stack.push('AltLeft');}
    Visit_Space(elem)                       {this.stack.push('Space');}
    Visit_AltRight(elem)                    {this.stack.push('AltRight');}
    Visit_ContextMenu(elem)                 {this.stack.push('ContextMenu');}
    Visit_ControlRight(elem)                {this.stack.push('ControlRight');}
    Visit_Delete(elem)                      {this.stack.push('Delete');}
    Visit_PageUp(elem)                      {this.stack.push('PageUp');}
    Visit_PageDown(elem)                    {this.stack.push('PageDown');}
    Visit_ArrowLeft(elem)                   {this.stack.push('ArrowLeft');}
    Visit_ArrowUp(elem)                     {this.stack.push('ArrowUp');}
    Visit_ArrowRight(elem)                  {this.stack.push('ArrowRight');}
    Visit_ArrowDown(elem)                   {this.stack.push('ArrowDown');}
    Visit_KeyA(elem)                        {this.stack.push('KeyA');}
    Visit_KeyB(elem)                        {this.stack.push('KeyB');}
    Visit_KeyC(elem)                        {this.stack.push('KeyC');}
    Visit_KeyD(elem)                        {this.stack.push('KeyD');}
    Visit_KeyE(elem)                        {this.stack.push('KeyE');}
    Visit_KeyF(elem)                        {this.stack.push('KeyF');}
    Visit_KeyG(elem)                        {this.stack.push('KeyG');}
    Visit_KeyH(elem)                        {this.stack.push('KeyH');}
    Visit_KeyI(elem)                        {this.stack.push('KeyI');}
    Visit_KeyJ(elem)                        {this.stack.push('KeyJ');}
    Visit_KeyK(elem)                        {this.stack.push('KeyK');}
    Visit_KeyL(elem)                        {this.stack.push('KeyL');}
    Visit_KeyM(elem)                        {this.stack.push('KeyM');}
    Visit_KeyN(elem)                        {this.stack.push('KeyN');}
    Visit_KeyO(elem)                        {this.stack.push('KeyO');}
    Visit_KeyP(elem)                        {this.stack.push('KeyP');}
    Visit_KeyQ(elem)                        {this.stack.push('KeyQ');}
    Visit_KeyR(elem)                        {this.stack.push('KeyR');}
    Visit_KeyS(elem)                        {this.stack.push('KeyS');}
    Visit_KeyT(elem)                        {this.stack.push('KeyT');}
    Visit_KeyU(elem)                        {this.stack.push('KeyU');}
    Visit_KeyV(elem)                        {this.stack.push('KeyV');}
    Visit_KeyW(elem)                        {this.stack.push('KeyW');}
    Visit_KeyX(elem)                        {this.stack.push('KeyX');}
    Visit_KeyY(elem)                        {this.stack.push('KeyY');}
    Visit_KeyZ(elem)                        {this.stack.push('KeyZ');}
    Visit_Numpad0(elem)                     {this.stack.push('Numpad0');}
    Visit_Numpad1(elem)                     {this.stack.push('Numpad1');}
    Visit_Numpad2(elem)                     {this.stack.push('Numpad2');}
    Visit_Numpad3(elem)                     {this.stack.push('Numpad3');}
    Visit_Numpad4(elem)                     {this.stack.push('Numpad4');}
    Visit_Numpad5(elem)                     {this.stack.push('Numpad5');}
    Visit_Numpad6(elem)                     {this.stack.push('Numpad6');}
    Visit_Numpad7(elem)                     {this.stack.push('Numpad7');}
    Visit_Numpad8(elem)                     {this.stack.push('Numpad8');}
    Visit_Numpad9(elem)                     {this.stack.push('Numpad9');}
    Visit_NumpadMultiply(elem)              {this.stack.push('NumpadMultiply');}
    Visit_NumpadAdd(elem)                   {this.stack.push('NumpadAdd');}
    Visit_NumpadDecimal(elem)               {this.stack.push('NumpadDecimal');}
    Visit_NumpadSubstract(elem)             {this.stack.push('NumpadSubstract');}
    Visit_NumpadDivide(elem)                {this.stack.push('NumpadDivide');}
    Visit_NumLock(elem)                     {this.stack.push('NumLock');}
    
    Visit_ForwardTurtle(elem){
        let code = this.PopChildrenFromStack(elem, ['forward', 'dist']);
        this.stack.push(`${code.forward}(${code.dist});`);
    }

    Visit_BackwardTurtle(elem){
        let code = this.PopChildrenFromStack(elem, ['backward', 'dist']);
        this.stack.push(`${code.backward}(${code.dist})`);
    }

    Visit_TurnRight(elem){
        let code = this.PopChildrenFromStack(elem, ['right', 'angle']);
        this.stack.push(`${code.right}(${code.angle});`);
    }

    Visit_TurnLeft(elem){
        let code = this.PopChildrenFromStack(elem, ['left', 'angle']);
        this.stack.push(`${code.left}(${code.angle});`);
    }

    Visit_GotoPosition(elem){
        let code = this.PopChildrenFromStack(elem, ['goto', 'x','y']);
        this.stack.push(`${code.goto}(${code.x} , ${code.y});`);
    }

    Visit_DefineAngle(elem){
        let code = this.PopChildrenFromStack(elem, ['angleP', 'angle']);
        this.stack.push(`${code.angleP}(${code.angle});`);
    }

    Visit_DefineWidthLine(elem){
        let code = this.PopChildrenFromStack(elem, ['widthP', 'width']);
        this.stack.push(`${code.widthP}(${code.width});`);
    }

    Visit_DefineTurtleShape(elem){
        let code = this.PopChildrenFromStack(elem, ['shape', 's']);
        this.stack.push(`${code.shape}(${code.s});`);
    }

    Visit_ChangeColor(elem){
        let code = this.PopChildrenFromStack(elem, ['colour', 'r','g','b','a']);
        this.stack.push(`${code.colour}(${code.r}, ${code.g}, ${code.b}, ${code.a});`);
    }

    Visit_WriteMsg(elem){
        let code = this.PopChildrenFromStack(elem, ['write', 'msg']);
        this.stack.push(`${code.write}(${code.msg});`);
    }

    Visit_RandomInt(elem){
        let code = this.PopChildrenFromStack(elem, ['random', 'low', 'high']);
        this.stack.push(`${code.random}(${code.low}, ${code.high});`);
    }

    Visit_SetRedraw(elem){
        let code = this.PopChildrenFromStack(elem, ['redraw', 'bool']);
        this.stack.push(`${code.redraw}(${code.bool});`);
    }

    Visit_SetWrap(elem){
        let code = this.PopChildrenFromStack(elem, ['wrap', 'bool']);
        this.stack.push(`${code.wrap}(${code.bool});`);
    }

    Visit_SetDelay(elem){
        let code = this.PopChildrenFromStack(elem, ['delay', 'func', 'ms']);
        this.stack.push(`${code.delay}(${code.func}, ${code.ms});`);
    }

    Visit_Shapes(elem)                      {this.stack.push(``);}

    Visit_Forward(elem)                     {this.stack.push('turtle_forward');}
    Visit_Backward(elem)                    {this.stack.push('turtle_backward');}
    Visit_Right(elem)                       {this.stack.push('turtle_right');}
    Visit_Left(elem)                        {this.stack.push('turtle_left');}
    Visit_Goto(elem)                        {this.stack.push('turtle_goto')}
    Visit_Clear(elem)                       {this.stack.push('turtle_clear();');}
    Visit_PenUp(elem)                       {this.stack.push('turtle_penup();');}
    Visit_PenDown(elem)                     {this.stack.push('turtle_pendown();');}
    Visit_Reset(elem)                       {this.stack.push('turtle_reset();')}
    Visit_Angle(elem)                       {this.stack.push('turtle_angle');}
    Visit_Width(elem)                       {this.stack.push('turtle_width');}
    Visit_Shape(elem)                       {this.stack.push('turtle_shape');}
    Visit_Colour(elem)                      {this.stack.push('turtle_colour')}
    Visit_Write(elem)                       {this.stack.push('turtle_write');}
    Visit_Random(elem)                      {this.stack.push('turtle_random');}
    Visit_HideTurtle(elem)                  {this.stack.push('turtle_hideTurtle();');}
    Visit_ShowTurtle(elem)                  {this.stack.push('turtle_showTurtle();');}
    Visit_RedrawOnMove(elem)                {this.stack.push('turtle_redrawOnMove');}    
    Visit_Draw(elem)                        {this.stack.push('turtle_draw()');}
    Visit_Wrap(elem)                        {this.stack.push('turtle_wrap');}
    Visit_Delay(elem)                       {this.stack.push('turtle_delay');}

    Visit_Triangle(elem)                    {this.stack.push('"triangle"');}
    Visit_Circle(elem)                      {this.stack.push('"circle"');}
    Visit_Square(elem)                      {this.stack.push('"square"');}
    Visit_Turtle(elem)                      {this.stack.push('"turtle"');}
    Visit_Repeat(elem)                      {this.IncreaseTabs(); this.stack.push(``);}
    Visit_ChangeOutputColor(elem)           {this.stack.push(``);}

    Visit_Color(elem)                       {this.stack.push('"black"');}
    Visit_Black(elem)                       {this.stack.push('"black"');}
    Visit_Red(elem)                         {this.stack.push('"red"');}
    Visit_Blue(elem)                        {this.stack.push('"blue"');}
    Visit_Green(elem)                       {this.stack.push('"green"');}
    Visit_Yellow(elem)                      {this.stack.push('"yellow"');}
    Visit_Cyan(elem)                        {this.stack.push('"cyan"');}
    Visit_Magenta(elem)                     {this.stack.push('"magenta"');}

    Visit_RgbColor(elem){
        let code = this.PopChildrenFromStack(elem, ['r','g','b','a']);
        this.stack.push(`"rgba(${code.r}, ${code.g}, ${code.b}, ${code.a})"`);
    }

    //WIDGETS
    Visit_Widgets(elem)                     {this.stack.push(``);}
    Visit_CreateElement(elem)               {this.stack.push(``);}
    Visit_ChangeAttribute(elem)             {this.stack.push(``);}
    Visit_AddEventHandler(elem)             {this.stack.push(``);}

    //Creation of widgets
    Visit_NewWindow(elem) {
        let code = this.PopChildrenFromStack(elem, ['window','name','on','x','y','w','h']);
        this.stack.push(`new_window("${code.name}",${code.x}, ${code.y}, ${code.w}, ${code.h});`);
    }
    
    Visit_NewButton(elem){
        let code = this.PopChildrenFromStack(elem, ['parent','button','name','on','x','y','w','h','text']);
        this.stack.push(`new_button("${code.parent}","${code.name}",${code.x}, ${code.y}, ${code.w}, ${code.h}, ${code.text});`);
    }
    
    Visit_NewTextfield(elem) {
        let code = this.PopChildrenFromStack(elem, ['parent','textfield','name','on','x','y','w']);
        this.stack.push(`new_textfield("${code.parent}","${code.name}",${code.x}, ${code.y}, ${code.w});`);
    }

    Visit_NewTextarea(elem) {
        let code = this.PopChildrenFromStack(elem, ['parent','textarea','name','on','x','y','w','h']);
        this.stack.push(`new_textarea("${code.parent}","${code.name}",${code.x}, ${code.y}, ${code.w},${code.h});`);
    }

    Visit_NewCheckbox(elem){
        let code = this.PopChildrenFromStack(elem, ['parent','textarea','name','on','x','y','text']);
        this.stack.push(`new_checkbox("${code.parent}","${code.name}",${code.x}, ${code.y},${code.text});`)
    }

    Visit_NewDropdown(elem){
        let code = this.PopChildrenFromStack(elem, ['parent','dropdown','name','on','x','y','options']);
        this.stack.push(`new_dropdown("${code.parent}","${code.name}",${code.x}, ${code.y},${code.options});`)
    }

    Visit_NewSlider(elem){
        let code = this.PopChildrenFromStack(elem, ['parent','slider','name','on','x','y','label']);
        this.stack.push(`new_slider("${code.parent}","${code.name}",${code.x}, ${code.y},${code.label});`)
    }

    Visit_On(elem)                          {this.stack.push(``);}

    Visit_Options(elem){
        let code;
        code = this.PopChildrenFromStack(elem).join(', ');
        this.stack.push(`${code}`);
    }

    Visit_Window(elem)                      {this.stack.push(``);}
    Visit_Button(elem)                      {this.stack.push(``);}
    Visit_Textfield(elem)                   {this.stack.push(``);}
    Visit_Textarea(elem)                    {this.stack.push(``);}
    Visit_Checkbox(elem)                    {this.stack.push(``);}
    Visit_Dropdown(elem)                    {this.stack.push(``);}
    Visit_Slider(elem)                      {this.stack.push(``);}

    //Change Attributes
    Visit_ChangeWindow(elem)                {this.stack.push(``);}
    Visit_ChangeButton(elem)                {this.stack.push(``);}
    Visit_ChangeTextfield(elem)             {this.stack.push(``);}
    Visit_ChangeTextarea(elem)              {this.stack.push(``);}
    Visit_ChangeCheckbox(elem)              {this.stack.push(``);}
    Visit_ChangeDropdown(elem)              {this.stack.push(``);}
    Visit_ChangeSlider(elem)                {this.stack.push(``);}

    Visit_WindowWidth(elem) {
        let code = this.PopChildrenFromStack(elem, ['change','name','w','value']);
        this.stack.push(`change_width("${code.name}",${code.value});`)
    }

    Visit_WindowHeight(elem) {
        let code = this.PopChildrenFromStack(elem, ['change','name','h','value']);
        this.stack.push(`change_height("${code.name}",${code.value});`)
    }

    Visit_WindowColor(elem) {
        let code = this.PopChildrenFromStack(elem, ['change','name','background','value']);
        this.stack.push(`change_color("${code.name}",${code.value});`)
    }
  
    Visit_ButtonDisabled(elem) {
        let code = this.PopChildrenFromStack(elem, ['change','name','disable','value']);
        this.stack.push(`change_button_disable("${code.name}",${code.value});`)
    }

    Visit_ButtonText(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','text','value']);
        this.stack.push(`change_button_text("${code.name}",${code.value});`)
    }

    Visit_ButtonColor(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','background','value']);
        this.stack.push(`change_color("${code.name}",${code.value});`)
    }

    Visit_ButtonWidth(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','w','value']);
        this.stack.push(`change_width("${code.name}",${code.value});`)
    }

    Visit_ButtonHeight(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','h','value']);
        this.stack.push(`change_height("${code.name}",${code.value});`)
    }

    Visit_ButtonPosition(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','on','x','y']);
        this.stack.push(`change_position("${code.name}",${code.x},${code.y});`)
    }

    Visit_TextfieldWidth(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','w','value']);
        this.stack.push(`change_width("${code.name}",${code.value});`)
    }

    Visit_TextfieldPosition(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','on','x','y']);
        this.stack.push(`change_position("${code.name}",${code.x},${code.y});`)
    }

    Visit_TextfieldValue(elem) {
        let code = this.PopChildrenFromStack(elem, ['change','name','text','value']);
        this.stack.push(`change_textfield_value("${code.name}",${code.value});`)
    }

    Visit_TextfieldMaxlenght(elem) {
        let code = this.PopChildrenFromStack(elem, ['change','name','max','maxlenght']);
        this.stack.push(`change_maxLength("${code.name}",${code.maxlenght});`)
    }

    Visit_TextareaHeight(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','h','value']);
        this.stack.push(`change_height("${code.name}",${code.value});`)
    }

    Visit_TextareaWidth(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','w','value']);
        this.stack.push(`change_width("${code.name}",${code.value});`)
    } 

    Visit_TextareaPosition(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','on','x','y']);
        this.stack.push(`change_position("${code.name}",${code.x},${code.y});`)
    }

    Visit_TextareaMaxlenght(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','max','maxlenght']);
        this.stack.push(`change_maxLength("${code.name}",${code.maxlenght});`)
    }

    Visit_CheckboxPosition(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','on','x','y']);
        this.stack.push(`change_position("Checkbox${code.name}",${code.x},${code.y});`)
    }

    Visit_CheckboxText(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','text','value']);
        this.stack.push(`change_checkbox_text("CheckboxLabel${code.name}",${code.value});`)
    }

    Visit_CheckboxChecked(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','checked','value']);
        this.stack.push(`change_checkbox_checked("${code.name}",${code.value});`)
    }

    Visit_DropdownPosition(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','on','x','y']);
        this.stack.push(`change_position("${code.name}",${code.x},${code.y});`)
    }

    Visit_DropdownMultiple(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','multiple','value']);
        this.stack.push(`change_dropdown_multiple("${code.name}",${code.value});`)
    }

    Visit_DropdownAddOption(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','new_option','option']);
        this.stack.push(`add_dropdown_option("${code.name}",${code.option});`)
    }

    Visit_SliderPosition(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','on','x','y']);
        this.stack.push(`change_position("Slider${code.name}",${code.x},${code.y});`)
    }

    Visit_SliderLabel(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','label','value']);
        this.stack.push(`change_slider_label("SliderLabel${code.name}",${code.value});`)
    }

    Visit_SliderMin(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','min','minvalue']);
        this.stack.push(`change_slider_min("${code.name}",${code.minvalue});`)
    }

    Visit_SliderMax(elem){
        let code = this.PopChildrenFromStack(elem, ['change','name','max','maxvalue']);
        this.stack.push(`change_slider_max("${code.name}",${code.maxvalue});`)
    }

    //Event Handlers
    Visit_ButtonEvent(elem){
        let code = this.PopChildrenFromStack(elem, ['on_press','name','stmts']);

        this.stack.push(`add_button_event("${code.name}",function(){
        ${code.stmts}
    });`)
    }

    Visit_CheckboxEvent(elem){
        let code = this.PopChildrenFromStack(elem, ['on_select','name','stmts']);

        this.stack.push(`add_checkbox_event("${code.name}",function(){
        ${code.stmts}
    });`)
    }

    Visit_DropdownEvent(elem) {
        let code = this.PopChildrenFromStack(elem, ['on_select','name','option','stmts']);

        this.stack.push(`add_dropdown_event("${code.name}","${code.option}",function(){
        ${code.stmts}
    });`)
    }

    //widget terminals
    Visit_Change(elem)                      {this.stack.push(``);}
    Visit_Disable(elem)                     {this.stack.push(``);}
    Visit_Text(elem)                        {this.stack.push(``);}
    Visit_Label(elem)                       {this.stack.push(``);}
    Visit_NewWidth(elem)                    {this.stack.push(``);}
    Visit_NewHeight(elem)                   {this.stack.push(``);}
    Visit_Background(elem)                  {this.stack.push(``);}
    Visit_Checked(elem)                     {this.stack.push(``);}
    Visit_Multiple(elem)                    {this.stack.push(``);}
    Visit_NewOption(elem)                   {this.stack.push(``);}
    Visit_Min(elem)                         {this.stack.push(``);}
    Visit_Max(elem)                         {this.stack.push(``);}
    Visit_OnPress(elem)                     {this.stack.push(``);}
    Visit_OnSelect(elem)                    {this.stack.push(``);}
}

