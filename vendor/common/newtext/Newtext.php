<?php
    namespace vendor\common\newtext;
    use vendor\guid\Guid;
    use api\modules\v1\models\Text;
    use vendor\common\gettext\Parser;
    class Newtext
    {

        public static function newtexts($type,&$msg)
        {
            if($type["judge"]==0)
            {
                $N_Text=new Text;
                $N_Text->datatime=time();
                $N_Text->uuid=Guid::create_guid();
                $N_Text->content=$type["content"];
                $N_Text->texttitle=$type["texttitle"];
                $N_Text->author=$type["author"];
                //数据校验
                /*
                $test->validate();
                if($test->hasErrors())
                {
                    echo 'data is error';
                    die;
                }
                */
		        $N_Text->save();
            }
            else if($type["judge"]==1)
            {
                $objects=Text::find()->where(["uuid"=>$type["uuid"]])->one();
                $objects->content=$type["content"];
                $objects->texttitle=$type["texttitle"];
                $objects->author=$type["author"];
                $objects->save();
            }
            else if($type["judge"]==2)
            {
                $objects=Text::find()->where(["uuid"=>$type["uuid"]])->one();
                $objects->delete();
            }
            

        } 
    }