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
 * Priority queue implementation of a min binary heap. Uses basic array operations instead of actual
 * binary heap implementation with reheapify operations and such.
 */
export default function PriorityQueue2() {
    const heap = [];

    function insert(cell, priority) {
        let newCell = CellWrapper(cell, priority);
        heap.push(newCell);

        // Sort the heap by priority.
        heap.sort((a, b) => {
            return a.priority - b.priority;
        })
    }

    function remove() {
        // Remove the element with the least priority.
        return heap.shift();
    }

    function isEmpty() {
        return heap.length === 0;
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
}