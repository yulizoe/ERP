$(function(){
	$.joinGroup();
	$.groupManage();
});
$.extend({
	joinGroup:function(){
        //4.html加入小组
        //加载小组信息
	    var username="wangxinyu";
	    $('td').find('input').prev().removeClass("tab_span2").empty();
	    $('input[name="add"]').removeAttr("style");
        $.post("table.json",{},function(data){
    	    $('input[name="add"]').attr("disabled","disabled");
            for(var key in data){
        	    var size=data.length;
                if(key<size) { 
                	var tar=$('td').eq(key).find('input');
                	
            	    $(tar).prev().empty();
                    $(tar).prev().addClass("tab_span1 tab_span2");
                    //$(tar).removeAttr("disabled").css("cursor","pointer");
                    $(tar).removeAttr("disabled").attr("style",{"cursor":"pointer"});
                    var sp1='<p class="common tab_p1">'+data[key].groupName+'</p>';
                    var sp2='<p class="common tab_p2">'+"未开始比赛"+'</p>';
                    var sp3='<p class="common tab_p3">'+'<span id="joined">'+(data[key].userNumbers-data[key].remandNumber)+'</span>';
                    sp3+="/";
                    sp3+='<span id="totalNum">'+data[key].userNumbers+'</span>'+'</p>';
                    $(tar).prev().append(sp1,sp2,sp3);
                }
            }
        },"json");
        //实现4页面的添加按钮背景改变
	    $("#page_4_tab input").mouseover(function(){
		    $(this).css("background","url(../../images/ico_add.jpg)");}).mouseout(function(){
		    $(this).css("background","url(../../images/ico_add.png)")});
	    //点击加入小组，传userID,groupName	
        $('input[name="add"]').click(function(){
            var str=$(this).prev().find(".tab_p1").text();
            $.post("info.json",{"userID":username,"groupName":str},function(objson){ alert("success joined"+str); },"json");
        }); 
    },
    groupManage:function(){
    	//6.html小组管理
    	var size=4;
	    var total=10;
	    var value;     //size是已有人数，total是设置的人数，value是user.json的赋值
	    //头部信息展示
    	$.post("table.json",{},function(data){
    		for(var key in data){
    			$('.header_tab td').eq(0).text("组名："+data[key].groupName);
    			$('.header_tab td').eq(1).text("创建人："+data[key].groupCreaterId);
    			$('.header_tab td').eq(2).text("比赛持续年数："+data[key].years);
    			$('.header_tab td').eq(3).text("每年包含周期数："+data[key].periodsOfOneYear);
    		}
        });
        //实现5页面表格和资料卡悬浮显示   
        //显示等待        
        $.post("user.json",{},function(obj){
         	for(var i=0;i<total;i++){ $('.left_tab td').eq(i).css("background","url(../../images/pic_wait.jpg) no-repeat"); }
           	value=obj;
           	
            //
            // authro hhy
            // 运行在循环之前,先将所有的属性置空才行.
            //
           	$('.left_tab td').empty();   	
          
            //中间表格内容展示
            $(value).each(function(indx){
           	var targ1=$('.left_tab td').eq(indx);
 //$(targ1).empty();
      		var sp1='<p></p>';
      		var userId=value[indx].userID;
      		//动态头像
            var sum=0;
	        for(i=0;i<userId.length;i++){
	 	        sum=sum+userId.charCodeAt(i);
	        }
	        var j=sum%7+1;//7是头像的总数

     		sp1+='<img src="../../images/pic_meb'+j+'.jpg" />';
   			sp1+='<span></span>';
   			$(targ1).append(sp1);
      		$(targ1).find('p').append('<input type="checkbox" name="checkbox" class="left_check" />');
      		$('.left_tab').find('input').eq(indx).attr("value",value[indx].userID);
      		$(targ1).find('span').text(value[indx].name);
           	});
           	$('.left_tab td').eq(0).find('p input').hide();
           	$('.unique td').find('p input').hide();
            //悬浮框资料卡显示
           	$(".container_5 .left .left_tab td img").mouseover(function(){
			    var x=75; 
	            var y=50;  
	            var _this=$(this);    
	            $.each(obj,function(indx){
		             $('.left_infor').remove();
		        	 var s="";
		        	 s+='<div class="left_infor"></div>';
		      	     $('.left_tab').after(s);
		             var w=$(_this).offset().left+x;
		             var h=$(_this).offset().top+y;
		             $('.left_infor').css({"left":w+"px","top":h+"px","display":"block"});
   			         var sp2='<p class="left_infor_p1"></p>';
   			         for(var i=0;i<5;i++){ sp2+='<p></p>'; }
   			         $('.left_infor').append(sp2);
    			     if($(_this).next().text()==obj[indx].name){
    			         var targ2=$(_this).parents('.left_tab').next();
    			         $(targ2).find('p:eq(0)').text("用户名："+obj[indx].name);
    			         $(targ2).find('p:eq(1)').text("真实姓名："+obj[indx].name);
    			         $(targ2).find('p:eq(2)').text("专业："+obj[indx].major);
    	                 $(targ2).find('p:eq(3)').text("班级："+obj[indx].className);
    		             $(targ2).find('p:eq(4)').text("联系电话："+obj[indx].tel);
    		             $(targ2).find('p:eq(5)').text("邮箱："+obj[indx].email);
   			             return false;
   			         }
  			    });
			});
           $(".container_5 .left .left_tab td img").mouseout(function(){ $(".left_infor").css("display","none"); });   	 
        },"json");   
        //删除小组
       $('input[name="remove_member"]').click(function(){
           var str="";
           $(".left_tab input").each(function(one){
               if($('.left_tab input').eq(one).is(":checked")) { str+=$('input').eq(one).val()+","; }
           });
           if(str=="") alert("请选择删除内容");
           else{ $.post("user.json",{"userID":str},function(){ alert("submited"); },"json"); }
       });
    }
});