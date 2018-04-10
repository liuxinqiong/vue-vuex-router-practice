// 数组元素交换
function swapItem(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}

var res = swapItem([1, 2, 3, 4], 2, 3);
console.log(res);