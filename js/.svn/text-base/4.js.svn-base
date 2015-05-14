$(function(){
	var username="wangxinyu";
    $.post("table.json",{},function(data){
    	$('input[name="add"]').attr("disabled","disabled");
        for(var key in data){
        	var size=8;
            if(key<size) { 
            	var tar=$('td').eq(key).find('input');
        	    $(tar).prev().empty();
                $(tar).prev().addClass("tab_span1");
                $(tar).removeAttr("disabled").css("cursor","pointer");
                var sp1='<p class="common tab_p1">'+data[key].groupName+'</p>';
                var sp2='<p class="common tab_p2">'+"未开始比赛"+'</p>';
                var sp3='<p class="common tab_p3">'+'<span id="joined">'+data[key].remandNumber+'</span>';
                sp3+="/";
                sp3+='<span id="totalNum">'+data[key].userNumbers+'</span>'+'</p>';
                $(tar).prev().append(sp1,sp2,sp3);
            }
        }  
    },"json");
    $('input[name="add"]').click(function(){
        	var str=$(this).prev().find(".tab_p1").text();
        	$.post("info.json",{"userID":username,"groupName":str},function(objson){
        	    	alert("success joined"+str);
             },"json");
    });           
});