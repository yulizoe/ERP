// JavaScript Document
$(document).ready(function(){
var test=function(){	
   $.getJSON("startdeliveryform.json",function(data){
	   //alert('a');
	  loadTable(data);
	//getJSON结束	
    });
}
test();
//加载表格	
 var loadTable=function(data){
	 //alert('a');
   // $('table tr:gt(0)').empty();
	   //奇数行变色
	$("tr:odd").css("background","#F4F4F4");
	    //table里加入数据
	$(data).each(function(index){
		//判断超出表格行的范围就自动生成tr开始
		if(data.length>$("tr").length-1){
		  for(var i=0;i<data.length-$("tr").length+2;i++){	
          var newTr=$("tr").eq(2).clone(true);
		  $(newTr).clone(true).appendTo("table");
		   //奇数行变色
		  $("tr:odd").css("background","#F4F4F4");
		  }
		 //判断超出表格行的范围就自动生成tr结束
		}
		//加载值
	    var oTr=$("table tr").eq(index+1);
		var totalNumber=data[index].price*data[index].pNumber;
		oTr.find("td").eq(0).text(data[index].orderID);
		oTr.find("td").eq(1).text(data[index].marketName);
		oTr.find("td").eq(2).text(data[index].needTime);
		oTr.find("td").eq(3).text(data[index].productName);
		oTr.find("td").eq(4).text(data[index].pNumber);
		oTr.find("td").eq(5).text(data[index].price);
		oTr.find("td").eq(6).text(totalNumber);
		oTr.find("td").eq(7).text(data[index].moneyTime);
		oTr.find("td").eq(8).text(data[index].penalPercent);
		oTr.find("td").eq(9).empty().append("<input type='button' value='交货' />").attr('id',index);
		var id=data[index].orderID;
		//向后台提交值开始
		$("#"+index).click(function(){
			//alert(this.id);
			//alert(data[index].orderID);
			//给前台提示开始
			 $.getJSON("errorMessage.json",{"orderID" : id},
			  function(data){
				  alert(data.errorMessage);
				 //$('table tr:gt(3) td').remove();
				  //$("tr:gt(4)").remove();
				  //$('table tr:gt(0) td').empty();
				  //location.reload();
				  oTr.find("td").parent("tr").remove();
				  $("tr:odd").css("background","#F4F4F4");
				  $("tr:even").css("background","#FFF");
				  //test();
				  });
			 //给前台提示结束
		//click结束
	     });
		
	//each结束  
	  });
	 }	
});