
function setCookie(key,value,expires,path="/",domain,secure){
	var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	if(expires instanceof Date){
		cookie += ";expires=" + expires;
	}
	if(path){
		cookie += ";path=" + path;
	}
	if(domain){
		cookie += ";domain=" + domain;
	}
	if(secure){
		cookie += ";secure";
	}
	document.cookie = cookie;
}

//创建失效时间
function setCookieDate(day){
	var date = null;
	if(typeof day == "number" && day > 0){
		date = new Date();
		date.setDate(date.getDate() + day);
	}
	return date;
}

function getCookie(key){
	var cookieName = encodeURIComponent(key) + "=";
	var cookieValue = "";
	var cookieStart = document.cookie.indexOf(cookieName);
	if(cookieStart > -1){
		var cookieEnd = document.cookie.indexOf(";",cookieStart);
		if(cookieEnd == -1){
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
	}
	return cookieValue;
}

function removeCookie(key){
	document.cookie = encodeURIComponent(key) + "=;expires=" + new Date(0) + "=;path=" + "/";	
}


































