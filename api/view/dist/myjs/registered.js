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
        case "warning": gly.setAttribute("class", "glyphicon glyphicon-warning-sign form-control-feedback");
            break;
        case "error": gly.setAttribute("class", "glyphicon glyphicon-remove form-control-feedback");
            break;
        default: break;
    }
    return gly;
}

//登录前的检擦
function registereds() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var reenterpassword = document.getElementById("reenterpassword");
    var email = document.getElementById("email");
    var registered = document.getElementById("registered");
    var checkbox = document.getElementById("checkbox");
    password.setAttribute("t", "0");
    reenterpassword.setAttribute("t", "0");
    email.setAttribute("t", "0");
    username.setAttribute("t", "0");
    registered.onclick = function () {

        function handle(string){
            var da= JSON.parse(string);
            if(document.getElementById("alertmsg")){
                document.getElementById("alert").removeChild(document.getElementById("alertmsg"));
            }
            if(da.code=="200"){
                var alert=document.getElementById("alert");
                var div=document.createElement("div");
                div.setAttribute("class","alert alert-success text-center");
                div.setAttribute("role","alert");
                div.setAttribute("id","alertmsg");
                div.setAttribute("time","5");
                div.innerHTML="注册成功(将在5秒后跳转至<a href='./login.html'>登录</a>界面)";
                alert.appendChild(div);
                setInterval(function(){
                    var alertmsg=document.getElementById("alertmsg");
                    var time=alertmsg.getAttribute("time");
                    time=time-1;
                    alertmsg.setAttribute("time",""+time);
                    if(time<0){
                        window.location.href="./login.html";
                    }else{
                        alertmsg.innerHTML="注册成功(将在"+time+"秒后跳转至<a href='./login.html'>登录</a>界面)";
                    }
                },1000)
            }else{
                var alert=document.getElementById("alert");
                var div=document.createElement("div");
                div.setAttribute("class","alert alert-danger text-center");
                div.setAttribute("role","alert");
                div.setAttribute("id","alertmsg");
                div.setAttribute("time","5");
                div.setAttribute("t","1");
                div.innerHTML="注册失败"+"("+da.msg+")";
                alert.appendChild(div);
            }
        }

        var e = checkemail("error");
        var p=checkpassword();
        var u=checkusername();
        var check=document.getElementById("checkbox").checked;
        var eeeee=1+1;
        if (e && u && p&&check) {
            var request = new XMLHttpRequest;
            request.open("POST", "http://localhost/phps/yii/bms/api/web/v1/registereds");
            var data = "username=" + document.getElementById("username").value
                + "&password=" + document.getElementById("password").value + "&email=" + document.getElementById("email").value;
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
}

//邮箱检测
function checkemail(type){
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        email=document.getElementById("email").value;
        if (!reg.test(email)&&document.getElementById("email").getAttribute("t")=="0") {
            addmessage("邮箱格式不正确",type,"demail");
            document.getElementById("email").setAttribute("t","1");
            return false
        }
        else if(reg.test(email)){
            var demail= document.getElementById("demail");
            var ch=demail.getElementsByTagName("span");
            while(ch[0]){
                    demail.removeChild(ch[0]);
                    demail.setAttribute("class", "form-group");
            }
            document.getElementById("email").value=email;
            document.getElementById("email").setAttribute("t","0");
            return true;
        }
        else{
            return;
        }
}

//登录前邮箱检测
function email(){
    var email = document.getElementById("email");
    email.setAttribute("t","0");
    email.onblur=function(){

        checkemail("warning");
    }
}

//检擦密码
function checkpassword(){
    var pp;
    var pr;
    var password=document.getElementById("password").value;
    var reenterpassword = document.getElementById("reenterpassword").value;
    if(document.getElementById("password").value==""&&document.getElementById("password").getAttribute("t")=="0"){
        addmessage("密码不能为空","error","dpassword");
        document.getElementById("password").setAttribute("t","1");
        return false;
    }
    if (document.getElementById("password").value != "") {
        var dpassword = document.getElementById("dpassword");
        var ch = dpassword.getElementsByTagName("span");
            while(ch[0]){
                    dpassword.removeChild(ch[0]);
                    dpassword.setAttribute("class", "form-group");
            }
        document.getElementById("password").value = password;
        document.getElementById("password").setAttribute("t", "0");
        pp = true;
    }
    if(document.getElementById("password").value!=document.getElementById("reenterpassword").value&&document.getElementById("reenterpassword").getAttribute("t")=="0"){
        addmessage("密码前后不一至","error","dreenterpassword");
        document.getElementById("reenterpassword").setAttribute("t","1");
        return false;
    }
    if(document.getElementById("password").value==document.getElementById("reenterpassword").value){
        var dreenterpassword = document.getElementById("dreenterpassword");
        var ch = dreenterpassword.getElementsByTagName("span");
        while(ch[0]){
                    dreenterpassword.removeChild(ch[0]);
                    dreenterpassword.setAttribute("class", "form-group");
            }
        document.getElementById("password").value = reenterpassword;
        document.getElementById("reenterpassword").setAttribute("t", "0");
        pr=true;
    }
    if(pr&&pp){
        return true;
    }
}

//检擦用户名
function checkusername() {
    var username = document.getElementById("username").value;
    if (document.getElementById("username").value == "" && document.getElementById("username").getAttribute("t") == "0") {
        addmessage("用户名不能为空", "error", "dusername");
        document.getElementById("username").setAttribute("t", "1");
        return false;
    }
    if (document.getElementById("username").value != "") {
        var dusername = document.getElementById("dusername");
        var ch = dusername.getElementsByTagName("span");
        while (ch[0]) {
            dusername.removeChild(ch[0]);
            dusername.setAttribute("class", "form-group");
        }
        document.getElementById("username").value = username;
        document.getElementById("username").setAttribute("t", "0");
        return true;
    }
}

function checkboxcheck(){
    document.getElementById("checkbox").onclick=function(){
        var sds=1+1;
        if(document.getElementById("checkbox").checked){
            document.getElementById("registered").removeAttribute("disabled");
        }else{
            document.getElementById("registered").setAttribute("disabled","disabled");
        }
    }
}
email();
registereds();
checkboxcheck();