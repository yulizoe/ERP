// JavaScript Document
$(function(){
   /*--实现窗口始终最大化--*/
	var w = screen.width;
	var h = screen.height;
	window.moveTo(0, 0);
	window.resizeTo(w, h);
	/*$(".content,.content_left,.conent_right").css("height",h-150);*/
	//实现最小宽度
	$(window).resize(function(){
		 minWidth();
	});
	//初始化时
	$(function(){
		 minWidth();
	});
	function minWidth(){
		var w = $(window).width();
		var h = $(window).height();
		if(w < 1366){
			w = 1366;
		} 
		$(".content,.header,.body_all").width(w);
	    }
	    $(".content_left_dl").height(h-50);
		$(".year_footer p").width(w-181);//完全延伸减179兼容ie6,所减宽度不可再小
	});
	
//对左边菜单栏进行设置
$(function(){
	//header 对刷新及修改信息按钮进行点击设置
	$(".tab_td1,.tab_td2").mouseover(function(){
		$(this).css("background","#395988");
		}).mouseout(function(){$(this).css("background","#12385F");});
	
	//当鼠标移至菜单栏时都变成手形
	$(".content_left dd,.content_left dt").hover(function(){
		$(this).css("cursor","pointer");
		});
	
	//对第一个选项进行设值
	$(".content_left dt:first").addClass("dl_first").find("div").css("display","none");
	    var left_dt = $(".content_left dt:not(:last)");
	    var left_dt_all = $(".content_left dt");
		
	//对其余一级菜单的点击进行设置
	        left_dt_all.click(function(){
		  $(".content_left div").css({"display":"block","background":"#355A86"});
          $(this).find("div").css("display","none");//对图标点亮进行设置
		  });
	
	//当鼠标移到一级菜单时背景加深，移除后恢复
    	left_dt.hover(function(){
			    if(!$(this).hasClass("dl_first")&&!$(this).hasClass("dl_change")){
				   $(this).addClass("dl_change_2");
			       $(this).find("div").css("background","#20466D");}
			  },function(){
				  if(!$(this).hasClass("dl_first")&&!$(this).hasClass("dl_change")){
			        $(this).removeClass("dl_change_2");
			        $(this).find("div").css("background","#355A86");}
		});
	   
	   //点击一级菜单
	  left_dt.click(function(){
		//var dl = $(this).parent();
		$(".content_left").find(".dl_change").siblings("dd").slideUp(300);    //点击其它项目，原来展开的列表收起
		$(".content_left dt:first").removeClass("dl_first");//去除第一个的点击效果
		$(".content_left").find("dt").removeClass("dl_change");//控制别的dt的背景恢复原样，不可以放在下面
		
		var dds=$(this).siblings("dd");
		$(this).addClass("dl_change").removeClass("dl_change_2");//变换背景图片同时去除鼠标移上去时的效果
	
	//对二级菜单的可见性进行设置
		if(dds.is(":visible")){
			dds.slideUp(300);//列表上升
			}
		  else{
			 dds.slideDown(300);//列表拉出
			}
		 });
	//对二级菜单的鼠标移入移出进行设置
	$("dd").hover(function(){
		$(this).addClass("dd_bgcolor");
		},function(){
			$(this).removeClass("dd_bgcolor");
		});
	//当点击二级菜单时背景发生改变
	$("dd").click(function(){
		$(".content_left dl dd").removeClass("dd_bgcolor_2");
		$(this).addClass("dd_bgcolor_2");
		});
	//对最后一个退出进行设置
	var last = $(".content_left dt:last");
	last.hover(function(){
		  $(this).addClass("dl_last");
		  $(this).find("div").css("background","#732030");//点亮图标
		},function(){
		 
		 $(this).removeClass("dl_last");
		 $(this).find("div").css("background","#355A86");
		});
    //对遮罩层宽高设置及显示
	var bh = $(document).height();
	var bw = $(document).width();
	$(".fullbg").css({
	        height:bh,
			width:bw,
			display:"none"
			});
 //点击退出竞赛
     last.click(function(){
		left_dt.removeClass("dl_change");
		$(".content_left dt:first").removeClass("dl_first");
		//对弹出遮罩层及对话框进行设置
		$(window).scrollTop(0);
		$("body").css("overflow-y","hidden");
		popup($(".dialog"));//固定弹窗
		$(".fullbg,.dialog").show();
		$(".dialog").css("border","1px solid #E32D3C");
		$(".center_title").css("background","#E32D3C");
		$(".close input").css("background","#F4606C");
		$(".myDiv").empty().append("<p class='common popupFont font_color'>确认退出竞赛？</p><p class='enter_p2 common'><input type='button' value='确认' id='exitAll' class='sureBtn common_1 exitBgcolor common_border common_color' /></p>");
		//确认退出比赛跳转至登录界面
		$("#exitAll").on("click",function(){
			window.location.href ="../../index.html" ;
		});

	});

//点击弹窗右上角的退出
	  $(".close").click(function(){
		$(".fullbg,.dialog").hide();
		$("body").css("overflow","scroll");
		});	
	
});
//主页面固定弹出窗函数
   function popup(popupName){
	  _windowWidth = $(window).width(),//获取当前窗口宽度
	  _popupHeight = popupName.height(),//获取弹出层高度
	  _popupWeight = popupName.width();//获取弹出层宽度
	   if(_popupHeight>450)
	   {  
		 myDiv.css("height","450");
		 myDiv.css("overflow-y","scroll");}
		if(_popupWeight>800)
		{ 
		    myDiv.css("width","800");
			myDiv.css("overflow-x","scroll");} 
	  _posiTop = (650- _popupHeight)/2 ; 
	  _posiLeft = (_windowWidth - _popupWeight)/2;
	  popupName.css({"left": _posiLeft + "px","top":_posiTop + "px"});//设置position
} 

//主页面右上角，小组信息
$(function(){
	$.get("userinfo.json",null,function(data){
		var sum=0;
        for(i=0;i<data.userId.length;i++){
        	sum=sum+data.userId.charCodeAt(i);
        }
        var j=sum%7+1;
		
		$("#userName").text(data.username);  //用户名
		$("#currentTime").text("第"+data.year+"年，第"+data.period+"期");  //当前时间
		$(".tab_td3 img").attr("src","../../images/pic_meb"+j+".jpg");  //头像
	},"json");
});