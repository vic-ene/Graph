

// calculates the distance matrix and launches the calculation loop  (calculate = true)
function calculateDistanceMatrix(){
  distances = [nodes.length];
  bestDistance = Infinity;
  totalPermutations = factorial(nodes.length);  
  count = 0;
  calculate = true;

  
  for(var i = 0; i < buttons.length; i ++){
    buttons[i].classList.remove('active');
  }

  for(var i = 0; i < nodes.length; i ++){
    let currentNode = nodes[i];
    let nextIndex = i + 1 < nodes.length ? i + 1: 0;
    let temp = [nodes.length];
    temp[i] = 0;
    while(nextIndex != i){
      let nextNode = nodes[nextIndex];
      let distance = dist(currentNode.x, currentNode.y, nextNode.x, nextNode.y);
      temp[nextIndex] = distance;
      nextIndex + 1 < nodes.length ? nextIndex += 1: nextIndex = 0;
    }
    distances[i] = temp;
  }
}

function changeCalculationSpeed(){
   calculationsPerRender = Math.pow(10,speedSlider.value);
   speedSliderText.innerHTML = "Speed: " + speedSlider.value.toString();
}

function changeNumberOfNodes(){
   defaultNumberOfNodes = nodeNumberSlider.value; 
   nodeNumberSliderText.innerHTML = "Nodes: " + defaultNumberOfNodes.toString();
}

function changeStrokeColor(){
  strokeColor = strokeColorInput.value;
  changeNodesColor(nodes, strokeColor, nodeColor);
}

function changeNodeColor(){
  nodeColor = nodeColorInput.value;
  changeNodesColor(nodes, strokeColor, nodeColor);
}

function changeBackgroundColor(){
  backgroundColor = backgroundColorInput.value;
}















function addNode(x ,y){
  if(isActive(addNodeButton)){
    nodes.push(new Node(x, y,  2 * Node.nodeRadius, nodes.length));
    order.push(nodes.length - 1);
    bestOrder = order.slice();
  }
}



function moveNode(index){
  if(index == - 1) return;
  if(isActive(moveNodeButton)){
    nodes[index].move = true;
  }
}




function deleteNode(index){
  if(index == - 1) return;
  if(isActive(deleteNodeButton)){
    nodes.splice(index, 1);
    order.splice(order.indexOf(index), 1);
    nodeIndex = -1;
    // reindex the rest
    for(var i = index; i <  nodes.length; i ++ ){
      nodes[i].id = i;
    }
    for(var i = 0; i < order.length; i ++){
      if(order[i] >= index){
        order[i]-= 1;
      }
    }
    bestOrder = order.slice();
  }
}


function generateRandomNodes(){ 
  nodes = Node.generateRandomNodesArray(defaultNumberOfNodes);
  changeNodesColor(nodes, strokeColor, nodeColor);
  order = [];
  for(var i = 0; i <  defaultNumberOfNodes; i ++){
    order.push(i);
  }
  bestOrder = order.slice();
}

function saveInfo(){
  localStorage.setItem('strokeColor', strokeColor);
  localStorage.setItem('nodeColor', nodeColor);
  localStorage.setItem('backgroundColor', backgroundColor);
 
}


function loadInfo(){
    if(localStorage.getItem('strokeColor') !== null){
      strokeColor = localStorage.getItem('strokeColor');
      strokeColorInput.value = strokeColor;
    }
    if(localStorage.getItem('nodeColor') !== null){
      nodeColor = localStorage.getItem('nodeColor');
      nodeColorInput.value = nodeColor;
    }
    if(localStorage.getItem('backgroundColor') !== null){
      backgroundColor = localStorage.getItem('backgroundColor');
      backgroundColorInput.value = backgroundColor;
    }
}


function resetNodes(){
  nodes = [];
  order = [];
  bestOrder = order.slice();
 }

 function changeNodesColor(nodes, strokeColor, nodeColor){
  for(var i = 0; i < nodes.length; i ++){
    let node = nodes[i];
    node.setStrokeColor(strokeColor);
    node.setNodeColor(nodeColor);
  }
 }
  





 








 // General Methods
 function isActive(element){
  return element.classList.contains('active');
}

function switchButton(){
  let cse = isActive(this);
  for(var i = 0; i < buttons.length; i ++){
    buttons[i].classList.remove('active');
  }
  if(cse == false){
    this.classList.add('active');
  }
}


  
  


  