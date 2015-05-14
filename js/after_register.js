// JavaScript Document
$(function(){	
  /*--实现窗口始终最大化--*/
	var w = screen.width;
	var h = screen.height;
	window.moveTo(0, 0);
	window.resizeTo(w, h);
	$(".main").css("width",w);
	var x=$(".main").width();
	$("body").css("width",w);
	
	//动态展示菜单
        var state=1;
         if(state==1) {
                $('#li1,#li3,#li4').hide();           
                $('#li2').click(function(){
                    	$('#li1,#li3,#li4').fadeIn();
                });
         }
	
    //对after_register页面选项进行设置
     $("#left_ull li:eq(2)").addClass("first_li");
     $("#left_ull li:gt(2)").addClass("lli");
     $("#left_ull li:lt(2)").addClass("lli");
	
		//点击选项卡背景变化
	    $("#left_ull li").click(function(){
		$(this).removeClass("lli").addClass("first_li").siblings().removeClass("first_li").addClass("lli");});
		
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
		if(w < 1200){
			w = 1200;
		} 
		$(".main,.header,body").width(w);
	}
});