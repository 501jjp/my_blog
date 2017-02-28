//对输入框的改变
function addmessage(message, type, elementId) {

    var eme = document.getElementById(elementId);
    var spanmsg = createspanmsg(message);
    var gly = creategly(type);
    eme.setAttribute("class", "form-group has-" + type + " has-feedback");
    eme.appendChild(spanmsg);
    eme.appendChild(gly);
}

function createspanmsg(message) {

    var spanmsg = document.createElement("span");
    spanmsg.setAttribute("class", "help-block");
    spanmsg.innerHTML = message;
    return spanmsg;
}

function creategly(type) {

    var gly = document.createElement("span");
    switch (type) {
        case "success": gly.setAttribute("class", "glyphicon glyphicon-ok form-control-feedback");
            break;
        case "warning": gly.setAttribute("class", "glyphicon glyphicon-wanring-sign form-control-feedback");
            break;
        case "error": gly.setAttribute("class", "glyphicon glyphicon-remove form-control-feedback");
            break;
        default: break;
    }
    return gly;
}

//登录操作
function logins() {
    function getjson(string) {
        string = string.substr(32);
        return JSON.parse(string);
    }

    function handle(string) {
        var da = getjson(string);
        if (da.code == 400) {
            if (da.msg == "用户不存在") {
                addmessage(da.msg, "error", "dusername");
            }
            if (da.msg == "用户名密码错误") {
                addmessage(da.msg, "error", "dpassword");
            }
        }
        if (da.code == 200) {
            localStorage.setItem("message", JSON.stringify(da));
            window.location.href = "./index.html";
            var ddd=localStorage.getItem("message");
        }
        //document.getElementById("dusername").innerHTML=string;
    }
    var login = document.getElementById("login");
    login.onclick = function () {
        var request = new XMLHttpRequest();
        //request.open("POST", "http://localhost/phps/yii/bms/api/web/v1/logins");
        request.open("POST", "http://119.29.119.182/phps/my_blog/api/web/v1/logins");
        var data = "username=" + document.getElementById("username").value
            + "&password=" + document.getElementById("password").value
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(data);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    handle(request.responseText);
                } else {
                    console.log(request.status);
                }
            }
        }
    }
}


logins();



