const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const state = {
    db:null
}

module.exports.Connect = function(done){
    const url= process.env.DATABASE
  
    const dbName = 'Task'
    MongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db = data.db(dbName)
        done()
    })
}

module.exports.get=function(){
    return state.db
}