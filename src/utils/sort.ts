/**
 * 数组排序方法
 * @param {*} order order
 * @param {*} index index
 * @param {*} direction direction
 * @returns {*} any
 */
export function sortArray(order, index, direction): any {
  let prevIndex = order[index - 1],
    targetIndex = order[index],
    nextIndex = order[index + 1];

  switch (direction) {
    case 'up':
      if (index - 1 < 0) {
        return;
      }
      order[index - 1] = targetIndex;
      order[index] = prevIndex;
      break;
    case 'down':
      if (index + 1 > order.length) {
        return;
      }
      order[index + 1] = targetIndex;
      order[index] = nextIndex;
      break;
  }

  return order;
}
