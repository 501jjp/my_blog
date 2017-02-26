<?php

    //注册时使用
	namespace api\modules\v1\controllers;
    use vendor\request\RequestType;
    use vendor\messages\Message;
    use vendor\registered\Registered;
	use api\modules\v1\models\Login;
	use yii\rest\ActiveController;
    use yii\helpers\ArrayHelper;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;
	class RegisteredController extends ActiveController
	{
		public $modelClass = 'api\modules\v1\models\Login';

		 public function actions() {  
        $actions = parent::actions();  
        // 禁用""index,delete" 和 "create" 操作  
        unset($actions['index'],$actions['delete'], $actions['create'],$actions['updata'],$actions['view'],$actions['options']);  
       
        return $actions;  
  
    }  
    //重写index的业务实现  
    public function actionIndex()  
    {  
        $msg=new Message();
    	$get=RequestType::request('get');
        if(Login::findOne(['username'=>$get['username']]))
        {

            $msg->setMsag('用户名重复');
        }
        return $msg->getMsag();
    }   

    public function actionCreate()
    {

        $msg=new Message();
        $post=RequestType::request('post');
        Registered::re($post,$msg);
        return $msg->getMsag();
    }

/*
    public function behaviors()
{
    return ArrayHelper::merge(parent::behaviors(), [
        'authenticator' => [
            'class' => CompositeAuth::className(),
            'authMethods' => [
                // HttpBasicAuth::className(),
                // HttpBearerAuth::className(),
                QueryParamAuth::className(),
            ],
        ],
    ]);
}*/
	}
