// JavaScript Document
$(function(){
	//实现index页面复选框变为单选
		$("#page_index :input[type=checkbox]").click(function(){
		$("#page_index :input[type=checkbox]").prop('checked',false);
		$(this).prop('checked',true);
		});
	//实现4页面的添加按钮背景改变
	$("#page_4_tab input").mouseover(function(){
		$(this).css("background","url(../../images/ico_add.jpg)");}).mouseout(function(){
		$(this).css("background","url(../../images/ico_add.png)")});
	//实现5页面的资料卡悬浮显示
    /*        var x=75; 
	         var y=50;
			 $(".container_5 .left .left_tab td img").mouseover(function(){
			var w=$(this).offset().left+x;
			var h=$(this).offset().top+y;
			$(".left_infor").css({"left":w+"px","top":h+"px","display":"block"});
			});
			$(".container_5 .left .left_tab td img").mouseout(function(){
				$(".left_infor").css("display","none");
				});
		*/		
    //登录表单验证
    var ok1 = false; var ok2 = false; var ok3 = false; var ok4 = false;
	//用户名
    $('input[name="user"]').blur(function(){
        if($(this).val()=='') { $('.errorInfo').empty().append("用户名不能为空").css("color","orange"); }	
        else{
        	var username=$(this).val();
		    $.post("info.json", {"username":username}, function(data){
		    	    var val=data[0].username;
				    if(val==username) { ok1=true; $('.errorInfo').empty(); }
				    else{ $('.errorInfo').empty().append("用户名不存在").css("color","orange"); }
	        },"json");
        }
        /*alert($(this).val());*/
    });
    //密码
    $('input[name="password"]').blur(function(){
            if($(this).val()=='') {
                    $('.errorInfo').empty().append("密码不能为空").css("color","orange");	
            }
            else{ $('.errorInfo').empty(); ok2=true; }	
    });
    //用户身份
    $('input[name="identify"]').click(function(){
            if($(this).is(':checked')) { ok3=true; } 	
    });
    //验证码
    $('input[name="code"]').blur(function(){
            if($(this).val()=='')	{
                       $('.errorInfo').empty().append("验证码不能为空").css("color","orange");
            }
            else { $('.errorInfo').empty();  ok4=true; }
    });    
    //提交登录表单
    $('input[type="button"]').click(function(){
	    if(ok1&&ok2&&ok3&&ok4) { $('form').submit(); }
		else { return false; }
	});
	});