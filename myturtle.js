var DelayInterval = 0; 
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve,delay));

function setDelay(ms){
    DelayInterval = ms;
}

// draw the turtle and the current image
function turtle_draw() {
    await sleep(DelayInterval);
    draw();
}

// clear the display, don't move the turtle
function turtle_clear() {
    await sleep(DelayInterval);
    clear()
}

// reset the whole system, clear the display and move turtle back to origin, facing the Y axis.
function turtle_reset() {
    await sleep(DelayInterval);
    reset();
}

// Trace the forward motion of the turtle
async function turtle_forward(distance) {
    await sleep(DelayInterval);
    forward(distance);
    //setTimeout(forward,DelayInterval,distance);
}

//move the turtle backward, allowing for possible wrap-around
function turtle_backward(distance) {
    await sleep(DelayInterval);
    backward(distance);
}

// turn edge wrapping on/off
function turtle_wrap(bool) {
    await sleep(DelayInterval);
    wrap(bool);
}

// show/hide the turtle
function turtle_hideTurtle() {
    await sleep(DelayInterval);
    hideTurtle();
}

// show/hide the turtle
function turtle_showTurtle() {
    await sleep(DelayInterval);
    showTurtle();
}

// turn on/off redrawing
function turtle_redrawOnMove(bool) {
    await sleep(DelayInterval);
    redrawOnMove(bool);
}

// lift up the pen (don't draw)
function turtle_penup() {
    await sleep(DelayInterval);
    penup();
}
// put the pen down (do draw)
function turtle_pendown() {
    await sleep(DelayInterval);
    pendown();
}

// turn right by an angle in degrees
async function turtle_right(angle) {
    await sleep(DelayInterval);
    right(angle);
    //setTimeout(right,DelayInterval,angle);
}

// turn left by an angle in degrees
function turtle_left(angle) {
    await sleep(DelayInterval);
    left(angle);
}

// move the turtle to a particular coordinate (don't draw on the way there)
function turtle_goto(x, y) {
    await sleep(DelayInterval);
    goto(x,y);
}

// set the angle of the turtle in degrees
function turtle_angle(angle) {
    await sleep(DelayInterval);
    angle(angle);
}

// set the width of the line
function turtle_width(w) {
    await sleep(DelayInterval);
    width(w);
}

// write some text at the turtle position.
function turtle_write(msg) {
    await sleep(DelayInterval);
   write(msg);
}

// set the turtle draw shape
function turtle_shape(s) {
    await sleep(DelayInterval);
    shape(s);
}

// set the colour of the line using RGB values in the range 0 - 255.
function turtle_colour(r, g, b, a) {
    await sleep(DelayInterval);
    colour(r,g,b,a);
}

// Generate a random integer between low and hi
function turtle_random(low, hi) {
    await sleep(DelayInterval);
    random(low,hi);
}

function turtle_animate(f, ms) {
    await sleep(DelayInterval);
    animate(f,ms);
}

function turtle_sleep(ms) {
    await sleep(DelayInterval);
    sleep(ms);
}

function turtle_delay(f, ms) {
    await sleep(DelayInterval);
    delay(f,ms);
}