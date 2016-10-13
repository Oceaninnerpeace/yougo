$(function(){
	var $app = $("#header ul .last .app")
	$("#header ul .last").hover(function(){
		$app.css("display","block");
		$(this).css({"background":"#fff"})
	},function(){
		$app.css("display","none");
		$(this).css("background","0")
	})
	$("#header ul .par").hover(function(){
		$(this).find("a.first").css({"background":"#fff","border-right":"1px #e6e6e6 solid","border-left":"1px #e6e6e6 solid"})
		$(this).children().last().css("display","block")
	},function(){
		$(this).find("a.first").css({"background":"0","border":"0"});
		$(this).children().last().css("display","none");		
	})
})
$(function(){
	$("#header .seoul").hover(function(){
		$(this).text("Seoul Station");
	},function(){
		$(this).text("首尔站");
	})
	$("#header .seoul").click(function(){
		
	})
})