<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\abdul;
// use App\Http\Controllers\AboutController;
// use App\Http\Controllers\AboutTitleController;
use App\Http\Controllers\AdminAuthController;

// use App\Http\Controllers\ContactUsController;
// use App\Http\Controllers\ProjectController;

use App\Http\Controllers\ResearchSurveyController;


Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');






Route::middleware('admin.auth')->get('/admin/dashboard', function () {
    return response()->json(['message' => 'Welcome Admin']);
});


// Route::controller(ContactUsController::class)->group(function(){
//     Route::get('/contactus','index')->name('index');
//     Route::get('/contactus/{id}', 'show')->where(['id' => '[0-9]+'])->name('show');
//     Route::post('/contactus', 'store')->name('store');
//     Route::delete('/contactus/{id}', 'destroy')->where(['id' => '[0-9]+'])->name('destroy');
// });


// Route::controller(ProjectController::class)->group(function(){
//     Route::get('/projects','index')->name('index');
//     Route::get('/projects/{id}', 'show')->where(['id' => '[0-9]+'])->name('show');
//     Route::post('/projects', 'store')->name('store');
//     Route::delete('/projects/{id}', 'destroy')->where(['id' => '[0-9]+'])->name('destroy');
//     Route::get('/projects/{id}/edit', 'edit')->where(['id' => '[0-9]+'])->name('edit');
//     Route::put('/projects/{id}', 'update')->where(['id' => '[0-9]+'])->name('update');
// });


// Route::controller(AboutTitleController::class)->group(function(){
//     Route::get('/abouttitle','index')->name('index');
//     Route::get('/abouttitle/{id}', 'show')->where(['id' => '[0-9]+'])->name('show');
//     Route::post('/abouttitle', 'store')->name('store');
//     Route::delete('/abouttitle/{id}', 'destroy')->where(['id' => '[0-9]+'])->name('destroy');
//     Route::get('/abouttitle/{id}/edit', 'edit')->where(['id' => '[0-9]+'])->name('edit');
//     Route::put('/abouttitle/{id}', 'update')->where(['id' => '[0-9]+'])->name('update');
// });

// Route::controller(AboutController::class)->group(function(){
//     Route::get('/about','index')->name('index');
//     Route::get('/about/{id}', 'show')->where(['id' => '[0-9]+'])->name('show');
//     Route::post('/about', 'store')->name('store');
//     Route::delete('/about/{id}', 'destroy')->where(['id' => '[0-9]+'])->name('destroy');
//     Route::get('/about/{id}/edit', 'edit')->where(['id' => '[0-9]+'])->name('edit');
//     Route::put('/about/{id}', 'update')->where(['id' => '[0-9]+'])->name('update');
// });





