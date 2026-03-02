<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\Storage;


class ServiceController extends Controller
{
   // 1. Get all services
    public function index()
    {
        $services = Service::get();
        return response()->json([
            'status'=>'success',
            'data'=>$services
        ]);
    }

    // 2. Get single service
    public function show($id)
    {
        $service = Service::findorfail($id);
        return response()->json(['status'=>'success','data'=>$service]);
    }

    // 3. Create service
    public function store(Request $request)
    {
    $data = $request->validate([
        'title' => 'required|string',
        'description' => 'required|string',
        'image1'=> 'required|image|mimes:jpg,jpeg,png,webp',
        'text1'=>'required|string',
        'text2'=>'nullable|string',
        'image2'=> 'nullable|image|mimes:jpg,jpeg,png,webp',
        'text3'=>'nullable|string',
    ]);

    if($request->hasFile('image1')){
            $path1 = $request->file('image1')->store("serviceImages");
            $data['image1'] = $path1;
    }

    if($request->hasFile('image2')){
        $path2 = $request->file('image2')->store("serviceImages");
        $data['image2'] = $path2;
    }

    $service = Service::create($data);

    return response()->json([
        'status' => 'success',
        'message' => 'Service created',
        'data' => $service
    ]);
}

    // 4. Update service
public function update(Request $request, $id)
{
    $service = Service::findOrFail($id);

    $data = $request->validate([
        'title'=>'nullable|string',
        'description'=>'nullable|string',
        'image1'=> 'nullable|image|mimes:jpg,jpeg,png,webp',
        'text1'=>'nullable|string',
        'text2'=>'nullable|string',
        'image2'=> 'nullable|image|mimes:jpg,jpeg,png,webp',
        'text3'=>'nullable|string',
    ]);

    if($request->hasFile('image1')){

        if(!empty($service->image1) && Storage::exists($service->image1)){

                Storage::delete($service->image1);
        }
        $path1 = $request->file('image1')->store("serviceImages");
        $data['image1'] = $path1;
    }

    if($request->hasFile('image2')){
        if(!empty($service->image2) && Storage::exists($service->image2)){

            Storage::delete($service->image2);
        }
        $path2 = $request->file('image2')->store("serviceImages");
        $data['image2'] = $path2;
    }

    $service->update($data);

    return response()->json([
        'status'=>'success',
        'message'=>'Service updated',
        'data'=>$service
    ]);
}

    // 5. Delete service
    public function destroy($id)
    {
        $service = Service::findorfail($id);

        if(!empty($service->image1) && Storage::exists($service->image1)){

            Storage::delete($service->image1);

            if(empty(Storage::files('serviceImages'))){
                Storage::deleteDirectory('serviceImages');
            }
        }

        if(!empty($service->image2) && Storage::exists($service->image2)){

            Storage::delete($service->image2);

            if(empty(Storage::files('serviceImages'))){
                Storage::deleteDirectory('serviceImages');
            }
        }

        $service->delete();
        return response()->json(['status'=>'success','message'=>'Service deleted']);
    }
}
