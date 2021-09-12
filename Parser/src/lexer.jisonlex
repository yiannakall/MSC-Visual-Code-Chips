id                          [a-zA-Z][a-zA-Z0-9_]*
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
"identifier"            return 'IDENTIFIER'
"int"                   return 'INT'
"float"                 return 'FLOAT'
"char"                  return 'CHAR'
"string"                return 'STRING'
"bool"                  return 'BOOL'
":"                     return ':'
"{"                     return '{'
"}"                     return '}'
"("                     return '('
")"                     return ')'
{id}                    return 'ID'
{quoted_id}             return 'QUOTED_ID'
<<EOF>>                 return 'EOF'
.                       return 'INVALID'