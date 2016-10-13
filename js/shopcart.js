//购物车
$(function(){
	if(getCookie("true") != "true"){
		if(confirm("您尚未登录，现在去？")){
			window.location.href = "login.html";
		}
	}else{
		var btn_jia = $("table.cart tr a.jia");
		var btn_jian = $("table.cart tr a.jian");
		var num = $("table.cart tr input");
		var cookies = document.cookie;
		var cookieSub = cookies.split("; ");
		var arr = [];
		var num = 0;
		for(var i = 0; i < cookieSub.length; i++){
			var cook = cookieSub[i].split("=");
			//console.log(cook[0]);
			var name = cook[0] * 1;
			if(!isNaN(name)){
				arr.push(cook[1]);
			}
		}
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
								str += '<td><i></i><a href="#" class="img l"><img src="../img/list/'+data[j].data1[k].img1+'" style="display: inline-block;"/></a></td><td><a href="#" class="title">'+data[j].data1[k].title1+'</a></td><td><p>颜色：<em>'+getCookie(data[j].data1[k].goodsId + "c")+'</em></p><p>尺码：<em>'+getCookie(data[j].data1[k].goodsId + "s")+'</em></p></td><td><span class="unit-cost">'+ data[j].data1[k].sale1 +'</span></td><td><a id="'+data[j].data1[k].goodsId+'" href="javascript:;" class="jian l">-</a><input class="num l" type="text" value="'+getCookie(data[j].data1[k].goodsId + "n")+'"/><a href="javascript:;" class="jia l">+</a></td><td><b class="costs">'+Number(getCookie(data[j].data1[k].goodsId + "n"))*Number(data[j].data1[k].sale1)+'</b></td><td><a style="display: block;" href="javascript:;">移入收藏夹</a><a style="display: block;" class="delete" href="javascript:;" name="'+data[j].data1[k].goodsId+'">删除</a>';
							}
							str += '</tr>'
						}
					}
				}
				$("table.cart tr.last").before(str);
				//增加购物车内容
				$("table").on("click","a.jia",function(){
					var price = Number($(this).parent().prev().find("span").text());
					var _num = Number($(this).siblings("input").val());
					_num++;
					$(this).siblings("input").val(_num);
					$(this).parent().next().find("b").text(price*_num);
					setCookie($(this).parents("tr").find("a.delete").attr("name") + "n",_num,setCookieDate(7));
					if($(this).parents("tr").find("i").hasClass("cur")){
						var list = [];
						var cost_all = 0;
						$("table i").not(".all").each(function(){
							if($(this).hasClass("cur")){
								list.push(Number($(this).parents("tr").find("b").text()));	
							}
						})
						for(var i = 0; i < list.length; i++){
							cost_all += list[i];		
						}
						$("div.checkout strong").text(cost_all);	
					}
				})
				//减少商品
				$("table").on("click","a.jian",function(){
					var _num = Number($(this).siblings("input").val()); 
					var price = Number($(this).parent().prev().find("span").text());
					_num--;
					if(_num < 1){
						if(confirm("删除该商品？")){
							removeCookie($(this).attr("id"));
							removeCookie($(this).attr("id") + "n");
							window.location.reload();
						}else{
							_num = 1;
						}
					}
					$(this).siblings("input").val(_num);
					$(this).parent().next().find("b").text(price*_num);
					setCookie($(this).parents("tr").find("a.delete").attr("name") + "n",_num,setCookieDate(7));
					if($(this).parents("tr").find("i").hasClass("cur")){
						var list = [];
						var cost_all = 0;
						$("table i").not(".all").each(function(){
							if($(this).hasClass("cur")){
								list.push(Number($(this).parents("tr").find("b").text()));	
							}
						})
						for(var i = 0; i < list.length; i++){
							cost_all += list[i];		
						}
						$("div.checkout strong").text(cost_all);
					}
				})
				$("table i").addClass("cur");//默认全选；
				$("table").on("click","i:not('.all')",function(){
					$(this).toggleClass("cur");
					$("table i.all").removeClass("cur");
					var list = [];
					var cost_all = 0;
					$("table i").not(".all").each(function(){
						if($(this).hasClass("cur")){
							list.push(Number($(this).parents("tr").find("b").text()));					
						}
					})
					for(var i = 0; i < list.length; i++){
						cost_all += list[i];		
					}
					$("div.checkout strong").text(cost_all);
				})
				var onOff = true;
				$("table").on("click","i.all",function(){
					onOff = !onOff;
					if(onOff){
						$("table i").addClass("cur");	
					}else{
						$("table i").removeClass("cur");	
					}
					var list = [];
					var cost_all = 0;
					$("table i").not(".all").each(function(){
						if($(this).hasClass("cur")){
							list.push(Number($(this).parents("tr").find("b").text()));						
						}
					})
					for(var i = 0; i < list.length; i++){
						cost_all += list[i];		
					}
					$("div.checkout strong").text(cost_all);
				})
				//删除商品
				$("table").on("click",".delete",function(){
					if($(this).parents("tr").find("i").hasClass("cur")){
						if(confirm("删除该商品？")){
							removeCookie($(this).attr("name"));
							removeCookie($(this).attr("name") + "n");
							window.location.reload();
						}					
					}
				})
				//清空购物车
				$(function(){
					$("div.pay a.clear").click(function(){
						for(var i = 0; i < 200;i++){
							removeCookie(i);
							removeCookie(i + "n");
							Window.location.reload();
						}
					})
				})
				var All = 0;
				for(var i=0; i<200; i++){
				var a = Number(getCookie(i + "n"));
					All += a;
				}
				setCookie("All",All,setCookieDate(7));
				//结算总价
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
				//去结账
				$("div.cart div.checkout a.checked").click(function(){
					for(var i = 0 ; i < 200; i++){
						removeCookie(i + "b");
					}
					$("table i").not(".all").each(function(){
						if($(this).hasClass("cur")){
							var goods = Number($(this).parents("tr").find(".delete").attr("name"));
							setCookie(goods + "b",goods);
							window.location.href="pay.html";
						}
					})
				})
			}
		});	
		
	}
})
//购买了您购物车中商品的顾客还买了
$(function(){
	$.ajax({
		url:"../json/list-goods.json",
		dataType:"json",
		success:function(mag){
			var data = mag.data;
			var str = "";
			for(var i = 0; i < 2;i++){
				for(var j in data[i].data1){
					str += '<dl><dt><img src="../img/list/'+ data[i].data1[j].img1 +'"/></dt><dd><p><a href="list.html">'+ data[i].data1[j].title1 +'</a></p><span><em>¥'+ data[i].data1[j].sale1 +'</em><del>¥'+ data[i].data1[j].del1 +'</del></span></dd></dl>'
				}
			}
			$("#anymore div.goods").append(str);
		}
	});
})




























