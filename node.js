class Node{

    static nodeRadius = 25;
    static lineStrokeWeight = 5;

    

    constructor(x, y, radius, id){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.id = id;


        this.deleteImage = loadImage('res/delete-sign.png');
        this.moveImage = loadImage('res/move-sign.png');
        this.showDelete = false;
        this.showMove = false;
        this.move = false;

        this.strokeColor = "palevioletred";
        this.nodeColor = "white";
        this.textStrokeWeight = 1;
        this.borderStrokeWeight = Node.nodeRadius / 5;
        this.textSize = this.radius / 1.5;
    }

    draw(){

    
        this.update();

        // draws the node
        stroke(this.strokeColor);                       // color of the border
        fill(this.nodeColor);                           // color of the dot
        strokeWeight(this.borderStrokeWeight);          // line thickness of the border
        circle(this.x, this.y, this.radius);  
       
        // draws the text
        textSize(this.textSize);
        textAlign(CENTER, CENTER);
        fill(this.strokeColor);                         
        strokeWeight(this.textStrokeWeight);
        text(this.id, this.x, this.y);

        if(this.showDelete){
            image(this.deleteImage, this.x , this.y  - this.radius , this.radius, this.radius);
        }
        if(this.showMove){
            image(this.moveImage, this.x , this.y  - this.radius , this.radius, this.radius);
        }

    }

    update(){
        if(this.move){
            this.x = mouseX;
            this.y = mouseY;
        }
    }


    isHovered(){
        if(mouseX > this.x - this.radius && mouseX < this.x + this.radius){
            if(mouseY > this.y - this.radius && mouseY < this.y + this.radius){
                return true;
            }
        }
        return false
    }


    // draws each node
    static drawArrayNodes(array){
        for(var i = 0; i < array.length ; i ++){
            array[i].draw();
        }
    }

    // draw the lines between nodes depending on an order array
    static drawArrayLines(array, order, strokeColor){
        strokeWeight(this.lineStrokeWeight);
        stroke(strokeColor);
        for(var i = 0; i < array.length - 1; i ++){
            let nodeA = array[order[i]];
            let nodeB = array[order[i + 1]];
            line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
        }
        let lastNode = array[order[order.length - 1]];
        let firstNode = array[order[0]];
        line(lastNode.x, lastNode.y, firstNode.x, firstNode.y);     
    }

    static generateRandomNodesArray(nbr){
        newNodes = [];
        for(var i = 0; i < nbr; i ++){
            let randX =  random(0+ Node.nodeRadius, width - Node.nodeRadius);
            let randY = random(0 + Node.nodeRadius, height - Node.nodeRadius);
            let node = new Node(randX,randY,  2 * Node.nodeRadius, i);
            newNodes.push(node);
        }
        return newNodes;
    }


 

}