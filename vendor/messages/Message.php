<?php

namespace vendor\messages;

class Message
{
    private $Msag=['code'=>200,'msg'=>''];

    public function getMsag()
    {
        return $this->Msag;
    }

    public function setMsag($ms=null,$tt=false)
    {
        if($ms==null||$tt==true)
        {

            $this->Msag=['code'=>200,'msg'=>$ms];
        }
        else
        {
            $this->Msag=['code'=>400,'msg'=>$ms];
        }
    }
}