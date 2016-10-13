//登录信息确认
$(function(){
	var login_btn = $("#header .center .login_btn a");
	var register_btn = $("#header .center .register_btn a");
	if(getCookie("true")=="true"){
		login_btn.text("您好！"+getCookie("user"));
		register_btn.text("退出").css("color","#EE0011");
		register_btn.attr("href","javascript:;");
		if(getCookie("All")){
			$("#nav dl dt span").text(getCookie("All"));
		}	
	}else{
		login_btn.text("登录").css("color","#EE0011").attr("href","login.html");
		register_btn.text("注册").css("color","#EE0011").attr("href","register.html");	
	}
	if(register_btn.text()=="退出"){
		register_btn.click(function(){
			setCookie("true",false,setCookieDate(7),"/");
			login_btn.text("登录").css("color","#EE0011").attr("href","javascript:;");
			register_btn.text("注册").css("color","#EE0011").attr("href","javascript:;");
			login_btn.click(function(){
				window.location.href = "login.html";
			});
			register_btn.click(function(){
				window.location.href = "register.html";
			})
		})	
	}

})
//查看购物车
$(function(){
	$("#nav dl dt").click(function(){
		window.location.href = "shopcart.html";
	})
})

//优购导购
$(function(){
	var $ul = $("#guide ul.guide_logo")
	$.ajax({
		url:"../json/guide-logo.json",
		async:true,
		dataType:"json",
		success:function(mag){
			var str1 = "";
			var str2 = "";
			var data1 = mag.data1;
			var data2 = mag.data2;
			for(var i in data1){
				str1 += '<a href="#"><img src="../img/brand_logo/'+data1[i].img+'"/>'+data1[i].title+'</a>'
			}
			for(var j in data2){
				str2 += '<a href="#"><img src="../img/brand_logo/'+data2[j].img+'"/>'+data2[j].title+'</a>';
			}
			$ul.children().first().append(str1);
			$ul.children().last().append(str2);
			$("#guide ul.guide_logo li a").css({"width":"89px","height":"60px","border-bottom":"1px #d1d3d4 solid","border-right":"1px #d1d3d4 solid","text-align":"center"})
		}
	});
	var _index = 0;
	var timer = setInterval(move,6000);
	var btn_left = $("#guide div.guide .btn_left");
	var btn_right = $("#guide div.guide .btn_right");
	btn_right.click(function(){
		clearInterval(timer);
		_index++;
		_index = _index > 1? 1:0;
		move();
		timer = setInterval(move,6000);
	});
	$ul.hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(move,6000);
	})
	btn_left.click(function(){
		clearInterval(timer);
		_index--;
		_index = _index < 0? 0:1;
		move();
		timer = setInterval(move,6000);
	});
	function move(){
		_index++;
		_index = _index > 1? 0:1;
		$ul.stop(true).animate({"margin-left":-_index * 1080},600)
	}
	var $Ul = $("#guide ul.guide");
	$.ajax({
		url:"../json/guide.json",
		dataType:"json",
		success:function(mag){
			var str = "";
			var data = mag.data;
			for(var i in data){
				str += '<li>'
				for(var j in data[i].data1){
					str += '<a href="#" class="l">'+data[i].data1[j].a+'</a>'
				}
				str += '</li>'
			}
			$Ul.append(str);
			for(var k = 0; k < 8; k++){
				$("#guide ul.guide li").eq(k).children().eq(0).addClass("first");
				$("#guide ul.guide li").eq(k).children().last().addClass("r");
			}
		}
	});
})
//一级菜单
$(function(){
	$.ajax({
		url:"../json/menu.json",
		dataType:"json",
		success:function(mag){
			var data = mag.data;
			var str = "";
			for(var i in data){
				str+= '<li><div class="titt">';
				str+= '<i class="iconn sport l" style="background: url(../img/indexnav2img_01.jpg) no-repeat 0 '+ data[i].top +'px;"></i>';							
				str+='<h3 l><a href="list.html" target="_blank">'+data[i].title +'</a></h3></div><p><a href="list.html" target="_blank">'+data[i].class1+'</a> <a href="list.html" target="_blank">'+data[i].class2+'</a> <a href="list.html" target="_blank">'+data[i].class3+'</a> <a href="list.html" target="_blank">'+data[i].class4+'</a></p></li>'	
			}
			$("#menu ul").html(str);
		}
	});
	$("#menu").parent().hover(function(){
		$("#menu").css("display","block");
	},function(){
		$("#menu").css("display","none");
	});
	$("#menu ul").on("mouseover","li",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		$("#menu ul li .iconn").css("background-position-x","0");
		$("#menu ul .cur .iconn").css("background-position-x","-52px");
		$(this).children().first().children().first().css("background-position-x","-54px")
	});
	$("#menu ul").on("mouseout","li",function(){
		$(this).children().first().children().first().css("background-position-x","-52px")
	});
});
//二级菜单
$(function(){
	var _index = 0;
	$("#menu").hover(function(){
		$("#menu .menu_child").css("display","block");		
	},function(){
		$("#menu .menu_child").css("display","none");	
	})
	$("#menu ul").on("mouseover","li",function(){
		_index = $(this).index();
		if(_index == 0){
			$.ajax({
				url:"../json/menu_sport.json",
				dataType:"json",
				success:function(mag){
					var str = "";
					var data = mag.data;
					for(var i in data){
						str += '<div class="categoryy"><h3><a href="list.html" target="_blank"><img src="../'+ data[i].img +'"/></a></h3><p><a class="l" href="#">'+data[i].good1+'</a><a href="#" class="l">'+data[i].good2+'</a><a class="l" href="#">'+data[i].good3+'</a><a href="#" class="l">'+data[i].good4+'</a><a class="l" href="#">'+data[i].good5+'</a><a href="#" class="l">'+data[i].good6+'</a><a class="l" href="#">'+data[i].good7+'</a><a href="#" class="l">'+data[i].good8+'</a><a class="l" href="#">'+data[i].good9+'</a><a href="#" class="l">'+data[i].good10+'</a></p></div>';
					}
					$(".menu_child").html(str);
					$(".menu_child a.l").css({"width":"64px","line-height":"22px"}).attr("href","list.html").attr("target","_blank");
					$(".menu_child").on("mouseover","h3",function(){
						$(this).stop(true).animate({"margin-left":"10px"},100);
					})
					$(".menu_child").on("mouseout","h3",function(){
						$(this).stop(true).animate({"margin-left":"0px"},100);
					})					
				}
			});
		}else if(_index == 1){
			$.ajax({
				url:"../json/menu_outdoors.json",
				dataType:"json",
				success:function(mag){
					var str = "";
					var data = mag.data;
					for(var i in data){
						str += '<div class="categoryy"><h3><a href="#"><img src="../'+ data[i].img +'"/></a></h3><p><a class="l" href="#">'+data[i].good1+'</a><a href="#" class="l">'+data[i].good2+'</a><a class="l red" href="#">'+data[i].good3+'</a><a href="#" class="l">'+data[i].good4+'</a><a class="l" href="#">'+data[i].good5+'</a><a href="#" class="l">'+data[i].good6+'</a><a class="l" href="#">'+data[i].good7+'</a><a href="#" class="l">'+data[i].good8+'</a><a class="l red" href="#">'+data[i].good9+'</a></p></div>';
					}
					$(".menu_child").html(str);
					$(".menu_child a.l").css({"width":"64px","line-height":"22px"}).attr("href","list.html").attr("target","_blank");
					$(".menu_child a.red").css("color","#EE0011");
					$(".menu_child").on("mouseover","h3",function(){
						$(this).stop(true).animate({"margin-left":"10px"},100);
					})
					$(".menu_child").on("mouseout","h3",function(){
						$(this).stop(true).animate({"margin-left":"0px"},100);
					})					
				}
			});			
		}else if(_index == 2){
			$.ajax({
				url:"../json/menu_shoe.json",
				dataType:"json",
				success:function(mag){
					var str = "";
					var data = mag.data;
					for(var i in data){
						str += '<div class="categoryy"><h3><a href="#"><img src="../'+ data[i].img +'"/></a></h3><p><a class="l red" href="#">'+data[i].good1+'</a><a href="#" class="l">'+data[i].good2+'</a><a class="l" href="#">'+data[i].good3+'</a><a href="#" class="l">'+data[i].good4+'</a><a class="l" href="#">'+data[i].good5+'</a><a href="#" class="l">'+data[i].good6+'</a><a class="l" href="#">'+data[i].good7+'</a><a href="#" class="l red">'+data[i].good8+'</a></p></div>';
					}
					$(".menu_child").html(str);
					$(".menu_child a.l").css({"width":"64px","line-height":"22px"}).attr("href","list.html").attr("target","_blank");
					$(".menu_child a.red").css("color","#EE0011");
					$(".menu_child").on("mouseover","h3",function(){
						$(this).stop(true).animate({"margin-left":"10px"},100);
					})
					$(".menu_child").on("mouseout","h3",function(){
						$(this).stop(true).animate({"margin-left":"0px"},100);
					})					
				}
			});						
		}else if(_index == 3){
			$.ajax({
				url:"../json/menu_clothes.json",
				dataType:"json",
				success:function(mag){
					var str = "";
					var data = mag.data;
					for(var i in data){
						str += '<div class="categoryy"><h3><a href="#"><img src="../'+ data[i].img +'"/></a></h3><p><a class="l" href="#">'+data[i].good1+'</a><a href="#" class="l red">'+data[i].good2+'</a><a class="l" href="#">'+data[i].good3+'</a><a href="#" class="l">'+data[i].good4+'</a><a class="l" href="#">'+data[i].good5+'</a><a href="#" class="l">'+data[i].good6+'</a><a class="l" href="#">'+data[i].good7+'</a><a href="#" class="l red">'+data[i].good8+'</a></p></div>';
					}
					$(".menu_child").html(str);
					$(".menu_child a.l").css({"width":"64px","line-height":"22px"}).attr("href","list.html").attr("target","_blank");
					$(".menu_child a.red").css("color","#EE0011");
					$(".menu_child").on("mouseover","h3",function(){
						$(this).stop(true).animate({"margin-left":"10px"},100);
					})
					$(".menu_child").on("mouseout","h3",function(){
						$(this).stop(true).animate({"margin-left":"0px"},100);
					})					
				}
			});						
		}else if(_index == 4){
			$.ajax({
				url:"../json/menu_clothes.json",
				dataType:"json",
				success:function(mag){
					var str = "";
					var data = mag.data1;
					for(var i in data){
						str += '<div class="categoryy"><h3><a href="#"><img src="../'+ data[i].img +'"/></a></h3><p><a class="l" href="#">'+data[i].good1+'</a><a href="#" class="l red">'+data[i].good2+'</a><a class="l" href="#">'+data[i].good3+'</a><a href="#" class="l">'+data[i].good4+'</a><a class="l" href="#">'+data[i].good5+'</a><a href="#" class="l">'+data[i].good6+'</a></p></div>';
					}
					$(".menu_child").html(str);
					$(".menu_child a.l").css({"width":"64px","line-height":"22px"}).attr("href","list.html").attr("target","_blank");
					$(".menu_child a.red").css("color","#EE0011");
					$(".menu_child").on("mouseover","h3",function(){
						$(this).stop(true).animate({"margin-left":"10px"},100);
					})
					$(".menu_child").on("mouseout","h3",function(){
						$(this).stop(true).animate({"margin-left":"0px"},100);
					})					
				}
			});				
		}else if(_index == 5){
			$.ajax({
				url:"../json/menu_clothes.json",
				dataType:"json",
				success:function(mag){
					var str = "";
					var data = mag.data2;
					for(var i in data){
						str += '<div class="categoryy"><h3><a href="#"><img src="../'+ data[i].img +'"/></a></h3><p><a class="l" href="#">'+data[i].good1+'</a><a href="#" class="l red">'+data[i].good2+'</a><a class="l" href="#">'+data[i].good3+'</a><a href="#" class="l">'+data[i].good4+'</a><a class="l" href="#">'+data[i].good5+'</a><a href="#" class="l">'+data[i].good6+'</a></p></div>';
					}
					$(".menu_child").html(str);
					$(".menu_child a.l").css({"width":"64px","line-height":"22px"}).attr("href","list.html").attr("target","_blank");
					$(".menu_child a.red").css("color","#EE0011");
					$(".menu_child").on("mouseover","h3",function(){
						$(this).stop(true).animate({"margin-left":"10px"},100);
					})
					$(".menu_child").on("mouseout","h3",function(){
						$(this).stop(true).animate({"margin-left":"0px"},100);
					})					
				}
			});				
		}else{
			var str = "<p class='seoul'>敬请期待……</p>";
			$(".menu_child").html(str);
			$(".menu_child p.seoul").css({"width":"100px","line-height":"22px"});
		}
	})
});
//女装选项
$(function(){
	var $div = $("#choose div.cls div.nvz");
	$div.hover(function(){
		$(this).css({"border-color":"#d1d3d4","border-bottom":"#fff 1px solid"})
		$(this).find(".goodscls").css("display","block");
		$(this).find("i").css("background","url(../img/filter-sprite.png) no-repeat -99px -153px")
	},function(){
		$(this).css({"border-color":"#fff"})
		$(this).find(".goodscls").css("display","none");
		$(this).find("i").css("background","url(../img/filter-sprite.png) no-repeat -113px -154px")
	})
})

//筛选
$(function(){
	var $i = $("#choose div.brand dl dd ul li i");
	var $btn_qr = $("#choose div.brand p input.qr");
	var $btn_cl = $("#choose div.brand p input.cancel");
	var $btn = $("#choose div.brand dl dd a.checked");
	var swt = true;
	$btn.click(function(){
		$(this).css("display","none");
		$(this).next().css("display","none");
		$(this).parents("dd").find("p").css("display","block");
		$(this).parents("dd").find("i.l").css({"opacity":"1","filter":"alhpa(opacity=100)"});
	})
	$btn_cl.click(function(){
		$(this).parent().css("display","none");
		$(this).parents("dd").find("a").css("display","block");
		//$(this).prev().prev.css("display","block");
		$(this).parents("dd").find("i.l").css({"opacity":"0","filter":"alhpa(opacity=0)"});
		$i.removeClass("dot");
	})
	$btn_qr.click(function(){
		$(this).parent().css("display","none");
		$(this).parents("dd").find("a").css("display","block");
		//$(this).prev().prev.css("display","block");
		$(this).parents("dd").find("i.l").css({"opacity":"0","filter":"alhpa(opacity=0)"});		
	})
	$i.click(function(){
		$(this).toggleClass("dot");
	})
})
//商品列表
$(function(){
	$.ajax({
		url:"../json/list-goods.json",
		dataType:"json",
		success:function(mag){
			var data = mag.data;
			var str = "";
			for(var i in data){
				str += '<li>'
				for(var j in data[i].data1){
					str += '<dl class="l"><dt><img id="'+data[i].data1[j].goodsId+'" src="../img/list/'+data[i].data1[j].img1+'"/><b>限时抢¥'+data[i].data1[j].sale1+'</b></dt><dd><a href="#">'+data[i].data1[j].title1+'</a><p class="price">¥<strong>'+ data[i].data1[j].price1 +'</strong><del>¥'+data[i].data1[j].del1+'</del></p></dd></dl>'					
				}
				str += '</li>'
			}
			$("#goods ul.goods").append(str);
			$("#goods ul.goods li img").css({"cursor":"pointer","width":"240px"});
			$("#goods ul.goods li img").click(function(){
				var Id = $(this).attr("id");
				setCookie("goodsId",Id);
				window.location.href = "details.html";
			})
		}
	});	
})

//返回顶部
$(function(){
	$(window).scroll(function(){
		if($(this).scrollTop() > 1000){
			$("#goTop").fadeIn(300);
		}else{
			$("#goTop").fadeOut(300);	
		}
	});
	$("#goTop").hover(function(){
		$(this).html("返回<br/>顶部").css({"text-align":"center","line-height":"18px","color":"#000","background-image":"none"})
	},function(){
		$(this).text("").css("background","#E5E5E5 url(../img/filter-sprite.png) no-repeat 8px -373px")
	});
	$("#goTop").click(function(){
		$("html,body").stop(true).animate({"scrollTop":0},300);
	})
})

//footer brand-name
$(function(){
	$.ajax({
		url:"../json/brand-name.json",
		dataType:"json",
		success:function(mag){
			var data = mag.data;
			var str = "";
			for(var i in data){
				str +='<a class="l" href="#">'+ data[i].name +'</a>';
			}
			$("#search p.brand_name").append(str);
			$("#search p.brand_name a").css({"margin-right":"25px","height":"20px","line-height":"20px"})
		}
	});
	$("#search div.page a").click(function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	})
})




































