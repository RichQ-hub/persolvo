
/**
 * Factory function for creating an object storing a cell along with its priority.
 */
function CellWrapper(cell, priority) {
    return {
        cell,
        priority,
    }
}

/**
 * Priority queue implementation of a min binary heap.
 */
export default function PriorityQueue() {
    const heap = [null]; // Add a dummy element at index 0 (We are making our array 1-indexed).

    function insert(cell, priority) {
        // Wrap the cell in a wrapper to include the priority in it.
        let newCell = CellWrapper(cell, priority);

        // Insert the new node at the end of the array.
        heap.push(newCell);

        // Reheapify (move up) the newCell to be in the correct position.

        let currentIdx = heap.length - 1; // Index of the newly inserted cell (which is at the end of the heap).

        // Traverse upwards until the newCell's priority is less than its parent.
        while (currentIdx > 1 && heap[Math.floor(currentIdx / 2)].priority > heap[currentIdx].priority) {
            // Swap the current cell and it's parent (using destructuring).
            [heap[Math.floor(currentIdx / 2)], heap[currentIdx]] = [heap[currentIdx], heap[Math.floor(currentIdx / 2)]];

            // Set the current to the parent now.
            currentIdx = Math.floor(currentIdx / 2);
        }
    }

    function remove() {
        // Get the min element.
        let top = heap[1];

        if (heap.length === 2) {
            // If there is only 1 item in the heap, we simply pop it and don't have to swap it 
            // with the last element (since there is none).
            heap.pop();
            return top.cell;
        } else if (heap.length === 1) {
            // There are no items in the heap, thus we simply return undefined.
            return undefined;
        } else {
            // Otherwise, we have more than 1 item in the heap, we swap the top with the bottom, 
            // while removing the bottom.
            heap[1] = heap.pop();
        }

        // Try to move down the new top into the correct position.
        let currentIdx = 1;
        
        // So long as the currentIdx has children, we keep trying to move our top node to the 
        // correct position.
        while (2 * currentIdx <= heap.length - 1) { // This condition checks if there is at least a left child.
            let leftChildIdx = 2 * currentIdx;
            let rightChildIdx = 2 * currentIdx + 1;

            let smallestChildIdx = leftChildIdx;

            // Choose the smallest child.
            if (leftChildIdx < heap.length - 1 && heap[leftChildIdx].priority > heap[rightChildIdx].priority) {
                smallestChildIdx = rightChildIdx;
            }

            // If the currentIdx priority is less than the smallest child's priority (smallestChildIdx), we
            // break out of the loop, since we satisfied the min heap property. 
            if (heap[currentIdx].priority < heap[smallestChildIdx].priority) break;

            // Swap the current with its child.
            [heap[currentIdx], heap[smallestChildIdx]] = [heap[smallestChildIdx], heap[currentIdx]];
            
            // Set the currentIdx to the new index where we swapped it to.
            currentIdx = smallestChildIdx;

        }

        // Return the cell.
        return top.cell;
    };

    function isEmpty() {
        return heap.length === 1;
    }

    function getPriorityQueue() {
        return heap;
    }

    return {
        insert,
        remove,
        isEmpty,
        getPriorityQueue,
    }
};

/** 
 * Note about heaps:
 * Let's say we have a cell called current at index = i.
 *      current's parent idx =  i / 2
 *      current's left child idx = 2i
 *      current's right child idx = 2i + 1
 */

// Inspiration: https://blog.bitsrc.io/implementing-heaps-in-javascript-c3fbf1cb2e65

