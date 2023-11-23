<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Catservice;
use App\Models\User;

class Category extends Model
{
    use HasFactory;
    public $fillable = ['name', 'parent_id','description','keywords'];
    public function category()
    {
        return $this->hasMany(Category::class, 'parent_id')->with('category:id,name,parent_id');
    }
   
    public function services()
    {
        return $this->hasMany(Catservice::class,'category_id');
    }
    
    
}
