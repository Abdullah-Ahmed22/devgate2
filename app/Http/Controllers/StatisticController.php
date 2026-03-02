<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Statistic;

class StatisticController extends Controller
{
  // 1️⃣ List all statistics
    public function index()
    {
        $stats = Statistic::get();
        return response()->json([
            'status' => 'success',
            'data' => $stats
        ]);
    }

    // 2️⃣ Show single statistic
    public function show($id)
    {
        $stat = Statistic::findorFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $stat
        ]);
    }

    // 3️⃣ Create statistic
    public function store(Request $request)
    {
        $data = $request->validate([
            'number' => 'required|unsignedInteger',
            'title' => 'required|string|max:255',
        ]);

        $stat = Statistic::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Statistic created',
            'data' => $stat
        ]);
    }

    // 4️⃣ Update statistic
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'number' => 'nullable|unsignedInteger',
            'title' => 'nullable|string|max:255',
        ]);

         $stat = Statistic::findorFail($id);

        $stat->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Statistic updated',
            'data' => $stat
        ]);
    }

    // 5️⃣ Delete statistic
    public function destroy($id)
    {
        $stat = Statistic::findorFail($id);

        $stat->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Statistic deleted'
        ]);
    }
}
