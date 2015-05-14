$(document).ready(function(){
 $.getJSON("Raw_material_inventory.json",function(data){
	 //errorMessage开始
		if(data.statusCode=="0"){
			alert("添加成功");
			}
		else if(data.statusCode=="1")
		{
			alert("添加失败");
	  //errorMessage结束
		}
 	 $.each(data.materialInventory,function(i){
		 //P1
		  if(data.materialInventory[i].materialName=="R1"){
			  $(".R1").text(data.materialInventory[i].mNumber);
			  
		 } 
		 
		 //P1
		  if(data.materialInventory[i].materialName=="R2"){
			  $(".R2").text(data.materialInventory[i].mNumber);
		 } 
		 
		 //P1
		  if(data.materialInventory[i].materialName=="R3"){
			  $(".R3").text(data.materialInventory[i].mNumber);
			
		 } 
		 
		 //P1
		  if(data.materialInventory[i].materialName=="R4"){
			  $(".R4").text(data.materialInventory[i].mNumber);
			
		 } 
		
		 
	  });
});
});


// JavaScript Document