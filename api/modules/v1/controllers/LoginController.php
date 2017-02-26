<?php

	namespace api\modules\v1\controllers;
    use vendor\messages\Message;
    use vendor\request\RequestType;
    use vendor\login\LoginCheck;
	use api\modules\v1\models\Login;
	use yii\rest\ActiveController;
    use yii\helpers\ArrayHelper;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;
	class LoginController extends ActiveController
	{
		public $modelClass = 'api\modules\v1\models\Login';

		 public function actions() {  
        $actions = parent::actions();  
        // 禁用""index,delete" 和 "create" 操作  
       
      unset($actions['index'],$actions['delete'], $actions['create'],$actions['updata'],$actions['view'],$actions['options']);  
       
        return $actions;  
  
    }  
    //重写index的业务实现  
    public function actionCreate()  
    {  
    	 
       $msg=new Message();  
       $post=RequestType::request('post');
       LoginCheck::check($post,$msg);
       return $msg->getMsag();
    }   
 
	}
