<?php
    namespace vendor\common\gettext;
    use api\modules\v1\models\Comment;
    use api\modules\v1\models\Text;
    use vendor\common\gettext\Parser;
    class Gettext
    {

        public static function gettexts($type,&$msg)
        {
            $pagenumber=$type["pagenumber"];
            $start=($pagenumber-1)*3;
            $sd=Text::find()->orderBy("datatime desc")->limit(3)->offset($start)->all();
            foreach($sd as $key=>$value)
            {
                /*
                $jjp=mb_substr($value["content"],0,100,"utf-8");
                $value["content"]=$jjp;
                */
                $number=Comment::find()->where(["text_uuid"=>$value["uuid"]])->count();
                $parser = new Parser();
                $value["content"]=$parser->makeHtml($value["content"]);
                $value["comment_count"]=$number;
            }
            
            $msg->setMsag($sd,true);
        }
    }