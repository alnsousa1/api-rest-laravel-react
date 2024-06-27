<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Levels;

class LevelsControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        Levels::factory()->count(3)->create();

        $response = $this->get('/api/v1/levels');

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'data');
    }

    public function testShow()
    {
        $level = Levels::factory()->create();

        $response = $this->get('/api/v1/levels/' . $level->id);

        $response->assertStatus(200)
                 ->assertJson([
                     'data' => [
                         'id' => $level->id,
                         'name' => $level->name,
                     ],
                 ]);
    }

    public function testStore()
    {
        $data = [
            'name' => 'Test Level',
        ];
    
        $response = $this->post('/api/v1/levels', $data);
    
        $response->assertStatus(200)
                 ->assertJson(['message' => 'Level Created']);
    
        $this->assertDatabaseHas('levels', $data);
    }
                         
    

    public function testUpdate()
    {
        $level = Levels::factory()->create();

        $data = [
            'name' => 'Updated Level Name',
        ];

        $response = $this->put('/api/v1/levels/' . $level->id, $data);

        $response->assertStatus(200);

        $this->assertDatabaseHas('levels', $data);
    }

    public function testDestroy()
    {
        $level = Levels::factory()->create();

        $response = $this->delete('/api/v1/levels/' . $level->id);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Level Deleted']);

        $this->assertDeleted($level);
    }
}
