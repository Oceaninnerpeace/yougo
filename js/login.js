$(function(){
	var a = 0;
	$("#login").click(function(){
		var name = $("#user").val();
		var pwd = $("#password").val();
		if(name == getCookie(name)&&pwd == getCookie(pwd)&&name!=""){
			if($("#banner form div.code").css("display") == "block"){
				var reg = $("#banner form div.code a.code").html();
				var str = $("#code").val();
				if(reg == str){
					setCookie("true", true,setCookieDate(7));
					window.location.href = "../index.html";					
				}else{
					$("#tip").css({"display":"block","color":"red"}).html("验证码错误");
				}
			}else{
				setCookie("user",name,setCookieDate(7));
				setCookie("true", true,setCookieDate(7));
				window.location.href = "../index.html";		
			}
		}else{
			a++;
			$("#tip").css({"display":"block","color":"red"}).html("账号或密码错误");
		}
		if (a > 2) {
			$("#banner form div.code").css("display","block");
		}
	})
	$("#banner form div.code a.code").click(function(){
		var arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','l','r','s','t','u','v','w','x','y','z'];
		var list = [];
		var a = Math.floor(Math.random()*36);
		var b = Math.floor(Math.random()*36);
		var c = Math.floor(Math.random()*36);
		var d = Math.floor(Math.random()*36);
		list = [arr[a],arr[b],arr[c],arr[d]];
		$(this).html(list);
	})	
})