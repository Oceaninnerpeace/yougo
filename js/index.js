$(function(){
	$("#top").click(function(){
		window.location.href="#";
	})
	//顶部广告
	var timer = setTimeout(function(){
		$("#top").css("background","url(img/a6bd8e4915104d12b1058417a8609116.jpg) no-repeat center").stop(true).animate({"height":"553px"},600);
		var timer1 = setTimeout(function(){
				$("#top").stop(true).animate({"height":"45px"},600,function(){
					$("#top").css("background","url(img/69af8e9c420b4df6a5add15bd7c3e370.jpg) no-repeat center");
			})	
		},1500)

	},1500)
})
//查看购物车
$(function(){
	$("#nav dl dt").click(function(){
		window.location.href = "html/shopcart.html";
	})
})
//登录信息确认
$(function(){
	var login_btn = $("#header .center .login_btn a");
	var register_btn = $("#header .center .register_btn a");
	if(getCookie()!=null){
		if(getCookie("true")=="true"){//检测登录信息
			login_btn.text("您好！"+getCookie("user"));
			register_btn.text("退出").css("color","#EE0011");
			register_btn.attr("href","javascript:;");
			if(getCookie("All")){
				$("#nav dl dt span").text(getCookie("All"));
			}	
		}else{
			login_btn.text("登录").css("color","#EE0011").attr("href","html/login.html");
			register_btn.text("注册").css("color","#EE0011").attr("href","html/register.html");	
		}
		if(register_btn.text()=="退出"){
			register_btn.click(function(){
				setCookie("true",false,setCookieDate(7),"/");//重置登录确认信息；
				login_btn.text("登录").css("color","#EE0011").attr("href","javascript:;");
				register_btn.text("注册").css("color","#EE0011").attr("href","javascript:;");
				login_btn.click(function(){
					window.location.href = "html/login.html";
				});
				register_btn.click(function(){
					window.location.href = "html/register.html";
				})
			})
		}	
	}
	
})
//楼梯
$(function(){
	var $ul = $("#stairs");
	var $li = $("#stairs li.floor")
	var _index = 0;
		$(window).scroll(function(){
			if($(this).scrollTop() > 400){
				$ul.fadeIn();
			}else{
				$ul.fadeOut();						
			}
			_index = Math.floor(($(this).scrollTop() -1000)/543);
			_index = _index < 2?1:_index;
			$li.eq(_index-1).addClass("hover").siblings().removeClass("hover");
		})
		$("li").not(".down").hover(function(){
			$(this).addClass("hover")
		},function(){
			$(this).removeClass("hover")					
		})
		$li.not(".down").click(function(){
			var _index = $(this).index();
//			$("html,body").stop(true).animate({"scrollTop":(_index + 1)*543 + 1000},300);//动画切换
			$("html,body").scrollTop((_index + 1)*543 + 1000);
		});
		$("#stairs li.top").click(function(){
			$("html,body").stop(true).animate({"scrollTop":0},300)
		})
		
})
//轮播banner图
$(function(){
	var li = $("#banner .banner .pic li");
	var btn = $("#banner .banner .dot li");
	var _index = 0;
	var timer = null;
	function move(){
		_index++;
		if (_index >= li.size()) {
			_index = 0;
		}
		li.eq(_index).fadeIn(600).siblings().fadeOut(600);
		btn.eq(_index).addClass("cur").siblings().removeClass("cur");			
	}
	timer = setInterval(move,4000);
	btn.hover(function(){
		clearInterval(timer);
		_index = $(this).index() - 1;
		move();
	},function(){
		timer = setInterval(move,4000)
	});
	btn.click(function(){
		_index = $(this).index() - 1;
		move();
	});
});

//一级菜单
$(function(){
	$.ajax({
		url:"json/menu.json",
		dataType:"json",
		success:function(mag){
			var data = mag.data;
			var str = "";
			for(var i in data){
				str+= '<li><div class="titt">';
				str+= '<i class="iconn sport l" style="background: url(img/indexnav2img_01.jpg) no-repeat 0 '+ data[i].top +'px;"></i>';							
				str+='<h3 l><a href="html/list.html" target="_blank">'+data[i].title +'</a></h3></div><p><a href="html/list.html" target="_blank">'+data[i].class1+'</a> <a href="html/list.html" target="_blank">'+data[i].class2+'</a> <a href="#">'+data[i].class3+'</a> <a href="html/list.html" target="_blank">'+data[i].class4+'</a></p></li>'	
			}
			$("#banner .menu ul").html(str);
		}
	});
	$("#banner .menu ul").on("mouseover","li",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		$("#banner .menu ul li .iconn").css("background-position-x","0");
		$("#banner .menu ul .cur .iconn").css("background-position-x","-52px");
		$(this).children().first().children().first().css("background-position-x","-54px")
	});
	$("#banner .menu ul").on("mouseout","li",function(){
		$(this).children().first().children().first().css("background-position-x","-52px")
	});
});
//二级菜单
$(function(){
	var _index = 0;
	$("#banner .menu").hover(function(){
		$("#banner .menu .menu_child").css("display","block");		
	},function(){
		$("#banner .menu .menu_child").css("display","none");	
	})
	$("#banner .menu ul").on("mouseover","li",function(){
		_index = $(this).index();
		if(_index == 0){
			$.ajax({
				url:"json/menu_sport.json",
				dataType:"json",
				success:function(mag){
					var str = "";
					var data = mag.data;
					for(var i in data){
						str += '<div class="categoryy"><h3><a href="list.html" target="_blank"><img src="'+ data[i].img +'"/></a></h3><p><a class="l" href="#">'+data[i].good1+'</a><a href="#" class="l">'+data[i].good2+'</a><a class="l" href="#">'+data[i].good3+'</a><a href="#" class="l">'+data[i].good4+'</a><a class="l" href="#">'+data[i].good5+'</a><a href="#" class="l">'+data[i].good6+'</a><a class="l" href="#">'+data[i].good7+'</a><a href="#" class="l">'+data[i].good8+'</a><a class="l" href="#">'+data[i].good9+'</a><a href="#" class="l">'+data[i].good10+'</a></p></div>';
					}
					$(".menu_child").html(str);
					$(".menu_child a.l").css({"width":"64px","line-height":"22px"}).attr("href","html/list.html").attr("target","_blank");
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
				url:"json/menu_outdoors.json",
				dataType:"json",
				success:function(mag){
					var str = "";
					var data = mag.data;
					for(var i in data){
						str += '<div class="categoryy"><h3><a href="#"><img src="'+ data[i].img +'"/></a></h3><p><a class="l" href="#">'+data[i].good1+'</a><a href="#" class="l">'+data[i].good2+'</a><a class="l red" href="#">'+data[i].good3+'</a><a href="#" class="l">'+data[i].good4+'</a><a class="l" href="#">'+data[i].good5+'</a><a href="#" class="l">'+data[i].good6+'</a><a class="l" href="#">'+data[i].good7+'</a><a href="#" class="l">'+data[i].good8+'</a><a class="l red" href="#">'+data[i].good9+'</a></p></div>';
					}
					$(".menu_child").html(str);
					$(".menu_child a.l").css({"width":"64px","line-height":"22px"}).attr("href","html/list.html").attr("target","_blank");
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
				url:"json/menu_shoe.json",
				dataType:"json",
				success:function(mag){
					var str = "";
					var data = mag.data;
					for(var i in data){
						str += '<div class="categoryy"><h3><a href="#"><img src="'+ data[i].img +'"/></a></h3><p><a class="l red" href="#">'+data[i].good1+'</a><a href="#" class="l">'+data[i].good2+'</a><a class="l" href="#">'+data[i].good3+'</a><a href="#" class="l">'+data[i].good4+'</a><a class="l" href="#">'+data[i].good5+'</a><a href="#" class="l">'+data[i].good6+'</a><a class="l" href="#">'+data[i].good7+'</a><a href="#" class="l red">'+data[i].good8+'</a></p></div>';
					}
					$(".menu_child").html(str);
					$(".menu_child a.l").css({"width":"64px","line-height":"22px"}).attr("href","html/list.html").attr("target","_blank");
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
				url:"json/menu_clothes.json",
				dataType:"json",
				success:function(mag){
					var str = "";
					var data = mag.data;
					for(var i in data){
						str += '<div class="categoryy"><h3><a href="#"><img src="'+ data[i].img +'"/></a></h3><p><a class="l" href="#">'+data[i].good1+'</a><a href="#" class="l red">'+data[i].good2+'</a><a class="l" href="#">'+data[i].good3+'</a><a href="#" class="l">'+data[i].good4+'</a><a class="l" href="#">'+data[i].good5+'</a><a href="#" class="l">'+data[i].good6+'</a><a class="l" href="#">'+data[i].good7+'</a><a href="#" class="l red">'+data[i].good8+'</a></p></div>';
					}
					$(".menu_child").html(str);
					$(".menu_child a.l").css({"width":"64px","line-height":"22px"}).attr("href","html/list.html").attr("target","_blank");
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
				url:"json/menu_clothes.json",
				dataType:"json",
				success:function(mag){
					var str = "";
					var data = mag.data1;
					for(var i in data){
						str += '<div class="categoryy"><h3><a href="#"><img src="'+ data[i].img +'"/></a></h3><p><a class="l" href="#">'+data[i].good1+'</a><a href="#" class="l red">'+data[i].good2+'</a><a class="l" href="#">'+data[i].good3+'</a><a href="#" class="l">'+data[i].good4+'</a><a class="l" href="#">'+data[i].good5+'</a><a href="#" class="l">'+data[i].good6+'</a></p></div>';
					}
					$(".menu_child").html(str);
					$(".menu_child a.l").css({"width":"64px","line-height":"22px"}).attr("href","html/list.html").attr("target","_blank");
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
				url:"json/menu_clothes.json",
				dataType:"json",
				success:function(mag){
					var str = "";
					var data = mag.data2;
					for(var i in data){
						str += '<div class="categoryy"><h3><a href="#"><img src="'+ data[i].img +'"/></a></h3><p><a class="l" href="#">'+data[i].good1+'</a><a href="#" class="l red">'+data[i].good2+'</a><a class="l" href="#">'+data[i].good3+'</a><a href="#" class="l">'+data[i].good4+'</a><a class="l" href="#">'+data[i].good5+'</a><a href="#" class="l">'+data[i].good6+'</a></p></div>';
					}
					$(".menu_child").html(str);
					$(".menu_child a.l").css({"width":"64px","line-height":"22px"}).attr("href","html/list.html").attr("target","_blank");
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
	
})
//热门品牌
$(function(){
	$.ajax({
		url:"json/brand-pic.json",
		dataType:"json",
		success:function(mag){
			var str1 = "";
			var str2 = "";
			var data1 = mag.data1;
			var data2 = mag.data2;
			for(var i in data1){
				str1 += '<a href="#" title="'+data1[i].title +'" alt="'+data1[i].title+'" class="l"><img src="img/brand_logo/'+data1[i].img+'"/></a>'
			}
			for(var j in data2){
				str2 += '<a href="#" title="'+data2[j].title +'" alt="'+data2[j].title+'" class="l"><img src="img/brand_logo/'+data2[j].img+'"/></a>'
			}
			$("#brand div.brand_logo li.first").append(str1);
			$("#brand div.brand_logo li.last").append(str2);
			$("#brand div.brand_logo li a").css({"width":"110px","height":"50px","marginTop":"5px"});
			$("#brand div.brand_logo li a img").css("margin","5px")	
		}
	});
	var btn_left = $("#brand div.brand div.left");
	var btn_right = $("#brand div.brand div.right");
	var $Ul = $("#brand div.brand_logo ul.brand_logo");
	var _index = 0;
	var timer = setInterval(move,6000);
	btn_right.click(function(){
		clearInterval(timer);
		_index++;
		_index = _index > 1? 1:0;
		move();
		timer = setInterval(move,6000);
	});
	$Ul.hover(function(){
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
		$Ul.stop(true).animate({"margin-left":-_index * 1105},600);
	}
	var $Img = $("#brand div.brand ul.brand li img");
	$Img.mouseenter(function(){
		$(this).stop(true).animate({"width":"300px","margin-left":"-150px","margin-top":"-180px"},600,function(){
			$(this).stop(true).animate({"width":"267px","margin-left":"-133px","margin-top":"-160px"},600)
		});
	})
});
//调用json数据，补全网页信息
$(function(){
	$.ajax({
		url:"json/content.json",
		dataType:"json",
		success:function(mag){
			var data = mag.data;
			var str = "";
			for(var i in data){
				str += '<div class="content"><div class="title"><a href="#" class="l">'+data[i].title+'</a><a href="#" class="r">more >></a></div><div class="goodsImg"><dl class="l"><dt><img src="img/brand/'+data[i].dt+'"/></dt><dd><a href="#" class="l"><img src="img/brand/'+data[i].dd1+'"/></a><a href="#" class="l"><img src="img/brand/'+data[i].dd2+'"/></a><a href="#" class="l"><img src="img/brand/'+data[i].dd3+'"/></a><a href="#" class="l"><img src="img/brand/'+data[i].dd4+'"/></a><a href="#" class="l"><img src="img/brand/'+data[i].dd5+'"/></a><a href="#" class="l"><img src="img/brand/'+data[i].dd6+'"/></a><a href="#" class="l"><img src="img/brand/'+data[i].dd7+'"/></a><a href="#" class="l"><img src="img/brand/'+data[i].dd8+'"/></a><a href="#" class="l"><img src="img/brand/'+data[i].dd9+'"/></a><a href="#" class="l"><img src="img/brand/'+data[i].dd10+'"/></a></dd></dl><div class="Img l"><a href="#"><img src="img/brand/'+data[i].Img+'"/></a></div><ul class="r brand"><li><a href="#" class="l"><img src="img/brand/'+data[i].goods1+'"/></a><a href="#" class="l"><img src="img/brand/'+data[i].goods2+'"/></a><a href="#" class="l"><img src="img/brand/'+data[i].goods3+'"/></a></li><li><a href="#" class="l"><img src="img/brand/'+data[i].goods4+'"/></a><a href="#" class="l"><img src="img/brand/'+data[i].goods5+'"/></a><a href="#" class="l"><img src="img/brand/'+data[i].goods6+'"/></a></li></ul></div></div>'
			}
			$("#content").append(str);
			$("#content div.goodsImg dd a").css({"width":"100px","height":"50px","margin-top":"20px"});
		}
	});
});

//热卖专区
$(function(){
	var _index = 0;
	var $li = $("#hot div.hot_goods ul.tab li");
	$li.mouseover(function(){
		_index = $(this).index();
		$("#hot div.hot_goods ul.goods li").eq(_index).show().siblings().hide();		
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	$.ajax({
		url:"json/hot-goods.json",
		dataType:"json",
		success:function(mag){
			var data = mag.data;
			var str = "";
			for(var i in data){
				str += '<li><dl class="l"><dt><img src="img/brand/'+data[i].img1+'"/><b>限时抢¥'+data[i].sale1+'</b></dt><dd><a href="#">'+data[i].title1+'</a><p class="price">¥<strong>'+ data[i].price1 +'</strong><del>¥'+data[i].del1+'</del></p></dd></dl><dl class="l"><dt><img src="img/brand/'+data[i].img2+'"/><b>限时抢¥'+data[i].sale2+'</b></dt><dd><a href="#">'+data[i].title2+'</a><p class="price">¥<strong>'+data[i].price2+'</strong><del>¥'+data[i].del2+'</del></p></dd></dl><dl class="l"><dt><img src="img/brand/'+data[i].img3+'"/><b>限时抢¥'+data[i].sale3+'</b></dt><dd><a href="#">'+data[i].title3+'</a><p class="price">¥<strong>'+data[i].price3+'</strong><del>¥'+data[i].del3+'</del></p></dd></dl><dl class="l"><dt><img src="img/brand/'+data[i].img4+'"/><b>限时抢¥'+data[i].sale4+'</b></dt><dd><a href="#">'+data[i].title4+'</a><p class="price">¥<strong>'+data[i].price4+'</strong><del>¥'+data[i].del4+'</del></p></dd></dl></li>'
			}
			$("#hot div.hot_goods ul.goods").append(str);
			$("#hot div.hot_goods ul.goods li").eq(0).css("z-index","1");
			$("#hot div.hot_goods ul.goods li img").css("cursor","pointer");
		}
	});
})

//优购导购
$(function(){
	var $ul = $("#guide ul.guide_logo")
	$.ajax({
		url:"json/guide-logo.json",
		async:true,
		dataType:"json",
		success:function(mag){
			var str1 = "";
			var str2 = "";
			var data1 = mag.data1;
			var data2 = mag.data2;
			for(var i in data1){
				str1 += '<a href="#"><img src="img/brand_logo/'+data1[i].img+'"/>'+data1[i].title+'</a>'
			}
			for(var j in data2){
				str2 += '<a href="#"><img src="img/brand_logo/'+data2[j].img+'"/>'+data2[j].title+'</a>';
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
		url:"json/guide.json",
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
//遮罩广告
$(function(){
	$("#mark div.center a").click(function(){
		$("#mark").css("display","none");
	})
})

















