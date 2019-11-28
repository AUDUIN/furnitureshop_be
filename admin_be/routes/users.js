var express = require('express');
// var bcrypt = require('bcrypt');
var router = express.Router();
// var saltRound = 10;  //盐，加密复杂度
var userModel = require('../models/userModel');

var jwt = require('jsonwebtoken');
var secret = 'afdgrthugng';//服务端密钥，加密解密都要使用同一个
router.get('/userinfo',function(req,res){
	console.log(req.query)
	 let {username} = req.query;
	 userModel.find({username:username}).then((result)=>{
		 if(result.length!=0){
			 res.send({
			   code:1,
			   msg:'发送成功',
			   data:result[0]
			 });
		 }else{
			 res.send({
				 code:0,
				 msg:'失败'
			 })
		 }
		 
	 })
})
router.get('/changeimg',function(req,res){
	let{userimgurl,username}=req.query;
	let info = {userimgurl:userimgurl}
	userModel.update({username:username},{userinfo:info}).then((result)=>{
			 res.send({
			   code:1,
			   msg:'发送成功',
			   data:result[0]
			 });
	})
})

router.get('/reg', function(req, res, next) {
    let {username,pwd} = req.query;
    userModel.find({username:username}).then((result)=>{
            if(result.length!=0){ //说明用户名已存在
                res.send({
                  code:0,
                  msg:'用户名已存在'
                });
                return false
            }
            // bcrypt.hash(pwd,saltRound,(err,hashPwd)=>{
                  // if(!err){
                      new userModel({
                        username : username,
                        pwd : pwd,
						userinfo:{userimgurl:"/public/images/wode.png"}
                      }).save().then((result)=>{
                        res.send({
                          code:1,
                          msg:'注册成功'
                        });
                      })
                  // }
            // })
    })
});
router.get('/login', function(req, res, next) {
      let {username,pwd} = req.query;
      userModel.find({username:username}).then((result)=>{
            if(result.length==0){
              res.send({
                code:0,
                msg:'用户不存在'
              });
              return false;
            }
            // let hashPwd = result[0].pwd; //获取用户注册时存入数据库的加密密码，返回的result是一个数组对象
            // bcrypt.compare(pwd,hashPwd,(err,data)=>{
                if(result[0].pwd==pwd){
                  // console.log(req.session)
                  // req.session.login=true;
				
                  let token = jwt.sign({login:true},secret);//生成token下发给登录成功的用户


                  res.send({
                    code:1,
                    msg:'登录成功',
                    data:token,
					userinfo:result[0]
                  });
                }else{
                  res.send({
                    code:0,
                    msg:'密码错误'
                  });
                }
            // })
      })
});

router.get('/token/verify',function(req,res,next){

  jwt.verify(req.query.token,secret,(err,data)=>{
    if(!err){
      res.send({
        code:1,
        msg:'token合法'
      })
    }else{
      res.send({
        code:0,
        msg:'token非法，请重新登录'
      })
    }
  })

})
module.exports = router;
