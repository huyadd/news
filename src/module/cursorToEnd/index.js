//input内容光标移至最末尾
export default function(input){
    let len = input.value.length
    input.setSelectionRange(len,len)
}