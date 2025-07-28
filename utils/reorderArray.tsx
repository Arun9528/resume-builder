export default function ReorderArray(arr:string[],refOrder:string[]):string[]{
    if(!Array.isArray(arr)) return [];
    const inOrder = arr.filter(item => refOrder.includes(item));
    const notInOrder = arr.filter(item => !refOrder.includes(item));
    inOrder.sort((a,b)=> refOrder.indexOf(a) - refOrder.indexOf(b));
    return [...inOrder,...notInOrder]
}