<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\DevsCollection;
use App\Http\Resources\V1\DevsResource;
use App\Models\Devs;
use Illuminate\Http\Request;

class DevsController extends Controller
{
    public function index()
    {
        return new DevsCollection(Devs::all());
    }

    public function show(Devs $dev)
    {
        return new DevsResource($dev);
    }

    public function store(Request $request)
    {
        Devs::create($request->all());
        return response()->json("Dev Created");
    }

    public function update(Request $request, $id)
    {
        $dev = Devs::findOrFail($id);
        $dev->update($request->all());

        return $dev;
    }

    public function destroy(Devs $dev)
    {
        $dev->delete();
        return response()->json("Level Deleted");
    }
}
