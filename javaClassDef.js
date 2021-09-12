export let config = {
    language: {
        definitions: [
            {
                name: "program",
                list_of: [
                    { type: "non_terminal", name: "TypeDeclaration", }
                ]
            },
            {
                name: "TypeDeclaration",
                all_of: [
                    { type: "non_terminal", name: "ClassDecl", },
                ]
            },
            {
                name: "ClassDecl",
                all_of: [
                    { type: "non_terminal", name: "OptionalModifiers", alias: "+ Modifiers", tooltip: "Define the access and the linkage of the class" },
                    { type: "terminal", name: "class" },
                    { type: "terminal", name: "id", tooltip: "The name of the class" },
                    { type: "non_terminal", name: "OptionalTypeParameters", alias: "+ TypeParams", tooltip: "Make the class generic"},
                    { type: "non_terminal", name: "OptionalExtendsType", alias: "+ extends", tooltip: "Derive from the base class using inheritance"},
                    { type: "non_terminal", name: "OptionalImplementsTypeList", alias: "+ implements", tooltip: "Implement an interface" },
                    { type: "non_terminal", name: "ClassBody", },
                ]
            },
            {
                name: "OptionalModifiers",
                optional: [
                    { type: "non_terminal", name: "Modifiers", },
                ]
            },
            {
                name: "OptionalTypeParameters",
                optional: [
                    { type: "non_terminal", name: "TypeParameters", },
                ]
            },
            {
                name: "OptionalExtendsType",
                optional: [
                    { type: "non_terminal", name: "ExtendsType", },
                ]
            },
            {
                name: "OptionalImplementsTypeList",
                optional: [
                    { type: "non_terminal", name: "ImplementsTypeList", },
                ]
            },
            {
                name: "ExtendsType",
                all_of: [
                    { type: "terminal", name: "extends", },
                    { type: "non_terminal", name: "WholeType", },
                ]
            },
            {
                name: "ImplementsTypeList",
                all_of: [
                    { type: "terminal", name: "implements", },
                    { type: "non_terminal", name: "TypeList", },
                ]
            },
            // ************************************************************************************************************

            {
                name: "WholeType",
                all_of: [
                    { type: "non_terminal", name: "Type", },
                    { type: "non_terminal", name: "Optional[]List", alias: "+ [ ]" },
                ]
            },
            {
                name: "Type",
                any_of: [
                    { type: "non_terminal", name: "BasicType", tooltip: "The primitive types available within the Java language"},
                    { type: "non_terminal", name: "ReferenceType", tooltip: "A data type that's based on a class" },
                ]
            },
            {
                name: "Optional[]List",
                optional: [
                    { type: "non_terminal", name: "[]List", },
                ]
            },
            {
                name: "[]List",
                list_of: [
                    { type: "terminal", name: "[ ]", },
                ]
            },
            {
                name: "BasicType",
                any_of: [
                    { type: "terminal", name: "byte", tooltip: "A byte in Java is 8 bits. Bytes can hold values from -128 to 127" },
                    { type: "terminal", name: "short", tooltip: "A short in Java is 16 bits. Shorts can hold values from -2^16 to 2^16 + 1" },
                    { type: "terminal", name: "char", tooltip: "A char in Java is used to store a single character" },
                    { type: "terminal", name: "int", tooltip: "The int data type in Java is a 32-bit integer. Ints can hold values from -2^16 to 2^16 + 1" },
                    { type: "terminal", name: "long", tooltip: "A long can hold a 64-bit signed two's complement integer" },
                    { type: "terminal", name: "float", tooltip: "A float is by default 32-bits and represents fractional numbers" },
                    { type: "terminal", name: "double", tooltip: "A float is by default 64-bits and represents fractional numbers" },
                    { type: "terminal", name: "boolean", tooltip: "A boolean is used to store only two possible values: either true or false" },
                ]
            },
            {
                name: "ReferenceType",
                all_of: [
                    { type: "terminal", name: "id", },
                    { type: "non_terminal", name: "OptionalTypeArguments", alias: "+ TypeArgs", },
                    { type: "non_terminal", name: "OptionalDotMember", alias: "+ Member"},
                ]
            },
            {
                name: "OptionalDotMember",
                optional: [
                    { type: "non_terminal", name: "DotMemberList" },
                ]
            },
            {
                name: "DotMemberList",
                list_of: [
                    { type: "non_terminal", name: "DotMember", },
                ]
            },
            {
                name: "DotMember",
                all_of: [
                    { type: "terminal", name: ".", },
                    { type: "terminal", name: "id", },
                    { type: "non_terminal", name: "OptionalTypeArguments", alias: "+ TypeArgs", },
                ]
            },
            {
                name: "OptionalTypeArguments",
                optional: [
                    { type: "non_terminal", name: "TypeArguments", },
                ]
            },
            {
                name: "TypeArguments",
                all_of: [
                    { type: "terminal", name: "<", },
                    { type: "non_terminal", name: "ListOfTypeArgument", },
                    { type: "terminal", name: ">", },
                ]
            },
            {
                name: "ListOfTypeArgument",
                list_of: [
                    { type: "non_terminal", name: "TypeArgument", },
                ]
            },
            {
                name: "TypeArgument",
                any_of: [
                    { type: "non_terminal", name: "ReferenceType", tooltip: "A data type that's based on a class" },
                    { type: "non_terminal", name: "WildcardType", tooltip: "A special kind of type argument that controls the type safety of the use of generic (parameterized) types"},
                ]
            },
            {
                name: "WildcardType",
                any_of: [
                    { type: "terminal", name: "?", tooltip: "Any object"},
                    { type: "non_terminal", name: "? extends ReferenceType", alias: "? extends T", tooltip: "Any object that derives from of T (includes T)"},
                    { type: "non_terminal", name: "? super ReferenceType", alias: "? super T", tooltip: "Any object that is a superclass of T (includes T)"},
                ]
            },
            {
                name: "? extends ReferenceType",
                all_of: [
                    { type: "terminal", name: "?", },
                    { type: "terminal", name: "extends", },
                    { type: "non_terminal", name: "ReferenceType", },
                ]
            },
            {
                name: "? super ReferenceType",
                all_of: [
                    { type: "terminal", name: "?", },
                    { type: "terminal", name: "super", },
                    { type: "non_terminal", name: "ReferenceType", },
                ]
            },

            // ************************************************************************************************************

            {
                name: "TypeList",
                list_of: [
                    { type: "non_terminal", name: "ReferenceType", },
                ]
            },
            {
                name: "TypeParameters",
                all_of: [
                    { type: "terminal", name: "<", },
                    { type: "non_terminal", name: "ListOfTypeParameter", },
                    { type: "terminal", name: ">", },
                ]
            },
            {
                name: "ListOfTypeParameter",
                list_of: [
                    { type: "non_terminal", name: "TypeParameter", },
                ]
            },
            {
                name: "TypeParameter",
                all_of: [
                    { type: "terminal", name: "id", },
                    { type: "non_terminal", name: "OptionalExtendsBound", alias: "+ extends", },
                ]
            },
            {
                name: "OptionalExtendsBound",
                optional: [
                    { type: "non_terminal", name: "ExtendsBound", },
                ]
            },
            {
                name: "ExtendsBound",
                all_of: [
                    { type: "terminal", name: "extends", },
                    { type: "non_terminal", name: "Bound", },
                ]
            },
            {
                name: "Bound",
                list_of: [
                    { type: "non_terminal", name: "ReferenceType", },
                ]
            },

            // ************************************************************************************************************

            {
                name: "Modifiers",
                all_of: [
                    { type: "non_terminal", name: "OptionalAccessModifier", alias: "+ AccessModifier" },
                    { type: "non_terminal", name: "OptionalLinkageModifier", alias: "+ LinkageModifier" },
                ]
            },
            {
                name: "OptionalAccessModifier",
                optional: [
                    { type: "non_terminal", name: "AccessModifier", },
                ]
            },
            {
                name: "OptionalLinkageModifier",
                optional: [
                    { type: "non_terminal", name: "LinkageModifier", },
                ]
            },
            {
                name: "AccessModifier",
                any_of: [
                    { type: "terminal", name: "public", tooltip: "Public members are visible to all other classes"},
                    { type: "terminal", name: "protected", tooltip: "Protected members are accessible in the same package and subclasses" },
                    { type: "terminal", name: "private", tooltip: "Private members are only accessible within the declared class" },
                ]
            },
            {
                name: "LinkageModifier",
                any_of: [
                    {   
                        type: "non_terminal",
                        name: "AbstractLinkage",
                        tooltip: `The abstract keyword is used for classes and methods.
                        An abstract class cannot be used to create objects (to access it, it must be inherited from another class).
                        An abstract method can only be used in an abstract class, and it does not have a body. The body is provided by the subclass (inherited from)
                        `
                    },
                    { type: "non_terminal", name: "NormalLinkage", tooltip: "Includes the static and native keywords"},
                ]
            },
            {
                name: "AbstractLinkage",
                any_of: [
                    { type: "terminal", name: "abstract", },
                ]
            },
            {
                name: "NormalLinkage",
                all_of: [
                    { type: "non_terminal", name: "OptionalStaticLinkage", alias: "+ static", tooltip: "Static methods/attributes can be accessed without creating an object of a class" },
                    { type: "non_terminal", name: "OptionalNativeLinkage", alias: "+ native", tooltip: "Applicable only for methods and indicates that the method is implemented in native code using JNI (Java Native Interface)" },
                ]
            },
            {
                name: "OptionalStaticLinkage",
                optional: [
                    { type: "terminal", name: "static", },
                ]
            },
            {
                name: "OptionalNativeLinkage",
                optional: [
                    { type: "terminal", name: "native", },
                ]
            },

            // ************************************************************************************************************

            {
                name: "ClassBody",
                list_of: [
                    { type: "non_terminal", name: "MemberDecl", },
                ]
            },
            {
                name: "MemberDecl",
                any_of: [
                    { type: "non_terminal", name: "FieldDecl", tooltip: "Declare a variable" },
                    { type: "non_terminal", name: "MethodDecl", tooltip: "Declare a method" },
                    { type: "non_terminal", name: "ConstructorDecl", tooltip: "Declare a constructor" },
                    { type: "non_terminal", name: "ClassDecl", tooltip: "Declare a class" },
                ]
            },
            {
                name: "ConstructorDecl",
                all_of: [
                    { type: "non_terminal", name: "OptionalModifiers", alias: "+ Modifiers", tooltip: "Define the access and the linkage of the constructor" },
                    { type: "terminal", name: "id", },
                    { type: "terminal", name: "("},
                    { type: "non_terminal", name: "FormalParameters", },
                    { type: "terminal", name: ")" },
                    { type: "terminal", name: "{" },
                    { type: "non_terminal", name: "Code", },
                    { type: "terminal", name: "}" },
                ]
            },
            {
                name: "MethodDecl",
                all_of: [
                    { type: "non_terminal", name: "OptionalModifiers", alias: "+ Modifiers", tooltip: "Define the access and the linkage of the method" },
                    { type: "non_terminal", name: "OptionalTypeParameters", alias: "+ TypeParams", tooltip: "Make the method generic" },
                    { type: "non_terminal", name: "ReturnType", },
                    { type: "terminal", name: "id", },
                    { type: "terminal", name: "("},
                    { type: "non_terminal", name: "FormalParameters", },
                    { type: "terminal", name: ")"},
                ]
            },
            {
                name: "FieldDecl",
                all_of: [
                    { type: "non_terminal", name: "OptionalModifiers", alias: "+ Modifiers", tooltip: "Define the access and the linkage of the member" },
                    { type: "non_terminal", name: "WholeType", },
                    { type: "non_terminal", name: "ListOfIds", },
                ]
            },
            {
                name: "ReturnType",
                any_of: [
                    { type: "non_terminal", name: "WholeType", alias: "NonVoid", tooltip: "The method returns a value", },
                    { type: "terminal", name: "void", tooltip: "Void methods do not return a value"},
                ]
            },

            // ************************************************************************************************************

            {
                name: "FormalParameters",
                all_of: [
                    { type: "non_terminal", name: "OptionalFormalParameterDecls", alias: "+ Args"},
                ]
            },
            {
                name: "OptionalFormalParameterDecls",
                optional: [
                    { type: "non_terminal", name: "FormalParameterDecls"},
                ]
            },
            {
                name: "FormalParameterDecls",
                list_of: [
                    { type: "non_terminal", name: "FormalParameterDecl", },
                ]
            },
            {
                name: "FormalParameterDecl",
                all_of: [
                    { type: "non_terminal", name: "OptionalFinal", alias: "+ final", tooltip: "Make the parameter non-changeable"},
                    { type: "non_terminal", name: "WholeType", },
                    { type: "terminal", name: "id", },
                ]
            },
            {
                name: "OptionalFinal",
                optional: [
                    { type: "terminal", name: "final", },
                ]
            },
            {
                name: "ListOfIds",
                list_of: [
                    { type: "terminal", name: "id", },
                ]
            },

            // ************************************************************************************************************

            {
                name: "Code",
                all_of: [
                    { type: "terminal", name: "code...", },
                ]
            }
        ],
        terminalTypes: [
            {
                name: "id",
                type: "identifier"
            }
        ]
    },
};

config.toolbox = [
    {
        "name": "Class",
        "icon": "./Images/Toolbox/class.svg",
        "blocks": [
            {
                "symbol": {
                    "symbol": {
                        "name": "ClassDecl",
                        "isTerminal": false
                    },
                    "tooltip": "Declare a class"
                },
                "elems": [
                    {
                        "symbol": {
                            "symbol": {
                                "name": "OptionalModifiers",
                                "isTerminal": false
                            },
                            "alias": "+ Modifiers",
                            "tooltip": "Define the access and the linkage of the class"
                        },
                        "newSymbol": {
                            "symbol": {
                                "name": "Modifiers",
                                "isTerminal": false
                            }
                        },
                        "type": "OptionalBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "class",
                                "isTerminal": true
                            }
                        },
                        "type": "SimpleBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "id",
                                "isTerminal": true
                            },
                            "tooltip": "The name of the class"
                        },
                        "type": "InputBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "OptionalTypeParameters",
                                "isTerminal": false
                            },
                            "alias": "+ TypeParams",
                            "tooltip": "Make the class generic"
                        },
                        "newSymbol": {
                            "symbol": {
                                "name": "TypeParameters",
                                "isTerminal": false
                            }
                        },
                        "type": "OptionalBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "OptionalExtendsType",
                                "isTerminal": false
                            },
                            "alias": "+ extends",
                            "tooltip": "Derive from the base class using inheritance"
                        },
                        "newSymbol": {
                            "symbol": {
                                "name": "ExtendsType",
                                "isTerminal": false
                            }
                        },
                        "type": "OptionalBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "OptionalImplementsTypeList",
                                "isTerminal": false
                            },
                            "alias": "+ implements",
                            "tooltip": "Implement an interface"
                        },
                        "newSymbol": {
                            "symbol": {
                                "name": "ImplementsTypeList",
                                "isTerminal": false
                            }
                        },
                        "type": "OptionalBlock"
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
                                "name": "ClassBody",
                                "isTerminal": false
                            }
                        },
                        "elems": [
                            {
                                "symbol": {
                                    "symbol": {
                                        "name": "MemberDecl",
                                        "isTerminal": false
                                    }
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "FieldDecl",
                                            "isTerminal": false
                                        },
                                        "tooltip": "Declare a variable"
                                    },
                                    {
                                        "symbol": {
                                            "name": "MethodDecl",
                                            "isTerminal": false
                                        },
                                        "tooltip": "Declare a method"
                                    },
                                    {
                                        "symbol": {
                                            "name": "ConstructorDecl",
                                            "isTerminal": false
                                        },
                                        "tooltip": "Declare a constructor"
                                    },
                                    {
                                        "symbol": {
                                            "name": "ClassDecl",
                                            "isTerminal": false
                                        },
                                        "tooltip": "Declare a class"
                                    }
                                ],
                                "type": "SelectionBlock"
                            }
                        ],
                        "repetitiveElem": {
                            "symbol": {
                                "symbol": {
                                    "name": "MemberDecl",
                                    "isTerminal": false
                                }
                            },
                            "alternateSymbols": [
                                {
                                    "symbol": {
                                        "name": "FieldDecl",
                                        "isTerminal": false
                                    },
                                    "tooltip": "Declare a variable"
                                },
                                {
                                    "symbol": {
                                        "name": "MethodDecl",
                                        "isTerminal": false
                                    },
                                    "tooltip": "Declare a method"
                                },
                                {
                                    "symbol": {
                                        "name": "ConstructorDecl",
                                        "isTerminal": false
                                    },
                                    "tooltip": "Declare a constructor"
                                },
                                {
                                    "symbol": {
                                        "name": "ClassDecl",
                                        "isTerminal": false
                                    },
                                    "tooltip": "Declare a class"
                                }
                            ],
                            "type": "SelectionBlock"
                        },
                        "type": "RepetitionGroup"
                    }
                ],
                "type": "Group",
                "generatedBy": {
                    "symbol": {
                        "symbol": {
                            "name": "MemberDecl",
                            "isTerminal": false
                        }
                    },
                    "alternateSymbols": [
                        {
                            "symbol": {
                                "name": "FieldDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a variable"
                        },
                        {
                            "symbol": {
                                "name": "MethodDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a method"
                        },
                        {
                            "symbol": {
                                "name": "ConstructorDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a constructor"
                        },
                        {
                            "symbol": {
                                "name": "ClassDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a class"
                        }
                    ],
                    "selectedSymbol": 3,
                    "type": "SelectionBlock"
                }
            }
        ]
    },
    {
        "name": "Field",
        "icon": "./Images/Toolbox/variable.svg",
        "blocks": [
            {
                "symbol": {
                    "symbol": {
                        "name": "FieldDecl",
                        "isTerminal": false
                    },
                    "tooltip": "Declare a variable"
                },
                "elems": [
                    {
                        "symbol": {
                            "symbol": {
                                "name": "OptionalModifiers",
                                "isTerminal": false
                            },
                            "alias": "+ Modifiers",
                            "tooltip": "Define the access and the linkage of the member"
                        },
                        "newSymbol": {
                            "symbol": {
                                "name": "Modifiers",
                                "isTerminal": false
                            }
                        },
                        "type": "OptionalBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "WholeType",
                                "isTerminal": false
                            }
                        },
                        "elems": [
                            {
                                "symbol": {
                                    "symbol": {
                                        "name": "Type",
                                        "isTerminal": false
                                    }
                                },
                                "alternateSymbols": [
                                    {
                                        "symbol": {
                                            "name": "BasicType",
                                            "isTerminal": false
                                        },
                                        "tooltip": "The primitive types available within the Java language"
                                    },
                                    {
                                        "symbol": {
                                            "name": "ReferenceType",
                                            "isTerminal": false
                                        },
                                        "tooltip": "A data type that's based on a class"
                                    }
                                ],
                                "type": "SelectionBlock"
                            },
                            {
                                "symbol": {
                                    "symbol": {
                                        "name": "Optional[]List",
                                        "isTerminal": false
                                    },
                                    "alias": "+ [ ]"
                                },
                                "newSymbol": {
                                    "symbol": {
                                        "name": "[]List",
                                        "isTerminal": false
                                    }
                                },
                                "type": "OptionalBlock"
                            }
                        ],
                        "type": "Group"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "ListOfIds",
                                "isTerminal": false
                            }
                        },
                        "elems": [
                            {
                                "symbol": {
                                    "symbol": {
                                        "name": "id",
                                        "isTerminal": true
                                    }
                                },
                                "type": "InputBlock"
                            }
                        ],
                        "repetitiveElem": {
                            "symbol": {
                                "symbol": {
                                    "name": "id",
                                    "isTerminal": true
                                }
                            },
                            "type": "InputBlock"
                        },
                        "type": "RepetitionGroup"
                    }
                ],
                "type": "Group",
                "generatedBy": {
                    "symbol": {
                        "symbol": {
                            "name": "MemberDecl",
                            "isTerminal": false
                        }
                    },
                    "alternateSymbols": [
                        {
                            "symbol": {
                                "name": "FieldDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a variable"
                        },
                        {
                            "symbol": {
                                "name": "MethodDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a method"
                        },
                        {
                            "symbol": {
                                "name": "ConstructorDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a constructor"
                        },
                        {
                            "symbol": {
                                "name": "ClassDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a class"
                        }
                    ],
                    "selectedSymbol": 0,
                    "type": "SelectionBlock"
                }
            }
        ]
    },
    {
        "name": "Method",
        "icon": "./Images/Toolbox/function.svg",
        "blocks": [
            {
                "symbol": {
                    "symbol": {
                        "name": "MethodDecl",
                        "isTerminal": false
                    },
                    "tooltip": "Declare a method"
                },
                "elems": [
                    {
                        "symbol": {
                            "symbol": {
                                "name": "OptionalModifiers",
                                "isTerminal": false
                            },
                            "alias": "+ Modifiers",
                            "tooltip": "Define the access and the linkage of the method"
                        },
                        "newSymbol": {
                            "symbol": {
                                "name": "Modifiers",
                                "isTerminal": false
                            }
                        },
                        "type": "OptionalBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "OptionalTypeParameters",
                                "isTerminal": false
                            },
                            "alias": "+ TypeParams",
                            "tooltip": "Make the method generic"
                        },
                        "newSymbol": {
                            "symbol": {
                                "name": "TypeParameters",
                                "isTerminal": false
                            }
                        },
                        "type": "OptionalBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "ReturnType",
                                "isTerminal": false
                            }
                        },
                        "alternateSymbols": [
                            {
                                "symbol": {
                                    "name": "WholeType",
                                    "isTerminal": false
                                },
                                "alias": "NonVoid",
                                "tooltip": "The method returns a value"
                            },
                            {
                                "symbol": {
                                    "name": "void",
                                    "isTerminal": true
                                },
                                "tooltip": "Void methods do not return a value"
                            }
                        ],
                        "type": "SelectionBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "id",
                                "isTerminal": true
                            }
                        },
                        "type": "InputBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "(",
                                "isTerminal": true
                            }
                        },
                        "type": "SimpleBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "OptionalFormalParameterDecls",
                                "isTerminal": false
                            },
                            "alias": "+ Args"
                        },
                        "newSymbol": {
                            "symbol": {
                                "name": "FormalParameterDecls",
                                "isTerminal": false
                            }
                        },
                        "type": "OptionalBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": ")",
                                "isTerminal": true
                            }
                        },
                        "type": "SimpleBlock"
                    }
                ],
                "type": "Group",
                "generatedBy": {
                    "symbol": {
                        "symbol": {
                            "name": "MemberDecl",
                            "isTerminal": false
                        }
                    },
                    "alternateSymbols": [
                        {
                            "symbol": {
                                "name": "FieldDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a variable"
                        },
                        {
                            "symbol": {
                                "name": "MethodDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a method"
                        },
                        {
                            "symbol": {
                                "name": "ConstructorDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a constructor"
                        },
                        {
                            "symbol": {
                                "name": "ClassDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a class"
                        }
                    ],
                    "selectedSymbol": 1,
                    "type": "SelectionBlock"
                }
            }
        ]
    },
    {
        "name": "Constructor",
        "icon": "./Images/Toolbox/constructor.svg",
        "blocks": [
            {
                "symbol": {
                    "symbol": {
                        "name": "ConstructorDecl",
                        "isTerminal": false
                    },
                    "tooltip": "Declare a constructor"
                },
                "elems": [
                    {
                        "symbol": {
                            "symbol": {
                                "name": "OptionalModifiers",
                                "isTerminal": false
                            },
                            "alias": "+ Modifiers",
                            "tooltip": "Define the access and the linkage of the constructor"
                        },
                        "newSymbol": {
                            "symbol": {
                                "name": "Modifiers",
                                "isTerminal": false
                            }
                        },
                        "type": "OptionalBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "id",
                                "isTerminal": true
                            }
                        },
                        "type": "InputBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "(",
                                "isTerminal": true
                            }
                        },
                        "type": "SimpleBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "OptionalFormalParameterDecls",
                                "isTerminal": false
                            },
                            "alias": "+ Args"
                        },
                        "newSymbol": {
                            "symbol": {
                                "name": "FormalParameterDecls",
                                "isTerminal": false
                            }
                        },
                        "type": "OptionalBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": ")",
                                "isTerminal": true
                            }
                        },
                        "type": "SimpleBlock"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "{",
                                "isTerminal": true
                            }
                        },
                        "type": "SimpleBlock"
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
                                "name": "code...",
                                "isTerminal": true
                            }
                        },
                        "type": "SimpleBlock"
                    },
                    {
                        "type": "NewLine"
                    },
                    {
                        "symbol": {
                            "symbol": {
                                "name": "}",
                                "isTerminal": true
                            }
                        },
                        "type": "SimpleBlock"
                    }
                ],
                "type": "Group",
                "generatedBy": {
                    "symbol": {
                        "symbol": {
                            "name": "MemberDecl",
                            "isTerminal": false
                        }
                    },
                    "alternateSymbols": [
                        {
                            "symbol": {
                                "name": "FieldDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a variable"
                        },
                        {
                            "symbol": {
                                "name": "MethodDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a method"
                        },
                        {
                            "symbol": {
                                "name": "ConstructorDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a constructor"
                        },
                        {
                            "symbol": {
                                "name": "ClassDecl",
                                "isTerminal": false
                            },
                            "tooltip": "Declare a class"
                        }
                    ],
                    "selectedSymbol": 2,
                    "type": "SelectionBlock"
                }
            }
        ]
    }
];

config.darkTheme = {
    "Blocks": {
        "General": {
            "Group": {
                "Group Block": {
                    "BackgroundColor": "#1e1e1e",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "BorderWidth": "2px",
                    "BorderColor": "#37373D",
                    "BorderRadius": "10px"
                }
            },
            "RepetitionGroup": {
                "Group Block": {
                    "BackgroundColor": "#1e1e1e",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "BorderWidth": "2px",
                    "BorderColor": "#37373D",
                    "BorderRadius": "10px"
                },
                "Button": {
                    "BackgroundColor": "#0E639C",
                    "PaddingLeft": "6px",
                    "PaddingRight": "6px",
                    "PaddingTop": "6px",
                    "PaddingBottom": "6px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent"
                },
                "Button Plus Sign": {
                    "Width": "12px",
                    "Height": "12px",
                    "BackgroundColor": "#f2f2f2"
                },
                "Button Tooltip": {
                    "FontSize": "14px",
                    "FontColor": "#eeeeee",
                    "BackgroundColor": "#004A78"
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
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "4px",
                    "PaddingRight": "4px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "FontColor": "#E5ECF0",
                    "FontSize": "14px",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "2px",
                    "BorderColor": "transparent",
                    "BorderRadius": "10px"
                }
            },
            "InputBlock": {
                "Input Container": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "BorderWidth": "2px",
                    "BorderColor": "#37373D",
                    "BorderRadius": "10px"
                },
                "Input": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "FontColor": "#ffffff",
                    "FontSize": "14px",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                }
            },
            "SelectionBlock": {
                "Selection Block": {
                    "BackgroundColor": "#37373D",
                    "PaddingLeft": "2px",
                    "PaddingRight": "2px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "FontSize": "14px",
                    "FontColor": "#E5ECF0",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": true,
                    "Gap": "20px",
                    "BorderWidth": "2px",
                    "BorderColor": "transparent",
                    "BorderRadius": "10px"
                },
                "Arrow": {
                    "BackgroundColor": "#ffffff",
                    "Width": "8px",
                    "Height": "8px"
                },
                "Option Container": {
                    "BackgroundColor": "#252526",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px"
                },
                "Option": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "5px",
                    "PaddingRight": "5px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "FontSize": "14px",
                    "FontColor": "#C2C2C2"
                },
                "Option On Hover": {
                    "BackgroundColor": "#094771",
                    "FontColor": "#E5ECF0"
                },
                "Option Tooltip": {
                    "FontSize": "14px",
                    "FontColor": "#eeeeee",
                    "BackgroundColor": "#004A78"
                }
            },
            "OptionalBlock": {
                "Optional Block": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "2px",
                    "PaddingRight": "2px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "FontColor": "#5D6061",
                    "FontSize": "12px",
                    "FontIsUnderlined": true,
                    "FontIsBold": "",
                    "FontIsItalic": true,
                    "BorderWidth": "2px",
                    "BorderColor": "transparent",
                    "BorderRadius": "10px",
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "#90caf9",
                    "BorderColor": ""
                }
            }
        },
        "Specific": {
            "class": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "id": {
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
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": ""
                }
            },
            "extends": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "implements": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "[ ]": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "byte": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "short": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "char": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "int": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "long": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "float": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "double": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "boolean": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            ".": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "<": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            ">": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "?": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "super": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "public": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "protected": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "private": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "abstract": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "static": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "native": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "(": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            ")": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "void": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "final": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#C57991",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "{": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "}": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "program": {
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
            "ClassDecl": {
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
            "ClassBody": {
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
            "Modifiers": {
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
            "OptionalModifiers": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "OptionalTypeParameters": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "OptionalExtendsType": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "OptionalImplementsTypeList": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "TypeParameters": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "ExtendsType": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "ImplementsTypeList": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "WholeType": {
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
            "TypeList": {
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
            "Type": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "Optional[]List": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "BasicType": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "ReferenceType": {
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
            "[]List": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
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
            "OptionalTypeArguments": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "OptionalDotMember": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "DotMemberList": {
                "Group Block": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
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
            "DotMember": {
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
            "TypeArguments": {
                "Group Block": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "ListOfTypeArgument": {
                "Group Block": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
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
            "TypeArgument": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "WildcardType": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "? extends ReferenceType": {
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
            "? super ReferenceType": {
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
            "ListOfTypeParameter": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
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
            "TypeParameter": {
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
            "OptionalExtendsBound": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "ExtendsBound": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "Bound": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
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
            "OptionalAccessModifier": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "OptionalLinkageModifier": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "AccessModifier": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "LinkageModifier": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "NormalLinkage": {
                "Group Block": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "OptionalStaticLinkage": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "OptionalNativeLinkage": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "MemberDecl": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "MethodDecl": {
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
            "FieldDecl": {
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
            "ConstructorDecl": {
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
            "Block": {
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
            "ReturnType": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "ListOfIds": {
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
            "OptionalFormalParameterDecls": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "FormalParameterDecls": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
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
            "FormalParameterDecl": {
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
            "OptionalFinal": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
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
            "BackgroundColor": "transparent",
            "BorderWidth": "0px",
            "BorderColor": "transparent"
        },
        "Selected Block": {
            "BorderColor": "#fc3",
            "BorderShadow": "0px #fc3",
            "BorderWidth": "2px"
        },
    },
    "Toolbox": {
        "Toolbox Menu": {
            "BackgroundColor": "#333333",
            "PaddingLeft": "10px",
            "PaddingRight": "10px",
            "PaddingTop": "20px",
            "PaddingBottom": "20px"
        },
        "Toolbox Menu Icon": {
            "BackgroundColor": "#DADADA",
            "Width": "22px",
            "Height": "22px"
        },
        "Toolbox Menu Selected Icon": {
            "BackgroundColor": "#FFFFFF"
        },
        "Toolbox Menu Label": {
            "FontColor": "#DADADA",
            "FontSize": "14px"
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
            "FontSize": "18px",
            "FontColor": "#DADADA"
        },
        "Block Category On Drop Hover": {
            "BackgroundColor": "#6CB097"
        },
        "Block Category On Drop Placeholder": {
            "BackgroundColor": "green"
        },
        "Block Delete Button Container": {
            "BackgroundColor": "#094771"
        },
        "Block Delete Button X": {
            "BackgroundColor": "#C4C4C4"
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
            "BackgroundColor": "transparent",
            "BorderWidth": "0px",
            "BorderColor": "transparent"
        }
    },
    "Undo Redo Toolbar": {
        "Undo Button": {
            "BackgroundColor": "#252526",
            "FontColor": "#C4C4C4",
            "FontSize": "14px"
        },
        "Undo Button On Hover": {
            "BackgroundColor": "#333333",
            "FontColor": "#ffffff",
            "FontSize": "14px"
        },
        "Undo Icon": {
            "BackgroundColor": "#75BEFF"
        },
        "Undo Number Notification": {
            "BackgroundColor": "#FA3E3E"
        },
        "Separator": {
            "BackgroundColor": "#333333",
            "Width": "1px"
        },
        "Close Button": {
            "BackgroundColor": "#094771"
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
            "BackgroundColor": "#252526",
            "BorderWidth": "0px",
            "BorderColor": "transparent",
            "BorderRadius": "0px",
            "PaddingLeft": "0px",
            "PaddingRight": "0px",
            "PaddingTop": "5px",
            "PaddingBottom": "5px"
        },
        "Option": {
            "BackgroundColor": "transparent",
            "PaddingLeft": "20px",
            "PaddingRight": "20px",
            "PaddingTop": "5px",
            "PaddingBottom": "5px"
        },
        "Option On Hover": {
            "BackgroundColor": "#094771"
        },
        "Option Text": {
            "FontColor": "#d1d1d1"
        },
        "Option Text On Hover": {
            "FontColor": "#ffffff"
        },
        "Shortcut text": {
            "FontColor": "#a1a1a1"
        },
        "Shortcut text On Hover": {
            "FontColor": "#ffffff"
        },
        "Inner Option Arrow": {
            "BackgroundColor": "#a1a1a1"
        },
        "Inner Option Arrow On Hover": {
            "BackgroundColor": "#ffffff"
        },
        "Separator": {
            "BackgroundColor": "#303031"
        }
    },
    "Source Text View Colors": {
        "class": "#C57991",
        "id": "#ffffff",
        "extends": "#C57991",
        "implements": "#C57991",
        "[ ]": "#ffffff",
        "byte": "#C57991",
        "short": "#C57991",
        "char": "#C57991",
        "int": "#C57991",
        "long": "#C57991",
        "float": "#C57991",
        "double": "#C57991",
        "boolean": "#C57991",
        ".": "#ffffff",
        "<": "#ffffff",
        ">": "#ffffff",
        "?": "#ffffff",
        "super": "#C57991",
        "public": "#C57991",
        "protected": "#C57991",
        "private": "#C57991",
        "abstract": "#C57991",
        "static": "#C57991",
        "native": "#C57991",
        "(": "#ffffff",
        ")": "#ffffff",
        "{": "#ffffff",
        "}": "#ffffff",
        "void": "#C57991",
        "final": "#C57991",
        "code...": "#ffffff",
        "Type": "#ffffff",
        "BasicType": "#ffffff",
        "TypeArgument": "#ffffff",
        "WildcardType": "#ffffff",
        "AccessModifier": "#ffffff",
        "LinkageModifier": "#ffffff",
        "MemberDecl": "#ffffff",
        "ReturnType": "#ffffff",
        "&": "#ffffff",
        ",": "#ffffff",
        ";": "#ffffff",
    },
    "Pretty Print": {
        "program": { "NewLine Between Blocks": true },
        "ClassDecl": [ "+ Modifiers", "class", "id", "+ TypeParams", "+ extends", "+ implements", "$$_newline", "$$_tab", "ClassBody" ],
        "ClassBody": { "NewLine Between Blocks": true },
        "TypeList": { "NewLine Between Blocks": false },
        "[]List": { "NewLine Between Blocks": false },
        "DotMemberList": { "NewLine Between Blocks": false },
        "ListOfTypeArgument": { "NewLine Between Blocks": false },
        "ListOfTypeParameter": { "NewLine Between Blocks": false },
        "Bound": { "NewLine Between Blocks": false },
        "ConstructorDecl": [ "+ Modifiers", "id", "(", "FormalParameters", ")", "{", "$$_newline", "$$_tab", "Code", "$$_newline", "}", ],
        "ListOfIds": { "NewLine Between Blocks": false },
        "FormalParameterDecls": { "NewLine Between Blocks": false },
    },
    "Source Text Pretty Print": {
        "program": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_newline"], "Insert After Last Block": []
        },
        "ClassDecl": [ 
            "+ Modifiers", "class", "id", "+ TypeParams", "+ extends", "+ implements", "$$_{", "$$_newline", 
            "$$_tab", "ClassBody", "$$_newline", "$$_}" 
        ],
        "ClassBody": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_newline"], "Insert After Last Block": []
        },
        "TypeList": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_,"], "Insert After Last Block": []
        },
        "ListOfTypeArgument": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_,"], "Insert After Last Block": []
        },
        "ListOfTypeParameter": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_,"], "Insert After Last Block": []
        },
        "Bound": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_&"], "Insert After Last Block": []
        },
        "MethodDecl": [ "+ Modifiers", "+ TypeParams", "ReturnType", "id", "(", "FormalParameters", ")", "$$_;" ],
        "FieldDecl": [ "+ Modifiers", "WholeType", "ListOfIds", "$$_;" ],
        "ListOfIds": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_,"], "Insert After Last Block": []
        },
        "FormalParameterDecls": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_,"], "Insert After Last Block": []
        },
    }
};

config.lightTheme = {
    "Blocks": {
        "General": {
            "Group": {
                "Group Block": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "BorderWidth": "2px",
                    "BorderColor": "#c2c2c2",
                    "BorderRadius": "10px"
                }
            },
            "RepetitionGroup": {
                "Group Block": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "10px",
                    "PaddingRight": "10px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "BorderWidth": "2px",
                    "BorderColor": "#c2c2c2",
                    "BorderRadius": "10px"
                },
                "Button": {
                    "BackgroundColor": "#1A506F",
                    "PaddingLeft": "8px",
                    "PaddingRight": "8px",
                    "PaddingTop": "8px",
                    "PaddingBottom": "8px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent"
                },
                "Button Plus Sign": {
                    "Width": "12px",
                    "Height": "12px",
                    "BackgroundColor": ""
                },
                "Button Tooltip": {
                    "FontSize": "14px",
                    "FontColor": "#eeeeee",
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
                    "PaddingLeft": "4px",
                    "PaddingRight": "4px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "FontColor": "black",
                    "FontSize": "14px",
                    "BorderWidth": "2px",
                    "BorderColor": "transparent",
                    "BorderRadius": "10px"
                }
            },
            "InputBlock": {
                "Input Container": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "BorderWidth": "2px",
                    "BorderColor": "#c2c2c2",
                    "BorderRadius": "10px"
                },
                "Input": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "FontColor": "#000000",
                    "FontSize": "14px"
                }
            },
            "SelectionBlock": {
                "Selection Block": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "2px",
                    "PaddingRight": "2px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "FontSize": "14px",
                    "FontColor": "#000000",
                    "Gap": "20px",
                    "BorderWidth": "2px",
                    "BorderColor": "#c2c2c2",
                    "BorderRadius": "10px"
                },
                "Arrow": {
                    "BackgroundColor": "#000000",
                    "Width": "8px",
                    "Height": "8px"
                },
                "Option Container": {
                    "BackgroundColor": "#FAFAFA",
                    "PaddingLeft": "0",
                    "PaddingRight": "0",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px"
                },
                "Option": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "20px",
                    "PaddingRight": "20px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "FontSize": "14px",
                    "FontColor": "#000000"
                },
                "Option On Hover": {
                    "BackgroundColor": "#1A506F",
                    "FontColor": "#FFFFFF"
                },
                "Option Tooltip": {
                    "FontSize": "14px",
                    "FontColor": "#eeeeee",
                    "BackgroundColor": "#1A506F"
                }
            },
            "OptionalBlock": {
                "Optional Block": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "2px",
                    "PaddingRight": "2px",
                    "PaddingTop": "5px",
                    "PaddingBottom": "5px",
                    "FontColor": "#5D6061",
                    "FontSize": "12px",
                    "BorderWidth": "2px",
                    "BorderColor": "transparent",
                    "BorderRadius": "10px",
                    "FontIsUnderlined": true,
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "#90caf9",
                    "BorderColor": ""
                }
            }
        },
        "Specific": {
            "class": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "id": {
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
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": ""
                }
            },
            "extends": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "implements": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "[ ]": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "byte": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "short": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "char": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "int": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "long": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "float": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "double": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "boolean": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            ".": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "<": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            ">": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "?": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "super": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "public": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "protected": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "private": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "abstract": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "static": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "native": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "(": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            ")": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "void": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "final": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "#0000FF",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": true,
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "{": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "}": {
                "Simple Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsItalic": "",
                    "FontIsBold": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                }
            },
            "program": {
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
            "ClassDecl": {
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
            "ClassBody": {
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
            "Modifiers": {
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
            "OptionalModifiers": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "OptionalTypeParameters": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "OptionalExtendsType": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "OptionalImplementsTypeList": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "TypeParameters": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "ExtendsType": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "ImplementsTypeList": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "WholeType": {
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
            "TypeList": {
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
            "Type": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "Optional[]List": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "BasicType": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "ReferenceType": {
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
            "[]List": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
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
            "OptionalTypeArguments": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "OptionalDotMember": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "DotMemberList": {
                "Group Block": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
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
            "DotMember": {
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
            "TypeArguments": {
                "Group Block": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "ListOfTypeArgument": {
                "Group Block": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
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
            "TypeArgument": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "WildcardType": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "? extends ReferenceType": {
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
            "? super ReferenceType": {
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
            "ListOfTypeParameter": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
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
            "TypeParameter": {
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
            "OptionalExtendsBound": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "ExtendsBound": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "Bound": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
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
            "OptionalAccessModifier": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "OptionalLinkageModifier": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "AccessModifier": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "LinkageModifier": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "NormalLinkage": {
                "Group Block": {
                    "BackgroundColor": "transparent",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
                    "BorderRadius": ""
                }
            },
            "OptionalStaticLinkage": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "OptionalNativeLinkage": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "MemberDecl": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "MethodDecl": {
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
            "FieldDecl": {
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
            "ConstructorDecl": {
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
            "Block": {
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
            "ReturnType": {
                "Selection Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontSize": "",
                    "FontColor": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
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
            "ListOfIds": {
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
            "OptionalFormalParameterDecls": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
                }
            },
            "FormalParameterDecls": {
                "Group Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "0px",
                    "PaddingRight": "0px",
                    "PaddingTop": "0px",
                    "PaddingBottom": "0px",
                    "BorderWidth": "0px",
                    "BorderColor": "transparent",
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
            "FormalParameterDecl": {
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
            "OptionalFinal": {
                "Optional Block": {
                    "BackgroundColor": "",
                    "PaddingLeft": "",
                    "PaddingRight": "",
                    "PaddingTop": "",
                    "PaddingBottom": "",
                    "FontColor": "",
                    "FontSize": "",
                    "FontIsUnderlined": "",
                    "FontIsBold": "",
                    "FontIsItalic": "",
                    "BorderWidth": "",
                    "BorderColor": "",
                    "BorderRadius": ""
                },
                "Optional Block On Hover": {
                    "BackgroundColor": "",
                    "FontColor": "",
                    "BorderColor": ""
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
            "PaddingLeft": "10px",
            "PaddingRight": "10px",
            "PaddingTop": "20px",
            "PaddingBottom": "20px"
        },
        "Toolbox Menu Icon": {
            "BackgroundColor": "#DADADA",
            "Width": "22px",
            "Height": "22px"
        },
        "Toolbox Menu Selected Icon": {
            "BackgroundColor": "#FFFFFF"
        },
        "Toolbox Menu Label": {
            "FontColor": "#DADADA",
            "FontSize": "14px"
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
            "FontSize": "18px",
            "FontColor": "#2B2B2B"
        },
        "Block Category On Drop Hover": {
            "BackgroundColor": "#6CB097"
        },
        "Block Category On Drop Placeholder": {
            "BackgroundColor": "green"
        },
        "Block Delete Button Container": {
            "BackgroundColor": "#094771"
        },
        "Block Delete Button X": {
            "BackgroundColor": "#C4C4C4"
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
            "BackgroundColor": "transparent",
            "BorderWidth": "1px",
            "BorderColor": "#c2c2c2"
        }
    },
    "Undo Redo Toolbar": {
        "Undo Button": {
            "BackgroundColor": "#ECECEC",
            "FontColor": "black",
            "FontSize": "14px"
        },
        "Undo Button On Hover": {
            "BackgroundColor": "#F3F3F3",
            "FontColor": "black",
            "FontSize": "14px"
        },
        "Undo Icon": {
            "BackgroundColor": "#1A506F"
        },
        "Undo Number Notification": {
            "BackgroundColor": "#FA3E3E"
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
            "BorderWidth": "0px",
            "BorderColor": "transparent",
            "BorderRadius": "0px",
            "PaddingLeft": "0px",
            "PaddingRight": "0px",
            "PaddingTop": "5px",
            "PaddingBottom": "5px"
        },
        "Option": {
            "BackgroundColor": "transparent",
            "PaddingLeft": "20px",
            "PaddingRight": "20px",
            "PaddingTop": "5px",
            "PaddingBottom": "5px"
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
        "Inner Option Arrow": {
            "BackgroundColor": "#6C6C6C"
        },
        "Inner Option Arrow On Hover": {
            "BackgroundColor": "#ffffff"
        },
        "Separator": {
            "BackgroundColor": "#C2C2C2"
        }
    },
    "Source Text View Colors": {
        "class": "#0000FF",
        "id": "#000000",
        "extends": "#0000FF",
        "implements": "#0000FF",
        "[ ]": "#000000",
        "byte": "#0000FF",
        "short": "#0000FF",
        "char": "#0000FF",
        "int": "#0000FF",
        "long": "#0000FF",
        "float": "#0000FF",
        "double": "#0000FF",
        "boolean": "#0000FF",
        ".": "#000000",
        "<": "#000000",
        ">": "#000000",
        "?": "#000000",
        "super": "#0000FF",
        "public": "#0000FF",
        "protected": "#0000FF",
        "private": "#0000FF",
        "abstract": "#0000FF",
        "static": "#0000FF",
        "native": "#0000FF",
        "(": "#000000",
        ")": "#000000",
        "{": "#000000",
        "}": "#000000",
        "void": "#0000FF",
        "final": "#0000FF",
        "code...": "#000000",
        "Type": "#000000",
        "BasicType": "#000000",
        "TypeArgument": "#000000",
        "WildcardType": "#000000",
        "AccessModifier": "#000000",
        "LinkageModifier": "#000000",
        "MemberDecl": "#000000",
        "ReturnType": "#000000",
        "&": "#000000",
        ",": "#000000",
        ";": "#000000",
    },
    "Pretty Print": {
        "program": { "NewLine Between Blocks": true },
        "ClassDecl": [ "+ Modifiers", "class", "id", "+ TypeParams", "+ extends", "+ implements", "$$_newline", "$$_tab", "ClassBody" ],
        "ClassBody": { "NewLine Between Blocks": true },
        "TypeList": { "NewLine Between Blocks": false },
        "[]List": { "NewLine Between Blocks": false },
        "DotMemberList": { "NewLine Between Blocks": false },
        "ListOfTypeArgument": { "NewLine Between Blocks": false },
        "ListOfTypeParameter": { "NewLine Between Blocks": false },
        "Bound": { "NewLine Between Blocks": false },
        "ConstructorDecl": [ "+ Modifiers", "id", "(", "FormalParameters", ")", "{", "$$_newline", "$$_tab", "Code", "$$_newline", "}", ],
        "ListOfIds": { "NewLine Between Blocks": false },
        "FormalParameterDecls": { "NewLine Between Blocks": false },
    },
    "Source Text Pretty Print": {
        "program": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_newline"], "Insert After Last Block": []
        },
        "ClassDecl": [ 
            "+ Modifiers", "class", "id", "+ TypeParams", "+ extends", "+ implements", "$$_{", "$$_newline", 
            "$$_tab", "ClassBody", "$$_newline", "$$_}" 
        ],
        "ClassBody": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_newline"], "Insert After Last Block": []
        },
        "TypeList": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_,"], "Insert After Last Block": []
        },
        "ListOfTypeArgument": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_,"], "Insert After Last Block": []
        },
        "ListOfTypeParameter": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_,"], "Insert After Last Block": []
        },
        "Bound": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_&"], "Insert After Last Block": []
        },
        "MethodDecl": [ "+ Modifiers", "+ TypeParams", "ReturnType", "id", "(", "FormalParameters", ")", "$$_;" ],
        "FieldDecl": [ "+ Modifiers", "WholeType", "ListOfIds", "$$_;" ],
        "ListOfIds": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_,"], "Insert After Last Block": []
        },
        "FormalParameterDecls": {
            "Insert When Empty": [], "Insert Before First Block": [],
            "Insert Between Blocks": ["$$_,"], "Insert After Last Block": []
        },
    }
};