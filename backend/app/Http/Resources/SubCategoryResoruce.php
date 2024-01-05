<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubCategoryResoruce extends JsonResource
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
        'name'=>$this->name,
        'description'=>$this->description,
        'icons'=>"http://localhost:8000/".$this->icons,
        'services'=> CatServiceResource::collection($this->whenLoaded('services'))
        ];
    }
}
