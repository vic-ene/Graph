
var numberOfNodes = 8;
var calculationsPerRender = 1_0_0;

let nodes = [],                order = [], bestOrder = [],            distances = [], bestDistance = Infinity;

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

  nodes = generateRandomNodes(numberOfNodes);
}


function draw() {
    update();

    background(0);

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
      text(nf( 100 * count / (totalPermutations  ), 1,2) + "%", width / 2, height - 20);
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


// reset the node array
function resetNodes(){
  nodes = [];
  order = [];
  bestOrder = order.slice();
}














