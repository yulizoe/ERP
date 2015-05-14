// JavaScript Document
var pageSize = 14;//每页所展示记录条数
var pageIndex = 1;//定义全局pageIndex变量，记录当前第几页
//判断是否已经选择订单种类
/*function ChooseType(){
	var state=$("#search option:checked").val();
	if(state=="订单状态"){
		$("#orderInforTab tr:gt(0)").find("td").empty();//清空原内容
		$(".orderInfor span a").css("background","none");
		alert("请先选择所要查询的订单状态");
		$("#totalNumber,#totalPages").text(0);
		$("#presentPage").text(1);
		return false;
		}
	 else return true;
}*/
//初始加载全部订单
findMaterialOrders();
//判断选择何种订单
function WhichOrder(){
	 var value=$("#search option:checked").val();
	 if(value=="未到货订单")
	   return 1;
	  else if(value=="已到货订单")
	  return 0;
	  else if(value=="全部订单")
	  return 2;
	}
//展示菜单
function findMaterialOrders(){
	$("#orderInforTab tr:gt(0)").find("td").empty();//清空原内容
	var item = WhichOrder();
	$.post("purchase.json",
	      {"item":item,
		   "pageSize":pageSize,
		   "pageNumber":pageIndex},function(data){
		    $("#totalNumber").text(data.sum);//总记录数
		    if(data.sum%14){
		       var pages = parseInt(data.sum/14)+1;}
		    else{ 
		             var pages = parseInt(data.sum/14);}
	                 $("#totalPages").text(pages);//总页数
		             if(pageIndex>pages){
			             $("#presentPage").text(pages);
			             alert("请选择正确页码");
			             pageIndex = pages;}
		             else{
		    //获取到表格内的数据
		   var orderInfor = data.materialOrdersReach;
		   $(orderInfor).each(function(index,items){
			     var orderInforTr = $("#orderInforTab tr").eq(index+1);
			     orderInforTr.find("td:eq(0)").text(items.orderId);
				 orderInforTr.find("td:eq(1)").text(items.materialName);
				 orderInforTr.find("td:eq(2)").text(items.materialNumber);
				 orderInforTr.find("td:eq(3)").text(items.wareHouseName);
				 orderInforTr.find("td:eq(4)").text(items.happenTime);
				 orderInforTr.find("td:eq(5)").text(items.endTime);
			});//each
		   }//else结束
		  $("#presentPage").text(pageIndex);//当前页数
		},"json");//post
	}//函数结束

$(function(){
	//设置查询按钮背景
	$(".searchOrder input,.start_viewOrder_bottom input").on({
	  "mouseenter":function(){
		  $(this).css("background","#D1BA74");},
	   "mouseout":function(){
		  $(this).css("background","#DBDAD6");}
		  });
	 //选择订单状态
	 $("input[name='search']").click(function(){
		  var orderState=$("#search option:checked").val();
		    $(".orderInfor span a").eq(0).css("background","#DBDAD6").siblings().css("background","none");
			pageIndex = 1;
		    findMaterialOrders();
		    $("#presentPage").text(1);

	});//click结束
	
     $(document).on("click",".orderInfor a",function(){
		 $(".orderInfor a,#nextPage,#prePage,#totalPages").css("background","none");
		 $(this).css("background","#DBDAD6");
		 var orderState=$("#search option:checked").val();
			 pageIndex = $(this).text();//获取点击页数
	         findMaterialOrders();
		});//点击可显示的页码
	$("#prePage").on("click",function(){
		$(".orderInfor a").css("background","none");
		    pageIndex--;
			if(pageIndex<1){
				$("#presentPage").text(1);
				alert("当前已经是第一页展示记录");
				pageIndex = 1;}
			else{
				var item = WhichOrder();
		         findMaterialOrders();}
		});//点击上一页
	$("#nextPage").on("click",function(){
		  $(".orderInfor a").css("background","none");
		  pageIndex++;
		  findMaterialOrders();

		});//点击下一页
	
});