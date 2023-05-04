
export default function Queue() {
    const queue = [];

    function enqueue(cell) {
        queue.push(cell);
    };

    function dequeue() {
        return queue.shift();
    }

    function size() {
        return queue.length;
    }

    function getQueue() {
        return queue;
    }

    return {
        enqueue,
        dequeue,
        size,
        getQueue,
    };
};