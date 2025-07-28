interface ColorCircleProps{
    inner:string,
    outer:string
}
export default function ColorCircle({inner,outer}:ColorCircleProps){
    return (
        <div className={`size-8 rounded-full outline-8 cursor-pointer`} style={{backgroundColor:inner,outlineColor:outer}}/>
    )
}