var DelayInterval = 0; 
var temp = 0;
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve,delay));

function setDelay(ms){
    DelayInterval = ms;
    temp = ms;
}

// draw the turtle and the current image
async function turtle_draw() {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    draw();
}

// clear the display, don't move the turtle
async function turtle_clear() {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    clear();
}

// reset the whole system, clear the display and move turtle back to origin, facing the Y axis.
async function turtle_reset() {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    reset();
}

// Trace the forward motion of the turtle
async function turtle_forward(distance) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    forward(distance);
    //setTimeout(forward,DelayInterval,distance);
}

//move the turtle backward, allowing for possible wrap-around
async function turtle_backward(distance) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    backward(distance);
}

// turn edge wrapping on/off
async function turtle_wrap(bool) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    wrap(bool);
}

// show/hide the turtle
async function turtle_hideTurtle() {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    hideTurtle();
}

// show/hide the turtle
async function turtle_showTurtle() {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    showTurtle();
}

// turn on/off redrawing
async function turtle_redrawOnMove(bool) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    redrawOnMove(bool);
}

// lift up the pen (don't draw)
async function turtle_penup() {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    penup();
}
// put the pen down (do draw)
async function turtle_pendown() {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    pendown();
}

// turn right by an angle in degrees
async function turtle_right(angle) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    right(angle);
    //setTimeout(right,DelayInterval,angle);
}

// turn left by an angle in degrees
async function turtle_left(angle) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    left(angle);
}

// move the turtle to a particular coordinate (don't draw on the way there)
async function turtle_goto(x, y) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    goto(x,y);
}

// set the angle of the turtle in degrees
async function turtle_angle(angle) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    angle(angle);
}

// set the width of the line
async function turtle_width(w) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    width(w);
}

// write some text at the turtle position.
async function turtle_write(msg) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    write(msg);
}

// set the turtle draw shape
async function turtle_shape(s) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    shape(s);
}

// set the colour of the line using RGB values in the range 0 - 255.
async function turtle_colour(r, g, b, a) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    colour(r,g,b,a);
}

// Generate a random integer between low and hi
async function turtle_random(low, hi) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    random(low,hi);
}

async function turtle_animate(f, ms) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    animate(f,ms);
}

async function turtle_sleep(ms) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    sleep(ms);
}

async function turtle_delay(f, ms) {
    DelayInterval = DelayInterval + temp;
    await sleep(DelayInterval);
    delay(f,ms);
}