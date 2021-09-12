%start program

%{
    const { MParser } = require('../src/MParser.js');
    let MP = new MParser();
%}

%%

program             : defs          { $$ = MP.ParseProgram($defs); }
;

defs                : def defs      { $$ = MP.ParseDefs($def, $defs); }
                    | EOF           { $$ = MP.ParseDefs(); }
;

def                 : DEFINE ident AS ALL_OF '{' items '}'      { $$ = MP.ParseDef($ident, $4, $items); }
                    | DEFINE ident AS item                      { $$ = MP.ParseDef($ident, "all_of", $item); }
                    | DEFINE ident AS ANY_OF '{' items '}'      { $$ = MP.ParseDef($ident, $4, $items); }
                    | DEFINE ident AS LIST_OF '{' item '}'      { $$ = MP.ParseDef($ident, $4, $item); }
                    | DEFINE ident AS LIST_OF item              { $$ = MP.ParseDef($ident, $4, $item); }
                    | DEFINE ident AS OPTIONAL '{' item '}'     { $$ = MP.ParseDef($ident, $4, $item); }
                    | DEFINE ident AS OPTIONAL item             { $$ = MP.ParseDef($ident, $4, $item); }
;

ident               : ID
                    | QUOTED_ID     { $$ = MP.ParseQuotedId($QUOTED_ID); }
;

item                : item_type ident opt_alias opt_tooltip { $$ = MP.ParseItem($item_type, $ident, $opt_alias, $opt_tooltip); }
;

item_type           : TERMINAL opt_terminal_type    { $$ = MP.ParseItemType($TERMINAL, $opt_terminal_type); }
                    | NON_TERMINAL                  { $$ = MP.ParseItemType($NON_TERMINAL, null); }
;

opt_terminal_type   : '(' terminal_type ')'     { $$ = $terminal_type; }
                    | /* empty */
;

terminal_type       : IDENTIFIER
                    | INT
                    | FLOAT
                    | CHAR
                    | STRING
                    | BOOL
;

opt_alias           : '(' ident ')'     { $$ = $ident; }
                    | /* empty */
;

opt_tooltip         : ':' ident    { $$ = $ident; }
                    | /* empty */
;

items               : item opt_items    { $$ = MP.ParseItems($item, $opt_items); }
;

opt_items           : item opt_items    { $$ = MP. ParseOptItems($item, $opt_items); }
                    | /* empty */       { $$ = MP.ParseOptItems(); }
;