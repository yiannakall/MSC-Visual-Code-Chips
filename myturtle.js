var DelayInterval = 0; 

function setDelay(ms){
    DelayInterval = ms;
}

// draw the turtle and the current image
function turtle_draw() {
    draw();
}

// clear the display, don't move the turtle
function turtle_clear() {
    clear()
}

// reset the whole system, clear the display and move turtle back to origin, facing the Y axis.
function turtle_reset() {
    reset();
}

// Trace the forward motion of the turtle
function turtle_forward(distance) {
    if(DelayInterval == 0) {
        console.log("zero")
        forward(distance);
    } else {
        function myfunc(){
            forward(distance);
        }
        delay(myfunc,DelayInterval);
    }
}

//move the turtle backward, allowing for possible wrap-around
function turtle_backward(distance) {
    backward(distance);
}

// turn edge wrapping on/off
function turtle_wrap(bool) {
    wrap(bool);
}

// show/hide the turtle
function turtle_hideTurtle() {
    hideTurtle();
}

// show/hide the turtle
function turtle_showTurtle() {
    showTurtle();
}

// turn on/off redrawing
function turtle_redrawOnMove(bool) {
    redrawOnMove(bool);
}

// lift up the pen (don't draw)
function turtle_penup() {
    penup();
}
// put the pen down (do draw)
function turtle_pendown() {
    pendown();
}

// turn right by an angle in degrees
function turtle_right(angle) {
    if(DelayInterval == 0) {
        console.log("zero")
        right(angle);
    } else {
        function myfunc(){
            right(angle);
        }
        delay(myfunc,DelayInterval);
    }
}

// turn left by an angle in degrees
function turtle_left(angle) {
    left(angle);
}

// move the turtle to a particular coordinate (don't draw on the way there)
function turtle_goto(x, y) {
    goto(x,y);
}

// set the angle of the turtle in degrees
function turtle_angle(angle) {
    angle(angle);
}

// set the width of the line
function turtle_width(w) {
    width(w);
}

// write some text at the turtle position.
function turtle_write(msg) {
   write(msg);
}

// set the turtle draw shape
function turtle_shape(s) {
    shape(s);
}

// set the colour of the line using RGB values in the range 0 - 255.
function turtle_colour(r, g, b, a) {
    colour(r,g,b,a);
}

// Generate a random integer between low and hi
function turtle_random(low, hi) {
    random(low,hi);
}

function turtle_animate(f, ms) {
    animate(f,ms);
}

function turtle_sleep(ms) {
    sleep(ms);
}

function turtle_delay(f, ms) {
    delay(f,ms);
}