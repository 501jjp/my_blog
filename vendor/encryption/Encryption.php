<?php
 
namespace vendor\encryption;

class Encryption
{

    const KEY='jjp';
    public static function password($password)
    {

        return md5($password.self::KEY);
    }

    public static function access_token($username,$password)
    {

        return md5($username.$password.time().self::KEY);
    }
}
 