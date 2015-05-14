// JavaScript Document
$(function(){
	//设置聊天室的显示与隐藏
      function hideChartRoom(){
	        $("#ads_div2").hide();
	        var oDiv1 = document.getElementById('ads_div1');
            var oDiv2 = document.getElementById('ads_div2');
            var Timer = null;
            oDiv1.onmouseover = oDiv2.onmouseover=function()
			{
	            oDiv2.style.display = 'block';
	            clearTimeout(Timer);
	        }
            oDiv1.onmouseout = oDiv2.onmouseout = function()
            {    
	             Timer = setTimeout(function(){
		         oDiv2.style.display ='none';},300);
			};
			//对聊天室的定位进行设置，视情况而定是否需要
			$(".start_ads_content_right").css("right","12px");
      }
	 
	//设置选择订单以后消失订单
	function deleteOrder(){
	$(".first_tr input[name=check]").click(function(){
		 $(this).parent().parent().parent().parent().parent().remove();
		});
	}
	//设置订单选择以后颜色变浅,选择订单按钮消失
	/*$(".selectOrder_div div>table:lt(3)").mouseover(
	    function(){
		 $(this).next("p").css("display","block");
		  var button = $(this).find("input");
	      button.css("display","none");
		  $(this).addClass("checked");
		});*/
});
$(function(){
	//对订单里面的内容进行动态添加
	 $.ajax({
	      type:"POST",
		  url:"deliver_form.json",
		  dataType:"json",
		  data:{},
		  success: function(data){
			$(data).each(function(index){
			         var oTabs=$(".selectOrder_div  table").eq(index);
					 var totalNumber=data[index].price*data[index].pNumber;
					  oTabs.find("span").eq(0).text("订单编号："+data[index].orderID);
			          oTabs.find("td").eq(1).text("市场："+data[index].marketName);
					  oTabs.find("td").eq(2).text("总计金额："+totalNumber);
					  oTabs.find("td").eq(3).text("产品："+data[index].productName);
					  oTabs.find("td").eq(4).text("交货日期："+data[index].needTime);
					  oTabs.find("td").eq(5).text("数量："+data[index].pNumber);
					  oTabs.find("td").eq(6).text("货款日期："+data[index].MoneyTime);
					  oTabs.find("td").eq(7).text("单价："+data[index].price);
					  oTabs.find("td").eq(8).text("罚金率："+data[index].penalPercent);
					  oTabs.find("td").eq(9).text("特别说明："+data[index].specialRem);
				
		        
				});//对应于each函数结束
			 }//对应于success函数结束
			
		
	 });
});
	












