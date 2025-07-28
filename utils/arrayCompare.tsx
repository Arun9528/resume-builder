export default function arraysHaveSameMultiset(arr1:string[],arr2:string[]):boolean{
    if(arr1.length !== arr2.length) return false;
    const freq:Record<string,number> = {};
    for(const item of arr1){
        freq[item] = (freq[item] || 0) + 1;
    }
    for(const item of arr2){
        const count = freq[item];
        if(!count) return false;
        if(count === 1){
            delete freq[item];
        }else{
            freq[item] = count - 1;
        }
    }
    return Object.keys(freq).length === 0
}