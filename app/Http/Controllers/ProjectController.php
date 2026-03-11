<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{


     public function index(){ // Return all projects from database

        $allProjects = Project::with('types')->get();

        return response()->json($allProjects);
    }

    public function show($id){ // Return specific projects from database

       $specificProject = Project::with('types')->findorfail($id);
        return response()->json($specificProject);
    }

    public function store(StoreProjectRequest $request){ // Store specific projects in database

        $data = $request->validated();

        if($request->hasFile('image1')){
            $path1 = $request->file('image1')->store("projectImages");

            $data['image1'] = $path1;
        }

        if($request->hasFile('image2')){
            $path2 = $request->file('image2')->store("projectImages");
            $data['image2'] = $path2;
        }

        if($request->hasFile('image3')){
            $path3 = $request->file('image3')->store("projectImages");
            $data['image3'] = $path3;
        }
       $project = Project::create($data);
       if($request->has('types')){
       $project->types()->attach($request->types);
}

return response()->json(['message' => 'Project added successfully'], 201);
    }

    public function edit($id){

        $editSpecificProject = Project::findorfail($id);

        return response()->json($editSpecificProject);
    }

   public function update(UpdateProjectRequest $request, $id){ // Update specific projects in database

        $updateSpecificProject = Project::findorfail($id);
        $data = $request->validated();

        if($request->hasFile('image1')){
            if(!empty($updateSpecificProject->image1) && Storage::exists($updateSpecificProject->image1)){

                Storage::delete($updateSpecificProject->image1);
            }
            $path1 = $request->file('image1')->store("projectImages");
            $data['image1'] = $path1;
        }

        if($request->hasFile('image2')){
            if(!empty($updateSpecificProject->image2) && Storage::exists($updateSpecificProject->image2)){

                Storage::delete($updateSpecificProject->image2);
            }
            $path2 = $request->file('image2')->store("projectImages");
            $data['image2'] = $path2;
        }

        if($request->hasFile('image3')){
            if(!empty($updateSpecificProject->image3) && Storage::exists($updateSpecificProject->image3)){

                Storage::delete($updateSpecificProject->image3);
            }
            $path3 = $request->file('image3')->store("projectImages");
            $data['image3'] = $path3;
        }

        $updateSpecificProject->update($data);
        if($request->has('types')){
        $updateSpecificProject->types()->sync($request->types);
}

        return response()->json(['message' => 'Project updated successfully'], 200);
    }

    public function destroy($id){ // destroy specific project from database

        $destroySpecificProject = Project::findorfail($id);

        if(!empty($destroySpecificProject->image1) && Storage::exists($destroySpecificProject->image1)){

            Storage::delete($destroySpecificProject->image1);

            if(empty(Storage::files('projectImages'))){
                Storage::deleteDirectory('projectImages');
            }
        }

        if(!empty($destroySpecificProject->image2) && Storage::exists($destroySpecificProject->image2)){

            Storage::delete($destroySpecificProject->image2);

            if(empty(Storage::files('projectImages'))){
                Storage::deleteDirectory('projectImages');
            }
        }

        if(!empty($destroySpecificProject->image3) && Storage::exists($destroySpecificProject->image3)){

            Storage::delete($destroySpecificProject->image3);

            if(empty(Storage::files('projectImages'))){
                Storage::deleteDirectory('projectImages');
            }
        }

         $destroySpecificProject->delete();
         return response()->json(['message' => 'Project deleted successfully'], 200);
    }

}
