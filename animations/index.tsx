import { Variants } from "motion"

export const SlideinformLeftParent:Variants = {
    hidden:{x:-100,opacity:0},
    visible:{x:0,opacity:1,transition:{type:"spring",stiffness:300}}
}
export const SlideinformLeftChild:Variants = {
    hidden:{x:-50,opacity:0},
    visible:{x:0,opacity:1,transition:{type:"spring",stiffness:300,when:"beforeChildren",staggerChildren:0.1}},
    exit:{x:-50,opacity:0,transition:{duration:.2}}
}
export const Slideleft:Variants = {
    hidden:{x:-20,opacity:0},
    visible:{x:0,opacity:1,transition:{duration:.2}},
    exit:{x:-20,opacity:0,transition:{duration:.2}}
}