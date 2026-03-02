<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactUsRequest;
use App\Models\ContactUs;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{

    public function index(Request $request)
    {
        if (!$request->user()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 401);
        }

        $allContactUs = ContactUs::latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => $allContactUs
        ]);
    }


    public function show($id)
    {
        $specificContactUs = ContactUs::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $specificContactUs
        ]);
    }

    public function store(ContactUsRequest $request)
    {
        $data = $request->validated();

        ContactUs::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Contact message added successfully'
        ], 201);
    }


    public function destroy(Request $request, $id)
    {
        if (!$request->user()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 401);
        }

        $contact = ContactUs::findOrFail($id);
        $contact->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Contact message deleted successfully'
        ]);
    }
}