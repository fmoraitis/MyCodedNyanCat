let pixelSize;
let starCounter = 0;
let starAngle = 0;
let braidSize;
let directionUpDownBraidSegment = 1;

let cnt;
let cntDir;
let cntForReversingTailMovement = 0;
let dirForReversingTailMovement = 1;

let upDownBody;
let headM;
let dirUpDownBody;
let dotsY = [];
let dotsX = [];
let numDotsY;
let numDotsX;

let xoff = 0.0;
let yoff = 0.0;
let tailSegmentsY = [];
let tailSegmentsX1 = [];
let tailSegmentsX2 = [];
let numTailSegments;
let starColorWhite;
let starColorPink;
let starColor;
let rainbowColors = [];
let orng;
let yell;
let myGreen;
let myBlue;
let purple;
let moveUpDown;
let amnt;

let canvas;
let song;
function preload(){
song = loadSound("data/nyanCat.mp3")
}
function setup() {
  //createCanvas(1000, 1000);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '-1')
 // canvas.position(windowWidth/4,0)
  song.play();
  song.setVolume(0.2);
  song.loop();
  
  rectMode(CENTER);

  myRed = color(255, 24, 0);
  orng = color(255, 124, 0);
  yell = color(255, 240, 0);
  myGreen = color(38, 221, 0);
  myBlue = color(0, 144, 255);
  purple = color(104, 68, 255);
  rainbowColors = [myRed, orng, yell, myGreen, myBlue, purple];
  starColorWhite = color(255, 255, 255);
  starColorPink = color(255, 163, 152);
  starColor = color(255, 255, 255);
  pixelSize = 10;
  braidSize = 2 * pixelSize;
  upDownBody = pixelSize / 2;
  dirUpDownBody = 1;
  moveUpDown = directionUpDownBraidSegment * pixelSize / 2;

  numTailSegments = 5;
  amnt = 0;

  for (let i = 0; i < numTailSegments; i++) {
    tailSegmentsY[i] = 0;

  }
  numDotsY = 3;
  numDotsX = 4;


  for (let i = 0; i < numDotsX; i++) {
    dotsX[i] = -90 + i * 45;
    for (let j = 0; j < numDotsY; j++) {
      dotsY[j] = -80 + j * 45;
    }
  }
  cntDir = -1;
  cnt = numTailSegments - 1;
}

function draw() {
  background(0, 49, 105);
  scale(0.5)
  translate(width/2, height/2);
  strokeCap(SQUARE);
  strokeWeight(10);
  let tailSize = 0;
  translate(width / 2, height / 2);


  starColor = lerp(starColorWhite, starColorPink, amnt);
  //if (frameCount%(int( random(0,50) ))===0) {
  for (let i = 0; i < 4; i++) {
    drawStar(random(-width , width ), random(-height , height ), starColor);
  }



  if (amnt === 1) {
    amnt = 0;
  }

  if (frameCount % 20 === 0) {
    starCounter++;
    amnt += 0.01;
  }
  // draw body
  push();
  translate(-20, 25 + upDownBody * dirUpDownBody);

  push();
  translate(-240, -40);
  // scale(1,0);
  for (let i = 0; i <= 5; i++) {
    if (i === 0) {
      tailSize = -10;
    } else {
      tailSize = 0;
    }
    drawRainbowRect(i * braidSize, moveUpDown / 2, braidSize, pixelSize, rainbowColors, tailSize);
    drawRainbowRect((i - 6) * braidSize, moveUpDown / 2, braidSize, pixelSize, rainbowColors, tailSize);
    moveUpDown = moveUpDown + directionUpDownBraidSegment * pixelSize;
    directionUpDownBraidSegment = -1 * directionUpDownBraidSegment;
  }

  if (frameCount % 10 === 0) {
    moveUpDown = directionUpDownBraidSegment * pixelSize;
    directionUpDownBraidSegment = -1 * directionUpDownBraidSegment;
    // xr=random(-100,0) ;
  }
  pop();

  //////////////////////////////Tail////////////////////////////////////

  push();

  translate(-260, 30);
  scale(2);
  for (let j = cnt; j >= 0; j--) {

    if (frameCount % 3 === 0) { // this has to be updated with the counter 
      tailSegmentsY[j] = tailSegmentsY[j] + cntDir * pixelSize / 1.5 * dirForReversingTailMovement;
    }
    tailSegmentsX1[j] = j * 5 + 60;
    tailSegmentsX2[j] = j * 5 + 5 + 60;
  }

  if (frameCount % 3 === 0) { // controls the speed
    cnt--;
  }
  if (cnt <= 0) {
    cnt = numTailSegments - 2;
    cntDir = -1 * cntDir;
    cntForReversingTailMovement++;
    if (cntForReversingTailMovement % 2 === 0) {
      dirForReversingTailMovement = -1 * dirForReversingTailMovement;
    }
  }
  // draw tail black 
  stroke(40);
  push();
  strokeWeight(18);
  strokeCap(PROJECT);
  for (let i = 0; i < numTailSegments; i++) {
    line(tailSegmentsX1[i] - 5, tailSegmentsY[i], tailSegmentsX2[i], tailSegmentsY[i]);
  }
  pop();
  // draw tail grey
  stroke(153, 153, 153);
  for (let i = 0; i < numTailSegments; i++) {
    line(tailSegmentsX1[i] - 10, tailSegmentsY[i], tailSegmentsX2[i], tailSegmentsY[i]);
  }
  pop();

  //draw legs 

  //back legs
  push();
  translate(-10 + 5 * sin(-headM / 80 + PI), 2 * cos(-headM / 80 + PI));
  push();
  strokeWeight(8);
  fill(153, 153, 153);
  stroke(40);

  beginShape();
  vertex(-50, 80);
  vertex(-90, 80);
  vertex(-90, 110);
  vertex(-60, 110);
  vertex(-60, 100);
  vertex(-50, 100);
  endShape(CLOSE);

  beginShape();
  vertex(10, 80);
  vertex(-30, 80);
  vertex(-30, 110);
  vertex(0, 110);
  vertex(0, 100);
  vertex(10, 100);
  endShape(CLOSE);

  //front legs

  beginShape();

  vertex(80, 80);
  vertex(80, 110);
  vertex(50, 110);
  vertex(50, 80);

  endShape(CLOSE);
  beginShape();

  vertex(130, 80);
  vertex(130, 110);
  vertex(100, 110);
  vertex(100, 80);

  endShape(CLOSE);
  pop();
  pop();

  //body////////////////////////////////////////////////////
  //rect(0, 0, 200, 170);
  push();
  fill(255, 206, 160);
  stroke(40);
  beginShape();
  vertex(-110, 65);

  vertex(-110, -65);
  vertex(-100, -65);
  vertex(-100, -75);
  vertex(-90, -75);
  vertex(-90, -85);


  vertex(90, -85);
  vertex(90, -75);
  vertex(100, -75);
  vertex(100, -65);
  vertex(110, -65);

  vertex(110, 65);
  vertex(100, 65);
  vertex(100, 75);
  vertex(90, 75);
  vertex(90, 85);

  vertex(-90, 85);
  vertex(-90, 75);
  vertex(-100, 75);
  vertex(-100, 65);
  vertex(-110, 65);

  endShape(CLOSE);
  pop();

  //pink body
  push();
  push();
  scale(0.8);
  fill(255, 169, 255);
  noStroke();
  beginShape();
  vertex(-110, 65);

  vertex(-110, -65);
  vertex(-100, -65);
  vertex(-100, -75);
  vertex(-90, -75);
  vertex(-90, -85);


  vertex(90, -85);
  vertex(90, -75);
  vertex(100, -75);
  vertex(100, -65);
  vertex(110, -65);

  vertex(110, 65);
  vertex(100, 65);
  vertex(100, 75);
  vertex(90, 75);
  vertex(90, 85);

  vertex(-90, 85);
  vertex(-90, 75);
  vertex(-100, 75);
  vertex(-100, 65);
  vertex(-110, 65);

  endShape(CLOSE);
  pop();

  pop();

  //body////////////////////////////////////////////////////end//////////////////////
  //
  if (frameCount % 10 === 0) {
    dirUpDownBody = -1 * dirUpDownBody;
  }

  //body dots

  if (frameCount % 10 === 0) {
    for (let i = 0; i < numDotsX; i++) {
      dotsX[i] = -90 + i * 45;
      for (let j = 0; j < numDotsY; j++) {
        dotsY[j] = -80 + j * 45;
      }
    }

    for (let i = 0; i < numDotsX; i++) {
      xoff = xoff + 400000;
      dotsX[i] = dotsX[i] + noise(xoff) * 40;
      for (let j = 0; j < numDotsY; j++) {
        yoff = yoff + 500;
        dotsY[j] = dotsY[j] + noise(yoff) * 20;
      }
    }
  }
  push();
  stroke(255, 76, 157);
  for (let i = 0; i < numDotsX; i++) {
    for (let j = 0; j < numDotsY; j++) {
      line(dotsX[i], dotsY[j], dotsX[i] + pixelSize, dotsY[j]);
    }
  }
  pop();

  // draw head

  push();
  translate(35 + 110 / 2 + 4 * sin(-headM / 80), 35 + 5 * cos(-headM / 80));
  //draw shape of head
  beginShape();
  push();
  fill(153, 153, 153);
  noStroke();

  vertex(10 + pixelSize * 4, 4 * pixelSize + pixelSize);
  vertex(-pixelSize * 4, 4 * pixelSize + pixelSize);
  vertex(-pixelSize * 4, 3 * pixelSize + pixelSize);
  vertex(-pixelSize * 5, 3 * pixelSize + pixelSize);

  vertex(-pixelSize * 5, 2 * pixelSize + pixelSize);
  vertex(-pixelSize * 6, 2 * pixelSize + pixelSize);

  vertex(-pixelSize * 6.2, 2 * pixelSize + pixelSize);
  vertex(-pixelSize * 6.2, 2 * pixelSize + pixelSize - 5 * pixelSize);

  vertex(-pixelSize * 5.4, 2 * pixelSize + pixelSize - 5 * pixelSize);

  let ycL = 2 * pixelSize + pixelSize - 8.2 * pixelSize;
  vertex(-pixelSize * 5, ycL - 0.5 * pixelSize);
  vertex(-pixelSize * 5 + 2 * pixelSize, ycL - 0.5 * pixelSize);

  vertex(-pixelSize * 5 + 2 * pixelSize, ycL + 0.5 * pixelSize);
  vertex(-2 * pixelSize, ycL + 0.5 * pixelSize);
  vertex(-2 * pixelSize, ycL + 1.5 * pixelSize);
  vertex(-pixelSize, ycL + 1.5 * pixelSize);
  let ycR = 2 * pixelSize + pixelSize - 8.2 * pixelSize;
  vertex(-pixelSize, ycR + 2.5 * pixelSize);
  vertex(0 + pixelSize * 5.4 - 2 * pixelSize - pixelSize, ycR + 2.5 * pixelSize);
  vertex(10 + pixelSize * 5.4 - 2 * pixelSize - 2 * pixelSize, ycR + 1.5 * pixelSize);
  vertex(10 + pixelSize * 5.4 - 2 * pixelSize - pixelSize, ycR + 1.5 * pixelSize);
  //
  vertex(10 + pixelSize * 5.4 - 2 * pixelSize - pixelSize, ycR + 0.5 * pixelSize);
  vertex(10 + pixelSize * 5.4 - 2 * pixelSize, ycR + 0.5 * pixelSize);
  vertex(10 + pixelSize * 5.4 - 2 * pixelSize, ycR - 0.5 * pixelSize);
  vertex(10 + pixelSize * 5.4, ycR - 0.5 * pixelSize);
  vertex(10 + pixelSize * 5.4, 2 * pixelSize + pixelSize - 8.2 * pixelSize);
  vertex(10 + pixelSize * 5.4, 2 * pixelSize + pixelSize - 5 * pixelSize);
  vertex(10 + pixelSize * 6.2, 2 * pixelSize + pixelSize - 5 * pixelSize);
  vertex(10 + pixelSize * 6.2, 2 * pixelSize + pixelSize);

   vertex(10 + pixelSize * 6, 2 * pixelSize + pixelSize);
   vertex(10 + pixelSize * 5, 2 * pixelSize + pixelSize);
   vertex(10 + pixelSize * 5, 3 * pixelSize + pixelSize);
   vertex(10 + pixelSize * 4, 3 * pixelSize + pixelSize);

  endShape(CLOSE);
  pop();

  push();
  stroke(40);
  //nose
  line(10, pixelSize / 2, 10 + pixelSize, pixelSize / 2);
  //eye right
  line(10 + 2 * pixelSize, 0, 10 + pixelSize * 4, 0);
  line(10 + pixelSize * 3, -pixelSize, 10 + pixelSize * 4, -pixelSize);
  //pupil
  push();
  stroke(250);
  line(10 + pixelSize * 2, -pixelSize, 10 + pixelSize * 3, -pixelSize);
  pop();
  //eye left
  line(-2 * pixelSize, 0, -pixelSize * 4, 0);
  line(-pixelSize * 2, -pixelSize, -pixelSize * 3, -pixelSize);
  //pupil
  push();
  stroke(250);
  line(-pixelSize * 4, -pixelSize, -pixelSize * 3, -pixelSize);
  pop();
  //mouth
  push();
  translate(0, pixelSize / 4);
  line(0, 1.9 * pixelSize, pixelSize, 1.9 * pixelSize);

  line(-2 * pixelSize, 1.9 * pixelSize, -pixelSize * 3, 1.9 * pixelSize);
  line(10 + pixelSize * 2, 1.9 * pixelSize, 10 + pixelSize * 3, 1.9 * pixelSize);
  line(-pixelSize * 3, 1.9 * pixelSize + pixelSize, 10 + pixelSize * 3, 1.9 * pixelSize + pixelSize);
  pop();
  //cheecks
  push();
  stroke(255, 163, 152);
  line(-5 * pixelSize, 1.7 * pixelSize, -pixelSize * 4, 1.7 * pixelSize);
  line(10 + pixelSize * 5, 1.7 * pixelSize, 10 + pixelSize * 4, 1.7 * pixelSize);
  pop();

  //jaw from down to up and left and right
  line(-pixelSize * 4, 4 * pixelSize + pixelSize, 10 + pixelSize * 4, 4 * pixelSize + pixelSize);

  line(-pixelSize * 5, 3 * pixelSize + pixelSize, -pixelSize * 4, 3 * pixelSize + pixelSize);
  line(-pixelSize * 6, 2 * pixelSize + pixelSize, -pixelSize * 5, 2 * pixelSize + pixelSize);
  line(-pixelSize * 6.2, 2 * pixelSize + pixelSize, -pixelSize * 6.2, 2 * pixelSize + pixelSize - 5 * pixelSize);
  line(-pixelSize * 5.4, 2 * pixelSize + pixelSize - 5 * pixelSize, -pixelSize * 5.4, 2 * pixelSize + pixelSize - 8.2 * pixelSize);
  ycL = 2 * pixelSize + pixelSize - 8.2 * pixelSize;
  line(-pixelSize * 5, ycL - 0.5 * pixelSize, -pixelSize * 5 + 2 * pixelSize, ycL - 0.5 * pixelSize);
  line(-pixelSize * 5 + 2 * pixelSize, ycL + 0.5 * pixelSize, -2 * pixelSize, ycL + 0.5 * pixelSize);
  line(-2 * pixelSize, ycL + 1.5 * pixelSize, -pixelSize, ycL + 1.5 * pixelSize);

  line(10 + pixelSize * 4, 3 * pixelSize + pixelSize, 10 + pixelSize * 5, 3 * pixelSize + pixelSize);
  line(10 + pixelSize * 5, 2 * pixelSize + pixelSize, 10 + pixelSize * 6, 2 * pixelSize + pixelSize);
  line(10 + pixelSize * 6.2, 2 * pixelSize + pixelSize, 10 + pixelSize * 6.2, 2 * pixelSize + pixelSize - 5 * pixelSize);
  line(10 + pixelSize * 5.4, 2 * pixelSize + pixelSize - 5 * pixelSize, 10 + pixelSize * 5.4, 2 * pixelSize + pixelSize - 8.2 * pixelSize);
  ycR = 2 * pixelSize + pixelSize - 8.2 * pixelSize;

  line(10 + pixelSize * 5.4, ycR - 0.5 * pixelSize, 10 + pixelSize * 5.4 - 2 * pixelSize, ycR - 0.5 * pixelSize);
  line(10 + pixelSize * 5.4 - 2 * pixelSize, ycR + 0.5 * pixelSize, 10 + pixelSize * 5.4 - 2 * pixelSize - pixelSize, ycR + 0.5 * pixelSize);
  line(10 + pixelSize * 5.4 - 2 * pixelSize - pixelSize, ycR + 1.5 * pixelSize, 10 + pixelSize * 5.4 - 2 * pixelSize - 2 * pixelSize, ycR + 1.5 * pixelSize);

  line(-pixelSize, ycR + 2.5 * pixelSize, 0 + pixelSize * 5.4 - 2 * pixelSize - pixelSize, ycR + 2.5 * pixelSize);
  pop();
  pop();
  headM = headM + 15;
  if (frameCount % 20 === 0) {
    headM = 0;
  }
  pop();
}

function drawRainbowRect(xStart, yStart, braidSize, moveDownPixel, c, tailSize) {


  for (let i = 0; i <= numTailSegments; i++) {
    stroke(c[i]);
    push();
    translate(-225, -20);
    scale(3, 2.4);

    strokeWeight(10);
    line(xStart + tailSize, yStart + i * moveDownPixel, xStart + braidSize, yStart + i * moveDownPixel);
    pop();
  }
}

function drawStar(starX, starY, starColor) {





  push();
  stroke(starColor);

  translate(starX, starY);
  if (starCounter % 4 === 0) {
    line(0, 0, pixelSize, 0);
  }
  if (starCounter % 4 === 1) {

    line(0, pixelSize, 0, 2 * pixelSize);
    line(0, -pixelSize, 0, -2 * pixelSize);

    line(pixelSize, 0, 2 * pixelSize, 0);
    line(-pixelSize, 0, -2 * pixelSize, 0);

    //line( 0, 0,pixelSize,0);
    //line( 0, 0,pixelSize,0);
  }
  if (starCounter % 4 === 2) {
    line(0, pixelSize, 0, 3 * pixelSize);
    line(0, -pixelSize, 0, -3 * pixelSize);

    line(pixelSize, 0, 3 * pixelSize, 0);
    line(-pixelSize, 0, -3 * pixelSize, 0);
  }
  if (starCounter % 4 === 3) {
    rectMode(CENTER);
    for (let i = 0; i < 7; i++) {
      let x = 4 * pixelSize * sin(starAngle);
      let y = 4 * pixelSize * cos(starAngle);
      rect(x, y, pixelSize / 2, pixelSize / 2);
      starAngle += PI / 4;
    }
  }

  pop();


}

function windowResized(){
resizeCanvas(windowWidth, windowHeight);

}