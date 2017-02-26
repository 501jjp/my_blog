var host=0?"192.168.0.100":"localhost";
var page_numbers=5;
function loadindex(){                    
   gettexts(1);
   $("pre").addClass("prettyprint");
}

function gettexts(pagenumbers){
    
     $.get("http://"+host+"/phps/yii/bms/api/web/v1/texts",{"pagenumber":pagenumbers},function(data){
        if(data["code"]=="200"){
            apendtexts(data["msg"]);
        }
        if(data["code"]==400){
            alert(data["msg"]);
        }
    },'JSON');
     //return arrs;
}

function apendtext(text){

    var date=timehandle(text["datatime"]*1000);
    var ss="<div nowpage='1' id='"+text["uuid"]+"text' comment_count="+text["comment_count"]+" class='media' style='weidth:100%'>\
            <span class='pull-right textlisttime'>"+text["author"]+"</span>\
            <div class='media-body m-inline' style='display: inline;'>\
                <span class='textlisthead'><strong>"+text["texttitle"]+"</strong></span>\
                <div><span class='textlistbody'>"+text["content"]+"</span></div>\
                <div class='middiv'><span class='textlisttime'>"+date+"</span></div>\
            <div>\
            <div><a id='"+text["uuid"]+"aa' request_judge='false' judge='false' text_uuid="+text["uuid"]+" href='#;'>评论</a></div>\
            \
            <div class='comment_big_style' id="+text["uuid"]+">\
            <div class='look' ><div>\
            \
            <div>\
            \
        </div>";
$("#jjp").append(ss);
pinglunajs(text["uuid"]+"aa");
} 

    

function timehandle(time){
   var date= new Date(time);
   var str=date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDay()+"日"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
   return str;
}

function apendtexts(arrs){
    $.each(arrs,function(key,value){
        apendtext(value);
    });
}
loadindex();


function pinglunajs(idname){
        $("#"+idname).click(function(){
            var judge=$("#"+idname).attr("judge");
            var request_judge=$("#"+idname).attr("request_judge");
            if(judge=="false"){
                $("#"+idname).attr("judge","true");
                var text_uuid=$("#"+idname).attr("text_uuid");
                if(request_judge=="false"){
                    getcomments($("#"+text_uuid+"text").attr("nowpage"),text_uuid);
                    $("#"+idname).attr("request_judge","true");
                }
                $("#"+text_uuid).show();
            }
            else if(judge=="true"){
                var text_uuid=$("#"+idname).attr("text_uuid");
                $("#"+text_uuid).hide();
                $("#"+idname).attr("judge","false");
            }
    }); 
}


function getcomments(pagenumbers,text_uuid){
    
     $.get("http://"+host+"/phps/yii/bms/api/web/v1/comments",{"pagenumber":pagenumbers,"text_uuid":text_uuid},function(data){
        if(data["code"]=="200"){
            apendcomments(data["msg"]);
            var page_count=$("#"+text_uuid+"text").attr("comment_count");
            var n_page=$("#"+text_uuid+"text").attr("nowpage");
            var comment_page="";
            /*
            if(page_count==page_numbers){
                comment_page="\
            <div class='pagediv' id='"+text_uuid+"pagediv'>\
                <a class='myactive' href='#;'>1</a>\
            </div>\
            ";
            }
            */
            comment_page="\
            <div p='' class='pagediv' uuid="+text_uuid+" id='"+text_uuid+"pagediv' >\
                <a class='myactive' href='#;'>上页</a>\
                <a id='"+text_uuid+"pa_in_text' class='mynotactive' href='#;'>1</a>\
                <a class='myactive' href='#;'>下页</a>\
            </div>\
            ";

            $("#"+text_uuid+"").append(comment_page);
            $(".myactive").each(function(){
                $(this).click(function(){
                    var text_id = $(this).parent().attr('uuid') + "text";
                    var get_id=$(this).parent().attr('uuid');
                    var n_p=parseInt($("#"+text_id).attr('nowpage'));
                    var html=$(this).html();
                    var m_p=parseInt($("#"+text_id).attr('comment_count'));
                    var pagumbers="";
                    var p_ns="";
                    var req=true;
                    if((m_p*1)%page_numbers==0){
                        p_ns=m_p/page_numbers;
                    }else{
                        p_ns=parseInt(m_p/page_numbers)+1;
                    }

                    if(html=="上页"){
                        if(n_p*1>1) {
                            $("#"+text_id).attr("nowpage",(n_p*1-1)+"");
                            $(this).parent().prevAll().remove();
                            pagumbers=n_p*1-1;
                            $("#"+get_id+"pa_in_text").html(pagumbers);
                            req=true;
                        }
                        if(n_p*1<=1){
                            req=false;
                        }
                    }
                    if(html=="下页"){
                        if(n_p*1<p_ns){
                                $("#"+text_id).attr("nowpage",(n_p*1+1)+"");
                                $(this).parent().prevAll().remove();
                                pagumbers=n_p*1+1;
                                $("#"+get_id+"pa_in_text").html(pagumbers);
                                req=true;
                                if(n_p*1==(p_ns*1-1)){
                                }
                        }
                        if(n_p*1>=p_ns){
                            req=false;
                        }
                    }
                    console.log(pagumbers);
                    if(req){
                        $.get("http://"+host+"/phps/yii/bms/api/web/v1/comments",{"pagenumber":pagumbers,"text_uuid":get_id},function(data){
                            console.log(data["msg"]);
                            apendcomments(data["msg"]);

                        });
                    }else{
                        return;
                    }
                });
            });

            $("#"+text_uuid+"pa_in_text").blur(function(){
                var get_id=$(this).parent().attr("uuid");
                var n_pa=$("#"+get_id+"text").attr("nowpage");
                var p_ns=parseInt($("#"+get_id+"text").attr("comment_count"));
                var this_pg=$(this).val()+"";
                if(p_ns%page_numbers==0){
                    p_ns=p_ns/page_numbers;
                }else{
                    p_ns=parseInt(p_ns/page_numbers)+1;
                }


                if(this_pg!=n_pa){
                    $("#"+get_id+"text").attr("nowpage",this_pg+"");
                    if(parseInt(this_pg)==1){
                        $(".myactive").each(function(){
                            if($(this).html=="上页"){
                                $(this).css("color","#999999");
                            }else{
                                $(this).css("color","#428bca");
                            }
                        });
                    }

                    if(parseInt(this_pg)==p_ns){
                        $(".myactive").each(function(){
                            if($(this).html=="下页"){
                                $(this).css("color","#999999");
                            }else{
                                $(this).css("color","#428bca");
                            }
                        });
                    }
                }

            });



            var comment_input='<textarea id="'+text_uuid+'textareacomment"  type="text" class="form-control" id="name"\
			   placeholder="发表评论..."></textarea>\
               <div style="height:10px"></div>\
               <button text_uuid='+text_uuid+' id="'+text_uuid+'bucomment" class="btn btn-primary" type="button">发表</button> \
               ';
            $("#"+text_uuid).append(comment_input);

            $("#"+text_uuid+"bucomment").click(function(){
                var bu=$("#"+text_uuid+"bucomment");
                var texar=$("#"+text_uuid+"textareacomment");
                
                var url="http://"+host+"/phps/yii/bms/api/web/v1/comments";
                var datass={
                    text_uuid:bu.attr("text_uuid"),
                    one_username:"terry",//要改成登陆用户
                    two_username:"",
                    content:texar.val(),
                };
                $.post(url,datass,function(data,status){
                    console.log(data);
                    console.log(status);
                    if(status=="success"){
                        //待写。。。。。。。。。
                        
                    }
                })
            })
        }
        if(data["code"]==400){
            alert(data["msg"]);
        }
    },'JSON');
     //return arrs;
}

function apendcomments(arrs,obj=""){
    $.each(arrs,function(key,value){
        apendcomment(value,obj);
    });
}

function apendcomment(comment,obj){
    var ss="";
    if(comment["two_username"]!=""){
        ss="<div id="+comment["uuid"]+" class='delate media'>\
                   <a class='pull-left' href='#;'>\
                       <img class='media-object' src='../userpicture/"+comment["picture_path"]+"'>\
                   </a>\
                    <div class='media-body'>\
                    <h4 class='media-heading'>"+comment["one_username"]+"<span>回复：</span>"+comment["two_username"]+"</h4>\
    	            <div>"+comment["content"]+"</div><div class='textlisttime'>"+timehandle(comment["datatime"]*1000)+" <a judge='false' id='"+comment["uuid"]+"ar' href='#;'>回复</a></div>\
  	                </div>\
               </div>\
               <div class='delate comment_style'></div>\
            ";
    }
  if(comment["two_username"]==""){
        ss="<div id="+comment["uuid"]+" class='media'>\
                   <a class='pull-left' href='#;'>\
                       <img class='media-object' src='../userpicture/"+comment["picture_path"]+"'>\
                   </a>\
                    <div class='media-body'>\
                    <h4 class='media-heading'><span>回复：</span></h4>\
    	            <div>"+comment["content"]+"</div><div class='textlisttime'>"+timehandle(comment["datatime"]*1000)+" <a judge='false' id='"+comment["uuid"]+"ar' href='#;'>回复</a></div>\
  	                </div>\
               </div>\
               <div class='comment_style'></div>\
            ";
    }
    if(obj==""){
        $("#"+comment["text_uuid"]).prepend(ss);
        //$(".look").
    }
    else{
        obj.parent().before(ss);
    }
    


    $("#"+comment["uuid"]+"ar").click(function(){
        var judge=$("#"+comment["uuid"]+"ar").attr("judge");
        if(judge=="false"){

            var comment_reply='\
            <div id="'+comment["uuid"]+'divdiv">\
                <textarea id="'+comment["uuid"]+'textarea"  type="text" class="form-control" id="name"\
			    placeholder="回复..."></textarea>\
                <div style="height:10px"></div>\
                <button id="'+comment["uuid"]+'bu" text_uuid='+comment["text_uuid"]+' one_username='+comment["one_username"]+' class="btn btn-primary" type="button">回复</button> \
            </div>';
            $("#"+comment["uuid"]).append(comment_reply);
            $("#"+comment["uuid"]+"ar").attr("judge","true");

            $("#"+comment["uuid"]+"bu").click(function(){
                var bu=$("#"+comment["uuid"]+"bu");
                var texar=$("#"+comment["uuid"]+"textarea");
                
                var url="http://"+host+"/phps/yii/bms/api/web/v1/comments";
                var datass={
                    text_uuid:bu.attr("text_uuid"),
                    one_username:"teery",
                    two_username:bu.attr("one_username"),//要改成登陆用户
                    content:texar.val(),
                };
                $.post(url,datass,function(data,status){
                    console.log(data);
                    console.log(status);
                    if(status=="success"){
                        $("#"+comment["uuid"]+"ar").attr("judge","false").html("已回复").unbind("click");
                        $("#"+comment["uuid"]+"divdiv").remove();
                    }
                })
            })
        }

        if(judge=="true"){

            $("#"+comment["uuid"]+"ar").attr("judge","false");
            $("#"+comment["uuid"]+"divdiv").remove();
        }
    });
}









