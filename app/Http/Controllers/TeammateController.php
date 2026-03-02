<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Teammate;
use Illuminate\Support\Facades\Storage;


class TeammateController extends Controller
{
   // 1️⃣ List all teammates
    public function index()
    {
        $teammates = Teammate::get();
        return response()->json([
            'status' => 'success',
            'data' => $teammates
        ]);
    }

    // 2️⃣ Show single teammate
    public function show($id)
    {
        $teammate = Teammate::findorFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $teammate
        ]);
    }

    // 3️⃣ Add new teammate
    public function store(Request $request)
    {
        $data = $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp',
            'description'=>'nullable|string',
            'name' => 'required|string',
            'position' => 'required|string',
        ]);

        if($request->hasFile('image')){
            $path = $request->file('image')->store("teammateImages");
            $data['image'] = $path;
        }

        $teammate = Teammate::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Teammate added',
            'data' => $teammate
        ]);
    }

    // 4️⃣ Update teammate
public function update(Request $request, $id)
{
    $data = $request->validate([
        // 'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,webp',
        'description' => 'nullable|string',
        'name' => 'nullable|string',
        'position' => 'nullable|string',
    ]);
    
    if($request->hasFile('image')){
        if(!empty($teammate->image) && Storage::exists($teammate->image)){
            Storage::delete($teammate->image);
        }
        $path = $request->file('image')->store("teammateImages");
        $data['image'] = $path;
    }

    $teammate = Teammate::findOrFail($id);

    $teammate->update($data);

    return response()->json([
        'status' => 'success',
        'message' => 'Teammate updated',
        'data' => $teammate
    ]);
}

    // 5️⃣ Delete teammate
    public function destroy($id)
    {
        $teammate = Teammate::findorFail($id);

        if(!empty($teammate->image) && Storage::exists($teammate->image)){

            Storage::delete($teammate->image);

            if(empty(Storage::files('teammateImages'))){
                Storage::deleteDirectory('teammateImages');
            }
        }

        $teammate->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Teammate deleted'
        ]);
    }
}











