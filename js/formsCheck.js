﻿$(function(){
    $.loginCheck();
    $.registerCheck();
});

$.extend({
	/*----------登录页面验证----------*/
	loginCheck:function(){
		//实现index页面复选框变为单选
		$("#page_index :input[type=checkbox]").click(function(){
		$("#page_index :input[type=checkbox]").prop('checked',false);
		$(this).prop('checked',true);
		});
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
            if($(this).val()=='') { $('.errorInfo').empty().append("密码不能为空").css("color","orange"); }
            else{ $('.errorInfo').empty(); ok2=true; }	
        });
        //用户身份选择
        $('input[name="identify"]').click(function(){
            if($(this).is(':checked')) { ok3=true; } 	
        });
        //验证码
        $('input[name="code"]').blur(function(){
            if($(this).val()=='')	{ $('.errorInfo').empty().append("验证码不能为空").css("color","orange"); }
            else { $('.errorInfo').empty();  ok4=true; }
        });    
        //提交登录表单
        $('input[type="button"]').click(function(){
	        if(ok1&&ok2&&ok3&&ok4) { $('form').submit(); }
		    else { return false; }
	    });
	},
	/*----------注册页面验证----------*/
	registerCheck:function(){
		var ok1 = false;var ok2 = false;var ok3 = false;var ok4 = false;var ok5 = false;var ok6 = false;
	    var showRight=function($str){
            $str.next().empty().append('<img src="../../images/checked.gif" />').css("padding-left","8px");
        };
        var showError=function($str){
    	    var temp='请输入正确'+$str.parents('tr').find('.space').text();
    	    temp=temp.replace(/\s+/g,"");
	        $str.next().empty().append(temp).css("color","orange").css("padding-left","8px");
        };
        var allReady=function(){
            if(!(ok1&&ok2&&ok3&&ok4&&ok5&&ok6)) { $('input[name="register"]').attr("disabled","disabled").removeClass("readyYes").addClass("readyNo"); }
     	    else{ $('input[name="register"]').removeAttr("disabled").removeClass("readyNo").addClass("readyYes"); }	
        };	
	    //验证用户名
	    $('input[name="user"]').blur(function(){
		    if($(this).val()==''){ showError($(this)); ok1=false; } 
		    else{
		        var user=$('input[name="user"]').val();
                $.post("info.json",{"username":user},function(data){
            	    var val=data[0].check;
                    if(val==true) {$('input[name="user"]').next().empty().append("用户名已存在").css("color","orange").css("padding-left","8px"); } 
                    else{ $('input[name="user"]').next().empty().append('<img src="../../images/checked.gif" />').css("padding-left","8px"); ok1=true;}
        	    },"json"); 
            }
            allReady();
	    });
	    //验证真实姓名、专业、密码
	    $('input[name="name"],input[name="major"],input[name="password"]').blur(function(){
	        if($(this).val()=='') { showError($(this)); ok2=false; }									        
		    else { showRight($(this)); ok2=true; }   
		    allReady();
	    });
	    //验证电子邮箱
	    $('input[name="mail"]').blur(function(){
	        if($(this).val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)==-1) {
		        showError($(this));
		        ok3=false;
		    }
		    else { showRight($(this)); ok3=true; }
		    allReady();
	    });
	    //验证班级、联系方式、学号
	    $('input[name="class"],input[name="telephone"],input[name="stu_number"]').blur(function(){
	        if($(this).val().search(/^\d+$/)==-1){ showError($(this)); ok4=false; }   
		    else {	showRight($(this)); ok4=true; }
		    allReady();
	    });
	    //验证确认密码
	    $('input[name="confirm"]').blur(function(){
	        if(($(this).val()==$('input[name="password"]').val()) && ($(this).val()!='')) {
			    showRight($(this));
			    ok5=true;
		    }									        
		    else { showError($(this)); ok5=false; }   
		    allReady();
	    });
	    //验证是否同意协议
	    $('input[name="agree"]').click(function(){
	        if($(this).is(":checked")) { ok6=true; }
	        else{ ok6=false; }
	        allReady();										
	    });
	    //提交表单前的检查
	    $('input[name="register"]').click(function(){
	        if(ok1&&ok2&&ok3&&ok4&&ok5&&ok6) { $('form').submit(); }
		    else { return false; }
	    });
	}
});