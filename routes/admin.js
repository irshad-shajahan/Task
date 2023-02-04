var express = require('express');
const userHelpers = require('../helpers/userHelpers');
var router = express.Router();
const admin = {
  id:"admin",
  password:"1234"
}

/* GET users listing. */
router
.route('/')
.get((req,res)=>{
  if(req.session.admin){
    userHelpers.getUsers().then((users)=>{
      console.log(users);
      res.render('adminhome',{users})

    })
  }else{
    res.redirect("/admin/login")
  }
})



router
.route('/login')
.get((req,res)=>{
  if(req.session.admin){
    res.redirect('/admin')
  }
  let msg=req.session.msg1
  res.render('adminlogin',{msg})
})
.post((req,res)=>{
  console.log(req.body);
  if(admin.id==req.body.id && admin.password == req.body.password){
    req.session.admin = true
    res.redirect('/admin')
  }else{
    req.session.msg1="The id or password is incorrect"
    res.redirect('/admin/login')
  }
})

router.get('/logout',(req,res)=>{
  req.session.admin = false
  res.redirect('/admin/login')
})

router.get('/delete-user/:id',(req,res)=>{
  console.log(req.params.id);
  userHelpers.deleteUser(req.params.id).then(()=>{
    res.redirect('/admin')
  })
})

module.exports = router;
