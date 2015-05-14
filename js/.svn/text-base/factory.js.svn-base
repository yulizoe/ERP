//加载生产线数据
    function Line(data,target,lines,index,i,num){
		for(var j=0; j<lines[i].productLineType.length; j++){
			num+=lines[i].productLineType.charCodeAt(j);
		} //计算生产线图片
		$(target).find(".lineType img").attr("src","../../images/factory/"+num+".jpg");
		$(target).find(".lineType span").text(lines[i].productLineType); //生产线类型

		var status=lines[i].status;  //生产线状态
		if(status==0 || status==1){
			$(target).find(".finishedPeriod").html("已完成周期：<span>"+lines[i].finishPeriod+"</span>");  //生产线已完成安装周期
			$(target).find(".workingPro").html("将生产的产品：<span>"+lines[i].productName+"</span>");  
			if(status==0){
				$(target).find(".lineStatus span").text("正在安装");
			}
			else{
				$(target).find(".lineStatus span").text("暂停安装");
			}
		}
		else if(status==2 || status==3 || status==4){
			$(target).find(".finishedPeriod").html("已生产周期：<span>"+lines[i].productFinishPeriod+"</span>");  //产品已生产周期
			$(target).find(".workingPro").html("正在生产产品：<span>"+lines[i].productName+"</span>");  //正在生产产品
			
			if(status==2){
				$(target).find(".lineStatus span").text("正在生产");
			}
			else if(status==3){
				$(target).find(".lineStatus span").text("暂停生产");
			}
			else if(status==4){
				$(target).find(".lineStatus span").text("待生产");
				$(target).find("input[name='changePro']").removeClass("cursorAuto").removeAttr("disabled");  //能点击转产
				$(target).find("input[name='sell']").removeClass("cursorAuto").removeAttr("disabled");  //此状态下可以出售
			}
		}
		else if(status==5 || status==6){
			$(target).find(".finishedPeriod").html("已转产周期：<span>"+lines[i].finishPeriod+"</span>");  //生产线已完成转产周期
			$(target).find(".workingPro").html("正在转产产品：<span>"+lines[i].productName+"</span>");  //正在转产产品
			if(status==5){
				$(target).find(".lineStatus span").text("正在转产");
			}
			else{
				$(target).find(".lineStatus span").text("暂停转产");
			}
		}
		else return;
		
		$(target).find("input[name='hidden']").val(lines[i].productLineId);  //储存生产线编号
		$(target).find("input[name='hiddenStatus']").val(lines[i].status);   //储存生产线状态
	}
	
//加载全部厂房数据的方法
	function upDate(url,oData,backUp1,backUp3){
		
	    $.post(url,oData,function(data){
		    obj=data;
		    //所有厂房先清空后加载
		    $(".workshop").empty();
			
			var factoryMadeNum=0;
			var factoryRentNum=0;
			//var factoryMakingNum=data.factoryMaking.length;
	        //加载已建成厂房
			if(data.factoryMade){
				factoryMadeNum=data.factoryMade.length;
		        $(data.factoryMade).each(function(index){
			        $(backUp1).clone(true).appendTo(".workshop");
				    
				    tar=$(".workshop dl").eq(index);    
		            $(tar).find(".shop").attr("src","../../images/factory/made.jpg");
		    	    $(tar).find(".status span").text(data.factoryMade[index].status);  //状态
			        $(tar).find(".workshop_id span").text(data.factoryMade[index].factoryId);  //厂房编号
			        $(tar).find(".market_area span").text(data.factoryMade[index].place);  //所在市场
			        $(tar).find(".workshop_type span").text(data.factoryMade[index].factoryType);  //厂房类型
			        $(tar).find(".restvalue span").text(data.factoryMade[index].sellPrice);  //残值
			        $(tar).find(".buildtime span").text(data.factoryMade[index].beginTime);  //开工时间
			        $(tar).find(".finished").text(data.factoryMade[index].finishTime);  //完工时间
			        $(tar).find(".currentLine").text(data.factoryMade[index].productLineNumber);  //生产线现有数量
			        $(tar).find(".totalLine").text(data.factoryMade[index].capacity);  //可容纳生产线
					
					backUpLine=$(tar).find("#hiddenLine").clone(true).removeAttr("id");
				    $("#hiddenLine").remove();
					$(tar).find("dd").remove();//生产线备份，清空，然后重新创建
					
					//加载生产线数据
					if(data.factoryMade[index].productLines){
						var num=0;
						var lines=data.factoryMade[index].productLines;
						
						for(var i=0; i<lines.length; i++){
							$(backUpLine).clone(true).appendTo(tar);
							
							target=$(tar).find("dd:eq("+i+")");
							
							$("input[name='sell']").css("cursor","auto");  //转产和出售鼠标样式
							$("input[name='changePro']").css("cursor","auto");
							
							//根据生产线的状态来读取数据
				            Line(obj,target,lines,index,i,num);
							
							num=0;
						};
					} //if
			    }); //each
			}//if
			
			//加载租用中厂房
			if(data.factoryRent){
				factoryRentNum=data.factoryRent.length;
			    $(data.factoryRent).each(function(index){
				    $(backUp1).clone(true).appendTo(".workshop");
					tar=$(".workshop dl").eq(index+factoryMadeNum);
		            $(tar).find(".shop").attr("src","../../images/factory/rent.jpg");
		    	    $(tar).find(".status span").text(data.factoryRent[index].status);  //状态
			        $(tar).find(".workshop_id span").text(data.factoryRent[index].factoryId);  //厂房编号
			        $(tar).find(".market_area span").text(data.factoryRent[index].place);  //所在市场
			        $(tar).find(".workshop_type span").text(data.factoryRent[index].factoryType);  //厂房类型
					$(tar).find(".restvalue p").text("每期需要交纳的租金");
			        $(tar).find(".restvalue span").text(data.factoryRent[index].rentCost);  //每期需要交纳的租金
					$(tar).find(".buildtime p").text("残值");
					$(tar).find(".buildtime span").text(data.factoryRent[index].sellPrice);  //残值
					if(data.factoryRent[index].needPeriod==0){  //等待使用为0，就显示可用
					    $(tar).find(".finished").text("租赁厂房可用");
					} else{
					    $(tar).find(".builttime p").text("等待使用周期");
			            $(tar).find(".finished").text(data.factoryRent[index].needPeriod);  //等待使用周期
			        }
					$(tar).find(".currentLine").text(data.factoryRent[index].productLineNumber);  //生产线现有数量
			        $(tar).find(".totalLine").text(data.factoryRent[index].capacity);  //可容纳生产线
					$(tar).find(".operateFactory input").removeClass("sell").addClass("stopRent").val("租用中"); 
				
					backUpLine=$(tar).find("#hiddenLine").clone(true).removeAttr("id");
				    $("#hiddenLine").remove();
				    $(tar).find("dd").remove();
					
					//加载生产线数据
					if(data.factoryRent[index].productLines){
						var num=0;
						var lines=data.factoryRent[index].productLines;
						for(var i=0; i<lines.length; i++){
							$(backUpLine).clone(true).appendTo(tar);
							target=$(tar).find("dd:eq("+i+")");
							
							$("input[name='sell']").css("cursor","auto");  //转产和出售鼠标样式
							$("input[name='changePro']").css("cursor","auto");
							
							//根据生产线的状态来读取数据
				            Line(obj,target,lines,index,i,num);
							
							num=0;
						};
					} //if
				}); //each
			} //if
			
			//加载修建中厂房
			if(data.factoryMaking){
			    $(data.factoryMaking).each(function(index){
				    $(backUp3).clone(true).appendTo(".workshop");
					
					tar=$(".workshop dl").eq(index+factoryMadeNum+factoryRentNum);
		            $(tar).find(".shop").attr("src","../../images/factory/making.jpg");
		    	    $(tar).find(".status span").text(data.factoryMaking[index].status);  //状态
			        $(tar).find(".workshop_id span").text(data.factoryMaking[index].factoryId);  //厂房编号
			        $(tar).find(".market_area span").text(data.factoryMaking[index].place);  //厂房位置
			        $(tar).find(".workshop_type span").text(data.factoryMaking[index].factoryType);  //类型
					$(tar).find(".paytype span").text(data.factoryMaking[index].payMode);  //支付方式
					$(tar).find(".buildtime span").text(data.factoryMaking[index].beginTime);  //开工时间
					$(tar).find(".builttime span").text(data.factoryMaking[index].finishedPeriod);  //已完成建造周期
					$(tar).find(".buildPerioud span").text(data.factoryMaking[index].makePeriod);  //总建造周期
					$(tar).find(".lines span").text(data.factoryMaking[index].capacity);  //能容纳生产线
					if(data.factoryMaking[index].status=="修建中"){
					    $(tar).find(".operateFactory input").val("暂停修建");
						$(tar).find(".operateFactory input").removeClass("building").addClass("stopping");
					}
					else{
					    $(tar).find(".operateFactory input").val("继续修建");
						$(tar).find(".operateFactory input").removeClass("stopping").addClass("building");
					}
				});  //each
			}
		},"json"); //post
	} //function
	
//重新加载某一条生产线信息
	function upDateLine(url,oData,target,backUp3){
	    /* var factoryStatus=$(target).parents("dl").find(".status span").text();
		var dlPos=$(target).parents("dl").index();  //该生产线所在的厂房位置
		var ddPos=$(target).parents("dd").index()-1;  //该生产线的位置
	    switch(factoryStatus){
		    case "已建成":$.post(url,oData,function(data){
			    dataPos=data.factoryMade[dlPos].productLines[ddPos];
				$(target).parent().siblings(".lineType").find("span").text(dataPos.productLineType);  //类型
				$(target).parent().siblings(".finishedPeriod").find("span").text(dataPos.productFinishPeriod);  //已完成周期
				$(target).parent().siblings(".lineStatus").find("span").text(str);  //生产线状态
				$(target).parent().siblings(".workingPro").html("正在生产产品：<span>"+dataPos.productName+"</span>");  //产品名称
			},"json"); break;
			case "租用中":$.post(url,oData,function(data){
			    dlPos=dlPos-data.factoryMade.length;
			    dataPos=data.factoryRent[dlPos].productLines[ddPos];
				$(target).parent().siblings(".lineType").find("span").text(dataPos.productLineType);  //类型
				$(target).parent().siblings(".finishedPeriod").find("span").text(dataPos.productFinishPeriod);  //已完成周期
				$(target).parent().siblings(".lineStatus").find("span").text(str);  //生产线状态
				$(target).parent().siblings(".workingPro").html("正在生产产品：<span>"+dataPos.productName+"</span>");  //产品名称
			},"json"); break;
			default :return false;
		} */
		
		$.post(url,oData,function(data){
			switch(parseInt(data.status)){
				case 0 : str="正在安装";break;
				case 1 : str="暂停安装";break;
				case 2 : str="正在生产";break;
				case 3 : str="暂停生产";break;
				case 4 : str="待生产";
						 $(target).siblings("input[name='changePro']").removeAttr("style").removeAttr("disabled");  //能点击转产
						 $(target).siblings("input[name='sell']").removeAttr("style").removeAttr("disabled");break;  //此状态下可以出售
				case 5 : str="正在转产";break
				case 6 : str="暂停转产";break;
			}
			$(target).parents("dd").find(".lineType span").text(data.productLineType);  //类型
			$(target).parents("dd").find(".finishedPeriod span").text(data.productFinishPeriod);  //已完成周期
			$(target).parents("dd").find(".lineStatus span").text(str);  //生产线状态
			$(target).parents("dd").find(".workingPro").html("正在生产产品：<span>"+data.productName+"</span>");  //产品名称
			$(target).parents("dd").find("input[name='hiddenStatus']").val(data.status);  //line status
			$(".configure p:eq("+data.status+")").show();
			$(".configure p:lt("+data.status+")").hide();
    	    $(".configure p:gt("+data.status+")").hide();
			alert(data.status);
		},"json");
	}


$(function(){
	$(".workshop .bg3:first-child dt:first-child").css({"background":"#fff"});
	$("dd").hide();  //生产线隐藏
	window.backUp1=$("#hidden1").clone(true).removeAttr("id");
	$("#hidden1").remove();
	window.backUp3=$("#hidden2").clone(true).removeAttr("id");
	$("#hidden2").remove();

	//加载select框内容
	$.post("factory.json",null,function(data){
	    //each遍历添加
	    $("select[name='workshopStatus']").append("<option>"+"这里是data.[]"+"</option>");
		$("select[name='marketArea']").append("<option>"+"这里是data.[]"+"</option>");
	},"json");
	
	//根据市场所在地、状态查询
	$(".choose_status, .choose_market, .search_btn").click(function(){
		var selected1=$("select[name='workshopStatus'] option:selected").val();
		var selected2=$("select[name='marketArea'] option:selected").val();
		upDate("factory.json",{"worshopStatus":selected1,"marketArea":selected2},backUp1,backUp3);
	    //重新加载数据
	});
	
	//select查询按钮
	$(".search_btn").hover(function(){
		$(this).removeClass("bg1").addClass("bg2");
		$(this).css({"font-size":"16px"});
	},function(){
		$(this).removeClass("bg2").addClass("bg1");
		$(this).css({"font-size":"14px"});
	});	

	//点击展开生产线
	$(document).on("click",".down",function(){ 
		    if($(this).find(".down_btn").attr("src")=="../../images/factory/down_btn2.gif") { $(this).find(".down_btn").removeAttr("src").attr("src","../../images/factory/down_btn1.gif"); }
		    else { $(this).find(".down_btn").removeAttr("src").attr("src","../../images/factory/down_btn2.gif"); }
		    $(this).parents(".bg3").nextAll("dd").slideToggle(500); 
	});//click
	
    //查看悬浮框
	/* $(document).on("mouseenter","input[name='examine']",function(){
		    $(this).removeClass("bg1").addClass("bg4");    
    	}); */
    $(document).on("mouseleave","input[name='examine']",function(){
	    	timer = setTimeout(function () { 
	    		$(".examine").hide(); 
	    		$("input[name='examine']").removeClass("bg4").addClass("bg1");
	        },100);
	        $(".examine").mouseenter(function(){      //使鼠标可以悬停而不收回，mouseover不可行
	        	clearTimeout(timer);
	        }).mouseleave(function(){
	            $(".examine").hide(500);
	        	$("input[name='examine']").removeClass("bg4").addClass("bg1");
	        });
	        $(".examine").stop(true,true);  //停止还在排队的动画
	});//hover
	//点击后才查看，并加载信息
	$(document).on("click","input[name='examine']",function(){
		//点击传值：生产线编号
		var lineId=$(this).siblings("input[name='hidden']").val();
		//alert(lineId);
		$.post("seeLine.json",{"lineId":lineId},function(data){
		    $(".lineInfo1 p,.lineInfo2 p").empty();
			//加载信息
			var status=data.status;
			if(status==0 || status==1){
				
			    $(".lineInfo1 .p1").text("离安装完成还差 "+(data.setupPeriod-data.finishPeriod)+" 周期").css("font-weight","bold");
			    $(".lineInfo1 .p2").text("需安装周期："+data.setupPeriod);
				$(".lineInfo1 .p3").text("安装每期所需费用："+data.setupPeriodPrice);
				$(".lineInfo2 .p1").text("生产效率："+data.producePeriod);
				$(".lineInfo2 .p2").text("残值数额："+data.sellPrice);
				$(".lineInfo2 .p3").text("生产线开始使用后每期所需维护费："+data.mainCost);
				$(".lineInfo2 .p4").text("生产线开始使用后每期所需折旧费："+data.depreciation);
				$(".lineInfo2 .p5").text("出售生产线后资金到帐的账期："+data.delayTime);
			}
			else if(status==2 || status==3 || status==4){
			    $(".lineInfo1 .p1").text("离产品生产完成还差 "+(data.producePeriod-data.productFinishPeriod)+"周期").css("font-weight","bold");
				$(".lineInfo2 .p1").text("生产效率："+data.producePeriod);
				$(".lineInfo2 .p2").text("残值数额："+data.sellPrice);
				$(".lineInfo2 .p3").text("生产线开始使用后每期所需维护费："+data.mainCost);
				$(".lineInfo2 .p4").text("生产线开始使用后每期所需折旧费："+data.depreciation);
				$(".lineInfo2 .p5").text("出售生产线后资金到帐的账期："+data.delayTime);
			}
			else if(status==5 || status==6){
			    $(".lineInfo1 .p1").text("离转成生产 "+data.productName+" 产品生产线");
				$(".lineInfo1 .p2").text("还差"+(data.changePeriod-data.finishPeriod)+"周期");
				$(".lineInfo1 .p3").text("转产每期所需费："+data.changeCost);
				$(".lineInfo2 .p1").text("生产效率："+data.producePeriod);
				$(".lineInfo2 .p2").text("残值数额："+data.sellPrice);
				$(".lineInfo2 .p3").text("生产线开始使用后每期所需维护费："+data.mainCost);
				$(".lineInfo2 .p4").text("生产线开始使用后每期所需折旧费："+data.depreciation);
				$(".lineInfo2 .p5").text("出售生产线后资金到帐的账期："+data.delayTime);
			}
			else return;
		},"json");
		//显示查看信息
	    var w=$(this).offset().left-60;
	    var h=$(this).offset().top+29;
	   	$(".examine").slideDown(500).css({"left":w+"px","top":h+"px","display":"block"});
	});
	
	//转产悬浮框
	/* $(document).on("mouseenter","input[name='changePro']",function(){
		$(this).removeClass("bg1").addClass("bg4");
	}); */
	$(document).on("mouseleave","input[name='changePro']",function(){
	    	timer = setTimeout(function () { 
		        $(".changePro").hide(500);
		        $("input[name='changePro']").removeClass("bg4").addClass("bg1");
		    },100);
		    $(".changePro").mouseenter(function(){
			    clearTimeout(timer);
		    }).mouseleave(function(){
			    $(".changePro").hide();
		        $("input[name='changePro']").removeClass("bg4").addClass("bg1");
		    });
		    $(".changePro").stop(true,true); 
	});
	$(document).on("click","input[name='changePro']",function(){
	    _thisLine=$(this);
		//点击传值：生产线编号并加载该组能够转产的产品
		var lineId=$(this).siblings("input[name='hidden']").val();
		$.post("factory.json",{"productLineID":lineId},function(data){
			/* $("select[name='choosePro']").empty();
			for(var i=0; i<data.productName.length; i++){
				$("select[name='choosePro']").append("<option>"+data.productName[i]+"</option>");
			} */
		},"json");
		var w=$(this).offset().left-77;
		var h=$(this).offset().top+29;
		$(".changePro").slideDown(500).css({"left":w+"px","top":h+"px","display":"block"});
	});
	//点击确认转产按钮---传生产线ID、和要转产的产品
	$(document).on("click","input[name='confirmChange']",function(){
	    var product=$(this).prev().find("select[name='choosePro'] option:selected").text();  //选择的产品
	    var lineId=$(_thisLine).siblings("input[name='hidden']").val();
		//重新刷新该条生产线
		//alert(lineId);
		alert(product);
	    upDateLine("line.json",{"productLineID":lineId,"productName":product},_thisLine,backUp3);
	 });
	 
	 
	//select延时
	$("select[name='choosePro']").hover(function(){
	    $(".changePro").css({"display":"block"});
	    },function(){
	  	    $(".changePro").css({"display":"block"});
	    	timer = setTimeout(function () { 
		        $("this").hide(500);   
		    },500);
		    $("option").mouseenter(function(){
		    	clearTimeout(timer);
		    });
		$(".configure").stop(true,true); 
	});
	//确认转产按钮样式
	$(".changePro input").hover(function(){
		$(this).css({"cursor":"pointer","width":"135px","height":"35px"});
	},function(){
		$(this).css({"width":"133px","height":"33px"});
	});
	
	
	//配置悬浮框
	/* $(document).on("mouseenter","input[name='configure']",function(){
		$(this).removeClass("bg1").addClass("bg4");
	}); */
	$(document).on("mouseleave","input[name='configure']",function(){
		timer = setTimeout(function () { 
		    $(".configure").hide();
		    $("input[name='configure']").removeClass("bg4").addClass("bg1");
		},100);
		$(".configure").mouseenter(function(){
			clearTimeout(timer);
		}).mouseleave(function(){
			$("input[name='configure']").removeClass("bg4").addClass("bg1");
			$(".configure").hide(500);
		});
		$(".configure").stop(true,true); 
	});
	$(document).on("click","input[name='configure']",function(){
	    _thisLine=$(this);
		$(".configure p").css("display","block");
		//$.post("seeLine.json",{"productLineId":lineId},function(data){
		    //获得配置下可以点击的按钮
		    var status=$(_thisLine).siblings("input[name='hiddenStatus']").val();   //加载生产线时储存的status
			$(".configure p:lt("+status+")").hide();
    	    $(".configure p:gt("+status+")").hide();
			alert(status);
	        /* if(status==2){  //正在生产
			    $(".configure p:lt(2)").hide();
    	        $(".configure p:gt(2)").hide();
		    }
		    else if(status==4){  //待生产
    	        $(".configure p:lt(4)").hide();
				$(".configure p:gt(4)").hide();
		    }
		    else if(status==3){  //暂停生产
		        $(".configure p:lt(3)").hide();
    	        $(".configure p:gt(3)").hide();
		    }
		    else if(status==0){  //正在安装
		        $(".configure p:lt(0)").hide();
    	        $(".configure p:gt(0)").hide();
		    }
		    else if(status==1){  //暂停安装
		        $(".configure p:lt(1)").hide();
    	        $(".configure p:gt(1)").hide();
		    }
		    else if(status==5){  //转产
		        $(".configure p:lt(5)").hide();
    	        $(".configure p:gt(5)").hide();
		    }
		    else if(status==6){  //暂停转产
		        $(".configure p:lt(6)").hide();
				$(".configure p:gt(6)").hide();
		    }
		    else return; */
		//},"json");
		
		var w=$(this).offset().left-77;
		var h=$(this).offset().top+29;
		$(".configure").slideDown(500).css({"left":w+"px","top":h+"px","display":"block"});
		
	    lineId=$(this).siblings("input[name='hidden']").val();   //点击配置得到该生产线的ID
	});
	//配置下各按钮样式
	$(".configure input").hover(function(){
		$(this).css({"cursor":"pointer","width":"135px","height":"35px"});
	},function(){
		$(this).css({"width":"133px","height":"33px"});
	});
	$(document).on("click",".configure input",function(){   //点击配置下的按钮，传生产线ID、和要改变的状态
		var str=$(this).val();
		alert(lineId);
		alert(str);
	    //重新刷新该条生产线
		upDateLine("line1.json",{"productLineID":lineId,"status":str},_thisLine,backUp3);
	});
	
	//查看、转产、配置、出售生产线按钮样式
	$(document).on("mouseenter","input[name='sell'],input[name='configure'],input[name='changePro'],input[name='examine']",function(){
		$(this).removeClass("bg1").addClass("bg4");
	});
	$(document).on("mouseleave","input[name='sell']",function(){
		$(this).removeClass("bg4").addClass("bg1");
	});
	//出售生产线
	$(document).on("click","input[name='sell']",function(){
		/* var hasProduct=$(this).parents("dd").find(".lineStatus span").text();
		if(hasProduct=="待生产"){
			var lineId=$(this).siblings("input[name='hidden']").val();
			var ok=confirm("是否确认出售该条生产线");
			if(ok){
				$.post("factory.json",{"productLineID":lineId});
				$(this).parents("dd").remove();
			}
			else{ return false; }
		}
		else{
			alert("该状态下不能出售！");
		} */
		var lineId=$(this).siblings("input[name='hidden']").val();
		var ok=confirm("是否确认出售该条生产线");
		if(ok){
			$.post("factory.json",{"productLineID":lineId});
			alert(lineId);
			$(this).parents("dd").hide(1000);
			currentLine=$(this).parents("dl").find(".currentLine");
			$(currentLine).text($(currentLine).text()-1);
		}
		else{ return false; }
	});
	
	
	//出售、停止租用、停止修建、继续修建按钮样式
	$(document).on("mouseenter",".operateFactory input",function(){
		$(this).removeClass("bg1").addClass("bg2");
		$(this).css({"font-size":"20px"});
	});
	$(document).on("mouseleave",".operateFactory input",function(){
		$(this).removeClass("bg2").addClass("bg1");
		$(this).css({"font-size":"18px"});
	});
	//出售、停止租用厂房
	$(document).on("click",".sell, .stopRent",function(){
		var lineCount=$(this).parents("dl").find(".currentLine").text();  //厂房中现有的生产线数量
		var factoryId=$(this).parents("dl").find(".workshop_id span").text();  //厂房编号
		if(lineCount==0){
			var ok=confirm("是否确认出售该厂房");
			if(ok){
				$.post("factory.json",{"factoryId":factoryId});  //成功出售传--厂房ID
				$(this).parents(".workshop_info").remove();
			}
			else{ return false; }
		}
		else{
			alert("有生产线，不能出售！");
		}
	});
	//停止修建、继续修建
	$(document).on("click",".building, .stopping",function(){
		var factoryId=$(this).parents("dl").find(".workshop_id span").text();  //厂房编号
		if($(this).val()=="暂停修建") {
			$(this).val("继续修建");
		    $(this).parents("dl").find(".status span").text("暂停中");
		}
		else if($(this).val()=="继续修建") {
			$(this).val("暂停修建");
			$(this).parents("dl").find(".status span").text("修建中");
		}
		$.post("factory.json",{"factoryId":factoryId});  //成功暂停、继续传--厂房ID
		//else return false;
	});
	
	upDate("factory.json",null,backUp1,backUp3);
	
});//ready