<?php

namespace App\Http\Controllers;

use App\Http\Requests\HomeImageRequest;
use App\Models\HomeImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeImageController extends Controller
{
    public function index(){ // Return all home images from database

        $allHomeImages = HomeImage::get();

        return response()->json($allHomeImages);
    }

    public function store(HomeImageRequest $request){ // Store image in database

        $data = $request->validated();

        if($request->hasFile('image')){
            $path = $request->file('image')->store("homeImages");
            $data['image'] = $path;
        }

        HomeImage::create($data);

        return response()->json(['message' => 'image added successfully'], 201);
    }


    public function destroy($id){ // destroy  specific home image from database

        $destroySpecificHomeImage = HomeImage::findorfail($id);

        if(!empty($destroySpecificHomeImage->image) && Storage::exists($destroySpecificHomeImage->image)){

            Storage::delete($destroySpecificHomeImage->image);

            if(empty(Storage::files('homeImages'))){
                Storage::deleteDirectory('homeImages');
            }
        }

        $destroySpecificHomeImage->delete();
        return response()->json(['message' => 'image deleted successfully'], 200);
    }
    
}
