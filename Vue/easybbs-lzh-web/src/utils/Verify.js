const regs={
    email:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    password:/^\S*(?=\S{8,18})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
    number:/^(0|[1-9][0-9]*)$/
}

const verify=(rule,value,reg,callback)=>{
    if(value){
        if(reg.test(value)){
            callback()
    }else{
        callback(new Error(rule.message))
        }
    }else{
        callback()
    }
}

export default{
    email:(rule,value,callback)=>{
        return verify(rule,value,regs.email,callback)
    },
    password:(rule,value,callback)=>{
        return verify(rule,value,regs.password,callback)
    },
    number:(rule,value,callback)=>{
        return verify(rule,value,regs.number,callback)
    },
}