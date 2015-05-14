		
		//静态动态弹窗公用
		$(document).ready(function(){
			//显示灰色 jQuery 遮罩层
			$("#frame_content").contents().find(".main_a").click(
			function showBg() {
			var bh = $(document).height();
			var bw = $(document).width();
			$(".fullbg").css({
			height:bh,
			width:bw,
			display:"block"
			});
			$(".dialog").show();

         //固定滚动条ie下不好看
         /*  window.onscroll=function(){
        document.body.scrollTop = top; 
          } */
		  $("body").css("overflow","hidden");
	
			});
			//关闭灰色 jQuery 遮罩
			$(".close").click(
			function closeBg() {
			$(".fullbg,.dialog").hide();
			//释放滚动条ie下不好看
           /*window.onscroll=function(){
           
                 }*/
			$("body").css("overflow","scroll");
			});
			
     });
	
	 
	 //动态弹窗ajax和自适应
        $(document).ready(function(){
		//第一个动态弹框（弹框名）	
         $("#frame_content").contents().find(".new").click(function ajaxShow(){
			 $(".myDiv").removeAttr("style");
	    htmlobj=$.ajax({
			type:"post",
			url:"new.html",
			dataType:"json",
			async:false
			});
        $(".myDiv").html(htmlobj.responseText);  
		 //弹窗自适应大小 
		 if($(".myDiv").height()>450)
			 {  
				$(".myDiv").css("height","450");
				$(".myDiv").css("overflow-y","scroll");
			 }
			if($(".myDiv").width()>800)
			{ 
				$(".myDiv").css("width","800");
				$(".myDiv").css("overflow-x","scroll");
			}  
			//弹窗标题
			$(".center_title").empty();
			$("<div>新建工厂</div>").appendTo(".center_title"); 
		   });
		   
	   //第二个动态弹框（弹框名）
	    $("#frame_content").contents().find('.rent').click(function ajaxShow(){
			//$(".myDiv").removeAttr("style");
	     htmlobj=$.ajax({
			type:"post",
			url:"rent.html",
			dataType:"json",
			async:false
			});
        $(".myDiv").html(htmlobj.responseText);  
		 //弹窗自适应大
		    if($(".myDiv").height()>450)
			 {  
				$(".myDiv").css("height","450");
				$(".myDiv").css("overflow-y","scroll");
			 }
			if($(".myDiv").width()>800)
			{ 
				$(".myDiv").css("width","800");
				$(".myDiv").css("overflow-x","scroll");
			}  
			//弹窗标题
			$(".center_title").empty();
			$("<div>租用工厂</div>").appendTo(".center_title");
		   });
		   
		   //第三个动态弹框（弹框名）
	    $("#frame_content").contents().find("#line").click(function ajaxShow(){
			$(".myDiv").removeAttr("style");
			alert('a');
	     htmlobj=$.ajax({
			type:"post",
			url:"line.html",
			dataType:"json",
			async:false
			});
        $(".myDiv").html(htmlobj.responseText);  
		 //弹窗自适应大
		    if($(".myDiv").height()>450)
			 {  
				$(".myDiv").css("height","450");
				$(".myDiv").css("overflow-y","scroll");
			 }
			if($(".myDiv").width()>800)
			{ 
				$(".myDiv").css("width","800");
				$(".myDiv").css("overflow-x","scroll");
			}  
			//弹窗标题
			$(".center_title").empty();
			$("<div>新建生产线</div>").appendTo(".center_title");
		   });
		   
		   
	 
});


//让弹窗动态居中
function popup(popupName){
	_windowWidth = $(window).width(),//获取当前窗口宽度
	_popupHeight = popupName.height(),//获取弹出层高度
	_popupWeight = popupName.width();//获取弹出层宽度
	_posiTop = (650 - _popupHeight)/2 ;
	_posiLeft = (_windowWidth - _popupWeight)/2;
	popupName.css({"left": _posiLeft + "px","top":_posiTop + "px","display":"block"});//设置position
}
$(function(){
	$("#frame_content").contents().find(".main_a").click(function(){
		popup($(".dialog"));
		$('.dialog').width()=$('.myDiv').width();
		$(".title").css("width",$('.dialog').width());
	});
	
});

