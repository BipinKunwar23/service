<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
// use App\Http\Resources\CategoryResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'csid'=>$this->id,
            'name'=>$this->name,
            'description'=>$this->pivot->description,
            'time'=>json_decode($this->pivot->time),
            'days'=>json_decode($this->pivot->days),
            'charge'=>json_decode($this->pivot->charge),
            'offers'=>$this->pivot->offers,
            'location'=>$this->pivot->address,
            'expereince'=>$this->pivot->experience,
            'image'=>$this->pivot->image,

           
        ];
    }
}
