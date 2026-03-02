<?php

namespace App\Http\Controllers;

use App\Http\Requests\AboutTitleRequest;
use App\Models\AboutTitle;
use Illuminate\Http\Request;

class AboutTitleController extends Controller
{
     public function index(){ // Return all about titles from database

        $allAboutTitles = AboutTitle::get();

        return response()->json($allAboutTitles);
    }

    public function show($id){ // Return specific about title from database

        $specificAboutTitle = AboutTitle::findorfail($id);

        return response()->json($specificAboutTitle);
    }

    public function store(AboutTitleRequest $request){ // Store specific about title in database

        $data = $request->validated();

        AboutTitle::create($data);

        return response()->json(['message' => 'About title added successfully'], 201);
    }

    public function edit($id){

        $editSpecificAboutTitle = AboutTitle::findorfail($id);

        return response()->json($editSpecificAboutTitle);
    }

    public function update(AboutTitleRequest $request, $id){ // Update specific about title in database

        $data = $request->validated();

        $updateSpecificAboutTitle = AboutTitle::findorfail($id);

        $updateSpecificAboutTitle->update($data);

        return response()->json(['message' => 'About title updated successfully'], 200);
    }

    public function destroy($id){ // destroy specific about title from database

        $destroySpecificAboutTitle = AboutTitle::findorfail($id);

         $destroySpecificAboutTitle->delete();
         return response()->json(['message' => 'About title deleted successfully'], 200);
    }
}
