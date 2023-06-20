<?php

namespace Tests\Unit;

use App\Http\Controllers\InscritosController;
use PHPUnit\Framework\TestCase;
use Illuminate\Http\Request;

class InscritosTest extends TestCase
{

    public function testCreate()
    {
        $controller = new InscritosController();

        $request = new Request([
            'nome' => 'Exemplo',
            'email' => 'exemplo@example.com',
            'cpf' => '123.456.789-00',
            'id_evento' => '1',
        ]);

        $eventos = [
            ['id' => 1, 'name' => 'Evento 1'],
            ['id' => 2, 'name' => 'Evento 2'],
        ];
        $controller->shouldReceive('getEventos')->andReturn(response()->json($eventos));

        $response = $controller->create($request);

        $this->assertEquals(200, $response->getStatusCode());

        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals('Exemplo', $responseData['nome']);
        $this->assertEquals('exemplo@example.com', $responseData['email']);
        $this->assertEquals('123.456.789-00', $responseData['cpf']);
        $this->assertEquals('1', $responseData['id_evento']);
        $this->assertEquals('Evento 1', $responseData['nome_evento']);

        $this->assertDatabaseHas('inscritos', [
            'nome' => 'Exemplo',
            'email' => 'exemplo@example.com',
            'cpf' => '123.456.789-00',
            'id_evento' => '1',
        ]);
    }

    public function testUpdate()
    {
        $controller = new InscritosController();

        $request = new Request([
            'nome' => 'Novo Nome',
            'email' => 'novoemail@example.com',
            'cpf' => '009.876.543-10',
        ]);

        $id = 1;

        $response = $controller->update($request, $id);

        $this->assertEquals(200, $response->getStatusCode());

        $inscrito = Inscritos::find($id);
        $this->assertEquals('Novo Nome', $inscrito->nome);
        $this->assertEquals('novoemail@example.com', $inscrito->email);
        $this->assertEquals('9876543210', $inscrito->cpf);
    }

    public function testDestroy()
    {
        $inscrito = Inscritos::create([
            'nome' => 'Exemplo',
            'email' => 'exemplo@example.com',
            'cpf' => '123.456.789-00',
        ]);

        $id = $inscrito->id;

        $controller = new InscritosController();

        $inscritosAtualizados = $controller->destroy($id);

        $this->assertDatabaseMissing('inscritos', [
            'id' => $id,
            'nome' => 'Exemplo',
            'email' => 'exemplo@example.com',
            'cpf' => '123.456.789-00',
        ]);

        $this->assertEquals($inscritosAtualizados, Inscritos::all());
    }
}
