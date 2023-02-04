const db= require('../config/connection')
const bcrypt = require("bcrypt"); 
const { ObjectId } = require('mongodb');

module.exports={
    signup:(data)=>{
        return new Promise(async(resolve,reject)=>{
            data.password = await bcrypt.hash(data.password, 10);

            user={
                name:data.name,
                email:data.email,
                password:data.password,
                aadhar:data.aadhar,
                pan:data.pan,
                dob:data.dob,
                gender:data.gender,
                image:data.image,
                age:data.userage
            }
            let check =await db.get().collection('user').findOne({email:data.email})
            console.log(check);
            if(check){
                 resolve("user already exist")

            }else{
                db.get().collection("user").insertOne(user).then((data)=>{
                    resolve(data)
                })
            }
        })
    },
    login:(data)=>{
        let response ={}
        return new Promise(async(resolve,reject)=>{
            let user = await db.get().collection('user').findOne({email:data.email})
            if(user){
                bcrypt.compare(data.password,user.password).then((status)=>{
                    if(status){
                        response.status=status
                        response.msg=null
                        response.user=user
                        resolve(response)
                    }else{
                        response.msg="The entered password is wrong"
                        resolve(response)
                        response.status=status
                    }
                })
            }else{
                response.status=false
                response.msg="The user does not exist"
                resolve(response)
            }
        })
    },
    getUsers:()=>{
        return new Promise(async(resolve,reject)=>{
           let users= await db.get().collection('user').find().toArray()

                resolve(users)
            
        })
    },
    deleteUser:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('user').deleteOne({_id:ObjectId(id)}).then((res)=>{
                resolve(res)
            })
        })
    }
}