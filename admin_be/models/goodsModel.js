const mongoose = require('mongoose') //【1】引入mongoose模块
const Schema = mongoose.Schema; 
const goodsSchema = new Schema({  //【2】创建表结构对象
    'goodsname':String,
    'price':String,
	'newprice':String,
    'info': String,
    'imgurl': String,
	'content':String,
	'key':String
})
const goodsModel = mongoose.model('goodsModel',goodsSchema) //【3】根据表结构生成一个用以操作表的数据模型对象
module.exports = goodsModel; //【4】对外抛出model方法
