export let config = {
    language: {
        non_terminals: [
            {
                name: "program",
                alternate_rules: [
                    [
                        {
                            type: "non_terminal",
                            name: "stmts"
                        }
                    ]
                ]
            },
            {
                name: "stmts",
                alternate_rules: [
                    [
                        {
                            type: "non_terminal",
                            name: "stmt",
                            repeatable: true
                        }
                    ],
                ]
            },
            {
                name: "stmt",
                alternate_rules: [
                    [
                        {
                            type: "non_terminal",
                            name: "if_stmt"
                        }
                    ],
                    [
                        {
                            type: "non_terminal",
                            name: "if_else_stmt"
                        }
                    ],
                    [
                        {
                            type: "non_terminal",
                            name: "while_stmt"
                        }
                    ],
                    [
                        {
                            type: "non_terminal",
                            name: "for_stmt"
                        }
                    ],
                    [
                        {
                            type: "non_terminal",
                            name: "assign_stmt"
                        }
                    ],
                    [
                        {
                            type: "non_terminal",
                            name: "func_def_stmt"
                        }
                    ],
                    [
                        {
                            type: "non_terminal",
                            name: "func_call_stmt"
                        }
                    ]
                ]
            },
            {
                name: "expr",
                alternate_rules: [
                    [
                        {
                            type: "non_terminal",
                            name: "arith_expr"
                        }
                    ],
                    [
                        {
                            type: "non_terminal",
                            name: "rel_expr"
                        }
                    ],
                    [
                        {
                            type: "non_terminal",
                            name: "bool_expr"
                        }
                    ],
                    [
                        {
                            type: "non_terminal",
                            name: "primary_expr"
                        }
                    ]
                ]
            },
            {
                name: "arith_expr",
                alternate_rules: [
                    [
                        {
                            type: "non_terminal",
                            name: "binary_arith_expr"
                        }
                    ],
                    [
                        {
                            type: "non_terminal",
                            name: "unary_minus"
                        }
                    ]
                ]
            },
            {
                name: "binary_arith_expr",
                alternate_rules: [
                    [
                        {
                            type: "non_terminal",
                            name: "expr"
                        },
                        {
                            type: "non_terminal",
                            name: "arith_op"
                        },
                        {
                            type: "non_terminal",
                            name: "expr"
                        }
                    ]
                ]
            },
            {
                name: "unary_minus",
                alternate_rules: [
                    [
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
                ]
            },
            {
                name: "arith_op",
                alternate_rules: [
                    [
                        {
                            type: "terminal",
                            name: "PLUS",
                            alias: "+"
                        }
                    ],
                    [
                        {
                            type: "terminal",
                            name: "MINUS",
                            alias: "-"
                        }
                    ],
                    [
                        {
                            type: "terminal",
                            name: "TIMES",
                            alias: "*"
                        }
                    ],
                    [
                        {
                            type: "terminal",
                            name: "BY",
                            alias: "/"
                        }
                    ],
                ]
            },
            {
                name: "rel_expr",
                alternate_rules: [
                    [
                        {
                            type: "non_terminal",
                            name: "expr"
                        },
                        {
                            type: "non_terminal",
                            name: "rel_op"
                        },
                        {
                            type: "non_terminal",
                            name: "expr"
                        }
                    ]
                ]
            },
            {
                name: "rel_op",
                alternate_rules: [
                    [
                        {
                            type: "terminal",
                            name: "GREATER",
                            alias: ">"
                        }
                    ],
                    [
                        {
                            type: "terminal",
                            name: "LESS",
                            alias: "<"
                        }
                    ],
                    [
                        {
                            type: "terminal",
                            name: "EQUAL_TO",
                            alias: "=="
                        }
                    ],
                    [
                        {
                            type: "terminal",
                            name: "NOT_EQUAL_TO",
                            alias: "!="
                        }
                    ],
                    [
                        {
                            type: "terminal",
                            name: "GREATER_EQUAL",
                            alias: ">="
                        }
                    ],
                    [
                        {
                            type: "terminal",
                            name: "LESS_EQUAL",
                            alias: "<="
                        }
                    ],
                ]
            },
            {
                name: "bool_expr",
                alternate_rules: [
                    [
                        {
                            type: "non_terminal",
                            name: "binary_bool_expr"
                        }
                    ],
                    [
                        {
                            type: "non_terminal",
                            name: "not_expr"
                        }
                    ]
                ]
            },
            {
                name: "binary_bool_expr",
                alternate_rules: [
                    [
                        {
                            type: "non_terminal",
                            name: "expr"
                        },
                        {
                            type: "non_terminal",
                            name: "bool_bin_op"
                        },
                        {
                            type: "non_terminal",
                            name: "expr"
                        }
                    ]
                ]
            },
            {
                name: "bool_bin_op",
                alternate_rules: [
                    [
                        {
                            type: "terminal",
                            name: "AND"
                        }
                    ],
                    [
                        {
                            type: "terminal",
                            name: "OR"
                        }
                    ]
                ]
            },
            {
                name: "not_expr",
                alternate_rules: [
                    [
                        {
                            type: "terminal",
                            name: "NOT"
                        },
                        {
                            type: "non_terminal",
                            name: "expr"
                        }
                    ]
                ]
            },
            {
                name: "primary_expr",
                alternate_rules: [
                    [
                        {
                            type: "terminal",
                            name: "IDENT"
                        },
                    ],
                    [
                        {
                            type: "terminal",
                            name: "INT_CONST"
                        },
                    ],
                    [
                        {
                            type: "terminal",
                            name: "FLOAT_CONST"
                        },
                    ],
                    [
                        {
                            type: "terminal",
                            name: "CHAR_CONST"
                        },
                    ],
                    [
                        {
                            type: "terminal",
                            name: "STRING_CONST"
                        },
                    ],
                    [
                        {
                            type: "terminal",
                            name: "BOOL_CONST"
                        }
                    ]
                ]
            },
            {
                name: "assign_stmt",
                alternate_rules: [
                    [
                        {
                            type: "terminal",
                            name: "IDENT"
                        },
                        {
                            type: "terminal",
                            name: "EQUALS",
                            alias: "="
                        },
                        {
                            type: "non_terminal",
                            name: "expr"
                        }
                    ]
                ]
            },
            {
                name: "func_def_stmt",
                alternate_rules: [
                    [
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
                            type: "non_terminal",
                            name: "ident_list"
                        },
                        {
                            type: "non_terminal",
                            name: "stmts"
                        }
                    ]
                ]
            },
            {
                name: "func_call_stmt",
                alternate_rules: [
                    [
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
                            type: "non_terminal",
                            name: "expr_list"
                        },
                    ]
                ]
            },
            {
                name: "if_stmt",
                alternate_rules: [
                    [
                        {
                            type: "terminal",
                            name: "IF"
                        },
                        {
                            type: "non_terminal",
                            alias: "condition",
                            name: "expr"
                        },
                        {
                            type: "non_terminal",
                            alias: "if_part",
                            name: "stmts"
                        }
                    ]
                ]
            },
            {
                name: "if_else_stmt",
                alternate_rules: [
                    [
                        {
                            type: "terminal",
                            name: "IF"
                        },
                        {
                            type: "non_terminal",
                            alias: "condition",
                            name: "expr"
                        },
                        {
                            type: "non_terminal",
                            alias: "if_part",
                            name: "stmts"
                        },
                        {
                            type: "terminal",
                            name: "ELSE"
                        },
                        {
                            type: "non_terminal",
                            alias: "else_part",
                            name: "stmts"
                        }
                    ]
                ]
            },
            {
                name: "while_stmt",
                alternate_rules: [
                    [
                        {
                            type: "terminal",
                            name: "WHILE"
                        },
                        {
                            type: "non_terminal",
                            alias: "condition",
                            name: "expr"
                        },
                        {
                            type: "non_terminal",
                            alias: "while_part",
                            name: "stmts"
                        }
                    ]
                ]
            },
            {
                name: "for_stmt",
                alternate_rules: [
                    [
                        {
                            type: "terminal",
                            name: "FOR"
                        },
                        {
                            type: "non_terminal",
                            alias: "initialization",
                            name: "assign_stmt"
                        },
                        {
                            type: "non_terminal",
                            alias: "condition",
                            name: "expr"
                        },
                        {
                            type: "non_terminal",
                            alias: "step",
                            name: "assign_stmt"
                        },
                        {
                            type: "non_terminal",
                            alias: "for_part",
                            name: "stmts"
                        }
                    ]
                ]
            },
            {
                name: "ident_list",
                alternate_rules: [
                    [
                        {
                            type: "terminal",
                            name: "IDENT",
                            repeatable: true
                        },
                    ],
                ]
            },
            {
                name: "expr_list",
                alternate_rules: [
                    [
                        {
                            type: "non_terminal",
                            name: "expr",
                            alias: 'ARG',
                            repeatable: true
                        },
                    ],
                ]
            }
        ],
        terminals: {
            staticText: [
                "+", "-", "*", "/", "AND", "OR", "NOT", "=", "IF", "ELSE", "WHILE", "FOR"
            ],
            dynamicText: [
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
    },
    styles: {
        "program" : {
            /* not rendered since it has only one child which is a non-terminal */
        },
        "stmts" : {

        },
        "stmt" : {
            
        },
        "if_stmt" : {

        },
        "if_else_stmt" : {

        },
        "while_stmt" : {

        },
        "for_stmt" : {

        },
        "assign_stmt" : {

        },
        "expr" : {

        },
        "arith_expr" : {

        },
        "binary_arith_expr" : {

        },
        "unary_minus" : {

        },
        "bool_expr" : {

        },
        "primary_expr" : {

        },
        "arith_op" : {

        },
        "binary_bool_expr" : {

        },
        "not_expr" : {

        },
        "bool_bin_op" : {

        },
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
            'border': 'solid 2px #37373D',
            'color': '#4A9CD6',
            'font-weight': '700'
        },
        "INT_CONST" : {
            'background-color': 'transparent',
            'border': 'solid 2px #37373D',
            'color': '#44C9B0',
            'font-weight': '700'
        },
        "FLOAT_CONST" : {
            'background-color': 'transparent',
            'border': 'solid 2px #37373D',
            'color': '#44C9B0',
            'font-weight': '700'
        },
        "CHAR_CONST" : {
            'background-color': 'transparent',
            'border': 'solid 2px #37373D',
            'color': '#CE9178',
            'font-weight': '700'
        },
        "STRING_CONST" : {
            'background-color': 'transparent',
            'border': 'solid 2px #37373D',
            'color': '#CE9178',
            'font-weight': '700'
        },
        "BOOL_CONST" : {
            'background-color': 'transparent',
            'border': 'solid 2px #37373D',
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
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "IF",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "alias": "condition",
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "type": "NEW_LINE"
                        },
                        {
                            "type": "TAB_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "stmt",
                                    "isTerminal": false
                                },
                                "repeatable": true,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "if_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "if_else_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "while_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "for_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "assign_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "func_def_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "func_call_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "stmt",
                                "isTerminal": false
                            },
                            "repeatable": true,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "if_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "if_else_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "while_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "for_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "func_def_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "func_call_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "if_else_stmt",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "IF",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "alias": "condition",
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "type": "NEW_LINE"
                        },
                        {
                            "type": "TAB_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "stmt",
                                    "isTerminal": false
                                },
                                "repeatable": true,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "if_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "if_else_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "while_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "for_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "assign_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "func_def_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "func_call_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "type": "NEW_LINE"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "ELSE",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK"
                        },
                        {
                            "type": "NEW_LINE"
                        },
                        {
                            "type": "TAB_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "stmt",
                                    "isTerminal": false
                                },
                                "repeatable": true,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "if_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "if_else_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "while_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "for_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "assign_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "func_def_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "func_call_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "stmt",
                                "isTerminal": false
                            },
                            "repeatable": true,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "if_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "if_else_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "while_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "for_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "func_def_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "func_call_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "while_stmt",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "WHILE",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "alias": "condition",
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "type": "NEW_LINE"
                        },
                        {
                            "type": "TAB_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "stmt",
                                    "isTerminal": false
                                },
                                "repeatable": true,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "if_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "if_else_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "while_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "for_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "assign_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "func_def_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "func_call_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "stmt",
                                "isTerminal": false
                            },
                            "repeatable": true,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "if_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "if_else_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "while_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "for_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "func_def_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "func_call_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "for_stmt",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "FOR",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "alias": "initialization",
                                "repeatable": false,
                                "optional": false
                            },
                            "elems": [
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "IDENT",
                                            "isTerminal": true
                                        },
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    "type": "INPUT_BLOCK"
                                },
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "EQUALS",
                                            "isTerminal": true
                                        },
                                        "alias": "=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    "type": "SIMPLE_BLOCK"
                                },
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "expr",
                                            "isTerminal": false
                                        },
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    "alternateSymbols": [
                                        {
                                            "symbol": {
                                                "name": "arith_expr",
                                                "isTerminal": false
                                            },
                                            "repeatable": false,
                                            "optional": false
                                        },
                                        {
                                            "symbol": {
                                                "name": "rel_expr",
                                                "isTerminal": false
                                            },
                                            "repeatable": false,
                                            "optional": false
                                        },
                                        {
                                            "symbol": {
                                                "name": "bool_expr",
                                                "isTerminal": false
                                            },
                                            "repeatable": false,
                                            "optional": false
                                        },
                                        {
                                            "symbol": {
                                                "name": "primary_expr",
                                                "isTerminal": false
                                            },
                                            "repeatable": false,
                                            "optional": false
                                        }
                                    ],
                                    "type": "SELECTION_BLOCK"
                                }
                            ],
                            "type": "GROUP"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "alias": "condition",
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "alias": "step",
                                "repeatable": false,
                                "optional": false
                            },
                            "elems": [
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "IDENT",
                                            "isTerminal": true
                                        },
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    "type": "INPUT_BLOCK"
                                },
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "EQUALS",
                                            "isTerminal": true
                                        },
                                        "alias": "=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    "type": "SIMPLE_BLOCK"
                                },
                                {
                                    "symbol": {
                                        "symbol": {
                                            "name": "expr",
                                            "isTerminal": false
                                        },
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    "alternateSymbols": [
                                        {
                                            "symbol": {
                                                "name": "arith_expr",
                                                "isTerminal": false
                                            },
                                            "repeatable": false,
                                            "optional": false
                                        },
                                        {
                                            "symbol": {
                                                "name": "rel_expr",
                                                "isTerminal": false
                                            },
                                            "repeatable": false,
                                            "optional": false
                                        },
                                        {
                                            "symbol": {
                                                "name": "bool_expr",
                                                "isTerminal": false
                                            },
                                            "repeatable": false,
                                            "optional": false
                                        },
                                        {
                                            "symbol": {
                                                "name": "primary_expr",
                                                "isTerminal": false
                                            },
                                            "repeatable": false,
                                            "optional": false
                                        }
                                    ],
                                    "type": "SELECTION_BLOCK"
                                }
                            ],
                            "type": "GROUP"
                        },
                        {
                            "type": "NEW_LINE"
                        },
                        {
                            "type": "TAB_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "stmt",
                                    "isTerminal": false
                                },
                                "repeatable": true,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "if_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "if_else_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "while_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "for_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "assign_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "func_def_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "func_call_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "stmt",
                                "isTerminal": false
                            },
                            "repeatable": true,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "if_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "if_else_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "while_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "for_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "func_def_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "func_call_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK"
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
                        "repeatable": false,
                        "optional": false
                    },
                    "type": "INPUT_BLOCK",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "INT_CONST",
                            "isTerminal": true
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "type": "INPUT_BLOCK",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "FLOAT_CONST",
                            "isTerminal": true
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "type": "INPUT_BLOCK",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "CHAR_CONST",
                            "isTerminal": true
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "type": "INPUT_BLOCK",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "STRING_CONST",
                            "isTerminal": true
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "type": "INPUT_BLOCK",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "BOOL_CONST",
                            "isTerminal": true
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "userInput_": "true",
                    "type": "INPUT_BLOCK",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "BOOL_CONST",
                            "isTerminal": true
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "userInput_": "false",
                    "type": "INPUT_BLOCK",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "primary_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "INT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "FLOAT_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "CHAR_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "STRING_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "BOOL_CONST",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
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
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "PLUS",
                                    "isTerminal": true
                                },
                                "alias": "+",
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "arith_op",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "PLUS",
                                            "isTerminal": true
                                        },
                                        "alias": "+",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "MINUS",
                                            "isTerminal": true
                                        },
                                        "alias": "-",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "TIMES",
                                            "isTerminal": true
                                        },
                                        "alias": "*",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "BY",
                                            "isTerminal": true
                                        },
                                        "alias": "/",
                                        "repeatable": false,
                                        "optional": false
                                    }
                                ],
                                "type": "SELECTION_BLOCK"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "arith_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_arith_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "unary_minus",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "binary_arith_expr",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "MINUS",
                                    "isTerminal": true
                                },
                                "alias": "-",
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "arith_op",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "PLUS",
                                            "isTerminal": true
                                        },
                                        "alias": "+",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "MINUS",
                                            "isTerminal": true
                                        },
                                        "alias": "-",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "TIMES",
                                            "isTerminal": true
                                        },
                                        "alias": "*",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "BY",
                                            "isTerminal": true
                                        },
                                        "alias": "/",
                                        "repeatable": false,
                                        "optional": false
                                    }
                                ],
                                "type": "SELECTION_BLOCK"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "arith_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_arith_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "unary_minus",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "binary_arith_expr",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "TIMES",
                                    "isTerminal": true
                                },
                                "alias": "*",
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "arith_op",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "PLUS",
                                            "isTerminal": true
                                        },
                                        "alias": "+",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "MINUS",
                                            "isTerminal": true
                                        },
                                        "alias": "-",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "TIMES",
                                            "isTerminal": true
                                        },
                                        "alias": "*",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "BY",
                                            "isTerminal": true
                                        },
                                        "alias": "/",
                                        "repeatable": false,
                                        "optional": false
                                    }
                                ],
                                "type": "SELECTION_BLOCK"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "arith_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_arith_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "unary_minus",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "binary_arith_expr",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "BY",
                                    "isTerminal": true
                                },
                                "alias": "/",
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "arith_op",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "PLUS",
                                            "isTerminal": true
                                        },
                                        "alias": "+",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "MINUS",
                                            "isTerminal": true
                                        },
                                        "alias": "-",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "TIMES",
                                            "isTerminal": true
                                        },
                                        "alias": "*",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "BY",
                                            "isTerminal": true
                                        },
                                        "alias": "/",
                                        "repeatable": false,
                                        "optional": false
                                    }
                                ],
                                "type": "SELECTION_BLOCK"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "arith_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_arith_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "unary_minus",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "unary_minus",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "MINUS",
                                    "isTerminal": true
                                },
                                "alias": "-",
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "arith_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_arith_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "unary_minus",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
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
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "GREATER",
                                    "isTerminal": true
                                },
                                "alias": ">",
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "rel_op",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "GREATER",
                                            "isTerminal": true
                                        },
                                        "alias": ">",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS",
                                            "isTerminal": true
                                        },
                                        "alias": "<",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "==",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "NOT_EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "!=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "GREATER_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": ">=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": "<=",
                                        "repeatable": false,
                                        "optional": false
                                    }
                                ],
                                "type": "SELECTION_BLOCK"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "expr",
                                "isTerminal": false
                            },
                            "alias": "condition",
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "arith_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "rel_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "bool_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "primary_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "rel_expr",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LESS",
                                    "isTerminal": true
                                },
                                "alias": "<",
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "rel_op",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "GREATER",
                                            "isTerminal": true
                                        },
                                        "alias": ">",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS",
                                            "isTerminal": true
                                        },
                                        "alias": "<",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "==",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "NOT_EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "!=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "GREATER_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": ">=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": "<=",
                                        "repeatable": false,
                                        "optional": false
                                    }
                                ],
                                "type": "SELECTION_BLOCK"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "expr",
                                "isTerminal": false
                            },
                            "alias": "condition",
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "arith_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "rel_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "bool_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "primary_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "rel_expr",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "EQUAL_TO",
                                    "isTerminal": true
                                },
                                "alias": "==",
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "rel_op",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "GREATER",
                                            "isTerminal": true
                                        },
                                        "alias": ">",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS",
                                            "isTerminal": true
                                        },
                                        "alias": "<",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "==",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "NOT_EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "!=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "GREATER_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": ">=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": "<=",
                                        "repeatable": false,
                                        "optional": false
                                    }
                                ],
                                "type": "SELECTION_BLOCK"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "expr",
                                "isTerminal": false
                            },
                            "alias": "condition",
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "arith_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "rel_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "bool_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "primary_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "rel_expr",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "NOT_EQUAL_TO",
                                    "isTerminal": true
                                },
                                "alias": "!=",
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "rel_op",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "GREATER",
                                            "isTerminal": true
                                        },
                                        "alias": ">",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS",
                                            "isTerminal": true
                                        },
                                        "alias": "<",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "==",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "NOT_EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "!=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "GREATER_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": ">=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": "<=",
                                        "repeatable": false,
                                        "optional": false
                                    }
                                ],
                                "type": "SELECTION_BLOCK"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "expr",
                                "isTerminal": false
                            },
                            "alias": "condition",
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "arith_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "rel_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "bool_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "primary_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "rel_expr",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "GREATER_EQUAL",
                                    "isTerminal": true
                                },
                                "alias": ">=",
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "rel_op",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "GREATER",
                                            "isTerminal": true
                                        },
                                        "alias": ">",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS",
                                            "isTerminal": true
                                        },
                                        "alias": "<",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "==",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "NOT_EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "!=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "GREATER_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": ">=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": "<=",
                                        "repeatable": false,
                                        "optional": false
                                    }
                                ],
                                "type": "SELECTION_BLOCK"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "expr",
                                "isTerminal": false
                            },
                            "alias": "condition",
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "arith_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "rel_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "bool_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "primary_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "rel_expr",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "LESS_EQUAL",
                                    "isTerminal": true
                                },
                                "alias": "<=",
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "rel_op",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "GREATER",
                                            "isTerminal": true
                                        },
                                        "alias": ">",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS",
                                            "isTerminal": true
                                        },
                                        "alias": "<",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "==",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "NOT_EQUAL_TO",
                                            "isTerminal": true
                                        },
                                        "alias": "!=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "GREATER_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": ">=",
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "LESS_EQUAL",
                                            "isTerminal": true
                                        },
                                        "alias": "<=",
                                        "repeatable": false,
                                        "optional": false
                                    }
                                ],
                                "type": "SELECTION_BLOCK"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "expr",
                                "isTerminal": false
                            },
                            "alias": "condition",
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "arith_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "rel_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "bool_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "primary_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "binary_bool_expr",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "AND",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "bool_bin_op",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "AND",
                                            "isTerminal": true
                                        },
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "OR",
                                            "isTerminal": true
                                        },
                                        "repeatable": false,
                                        "optional": false
                                    }
                                ],
                                "type": "SELECTION_BLOCK"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "bool_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_bool_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "not_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "alias": "condition",
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "binary_bool_expr",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "OR",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK",
                            "generatedBy": {
                                "symbol": {
                                    "symbol": {
                                        "name": "bool_bin_op",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "AND",
                                            "isTerminal": true
                                        },
                                        "repeatable": false,
                                        "optional": false
                                    },
                                    {
                                        "symbol": {
                                            "name": "OR",
                                            "isTerminal": true
                                        },
                                        "repeatable": false,
                                        "optional": false
                                    }
                                ],
                                "type": "SELECTION_BLOCK"
                            }
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "bool_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_bool_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "not_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "alias": "condition",
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "not_expr",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "NOT",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "bool_expr",
                                "isTerminal": false
                            },
                            "repeatable": false,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "binary_bool_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "not_expr",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK",
                        "generatedBy": {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "alias": "condition",
                                "repeatable": false,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
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
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "FUNCTION",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "alias": "NAME",
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "INPUT_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "OF",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "repeatable": true,
                                "optional": false
                            },
                            "type": "INPUT_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "stmt",
                                    "isTerminal": false
                                },
                                "repeatable": true,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "if_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "if_else_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "while_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "for_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "assign_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "func_def_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "func_call_stmt",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "stmt",
                                "isTerminal": false
                            },
                            "repeatable": true,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "if_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "if_else_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "while_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "for_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "func_def_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "func_call_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK"
                    }
                },
                {
                    "symbol": {
                        "symbol": {
                            "name": "func_call_stmt",
                            "isTerminal": false
                        },
                        "repeatable": false,
                        "optional": false
                    },
                    "elems": [
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "CALL",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "IDENT",
                                    "isTerminal": true
                                },
                                "alias": "FUNCTION NAME",
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "INPUT_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "WITH",
                                    "isTerminal": true
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            "type": "SIMPLE_BLOCK"
                        },
                        {
                            "symbol": {
                                "symbol": {
                                    "name": "expr",
                                    "isTerminal": false
                                },
                                "alias": "ARG",
                                "repeatable": true,
                                "optional": false
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "arith_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "rel_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "bool_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                },
                                {
                                    "symbol": {
                                        "name": "primary_expr",
                                        "isTerminal": false
                                    },
                                    "repeatable": false,
                                    "optional": false
                                }
                            ],
                            "type": "SELECTION_BLOCK"
                        }
                    ],
                    "type": "GROUP",
                    "generatedBy": {
                        "symbol": {
                            "symbol": {
                                "name": "stmt",
                                "isTerminal": false
                            },
                            "repeatable": true,
                            "optional": false
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "if_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "if_else_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "while_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "for_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "assign_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "func_def_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            },
                            {
                                "symbol": {
                                    "name": "func_call_stmt",
                                    "isTerminal": false
                                },
                                "repeatable": false,
                                "optional": false
                            }
                        ],
                        "type": "SELECTION_BLOCK"
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