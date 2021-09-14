%start program

%{
    const { MParser } = require('../src/MParser.js');
    let MP = new MParser();
%}

%%

program             : defs                                          { $$ = MP.ParseProgram($defs); }
;

defs                : tokendef defs                                 { $$ = $defs; }
                    | def defs                                      { $$ = MP.ParseDefs($def, $defs); }
                    | EOF                                           { $$ = MP.ParseDefs(); }
;

tokendef            : item_type id                                  { MP.ParseTokenDef($item_type, [$id]); }
                    | item_type '{' ids '}'                         { MP.ParseTokenDef($item_type, $ids); }
;

def                 : DEFINE id '{' ALL_OF '{' items '}' '}'        { $$ = MP.ParseDef($id, $ALL_OF, $items); }
                    | DEFINE id '{' items '}'                       { $$ = MP.ParseDef($id, "all_of", $items); }
                    | DEFINE id '{' ANY_OF '{' items '}' '}'        { $$ = MP.ParseDef($id, $ANY_OF, $items); }
                    | DEFINE id '{' LIST_OF '{' item '}' '}'        { $$ = MP.ParseDef($id, $LIST_OF, $item); }
                    | DEFINE id '{' LIST_OF item '}'                { $$ = MP.ParseDef($id, $LIST_OF, $item); }
                    | DEFINE id '{' OPTIONAL '{' item '}' '}'       { $$ = MP.ParseDef($id, $OPTIONAL, $item); }
                    | DEFINE id '{' OPTIONAL item '}'               { $$ = MP.ParseDef($id, $OPTIONAL, $item); }
;

id                  : SIMPLE_ID
                    | QUOTED_ID                                     { $$ = MP.ParseQuotedId($QUOTED_ID); }
;

predefined_id       : IDENT
                    | INT_CONST
                    | FLOAT_CONST
                    | CHAR_CONST
                    | STRING_CONST
                    | BOOL_CONST
;

ids                 : id opt_ids                                    { $$ = MP.ParseIds($id, $opt_ids); }
;

opt_ids             : id opt_ids                                    { $$ = MP.ParseOptIds($id, $opt_ids); }
                    | /* empty */                                   { $$ = MP.ParseOptIds(); }
;

item                : item_type id opt_alias opt_tooltip            { $$ = MP.ParseItem($item_type, $id, $opt_alias, $opt_tooltip); }
                    | id opt_alias opt_tooltip                      { $$ = MP.ParseItem(undefined , $id, $opt_alias, $opt_tooltip); }
                    | predefined_id opt_alias opt_tooltip           { $$ = MP.ParseItem(undefined , $predefined_id, $opt_alias, $opt_tooltip); }
;

item_type           : TERMINAL
                    | NON_TERMINAL
;

opt_alias           : '(' id ')'                                    { $$ = $id; }
                    | /* empty */
;

opt_tooltip         : ':' id                                        { $$ = $id; }
                    | /* empty */
;

items               : item opt_items                                { $$ = MP.ParseItems($item, $opt_items); }
;

opt_items           : item opt_items                                { $$ = MP.ParseOptItems($item, $opt_items); }
                    | /* empty */                                   { $$ = MP.ParseOptItems(); }
;