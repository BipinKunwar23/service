<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
 
    public function toArray(Request $request): array
    {
       
        return [
          
            'bio'=> $this->bio,
            'photo'=>$this->photo,
            'address'=>$this->address,
        ];
    }
}
