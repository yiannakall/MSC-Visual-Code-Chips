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
                            name: "+"
                        }]
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "-"
                        }]
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "*"
                        }]
                    },
                    {
                        symbols: [{
                            type: "terminal",
                            name: "/"
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
                                name: "="
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
        keywords: [
            "NOT", "AND", "OR", "IF", "ELSE", "WHILE", "FOR"
        ],
        terminals: [
            {
                name: "+",
                type: "string",
                value: "+"
            },
            {
                name: "-",
                type: "string",
                value: "-"
            },
            {
                name: "*",
                type: "string",
                value: "*"
            },
            {
                name: "/",
                type: "string",
                value: "/"
            },
            {
                name: "INT_CONST",
                type: "const",
                value: "int"
            },
            {
                name: "FLOAT_CONST",
                type: "const",
                value: "float"
            },
            {
                name: "CHAR_CONST",
                type: "const",
                value: "char"
            },
            {
                name: "STRING_CONST",
                type: "const",
                value: "string"
            },
            {
                name: "BOOL_CONST",
                type: "const",
                value: "bool"
            },
            {
                name: "IDENT",
                type: "identifier"
            }
        ]
    },
    types: [
        'tab',
        'identifier',
        'keyword',
        'string',
        'number',
        'operator',
        'libfunc'
    ],
    styles: {
        tab: {
            'background-color': 'transparent',
            'width': '30px',
            'align-self': 'stretch',
        },
        keyword: {
            'background-color': '#4B69C6',
        },
        identifier: {
            'background-color': '#7A3E9D',
        },
        string: {
            'background-color': '#448C27',
        },
        number: {
            'background-color': '#B35D27',
        },
        operator: {
            'background-color': '#777777',
            'border': '2px solid black',
        },
        libfunc: {
            'background-color': '#AA3731',
        }
    },
    type2styles : {
        tab: ['tab'],
        keyword: ['keyword'],
        identifier: ['identifier'],
        string: ['string'],
        number: ['number'],
        operator: ['operator'],
        libfunc: ['libfunc']
    },
};