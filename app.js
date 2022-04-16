let table;
let numRows, numCols;
let date = [], price = [];
let diagramX, diagramY;

function preload(){
  table = loadTable("assets/bitcoinPrice.csv","csv","header");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  //basic info of data
  numRows = table.getRowCount();
  numCols = table.getColumnCount();
  
  //load Data
  for(let r = 0; r < table.getRowCount(); r++){
    date[r] = table.getString(r,0);
    price[r] = table.getNum(r,1);
   //print(date[r] + "   " + price[r] );
  }
  minMax();
  
} 
let size = [];
function draw() {
  background(240);
  diagramX = width /2;
  diagramY =height/2;
  let radius = width/5-100;
  let ang = 360/numRows;
  for(let i = 0; i<numRows; i++){
    size[i] = map(price[i],35075,47738,0,205);
    let pointx = (size[i]+radius)*cos(radians(ang*i)) + diagramX;
    let pointy = (size[i]+radius)*sin(radians(ang*i)) + diagramY;
    let cirx = radius * cos(radians(ang*i)) + diagramX;
    let ciry = radius * sin(radians(ang*i)) + diagramY;
   
    if(i % 7 === 0){
      strokeWeight(0.5);
      stroke('blue');
    }else{
      strokeWeight(0.1);
      stroke('black');
      }
     line(cirx,ciry,pointx,pointy);
   
    // hover
    
    let dis = dist(mouseX,mouseY, pointx,pointy);
    if(dis < 5){
      fill('rgb(255,67,67)')
      noStroke();
      datasize = 10;
      textAlign(CENTER);
      textSize(18);
      fill('black');
      text("On "+ date[i] + " Bitcoin price was",diagramX, diagramY);
      fill('blue');
      rect(diagramX,diagramY +20, 30,5)
      textSize(24);
      text("$" + price[i],diagramX, diagramY + 60);
      
    }else{
    fill('blue');
      datasize = 3;
    }
    // draw points
    circle(pointx,pointy,datasize);
  }
  
  
}

let dataMin, dataMax = 0;
function minMax(){
  for (let i = 0; i < numRows; i++){
    if(table.getNum(i,1) > dataMax){
      dataMax = table.getNum(i,1);
    }
  }
  dataMin = dataMax;
  for (let i = 0; i < numRows; i++){
    if(table.getNum(i,1) < dataMin){
      dataMin = table.getNum(i,1);
    }
  }
  print("max " + dataMax + " Min " + dataMin);
}

