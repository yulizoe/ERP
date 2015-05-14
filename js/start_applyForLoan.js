function load(data){
	    
	        $(".thirdTd:eq(0)").text(data.loanType);  //贷款类型
		    $(".thirdTd:eq(1)").text(data.rate);  //年利率
		    $(".loanP1").text(data.warning);  //红色警告信息
		    $(".loanP3").html("说明：只有年初才能申请长期贷款。\n企业运营每期进行一次结算收取利息。");  //蓝色说明信息

			//是否有maxMoney,有就显示在贷款输入框里
			if(data.maxMoney){
			    $("#loanMoney").val(data.maxMoney);
				window.maxMoney=data.maxMoney;
			}else{
			    $("#loanMoney").val("");
			}
			
			//添加option选项，从1到maxYear或者maxPeriod
			if(data.maxYear){
			    $("#selectPeriod").empty();
			    for(var i=1; i<=data.maxYear; i++){
			        $("#selectPeriod").append("<option>"+i+"</option>");
				}
			}
			else{
			    $("#selectPeriod").empty();
			    for(var i=1; i<=data.maxPeriod; i++){
			        $("#selectPeriod").append("<option>"+i+"</option>");
			    }
			}
			
			//申请按钮是否可操作
			if(data.isAllow==false){
			    $("#applyBtn").attr("disabled","true").css("cursor","auto");
			}
			else{
			    $("#applyBtn").removeAttr("disabled");
				$("#applyBtn").hover(function(){
				    $(this).removeClass("btn").addClass("click");
				},function(){
				    $(this).removeClass("click").addClass("btn");
				});
			}
			
	}
$(function(){
    
	//进入页面加载信息
    $.post("apply_loan.json",{"loanType":"长期贷款"},load);
	
	$("#loanBtn").hover(function(){
				    $(this).removeClass("btn").addClass("click");
				},function(){
				    $(this).removeClass("click").addClass("btn");
				});
	
	//点击查询，加载信息
	$("#loanBtn").click(function(){
		    var selected=$("#loanType option:selected").val();
		    $.post("apply_loan1.json",{"loanType":selected},load);
    });
	
	$("#applyBtn").click(function(){
	    //alert(1);
		var loanMoney=$("#loanMoney").val();  //贷款金额
		var loanPeriod=$("#selectPeriod option:selected").text();  //贷款期数
		var loanType = $(".thirdTd").eq(0).text();   //贷款类型
		
		//判断贷款金额是否合理，如果不合理就是warning处显示错误消息，如果合理就alert申请成功。
		//这里申请成功的弹框，我就先这样alert了，但是我觉得何海源应该会想统一成和其他弹框一样的，你问问吧。
		if(maxMoney){
    		if(loanMoney<=0){ $(".loanP1").text("贷款金额不符合条件!"); }
	        else if(loanMoney>maxMoney){ $(".loanP1").text("最大贷款金额为您上年权益的xx倍!"); }
		    else{
		        $.post("apply_loan.json",{"loanType":loanType,"loanMoney":loanMoney,"loanPeriod":loanPeriod});
			    alert("贷款成功\n申请到"+loanType+loanMoney+"万元，请在"+loanPeriod+"期之内还清");
		    }
        }else{
		    if(loanMoney<=0){ $(".loanP1").text("贷款金额不符合条件!"); }
			else{
		        $.post("apply_loan.json",{"loanType":loanType,"loanMoney":loanMoney,"loanPeriod":loanPeriod});
			    alert("贷款成功\n申请到"+loanType+loanMoney+"万元，请在"+loanPeriod+"期之内还清");
		    }
		}		
	});
});