<?php

namespace App\Http\Controllers;

use App\Http\Requests\AboutRequest;
use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AboutController extends Controller
{
     public function index(){ // Return all about  from database

        $allAbout = About::get();

        return response()->json($allAbout);
    }

    public function show($id){ // Return specific about  from database

        $specificAbout = About::findorfail($id);

        return response()->json($specificAbout);
    }

    public function store(AboutRequest $request){ // Store specific about  in database

        $data = $request->validated();

        if($request->hasFile('image')){
            $path = $request->file('image')->store("aboutImages");
            $data['image'] = $path;
        }

        About::create($data);

        return response()->json(['message' => 'About added successfully'], 201);
    }

    public function edit($id){

        $editSpecificAbout = About::findorfail($id);

        return response()->json($editSpecificAbout);
    }

    public function update(AboutRequest $request, $id){ // Update specific about in database

        $updateSpecificAbout = About::findorfail($id);

        $data = $request->validated();

        if($request->hasFile('image')){

            if(!empty($updateSpecificAbout->image) && Storage::exists($updateSpecificAbout->image)){
                Storage::delete($updateSpecificAbout->image);
            }

            $path = $request->file('image')->store("aboutImages");
            $data['image'] = $path;
        }

        $updateSpecificAbout->update($data);

        return response()->json(['message' => 'About updated successfully'], 200);
    }

    public function destroy($id){ // destroy specific about from database

        $destroySpecificAbout = About::findorfail($id);

        if(!empty($destroySpecificAbout->image) && Storage::exists($destroySpecificAbout->image)){

            Storage::delete($destroySpecificAbout->image);

            if(empty(Storage::files('aboutImages'))){
                Storage::deleteDirectory('aboutImages');
            }
        }

         $destroySpecificAbout->delete();
         return response()->json(['message' => 'About deleted successfully'], 200);
    }
}