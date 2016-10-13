//详情页
$(function(){
	//选择尺码
	var $color = $("#details div.center p.color a.l");
	var $size = $("#details div.center p.size a.l");
	var $Scolor = $("#details div.center p.nums span.color");
	var $Ssize = $("#details div.center p.nums span.size");
	$color.click(function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		$Scolor.text($(this).find("input").val());
	})
	$size.click(function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		$Ssize.text($(this).text())
	})
	var $fdj = $("#details div.magnify div.fdj");
	var $mark = $("#details div.magnify div.pic-s div.mark");
	$.ajax({
		url:"../json/list-goods.json",
		dataType:"json",
		success:function(mag){
			var data = mag.data;
			var str1 = str2 = str3 = "";
			for(var i in data){
				for(var j in data[i].data1){
					if(data[i].data1[j].goodsId == getCookie("goodsId")){
						str1 = data[i].data1[j].title1;
						str3 = '<h3>'+data[i].data1[j].title1+'</h3><p class="more"><a href="list.html">更多inman/茵曼商品>></a></p><p class="price"><span>¥<b>'+data[i].data1[j].sale1+'</b></span><del>¥'+data[i].data1[j].del1+'</del><strong>不支持使用优惠券</strong></p>';
						str2 = '<img class="clone" id="'+ data[i].data1[j].goodsId +'" color="" size="" num="" src="../img/list/'+ data[i].data1[j].img1 +'"/>';
					}
				}
			}
			$("#details div.center p.pj").before(str3);
			$("#details div.title span.title").text(str1);
			$("#details div.magnify div.pic").append(str2);
			$("#details div.magnify div.pic-l").append(str2);
			$("#details .pic-list li").eq(0).append(str2);
			
			//放大镜
			var $picL = $("#details div.magnify div.pic-l img");
			$("#details div.pic.left").hover(function(){
				$fdj.css("display","block");
				$picL.parent().css("display","block");
			},function(){
				$fdj.css("display","none");
				$picL.parent().css("display","none");
			})
			$("#details").on("mousemove",".mark",function(evt){
				var e = evt || window.event;
				var L = e.offsetX;
				var T = e.offsetY;
				var oL = L - 120;
				var oT = T - 120;
				if(L < 120){
					oL = 0
				}else if(L > 360){
					oL = 240;
				}
				if(T < 120){
					oT = 0
				}else if(T > 360 ){
					oT = 240;
				}
				$fdj.css({"left":oL,"top":oT});
				$picL.css({"margin-left":(-oL/480)*960,"margin-top":(-oT/480)*900})
			})
		//加入购物车
		var btn_cart = $("#details div.center p.buy a.cart");
		var btn_buy = $("#details div.center p.buy a.buy");
		var btn_jia = $("#details div.center p.nums a.jia");
		var btn_jian = $("#details div.center p.nums a.jian");
		var _nums = 1;
		var goods = $picL.attr("id");
		btn_jia.click(function(){
			_nums++;
			_num = _nums>10? 10 : _nums;
			$("#details div.center p.nums input").val(_nums);
		})
		btn_jian.click(function(){
			_nums--;
			_nums = _nums<2?1:_nums;
			$("#details div.center p.nums input").val(_nums);
		})
		btn_cart.click(function(){
			var color = $Scolor.text();
			var size = $Ssize.text();
			if(getCookie("true")!="true"){
				if(confirm("亲，您还未登录！去登陆？")){
					window.location.href = "login.html";
				}	
			}else{
				if(color == ""){
					alert("请选择颜色")
				}else if(size == ""){
					alert("请选择尺码");
				}else{
					if(getCookie(goods + "n")){
						num = Number(getCookie(goods + "n")) + Number($("#details div.center p.nums input").val());
					}else{
						num = Number($("#details div.center p.nums input").val());
					}
					setCookie(goods,goods,setCookieDate(7));
					setCookie(goods + "n",num,setCookieDate(7));
					setCookie(goods + "c",color,setCookieDate(7));
					setCookie(goods + "s",size,setCookieDate(7));
					var All = 0;
					for(var i=0; i<200; i++){
						var a = Number(getCookie(i + "n"));
						All += a;
					}
					setCookie("All",All,setCookieDate(7));
					//飞入效果
					$("#details div.magnify div.pic img.clone").clone().css({"position":"absolute","z-index":"10000","top":"226px","width":"480px"}).appendTo($("body")).animate({"right":"100px","width":"20px","top":"80px","opacity":"0","filter":"alpha(opacity=0)"},1000,function(){
						$(this).detach();
						window.location.reload();
					});
				}
			}
		})
		//直接购买
		btn_buy.click(function(){
			var color = $Scolor.text();
			var size = $Ssize.text();
			if(getCookie("true")!="true"){
				if(confirm("亲，您还未登录！去登陆？")){
					window.location.href = "login.html";
				}	
			}else{
				if(color == ""){
					alert("请选择颜色")
				}else if(size == ""){
					alert("请选择尺码");
				}else{
					if(getCookie(goods + "n")){
						num = Number(getCookie(goods + "n")) + Number($("#details div.center p.nums input").val());
					}else{
						num = Number($("#details div.center p.nums input").val());
					}
					setCookie(goods,goods,setCookieDate(7));
					setCookie(goods + "n",num,setCookieDate(7));
					setCookie(goods + "c",color,setCookieDate(7));
					setCookie(goods + "s",size,setCookieDate(7));
					for(var i = 0 ; i < 200; i++){
						removeCookie(i + "b");
					}
					setCookie(goods + "b",goods);
					var All = 0;
					for(var i=0; i<200; i++){
						var a = Number(getCookie(i + "n"));
						All += a;
					}
					setCookie("All",All,setCookieDate(7));
					window.location.href = "pay.html";
				}
			}
		})		
		}
	});
	var $li = $("#details .pic-list li");
	$li.mouseover(function(){
		var str = $(this).find("img").attr("src");		
		$(this).addClass("cur").siblings().removeClass("cur");
		$("#details div.pic-l img").attr("src",str)
		$("#details div.pic.left img").attr("src",str);
	})
})
//look看了又看
$(function(){
	$.ajax({
		url:"../json/look-details.json",
		dataType:"json",
		success:function(mag){
			var str = "";
			var data = mag.data;
			for(var i in data){
				str += '<li>';
				for(var j in data[i].data1){
					str += '<dl><dt><a href="#"><img src="../img/details/look/'+data[i].data1[j].img+'"/></a></dt><dd>'+data[i].data1[j].brand+'<span class="r">￥'+data[i].data1[j].price+'</span></dd></dl>'
				}
				str += '</li>'
			}
			$("#details div.look ul").append(str);
		}
	});
	var timer = null;
	var _index = 0;
	var btn_prev = $("#details div.look a.prev");
	var btn_next = $("#details div.look a.next");
	timer = setInterval(move,5000);
	btn_next.click(function(){
		clearInterval(timer);
		$("#details div.look ul").css("margin-top","-520px");
		$("#details div.look ul li").eq(3).prependTo($("#details div.look ul"));
		$("#details div.look ul").stop(true).animate({"margin-top":0},1000);
		timer = setInterval(move,5000);
	});
	btn_prev.hover(function(){
		$(this).css("background-position-y","-218px")
	},function(){
		$(this).css("background-position-y","-157px")
	})
	btn_next.hover(function(){
		$(this).css("background-position-y","-246px")
	},function(){
		$(this).css("background-position-y","-184px")	
	})
	btn_prev.click(function(){
		clearInterval(timer);
		move();
		timer = setInterval(move,5000);
	})
	$("#details div.look ul").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(move,5000);
	})
	function move(){
		$("#details div.look ul").stop(true).animate({"margin-top":-520},1000,function(){
			$("#details div.look ul li").eq(0).appendTo($("#details div.look ul"));
			$("#details div.look ul").css("margin-top","0");		
		});
	}
})
//推荐
$(function(){
	$.ajax({
		url:"../json/look-details.json",
		dataType:"json",
		success:function(mag){
			var str = "";
			var data = mag.data;
			for(var i in data){
				str += '<li>'
				for(var j in data[i].data1){
					str += '<dl><dt><a href="#"><img src="../img/details/look/'+ data[i].data1[j].img +'"></a></dt><dd><a href="#">'+ data[i].data1[j].title +'</a><p class="price">¥<em>'+ data[i].data1[j].price +'</em><del>'+ data[i].data1[j].del +'</del></p></dd></dl>';
					str += '<dl><dt><a href="#"><img src="../img/details/look/'+ data[i].data1[j].img +'"></a></dt><dd><a href="#">'+ data[i].data1[j].title +'</a><p class="price">¥<em>'+ data[i].data1[j].price +'</em><del>'+ data[i].data1[j].del +'</del></p></dd></dl>'
				}
				str += '</li>'
			}
			$("#reco div.goods ul").append(str);
			var _index = 0;
			var $ul = $("#reco div.goods ul");
			var $li = $("#reco div.goods ul li");
			var btn_prev = $("#reco a.prev");
			var btn_next = $("#reco a.next");
			btn_prev.click(function(){
				_index--;
				_index = _index < 0? 3: _index;
				move();
				$("#reco p.r span").html(_index+1);
			})
			btn_next.click(function(){
				_index++;
				_index = _index > 3? 0: _index;
				move();
				$("#reco p.r span").html(_index+1);
			})
			function move(){
				$ul.stop(true).animate({"margin-left":-_index*1140},1000);		
			}
		}
	});
})
//商品详情
$(function(){
	$(window).scroll(function(){
		if($(this).scrollTop()>1180){
			$("#goods_details ul.title").css({"position":"fixed","top":"0","left":"3%"})
		}else{
			$("#goods_details ul.title").css({"position":"relative","top":"0","left":"0"})
		}
	})
	$("#goods_details ul.title li").click(function(){
		$("body,html").scrollTop(1180);
		$(this).addClass("cur").siblings().removeClass("cur");
	})
	$.ajax({
		url:"../json/look-details.json",
		success:function(mag){
			var str = "";
			var data = mag.data;
			for(var i in data){
				for(var j in data[i].data1){
					str += '<dl><dt><a href="#"><img src="../img/details/look/'+ data[i].data1[j].img +'"></a></dt><dd><a href="#">'+ data[i].data1[j].title +'</a><p class="price">¥<em>'+ data[i].data1[j].price +'</em><del>'+ data[i].data1[j].del +'</del></p></dd></dl>';
				}
			}
			$("#goods_details div.right ul.goods li").append(str);
		}
	});
})



























