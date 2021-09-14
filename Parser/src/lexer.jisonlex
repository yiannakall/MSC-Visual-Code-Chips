simple_id                   [a-zA-Z][a-zA-Z0-9_]*
quoted_id                   \"((\\\")|[^\"])*\"    // quote ( (not quote) | (escaped quote) )* quote

%%

\s+                     /* skip whitespace */
"terminal"              return 'TERMINAL'
"non_terminal"          return 'NON_TERMINAL'
"define"                return 'DEFINE'
"as"                    return 'AS'
"all_of"                return 'ALL_OF'
"any_of"                return 'ANY_OF'
"list_of"               return 'LIST_OF'
"optional"              return 'OPTIONAL'
"IDENT"                 return 'IDENT'
"INT_CONST"             return 'INT_CONST'
"FLOAT_CONST"           return 'FLOAT_CONST'
"CHAR_CONST"            return 'CHAR_CONST'
"STRING_CONST"          return 'STRING_CONST'
"BOOL_CONST"            return 'BOOL_CONST'
":"                     return ':'
"{"                     return '{'
"}"                     return '}'
"("                     return '('
")"                     return ')'
{simple_id}             return 'SIMPLE_ID'
{quoted_id}             return 'QUOTED_ID'
<<EOF>>                 return 'EOF'
.                       return 'INVALID'