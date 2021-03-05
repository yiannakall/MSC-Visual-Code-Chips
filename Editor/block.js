export class Block {
    static count_priv = 0;
    extraCssClasses_priv = [];
    id_priv;
    $view_priv;

    static OnClick = () => {};
    static OnChange = (block, aliasedSymbol) => {console.log(block, aliasedSymbol)};

    typeId;
    parent;

    symbol;
    alternateSymbols;

    constructor(symbol, alternateSymbols) {
        this.symbol = symbol;
        this.alternateSymbols = alternateSymbols;
        this.id_priv = "elem" + Block.count_priv++;
    }

    static CreateTab() {
        let elem = new Block('');
        elem.typeId = 'tab';
        elem.SetExtraCssClasses(['tab']);
        return elem;
    }

    static CreateNewLine() {
        let elem = new Block('');
        elem.typeId = 'new_line';
        return elem;
    }

    Render($container) {
        let $elem;

        if (!this.alternateSymbols || this.alternateSymbols.length === 0){
            $elem = 
            $(`<div class ="block"> 
                ${this.symbol.alias !== undefined ? this.symbol.alias : this.symbol.symbol.name} 
            </div>`);
        }else{
            $elem = $(`<select class ="block"> </div>`);

            let value = 0;
            // the symbol's name (for example stmt)
            let text = this.symbol.alias !== undefined ? this.symbol.alias : this.symbol.symbol.name;
            $elem.append(`<option value = "${value++}"> ${text} </option>`)

            // the symbol's rhs in its alternate productions (for example while_stmt, if_stmt, ...)
            for (let choice of this.alternateSymbols) {
                let text = choice.alias !== undefined ? choice.alias : choice.symbol.name;
                $elem.append(`<option value = "${value++}"> ${text} </option>`)
            }

            
            let symbols = [this.symbol, ...this.alternateSymbols];
            let self = this;
            $elem.on('change', function() {
                Block.OnChange(
                    self,
                    symbols[parseInt(this.value)]
                );
            });
        }
            
        $elem.on('click', (event) => Block.OnClick(event, this));
        $elem.addClass(this.extraCssClasses_priv.join(' '));
        $container.append($elem);
        this.$view_priv = $elem;
    }

    SetExtraCssClasses(extraCssClasses) {
        this.extraCssClasses_priv = extraCssClasses;
    }

    SetParent(parent){
        this.parent = parent;
    }

    GetView(){
        return this.$view_priv;
    }
}