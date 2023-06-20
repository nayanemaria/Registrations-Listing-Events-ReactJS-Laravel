<?php

namespace App\Http\Controllers;

use DB;
use Redirect;
use Carbon\Carbon;
use App\Models\Inscritos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class InscritosController extends Controller
{

    public function create(Request $request){
        try {
            $eventos = json_decode($this->getEventos()->content(), true);
            $nome = $request->input('nome');
            $email = $request->input('email');
            $cpf = $request->input('cpf');
            $id_evento = $request->input('id_evento');

            $evento_selecionado = array_filter($eventos, function($evento) use($id_evento) {
                return $evento["id"] === $id_evento;
            });

            $data = [
                'nome' => $nome,
                'email' => $email,
                'cpf' => $cpf,
                'id_evento' => $id_evento,
                'nome_evento' => end($evento_selecionado)["name"]
            ];

            $this->verificaStatusEvento($eventos, $id_evento);
            $this->verificaDataEventos($id_evento, $eventos, $cpf);

            DB::table('inscritos')->insert($data);

            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage(), "line_error" => $e->getLine()], 500);
        }
    }

    public function update(Request $request, $id){
        try {
            $inscrito = Inscritos::find($id);
            $inscrito->nome =  $request->get('nome');
            $inscrito->email = $request->get('email');
            $inscrito->cpf = $request->get('cpf');
            $inscrito->save();

            return response()->json($inscrito);
        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage(), "line_error" => $e->getLine(), 500]);
        }
    }

    public function destroy($id){
        $inscrito = Inscritos::findOrFail($id);
        $inscrito->delete();
        $inscritosAtualizados = Inscritos::all();
        return $inscritosAtualizados;
    }

    public function get(Request $request){
        $inscritos = Inscritos::all();
        $data = $inscritos->toArray();
        return response()->json($data);
    }

    public function getEventos(){
        $eventos = Http::get("https://demo.ws.itarget.com.br/event.php")["data"];
        return response()->json($eventos);
    }

    private function verificaStatusEvento($eventos, $id_evento) {
        foreach ($eventos as $evento) {
            if($evento["id"] === $id_evento && $evento["status"] === false) {
                throw new \Exception("Não é possível se inscrever no evento inativo.");
            }
        }
    }

    private function verificaDataEventos($id_evento, $eventos, $cpf) {
        $inscricoes = DB::table('inscritos')->where('cpf', $cpf)->get();
        $evento_inscricao = array_filter($eventos, function($evento) use($id_evento) {
            return $evento["id"] === $id_evento;
        });

        $data_evento = Carbon::createFromFormat('Y-m-d', end($evento_inscricao)["start_date"]);

        foreach ($inscricoes as $inscricao) {
            $evento_inscrito = array_filter($eventos, function($evento) use($inscricao) {
                return $evento["id"] === $inscricao->id_evento;
            });

            $data_incricao = Carbon::createFromFormat('Y-m-d', end($evento_inscrito)["start_date"]);
            $data_igual = $data_evento->diffInDays($data_incricao);

            if ($data_igual < 1) {
                throw new \Exception("Não foi possível se inscrever, pois você já tem um evento marcado para a mesma data.");
            }
        }
    }
}
