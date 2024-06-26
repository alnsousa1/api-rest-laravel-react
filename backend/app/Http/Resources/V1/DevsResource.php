<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class DevsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'id_level' => $this->id_level,
            'sexo' => $this->sexo,
            'data_nascimento' => $this->data_nascimento,
            'idade' => $this->idade,
            'hobby' => $this->hobby
        ];
    }
}
