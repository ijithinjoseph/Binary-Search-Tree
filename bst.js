class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  class Tree {
    constructor(treeArray) {
      this.treeArray = treeArray;
      this.root = this.buildTree(treeArray);
    }
    buildTree(array) {
      let copyArray = array;
      copyArray.sort((a, b) => a - b);
      copyArray = [...new Set(copyArray)];
  
      let start = 0;
      let end = copyArray.length - 1;
      const tree = this.createTree(copyArray, start, end);
      return tree;
    }
    createTree(array, start, end) {
      if (start > end) return null;
      const mid = Math.floor((end + start) / 2);
      const newNode = new Node(array[mid]);
      newNode.left = this.createTree(array, start, mid - 1);
      newNode.right = this.createTree(array, mid + 1, end);
      return newNode;
    }
    insert(value) {
      const newNode = new Node(value);
      let current = this.root;
      while (current.left !== null || current.right !== null) {
        if (current.data === newNode.data) return;
        else if (current.data > newNode.data) {
          if (current.left === null) {
            current.left = newNode;
          } else {
            current = current.left;
          }
        } else {
          if (current.right === null) {
            current.right = newNode;
          } else {
            current = current.right;
          }
        }
      }
  
      if (current.data === newNode.data) return;
      else if (current.data > newNode.data) {
        current.left = newNode;
      } else {
        current.right = newNode;
      }
    }
  
    deleteItem(value) {
      let current = this.root;
      let lastNode;
      let replaceNode;
      let directionNode;
      while (current !== null && current.data !== value) {
        lastNode = current;
        if (current.data > value) {
          current = current.left;
          directionNode = "left";
        } else {
          current = current.right;
          directionNode = "right";
        }
      }
      if (current === null) return;
      else if (current.left === null && current.right === null) {
        if (directionNode === "right") {
          lastNode.right = null;
        } else {
          lastNode.left = null;
        }
      } else if (current.right !== null && current.left !== null) {
        replaceNode = current;
        replaceNode = replaceNode.right;
        while (replaceNode.left !== null) {
          lastNode = replaceNode;
          replaceNode = replaceNode.left;
        }
        const nodeValue = replaceNode.data;
        this.deleteItem(replaceNode.data);
        current.data = nodeValue;
      } else {
        if (directionNode === "left") {
          if (current.left === null) {
            lastNode.left = current.right;
          } else {
            lastNode.left = current.left;
          }
        } else {
          if (current.left === null) {
            lastNode.right = current.right;
          } else {
            lastNode.right = current.left;
          }
        }
      }
    }
    find(value) {
      let current = this.root;
      while (current !== null && current.data !== value) {
        if (current.data > value) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return current;
    }
    levelOrder(callback) {
      const answerArray = [];
      const notDiscoverArray = [];
      let current = this.root;
      function levelOrderRecursive(node) {
        if (node !== undefined) {
          if (callback) {
            callback(node);
          }
        }
        if (node === undefined) return answerArray;
        if (node.left !== null) notDiscoverArray.push(node.left);
        if (node.right !== null) notDiscoverArray.push(node.right);
  
        const firstNode = notDiscoverArray.shift();
        answerArray.push(firstNode.data);
        if (node === undefined) return answerArray;
        levelOrderRecursive(notDiscoverArray[0]);
      }
      notDiscoverArray.push(current);
      let answer = levelOrderRecursive(current);
      if (!callback) {
        return answerArray;
      } else {
        return;
      }
    }
    preOrder(callback) {
      const answerArray = [];
      let root = this.root;
  
      function preOrderRecursive(current) {
        if (current === null) return;
        if (callback) {
          callback(current);
        }
        answerArray.push(current.data);
        preOrderRecursive(current.left);
        preOrderRecursive(current.right);
      }
  
      preOrderRecursive(root);
      return answerArray;
    }
    inOrder(callback) {
      const answerArray = [];
      let root = this.root;
      function inOrderRecursive(current) {
        if (current === null) return;
        inOrderRecursive(current.left);
        if (callback) {
          callback(current);
        }
        answerArray.push(current.data);
        inOrderRecursive(current.right);
      }
      inOrderRecursive(root);
      if (!callback) return answerArray;
      else return;
    }
    postOrder(callback) {
      const answerArray = [];
      let root = this.root;
  
      function postOrderRecursion(current) {
        if (current === null) return;
        postOrderRecursion(current.left);
        postOrderRecursion(current.right);
        if (callback) {
          callback(current);
        }
        answerArray.push(current.data);
      }
      postOrderRecursion(root);
      return answerArray;
    }
    height(node) {
      let count = 0;
      function heightRecursive(currentNode, count) {
        if (currentNode === null) return count;
        else {
          count++;
          return Math.max(
            heightRecursive(currentNode.left, count),
            heightRecursive(currentNode.right, count)
          );
        }
      }
      const num = heightRecursive(node, count);
      return num - 1;
    }
  
    depth(node) {
      let count = 0;
      let current = this.root;
      while (current !== null && current.data !== node.data) {
        count++;
        if (current.data > node.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      if (current === null) return null;
      return count;
    }
    isBalanced() {
      function isBalancedRecursively(current) {
        if (!current) {
          return [true, -1];
        }
        const [leftBalanced, leftHeight] = isBalancedRecursively(current.left);
        const [rightBalanced, rightHeight] = isBalancedRecursively(current.right);
  
        const heightDiff = Math.abs(leftHeight - rightHeight) <= 1;
        const currentBalanced = leftBalanced && rightBalanced && heightDiff;
        const currentHeight = Math.max(leftHeight, rightHeight) + 1;
        return [currentBalanced, currentHeight];
      }
      const [isTreeBalanced, _] = isBalancedRecursively(this.root);
      return isTreeBalanced;
    }
    rebalanced() {
      if (this.isBalanced()) return;
      const newArray = this.inOrder();
      const newTree = this.buildTree(newArray);
      console.log(newArray);
      this.treeArray = newArray;
      this.root = newTree;
    }
  
    prettyPrint(node, prefix = "", isLeft = true) {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        this.prettyPrint(
          node.right,
          `${prefix}${isLeft ? "│   " : "    "}`,
          false
        );
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    }
  }
  
  function addTwo(node) {
    node.data = node.data + 2;
  }
  const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const exerciseArray = [36, 34, 32, 40, 20, 30, 50, 70, 60, 65, 80, 75, 85];
  const treeTest = new Tree(array);
  let firstNode = treeTest.root;
  treeTest.insert(700);
  treeTest.insert(657);
  treeTest.levelOrder();
  const node = treeTest.find(5);
  treeTest.preOrder();
  treeTest.levelOrder();
  treeTest.inOrder();
  treeTest.postOrder();
  treeTest.prettyPrint(firstNode);
  treeTest.height(node);
  treeTest.depth(node);
  console.log(treeTest.isBalanced());
  treeTest.rebalanced();
  console.log(treeTest.isBalanced());
  let secondTime = treeTest.root;
  treeTest.prettyPrint(secondTime);