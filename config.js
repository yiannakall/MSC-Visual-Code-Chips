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
                            name: "unary_bool_expr"
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
                name: "unary_bool_expr",
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
        "bool_expr" : {

        },
        "primary_expr" : {

        },
        "arith_op" : {

        },
        "binary_bool_expr" : {

        },
        "unary_bool_expr" : {

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
        "tab": {
            'background-color': 'transparent',
            'width': '15px',
            'align-self': 'stretch'
        }
    },
};