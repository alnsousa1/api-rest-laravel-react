<?php

namespace Database\Factories;

use App\Models\Devs;
use App\Models\Levels;
use Illuminate\Database\Eloquent\Factories\Factory;

class DevsFactory extends Factory
{
    protected $model = Devs::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'sexo' => $this->faker->word,
            'data_nascimento' => $this->faker->date,
            'idade' => $this->faker->numberBetween(18, 60),
            'hobby' => $this->faker->word,
            'id_level' => Levels::factory() // Cria um nível associado
        ];
    }
}
