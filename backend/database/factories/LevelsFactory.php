<?php

namespace Database\Factories;

use App\Models\Levels;
use Illuminate\Database\Eloquent\Factories\Factory;

class LevelsFactory extends Factory
{
    protected $model = Levels::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            // Adicione outros campos obrigatórios aqui
        ];
    }
}
