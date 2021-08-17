export let config = {
    language: {
        definitions: [
            {
                name: "program",
                all_of: [
                    {
                        type: "non_terminal",
                        name: "stmts"
                    }
                ]
            },
            {
                name: "stmts",
                list_of: [
                    {
                        type: "non_terminal",
                        name: "stmt",
                    },
                ]
            },
            {
                name: "stmt",
                any_of: [
                    {
                        type: "non_terminal",
                        name: "if_stmt",
                        tooltip: "Do something if a condition is true"
                    },
                    {
                        type: "non_terminal",
                        name: "if_else_stmt",
                        tooltip: "Do something if a condition is true, else do something else"
                    },
                    {
                        type: "non_terminal",
                        name: "while_stmt",
                        tooltip: "Do something while a condition is true"
                    },
                    {
                        type: "non_terminal",
                        name: "for_stmt",
                        tooltip: "Do something while a condition is true. Commonly used with a known number of iterations."
                    },
                    {
                        type: "non_terminal",
                        name: "assign_stmt",
                        tooltip: "Set a variable's value"
                    },
                    {
                        type: "non_terminal",
                        name: "func_def_stmt",
                        tooltip: "Define reusable code as a function"
                    },
                    {
                        type: "non_terminal",
                        name: "func_call_stmt",
                        tooltip: "Use a defined function"
                    }
                ]
            },
            {
                name: "expr",
                any_of: [
                    {
                        type: "non_terminal",
                        name: "arith_expr",
                        tooltip: "Perform a mathematic operation"
                    },
                    {
                        type: "non_terminal",
                        name: "rel_expr",
                        tooltip: "An operator that compares the 2 operands and returns true or false"
                    },
                    {
                        type: "non_terminal",
                        name: "bool_expr",
                        tooltip: "An expression that evaluates to true or false"
                    },
                    {
                        type: "non_terminal",
                        name: "primary_expr",
                        tooltip: "An identifier or a constant"
                    }
                ]
            },
            {
                name: "arith_expr",
                any_of: [
                    {
                        type: "non_terminal",
                        name: "binary_arith_expr",
                        tooltip: "An arithmetic expression with 2 operands"
                    },
                    {
                        type: "non_terminal",
                        name: "unary_minus",
                        tooltip: "Negates the value of its operand"
                    }
                ]
            },
            {
                name: "binary_arith_expr",
                all_of: [
                    {
                        type: "terminal",
                        name: "LEFT_PARENTHESIS",
                        alias: "(",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        name: "expr",
                        tooltip: "The first operand"
                    },
                    {
                        type: "non_terminal",
                        name: "arith_op",
                        tooltip: "An arithmetic operator (e.g. +, -)"
                    },
                    {
                        type: "non_terminal",
                        name: "expr",
                        tooltip: "The second operand"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_PARENTHESIS",
                        alias: ")",
                        textViewOnly: true
                    },
                ]
            },
            {
                name: "unary_minus",
                all_of: [
                    {
                        type: "terminal",
                        name: "MINUS",
                        alias: "-"
                    },
                    {
                        type: "non_terminal",
                        name: "expr"
                    },
                ]
            },
            {
                name: "arith_op",
                any_of: [
                    {
                        type: "terminal",
                        name: "PLUS",
                        alias: "+",
                        tooltip: "Performs addition"
                    },
                    {
                        type: "terminal",
                        name: "MINUS",
                        alias: "-",
                        tooltip: "Performs subtraction"
                    },
                    {
                        type: "terminal",
                        name: "TIMES",
                        alias: "*",
                        tooltip: "Performs multiplication"
                    },
                    {
                        type: "terminal",
                        name: "BY",
                        alias: "/",
                        tooltip: "Performs division"
                    }
                ]
            },
            {
                name: "rel_expr",
                all_of: [
                    {
                        type: "terminal",
                        name: "LEFT_PARENTHESIS",
                        alias: "(",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        name: "expr",
                        tooltip: "The first operand"
                    },
                    {
                        type: "non_terminal",
                        name: "rel_op",
                        tooltip: "A comparison operator that returns true or false (e.g <, >)"
                    },
                    {
                        type: "non_terminal",
                        name: "expr",
                        tooltip: "The second operand"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_PARENTHESIS",
                        alias: ")",
                        textViewOnly: true
                    },
                ]
            },
            {
                name: "rel_op",
                any_of: [
                    {
                        type: "terminal",
                        name: "GREATER",
                        alias: ">",
                        tooltip: "Returns true if the first operand is greater than the second operand, else returns false"
                    },
                    {
                        type: "terminal",
                        name: "LESS",
                        alias: "<",
                        tooltip: "Returns true if the first operand is less than the second operand, else returns false"
                    },
                    {
                        type: "terminal",
                        name: "EQUAL_TO",
                        alias: "==",
                        tooltip: "Returns true if the first operand is equal to the second operand, else returns false"
                    },
                    {
                        type: "terminal",
                        name: "NOT_EQUAL_TO",
                        alias: "!=",
                        tooltip: "Returns true if the first operand not equal to the second operand, else returns false"
                    },
                    {
                        type: "terminal",
                        name: "GREATER_EQUAL",
                        alias: ">=",
                        tooltip: "Returns true if the first operand is greater than or equal to the second operand, else returns false"
                    },
                    {
                        type: "terminal",
                        name: "LESS_EQUAL",
                        alias: "<=",
                        tooltip: "Returns true if the first operand is less than or equal to the second operand, else returns false"
                    }
                ]
            },
            {
                name: "bool_expr",
                any_of: [
                    {
                        type: "non_terminal",
                        name: "binary_bool_expr",
                        tooltip: "Performs a binary operation with 2 operands"
                    },
                    {
                        type: "non_terminal",
                        name: "not_expr",
                        tooltip: "Performs logical negation. True becomes false and false becomes true"
                    }
                ]
            },
            {
                name: "binary_bool_expr",
                all_of: [
                    {
                        type: "terminal",
                        name: "LEFT_PARENTHESIS",
                        alias: "(",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        name: "expr",
                        tooltip: "The first operand"
                    },
                    {
                        type: "non_terminal",
                        name: "bool_bin_op",
                        tooltip: "Performs a binary operation with 2 operands"
                    },
                    {
                        name: "expr",
                        type: "non_terminal",
                        tooltip: "The second operand"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_PARENTHESIS",
                        alias: ")",
                        textViewOnly: true
                    },
                ]
            },
            {
                name: "bool_bin_op",
                any_of: [
                    {
                        type: "terminal",
                        name: "AND",
                        tooltip: "Returns true if both operands are true, else returns false"
                    },
                    {
                        type: "terminal",
                        name: "OR",
                        tooltip: "Returns true if either operand is true, else returns false"
                    }
                ]
            },
            {
                name: "not_expr",
                all_of: [
                    {
                        type: "terminal",
                        name: "NOT",
                        tooltip: "Returns true if the operand is false, else returns false"
                    },
                    {
                        type: "non_terminal",
                        name: "expr",
                        tooltip: "The operand"
                    }
                ]
            },
            {
                name: "primary_expr",
                any_of: [
                    {
                        type: "terminal",
                        name: "IDENT",
                        tooltip: "An identifier starting with _ or a uppercase/lowercase letter following by 0 or more characters that can be _ numbers lowercase/uppercase letters"
                    },
                    {
                        type: "terminal",
                        name: "INT_CONST",
                        tooltip: "An integer is a positive, zero, or negative number that can be written without a fractional component (i.e. no decimal point places)"
                    },
                    {
                        type: "terminal",
                        name: "FLOAT_CONST",
                        tooltip: "A floating-point number is a rational number (i.e. includes numbers with decimal point places"
                    },
                    {
                        type: "terminal",
                        name: "CHAR_CONST",
                        tooltip: "One single character"
                    },
                    {
                        type: "terminal",
                        name: "STRING_CONST",
                        tooltip: "Any sequence of characters or the empty sequence"
                    },
                    {
                        type: "terminal",
                        name: "BOOL_CONST",
                        tooltip: "One of true or false"
                    }
                ]
            },
            {
                name: "assign_stmt",
                all_of: [
                    {
                        type: "terminal",
                        name: "IDENT",
                    },
                    {
                        type: "terminal",
                        name: "EQUALS",
                        alias: "="
                    },
                    {
                        type: "non_terminal",
                        name: "expr"
                    },
                ]
            },
            {
                name: "func_def_stmt",
                all_of: [
                    {
                        type: "terminal",
                        name: "FUNCTION",
                    },
                    {
                        type: "terminal",
                        name: "IDENT",
                        alias: "NAME"
                    },
                    {
                        type: "terminal",
                        name: "OF",
                    },
                    {
                        type: "terminal",
                        name: "LEFT_PARENTHESIS",
                        alias: "(",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        name: "ident_list"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_PARENTHESIS",
                        alias: ")",
                        textViewOnly: true
                    },
                    {
                        type: "terminal",
                        name: "LEFT_CURLY_BRACE",
                        alias: "{",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        name: "stmts"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_CURLY_BRACE",
                        alias: "}",
                        textViewOnly: true
                    },
                ]
            },
            {
                name: "func_call_stmt",
                all_of: [
                    {
                        type: "terminal",
                        name: "CALL",
                    },
                    {
                        type: "terminal",
                        name: "IDENT",
                        alias: "FUNCTION NAME"
                    },
                    {
                        type: "terminal",
                        name: "WITH",
                    },
                    {
                        type: "terminal",
                        name: "LEFT_PARENTHESIS",
                        alias: "(",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        name: "expr_list"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_PARENTHESIS",
                        alias: ")",
                        textViewOnly: true
                    },
                ]
            },
            {
                name: "if_stmt",
                all_of: [
                    {
                        type: "terminal",
                        name: "IF"
                    },
                    {
                        type: "terminal",
                        name: "LEFT_PARENTHESIS",
                        alias: "(",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        alias: "condition",
                        name: "expr"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_PARENTHESIS",
                        alias: ")",
                        textViewOnly: true
                    },
                    {
                        type: "terminal",
                        name: "LEFT_CURLY_BRACE",
                        alias: "{",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        alias: "if_part",
                        name: "stmts"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_CURLY_BRACE",
                        alias: "}",
                        textViewOnly: true
                    },
                ]
            },
            {
                name: "if_else_stmt",
                all_of: [
                    {
                        type: "terminal",
                        name: "IF"
                    },
                    {
                        type: "terminal",
                        name: "LEFT_PARENTHESIS",
                        alias: "(",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        alias: "condition",
                        name: "expr"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_PARENTHESIS",
                        alias: ")",
                        textViewOnly: true
                    },
                    {
                        type: "terminal",
                        name: "LEFT_CURLY_BRACE",
                        alias: "{",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        alias: "if_part",
                        name: "stmts"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_CURLY_BRACE",
                        alias: "}",
                        textViewOnly: true
                    },
                    {
                        type: "terminal",
                        name: "ELSE"
                    },
                    {
                        type: "terminal",
                        name: "LEFT_CURLY_BRACE",
                        alias: "{",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        alias: "else_part",
                        name: "stmts"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_CURLY_BRACE",
                        alias: "}",
                        textViewOnly: true
                    },
                ]
            },
            {
                name: "while_stmt",
                all_of: [
                    {
                        type: "terminal",
                        name: "WHILE"
                    },
                    {
                        type: "terminal",
                        name: "LEFT_PARENTHESIS",
                        alias: "(",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        alias: "condition",
                        name: "expr"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_PARENTHESIS",
                        alias: ")",
                        textViewOnly: true
                    },
                    {
                        type: "terminal",
                        name: "LEFT_CURLY_BRACE",
                        alias: "{",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        alias: "while_part",
                        name: "stmts"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_CURLY_BRACE",
                        alias: "}",
                        textViewOnly: true
                    },
                ]
            },
            {
                name: "for_stmt",
                all_of: [
                    {
                        type: "terminal",
                        name: "FOR"
                    },
                    {
                        type: "terminal",
                        name: "LEFT_PARENTHESIS",
                        alias: "(",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        alias: "initialization",
                        name: "assign_stmt"
                    },
                    {
                        type: "terminal",
                        name: "SEMI_COLON",
                        alias: ";",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        alias: "condition",
                        name: "expr"
                    },
                    {
                        type: "terminal",
                        name: "SEMI_COLON",
                        alias: ";",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        alias: "step",
                        name: "assign_stmt"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_PARENTHESIS",
                        alias: ")",
                        textViewOnly: true
                    },
                    {
                        type: "terminal",
                        name: "LEFT_CURLY_BRACE",
                        alias: "{",
                        textViewOnly: true
                    },
                    {
                        type: "non_terminal",
                        alias: "for_part",
                        name: "stmts"
                    },
                    {
                        type: "terminal",
                        name: "RIGHT_CURLY_BRACE",
                        alias: "}",
                        textViewOnly: true
                    },
                ]
            },
            {
                name: "ident_list",
                list_of: [
                    {
                        type: "terminal",
                        name: "IDENT",
                    },
                ]
            },
            {
                name: "expr_list",
                list_of: [
                    {
                        type: "non_terminal",
                        name: "expr",
                        alias: 'ARG',
                    },
                ]
            }
        ],
        terminalTypes: [
            {
                name: "INT_CONST",
                type: "INT",
            },
            {
                name: "FLOAT_CONST",
                type: "FLOAT",
            },
            {
                name: "CHAR_CONST",
                type: "CHAR",
            },
            {
                name: "STRING_CONST",
                type: "STRING",
            },
            {
                name: "BOOL_CONST",
                type: "BOOL",
            },
            {
                name: "IDENT",
                type: "IDENTIFIER"
            }
        ]
    },
    theme: {
        "Blocks": {
            "General": {
                "Group": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "RepetitionGroup": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Button": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": ""
                    },
                    "Button Plus Sign": {
                        "Width": "",
                        "Height": "",
                        "BackgroundColor": ""
                    },
                    "Button Tooltip": {
                        "FontSize": "",
                        "FontColor": "",
                        "BackgroundColor": ""
                    },
                    "Button On Hover": {
                        "BackgroundColor": "#007ACC"
                    },
                    "Button Plus Sign On Hover": {
                        "BackgroundColor": "#ffffff"
                    }
                },
                "SimpleBlock": {
                    "Simple Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "InputBlock": {
                    "Input Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "5px",
                        "PaddingBottom": "5px",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Input": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "",
                        "FontSize": ""
                    }
                },
                "SelectionBlock": {
                    "Selection Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "5px",
                        "PaddingBottom": "5px",
                        "FontSize": "",
                        "FontColor": "",
                        "Gap": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Arrow": {
                        "BackgroundColor": "",
                        "Width": "",
                        "Height": ""
                    },
                    "Option Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": ""
                    },
                    "Option": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": ""
                    },
                    "Option On Hover": {
                        "BackgroundColor": "#094771",
                        "FontColor": "#E5ECF0"
                    },
                    "Option Tooltip": {
                        "FontSize": "",
                        "FontColor": "",
                        "BackgroundColor": ""
                    }
                }
            },
            "Specific": {
                "LEFT_PARENTHESIS": {
                    "Simple Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "RIGHT_PARENTHESIS": {
                    "Simple Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "MINUS": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "PLUS": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "TIMES": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "BY": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "GREATER": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "LESS": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "EQUAL_TO": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "NOT_EQUAL_TO": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "GREATER_EQUAL": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "LESS_EQUAL": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "AND": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "OR": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "NOT": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "IDENT": {
                    "Input Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "#37373D",
                        "BorderRadius": ""
                    },
                    "Input": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#4A9CD6",
                        "FontSize": ""
                    }
                },
                "INT_CONST": {
                    "Input Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "#37373D",
                        "BorderRadius": ""
                    },
                    "Input": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#44C9B0",
                        "FontSize": ""
                    }
                },
                "FLOAT_CONST": {
                    "Input Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "#37373D",
                        "BorderRadius": ""
                    },
                    "Input": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#44C9B0",
                        "FontSize": ""
                    }
                },
                "CHAR_CONST": {
                    "Input Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "#37373D",
                        "BorderRadius": ""
                    },
                    "Input": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#CE9178",
                        "FontSize": ""
                    }
                },
                "STRING_CONST": {
                    "Input Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "#37373D",
                        "BorderRadius": ""
                    },
                    "Input": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#CE9178",
                        "FontSize": ""
                    }
                },
                "BOOL_CONST": {
                    "Input Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "#37373D",
                        "BorderRadius": ""
                    },
                    "Input": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#8CDCFE",
                        "FontSize": ""
                    }
                },
                "EQUALS": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#DCB962",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "FUNCTION": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#C57991",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "OF": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#C57991",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "LEFT_CURLY_BRACE": {
                    "Simple Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "RIGHT_CURLY_BRACE": {
                    "Simple Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "CALL": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#C57991",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "WITH": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#C57991",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "IF": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#C57991",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "ELSE": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#C57991",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "WHILE": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#C57991",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "FOR": {
                    "Simple Block": {
                        "BackgroundColor": "transparent",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "#C57991",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "SEMI_COLON": {
                    "Simple Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontColor": "",
                        "FontSize": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "program": {},
                "stmts": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Button": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": ""
                    },
                    "Button Plus Sign": {
                        "Width": "",
                        "Height": "",
                        "BackgroundColor": ""
                    },
                    "Button Tooltip": {
                        "FontSize": "",
                        "FontColor": "",
                        "BackgroundColor": ""
                    },
                    "Button On Hover": {
                        "BackgroundColor": ""
                    },
                    "Button Plus Sign On Hover": {
                        "BackgroundColor": ""
                    }
                },
                "stmt": {
                    "Selection Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": "",
                        "Gap": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Arrow": {
                        "BackgroundColor": "",
                        "Width": "",
                        "Height": ""
                    },
                    "Option Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": ""
                    },
                    "Option": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": ""
                    },
                    "Option On Hover": {
                        "BackgroundColor": "",
                        "FontColor": ""
                    },
                    "Option Tooltip": {
                        "FontSize": "",
                        "FontColor": "",
                        "BackgroundColor": ""
                    }
                },
                "if_stmt": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "if_else_stmt": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "while_stmt": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "for_stmt": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "assign_stmt": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "func_def_stmt": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "func_call_stmt": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "expr": {
                    "Selection Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": "",
                        "Gap": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Arrow": {
                        "BackgroundColor": "",
                        "Width": "",
                        "Height": ""
                    },
                    "Option Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": ""
                    },
                    "Option": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": ""
                    },
                    "Option On Hover": {
                        "BackgroundColor": "",
                        "FontColor": ""
                    },
                    "Option Tooltip": {
                        "FontSize": "",
                        "FontColor": "",
                        "BackgroundColor": ""
                    }
                },
                "arith_expr": {
                    "Selection Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": "",
                        "Gap": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Arrow": {
                        "BackgroundColor": "",
                        "Width": "",
                        "Height": ""
                    },
                    "Option Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": ""
                    },
                    "Option": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": ""
                    },
                    "Option On Hover": {
                        "BackgroundColor": "",
                        "FontColor": ""
                    },
                    "Option Tooltip": {
                        "FontSize": "",
                        "FontColor": "",
                        "BackgroundColor": ""
                    }
                },
                "rel_expr": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "bool_expr": {
                    "Selection Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": "",
                        "Gap": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Arrow": {
                        "BackgroundColor": "",
                        "Width": "",
                        "Height": ""
                    },
                    "Option Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": ""
                    },
                    "Option": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": ""
                    },
                    "Option On Hover": {
                        "BackgroundColor": "",
                        "FontColor": ""
                    },
                    "Option Tooltip": {
                        "FontSize": "",
                        "FontColor": "",
                        "BackgroundColor": ""
                    }
                },
                "primary_expr": {
                    "Selection Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": "",
                        "Gap": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Arrow": {
                        "BackgroundColor": "",
                        "Width": "",
                        "Height": ""
                    },
                    "Option Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": ""
                    },
                    "Option": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": ""
                    },
                    "Option On Hover": {
                        "BackgroundColor": "",
                        "FontColor": ""
                    },
                    "Option Tooltip": {
                        "FontSize": "",
                        "FontColor": "",
                        "BackgroundColor": ""
                    }
                },
                "binary_arith_expr": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "unary_minus": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "arith_op": {
                    "Selection Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": "",
                        "Gap": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Arrow": {
                        "BackgroundColor": "",
                        "Width": "",
                        "Height": ""
                    },
                    "Option Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": ""
                    },
                    "Option": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": ""
                    },
                    "Option On Hover": {
                        "BackgroundColor": "",
                        "FontColor": ""
                    },
                    "Option Tooltip": {
                        "FontSize": "",
                        "FontColor": "",
                        "BackgroundColor": ""
                    }
                },
                "rel_op": {
                    "Selection Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": "",
                        "Gap": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Arrow": {
                        "BackgroundColor": "",
                        "Width": "",
                        "Height": ""
                    },
                    "Option Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": ""
                    },
                    "Option": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": ""
                    },
                    "Option On Hover": {
                        "BackgroundColor": "",
                        "FontColor": ""
                    },
                    "Option Tooltip": {
                        "FontSize": "",
                        "FontColor": "",
                        "BackgroundColor": ""
                    }
                },
                "binary_bool_expr": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "not_expr": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    }
                },
                "bool_bin_op": {
                    "Selection Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": "",
                        "Gap": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Arrow": {
                        "BackgroundColor": "",
                        "Width": "",
                        "Height": ""
                    },
                    "Option Container": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": ""
                    },
                    "Option": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "FontSize": "",
                        "FontColor": ""
                    },
                    "Option On Hover": {
                        "BackgroundColor": "",
                        "FontColor": ""
                    },
                    "Option Tooltip": {
                        "FontSize": "",
                        "FontColor": "",
                        "BackgroundColor": ""
                    }
                },
                "ident_list": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Button": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": ""
                    },
                    "Button Plus Sign": {
                        "Width": "",
                        "Height": "",
                        "BackgroundColor": ""
                    },
                    "Button Tooltip": {
                        "FontSize": "",
                        "FontColor": "",
                        "BackgroundColor": ""
                    },
                    "Button On Hover": {
                        "BackgroundColor": ""
                    },
                    "Button Plus Sign On Hover": {
                        "BackgroundColor": ""
                    }
                },
                "expr_list": {
                    "Group Block": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": "",
                        "BorderRadius": ""
                    },
                    "Button": {
                        "BackgroundColor": "",
                        "PaddingLeft": "",
                        "PaddingRight": "",
                        "PaddingTop": "",
                        "PaddingBottom": "",
                        "BorderWidth": "",
                        "BorderColor": ""
                    },
                    "Button Plus Sign": {
                        "Width": "",
                        "Height": "",
                        "BackgroundColor": ""
                    },
                    "Button Tooltip": {
                        "FontSize": "",
                        "FontColor": "",
                        "BackgroundColor": ""
                    },
                    "Button On Hover": {
                        "BackgroundColor": ""
                    },
                    "Button Plus Sign On Hover": {
                        "BackgroundColor": ""
                    }
                }
            }
        },
        "Code Workspace": {
            "Code Workspace": {
                "BackgroundColor": ""
            },
            "Scrollbar": {
                "Width": "",
                "Height": ""
            },
            "Scrollbar Thumb": {
                "BackgroundColor": "",
                "BorderRadius": ""
            },
            "Scrollbar Thumb On Hover": {
                "BackgroundColor": ""
            },
            "Scrollbar Track": {
                "BackgroundColor": "",
                "BorderWidth": "",
                "BorderColor": ""
            }
        },
        "Toolbox": {
            "Toolbox Menu": {
                "BackgroundColor": "",
                "PaddingLeft": "",
                "PaddingRight": "",
                "PaddingTop": "",
                "PaddingBottom": "",
            },
            "Toolbox Menu Icon": {
                "BackgroundColor": "",
                "Width": "",
                "Height": ""
            },
            "Toolbox Menu Selected Icon": {
                "BackgroundColor": "#ffffff"
            },
            "Toolbox Menu Label": {
                "FontColor": "",
                "FontSize": ""
            },
            "Toolbox Menu Selected Label": {
                "FontColor": "#ffffff"
            },
            "Selected Tag": {
                "BackgroundColor": ""
            },
            "Toolbox": {
                "BackgroundColor": ""
            },
            "Block Category Title": {
                "FontSize": "",
                "FontColor": ""
            },
            "Block Category On Drop Hover": {
                "BackgroundColor": ""
            },
            "Block Category On Drop Placeholder": {
                "BackgroundColor": ""
            },
            "Block Delete Button Container": {
                "BackgroundColor": ""
            },
            "Block Delete Button X": {
                "BackgroundColor": ""
            },
            "Scrollbar": {
                "Width": "",
                "Height": ""
            },
            "Scrollbar Thumb": {
                "BackgroundColor": ""
            },
            "Scrollbar Thumb On Hover": {
                "BackgroundColor": ""
            },
            "Scrollbar Track": {
                "BackgroundColor": "",
                "BorderWidth": "",
                "BorderColor": ""
            }
        },
        "Undo Redo Toolbar": {
            "Undo Button": {
                "BackgroundColor": "",
                "FontColor": "",
                "FontSize": ""
            },
            "Undo Button On Hover": {
                "BackgroundColor": "",
                "FontColor": "",
                "FontSize": ""
            },
            "Undo Icon": {
                "BackgroundColor": ""
            },
            "Undo Number Notification": {
                "BackgroundColor": ""
            },
            "Separator": {
                "BackgroundColor": "",
                "Width": "1px"
            },
            "Close Button": {
                "BackgroundColor": ""
            },
            "Close Button X": {
                "BackgroundColor": "#F2F2F2"
            },
            "Close Button On Hover": {
                "BackgroundColor": "#0B598E"
            },
            "Close Button X On Hover": {
                "BackgroundColor": "#FFFFFF"
            }
        },
        "Context Menu": {
            "Option Container": {
                "BackgroundColor": "",
                "BorderWidth": "",
                "BorderColor": "",
                "BorderRadius": "",
                "PaddingLeft": "",
                "PaddingRight": "",
                "PaddingTop": "",
                "PaddingBottom": ""
            },
            "Option": {
                "BackgroundColor": "",
                "PaddingLeft": "",
                "PaddingRight": "",
                "PaddingTop": "",
                "PaddingBottom": ""
            },
            "Option On Hover": {
                "BackgroundColor": "#094771"
            },
            "Option Text": {
                "FontColor": ""
            },
            "Option Text On Hover": {
                "FontColor": ""
            },
            "Shortcut text": {
                "FontColor": ""
            },
            "Shortcut text On Hover": {
                "FontColor": ""
            },
            "Separator": {
                "BackgroundColor": ""
            }
        }
    },
    styles: {
        "PLUS" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962'
        },
        "MINUS" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962'
        },
        "TIMES" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962'
        },
        "BY" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962',
        },
        "EQUAL_TO" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962',
        },
        "NOT_EQUAL_TO" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962',
        },
        "GREATER" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962',
        },
        "LESS" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962',
        },
        "GREATER_EQUAL" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962',
        },
        "LESS_EQUAL" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962',
        },
        "AND" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962',
            'text-decoration': 'underline'
        },
        "OR" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962',
            'text-decoration': 'underline'
        },
        "NOT" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962',
            'text-decoration': 'underline'
        },
        "IDENT" : {
            'background-color': 'transparent',
            'border-color': '#37373D',
            'color': '#4A9CD6',
            'font-weight': '700'
        },
        "INT_CONST" : {
            'background-color': 'transparent',
            'border-color': '#37373D',
            'color': '#44C9B0',
            'font-weight': '700'
        },
        "FLOAT_CONST" : {
            'background-color': 'transparent',
            'border-color': '#37373D',
            'color': '#44C9B0',
            'font-weight': '700'
        },
        "CHAR_CONST" : {
            'background-color': 'transparent',
            'border-color': '#37373D',
            'color': '#CE9178',
            'font-weight': '700'
        },
        "STRING_CONST" : {
            'background-color': 'transparent',
            'border-color': '#37373D',
            'color': '#CE9178',
            'font-weight': '700'
        },
        "BOOL_CONST" : {
            'background-color': 'transparent',
            'border-color': '#37373D',
            'color': '#8CDCFE',
            'font-weight': '700'
        },
        "EQUALS" : {
            'background-color': 'transparent',
            'font-weight': '900',
            'color': '#DCB962',
        },
        "IF" : {
            'background-color': 'transparent',
            'color': '#C57991',
            'font-weight': '900',
        },
        "ELSE" : {
            'background-color': 'transparent',
            'color': '#C57991',
            'font-weight': '900',
        },
        "WHILE" : {
            'background-color': 'transparent',
            'color': '#C57991',
            'font-weight': '900',
        },
        "FOR" : {
            'background-color': 'transparent',
            'color': '#C57991',
            'font-weight': '900',
        },
        "FUNCTION" : {
            'background-color': 'transparent',
            'color': '#C57991',
            'font-weight': '900',
        },
        "OF" : {
            'background-color': 'transparent',
            'color': '#C57991',
            'font-weight': '900',
        },
        "CALL" : {
            'background-color': 'transparent',
            'color': '#C57991',
            'font-weight': '900',
        },
        "WITH" : {
            'background-color': 'transparent',
            'color': '#C57991',
            'font-weight': '900',
        },
        "LEFT_CURLY_BRACE.pure-text" : {
            'display': 'flex',
            'margin-top': '5px'
        },
        "RIGHT_CURLY_BRACE.pure-text" : {
            'display': 'flex',
            'margin-top': '5px'
        },
    },
    toolbox: [
        {
            "name": "Control",
            "icon": "./Images/Toolbox/control.svg",
            "blocks": [
                {
                    "symbol": {
                        "symbol": {
                            "name": "if_stmt",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "Do something if a condition is true"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "IF",
                                    "isTerminal": true
                                },
                                "textViewOnly": false
                            },
                            "type": "SimpleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "alias": "condition",
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_CURLY_BRACE",
                                    "isTerminal": true
                                },
                                "alias": "{",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "type": "NewLine"
                        },
                        {
                            "type": "TabBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "stmts",
                                    "isTerminal": false
                                },
                                "alias": "if_part",
                                "textViewOnly": false
                            },
                            "elems": [
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false
                                    },
                                    "alternateSymbols": [
                                        {
                                            "symbol": {
                                                "name": "if_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something if a condition is true"
                                        },
                                        {
                                            "symbol": {
                                                "name": "if_else_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something if a condition is true, else do something else"
                                        },
                                        {
                                            "symbol": {
                                                "name": "while_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something while a condition is true"
                                        },
                                        {
                                            "symbol": {
                                                "name": "for_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                                        },
                                        {
                                            "symbol": {
                                                "name": "assign_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Set a variable's value"
                                        },
                                        {
                                            "symbol": {
                                                "name": "func_def_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Define reusable code as a function"
                                        },
                                        {
                                            "symbol": {
                                                "name": "func_call_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Use a defined function"
                                        }
                                    ],
                                    "type": "SelectionBlock"
                                }
                            ],
                            "repetitiveElem": {
                                "symbol": {
                                    "symbol": {
                                        "name": "stmt",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "if_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something if a condition is true"
                                    },
                                    {
                                        "symbol": {
                                            "name": "if_else_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something if a condition is true, else do something else"
                                    },
                                    {
                                        "symbol": {
                                            "name": "while_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something while a condition is true"
                                    },
                                    {
                                        "symbol": {
                                            "name": "for_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                                    },
                                    {
                                        "symbol": {
                                            "name": "assign_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Set a variable's value"
                                    },
                                    {
                                        "symbol": {
                                            "name": "func_def_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Define reusable code as a function"
                                    },
                                    {
                                        "symbol": {
                                            "name": "func_call_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Use a defined function"
                                    }
                                ],
                                "type": "SelectionBlock"
                            },
                            "type": "RepetitionGroup"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_CURLY_BRACE",
                                    "isTerminal": true
                                },
                                "alias": "}",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "stmt",
                                "isTerminal": false
                            },
                            "textViewOnly": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "if_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something if a condition is true"
                            },
                            {
                                "symbol": {
                                    "name": "if_else_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something if a condition is true, else do something else"
                            },
                            {
                                "symbol": {
                                    "name": "while_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something while a condition is true"
                            },
                            {
                                "symbol": {
                                    "name": "for_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                            },
                            {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Set a variable's value"
                            },
                            {
                                "symbol": {
                                    "name": "func_def_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Define reusable code as a function"
                            },
                            {
                                "symbol": {
                                    "name": "func_call_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Use a defined function"
                            }
                        ],
                        "selectedSymbol": 0,
                        "type": "SelectionBlock"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "if_else_stmt",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "Do something if a condition is true, else do something else"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "IF",
                                    "isTerminal": true
                                },
                                "textViewOnly": false
                            },
                            "type": "SimpleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "alias": "condition",
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_CURLY_BRACE",
                                    "isTerminal": true
                                },
                                "alias": "{",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "type": "NewLine"
                        },
                        {
                            "type": "TabBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "stmts",
                                    "isTerminal": false
                                },
                                "alias": "if_part",
                                "textViewOnly": false
                            },
                            "elems": [
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false
                                    },
                                    "alternateSymbols": [
                                        {
                                            "symbol": {
                                                "name": "if_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something if a condition is true"
                                        },
                                        {
                                            "symbol": {
                                                "name": "if_else_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something if a condition is true, else do something else"
                                        },
                                        {
                                            "symbol": {
                                                "name": "while_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something while a condition is true"
                                        },
                                        {
                                            "symbol": {
                                                "name": "for_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                                        },
                                        {
                                            "symbol": {
                                                "name": "assign_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Set a variable's value"
                                        },
                                        {
                                            "symbol": {
                                                "name": "func_def_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Define reusable code as a function"
                                        },
                                        {
                                            "symbol": {
                                                "name": "func_call_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Use a defined function"
                                        }
                                    ],
                                    "type": "SelectionBlock"
                                }
                            ],
                            "repetitiveElem": {
                                "symbol": {
                                    "symbol": {
                                        "name": "stmt",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "if_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something if a condition is true"
                                    },
                                    {
                                        "symbol": {
                                            "name": "if_else_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something if a condition is true, else do something else"
                                    },
                                    {
                                        "symbol": {
                                            "name": "while_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something while a condition is true"
                                    },
                                    {
                                        "symbol": {
                                            "name": "for_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                                    },
                                    {
                                        "symbol": {
                                            "name": "assign_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Set a variable's value"
                                    },
                                    {
                                        "symbol": {
                                            "name": "func_def_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Define reusable code as a function"
                                    },
                                    {
                                        "symbol": {
                                            "name": "func_call_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Use a defined function"
                                    }
                                ],
                                "type": "SelectionBlock"
                            },
                            "type": "RepetitionGroup"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_CURLY_BRACE",
                                    "isTerminal": true
                                },
                                "alias": "}",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "type": "NewLine"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "ELSE",
                                    "isTerminal": true
                                },
                                "textViewOnly": false
                            },
                            "type": "SimpleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_CURLY_BRACE",
                                    "isTerminal": true
                                },
                                "alias": "{",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "type": "NewLine"
                        },
                        {
                            "type": "TabBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "stmts",
                                    "isTerminal": false
                                },
                                "alias": "else_part",
                                "textViewOnly": false
                            },
                            "elems": [
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false
                                    },
                                    "alternateSymbols": [
                                        {
                                            "symbol": {
                                                "name": "if_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something if a condition is true"
                                        },
                                        {
                                            "symbol": {
                                                "name": "if_else_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something if a condition is true, else do something else"
                                        },
                                        {
                                            "symbol": {
                                                "name": "while_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something while a condition is true"
                                        },
                                        {
                                            "symbol": {
                                                "name": "for_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                                        },
                                        {
                                            "symbol": {
                                                "name": "assign_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Set a variable's value"
                                        },
                                        {
                                            "symbol": {
                                                "name": "func_def_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Define reusable code as a function"
                                        },
                                        {
                                            "symbol": {
                                                "name": "func_call_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Use a defined function"
                                        }
                                    ],
                                    "type": "SelectionBlock"
                                }
                            ],
                            "repetitiveElem": {
                                "symbol": {
                                    "symbol": {
                                        "name": "stmt",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "if_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something if a condition is true"
                                    },
                                    {
                                        "symbol": {
                                            "name": "if_else_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something if a condition is true, else do something else"
                                    },
                                    {
                                        "symbol": {
                                            "name": "while_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something while a condition is true"
                                    },
                                    {
                                        "symbol": {
                                            "name": "for_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                                    },
                                    {
                                        "symbol": {
                                            "name": "assign_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Set a variable's value"
                                    },
                                    {
                                        "symbol": {
                                            "name": "func_def_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Define reusable code as a function"
                                    },
                                    {
                                        "symbol": {
                                            "name": "func_call_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Use a defined function"
                                    }
                                ],
                                "type": "SelectionBlock"
                            },
                            "type": "RepetitionGroup"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_CURLY_BRACE",
                                    "isTerminal": true
                                },
                                "alias": "}",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "stmt",
                                "isTerminal": false
                            },
                            "textViewOnly": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "if_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something if a condition is true"
                            },
                            {
                                "symbol": {
                                    "name": "if_else_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something if a condition is true, else do something else"
                            },
                            {
                                "symbol": {
                                    "name": "while_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something while a condition is true"
                            },
                            {
                                "symbol": {
                                    "name": "for_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                            },
                            {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Set a variable's value"
                            },
                            {
                                "symbol": {
                                    "name": "func_def_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Define reusable code as a function"
                            },
                            {
                                "symbol": {
                                    "name": "func_call_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Use a defined function"
                            }
                        ],
                        "selectedSymbol": 1,
                        "type": "SelectionBlock"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "while_stmt",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "Do something while a condition is true"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "WHILE",
                                    "isTerminal": true
                                },
                                "textViewOnly": false
                            },
                            "type": "SimpleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "alias": "condition",
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_CURLY_BRACE",
                                    "isTerminal": true
                                },
                                "alias": "{",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "type": "NewLine"
                        },
                        {
                            "type": "TabBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "stmts",
                                    "isTerminal": false
                                },
                                "alias": "while_part",
                                "textViewOnly": false
                            },
                            "elems": [
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false
                                    },
                                    "alternateSymbols": [
                                        {
                                            "symbol": {
                                                "name": "if_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something if a condition is true"
                                        },
                                        {
                                            "symbol": {
                                                "name": "if_else_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something if a condition is true, else do something else"
                                        },
                                        {
                                            "symbol": {
                                                "name": "while_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something while a condition is true"
                                        },
                                        {
                                            "symbol": {
                                                "name": "for_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                                        },
                                        {
                                            "symbol": {
                                                "name": "assign_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Set a variable's value"
                                        },
                                        {
                                            "symbol": {
                                                "name": "func_def_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Define reusable code as a function"
                                        },
                                        {
                                            "symbol": {
                                                "name": "func_call_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Use a defined function"
                                        }
                                    ],
                                    "type": "SelectionBlock"
                                }
                            ],
                            "repetitiveElem": {
                                "symbol": {
                                    "symbol": {
                                        "name": "stmt",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "if_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something if a condition is true"
                                    },
                                    {
                                        "symbol": {
                                            "name": "if_else_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something if a condition is true, else do something else"
                                    },
                                    {
                                        "symbol": {
                                            "name": "while_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something while a condition is true"
                                    },
                                    {
                                        "symbol": {
                                            "name": "for_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                                    },
                                    {
                                        "symbol": {
                                            "name": "assign_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Set a variable's value"
                                    },
                                    {
                                        "symbol": {
                                            "name": "func_def_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Define reusable code as a function"
                                    },
                                    {
                                        "symbol": {
                                            "name": "func_call_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Use a defined function"
                                    }
                                ],
                                "type": "SelectionBlock"
                            },
                            "type": "RepetitionGroup"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_CURLY_BRACE",
                                    "isTerminal": true
                                },
                                "alias": "}",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "stmt",
                                "isTerminal": false
                            },
                            "textViewOnly": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "if_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something if a condition is true"
                            },
                            {
                                "symbol": {
                                    "name": "if_else_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something if a condition is true, else do something else"
                            },
                            {
                                "symbol": {
                                    "name": "while_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something while a condition is true"
                            },
                            {
                                "symbol": {
                                    "name": "for_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                            },
                            {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Set a variable's value"
                            },
                            {
                                "symbol": {
                                    "name": "func_def_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Define reusable code as a function"
                            },
                            {
                                "symbol": {
                                    "name": "func_call_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Use a defined function"
                            }
                        ],
                        "selectedSymbol": 2,
                        "type": "SelectionBlock"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "for_stmt",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "FOR",
                                    "isTerminal": true
                                },
                                "textViewOnly": false
                            },
                            "type": "SimpleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "alias": "initialization",
                                "textViewOnly": false
                            },
                            "elems": [
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "IDENT",
                                            "isTerminal": true
                                        },
                                        "textViewOnly": false
                                    },
                                    "type": "InputBlock"
                                },
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "EQUALS",
                                            "isTerminal": true
                                        },
                                        "alias": "=",
                                        "textViewOnly": false
                                    },
                                    "type": "SimpleBlock"
                                },
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "expr",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false
                                    },
                                    "alternateSymbols": [
                                        {
                                            "symbol": {
                                                "name": "arith_expr",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Perform a mathematic operation"
                                        },
                                        {
                                            "symbol": {
                                                "name": "rel_expr",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "An operator that compares the 2 operands and returns true or false"
                                        },
                                        {
                                            "symbol": {
                                                "name": "bool_expr",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "An expression that evaluates to true or false"
                                        },
                                        {
                                            "symbol": {
                                                "name": "primary_expr",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "An identifier or a constant"
                                        }
                                    ],
                                    "type": "SelectionBlock"
                                }
                            ],
                            "type": "Group"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "SEMI_COLON",
                                    "isTerminal": true
                                },
                                "alias": ";",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "alias": "condition",
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "SEMI_COLON",
                                    "isTerminal": true
                                },
                                "alias": ";",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "alias": "step",
                                "textViewOnly": false
                            },
                            "elems": [
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "IDENT",
                                            "isTerminal": true
                                        },
                                        "textViewOnly": false
                                    },
                                    "type": "InputBlock"
                                },
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "EQUALS",
                                            "isTerminal": true
                                        },
                                        "alias": "=",
                                        "textViewOnly": false
                                    },
                                    "type": "SimpleBlock"
                                },
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "expr",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false
                                    },
                                    "alternateSymbols": [
                                        {
                                            "symbol": {
                                                "name": "arith_expr",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Perform a mathematic operation"
                                        },
                                        {
                                            "symbol": {
                                                "name": "rel_expr",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "An operator that compares the 2 operands and returns true or false"
                                        },
                                        {
                                            "symbol": {
                                                "name": "bool_expr",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "An expression that evaluates to true or false"
                                        },
                                        {
                                            "symbol": {
                                                "name": "primary_expr",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "An identifier or a constant"
                                        }
                                    ],
                                    "type": "SelectionBlock"
                                }
                            ],
                            "type": "Group"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_CURLY_BRACE",
                                    "isTerminal": true
                                },
                                "alias": "{",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "type": "NewLine"
                        },
                        {
                            "type": "TabBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "stmts",
                                    "isTerminal": false
                                },
                                "alias": "for_part",
                                "textViewOnly": false
                            },
                            "elems": [
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false
                                    },
                                    "alternateSymbols": [
                                        {
                                            "symbol": {
                                                "name": "if_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something if a condition is true"
                                        },
                                        {
                                            "symbol": {
                                                "name": "if_else_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something if a condition is true, else do something else"
                                        },
                                        {
                                            "symbol": {
                                                "name": "while_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something while a condition is true"
                                        },
                                        {
                                            "symbol": {
                                                "name": "for_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                                        },
                                        {
                                            "symbol": {
                                                "name": "assign_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Set a variable's value"
                                        },
                                        {
                                            "symbol": {
                                                "name": "func_def_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Define reusable code as a function"
                                        },
                                        {
                                            "symbol": {
                                                "name": "func_call_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Use a defined function"
                                        }
                                    ],
                                    "type": "SelectionBlock"
                                }
                            ],
                            "repetitiveElem": {
                                "symbol": {
                                    "symbol": {
                                        "name": "stmt",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "if_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something if a condition is true"
                                    },
                                    {
                                        "symbol": {
                                            "name": "if_else_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something if a condition is true, else do something else"
                                    },
                                    {
                                        "symbol": {
                                            "name": "while_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something while a condition is true"
                                    },
                                    {
                                        "symbol": {
                                            "name": "for_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                                    },
                                    {
                                        "symbol": {
                                            "name": "assign_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Set a variable's value"
                                    },
                                    {
                                        "symbol": {
                                            "name": "func_def_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Define reusable code as a function"
                                    },
                                    {
                                        "symbol": {
                                            "name": "func_call_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Use a defined function"
                                    }
                                ],
                                "type": "SelectionBlock"
                            },
                            "type": "RepetitionGroup"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_CURLY_BRACE",
                                    "isTerminal": true
                                },
                                "alias": "}",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "stmt",
                                "isTerminal": false
                            },
                            "textViewOnly": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "if_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something if a condition is true"
                            },
                            {
                                "symbol": {
                                    "name": "if_else_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something if a condition is true, else do something else"
                            },
                            {
                                "symbol": {
                                    "name": "while_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something while a condition is true"
                            },
                            {
                                "symbol": {
                                    "name": "for_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                            },
                            {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Set a variable's value"
                            },
                            {
                                "symbol": {
                                    "name": "func_def_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Define reusable code as a function"
                            },
                            {
                                "symbol": {
                                    "name": "func_call_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Use a defined function"
                            }
                        ],
                        "selectedSymbol": 3,
                        "type": "SelectionBlock"
                    }
                }
            ]
        },
        {
            "name": "Primary",
            "icon": "./Images/Toolbox/primary.svg",
            "blocks": [
                {
                    "symbol": {
                        "symbol": {
                            "name": "IDENT",
                            "isTerminal": true
                        },
                        "textViewOnly": false,
                        "tooltip": "An identifier starting with _ or a uppercase/lowercase letter following by 0 or more characters that can be _ numbers lowercase/uppercase letters"
                    },
                    "type": "InputBlock",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "An identifier or a constant"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An identifier starting with _ or a uppercase/lowercase letter following by 0 or more characters that can be _ numbers lowercase/uppercase letters"
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An integer is a positive, zero, or negative number that can be written without a fractional component (i.e. no decimal point places)"
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "A floating-point number is a rational number (i.e. includes numbers with decimal point places"
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One single character"
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "Any sequence of characters or the empty sequence"
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One of true or false"
                            }
                        ],
                        "selectedSymbol": 0,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 3,
                            "type": "SelectionBlock"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "INT_CONST",
                            "isTerminal": true
                        },
                        "textViewOnly": false,
                        "tooltip": "An integer is a positive, zero, or negative number that can be written without a fractional component (i.e. no decimal point places)"
                    },
                    "type": "InputBlock",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "An identifier or a constant"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An identifier starting with _ or a uppercase/lowercase letter following by 0 or more characters that can be _ numbers lowercase/uppercase letters"
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An integer is a positive, zero, or negative number that can be written without a fractional component (i.e. no decimal point places)"
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "A floating-point number is a rational number (i.e. includes numbers with decimal point places"
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One single character"
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "Any sequence of characters or the empty sequence"
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One of true or false"
                            }
                        ],
                        "selectedSymbol": 1,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 3,
                            "type": "SelectionBlock"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "FLOAT_CONST",
                            "isTerminal": true
                        },
                        "textViewOnly": false,
                        "tooltip": "A floating-point number is a rational number (i.e. includes numbers with decimal point places"
                    },
                    "type": "InputBlock",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "An identifier or a constant"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An identifier starting with _ or a uppercase/lowercase letter following by 0 or more characters that can be _ numbers lowercase/uppercase letters"
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An integer is a positive, zero, or negative number that can be written without a fractional component (i.e. no decimal point places)"
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "A floating-point number is a rational number (i.e. includes numbers with decimal point places"
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One single character"
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "Any sequence of characters or the empty sequence"
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One of true or false"
                            }
                        ],
                        "selectedSymbol": 2,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 3,
                            "type": "SelectionBlock"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "CHAR_CONST",
                            "isTerminal": true
                        },
                        "textViewOnly": false,
                        "tooltip": "One single character"
                    },
                    "type": "InputBlock",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "An identifier or a constant"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An identifier starting with _ or a uppercase/lowercase letter following by 0 or more characters that can be _ numbers lowercase/uppercase letters"
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An integer is a positive, zero, or negative number that can be written without a fractional component (i.e. no decimal point places)"
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "A floating-point number is a rational number (i.e. includes numbers with decimal point places"
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One single character"
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "Any sequence of characters or the empty sequence"
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One of true or false"
                            }
                        ],
                        "selectedSymbol": 3,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 3,
                            "type": "SelectionBlock"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "STRING_CONST",
                            "isTerminal": true
                        },
                        "textViewOnly": false,
                        "tooltip": "Any sequence of characters or the empty sequence"
                    },
                    "type": "InputBlock",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "An identifier or a constant"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An identifier starting with _ or a uppercase/lowercase letter following by 0 or more characters that can be _ numbers lowercase/uppercase letters"
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An integer is a positive, zero, or negative number that can be written without a fractional component (i.e. no decimal point places)"
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "A floating-point number is a rational number (i.e. includes numbers with decimal point places"
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One single character"
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "Any sequence of characters or the empty sequence"
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One of true or false"
                            }
                        ],
                        "selectedSymbol": 4,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 3,
                            "type": "SelectionBlock"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "BOOL_CONST",
                            "isTerminal": true
                        },
                        "textViewOnly": false,
                        "tooltip": "One of true or false"
                    },
                    "userInput_": "true",
                    "type": "InputBlock",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "An identifier or a constant"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An identifier starting with _ or a uppercase/lowercase letter following by 0 or more characters that can be _ numbers lowercase/uppercase letters"
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An integer is a positive, zero, or negative number that can be written without a fractional component (i.e. no decimal point places)"
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "A floating-point number is a rational number (i.e. includes numbers with decimal point places"
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One single character"
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "Any sequence of characters or the empty sequence"
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One of true or false"
                            }
                        ],
                        "selectedSymbol": 5,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 3,
                            "type": "SelectionBlock"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "BOOL_CONST",
                            "isTerminal": true
                        },
                        "textViewOnly": false,
                        "tooltip": "One of true or false"
                    },
                    "userInput_": "false",
                    "type": "InputBlock",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "An identifier or a constant"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An identifier starting with _ or a uppercase/lowercase letter following by 0 or more characters that can be _ numbers lowercase/uppercase letters"
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "An integer is a positive, zero, or negative number that can be written without a fractional component (i.e. no decimal point places)"
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "A floating-point number is a rational number (i.e. includes numbers with decimal point places"
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One single character"
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "Any sequence of characters or the empty sequence"
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "One of true or false"
                            }
                        ],
                        "selectedSymbol": 5,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 3,
                            "type": "SelectionBlock"
                        }
                    }
                }
            ]
        },
        {
            "name": "Math",
            "icon": "./Images/Toolbox/math.svg",
            "blocks": [
                {
                    "symbol": {
                        "symbol": {
                            "name": "binary_arith_expr",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "An arithmetic expression with 2 operands"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The first operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "PLUS",
                                    "isTerminal": true
                                },
                                "alias": "+",
                                "textViewOnly": false,
                                "tooltip": "Performs addition"
                            },
                            "type": "SimpleBlock",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "arith_op",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An arithmetic operator (e.g. +, -)"
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "PLUS",
                                            "isTerminal": true
                                        },
                                        "alias": "+",
                                        "textViewOnly": false,
                                        "tooltip": "Performs addition"
                                    },
                                    {
                                        "symbol": {
                                            "name": "MINUS",
                                            "isTerminal": true
                                        },
                                        "alias": "-",
                                        "textViewOnly": false,
                                        "tooltip": "Performs subtraction"
                                    },
                                    {
                                        "symbol": {
                                            "name": "TIMES",
                                            "isTerminal": true
                                        },
                                        "alias": "*",
                                        "textViewOnly": false,
                                        "tooltip": "Performs multiplication"
                                    },
                                    {
                                        "symbol": {
                                            "name": "BY",
                                            "isTerminal": true
                                        },
                                        "alias": "/",
                                        "textViewOnly": false,
                                        "tooltip": "Performs division"
                                    }
                                ],
                                "selectedSymbol": 0,
                                "type": "SelectionBlock"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The second operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "arith_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "Perform a mathematic operation"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_arith_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An arithmetic expression with 2 operands"
                            },
                            {
                                "symbol": {
                                    "name": "unary_minus",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Negates the value of its operand"
                            }
                        ],
                        "selectedSymbol": 0,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 0,
                            "type": "SelectionBlock"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "binary_arith_expr",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "An arithmetic expression with 2 operands"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The first operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "MINUS",
                                    "isTerminal": true
                                },
                                "alias": "-",
                                "textViewOnly": false,
                                "tooltip": "Performs subtraction"
                            },
                            "type": "SimpleBlock",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "arith_op",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An arithmetic operator (e.g. +, -)"
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "PLUS",
                                            "isTerminal": true
                                        },
                                        "alias": "+",
                                        "textViewOnly": false,
                                        "tooltip": "Performs addition"
                                    },
                                    {
                                        "symbol": {
                                            "name": "MINUS",
                                            "isTerminal": true
                                        },
                                        "alias": "-",
                                        "textViewOnly": false,
                                        "tooltip": "Performs subtraction"
                                    },
                                    {
                                        "symbol": {
                                            "name": "TIMES",
                                            "isTerminal": true
                                        },
                                        "alias": "*",
                                        "textViewOnly": false,
                                        "tooltip": "Performs multiplication"
                                    },
                                    {
                                        "symbol": {
                                            "name": "BY",
                                            "isTerminal": true
                                        },
                                        "alias": "/",
                                        "textViewOnly": false,
                                        "tooltip": "Performs division"
                                    }
                                ],
                                "selectedSymbol": 1,
                                "type": "SelectionBlock"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The second operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "arith_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "Perform a mathematic operation"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_arith_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An arithmetic expression with 2 operands"
                            },
                            {
                                "symbol": {
                                    "name": "unary_minus",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Negates the value of its operand"
                            }
                        ],
                        "selectedSymbol": 0,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 0,
                            "type": "SelectionBlock"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "binary_arith_expr",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "An arithmetic expression with 2 operands"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The first operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "TIMES",
                                    "isTerminal": true
                                },
                                "alias": "*",
                                "textViewOnly": false,
                                "tooltip": "Performs multiplication"
                            },
                            "type": "SimpleBlock",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "arith_op",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An arithmetic operator (e.g. +, -)"
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "PLUS",
                                            "isTerminal": true
                                        },
                                        "alias": "+",
                                        "textViewOnly": false,
                                        "tooltip": "Performs addition"
                                    },
                                    {
                                        "symbol": {
                                            "name": "MINUS",
                                            "isTerminal": true
                                        },
                                        "alias": "-",
                                        "textViewOnly": false,
                                        "tooltip": "Performs subtraction"
                                    },
                                    {
                                        "symbol": {
                                            "name": "TIMES",
                                            "isTerminal": true
                                        },
                                        "alias": "*",
                                        "textViewOnly": false,
                                        "tooltip": "Performs multiplication"
                                    },
                                    {
                                        "symbol": {
                                            "name": "BY",
                                            "isTerminal": true
                                        },
                                        "alias": "/",
                                        "textViewOnly": false,
                                        "tooltip": "Performs division"
                                    }
                                ],
                                "selectedSymbol": 2,
                                "type": "SelectionBlock"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The second operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "arith_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "Perform a mathematic operation"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_arith_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An arithmetic expression with 2 operands"
                            },
                            {
                                "symbol": {
                                    "name": "unary_minus",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Negates the value of its operand"
                            }
                        ],
                        "selectedSymbol": 0,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 0,
                            "type": "SelectionBlock"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "binary_arith_expr",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "An arithmetic expression with 2 operands"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The first operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "BY",
                                    "isTerminal": true
                                },
                                "alias": "/",
                                "textViewOnly": false,
                                "tooltip": "Performs division"
                            },
                            "type": "SimpleBlock",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "arith_op",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An arithmetic operator (e.g. +, -)"
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "PLUS",
                                            "isTerminal": true
                                        },
                                        "alias": "+",
                                        "textViewOnly": false,
                                        "tooltip": "Performs addition"
                                    },
                                    {
                                        "symbol": {
                                            "name": "MINUS",
                                            "isTerminal": true
                                        },
                                        "alias": "-",
                                        "textViewOnly": false,
                                        "tooltip": "Performs subtraction"
                                    },
                                    {
                                        "symbol": {
                                            "name": "TIMES",
                                            "isTerminal": true
                                        },
                                        "alias": "*",
                                        "textViewOnly": false,
                                        "tooltip": "Performs multiplication"
                                    },
                                    {
                                        "symbol": {
                                            "name": "BY",
                                            "isTerminal": true
                                        },
                                        "alias": "/",
                                        "textViewOnly": false,
                                        "tooltip": "Performs division"
                                    }
                                ],
                                "selectedSymbol": 3,
                                "type": "SelectionBlock"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The second operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "arith_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "Perform a mathematic operation"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_arith_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An arithmetic expression with 2 operands"
                            },
                            {
                                "symbol": {
                                    "name": "unary_minus",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Negates the value of its operand"
                            }
                        ],
                        "selectedSymbol": 0,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 0,
                            "type": "SelectionBlock"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "unary_minus",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "Negates the value of its operand"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "MINUS",
                                    "isTerminal": true
                                },
                                "alias": "-",
                                "textViewOnly": false
                            },
                            "type": "SimpleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "arith_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "Perform a mathematic operation"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_arith_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An arithmetic expression with 2 operands"
                            },
                            {
                                "symbol": {
                                    "name": "unary_minus",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Negates the value of its operand"
                            }
                        ],
                        "selectedSymbol": 1,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 0,
                            "type": "SelectionBlock"
                        }
                    }
                }
            ]
        },
        {
            "name": "Boolean",
            "icon": "./Images/Toolbox/comparison.svg",
            "blocks": [
                {
                    "symbol": {
                        "symbol": {
                            "name": "rel_expr",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "An operator that compares the 2 operands and returns true or false"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The first operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "GREATER",
                                    "isTerminal": true
                                },
                                "alias": ">",
                                "textViewOnly": false,
                                "tooltip": "Returns true if the first operand is greater than the second operand, else returns false"
                            },
                            "type": "SimpleBlock",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "rel_op",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "A comparison operator that returns true or false (e.g <, >)"
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "GREATER",
                                            "isTerminal": true
                                        },
                                        "alias": ">",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is greater than the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS",
                                            "isTerminal": true
                                        },
                                        "alias": "<",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is less than the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "==",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "NOT_EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "!=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand not equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "GREATER_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": ">=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is greater than or equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": "<=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is less than or equal to the second operand, else returns false"
                                    }
                                ],
                                "selectedSymbol": 0,
                                "type": "SelectionBlock"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The second operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "arith_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Perform a mathematic operation"
                            },
                            {
                                "symbol": {
                                    "name": "rel_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An operator that compares the 2 operands and returns true or false"
                            },
                            {
                                "symbol": {
                                    "name": "bool_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An expression that evaluates to true or false"
                            },
                            {
                                "symbol": {
                                    "name": "primary_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An identifier or a constant"
                            }
                        ],
                        "selectedSymbol": 1,
                        "type": "SelectionBlock"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "rel_expr",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "An operator that compares the 2 operands and returns true or false"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The first operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LESS",
                                    "isTerminal": true
                                },
                                "alias": "<",
                                "textViewOnly": false,
                                "tooltip": "Returns true if the first operand is less than the second operand, else returns false"
                            },
                            "type": "SimpleBlock",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "rel_op",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "A comparison operator that returns true or false (e.g <, >)"
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "GREATER",
                                            "isTerminal": true
                                        },
                                        "alias": ">",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is greater than the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS",
                                            "isTerminal": true
                                        },
                                        "alias": "<",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is less than the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "==",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "NOT_EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "!=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand not equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "GREATER_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": ">=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is greater than or equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": "<=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is less than or equal to the second operand, else returns false"
                                    }
                                ],
                                "selectedSymbol": 1,
                                "type": "SelectionBlock"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The second operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "arith_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Perform a mathematic operation"
                            },
                            {
                                "symbol": {
                                    "name": "rel_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An operator that compares the 2 operands and returns true or false"
                            },
                            {
                                "symbol": {
                                    "name": "bool_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An expression that evaluates to true or false"
                            },
                            {
                                "symbol": {
                                    "name": "primary_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An identifier or a constant"
                            }
                        ],
                        "selectedSymbol": 1,
                        "type": "SelectionBlock"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "rel_expr",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "An operator that compares the 2 operands and returns true or false"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The first operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "EQUAL_TO",
                                    "isTerminal": true
                                },
                                "alias": "==",
                                "textViewOnly": false,
                                "tooltip": "Returns true if the first operand is equal to the second operand, else returns false"
                            },
                            "type": "SimpleBlock",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "rel_op",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "A comparison operator that returns true or false (e.g <, >)"
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "GREATER",
                                            "isTerminal": true
                                        },
                                        "alias": ">",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is greater than the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS",
                                            "isTerminal": true
                                        },
                                        "alias": "<",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is less than the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "==",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "NOT_EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "!=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand not equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "GREATER_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": ">=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is greater than or equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": "<=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is less than or equal to the second operand, else returns false"
                                    }
                                ],
                                "selectedSymbol": 2,
                                "type": "SelectionBlock"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The second operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "arith_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Perform a mathematic operation"
                            },
                            {
                                "symbol": {
                                    "name": "rel_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An operator that compares the 2 operands and returns true or false"
                            },
                            {
                                "symbol": {
                                    "name": "bool_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An expression that evaluates to true or false"
                            },
                            {
                                "symbol": {
                                    "name": "primary_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An identifier or a constant"
                            }
                        ],
                        "selectedSymbol": 1,
                        "type": "SelectionBlock"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "rel_expr",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "An operator that compares the 2 operands and returns true or false"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The first operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "NOT_EQUAL_TO",
                                    "isTerminal": true
                                },
                                "alias": "!=",
                                "textViewOnly": false,
                                "tooltip": "Returns true if the first operand not equal to the second operand, else returns false"
                            },
                            "type": "SimpleBlock",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "rel_op",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "A comparison operator that returns true or false (e.g <, >)"
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "GREATER",
                                            "isTerminal": true
                                        },
                                        "alias": ">",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is greater than the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS",
                                            "isTerminal": true
                                        },
                                        "alias": "<",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is less than the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "==",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "NOT_EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "!=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand not equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "GREATER_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": ">=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is greater than or equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": "<=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is less than or equal to the second operand, else returns false"
                                    }
                                ],
                                "selectedSymbol": 3,
                                "type": "SelectionBlock"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The second operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "arith_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Perform a mathematic operation"
                            },
                            {
                                "symbol": {
                                    "name": "rel_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An operator that compares the 2 operands and returns true or false"
                            },
                            {
                                "symbol": {
                                    "name": "bool_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An expression that evaluates to true or false"
                            },
                            {
                                "symbol": {
                                    "name": "primary_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An identifier or a constant"
                            }
                        ],
                        "selectedSymbol": 1,
                        "type": "SelectionBlock"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "rel_expr",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "An operator that compares the 2 operands and returns true or false"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The first operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "GREATER_EQUAL",
                                    "isTerminal": true
                                },
                                "alias": ">=",
                                "textViewOnly": false,
                                "tooltip": "Returns true if the first operand is greater than or equal to the second operand, else returns false"
                            },
                            "type": "SimpleBlock",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "rel_op",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "A comparison operator that returns true or false (e.g <, >)"
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "GREATER",
                                            "isTerminal": true
                                        },
                                        "alias": ">",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is greater than the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS",
                                            "isTerminal": true
                                        },
                                        "alias": "<",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is less than the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "==",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "NOT_EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "!=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand not equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "GREATER_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": ">=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is greater than or equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": "<=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is less than or equal to the second operand, else returns false"
                                    }
                                ],
                                "selectedSymbol": 4,
                                "type": "SelectionBlock"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The second operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "arith_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Perform a mathematic operation"
                            },
                            {
                                "symbol": {
                                    "name": "rel_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An operator that compares the 2 operands and returns true or false"
                            },
                            {
                                "symbol": {
                                    "name": "bool_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An expression that evaluates to true or false"
                            },
                            {
                                "symbol": {
                                    "name": "primary_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An identifier or a constant"
                            }
                        ],
                        "selectedSymbol": 1,
                        "type": "SelectionBlock"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "rel_expr",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "An operator that compares the 2 operands and returns true or false"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The first operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LESS_EQUAL",
                                    "isTerminal": true
                                },
                                "alias": "<=",
                                "textViewOnly": false,
                                "tooltip": "Returns true if the first operand is less than or equal to the second operand, else returns false"
                            },
                            "type": "SimpleBlock",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "rel_op",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "A comparison operator that returns true or false (e.g <, >)"
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "GREATER",
                                            "isTerminal": true
                                        },
                                        "alias": ">",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is greater than the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS",
                                            "isTerminal": true
                                        },
                                        "alias": "<",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is less than the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "==",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "NOT_EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "!=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand not equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "GREATER_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": ">=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is greater than or equal to the second operand, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": "<=",
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if the first operand is less than or equal to the second operand, else returns false"
                                    }
                                ],
                                "selectedSymbol": 5,
                                "type": "SelectionBlock"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The second operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "arith_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Perform a mathematic operation"
                            },
                            {
                                "symbol": {
                                    "name": "rel_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An operator that compares the 2 operands and returns true or false"
                            },
                            {
                                "symbol": {
                                    "name": "bool_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An expression that evaluates to true or false"
                            },
                            {
                                "symbol": {
                                    "name": "primary_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "An identifier or a constant"
                            }
                        ],
                        "selectedSymbol": 1,
                        "type": "SelectionBlock"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "binary_bool_expr",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "Performs a binary operation with 2 operands"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The first operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "AND",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "Returns true if both operands are true, else returns false"
                            },
                            "type": "SimpleBlock",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "bool_bin_op",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Performs a binary operation with 2 operands"
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "AND",
                                            "isTerminal": true
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if both operands are true, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "OR",
                                            "isTerminal": true
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if either operand is true, else returns false"
                                    }
                                ],
                                "selectedSymbol": 0,
                                "type": "SelectionBlock"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The second operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "bool_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "An expression that evaluates to true or false"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_bool_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Performs a binary operation with 2 operands"
                            },
                            {
                                "symbol": {
                                    "name": "not_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Performs logical negation. True becomes false and false becomes true"
                            }
                        ],
                        "selectedSymbol": 0,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 2,
                            "type": "SelectionBlock"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "binary_bool_expr",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "Performs a binary operation with 2 operands"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The first operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "OR",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "Returns true if either operand is true, else returns false"
                            },
                            "type": "SimpleBlock",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "bool_bin_op",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Performs a binary operation with 2 operands"
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "AND",
                                            "isTerminal": true
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if both operands are true, else returns false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "OR",
                                            "isTerminal": true
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Returns true if either operand is true, else returns false"
                                    }
                                ],
                                "selectedSymbol": 1,
                                "type": "SelectionBlock"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The second operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "bool_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "An expression that evaluates to true or false"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_bool_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Performs a binary operation with 2 operands"
                            },
                            {
                                "symbol": {
                                    "name": "not_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Performs logical negation. True becomes false and false becomes true"
                            }
                        ],
                        "selectedSymbol": 0,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 2,
                            "type": "SelectionBlock"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "not_expr",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "Performs logical negation. True becomes false and false becomes true"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "NOT",
                                    "isTerminal": true
                                },
                                "textViewOnly": false,
                                "tooltip": "Returns true if the operand is false, else returns false"
                            },
                            "type": "SimpleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "The operand"
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "type": "SelectionBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "bool_expr",
                                "isTerminal": false
                            },
                            "textViewOnly": false,
                            "tooltip": "An expression that evaluates to true or false"
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_bool_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Performs a binary operation with 2 operands"
                            },
                            {
                                "symbol": {
                                    "name": "not_expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Performs logical negation. True becomes false and false becomes true"
                            }
                        ],
                        "selectedSymbol": 1,
                        "type": "SelectionBlock",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "Perform a mathematic operation"
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An operator that compares the 2 operands and returns true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An expression that evaluates to true or false"
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false,
                                    "tooltip": "An identifier or a constant"
                                }
                            ],
                            "selectedSymbol": 2,
                            "type": "SelectionBlock"
                        }
                    }
                }
            ]
        },
        {
            "name": "Function",
            "icon": "./Images/Toolbox/function.svg",
            "blocks": [
                {
                    "symbol": {
                        "symbol": {
                            "name": "func_def_stmt",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "Define reusable code as a function"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "FUNCTION",
                                    "isTerminal": true
                                },
                                "textViewOnly": false
                            },
                            "type": "SimpleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "alias": "NAME",
                                "textViewOnly": false
                            },
                            "type": "InputBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "OF",
                                    "isTerminal": true
                                },
                                "textViewOnly": false
                            },
                            "type": "SimpleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "ident_list",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "elems": [
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "IDENT",
                                            "isTerminal": true
                                        },
                                        "textViewOnly": false
                                    },
                                    "type": "InputBlock"
                                }
                            ],
                            "repetitiveElem": {
                                "symbol": {
                                    "symbol": {
                                        "name": "IDENT",
                                        "isTerminal": true
                                    },
                                    "textViewOnly": false
                                },
                                "type": "InputBlock"
                            },
                            "type": "RepetitionGroup"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_CURLY_BRACE",
                                    "isTerminal": true
                                },
                                "alias": "{",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "type": "NewLine"
                        },
                        {
                            "type": "TabBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "stmts",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "elems": [
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false
                                    },
                                    "alternateSymbols": [
                                        {
                                            "symbol": {
                                                "name": "if_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something if a condition is true"
                                        },
                                        {
                                            "symbol": {
                                                "name": "if_else_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something if a condition is true, else do something else"
                                        },
                                        {
                                            "symbol": {
                                                "name": "while_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something while a condition is true"
                                        },
                                        {
                                            "symbol": {
                                                "name": "for_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                                        },
                                        {
                                            "symbol": {
                                                "name": "assign_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Set a variable's value"
                                        },
                                        {
                                            "symbol": {
                                                "name": "func_def_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Define reusable code as a function"
                                        },
                                        {
                                            "symbol": {
                                                "name": "func_call_stmt",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Use a defined function"
                                        }
                                    ],
                                    "type": "SelectionBlock"
                                }
                            ],
                            "repetitiveElem": {
                                "symbol": {
                                    "symbol": {
                                        "name": "stmt",
                                        "isTerminal": false
                                    },
                                    "textViewOnly": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "if_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something if a condition is true"
                                    },
                                    {
                                        "symbol": {
                                            "name": "if_else_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something if a condition is true, else do something else"
                                    },
                                    {
                                        "symbol": {
                                            "name": "while_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something while a condition is true"
                                    },
                                    {
                                        "symbol": {
                                            "name": "for_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                                    },
                                    {
                                        "symbol": {
                                            "name": "assign_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Set a variable's value"
                                    },
                                    {
                                        "symbol": {
                                            "name": "func_def_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Define reusable code as a function"
                                    },
                                    {
                                        "symbol": {
                                            "name": "func_call_stmt",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Use a defined function"
                                    }
                                ],
                                "type": "SelectionBlock"
                            },
                            "type": "RepetitionGroup"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_CURLY_BRACE",
                                    "isTerminal": true
                                },
                                "alias": "}",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "stmt",
                                "isTerminal": false
                            },
                            "textViewOnly": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "if_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something if a condition is true"
                            },
                            {
                                "symbol": {
                                    "name": "if_else_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something if a condition is true, else do something else"
                            },
                            {
                                "symbol": {
                                    "name": "while_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something while a condition is true"
                            },
                            {
                                "symbol": {
                                    "name": "for_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                            },
                            {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Set a variable's value"
                            },
                            {
                                "symbol": {
                                    "name": "func_def_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Define reusable code as a function"
                            },
                            {
                                "symbol": {
                                    "name": "func_call_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Use a defined function"
                            }
                        ],
                        "selectedSymbol": 5,
                        "type": "SelectionBlock"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "func_call_stmt",
                            "isTerminal": false
                        },
                        "textViewOnly": false,
                        "tooltip": "Use a defined function"
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "CALL",
                                    "isTerminal": true
                                },
                                "textViewOnly": false
                            },
                            "type": "SimpleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "alias": "FUNCTION NAME",
                                "textViewOnly": false
                            },
                            "type": "InputBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "WITH",
                                    "isTerminal": true
                                },
                                "textViewOnly": false
                            },
                            "type": "SimpleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LEFT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": "(",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr_list",
                                    "isTerminal": false
                                },
                                "textViewOnly": false
                            },
                            "elems": [
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "expr",
                                            "isTerminal": false
                                        },
                                        "alias": "ARG",
                                        "textViewOnly": false
                                    },
                                    "alternateSymbols": [
                                        {
                                            "symbol": {
                                                "name": "arith_expr",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "Perform a mathematic operation"
                                        },
                                        {
                                            "symbol": {
                                                "name": "rel_expr",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "An operator that compares the 2 operands and returns true or false"
                                        },
                                        {
                                            "symbol": {
                                                "name": "bool_expr",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "An expression that evaluates to true or false"
                                        },
                                        {
                                            "symbol": {
                                                "name": "primary_expr",
                                                "isTerminal": false
                                            },
                                            "textViewOnly": false,
                                            "tooltip": "An identifier or a constant"
                                        }
                                    ],
                                    "type": "SelectionBlock"
                                }
                            ],
                            "repetitiveElem": {
                                "symbol": {
                                    "symbol": {
                                        "name": "expr",
                                        "isTerminal": false
                                    },
                                    "alias": "ARG",
                                    "textViewOnly": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "arith_expr",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "Perform a mathematic operation"
                                    },
                                    {
                                        "symbol": {
                                            "name": "rel_expr",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "An operator that compares the 2 operands and returns true or false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "bool_expr",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "An expression that evaluates to true or false"
                                    },
                                    {
                                        "symbol": {
                                            "name": "primary_expr",
                                            "isTerminal": false
                                        },
                                        "textViewOnly": false,
                                        "tooltip": "An identifier or a constant"
                                    }
                                ],
                                "type": "SelectionBlock"
                            },
                            "type": "RepetitionGroup"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "RIGHT_PARENTHESIS",
                                    "isTerminal": true
                                },
                                "alias": ")",
                                "textViewOnly": true
                            },
                            "type": "InvisibleBlock"
                        }
                    ],
                    "type": "Group",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "stmt",
                                "isTerminal": false
                            },
                            "textViewOnly": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "if_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something if a condition is true"
                            },
                            {
                                "symbol": {
                                    "name": "if_else_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something if a condition is true, else do something else"
                            },
                            {
                                "symbol": {
                                    "name": "while_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something while a condition is true"
                            },
                            {
                                "symbol": {
                                    "name": "for_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Do something while a condition is true. Commonly used with a known number of iterations."
                            },
                            {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Set a variable's value"
                            },
                            {
                                "symbol": {
                                    "name": "func_def_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Define reusable code as a function"
                            },
                            {
                                "symbol": {
                                    "name": "func_call_stmt",
                                    "isTerminal": false
                                },
                                "textViewOnly": false,
                                "tooltip": "Use a defined function"
                            }
                        ],
                        "selectedSymbol": 6,
                        "type": "SelectionBlock"
                    }
                }
            ]
        },
        {
            "name": "Snipets",
            "icon": "./Images/Toolbox/snipets.svg",
            "blocks": []
        }
    ]
};

export let lightTheme = {
    "Blocks": {
        "General": {
            "Group": {
                "Group Block": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "2px",
                    "BorderColor": "#c2c2c2",
                    "BorderRadius": ""
                }
            },
            "RepetitionGroup": {
                "Group Block": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "2px",
                    "BorderColor": "#c2c2c2",
                    "BorderRadius": ""
                },
                "Button": {
                    "BackgroundColor": "#1A506F",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": ""
                },
                "Button Plus Sign": {
                    "Width": "",
                    "Height": "",
                    "BackgroundColor": ""
                },
                "Button Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": "#1A506F"
                },
                "Button On Hover": {
                    "BackgroundColor": "#215F83"
                },
                "Button Plus Sign On Hover": {
                    "BackgroundColor": "#ffffff"
                }
            },
            "SimpleBlock": {
                "Simple Block": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "InputBlock": {
                "Input Container": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "BorderWidth": "2px",
                    "BorderColor": "#c2c2c2",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": ""
                }
            },
            "SelectionBlock": {
                "Selection Block": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "FontSize": "",
                    "FontColor": "#000000",
                    "Gap": "",
                    "BorderWidth": "2px",
                    "BorderColor": "#c2c2c2",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "#000000",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "0",
                    "PaddingRight": "0",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px"
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "20px",
                    "PaddingRight": "20px",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "#000000"
                },
                "Option On Hover": {
                    "BackgroundColor": "#1A506F",
                    "FontColor": "#FFFFFF"
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": "#1A506F"
                }
            }
        },
        "Specific": {
            "LEFT_PARENTHESIS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "RIGHT_PARENTHESIS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "MINUS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "PLUS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "TIMES": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "BY": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "GREATER": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "LESS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "EQUAL_TO": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "NOT_EQUAL_TO": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "GREATER_EQUAL": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "LESS_EQUAL": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "AND": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "OR": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "NOT": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "IDENT": {
                "Input Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#000000",
                    "FontSize": ""
                }
            },
            "INT_CONST": {
                "Input Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#008052",
                    "FontSize": ""
                }
            },
            "FLOAT_CONST": {
                "Input Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#008052",
                    "FontSize": ""
                }
            },
            "CHAR_CONST": {
                "Input Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#A31515",
                    "FontSize": ""
                }
            },
            "STRING_CONST": {
                "Input Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#A31515",
                    "FontSize": ""
                }
            },
            "BOOL_CONST": {
                "Input Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": ""
                }
            },
            "EQUALS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "FUNCTION": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "OF": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "LEFT_CURLY_BRACE": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "RIGHT_CURLY_BRACE": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "CALL": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "WITH": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "IF": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "ELSE": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "WHILE": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "FOR": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "SEMI_COLON": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "program": {},
            "stmts": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Button": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": ""
                },
                "Button Plus Sign": {
                    "Width": "",
                    "Height": "",
                    "BackgroundColor": ""
                },
                "Button Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                },
                "Button On Hover": {
                    "BackgroundColor": ""
                },
                "Button Plus Sign On Hover": {
                    "BackgroundColor": ""
                }
            },
            "stmt": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "if_stmt": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "if_else_stmt": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "while_stmt": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "for_stmt": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "assign_stmt": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "func_def_stmt": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "func_call_stmt": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "expr": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "arith_expr": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "rel_expr": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "bool_expr": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "primary_expr": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "binary_arith_expr": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "unary_minus": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "arith_op": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "rel_op": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "binary_bool_expr": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "not_expr": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "bool_bin_op": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "ident_list": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Button": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": ""
                },
                "Button Plus Sign": {
                    "Width": "",
                    "Height": "",
                    "BackgroundColor": ""
                },
                "Button Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                },
                "Button On Hover": {
                    "BackgroundColor": ""
                },
                "Button Plus Sign On Hover": {
                    "BackgroundColor": ""
                }
            },
            "expr_list": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Button": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": ""
                },
                "Button Plus Sign": {
                    "Width": "",
                    "Height": "",
                    "BackgroundColor": ""
                },
                "Button Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                },
                "Button On Hover": {
                    "BackgroundColor": ""
                },
                "Button Plus Sign On Hover": {
                    "BackgroundColor": ""
                }
            }
        }
    },
    "Code Workspace": {
        "Code Workspace": {
            "BackgroundColor": "#F3F3F3"
        },
        "Scrollbar": {
            "Width": "15px",
            "Height": "15px"
        },
        "Scrollbar Thumb": {
            "BackgroundColor": "#909090",
            "BorderRadius": "0px"
        },
        "Scrollbar Thumb On Hover": {
            "BackgroundColor": "#707070"
        },
        "Scrollbar Track": {
            "BackgroundColor": "",
            "BorderWidth": "1px",
            "BorderColor": "#c2c2c2"
        },
        "Selected Block": {
            "BorderColor": "#fc3",
            "BorderShadow": "1px #fc3"
        },
    },
    "Toolbox": {
        "Toolbox Menu": {
            "BackgroundColor": "#1A506F",
            "PaddingLeft": "",
            "PaddingRight": "",
            "PaddingTop": "",
            "PaddingBottom": ""
        },
        "Toolbox Menu Icon": {
            "BackgroundColor": "#DADADA",
            "Width": "",
            "Height": ""
        },
        "Toolbox Menu Selected Icon": {
            "BackgroundColor": "#FFFFFF"
        },
        "Toolbox Menu Label": {
            "FontColor": "#DADADA",
            "FontSize": ""
        },
        "Toolbox Menu Selected Label": {
            "FontColor": "#FFFFFF"
        },
        "Selected Tag": {
            "BackgroundColor": "#FFFFFF"
        },
        "Toolbox": {
            "BackgroundColor": "#ECECEC"
        },
        "Block Category Title": {
            "FontSize": "",
            "FontColor": "#2B2B2B"
        },
        "Block Category On Drop Hover": {
            "BackgroundColor": "#6CB097"
        },
        "Block Category On Drop Placeholder": {
            "BackgroundColor": "green"
        },
        "Block Delete Button Container": {
            "BackgroundColor": ""
        },
        "Block Delete Button X": {
            "BackgroundColor": ""
        },
        "Scrollbar": {
            "Width": "15px",
            "Height": "15px"
        },
        "Scrollbar Thumb": {
            "BackgroundColor": "#909090",
            "BorderRadius": "0px"
        },
        "Scrollbar Thumb On Hover": {
            "BackgroundColor": "#707070"
        },
        "Scrollbar Track": {
            "BackgroundColor": "",
            "BorderWidth": "1px",
            "BorderColor": "#c2c2c2"
        }
    },
    "Undo Redo Toolbar": {
        "Undo Button": {
            "BackgroundColor": "#ECECEC",
            "FontColor": "black",
            "FontSize": ""
        },
        "Undo Button On Hover": {
            "BackgroundColor": "#F3F3F3",
            "FontColor": "",
            "FontSize": ""
        },
        "Undo Icon": {
            "BackgroundColor": "#1A506F"
        },
        "Undo Number Notification": {
            "BackgroundColor": ""
        },
        "Separator": {
            "BackgroundColor": "#DDDDDD",
            "Width": "1px"
        },
        "Close Button": {
            "BackgroundColor": "#1A506F"
        },
        "Close Button X": {
            "BackgroundColor": "#F2F2F2"
        },
        "Close Button On Hover": {
            "BackgroundColor": "#1F5E83"
        },
        "Close Button X On Hover": {
            "BackgroundColor": "#FFFFFF"
        }
    },
    "Context Menu": {
        "Option Container": {
            "BackgroundColor": "#ECECEC",
            "BorderWidth": "",
            "BorderColor": "",
            "BorderRadius": "",
            "PaddingLeft": "",
            "PaddingRight": "",
            "PaddingTop": "",
            "PaddingBottom": ""
        },
        "Option": {
            "BackgroundColor": "",
            "PaddingLeft": "",
            "PaddingRight": "",
            "PaddingTop": "",
            "PaddingBottom": ""
        },
        "Option On Hover": {
            "BackgroundColor": "#1A506F"
        },
        "Option Text": {
            "FontColor": "#2C2C2C"
        },
        "Option Text On Hover": {
            "FontColor": "#ffffff"
        },
        "Shortcut text": {
            "FontColor": "#6C6C6C"
        },
        "Shortcut text On Hover": {
            "FontColor": "#ffffff"
        },
        "Separator": {
            "BackgroundColor": "#C2C2C2"
        }
    }
};

export let colorfulTheme = {
    "Blocks": {
        "General": {
            "Group": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "1px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "RepetitionGroup": {
                "Group Block": {
                    "BackgroundColor": "rgba(255,255,255,0.1)",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "1px",
                    "BorderColor": "rgba(0,0,0,0.2)",
                    "BorderRadius": ""
                },
                "Button": {
                    "BackgroundColor": "rgba(25,0,125,0.7)",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent"
                },
                "Button Plus Sign": {
                    "Width": "",
                    "Height": "",
                    "BackgroundColor": ""
                },
                "Button Tooltip": {
                    "FontSize": "",
                    "FontColor": "white",
                    "BackgroundColor": "rgba(25,0,125,0.7)"
                },
                "Button On Hover": {
                    "BackgroundColor": "rgba(50,0,150,0.7)"
                },
                "Button Plus Sign On Hover": {
                    "BackgroundColor": "#ffffff"
                }
            },
            "SimpleBlock": {
                "Simple Block": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#ffffff",
                    "FontSize": "",
                    "BorderWidth": "1px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "InputBlock": {
                "Input Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "2px",
                    "PaddingBottom": "2px",
                    "BorderWidth": "1px",
                    "BorderColor": "transparent",
                    "BorderRadius": "5px"
                },
                "Input": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#000000",
                    "FontSize": ""
                }
            },
            "SelectionBlock": {
                "Selection Block": {
                    "BackgroundColor": "rgba(255,255,255,0.7)",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "FontSize": "",
                    "FontColor": "#000000",
                    "Gap": "10px",
                    "BorderWidth": "1px",
                    "BorderColor": "#c2c2c2",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "#000000",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "0",
                    "PaddingRight": "0",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px"
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "8px",
                    "PaddingRight": "8px",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "#000000"
                },
                "Option On Hover": {
                    "BackgroundColor": "#5B80A5",
                    "FontColor": "#FFFFFF"
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "#ffffff",
                    "BackgroundColor": "#364D63"
                }
            }
        },
        "Specific": {
            "LEFT_PARENTHESIS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "RIGHT_PARENTHESIS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "MINUS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "PLUS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "TIMES": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "BY": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "GREATER": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "LESS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "EQUAL_TO": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "NOT_EQUAL_TO": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "GREATER_EQUAL": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "LESS_EQUAL": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "AND": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "OR": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "NOT": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "IDENT": {
                "Input Container": {
                    "BackgroundColor": "#E1C7D2",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": ""
                }
            },
            "INT_CONST": {
                "Input Container": {
                    "BackgroundColor": "#C7C9E1",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": ""
                }
            },
            "FLOAT_CONST": {
                "Input Container": {
                    "BackgroundColor": "#C7C9E1",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": ""
                }
            },
            "CHAR_CONST": {
                "Input Container": {
                    "BackgroundColor": "#C7E1D7",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": ""
                }
            },
            "STRING_CONST": {
                "Input Container": {
                    "BackgroundColor": "#C7E1D7",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": ""
                }
            },
            "BOOL_CONST": {
                "Input Container": {
                    "BackgroundColor": "#C7D2E1",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": ""
                }
            },
            "EQUALS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "FUNCTION": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "OF": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "LEFT_CURLY_BRACE": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "RIGHT_CURLY_BRACE": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "CALL": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "WITH": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "IF": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "ELSE": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "WHILE": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "FOR": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "SEMI_COLON": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "program": {},
            "stmts": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Button": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": ""
                },
                "Button Plus Sign": {
                    "Width": "",
                    "Height": "",
                    "BackgroundColor": ""
                },
                "Button Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                },
                "Button On Hover": {
                    "BackgroundColor": ""
                },
                "Button Plus Sign On Hover": {
                    "BackgroundColor": ""
                }
            },
            "stmt": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "if_stmt": {
                "Group Block": {
                    "BackgroundColor": "#5B80A5",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "10px",
                    "PaddingBottom": "10px",
                    "BorderWidth": "",
                    "BorderColor": "#364D63",
                    "BorderRadius": ""
                }
            },
            "if_else_stmt": {
                "Group Block": {
                    "BackgroundColor": "#5B80A5",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "10px",
                    "PaddingBottom": "10px",
                    "BorderWidth": "",
                    "BorderColor": "#364D63",
                    "BorderRadius": ""
                }
            },
            "while_stmt": {
                "Group Block": {
                    "BackgroundColor": "#5BA55B",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "10px",
                    "PaddingBottom": "10px",
                    "BorderWidth": "",
                    "BorderColor": "#488448",
                    "BorderRadius": ""
                }
            },
            "for_stmt": {
                "Group Block": {
                    "BackgroundColor": "#5BA55B",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "10px",
                    "PaddingBottom": "10px",
                    "BorderWidth": "",
                    "BorderColor": "#488448",
                    "BorderRadius": ""
                }
            },
            "assign_stmt": {
                "Group Block": {
                    "BackgroundColor": "#A55B80",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#844866",
                    "BorderRadius": ""
                }
            },
            "func_def_stmt": {
                "Group Block": {
                    "BackgroundColor": "#995BA5",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "10px",
                    "PaddingBottom": "10px",
                    "BorderWidth": "",
                    "BorderColor": "#7A4884",
                    "BorderRadius": ""
                }
            },
            "func_call_stmt": {
                "Group Block": {
                    "BackgroundColor": "#995BA5",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#7A4884",
                    "BorderRadius": ""
                }
            },
            "expr": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "arith_expr": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "rel_expr": {
                "Group Block": {
                    "BackgroundColor": "#5B80A5",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#364D63",
                    "BorderRadius": ""
                }
            },
            "bool_expr": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "primary_expr": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "binary_arith_expr": {
                "Group Block": {
                    "BackgroundColor": "#5B67A5",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#363D63",
                    "BorderRadius": ""
                }
            },
            "unary_minus": {
                "Group Block": {
                    "BackgroundColor": "#5B67A5",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#363D63",
                    "BorderRadius": ""
                }
            },
            "arith_op": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "rel_op": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "binary_bool_expr": {
                "Group Block": {
                    "BackgroundColor": "#5B80A5",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#364D63",
                    "BorderRadius": ""
                }
            },
            "not_expr": {
                "Group Block": {
                    "BackgroundColor": "#5B80A5",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#364D63",
                    "BorderRadius": ""
                }
            },
            "bool_bin_op": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "ident_list": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Button": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": ""
                },
                "Button Plus Sign": {
                    "Width": "",
                    "Height": "",
                    "BackgroundColor": ""
                },
                "Button Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                },
                "Button On Hover": {
                    "BackgroundColor": ""
                },
                "Button Plus Sign On Hover": {
                    "BackgroundColor": ""
                }
            },
            "expr_list": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Button": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": ""
                },
                "Button Plus Sign": {
                    "Width": "",
                    "Height": "",
                    "BackgroundColor": ""
                },
                "Button Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                },
                "Button On Hover": {
                    "BackgroundColor": ""
                },
                "Button Plus Sign On Hover": {
                    "BackgroundColor": ""
                }
            }
        }
    },
    "Code Workspace": {
        "Code Workspace": {
            "BackgroundColor": "#FAFAFA"
        },
        "Scrollbar": {
            "Width": "10px",
            "Height": "10px"
        },
        "Scrollbar Thumb": {
            "BackgroundColor": "#BBBBBB",
            "BorderRadius": "25px"
        },
        "Scrollbar Thumb On Hover": {
            "BackgroundColor": "#999999"
        },
        "Scrollbar Track": {
            "BackgroundColor": "",
            "BorderWidth": "",
            "BorderColor": ""
        },
        "Selected Block": {
            "BorderColor": "#fc3",
            "BorderShadow": "1px #fc3",
            "BorderWidth": ""
        },
    },
    "Toolbox": {
        "Toolbox Menu": {
            "BackgroundColor": "#5B80A5",
            "PaddingLeft": "10px",
            "PaddingRight": "10px",
            "PaddingTop": "",
            "PaddingBottom": ""
        },
        "Toolbox Menu Icon": {
            "BackgroundColor": "#DADADA",
            "Width": "",
            "Height": ""
        },
        "Toolbox Menu Selected Icon": {
            "BackgroundColor": "#FFFFFF"
        },
        "Toolbox Menu Label": {
            "FontColor": "#DADADA",
            "FontSize": ""
        },
        "Toolbox Menu Selected Label": {
            "FontColor": "#FFFFFF"
        },
        "Selected Tag": {
            "BackgroundColor": "#FFFFFF"
        },
        "Toolbox": {
            "BackgroundColor": "#F6F6F6"
        },
        "Block Category Title": {
            "FontSize": "",
            "FontColor": "#2B2B2B"
        },
        "Block Category On Drop Hover": {
            "BackgroundColor": "#6CB097"
        },
        "Block Category On Drop Placeholder": {
            "BackgroundColor": "green"
        },
        "Block Delete Button Container": {
            "BackgroundColor": ""
        },
        "Block Delete Button X": {
            "BackgroundColor": ""
        },
        "Scrollbar": {
            "Width": "10px",
            "Height": "10px"
        },
        "Scrollbar Thumb": {
            "BackgroundColor": "#BBBBBB",
            "BorderRadius": "25px"
        },
        "Scrollbar Thumb On Hover": {
            "BackgroundColor": "#999999"
        },
        "Scrollbar Track": {
            "BackgroundColor": "",
            "BorderWidth": "",
            "BorderColor": "#c2c2c2"
        }
    },
    "Undo Redo Toolbar": {
        "Undo Button": {
            "BackgroundColor": "#FAFAFA",
            "FontColor": "black",
            "FontSize": ""
        },
        "Undo Button On Hover": {
            "BackgroundColor": "#F3F3F3",
            "FontColor": "",
            "FontSize": ""
        },
        "Undo Icon": {
            "BackgroundColor": "#1A506F"
        },
        "Undo Number Notification": {
            "BackgroundColor": ""
        },
        "Separator": {
            "BackgroundColor": "#DDDDDD",
            "Width": "1px"
        },
        "Close Button": {
            "BackgroundColor": "#5B80A5"
        },
        "Close Button X": {
            "BackgroundColor": "#F2F2F2"
        },
        "Close Button On Hover": {
            "BackgroundColor": "#1F5E83"
        },
        "Close Button X On Hover": {
            "BackgroundColor": "#FFFFFF"
        }
    },
    "Context Menu": {
        "Option Container": {
            "BackgroundColor": "#ffffff",
            "BorderWidth": "",
            "BorderColor": "",
            "BorderRadius": "5px",
            "PaddingLeft": "",
            "PaddingRight": "",
            "PaddingTop": "5px",
            "PaddingBottom": "5px"
        },
        "Option": {
            "BackgroundColor": "",
            "PaddingLeft": "20px",
            "PaddingRight": "20px",
            "PaddingTop": "",
            "PaddingBottom": ""
        },
        "Option On Hover": {
            "BackgroundColor": "#5B80A5"
        },
        "Option Text": {
            "FontColor": "#2C2C2C"
        },
        "Option Text On Hover": {
            "FontColor": "#ffffff"
        },
        "Shortcut text": {
            "FontColor": "#6C6C6C"
        },
        "Shortcut text On Hover": {
            "FontColor": "#ffffff"
        },
        "Separator": {
            "BackgroundColor": "#C2C2C2"
        }
    }
};

export let darkColorfulTheme = {
    "Blocks": {
        "General": {
            "Group": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "1px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "RepetitionGroup": {
                "Group Block": {
                    "BackgroundColor": "rgba(255,255,255,0.1)",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "1px",
                    "BorderColor": "rgba(0,0,0,0.2)",
                    "BorderRadius": ""
                },
                "Button": {
                    "BackgroundColor": "rgba(75,0,150,0.7)",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent"
                },
                "Button Plus Sign": {
                    "Width": "",
                    "Height": "",
                    "BackgroundColor": ""
                },
                "Button Tooltip": {
                    "FontSize": "",
                    "FontColor": "white",
                    "BackgroundColor": "rgba(75,0,150,1)"
                },
                "Button On Hover": {
                    "BackgroundColor": "rgba(100,0,175,0.7)"
                },
                "Button Plus Sign On Hover": {
                    "BackgroundColor": "#ffffff"
                }
            },
            "SimpleBlock": {
                "Simple Block": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#ffffff",
                    "FontSize": "",
                    "BorderWidth": "1px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "InputBlock": {
                "Input Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "2px",
                    "PaddingBottom": "2px",
                    "BorderWidth": "1px",
                    "BorderColor": "transparent",
                    "BorderRadius": "5px"
                },
                "Input": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#000000",
                    "FontSize": ""
                }
            },
            "SelectionBlock": {
                "Selection Block": {
                    "BackgroundColor": "rgba(255,255,255,0.85)",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "FontSize": "",
                    "FontColor": "#000000",
                    "Gap": "10px",
                    "BorderWidth": "1px",
                    "BorderColor": "#c2c2c2",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "#000000",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "1px",
                    "PaddingRight": "1px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px"
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "8px",
                    "PaddingRight": "8px",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "#000000"
                },
                "Option On Hover": {
                    "BackgroundColor": "#5B80A5",
                    "FontColor": "#FFFFFF"
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "#ffffff",
                    "BackgroundColor": "#364D63"
                }
            }
        },
        "Specific": {
            "LEFT_PARENTHESIS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "RIGHT_PARENTHESIS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "MINUS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "PLUS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "TIMES": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "BY": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "GREATER": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "LESS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "EQUAL_TO": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "NOT_EQUAL_TO": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "GREATER_EQUAL": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "LESS_EQUAL": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "AND": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "OR": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "NOT": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "IDENT": {
                "Input Container": {
                    "BackgroundColor": "#E1C7D2",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": ""
                }
            },
            "INT_CONST": {
                "Input Container": {
                    "BackgroundColor": "#C7C9E1",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": ""
                }
            },
            "FLOAT_CONST": {
                "Input Container": {
                    "BackgroundColor": "#C7C9E1",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": ""
                }
            },
            "CHAR_CONST": {
                "Input Container": {
                    "BackgroundColor": "#C7E1D7",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": ""
                }
            },
            "STRING_CONST": {
                "Input Container": {
                    "BackgroundColor": "#C7E1D7",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": ""
                }
            },
            "BOOL_CONST": {
                "Input Container": {
                    "BackgroundColor": "#C7D2E1",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Input": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": ""
                }
            },
            "EQUALS": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "FUNCTION": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "OF": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "LEFT_CURLY_BRACE": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "RIGHT_CURLY_BRACE": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "CALL": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "WITH": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "IF": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "ELSE": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "WHILE": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "FOR": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "SEMI_COLON": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "program": {},
            "stmts": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Button": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": ""
                },
                "Button Plus Sign": {
                    "Width": "",
                    "Height": "",
                    "BackgroundColor": ""
                },
                "Button Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                },
                "Button On Hover": {
                    "BackgroundColor": ""
                },
                "Button Plus Sign On Hover": {
                    "BackgroundColor": ""
                }
            },
            "stmt": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "if_stmt": {
                "Group Block": {
                    "BackgroundColor": "#5B80A5",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "10px",
                    "PaddingBottom": "10px",
                    "BorderWidth": "",
                    "BorderColor": "#364D63",
                    "BorderRadius": ""
                }
            },
            "if_else_stmt": {
                "Group Block": {
                    "BackgroundColor": "#5B80A5",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "10px",
                    "PaddingBottom": "10px",
                    "BorderWidth": "",
                    "BorderColor": "#364D63",
                    "BorderRadius": ""
                }
            },
            "while_stmt": {
                "Group Block": {
                    "BackgroundColor": "#5BA55B",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "10px",
                    "PaddingBottom": "10px",
                    "BorderWidth": "",
                    "BorderColor": "#488448",
                    "BorderRadius": ""
                }
            },
            "for_stmt": {
                "Group Block": {
                    "BackgroundColor": "#5BA55B",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "10px",
                    "PaddingBottom": "10px",
                    "BorderWidth": "",
                    "BorderColor": "#488448",
                    "BorderRadius": ""
                }
            },
            "assign_stmt": {
                "Group Block": {
                    "BackgroundColor": "#A55B80",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#844866",
                    "BorderRadius": ""
                }
            },
            "func_def_stmt": {
                "Group Block": {
                    "BackgroundColor": "#995BA5",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "10px",
                    "PaddingBottom": "10px",
                    "BorderWidth": "",
                    "BorderColor": "#7A4884",
                    "BorderRadius": ""
                }
            },
            "func_call_stmt": {
                "Group Block": {
                    "BackgroundColor": "#995BA5",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#7A4884",
                    "BorderRadius": ""
                }
            },
            "expr": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "arith_expr": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "rel_expr": {
                "Group Block": {
                    "BackgroundColor": "#5B80A5",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#364D63",
                    "BorderRadius": ""
                }
            },
            "bool_expr": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "primary_expr": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "binary_arith_expr": {
                "Group Block": {
                    "BackgroundColor": "#5B67A5",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#363D63",
                    "BorderRadius": ""
                }
            },
            "unary_minus": {
                "Group Block": {
                    "BackgroundColor": "#5B67A5",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#363D63",
                    "BorderRadius": ""
                }
            },
            "arith_op": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "rel_op": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "binary_bool_expr": {
                "Group Block": {
                    "BackgroundColor": "#5B80A5",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#364D63",
                    "BorderRadius": ""
                }
            },
            "not_expr": {
                "Group Block": {
                    "BackgroundColor": "#5B80A5",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "#364D63",
                    "BorderRadius": ""
                }
            },
            "bool_bin_op": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "Gap": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Arrow": {
                    "BackgroundColor": "",
                    "Width": "",
                    "Height": ""
                },
                "Option Container": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": ""
                },
                "Option": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": ""
                },
                "Option On Hover": {
                    "BackgroundColor": "",
                    "FontColor": ""
                },
                "Option Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                }
            },
            "ident_list": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Button": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": ""
                },
                "Button Plus Sign": {
                    "Width": "",
                    "Height": "",
                    "BackgroundColor": ""
                },
                "Button Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                },
                "Button On Hover": {
                    "BackgroundColor": ""
                },
                "Button Plus Sign On Hover": {
                    "BackgroundColor": ""
                }
            },
            "expr_list": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Button": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "BorderWidth": "",
                    "BorderColor": ""
                },
                "Button Plus Sign": {
                    "Width": "",
                    "Height": "",
                    "BackgroundColor": ""
                },
                "Button Tooltip": {
                    "FontSize": "",
                    "FontColor": "",
                    "BackgroundColor": ""
                },
                "Button On Hover": {
                    "BackgroundColor": ""
                },
                "Button Plus Sign On Hover": {
                    "BackgroundColor": ""
                }
            }
        }
    },
    "Code Workspace": {
        "Code Workspace": {
            "BackgroundColor": "#1E1E1E"
        },
        "Scrollbar": {
            "Width": "10px",
            "Height": "10px"
        },
        "Scrollbar Thumb": {
            "BackgroundColor": "#424242",
            "BorderRadius": "25px"
        },
        "Scrollbar Thumb On Hover": {
            "BackgroundColor": "#525252"
        },
        "Scrollbar Track": {
            "BackgroundColor": "",
            "BorderWidth": "",
            "BorderColor": ""
        },
        "Selected Block": {
            "BorderColor": "#fc3",
            "BorderShadow": "1px #fc3",
            "BorderWidth": ""
        },
    },
    "Toolbox": {
        "Toolbox Menu": {
            "BackgroundColor": "#333333",
            "PaddingLeft": "10px",
            "PaddingRight": "10px",
            "PaddingTop": "",
            "PaddingBottom": ""
        },
        "Toolbox Menu Icon": {
            "BackgroundColor": "#DADADA",
            "Width": "",
            "Height": ""
        },
        "Toolbox Menu Selected Icon": {
            "BackgroundColor": "#FFFFFF"
        },
        "Toolbox Menu Label": {
            "FontColor": "#DADADA",
            "FontSize": ""
        },
        "Toolbox Menu Selected Label": {
            "FontColor": "#FFFFFF"
        },
        "Selected Tag": {
            "BackgroundColor": "#5B80A5"
        },
        "Toolbox": {
            "BackgroundColor": "#252526"
        },
        "Block Category Title": {
            "FontSize": "",
            "FontColor": "#DADADA"
        },
        "Block Category On Drop Hover": {
            "BackgroundColor": "#6CB097"
        },
        "Block Category On Drop Placeholder": {
            "BackgroundColor": "green"
        },
        "Block Delete Button Container": {
            "BackgroundColor": ""
        },
        "Block Delete Button X": {
            "BackgroundColor": ""
        },
        "Scrollbar": {
            "Width": "10px",
            "Height": "10px"
        },
        "Scrollbar Thumb": {
            "BackgroundColor": "#424242",
            "BorderRadius": "25px"
        },
        "Scrollbar Thumb On Hover": {
            "BackgroundColor": "#525252"
        },
        "Scrollbar Track": {
            "BackgroundColor": "",
            "BorderWidth": "",
            "BorderColor": "#c2c2c2"
        }
    },
    "Undo Redo Toolbar": {
        "Undo Button": {
            "BackgroundColor": "",
            "FontColor": "",
            "FontSize": ""
        },
        "Undo Button On Hover": {
            "BackgroundColor": "",
            "FontColor": "",
            "FontSize": ""
        },
        "Undo Icon": {
            "BackgroundColor": ""
        },
        "Undo Number Notification": {
            "BackgroundColor": ""
        },
        "Separator": {
            "BackgroundColor": "",
            "Width": "1px"
        },
        "Close Button": {
            "BackgroundColor": ""
        },
        "Close Button X": {
            "BackgroundColor": "#F2F2F2"
        },
        "Close Button On Hover": {
            "BackgroundColor": "#0B598E"
        },
        "Close Button X On Hover": {
            "BackgroundColor": "#FFFFFF"
        }
    },
    "Context Menu": {
        "Option Container": {
            "BackgroundColor": "#ffffff",
            "BorderWidth": "",
            "BorderColor": "",
            "BorderRadius": "5px",
            "PaddingLeft": "",
            "PaddingRight": "",
            "PaddingTop": "5px",
            "PaddingBottom": "5px"
        },
        "Option": {
            "BackgroundColor": "",
            "PaddingLeft": "20px",
            "PaddingRight": "20px",
            "PaddingTop": "",
            "PaddingBottom": ""
        },
        "Option On Hover": {
            "BackgroundColor": "#5B80A5"
        },
        "Option Text": {
            "FontColor": "#2C2C2C"
        },
        "Option Text On Hover": {
            "FontColor": "#ffffff"
        },
        "Shortcut text": {
            "FontColor": "#6C6C6C"
        },
        "Shortcut text On Hover": {
            "FontColor": "#ffffff"
        },
        "Separator": {
            "BackgroundColor": "#C2C2C2"
        }
    }
};

