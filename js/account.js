function loading(url,oData,jsonCallBack){
    $.post(url,oData,jsonCallBack,"json");
}
//accountAction!findAccount.action
function jsonCallBack(data){
	//先清空，后加载select选择框内容
    $("select[name='start_year']").empty();
    $("select[name='start_period']").empty();
    $("select[name='end_year']").empty();
    $("select[name='end_period']").empty();
	//加载select选择框内容
	    for(var i=data.minYear; i<=data.yearInGame; i++){  //从minYear记载到yearInGame
	        $("select[name='start_year']").append("<option>"+i+"</option>");
            $("select[name='end_year']").append("<option>"+i+"</option>");
			//if(i==data.startYear) {$("select[name='start_year'] option").eq(i).attr("selected","true");}
        }
        for(var j=data.minPeriod; j<=data.periodOfYear; j++){  //从minPeriod记载到periodOfYear
	        $("select[name='start_period']").append("<option>"+j+"</option>");
	        $("select[name='end_period']").append("<option>"+j+"</option>");
        }
		$("select[name='start_year'] option").each(function(i){
		    var tar=$("select[name='start_year'] option");
		    if($(tar).eq(i).text()==data.minYear) {$(tar).eq(i).attr("selected","true");}
			//alert($(tar).eq(i).text());
		});
		$("select[name='start_period'] option").each(function(i){
		    var tar=$("select[name='start_period'] option");
		    if($(tar).eq(i).text()==data.minPeriod) {$(tar).eq(i).attr("selected","true");}
			//alert($(tar).eq(i).text());
		});
		$("select[name='end_year'] option").each(function(i){
		    var tar=$("select[name='end_year'] option");
		    if($(tar).eq(i).text()==data.maxYear) {$(tar).eq(i).attr("selected","true");}
		});
		$("select[name='end_period'] option").each(function(i){
		    var tar=$("select[name='end_period'] option");
		    if($(tar).eq(i).text()==data.maxPeriod) {$(tar).eq(i).attr("selected","true");}
		});
	
		//加载表格数据,完全动态
        var m=0;  //每一条记录的第一行的位置
		
        $("tbody").empty();  //表格主体内容清空
       
        var list=data.accountList;
		
        $(data.accountList).each(function(index){
		    var listDetail=data.accountList[index].accountDetailList;
		    var newAccount="";
			//根据每一条记录的借贷数生成tr数
		    for(var i=0; i<listDetail.length; i++){
               newAccount+="<tr></tr>"
			}
			$(".accounting_table tbody").append(newAccount);
			//对刚生成的记录遍历，第一个tr加进6个<td>并设置rowspan，其余tr加进3个<td>
			$(newAccount).each(function(i){
			    if(i==0){	    
				    for(var j=0; j<6; j++){
					    $("tbody tr").eq(m).append("<td></td>");
			        }
				    for(var j=0; j<3; j++){
					    //alert(listDetail.length);
					    $("tbody tr").eq(m).find("td").eq(j).attr("rowspan",listDetail.length);
					}
			    }
				else{
				    for(var t=0; t<3; t++){
					    $("tbody tr").eq(m+i).append("<td></td>");
					}
				}
            }); //添加完一条记录
			
		    //加进每条记录的内容
            $("tr").eq(1+m).find("td").eq(0).text(list[index].accountID);  //编号
            $("tr").eq(1+m).find("td").eq(1).text(list[index].happenTime);  //交易时间
            $("tr").eq(1+m).find("td").eq(2).text(list[index].accountIdDescription);  //描述
           
			$(listDetail).each(function(key){
               if(key==0){
                   $("tr").eq(1+m).find("td").eq(3).text(listDetail[key].item);   
                   $("tr").eq(1+m).find("td").eq(4).text(listDetail[key].itemType);   //类型	
                   $("tr").eq(1+m).find("td").eq(5).text(listDetail[key].money);   //金额
               }
               else{
                   $("tr").eq(1+m+key).find("td").eq(0).text(listDetail[key].item);   
                   $("tr").eq(1+m+key).find("td").eq(1).text(listDetail[key].itemType);   //类型	
                   $("tr").eq(1+m+key).find("td").eq(2).text(listDetail[key].money);   //金额
               }
           });
           m+=listDetail.length;
        });
		
		$(".pageBody").empty();
		if(data.pageCount<10 || data.pageIndex+10>data.pageCount){
			for(var i=0; i<data.pageCount; i++){
				$(".pageBody").append("<a href='#'>"+(data.pageIndex+i)+"</a>");
			}
			/* $(".pageBody a:gt("+(data.pageCount-1)+")").hide();
			thisLast=data.pageCount; */
		} //如果最开始总页数小于10
		else{
			for(var i=0; i<10; i++){
				$(".pageBody").append("<a href='#'>"+(data.pageIndex+i)+"</a>");
			}
		}
		
		thisFirst=parseInt($(".pageBody").find("a:first()").text());  //当前的第一个页数
		thisLast=parseInt($(".pageBody").find("a:last()").text());  //当前的最后一个页数
		alert(thisFirst);
		alert(thisLast);
		
		if(thisFirst==1){ $(".pageTop a").hide(); }
		else{ $(".pageTop a").show(); }
		if(thisLast==data.pageCount){ $(".pageBottom a").hide(); }
		else{ $(".pageBottom a").show(); }
		
		$("#totalRecord").text(data.recordCount);  //总记录数
		$("#totalPage").text(data.pageCount);  //总页数
		$("#currentPage").text(data.pageIndex);  //当前页数
		
		$(".pageBody a").removeClass("current_page");
		$(".pageBody a").each(function(i){  //设置进入页面与pageInde相等的当前页的页码样式
		    if($(".pageBody a").eq(i).text()==data.pageIndex){
			    $(this).addClass("current_page");
			}
		});
}

$(function(){
	//loading("accounting_entries.json",{"minYear":1,"minPeriod":1,"maxYear":1,"maxPeriod":1,"pageIndex":1},jsonCallBack);
	$.ajax({  //写成ajax是不想重复取起始年、周期
		type:"post",
		url:"accounting_entries1.json",
		dataType:"json",
		data:{"minYear":1,"minPeriod":1,"maxYear":1,"maxPeriod":1,"pageIndex":1},
		success:jsonCallBack,
		complete:function(){
			startYear=$("select[name='start_year'] option:selected").text();  //起始年
			startPeriod=$("select[name='start_period'] option:selected").text();  //起始周期
			endYear=$("select[name='end_year'] option:selected").text();   //结束年
			endPeriod=$("select[name='end_period'] option:selected").text();  //结束周期
		}
	});
	//查询
	//点击过查询情况下，点击页码是传这个值
	$(document).on("click",".search_btn",function(){
		startYear=$("select[name='start_year'] option:selected").text();  //起始年
		startPeriod=$("select[name='start_period'] option:selected").text();  //起始周期
		endYear=$("select[name='end_year'] option:selected").text();   //结束年
		endPeriod=$("select[name='end_period'] option:selected").text();  //结束周期
		
		if(startYear==endYear){
		    if(startPeriod<=endPeriod){
			    $(".accounting_table tbody td").empty();
	            loading("accounting_entries1.json",{"minYear":startYear,"minPeriod":startPeriod,"maxYear":endYear,"maxPeriod":endPeriod,"pageIndex":1},jsonCallBack);
			}
			else{
			    alert("请选择正确起止时间！");
			}
		}
		else if(startYear<endYear){
		    $(".accounting_table tbody td").empty();
	        loading("accounting_entries1.json",{"minYear":startYear,"minPeriod":startPeriod,"maxYear":endYear,"maxPeriod":endPeriod,"pageIndex":1},jsonCallBack);
		}
		else{
		    alert("请输入正确起止时间！");
		}
	});
	
	$(".pageTop a").click(function(){
		/* startYear=$("select[name='start_year'] option:selected").text();  //起始年
		startPeriod=$("select[name='start_period'] option:selected").text();  //起始周期
		endYear=$("select[name='end_year'] option:selected").text();   //结束年
		endPeriod=$("select[name='end_period'] option:selected").text();  //结束周期 */
		totalPage=$(this).parents(".pages").find("#totalPage").text();  //记录总页数
		
		$(".pageBody").empty();
		if(thisFirst>10){  //点击向前翻时，之前的页数大于10
			for(var i=0; i<10; i++){
				$(".pageBody").append("<a href='#'>"+(thisFirst-10+i)+"</a>");
			}
		}
		else{
			for(var i=1; i<=10; i++){  //点击向前翻时，之前的页数小于10
				$(".pageBody").append("<a href='#'>"+i+"</a>");
			}
		}
		//alert(thisFirst);
		//alert(totalPage);
		clickPage=$(".pageBody a:first()").text();
		loading("accounting_entries1.json",{"minYear":startYear,"minPeriod":startPeriod,"maxYear":endYear,"maxPeriod":endPeriod,"pageIndex":clickPage},jsonCallBack);
	});
	$(".pageBottom a").click(function(){
		/* startYear=$("select[name='start_year'] option:selected").text();  //起始年
		startPeriod=$("select[name='start_period'] option:selected").text();  //起始周期
		endYear=$("select[name='end_year'] option:selected").text();   //结束年
		endPeriod=$("select[name='end_period'] option:selected").text();  //结束周期 */
		totalPage=$(this).parents(".pages").find("#totalPage").text();  //记录总页数
		
		$(".pageBody").empty();
		if(totalPage-thisLast>10){  //点击向后翻，后面的页数大于10
			for(var i=1; i<=10; i++){
				$(".pageBody").append("<a href='#'>"+(thisLast+i)+"</a>");
			}
		}
		else{
			for(var i=thisLast+1; i<=totalPage; i++){  //点击向后翻，后面的页数小于10
				$(".pageBody").append("<a href='#'>"+i+"</a>");
			}
		}
		clickPage=$(".pageBody a:first()").text();
		loading("accounting_entries1.json",{"minYear":startYear,"minPeriod":startPeriod,"maxYear":endYear,"maxPeriod":endPeriod,"pageIndex":clickPage},jsonCallBack);
	});
	$(document).on("click",".pageBody a",function(){
		/* startYear=$("select[name='start_year'] option:selected").text();  //起始年
		startPeriod=$("select[name='start_period'] option:selected").text();  //起始周期
		endYear=$("select[name='end_year'] option:selected").text();   //结束年
		endPeriod=$("select[name='end_period'] option:selected").text();  //结束周期 */
		clickPage=$(this).text();
		loading("accounting_entries1.json",{"minYear":startYear,"minPeriod":startPeriod,"maxYear":endYear,"maxPeriod":endPeriod,"pageIndex":clickPage},jsonCallBack);
	});
	
});
