<?php

namespace vendor\request;

use Yii;
class RequestType
{

    public static function request($type)
    {

        switch($type)
        {
            case 'get':
            $request=YII::$app->getRequest();
            return $request->get();
            break;

            case 'post':
            $request=YII::$app->getRequest();
            return $request->post();
            break;

            case 'put':
            $request=YII::$app->getRequest();
            return $request->put();
            break;

            default:
            return;
        }
    }
}