<?php
	namespace api\modules\v1\controllers;
    use Yii; 
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
        unset($actions['index'],$actions['delete'], $actions['create']);  
       
        return $actions;  
  
    }  
    //重写index的业务实现  
    public function actionIndex()  
    {  
    	 
       return Login::gettoken();
    }   

    public function actionCreate()
    {
        $request=YII::$app->getRequest();
        $post=$request->post();
        $rr=new Login();
        $rr->username= $post['username'];
        $rr->password=$post['password'];
        $rr->email=$post['email'];
        $rr->access_token=$post['access_token'];
        $rr->setPassword($post['password']);
        //$rr->generateAuthKey();
        //$rr->validate();
        $rr->save();
     
        
    }


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
}
	}
