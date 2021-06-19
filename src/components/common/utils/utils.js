export function debouce(fn,delay=500){
    let timer = null
    return function(...args) {
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn(...args)
        },delay)
    }
}