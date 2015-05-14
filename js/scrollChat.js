function loadDialog(_div){  //聊天室对话——查询
	$.post("scrolltest.json",null,function(data){
		var username=data.username;
		$(data.records).each(function(index){
			var user=data.records[index].username;
			var record=data.records[index].record;
			if(username==user){
				var addContent="<p><span class='style1'>"+user+"</span>："+record+"</p>";
				$(_div).append(addContent);
			}
			else{
				var addContent="<p><span class='style2'>"+user+"</span>："+record+"</p>";
				$(_div).append(addContent);
			}
		});
		//控制滚动条始终在最底部
		var scrollTop = $(_div)[0].scrollHeight;
		$(_div).scrollTop(scrollTop);
	},"json");
}
function addDialog(_div){  //聊天室对话——发送的消息
	$.post("scrolltest1.json",null,function(data){
		var username=data.username;
		var record=data.record;
		var addContent="<p><span class='style1'>"+username+"</span>："+record+"</p>";
		$(_div).append(addContent);
		//控制滚动条始终在最底部
		var scrollTop = $(_div)[0].scrollHeight;
		$(_div).scrollTop(scrollTop);
	},"json");
}
function sendDialog(){  //聊天室对话——发送点击
	$("input[name='send']").click(function(){
		var content=$(this).prev().val();
		$.post("scrolltest1.json",{"record":content});
		//发送之后，输入框清空
		$(this).prev().val("");
	});
}
$(function(){
	var _div=$(".right_div1");  //装聊天内容的div框---小组管理页面
	var _div=$(".ads_right_chartRoom");  //装聊天内容的div框---order页面
	loadDialog(_div);
	addContent(_div);
});