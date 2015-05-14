// JavaScript Document
//设置右下角弹框
	  
function bottomPopup(getInfor,status,num)
{   
    var parent = $(window.parent.document).contents();	
    var popupBox = parent.find("#popupBox");
	var img = popupBox.find("img");
	var span = popupBox.find("span");
     if(num>1)
	 {
		 alert("发生错误！");}
	 else if(num==1)
	 {  
		switch(status){
			case 0:
			     img.attr("src","../../images/right.png");
				 break;//对应于成功
			case 1:
			     img.attr("src","../../images/error.png");
				  break;//对应于失败
			case 2:
			      img.attr("src","../../images/warn.png");
			      break;//对应于警告
			}//switch结束
		   span.text(getInfor);
		   //触发父窗口的右下角弹框
		   popupBox.show(1000).delay(2000).hide(1000);
		   
	   //bottomPopup("警告信息地方",2,1);
	}//else if 结束
	  
}//函数结束
	