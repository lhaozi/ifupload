/**
author lhaozi
create 20160810
**/
function ifUpload(opt){
	this.upload_url = opt.upload_url || "";//上传路径必传
	this.file_types = opt.file_types || "jpg|gif|png";//上传的文件类型,用竖线隔开
	this.btn_id = opt.btn_id;//上传的按钮id
	this.target_id = opt.target_id;//上传的按钮id
	this.btn_class = opt.btn_class;//上传的按钮id
	this.btn_text = opt.btn_text;//上传的按钮文字
	this.btn_width = opt.btn_width || 200;//上传的按钮宽度
	this.btn_height = opt.btn_height || 40;//上传的按钮高度
	this.loadding = opt.loadding || true;//是否需要loading默认为true
	this.success_fn = opt.success_fn || "";
	this.isActive=true;//激活file按钮
}
ifUpload.prototype.create=function(){//创建upload核心方法
	var This=this;
	var uploadHtml = '<div id="'+This.btn_id+'_div" style="position:relative; width:'+This.btn_width+'px;height:'+This.btn_height+'px">'
						+'<form action="'+This.upload_url+'" method="post" name="'+This.btn_id+'_form" id="'+This.btn_id+'_form" style="width:100%; height:100%; filter:alpha(opacity=0);filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);-webkit-opacity:0;opacity:0; position:absolute; left:0; top:0; overflow:hidden;" target="'+This.btn_id+'_iframe" enctype="multipart/form-data" >'
						+'<input type="file" id="'+This.btn_id+'_file" name="file_val" style="display:block; width:100%; height:100%; position:absolute;cursor:pointer;font-size:100px;filter:alpha(opacity=0);filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);"  dir="rtl" />'
						+'</form>'
						+'<a href="javascript:void(0);"  class="'+This.btn_class+'" id="'+This.btn_id+'_btn">'+This.btn_text+'</a>'
						+'<iframe id="'+This.btn_id+'_iframe" name="'+This.btn_id+'_iframe" style="display:none;"></iframe>'
					+'</div>'; 
	$("#"+This.btn_id).html(uploadHtml);
}
ifUpload.prototype.btnStyle=function(){//给按钮增加样式
	var This = this;
	var btnCon = $('#'+This.btn_id+'_div');
	var btn = $('#'+This.btn_id+'_btn');
	btnCon.hover(function(){
		btnCon.addClass(This.btn_class+"_hover");
	},function(){
		btnCon.removeClass(This.btn_class+"_hover");
	});
}
ifUpload.prototype.handler=function(){//绑定上传的事件
	var This = this;
	var input = $('#'+This.btn_id+'_file');
	var form = $('#'+This.btn_id+'_form');
	var btn = $('#'+This.btn_id+'_btn');
	var targetid = $("#"+This.target_id);
	var checkType=function(vals){
		var fileFormat=/\.[a-zA-Z]+$/.exec(vals)[0].substring(1);
		var isTrue=true;
		if(This.file_types.indexOf(fileFormat)<=-1){
			isTrue=false;
		}
		return isTrue;
	}
	var loadding=function(){
		if(This.loadding){
			btn.text("上传中...");
		}
	}
	input.on("click",function(e){
		if(!This.isActive) e.preventDefault();
	})
	input.on("change",function(){
		var th=$(this);
		var vals=th.val();
		This.isActive=false;
		if(!checkType(vals)){
			alert("文件格式不正确");
			return;
		}
		loadding();
		form.submit();
	});
	$('#'+This.btn_id+'_iframe').load(function(){
		if(!This.isActive){
			var json=eval('('+$('#'+This.btn_id+'_iframe').contents().find("body").html()+')');
			btn.text(This.btn_text);
			if(typeof(This.success_fn)=="function"){
				This.success_fn(json);
			}else{
				targetid.html('<img src="uploads/'+json.imgUrl+'" />');
			}
		}
		This.isActive=true;
	});
	
}
ifUpload.prototype.init=function(){
	var This=this;
	This.create();
	This.btnStyle();
	This.handler();
}