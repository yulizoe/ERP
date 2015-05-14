// JavaScript Document
$(function(){
	   var readyOpenBtn = $(".readyOpenBtn");//代表已开拓市场下面的按钮
	   var notOpenBtn = $(".notOpen");//未开拓市场下面的按钮
	   var openBtn = $(".openBtn");//开拓中的市场的按钮
	   var notOpenMarket = $("#notOpenMarket");//代表未开拓市场
	   var openMarket = $("#openMarket");//代表正在开拓市场
	   var readyOpenMarket = $("#readyOpenMarket");//代表已开拓市场
	   var copy1 = openMarket.find(".market-bar:eq(0)");
	   var copy2 = notOpenMarket.find(".market-bar:eq(0)");
	   var copy = readyOpenMarket.find(".market-bar:eq(0)");
	  //加载数据
		$.post("market.json",{},function(data){
		    ReadyMarket(data);
			OpenMarket(data);
			NotOpenMarket(data);
	 },"json");//对应于post结束
	
	    $(document).on({
		  "mouseenter":function(){
			$(this).css("background","#d1ba74");
			$(this).find("h2").animate({"fontSize":"20px"},50);
			  },
 	      "mouseleave":function(){
			$(this).css("background","#dbdad6");
			$(this).find("h2").animate({"fontSize":"18px"},50)}             
 	   },".state");//按钮变色
		//将未开拓市场变为开拓中的市场
	    $(document).on("click",".notOpen",function()
		{
			var _hhh2 = $(this).find("h2");
		    var prevHhh2 = $(this).parent().parent().find("h2");
			var marketName = prevHhh2.eq(0).text();
			var removeMarket = $(this).parent().parent(); 
	        var addMarket = copy1.clone("true");//将未开拓市场加入到开拓中市场 	
			$.post("market.json",{"marketName":marketName},function(data){
				removeMarket.remove();
				$(".marketContent2").append(addMarket); 
				var reMarket = $("#openMarket .market-bar"); 
			    var newNum = reMarket.length-1;//进行修改
				//alert(newNum);
		        var newH2 = reMarket.eq(newNum);
					GetImg(data,newNum,openMarket);
					Update(newH2,data);
				},"json");
	    });
			
	     $(document).on("click",".readyOpenBtn",function(){
			 var _h2 = $(this).find("h2");
			 var prevH2 = $(this).parent().parent().find("h2");
			 Submit("market.json", prevH2);
			   if(_h2.text()=="暂停维护")
			  {
				 _h2.text("开始维护");
				 prevH2.eq(2).text("暂停维护");
				 }
			 else
			  {
				_h2.text("暂停维护");
				prevH2.eq(2).text("正在维护");}
			  });
		$(document).on("click",".openBtn",function(){
			  var _hh2=$(this).find("h2");
			  var prevHh2 = $(this).parent().parent().find("h2");
			   Submit("market.json", prevHh2);
			   if(_hh2.text()=="暂停开拓")
			  {
				  _hh2.text("继续开拓");
				  prevHh2.eq(5).text("暂停开拓");
				  }
			  else{
				  _hh2.text("暂停开拓");
				  prevHh2.eq(5).text("正在开拓");
			  }
			  });
		
		//动态添加市场
		function addMarket(state,_market,Copy)
	     {   
			$(_market).empty();
			for(var i=0;i<state.length;i++)
			{
				Copy.clone("true").appendTo(_market);}
	     }
		 //正在开拓市场加载数据	
		 function ReadyMarket(data)
		 {
			 var _firstMarket = data.developedMarket;//进行修改
			     addMarket(_firstMarket,".marketContent1",copy);
				$(_firstMarket).each(function(i,items){
					var ready = readyOpenMarket.find(".market-bar").eq(i);
					readyH2 = ready.find("ul h2");
					GetImg(items,i,readyOpenMarket);
					readyH2.eq(0).text(items.marketName);
					readyH2.eq(1).text(items.maintainCost);
					if(items.status==1)
					{
					 readyH2.eq(2).text("正在维护");
					 ready.find("h2:last").text("暂停维护");}
					else if(items.status==0)
					{
					 readyH2.eq(2).text("暂停维护");
					 ready.find("h2:last").text("开始维护");}
					else return false;
					if(items.lastStatus==1)
					{
					 readyH2.eq(3).text("上期已维护");}
					else if(items.lastStatus==0)
					{
				       readyH2.eq(3).text("尚未维护");}
					  else return false;
					
					}); }//对应于已开拓市场加载数据的函数
			//对应于正在开拓市场加载数据的函数		
		 function OpenMarket(data)
		   {
			 var _secondMarket = data.developingMarket;//进行修改
			      addMarket(_secondMarket,".marketContent2",copy1);
			  $(_secondMarket).each(function(i,items){
				  var Open = openMarket.find(".market-bar").eq(i);
				  GetImg(items,i,openMarket);
				  Update(Open,items);
			  });
		  }
		 //未开拓市场加载数据
		 function NotOpenMarket(data)
		 {
		      var _thirdMarket = data.unDevelopMarket;//进行修改
			     addMarket(_thirdMarket,".marketContent3",copy2);
				
			  $(_thirdMarket).each(function(i,items){
			      var notOpenH2=notOpenMarket.find(".market-bar").eq(i).find("ul h2");
				  GetImg(items,i,notOpenMarket);
				  notOpenH2.eq(0).text(items.marketName);
				  notOpenH2.eq(1).text(items.researchPeriod);
				  notOpenH2.eq(2).text(items.researchCost);
				  notOpenH2.eq(3).text(items.maintainCost);
			});
		 }
		 //判断不同市场获取的图片类型
		 function GetImg(items,i,whichMarket)
		 {
			var getImg = whichMarket.find(".market-bar").eq(i).find("img");
				if(items.marketName=="本地市场"){
				    getImg.attr("src","../../images/native_icon.gif");
				  }
				 else if(items.marketName=="区域市场"){
					 getImg.attr("src","../../images/region_icon.gif");
				  }
				  else if(items.marketName=="国内市场"){
					  getImg.attr("src","../../images/china_icon.gif");
				  }
				  else if(items.marketName=="国际市场"){
					  getImg.attr("src","../../images/internation_icon.gif");
				  }
				  else if(items.marketName=="亚洲市场"){
					  getImg.attr("src","../../images/asian_icon.gif");}
				  else return false; 
			 
		  }
	//点击不同按钮之后提交数据
	 function Submit(url,Data)
	          {
				 var marketName = Data.eq(0).text();
				 $.post(url,{"marketName":marketName},function(){
					},"json"); 
			   }
	//重新加载未开拓市场的数据
	 function  Update(Open,items)
	           {
				  var openHh2 = Open.find("ul h2");
				  openHh2.eq(0).text(items.marketName);
				  openHh2.eq(1).text(items.researchPeriod);
				  openHh2.eq(2).text(items.researchCost);
				  openHh2.eq(3).text(items.finishedPeriod);
				  openHh2.eq(4).text(items.beginTime);
				  if(items.status==1){
				  openHh2.eq(5).text("正在开拓");
				  Open.find("h2:last").text("暂停开拓");
				  }
				  else if(items.status==0)
				  {
				  openHh2.eq(5).text("暂停开拓");
				  Open.find("h2:last").text("继续开拓")}
				  else return false;
				}//对应于ReUpdate函数结束
	/* function CallBack($this)
	  {   
	      var prevHhh2 = $this.parent().parent().find("h2");
		  var marketName = prevHhh2.eq(0).text();		
	      var removeMarket = $this.parent().parent(); 
	      var addMarket = copy1.clone("true");//将未开拓市场加入到开拓中市场  
		  //重新加载正在开拓市场的数据
		   $.post("market1.json",{"marketName":marketName},function(data){
			    
				    var reMarket = $("#openMarket .market-bar"); 
					var newNum = reMarket.length-1;//进行修改
		            var newH2 = reMarket.eq(newNum);
					GetImg(data,newNum,openMarket);
					Update(newH2,data);
			},"json");
				  
	  }//未开拓市场变为已开拓加载数据*/
});//对应于ready结束