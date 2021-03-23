
// Node buttons Methods
// -------------------------------------------------------------------------------------------
function addNode(x ,y){
    if(isActive(addNodeButton)){
      nodes.push(new Node(x, y,  2 * Node.nodeRadius, nodes.length));
      order.push(nodes.length - 1);
      bestOrder = order.slice();
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
  
  function moveNode(index){
    if(index == - 1) return;
    if(isActive(moveNodeButton)){
      nodes[index].move = true;
    }
  }
  
  function generateRandomNodes(nbr){
    newNodes = [];
    for(var i = 0; i < nbr; i ++){
      let randX =  random(0+ Node.nodeRadius, width - Node.nodeRadius);
      let randY = random(0 + Node.nodeRadius, height - Node.nodeRadius);
      let node = new Node(randX,randY,  2 * Node.nodeRadius, i);
      newNodes.push(node);
    }
    order = [];
    for(var i = 0; i <  nbr; i ++){
      order.push(i);
    }
    bestOrder = order.slice();
    return newNodes;
  }
  // -------------------------------------------------------------------------------------------
  
  
  


  // Calculation and Order Methods
  // -------------------------------------------------------------------------------------------
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
  
  function nextLexicalOrder(order) {
    count++;
  
    let newOrder = order.slice();
    var largestI = -1;
    for (var i = 0; i < newOrder.length - 1; i++) {
      if (newOrder[i] < newOrder[i + 1]) {
        largestI = i;
      }
    }
    if (largestI == -1) {
      calculate = false;
    }
  
    var largestJ = -1;
    for (var j = 0; j < newOrder.length; j++) {
      if (newOrder[largestI] < newOrder[j]) {
        largestJ = j;
      }
    }
  
    swap(newOrder, largestI, largestJ);
  
    var endArray = newOrder.splice(largestI + 1);
    endArray.reverse();
    newOrder = newOrder.concat(endArray);
    return newOrder;
  }