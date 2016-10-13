//订单信息
$(function(){
	var num = $("table.cart tr input");
	var cookies = document.cookie;
	var cookieSub = cookies.split("; ");
	var arr = [];
	var num = 0;
	for(var i = 0; i < cookieSub.length; i++){
		var cook = cookieSub[i].split("=");
		var name = cook[0].split("");
		console.log(name[name.length-1]);
		if(name[name.length-1] == "b"){
			arr.push(cook[1]);
		}
	}
		//console.log(arr);
	$.ajax({
		url:"../json/list-goods.json",
		dataType:"json",
		success:function(mag){
			var data = mag.data
			var str = "";
			for(var i = 0; i < arr.length; i++){
				for(var j in data){
					for(var k in data[j].data1){
						str += '<tr>'
						if(arr[i] == data[j].data1[k].goodsId){
							str += '<td><i></i><a href="#" class="img l"><img src="../img/list/'+data[j].data1[k].img1+'" style="display: inline-block;"/></a></td><td><a href="#" class="title">'+data[j].data1[k].title1+'</a></td><td><p>颜色：<em>'+getCookie(data[j].data1[k].goodsId + "c")+'</em></p><p>尺码：<em>'+getCookie(data[j].data1[k].goodsId + "s")+'</em></p></td><td><span class="unit-cost">'+ data[j].data1[k].sale1 +'</span></td><td><input class="num" type="text" value="'+getCookie(data[j].data1[k].goodsId + "n")+'"/></td><td><b class="costs">'+Number(getCookie(data[j].data1[k].goodsId + "n"))*Number(data[j].data1[k].sale1)+'</b></td>';
						}
						str += '</tr>'
					}
				}
			}
			$("table.cart tr.last").before(str);
			$("table input").css("border","0");
			$("table i").addClass("cur");//默认全选；
			$("table i").css({"opacity":"0","filter":"alpha(opacity=0)"})
			function cost(){
				var list = [];
				var cost_all = 0;
				$("table i").not(".all").each(function(){
					list.push(Number($(this).parents("tr").find("b").text()));
				})
				for(var i = 0; i < list.length; i++){
					cost_all += list[i];		
				}
				$("div.checkout strong").text(cost_all);			
			}
			cost();
			
		}
	});	
})
//支付方式
$(function(){
	var btn = $("#pay_online div.btn a");
	var img = $("#pay_online div.banklist .img");
	var _index = 0;
	btn.click(function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		_index =$(this).index();
		img.eq(_index).addClass("cur").siblings().removeClass("cur");
	})
})
//信息验证
$(function(){
	$("#address div.address input.name").blur(function(){//姓名
		var reg = /^[\u4e00-\u9fa5]{2,4}$/;
		var str = $(this).val();
		if(str == ""){
			$(this).next().css({"color":"#f60","font-weight":"600"});
		}
		if(!reg.test(str)){
			$(this).next().css({"color":"#f60","font-weight":"600"});
		}else{
			$(this).next().css({"color":"#999","font-weight":"100"});
		}
	})
	//地址
	$("select.pro").click(function(){
		$(this).parent().next().find("span.pro").text($("select.pro option:selected").text());
		if($("select.pro option:selected").val() == 1 && $("select.city option:selected").val() == 1 && $("select.county option:selected").val()==1){
			$(this).siblings("span").find("em").css({"display":"inline","margin-right":"10px"});
			$(this).siblings("span").find("a").css({"display":"inline","color":"#ee0011"});
		}
		$(this).siblings("span").find("a").click(function(){
			$(this).prev().prev().val($(this).prev().text())		
		})
	})
	$("select.city").click(function(){
		$(this).parent().next().find("span.city").text($("select.city option:selected").text());
		if($("select.pro option:selected").val() == 1 && $("select.city option:selected").val() == 1 && $("select.county option:selected").val()==1){
			$(this).siblings("span").find("em").css({"display":"inline","margin-right":"10px"});
			$(this).siblings("span").find("a").css({"display":"inline","color":"#ee0011"});
		}
		$(this).siblings("span").find("a").click(function(){
			$(this).prev().prev().val($(this).prev().text())		
		})
	})
	$("select.county").click(function(){
		$(this).parent().next().find("span.county").text($("select.county option:selected").text());
		if($("select.pro option:selected").val() == 1 && $("select.city option:selected").val() == 1 && $("select.county option:selected").val()==1){
			$(this).siblings("span").find("em").css({"display":"inline","margin-right":"10px"});
			$(this).siblings("span").find("a").css({"display":"inline","color":"#ee0011"});
		}
		$(this).siblings("span").find("a").click(function(){
			$(this).prev().prev().val($(this).prev().text())		
		})
	})
	//手机号
	$("#address div.address input.mobile").blur(function(){
		var reg = /^1(3|5|7|8){1}(\d){9}$/;
		var str = $(this).val();
		if(str == ""){
			$(this).next().css({"display":"inline","margin-left":"10px"});
		}
		if(!reg.test(str)){
			$(this).next().css({"display":"inline","margin-left":"10px"});
		}else{
			$(this).next().css("display","none");
		}
	})
})
//支付成功
$(function(){
	$("div.pay a.checked").click(function(){
		$("#tip").css("display","block");
		var i = 5;
		var timer = null;
		setInterval(function(){
			i--;
			if(i <　1){
				clearInterval(timer);
				window.location.href = "../index.html";
			}
			$("#tip p span").text(i);
		},1000)	
	})
})





















