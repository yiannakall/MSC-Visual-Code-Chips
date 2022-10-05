//Create Elements
function new_window(name,x,y,width,height) {

    if(document.querySelector('#'+name)!=null){
        $('#'+name).remove();
    }

    $(document.body).append('<div id="' +name +'" style="position:absolute; left:'+x +'%; top:'+ y+ '%; width:'+width +'px; height:'+ height +'px; background-color:white; border-radius:25px; border:solid 1px rgb(221, 219, 219)">'
    + '<h1 style="font-family:Roboto; margin: 0; margin-top: 2%; text-align:center; color:black">Window</h1>'
    + '</div>');

    //exit button
    var butt = document.createElement('button');
    butt.style.cssText = 'border-radius:5px; position:absolute; top:5%; right:2%';
    butt.type = "button";
    butt.onclick = function(){ $('#'+name).hide();}

    var im = document.createElement('img');
    im.style.height = "10px";
    im.src = "/Images/Crystal_button_cancel.svg.png";
    im.style.filter= "grayscale(100%)"
    butt.appendChild(im)

    const element = document.querySelector('#'+name);

    element.appendChild(butt);

    var isMouseDown,initX,initY,height = element.offsetHeight, width = element.offsetWidth;

    element.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        document.body.classList.add('no-select');
        initX = e.offsetX;
        initY = e.offsetY;
    })

    document.addEventListener('mousemove', function(e) {
        if (isMouseDown) {
            var cx = e.clientX - initX,
                cy = e.clientY - initY;
            if (cx < 0) { cx = 0;}
            if (cy < 0) { cy = 0; }
            if (window.innerWidth - e.clientX + initX < width) { cx = window.innerWidth - width;}
            if (e.clientY > window.innerHeight - height+ initY) {cy = window.innerHeight - height;}
            element.style.left = cx + 'px';
            element.style.top = cy + 'px';
        }
    })

    element.addEventListener('mouseup', function() {
        isMouseDown = false;
        document.body.classList.remove('no-select');
    })

}

function new_button(parent,name,x,y,w,h,text) {
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
    document.getElementById(parent).appendChild(butt);
}

function new_textfield(parent,name,x,y,w){
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
    document.getElementById(parent).appendChild(textfield);
}

function new_textarea(parent,name,x,y,w,h){
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
    document.getElementById(parent).appendChild(textarea);
}

function new_checkbox(parent,name,x,y,text){
    if(document.querySelector('#Container'+name)!=null){
        $('#Container'+name).remove();
    }

    const label = document.createElement("label");
    label.id = "Label" + name;
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
    
    document.getElementById(parent).appendChild(container); 
}

function new_dropdown(parent,name,x,y,...options){
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
    document.getElementById(parent).appendChild(dropdown); 
}

//Change Attributes
function change_button_disable(name,value){
    document.getElementById(name).disabled = value;
}

function change_button_text(name,text){
    document.getElementById(name).innerHTML = text;
}

function change_textfield_value(name,value){
    document.getElementById(name).value = value;
}

function change_width(name,width){
    document.getElementById(name).style.width = width + "px";
}

function change_height(name,height){
    document.getElementById(name).style.height = height + "px";
}

function change_color(name,color){
    document.getElementById(name).style.background = color;
}

function change_position(name,x,y){
    document.getElementById(name).style.left = x +"%";
    document.getElementById(name).style.top = y + "%";
}

function change_maxLength(name,max){
    document.getElementById(name).maxLength = max;
}

function change_checkbox_text(name,text){
    document.getElementById(name).innerHTML = text;
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

//Event Handlers
function add_button_event(name,stmts){
    document.getElementById(name).onclick = stmts;
}

function add_checkbox_event(name,stmts){
    document.getElementById(name).onclick = stmts;
}
