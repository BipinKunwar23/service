<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProviderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'first_name'=>$this->first_name,
            'last_name'=>$this->last_name,
            'email'=>$this->email,
            'phone_number'=>$this->phone_number,
            'rating'=>5 ,
            'photo'=>null,
            $this->mergeWhen($this->relationLoaded('catservices'), function () {
                return [
                    'category' => new CategoryResource($this->catservices->first()->category),
                ];
            }),
        ];
    }
    
   

}
