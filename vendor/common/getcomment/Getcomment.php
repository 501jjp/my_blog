<?php
    namespace vendor\common\getcomment;

    use api\modules\v1\models\Comment;
    use api\modules\v1\models\Login;
    use api\modules\v1\models\Userinformation;
    use vendor\common\gettext\Parser;
    class Getcomment
    {

        public static function getcomments($type,&$msg)
        {
            $start=($type["pagenumber"]-1)*5;
            $comment_content=Comment::find()->where(["text_uuid"=>$type["text_uuid"]])->orderBy("datatime desc")->limit(5)->offset($start)->asArray()->all();
            for($i=0;$i<count($comment_content);$i++)
            {
                $user_information=Userinformation::find()->where(["username"=>$comment_content[$i]["one_username"]])->one();
                $comment_content[$i]['picture_path']=$user_information["picture"];
            }
            $msg->setMsag($comment_content,true);
        }
    }