# ifupload
单文件上传插件，只适合单文件上传
#原理
使用form+iframe来进行post提交，后台接收图片保存返回至iframe
#使用方法
var setting={//设置参数<br>
　　upload_url:"upload.php",//上传路径必传<br>
　　file_types:"jpg,gif,png",//上传的文件类型,用竖线隔开<br>
　　btn_id:"upload_1",//上传的按钮id<br>
　　target_id:"upload_img_1",//显示的目标id<br>
　　btn_class:"uploadCla",//上传的按钮class<br>
　　btn_text:"上传图片",//上传的按钮文字<br>
　　btn_width = 100,//上传的按钮宽度<br>
　　btn_height = 100,//上传的按钮高度<br>
　　loadding = true,//默认为true，可以不需要填写<br>
　　success_fn:function(serverdata){//上传完之后的回调，默认可以为空<br>
　　　　$("#upload_img_1").html('&lt;img src="uploads/'+serverdata.imgUrl+'" /&gt;');<br>
　　}<br>
}<br>
var ifupload = new ifUpload(setting).init();//创建对象<br>
