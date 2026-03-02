<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\AboutTitleController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\HomeImageController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ResearchSurveyController;
use App\Http\Controllers\TeammateController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\OurClientController;
use App\Http\Controllers\StatisticController;

Route::post('/admin/login', [AdminAuthController::class, 'login']);

Route::get('/homeimage',[HomeImageController::class, 'index'])->name('index');

// Route::get('/researchsurveys', [ResearchSurveyController::class, 'index']);
// Route::get('/researchsurveys/{id}', [ResearchSurveyController::class, 'show']);

Route::get('/teammates', [TeammateController::class, 'index']);
Route::get('/teammates/{id}',[TeammateController::class, 'show']);

Route::get('/projects',[ProjectController::class, 'index'])->name('index');
Route::get('/projects/{id}', [ProjectController::class, 'show']);

Route::get('/abouttitle',[AboutTitleController::class, 'index'])->name('index');

Route::get('/about',[AboutController::class, 'index'])->name('index');
    
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);

Route::get('/ourclients', [OurClientController::class, 'index']);
Route::get('/ourclients/{id}', [OurClientController::class, 'show']);

Route::post('/contactus', [ContactUsController::class, 'store'])->name('store');

Route::get('/statistics', [StatisticController::class, 'index']);
Route::get('/statistics/{id}', [StatisticController::class, 'show']);


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
    Route::get('/admins', [AdminAuthController::class, 'index']);
    Route::post('/admins', [AdminAuthController::class, 'store']);
    Route::delete('/admins/{id}', [AdminAuthController::class, 'destroy']);

    // Route::post('/researchsurveys', [ResearchSurveyController::class, 'store']);
    // Route::put('/researchsurveys/{id}', [ResearchSurveyController::class, 'update']);
    // Route::delete('/researchsurveys/{id}', [ResearchSurveyController::class, 'destroy']);

    Route::post('/teammates', [TeammateController::class, 'store']);
    Route::put('/teammates/{id}',[TeammateController::class, 'update']);
    Route::delete('/teammates/{id}',[TeammateController::class, 'destroy']);

    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    Route::post('/ourclients', [OurClientController::class, 'store']);
    Route::delete('/ourclients/{id}', [OurClientController::class, 'destroy']);

    Route::post('/statistics', [StatisticController::class, 'store']);
    Route::put('/statistics/{id}', [StatisticController::class, 'update']);
    Route::delete('/statistics/{id}', [StatisticController::class, 'destroy']);

    Route::get('/contactus/{id}', [ContactUsController::class, 'show'])->where(['id' => '[0-9]+'])->name('show');
    Route::delete('/contactus/{id}', [ContactUsController::class, 'destroy'])->where(['id' => '[0-9]+'])->name('destroy');
    Route::get('/contactus',[ContactUsController::class, 'index'])->name('index');

    Route::post('/projects', [ProjectController::class, 'store'])->name('store');
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy'])->where(['id' => '[0-9]+'])->name('destroy');
    Route::get('/projects/{id}/edit', [ProjectController::class, 'edit'])->where(['id' => '[0-9]+'])->name('edit');
    Route::put('/projects/{id}', [ProjectController::class, 'update'])->where(['id' => '[0-9]+'])->name('update');

    Route::post('/abouttitle', [AboutTitleController::class, 'store'])->name('store');
    Route::put('/abouttitle/{id}', [AboutTitleController::class, 'update'])->where(['id' => '[0-9]+'])->name('update');
    Route::delete('/abouttitle/{id}', [AboutTitleController::class, 'destroy'])->where(['id' => '[0-9]+'])->name('destroy');

    Route::post('/about', [AboutController::class, 'store'])->name('store');
    Route::put('/about/{id}', [AboutController::class, 'update'])->where(['id' => '[0-9]+'])->name('update');
    Route::delete('/about/{id}', [AboutController::class, 'destroy'])->where(['id' => '[0-9]+'])->name('destroy');

    Route::post('/homeimage', [HomeImageController::class, 'store'])->name('store');
    Route::delete('/homeimage/{id}', [HomeImageController::class, 'destroy'])->where(['id' => '[0-9]+'])->name('destroy');
});







