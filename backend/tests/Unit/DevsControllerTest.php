<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Devs;
use App\Models\Levels;

class DevsControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        Devs::factory()->count(3)->create();

        $response = $this->get('/api/v1/devs');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function testShow()
    {
        $dev = Devs::factory()->create();

        $response = $this->get('/api/v1/devs/' . $dev->id);

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $dev->id,
                    'name' => $dev->name,
                    'sexo' => $dev->sexo,
                    'data_nascimento' => $dev->data_nascimento,
                    'idade' => $dev->idade,
                    'hobby' => $dev->hobby,
                    'id_level' => $dev->id_level
                ],
            ]);
    }

    public function testStore()
    {
        $level = Levels::factory()->create();

        $data = [
            'name' => 'Test Dev',
            'sexo' => 'Test Dev',
            'data_nascimento' => '2001-07-05',
            'idade' => 23,
            'hobby' => 'Test Dev',
            'id_level' => $level->id
        ];

        $response = $this->post('/api/v1/devs', $data);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Dev Created']);

        $this->assertDatabaseHas('developers', $data);
    }

    public function testUpdate()
    {
        $level = Levels::factory()->create();
        $dev = Devs::factory()->create();

        $data = [
            'name' => 'Updated Test Dev',
            'sexo' => 'Updated Test Dev',
            'data_nascimento' => '2001-07-05',
            'idade' => 23,
            'hobby' => 'Updated Test Dev',
            'id_level' => $level->id
        ];

        $response = $this->put('/api/v1/devs/' . $dev->id, $data);

        $response->assertStatus(200);

        $this->assertDatabaseHas('developers', $data);
    }

    public function testDestroy()
    {
        $dev = Devs::factory()->create();

        $response = $this->delete('/api/v1/devs/' . $dev->id);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Dev Deleted']);

        $this->assertDeleted($dev);
    }
}
