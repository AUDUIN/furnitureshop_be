var express = require('express');
var router = express.Router();
var multer  = require('multer')
var goodsModel = require('../models/goodsModel.js')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    let oname = file.originalname.split('.');
    let len = oname.length;
    let ext = oname[len-1]; //图片后缀
    let imgname = new Date().getTime() + parseInt(Math.random() * 9999)
    cb(null, `${imgname}.${ext}`)
  }
})

var upload = multer({ storage: storage })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/profile', upload.single('avatar'), function (req, res, next) {
  console.log(req.file)
  res.send({
    code:1,
    msg:'上传成功',
    imgSrc: `/public/images/${req.file.filename}`
  })
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据，如果存在的话
})
router.get('/goods/list',function(req,res){
	goodsModel.find().then((result)=>{
		console.log(result)
		res.send({
			code:1,
			msg:'请求成功',
			data:result
		})
	})
	
})
router.get('/goods/pub',function(req,res){
	// res.send(req.query)
	let {goodsname,price,newprice,info,imgurl,content}=req.query
	new goodsModel({
		key:Math.random()*1000,
		goodsname,
		price,
		newprice,
		info,
		imgurl,
		content
	}).save().then((result)=>{
		res.send({
			code:1,
			msg:'ok'
		})
	})
})

module.exports = router;
