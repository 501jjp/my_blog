<?php
    namespace vendor\common\newcomment;
    use vendor\guid\Guid;
    use api\modules\v1\models\Comment;
    use vendor\common\gettext\Parser;
    class Newcomment
    {

        public static function newcomments($type,&$msg)
        {
            $N_Comment=new Comment;
            $N_Comment->datatime=time();
            $N_Comment->uuid=Guid::create_guid();
            $N_Comment->text_uuid=$type["text_uuid"];
            $N_Comment->one_username=$type["one_username"];
            $N_Comment->two_username=$type["two_username"];
            $N_Comment->content=$type["content"];
            
            

		    //数据校验
            /*
		    $test->validate();
		    if($test->hasErrors())
		    {
			    echo 'data is error';
			    die;
		    }
            */
		    $N_Comment->save();

        } 
    }