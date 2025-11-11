<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RepositoryController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::resource('repositories', RepositoryController::class)->middleware('auth');

require __DIR__.'/settings.php';
