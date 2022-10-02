//Create Elements
function new_button(name,x,y,w,h,text) {
    if(document.querySelector('#'+name)!=null){
        $('#'+name).remove();
    }
    const butt = document.createElement('button');
    butt.id = name;
    butt.style.position = 'absolute';
    butt.style.width = w + "px";
    butt.style.height = h + "px";
    butt.style.left = x +"%";
    butt.style.top = y + "%";
    butt.type = "button";
    butt.innerHTML = text;
    document.getElementById("window").appendChild(butt);
    //butt.onclick = function(){ $('#window').hide();}

}

function new_textfield(name,x,y,w){
    if(document.querySelector('#'+name)!=null){
        $('#'+name).remove();
    }
    const textfield = document.createElement("input");
    textfield.id = name;
    textfield.style.position = 'absolute';
    textfield.style.width = w + "px";
    textfield.style.left = x +"%";
    textfield.style.top = y + "%";
    textfield.type = "text";
    document.getElementById("window").appendChild(textfield);
    
}

function new_textarea(name,x,y,w,h){
    if(document.querySelector('#'+name)!=null){
        $('#'+name).remove();
    }
    const textarea = document.createElement("textarea");
    textarea.id = name;
    textarea.style.position = 'absolute';
    textarea.style.width = w + "px";
    textarea.style.height = h + "px";
    textarea.style.left = x +"%";
    textarea.style.top = y + "%";
    document.getElementById("window").appendChild(textarea);
}

function new_checkbox(name,x,y,text){
    if(document.querySelector('#'+name)!=null){
        $('#'+name).remove();
    }

    const label = document.createElement("label");
    label.htmlFor = name;
    label.innerHTML = text;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";  
    checkbox.id = name;

    const container = document.createElement("div");
    container.style.position = 'absolute';
    container.style.left = x +"%";
    container.style.top = y + "%";
    container.appendChild(label);
    container.appendChild(checkbox);
    container.id = "Container" + name;
    
    document.getElementById("window").appendChild(container); 
}

function new_dropdown(name,x,y,...options){
    if(document.querySelector('#'+name)!=null){
        $('#'+name).remove();
    }
    const dropdown = document.createElement('select');
    dropdown.id = name;
    dropdown.style.position = 'absolute';
    dropdown.style.left = x +"%";
    dropdown.style.top = y + "%";

    for(let i=0; i<options.length; i++){
        const option = document.createElement("option");
        option.text = options[i];
        dropdown.appendChild(option);
    }
    document.getElementById("window").appendChild(dropdown); 
}

//Change Button Attributes
function change_button_disable(name,value){
    document.getElementById(name).disabled = value;
}

function change_button_text(name,text){
    document.getElementById(name).innerHTML = text;
}

function change_button_color(name,color){
    document.getElementById(name).style.background = color;
}

//Change Textfield Attributes
function change_textfield_value(name,value){
    document.getElementById(name).value = value;
}

//Change Textarea Attributes 
function change_rows(name,rows){
    document.getElementById(name).rows = rows;
}

function change_cols(name,cols){
    document.getElementById(name).cols = cols;
}

//General for change attributes
function change_width(name,width){
    document.getElementById(name).style.width = width + "px";
}

function change_height(name,height){
    document.getElementById(name).style.height = height + "px";
}

function change_position(name,x,y){
    document.getElementById(name).style.left = x +"%";
    document.getElementById(name).style.top = y + "%";
}

function change_maxLength(name,max){
    document.getElementById(name).maxLength = max;
}

function change_checkbox_text(name,text){

}

function change_checkbox_checked(name,value){
    document.getElementById(name).checked = value;
}

function change_dropdown_multiple(name,value){
    document.getElementById(name).multiple = value;
}

function add_dropdown_option(name,option) {
    const new_option = document.createElement("option");
    new_option.text = option;
    $('#'+name).append(new_option);
}