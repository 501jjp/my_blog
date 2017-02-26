<?php
	namespace api\modules\v1\controllers;
    use vendor\common\newtext\Newtext;
    use vendor\request\RequestType;
    use vendor\messages\Message;
    use vendor\common\gettext\Gettext;
	use api\modules\v1\models\Login;
	use yii\rest\ActiveController;
    use yii\helpers\ArrayHelper;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\QueryParamAuth;
	class TextController extends ActiveController
	{
		public $modelClass = 'api\modules\v1\models\Text';

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
    	$type=RequestType::request('get');
        Gettext::gettexts($type,$msg);
        return $msg->getMsag();

    }   

    public function actionCreate()
    {
        $msg=new Message();
        $type=RequestType::request('post');
        Newtext::newtexts($type,$msg);
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
