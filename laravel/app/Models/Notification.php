<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $fillable=['sender_id','receiver_id','type','title','body','link','link_name'];
public function sender(){
    return $this->belongsTo(User::class,'sender_id');
}
}
