var DelayInterval = 0; 
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve,delay));

function turtle_setDelay(ms){
    DelayInterval = ms;
}

async function turtle_draw() {
    await sleep(DelayInterval);
    draw();
}

function turtle_clear() {
    clear();
}

function turtle_reset() {
    reset();
}

async function turtle_forward(distance) {
    await sleep(DelayInterval);
    forward(distance);
}

async function turtle_backward(distance) {
    await sleep(DelayInterval);
    backward(distance);
}

function turtle_wrap(bool) {
    wrap(bool);
}

function turtle_hideTurtle() {
    hideTurtle();
}

function turtle_showTurtle() {
    showTurtle();
}

function turtle_redrawOnMove(flag) {
    redrawOnMove(flag);
}

function turtle_penup() {
    penup();
}

function turtle_pendown() {
    pendown();
}

async function turtle_right(angle) {
    await sleep(DelayInterval);
    right(angle);
}

async function turtle_left(angle) {
    await sleep(DelayInterval);
    left(angle);
}

async function turtle_goto(x, y) {
    await sleep(DelayInterval);
    goto(x,y);
}

function turtle_angle(angle) {
    angle(angle);
}

function turtle_width(w) {
    width(w);
}

function turtle_write(msg) {
    write(msg);
}


async function turtle_shape(s) {
    shape(s);
}

function turtle_colour(r, g, b, a) {
    colour(r,g,b,a);
}

function turtle_random(low, hi) {
    random(low,hi);
}

function turtle_animate(f, ms) {
    animate(f,ms);
}

function turtle_delay(f, ms) {
    delay(f,ms);
}