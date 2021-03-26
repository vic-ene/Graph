
var defaultNumberOfNodes = 10;
var calculationsPerRender = 1_00_00;

let nodes = [],                order = [], bestOrder = [],        distances = [], bestDistance = Infinity;
let nodeColor = "#FFFFFF",     strokeColor = "#DB7093",           backgroundColor = "#000000";

mouseInsideCanvas = false;
calculate = false;

nodeIndex = -1;
count = 0;
totalPermutations = 0;


let orderColor = 'grey';  


function setup() {
  canvas = createCanvas(width, height);
  canvas.parent('canvas');

  canvas.mouseOver(function(){ mouseInsideCanvas = true; });
  canvas.mouseOut(function(){ mouseInsideCanvas = false; });

  generateRandomNodes();
}


function draw() {
    update();

    background(backgroundColor);

    // draw the nodes and the lines
    if(nodes.length > 0) {
      if(calculate)Node.drawArrayLines(nodes, order, orderColor );
      Node.drawArrayLines(nodes, bestOrder, nodes[0].strokeColor);
      Node.drawArrayNodes(nodes);
    } 

    // draw different effect when buttons located on the side are activated
    if(mouseInsideCanvas){
      findNodeIndex();
      nodeButtonEffects();
    }  

    // draw the advancement
    if(calculate){
      fill(255);
      text(nf( (count * 100 * nodes.length) / (totalPermutations  ), 1,2) + "%", width / 2, height - 20);
    }

}


function update(){
  if(calculate){
    for(var i = 0; i < calculationsPerRender; i ++ ){
      order = nextLexicalOrder(order); 
      calculateDistance();
    }  
  }
}



// Event Listeners
// -------------------------------------------------------------------------------------------
function mousePressed(){
  if(mouseInsideCanvas){
    addNode(mouseX, mouseY);
    deleteNode(nodeIndex);
    moveNode(nodeIndex);
  }
}

function mouseReleased(){
  for(var i = 0; i < nodes.length; i ++){
    nodes[i].move = false;
  } 
}

function keyTyped(){
  if(key === 'n') console.log(nodes);
  else if(key == 'o') console.log(order);
  else if(key == 'b') console.log(bestOrder);
  else if(key == 'd') console.log(distances); 
}
// -------------------------------------------------------------------------------------------

function calculateDistance(){
  let distance = 0;
  for(var i = 0; i < order.length - 1; i ++){
    distance += distances[order[i]][order[i + 1]];
  }
  distance += distances[order[order.length - 1]][order[0]];
  if(distance < bestDistance){
    bestDistance = distance;
    bestOrder = order.slice();
  }
}


 // get the index of the hovered node 
function findNodeIndex(){
  for(var i = 0; i < nodes.length; i ++){
   let node = nodes[i]; 
   if(node.isHovered()){
     nodeIndex = node.id;
     break;
   }else {
     node.showDelete = false;
     node.showMove = false;
     nodeIndex = -1;
   }
 }
}


// drawing effects when node buttons are active
function nodeButtonEffects(){
  if(isActive(addNodeButton)){
    if(nodes.length > 0){  
      fill(70, 130, 180, 100);
    }else fill(255);
    circle(mouseX, mouseY, 2 * Node.nodeRadius);
  }
  else if(isActive(deleteNodeButton)){
    if(nodeIndex >= 0){
      nodes[nodeIndex].showDelete = true;
    }       
  }
  else if(isActive(moveNodeButton)){
    if(nodeIndex >= 0){
      nodes[nodeIndex].showMove = true;
    }
  }
}

















