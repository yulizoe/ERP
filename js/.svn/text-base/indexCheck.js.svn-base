$(function(){
    $.loginCheck();
    $.createGroup();
});
$.extend({
	/*----------登录页面验证----------*/
	loginCheck:function(){
		//实现index页面复选框变为单选
		$("#page_index :input[type=checkbox]").click(function(){
		$("#page_index :input[type=checkbox]").prop('checked',false);
		$(this).prop('checked',true);
		});
		var _this1;var _this2;var _this3;var _this4;
        var ok1 = false; var ok2 = false; var ok3 = false; var ok4 = false;
        var userCheck=function(_this1){
    	//用户名
            if($(_this1).val().search(/\s+/)==0||$(_this1).val()=='') { $('.errorInfo').empty().append("用户名不能为空").css("color","orange"); ok1=false; }	
            else{
            	ok1 = true;
            }
        /*alert($(_this).val());*/
        };
	    var pswCheck=function(_this2){
		//密码
            if($(_this2).val().search(/\s+/)==0||$(_this2).val()=='') { $('.errorInfo').empty().append("密码不能为空").css("color","orange"); ok2=false; }
            else{ $('.errorInfo').empty(); ok2=true; }	
	    };
        var identifyCheck=function(_this3){
    	//用户身份
            if($(_this3).is(':checked')) { ok3=true; } 	
            else{ ok3=false; }
        };    
        var codeCheck=function(_this4){
    	//验证码
            if($(_this4).val().search(/\s+/)==0||$(_this4).val()=='')	{ $('.errorInfo').empty().append("验证码不能为空").css("color","orange"); ok4=false; }
            else { $('.errorInfo').empty();  ok4=true; }
        };
        var checkAll1=function(){
        	userCheck($('input[name="username"]'));
        	pswCheck($('input[name="password"]'));
        	identifyCheck($('input[name="identify"]'));
        	codeCheck($('input[name="checkcode"]'));
        };    
        $('input[name="username"]').blur(function(){ _this1=$(this); userCheck(_this1); });  
        $('input[name="password"]').blur(function(){ _this2=$(this); checkAll1(); pswCheck(_this2);  });
        $('input[name="identify"]').click(function(){ _this3=$(this); identifyCheck(_this3); }); 
        $('input[name="checkcode"]').blur(function(){ _this4=$(this); codeCheck(_this4); });    
        //提交登录表单
        $('input[name="login"]').click(function(){	
        	$('.errorInfo').empty();
	        if(ok1&&ok2&&ok3&&ok4) { 
	        	var username = $("input[name='username']").val();
				var password = $("input[name='password']").val();
				$.post("loginAction!login.action", {
					"username" : username,
					"password" : password
				}, function(data) {
					alert(data.resultMessage);
					if (eval(data.number) > eval(2)) {
						var browserName = navigator.appName;
						alert("这个时候应该要关闭窗口");
					}
					if (typeof (data.location) != "undefined") {
						location.href = data.location;
					}
				}, "json");
			}
		    else {  return false; }
	    });
	},
	/*----------3.html创建分组验证----------*/
	createGroup:function(){
		var _this;
		var ok1=false;var ok2=false;
		var groupname=function(_this){
			$(_this).next().empty();
			$('.error').empty(); 
		    if($(_this).val().search(/\s+/)==0||$(_this).val()=='') {
		    	var str=$(_this).parents('tr').find('.td1').text();
		    	str=str.replace(/\s+/g,""); 
		    	$('.error').empty().append(str+"不能为空").css("color","orange"); 
		    	ok1=false; 
		    }
			else{  //不为空时，取得输入组名和已存在组名判断
				$.get("info.json",null,function(data){
					$(data).each(function(index){
						if($(_this).val()==data[index].groupName){  //已存在
							$(".error").empty().append("该组名已存在");
							return false;
						}
						key = index;
					});
					alert(key);
					if(key == data.length-1){  //不存在，可以使用
						$(_this).next().empty().append('<img src="../../images/checked.gif">').css("margin-left","3px"); ok1=true;
					}
				},"json");
			}
		};
		var creategroupCheck=function(_this){
			$(_this).next().empty();
			$('.error').empty(); 
		    if($(_this).val().search(/\s+/)==0||$(_this).val()=='') {
		    	var str=$(_this).parents('tr').find('.td1').text();
		    	str=str.replace(/\s+/g,""); 
		    	$('.error').empty().append(str+"不能为空").css("color","orange"); 
		    	ok1=false; 
		    }
		    else if($(_this).not('input[name="groupName"]').val()<=0||$(_this).not('input[name="groupName"]').val()>50) 
		    	{ $('.error').empty().append("规定范围为(0-50)").css("color","orange"); ok1=false; }
		    else if($(_this).val().match(/^[0-9]*[1-9][0-9]*$/)==null) 
		    	{ $('.error').empty().append("请输入正确格式").css("color","orange"); ok1=false; }
		    else { $(_this).next().empty().append('<img src="../../images/checked.gif">').css("margin-left","3px"); ok1=true; }
	    };
		$('input[type="text"]').not('input[name="groupName"]').blur(function(){
		    _this=$(this);
			creategroupCheck(_this);
		});
		$('input[name="groupName"]').blur(function(){ _this=$(this); groupname(_this); });
		$('input[name="create"]').click(function(){
			groupname($('input[name="groupName"]'));
			creategroupCheck($('input[name="number"]'));
			creategroupCheck($('input[name="years"]'));
			creategroupCheck($('input[name="period"]'));
	        if(ok1) { $('form').submit(); alert("created");}
			else{alert("请输入正确信息");}
		});
	}
});
