function loading(url,oData,jsonCallBack){
    $.post(url,oData,jsonCallBack,"json");
}

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
		

	    //页码
		$(".page_click").empty();
		//生成点击页数
		//页数最多显示10页,否则就显示上一页，下一页
		if(data.pageCount>10){
		    $(".page_click").append("<a href='#' class='prev'>"+"上一页"+"</a>");
			for(var i=0; i<9; i++){
				$(".page_click").append("<a href='#'>"+(i+1)+"</a>");
			}
			$(".page_click").append("<span class='hide'>....</span>");
			$(".page_click").append("<a href='#'>"+data.pageCount+"</a>");
			$(".page_click").append("<a href='#' class='next'>"+"下一页"+"</a>");
		}
		else{
			for(var i=0; i<data.pageCount; i++){
				$(".page_click").append("<a href='#'>"+(i+1)+"</a>");
			}
			$(".page_click a").eq(0).addClass("current_page");
		}
		
		//设置进入页面与pageInde相等的当前页
		$(".page_click a").each(function(i){
		    if($(".page_click a").eq(i).text()==data.pageIndex){
			    $(this).addClass("current_page");
			}
		});
		
		$("#totalRecord").text(data.recordCount);
		$("#totalPage").text(data.pageCount);
		$("#currentPage").text(data.pageIndex);
}

$(function(){
    
	loading("accounting_entries.json",{"minYear":1,"minPeriod":1,"maxYear":1,"maxPeriod":1,"pageIndex":3},jsonCallBack);
	//查询
	$(document).on("click",".search_btn",function(){
		startYear=$("select[name='start_year'] option:selected").text();  //起始年
		startPeriod=$("select[name='start_period'] option:selected").text();  //起始周期
		endYear=$("select[name='end_year'] option:selected").text();   //结束年
		endPeriod=$("select[name='end_period'] option:selected").text();  //结束周期
		
		if(startYear==endYear){
		    if(startPeriod<=endPeriod){
			    $(".accounting_table tbody td").empty();
	            loading("accounting_entries.json",{"minYear":startYear,"minPeriod":startPeriod,"maxYear":endYear,"maxPeriod":endPeriod,"pageIndex":1},jsonCallBack);
			}
			else{
			    alert("请选择正确起止时间！");
			}
		}
		else if(startYear<endYear){
		    $(".accounting_table tbody td").empty();
	        loading("accounting_entries.json",{"minYear":startYear,"minPeriod":startPeriod,"maxYear":endYear,"maxPeriod":endPeriod,"pageIndex":1},jsonCallBack);
		}
		else{
		    alert("请输入正确起止时间！");
		}
		
	});
	
	//点击页数
	$(document).on("click","a",function(){
		startYear=$("select[name='start_year'] option:selected").text();  //起始年
		startPeriod=$("select[name='start_period'] option:selected").text();  //起始周期
		endYear=$("select[name='end_year'] option:selected").text();   //结束年
		endPeriod=$("select[name='end_period'] option:selected").text();  //结束周期

		var clickPage=$(this).text();    //点击页数，即要跳转的页数
		$(".page_click a").removeClass("current_page");
		$(this).addClass("current_page");
		$(".page_click a").each(function(i){  //当前的页数
			if($(".page_click a").eq(i).hasClass("current_page")){
			    //alert($(".page_click a").eq(i).text());
				var currentPage=$(".page_click a").eq(i).text();
			}
	    });
		//点击上一页、下一页传的页数
		$(".accounting_table tbody td").empty();
		if(clickPage=="上一页"){
		    clickPage=currentPage-1;
		}
		else{
		    clickPage=currentPage+1;
		}
		loading("accounting_entries1.json",{"minYear":startYear,"minPeriod":startPeriod,"maxYear":endYear,"maxPeriod":endPeriod,"pageIndex":clickPage},jsonCallBack); 
	});
	
});
