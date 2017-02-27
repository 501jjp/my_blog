<?php
/**
*进行注册插入数据
*
*
*/
namespace vendor\registered;
use api\modules\v1\models\Login;
use vendor\encryption\Encryption;
//use vendor\messages\Message;
class Registered 
{   

    public static function  re($post,&$msg)
    {
        
        if(self::check($post))
        {
            $msg->setMsag('用户名重复');
            return;
        }
        $rr=new Login();
        $rr->username= $post['username'];
        $rr->password=Encryption::password($post['password']);
        $rr->email=$post['email'];
        $rr->access_token=Encryption::access_token($post['username'],$post['password']);
        $rr->created_at=time();
        $rr->setPassword(Encryption::password($post['password']));
        $rr->generateAuthKey();
        $rr->validate();
        if($rr->hasErrors())
		{
			$msg->setMsag('输入不合法');
			return;
		}
        $rr->save();
    }

    //检查用户名是否重复
    public static function check($post)
    {

        if(Login::findOne(['username'=>$post['username']])!=null)
        {

            return  true;
        }
        else
        {

            return false;
        }
    }
}