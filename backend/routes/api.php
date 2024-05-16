<?php

use App\Http\Controllers\Api\V1\DevsController;
use App\Http\Controllers\Api\V1\LevelsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function(){
    Route::apiResource('levels', LevelsController::class);
});

Route::group(['prefix' => 'v1'], function(){
    Route::apiResource('devs', DevsController::class);
});
