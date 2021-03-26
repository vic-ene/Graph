
function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  
  function factorial(n) {
    if (n == 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }

  function randomColor(){
    let r = int(random(255));
    let g = int(random(255));
    let b = int(random(255));
    let color = "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
    return color;
  }
  