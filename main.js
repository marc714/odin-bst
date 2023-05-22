// https://www.theodinproject.com/lessons/javascript-binary-search-trees
/*
Input: [1,2,3,4,5,6,7]

     4
   /   \
  2     6
 / \   / \
1   3 5   7

Output: 4,2,1,3,6,5,7
*/

class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
    
  }
  
  // Build a Tree class which accepts an array when initialized. The Tree class should have a root attribute which uses the return value of buildTree which you’ll write next.
  class Tree {
    constructor(arr, start, end) {
      this.root = buildTree(arr, start, end)
    }
    
    insertRec(key, root = this.root) {
      if (root === null) return new Node(key); //return the this.insert(xxx) to the root.left or root.right
      if (root.data < key) {
        root.right = this.insert(value, root.right)
      } else {
        root.left = this.insert(value, root.left);
      }
      return root;  // i dont understand why this return root is needed. it breaks if not included.
    }
    
    insert(key){
      let current = this.root;
      
      while(current != null){
      if(key > current.data) {
        if(current.right === null) {
          current.right = new Node(key);
          current = null;
        } else {
          current = current.right;
        }
      } else if(key < current.data) {
        if(current.left === null) {
          current.left = new Node(key);
          current = null;
        } else {
          current = current.left;   
          }      
        }  
      }
    }
    
    delete(key){
      let current = this.root;
      let prior = null;
      let node = null;
      
      while(current != null) {
        if(current.data == key) {
          node = current; // node in tree to delete
          console.log("while(current !=null){node = current}: " + node.data)
          current = null;
          //return current;  // breaks out of the method completely (you wont see console.log("nothign found"))
          console.log(node.data)
        } else if(key < current.data) {
          prior = current;
          current = current.left;
        } else if(key > current.data) {
          prior = current;
          current = current.right;
        } 
      }
      console.log("outside while loop")
          
      // 'node' is the node to delete
      // if node is a leaf node, ie no children (or is root)
      if(node.left === null && node.right === null) {
        if(prior.left == node) {
          prior.left = null;
          return;
        }
        if(prior.right == node) {
          prior.right = null;
          return;
        }
        // if prior doesn't exist, i.e., it's the level 0 root node
        // the below conditions of 1 or 2 child nodes won't matter since we are returning here.
        this.root = null;
        return;
      }
      
      // node with 1 left child
      // refactor: https://javascript.info/logical-operators
      if(node.left != null && node.right == null) {
        if(prior.left == node) {
          prior.left = node.left;
          return;
        }
        if(prior.right == node) {
          prior.right = node.left;
          return;
        }
        // if prior doesn't exist, i.e., it's the level 0 root node
        this.root = node.left;
        return;
      }
        
      // node with 1 right child // have the parent connect to deleted node's child https://youtu.be/wcIRPqTR3Kc?t=164
      if(node.left == null && node.right != null) {
        if(prior.left == node) {
          prior.left = node.right;
          return;
        }
        if(prior.right == node) {
          prior.right = node.right;
          return;
        }
        // if root, then prior doesn't exist
        this.root = node;
        return;
      }
        
      // node with 2 kids: https://youtu.be/wcIRPqTR3Kc?t=223  - replace deleted node with next biggest node
      // remember 'node' is the key to delete
      if(node.left != null && node.right != null) {
        let grandprior = null;
        // 1. go down right side once
        let deleteNode = node; // deleteNode becomes the original node to delete
        console.log("deleteNode = node: " + deleteNode.data)
        // move down right
        node = node.right;
        console.log("move down right of node to delete is. node = " + node.data)
        // if the right side node is a leaf
        if(node.left == null && node.right == null) {
          deleteNode.data = node.data;
          deleteNode.right = null;
          return;
        } else {
          // 2. keep going left till end. prior becomes the leaf once node hits null;
          //console.log("node.left.left.data: " + node.left.left.data)
          while(node != null) {
            if(node.left != null) {
              grandprior = node;
              console.log("node.left !=null is true. grandprior = node. grandprior: " + grandprior.data)
            }
            prior = node;
            console.log("prior = node. prior: " + prior.data)
            node = node.left;
          }
          // replace deleteNode(1) data with prior(2) data
          deleteNode.data = prior.data;
          // remove leaf node (or if it has a right child: https://youtu.be/wcIRPqTR3Kc?t=295 )
          if(prior.left === null && prior.right === null) {
            grandprior.left = null;
          }
          if(prior.right != null) {
            grandprior.left = prior.right; // remember, prior doesn't have a left child here.
          }
          return;
        }   
      } // end of 2 kids  
      
    }
    
    find(key){
      let current = this.root;
      
      while(current != null) {
        if(key === current.data) {
          console.log("Key found in tree");
          return current;
        }
        if(key < current.data) {
        current = current.left;
        } else if(key > current.data) {
          current = current.right;
        }
      }
      console.log("key not found in tree");
      return current;
    }
    
    _plusOne(node){
      node.data = node.data + 1;
    }
    
    // Write a levelOrder function which accepts another function as a parameter. levelOrder should traverse the tree in breadth-first level order and provide each node as the argument to the provided function. This function can be implemented using either iteration or recursion (try implementing both!). 
    // breadth first: https://youtu.be/dfaKCrJ2HAk?t=778
    // for depth first traversal: https://youtu.be/fPz40W9mfCg?t=322
    
    // my levelOrder
    levelOrder(callBack){
      
      const queue = [this.root]; // FIFO, queue nodes here
      const results = []; // print node.data
         
      // instructions want: levelOrder traverse the tree to push nodes as the arg into the callback
      // or do it my way below:
      
      // the forEach might be skipping  // why are we doing a double reiteration..
      while(queue.length) {      
        queue.forEach(element => {      
          if(element.left != null) {
            queue.push(element.left)
            console.log(element.left.data)
          }
          if(element.right != null) {
            queue.push(element.right)
            console.log(element.right.data)
          }
          results.push(element.data);
          
          //callback here - if callBack is true, run here where we pass each 'element' as the argument into the callback:
          if(callBack) callBack(element);
          
          //remove first element
          queue.shift();
        })
      }
      console.log(results)
    }
    
    levelOrderNew(callback) {
      let result = []
      let queue = []
      
      queue.push(this.root)
      
      while(queue.length) {
        let currentNode = queue.shift()
        
        if(callback) {
          callback(currentNode); // uses the object (not object.data) as the callback argument
          result.push(currentNode.data)
        } else {
          result.push(currentNode.data)
        }
        
        if(currentNode.left) {
          queue.push(currentNode.left)
        }
        if(currentNode.right) {
          queue.push(currentNode.right)
        }
      }
      
  //     if(callback) {
  //       console.log("callback true")
  //       result.forEach(element => {
  //         console.log(element)
  //         callback(element);
          
  //       })
  //     }
      
      return result;
    }
    
    
    // Write inorder, preorder, and postorder functions that accept a function parameter. Each of these functions should traverse the tree in their respective depth-first order (as they are all depth first traversal methods) and yield each node to the provided function given as an argument. The functions should return an array of values if no function is given.
    
    // https://youtu.be/gm8DUJJhmY4?t=754
    // https://youtu.be/BHB0B1jFKQc?t=282  this one is good
    ////  pre          Nlr
    ////  in "inside"  lNr
    ////  post         lrN
    
    // left Node right   // https://youtu.be/6JeuJRqKJrI?t=777
    // https://github.com/bananabread08/binary-search-tree/blob/main/Tree.js
    inOrder(){
      let current = this.root;
      let result = [];
      
      function traverse(node) {
        // if left child exist, go left again
        if(node.left) traverse(node.left)
        
        // capture root node value
        result.push(node.data)
        
        // if right child exist, go right again
        if(node.right) traverse(node.right)
      }
      
      traverse(current)
      console.log("Left NODE Right")
      return result;
    }
    
    // https://www.youtube.com/watch?v=gm8DUJJhmY4
    // NODE left right 
    preOrder(){
      let current = this.root;
      let result = [];
      
      function traverse(node) {
        if(node === null) return;
        
        result.push(node.data);
        if(node.left) traverse(node.left)
        if(node.right) traverse(node.right)
      }
      
      traverse(current)
      console.log("NODE Left Right")
      return result;
    }
    
    // left right NODE
    postOrder(){
      let current = this.root;
      let result = [];
      
      function traverse(node) {
        if(node === null) return;
        
        if(node.left) traverse(node.left)
        if(node.right) traverse(node.right)
        result.push(node.data)
      }
      traverse(current)
      console.log("Left Right NODE")
      return result;
    }
    
    // Write a height function which accepts a node and returns its height. Height is defined as the number of edges in longest path from a given node to a leaf node.
    // https://www.youtube.com/watch?v=_pnqMz5nrRs&ab_channel=mycodeschool
    // height of leaf is 0. height of root is same as height of tree
    height(nodeDataValue){
      //let height;
      let root = this.find(nodeDataValue)
      
      function findHeight(node) {
        if(node === null) return -1
        
        let left = findHeight(node.left)
        let right = findHeight(node.right)
        
        console.log("left: " + left)
        console.log("right: " + right)
        // return height = Math.max(left, right) + 1; // was missing the 'return' hence getting NaN errors.
        return Math.max(left, right) + 1; // was missing the 'return' hence getting NaN errors.
      }
      
      //console.log(findHeight(root));
      return findHeight(root);
      //console.log(height);
      //return height;
    }
    
    // Write a depth function which accepts a node and returns its depth. Depth is defined as the number of edges in path from a given node to the tree’s root node.
    depth(nodeDataValue){
      let current = this.root; // assign var to this memory-address
      let counter = 0;
      if(current.data == nodeDataValue) return 0; // var.data pooints to memory-address.data
      console.log("hello" + current.data)
         
      while(nodeDataValue != current.data) {
        if(nodeDataValue < current.data) {
          current = current.left;
        } else if(nodeDataValue > current.data) {
          current = current.right;
        }
        counter++
      }
      return counter;
         
      // while(current != null) {
      //   if(nodeDataValue < current.data) {
      //     current = current.left;
      //     counter++
      //     if(current.data == nodeDataValue) return counter;
      //   } else if(nodeDataValue > current.data) {
      //     current = current.right;
      //     counter++
      //     if(current.data == nodeDataValue) return counter;
      //   }
      // }
    }
    
    // Write a isBalanced function which checks if the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.
    isBalanced(tree = this.root){
      let left;
      let right;
      
      if(tree.left == null) left = -1;
      if(tree.right == null) right = -1;
      
      if(tree.left) left = this.height(tree.left.data);
      if(tree.right) right = this.height(tree.right.data);
      
      console.log("balanced? left: " + left)
      console.log("balanced? right: " + right)
      
      if(left - right == 0 || right - left == 0) return "tree is balanced";
      if(left - right == 1 || right - left == 1) return "tree is balanced";
      
      return "tree is unbalanced";
    }
    
    // Write a rebalance function which rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.  
    reBalance(){
      let myNodes = this.preOrder();
      this.root = buildTree(myNodes, 0, myNodes.length-1)
    }
  }
  
  // Write a buildTree function which takes an array of data (e.g. [1, 7, 4, 23, 8, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
  // my notes: array has to be sorted. Or make a function pre sorts.
  // start = index 0, end = array.length-1
  function buildTree(arr, start, end) {
    if (start > end) return null; // returns null as value. whereas return just exits loop
    let mid = Math.floor((start + end)/2);
    let node = new Node(arr[mid]);
  
    node.left = buildTree(arr, start, mid-1); // keep recursively running to return middle node to the parents node.left value to make connection
    node.right = buildTree(arr, mid+1, end); // keep recursively running to return middle node to the parents node.right value to make connection
  
    return node;
  }
  
  // for levelOrder callback (not using node.data since we already pushed data into results[])
  function _plusOne(element) {  // it has to be node.data otherwise you're just reassigning a variable.
      element.data = element.data + 1;
  }
  
  /////test: printPrint(myTree.root)
  prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }


  // test comments.