export let config = {
    language: {
        non_terminals: [
            {
                name: "program",
                alternate_rules: [
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "stmts"
                        }]
                    }
                ]
            },
            {
                name: "stmts",
                alternate_rules: [
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "stmt",
                        }],
                        infinite_repetitions: true
                    }
                ]
            },
            {
                name: "stmt",
                alternate_rules: [
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "if_stmt"
                        }]
                    },
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "if_else_stmt"
                        }]
                    },
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "while_stmt"
                        }]
                    },
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "for_stmt"
                        }]
                    },
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "assign_stmt"
                        }]
                    },
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "func_def_stmt"
                        }]
                    },
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "func_call_stmt"
                        }]
                    }
                ]
            },
            {
                name: "expr",
                alternate_rules: [
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "arith_expr"
                        }]
                    },
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "rel_expr"
                        }]
                    },
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "bool_expr"
                        }]
                    },
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "primary_expr"
                        }]
                    }
                ]
            },
            {
                name: "arith_expr",
                alternate_rules: [
                    {
                        symbols: [
                            {
                                type: "non_terminal",
                                name: "binary_arith_expr"
                            }
                        ]
                    },
                    {
                        symbols:[
                            {
                                type: "non_terminal",
                                name: "unary_minus"
                            }
                        ]
                    }
                ]
            },
            {
                name: "binary_arith_expr",
                alternate_rules: [
                    {
                        symbols: [
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
                    }
                ]
            },
            {
                name: "unary_minus",
                alternate_rules: [
                    {
                        symbols: [
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
                    }
                ]
            },
            {
                name: "arith_op",
                alternate_rules: [
                    {
                        symbols: [{
                            type: "terminal",
                            name: "PLUS",
                            alias: "+"
                        }]
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "MINUS",
                            alias: "-"
                        }]
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "TIMES",
                            alias: "*"
                        }]
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "BY",
                            alias: "/"
                        }]
                    },
                ]
            },
            {
                name: "rel_expr",
                alternate_rules: [
                    {
                        symbols: [
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
                    }
                ]
            },
            {
                name: "rel_op",
                alternate_rules: [
                    {
                        symbols: [{
                            type: "terminal",
                            name: "GREATER",
                            alias: ">"
                        }]
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "LESS",
                            alias: "<"
                        }]
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "EQUAL_TO",
                            alias: "=="
                        }]
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "NOT_EQUAL_TO",
                            alias: "!="
                        }]
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "GREATER_EQUAL",
                            alias: ">="
                        }]
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "LESS_EQUAL",
                            alias: "<="
                        }]
                    },
                ]
            },
            {
                name: "bool_expr",
                alternate_rules: [
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "binary_bool_expr"
                        }]
                    },
                    {
                        symbols: [{
                            type: "non_terminal",
                            name: "not_expr"
                        }]
                    }
                ]
            },
            {
                name: "binary_bool_expr",
                alternate_rules: [
                    {
                        symbols: [
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
                    }
                ]
            },
            {
                name: "bool_bin_op",
                alternate_rules: [
                    {
                        symbols: [{
                            type: "terminal",
                            name: "AND"
                        }]
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "OR"
                        }]
                    }
                ]
            },
            {
                name: "not_expr",
                alternate_rules: [
                    {
                        symbols: [
                            {
                                type: "terminal",
                                name: "NOT"
                            },
                            {
                                type: "non_terminal",
                                name: "expr"
                            }
                        ]
                    }
                ]
            },
            {
                name: "primary_expr",
                alternate_rules: [
                    {
                        symbols: [{
                            type: "terminal",
                            name: "IDENT"
                        }],
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "INT_CONST"
                        }],
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "FLOAT_CONST"
                        }],
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "CHAR_CONST"
                        }],
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "STRING_CONST"
                        }],
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "BOOL_CONST"
                        }]
                    }
                ]
            },
            {
                name: "assign_stmt",
                alternate_rules: [
                    {
                        symbols: [
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
                    }
                ]
            },
            {
                name: "func_def_stmt",
                alternate_rules: [
                    {
                        symbols: [
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
                    }
                ]
            },
            {
                name: "func_call_stmt",
                alternate_rules: [
                    {
                        symbols: [
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
                    }
                ]
            },
            {
                name: "if_stmt",
                alternate_rules: [
                    {
                        symbols: [
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
                    }
                ]
            },
            {
                name: "if_else_stmt",
                alternate_rules: [
                    {
                        symbols: [
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
                    }
                ]
            },
            {
                name: "while_stmt",
                alternate_rules: [
                    {
                        symbols: [
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
                    }
                ]
            },
            {
                name: "for_stmt",
                alternate_rules: [
                    {
                        symbols: [
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
                    }
                ]
            },
            {
                name: "ident_list",
                alternate_rules: [
                    {
                        symbols: [
                            {
                                type: "terminal",
                                name: "IDENT"
                            },
                        ],
                        infinite_repetitions: true
                    }
                ]
            },
            {
                name: "expr_list",
                alternate_rules: [
                    {
                        symbols: [
                            {
                                type: "non_terminal",
                                name: "expr",
                                alias: 'ARG'
                            },
                        ],
                        infinite_repetitions: true
                    }
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
                    type: "int",
                },
                {
                    name: "FLOAT_CONST",
                    type: "float",
                },
                {
                    name: "CHAR_CONST",
                    type: "char",
                },
                {
                    name: "STRING_CONST",
                    type: "string",
                },
                {
                    name: "BOOL_CONST",
                    type: "bool",
                },
                {
                    name: "IDENT",
                    type: "identifier"
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
        "tab": {
            'background-color': 'transparent',
            'width': '15px',
            'align-self': 'stretch'
        }
    },
};