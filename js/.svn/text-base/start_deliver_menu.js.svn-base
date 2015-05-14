// JavaScript Document
//选项卡的颜色发生改变
  function changeMenu(i){
				var $this = $(".start_ads_ul li").eq(i);
				$this.addClass("li_over");
				$this.children("div").addClass("div2");
				$this.next().addClass("li_next_over");
				$this.prevAll("li").addClass("lli");
				$this.prevAll("li").children("div").addClass("div_over");
		}
$(function(){
	
		//对menu菜单栏的背景颜色进行设置
		
		//选择load进入第一个投放广告的页面
		$(".start_ads_content_left").load("start_selectOrder.html .ads_deliver");
		changeMenu(0);
		i++;
				
	});