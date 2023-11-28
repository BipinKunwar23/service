<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Subcategory;
class Service extends Model
{
    use HasFactory;
    public $fillable = ['name', 'description', 'image', 'subcategory_id'];
   
    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class,'subcategory_id');
    }
    public function users()
    {
        return $this->belongsToMany(User::class)
        ->withPivot('description', 'days', 'time', 'charge', 'offers', 'experience', 'image', 'address');
    }
}
