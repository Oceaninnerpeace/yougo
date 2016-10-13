//注册信息验证
$(function(){
	var i = 0;
	var name = null;
	$("#banner form select").click(function(){
		name = $("#banner form select").val();
		i++;
		$("#banner form select").blur(function(){
			i = 0;
		});
		if(i % 2 == 0){
			if(name == "邮箱"){
				$("#banner form .verify2").css("display","none");
				$("#getVerify").css("display","none");
				$("#user").attr("placeholder"," 不建议填写gmail、Hotmail、QQ邮箱");
			}else{
				$("#banner form .verify2").css("display","inline-block");
				$("#getVerify").css("display","inline-block");	
				$("#user").attr("placeholder"," 请输入您的手机号码");
				
			}
		}
	});
	//手机验证码
	$("#getVerify").click(function(){
		var sec = 60;
		var timer = null;
		timer = setInterval(function(){
			sec--;
			if(sec < 1){
				clearInterval(timer);
				$("#getVerify").html("获取验证码")	
			}
			$("#getVerify").html(sec +"秒后重新获取")
		},1000)
	})
	
	$("#user").focus(function(){
		$(this).attr("value","");
		$(this).parent().css("border-color","#E6E6E6");
	})
	$("#user").blur(function(){
		var reg1 = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		var reg2 = /^1(3|5|7|8){1}(\d){9}$/;
		var str = $(this).val();
		name = $("#banner form select").val();
		if(name == "邮箱"){
			if(str == ""){
				$(this).attr("placeholder"," 不建议填写gmail、Hotmail、QQ邮箱");
				$(this).parents(".wrap").css("border-color","red");
				$(this).parent().next().css({"display":"block","color":"red"}).html("请输入邮箱号码");
			}else if(reg1.test(str)){
				$(this).parents(".wrap").css("border-color","#E6E6E6");
				$(this).parent().next().css({"display":"block","color":"green","background":"url(../img/reg_sprite2.png) no-repeat -318px -2px"}).html("格式正确");				
			}else{
				$(this).parents(".wrap").css("border-color","#E6E6E6");
				$(this).parent().next().css({"display":"block","color":"red"}).html("格式错误");				
			}
		}else if(name == "手机号"){
			if(str == ""){
				$(this).attr("placeholder","请输入您的手机号码")
				$(this).parents(".wrap").css("border-color","red");
				$(this).parent().next().css({"display":"block","color":"red"}).html("请输入手机号码");
			}else if(reg2.test(str)){
				$(this).parents(".wrap").css("border-color","#E6E6E6");
				$(this).parent().next().css({"display":"block","color":"green","background":"url(../img/reg_sprite2.png) no-repeat -318px -2px"}).html("格式正确");					
			}else{
				$(this).parents(".wrap").css("border-color","#E6E6E6");
				$(this).parent().next().css({"display":"block","color":"red"}).html("格式错误");					
			}
		}
	})
	$("#verify1").focus(function(){
		$(this).parents(".wrap").css("border-color","#E6E6E6");
	})
	$("#verify1").blur(function(){
		var str1 = $("#verify-pic").html();
		var str2 = $(this).val();
		if(str2 == ""){
			$(this).parent().parent().css("border-color","red");
			$(this).parent().next().css({"color":"red","display":"block"}).html("请输入验证码");
		}else if(str1 != str2){
			$(this).parent().next().css({"color":"red","display":"block"}).html("验证码错误");			
		}else{
			$(this).parent().next().css({"display":"block","color":"green","background":"url(../img/reg_sprite2.png) no-repeat -318px -2px"}).html("验证码正确");						
		}
	})
	$("#verify-pic").click(function(){
		var arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','l','r','s','t','u','v','w','x','y','z'];
		var list = [];
		var a = Math.floor(Math.random()*36);
		var b = Math.floor(Math.random()*36);
		var c = Math.floor(Math.random()*36);
		var d = Math.floor(Math.random()*36);
		list = [arr[a],arr[b],arr[c],arr[d]];
		$(this).html(list);
	})
	$("#verify2").blur(function(){
		if($(this).val()==""){
			$(this).parent().next().css({"color":"red","display":"block"}).html("请输入验证码");
		}
	})
	$("#password1").focus(function(){
		$(this).parents(".wrap").css("border-color","#E6E6E6");	
		var oP = $(this).parent().next();
		var reg = 	/^[a-zA-Z0-9_-]{6,25}$/;
		$(window).keydown(function(){
			var str = $("#password1").val();
			if(reg.test(str)){
				if(str.length < 8){
					oP.css({"color":"red","display":"block","background":"url(../img/reg_sprite2.png) no-repeat -318px -2px"}).html("安全性低")					
				}else if(str.length < 16){
					oP.css({"color":"yellow","display":"block","background":"url(../img/reg_sprite2.png) no-repeat -318px -2px"}).html("安全性中")
				}else{
					oP.css({"color":"green","display":"block","background":"url(../img/reg_sprite2.png) no-repeat -318px -2px"}).html("安全性高")
				}
			}else{
				oP.css({"color":"red","display":"block","background":"url(../img/icon_sig_reg.png) no-repeat -186px -99px"}).html("格式不正确")
			}
		})
	})
	$("#password1").blur(function(){
		if($(this).val() == ""){
			$(this).parents(".wrap").css("border-color","red");
			$(this).parent().next().css({"display":"block","color":"red","background":"url(../img/icon_sig_reg.png) no-repeat -186px -99px"}).html("请输入密码");			
		}
	})
	$("#password2").blur(function(){
		var str = $("#password1").val();
		if($(this).val()==""){
			$(this).parents(".wrap").find("p").css({"color":"red","display":"block","background":"url(../img/icon_sig_reg.png) no-repeat -186px -99px"}).html("请输入密码");
			$(this).parent().parent().css("border-color","red");
		}else{
			if(str != $(this).val()){
				$(this).parents(".wrap").find("p").css({"color":"red","display":"block","background":"url(../img/icon_sig_reg.png) no-repeat -186px -99px"}).html("密码不正确");
			}else{
				$(this).parent().next().css({"color":"green","display":"block","background":"url(../img/reg_sprite2.png) no-repeat -318px -2px"}).html("密码一致");	
				$("#register").click(function(){
					var user = $("#user").val();
					var pass = $("#password2").val();
					setCookie(user,user,setCookieDate(7));
					setCookie(pass,pass,setCookieDate(7));
					window.location.href = "login.html" ;
				})			
			}		
		}
	})
	$("form .wrap").find("p").css({"position":"absolute","padding-left":"20px","top":"40px","display":"none"})
})

