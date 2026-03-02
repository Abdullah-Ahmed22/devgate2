<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\OurClient;
class OurClientController extends Controller
{
       // 1️⃣ List all clients
    public function index()
    {
        $clients = OurClient::get();
        return response()->json([
            'status' => 'success',
            'data' => $clients
        ]);
    }

    // 2️⃣ Show single client
    public function show($id)
    {
        $client = OurClient::findorFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $client
        ]);
    }

    // 3️⃣ Store new client
    public function store(Request $request)
    {
        $data = $request->validate([
           'image' => 'required|image|mimes:jpg,jpeg,png,webp',
        ]);

       if($request->hasFile('image')){
            $path = $request->file('image')->store("ourClientImages");
             $data['image'] = $path;
            $data['image'] = $path;
        }

        $client = OurClient::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Client created successfully',
            'data' => $client
        ]);
    }

    // 4️⃣ Delete client
    public function destroy($id)
    {
        $client = OurClient::findorFail($id);

       if(!empty($client->image) && Storage::exists($client->image)){

            Storage::delete($client->image);

            if(empty(Storage::files('ourClientImages'))){
                Storage::deleteDirectory('ourClientImages');
            }
        }

        $client->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Client deleted successfully'
        ]);
    }
}
