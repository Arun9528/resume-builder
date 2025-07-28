export default function SplitColumns(arr:string[]):{left:string[],right:string[]}{
     const left:string[] = [];
     const right:string[] = [];
     arr.forEach((id,i)=>{
        if(i % 2 === 0){
            left.push(id)
        }else{
            right.push(id)
        }
     });
     return {left,right}
}