  
function nextLexicalOrder(order) {
  count++;

  let newOrder = order.slice();
  var largestI = -1;
  for (var i = 0; i < newOrder.length - 1; i++) {
    if (newOrder[i] < newOrder[i + 1]) {
      largestI = i;
    }
  }

  //  replaced with that because we only need the permutations with the first number because it is circular.

  if(largestI == 0) calculate = false;

  // if (largestI == -1) {
  //   calculate = false;
  // }

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

