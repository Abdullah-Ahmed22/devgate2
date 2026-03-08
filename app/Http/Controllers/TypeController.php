<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Type;

class TypeController extends Controller
{
   public function index(){ // Return all types from database

        $allTypes = Type::get();

        return response()->json($allTypes);
    }

    public function show($id){ // Return specific type from database

        $specificType = Type::findorfail($id);

        return response()->json($specificType);
    }

    public function store(Request $request)
{
    $data = $request->validate([
        'project_type' => 'required|string|max:255'
    ]);

    Type::create($data);

    return response()->json(['message' => 'Type added successfully'], 201);
}


public function update(Request $request, $id)
{
    $updateSpecificType = Type::findOrFail($id);

    $data = $request->validate([
        'project_type' => 'required|string|max:255'
    ]);

    $updateSpecificType->update($data);

    return response()->json(['message' => 'Type updated successfully'], 200);
}

    public function destroy($id){ // destroy specific type from database

        $destroySpecificType = Type::findorfail($id);

        $destroySpecificType->delete();

        return response()->json(['message' => 'Type deleted successfully'], 200);
    }
}
