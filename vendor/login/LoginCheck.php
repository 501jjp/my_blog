<?php

namespace vendor\login;


use api\modules\v1\models\Login;

use vendor\encryption\Encryption;

use yii\web\Cookie;


class LoginCheck
{
	
	
	public static function check($post,&$msg)
	{
		
		
		$username=$post['username'];
		
		$password=Encryption::password($post['password']);
		
		echo $password;
		
		$arr=Login::findOne(['username'=>$username]);
		
		if(!$arr)
		{
			
			$msg->setMsag('用户不存在');
			
			return;
			
		}
		
		if($arr['password']!=$password)
		{
			
			
			$msg->setMsag('用户名密码错误');
			
			return;
			
		}
		
		else
		{
			
			
			$access_token=Encryption::access_token($post['username'],$post['password']);
			
			Login::updateAll(['access_token'=>$access_token,'updated_at'=>time()],['username'=>$post['username']]);
			
			$response=['id'=>$arr['id'],'username'=>$arr['username'],'email'=>$arr['email'],'access_token'=>$access_token];
			
			$msg->setMsag($response,true);
			
			
		}
		
	}
	
	
	
}
