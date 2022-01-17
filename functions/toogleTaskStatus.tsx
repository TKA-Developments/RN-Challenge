import editTasks from "./editTasks"

export default async function toogleTaskStatus(data:any){
    let newdata = {
        ...data,
        finish:!data.finish
    }
    try{
        await editTasks(data,newdata)
        return true
    }catch{
        return false
    }
}