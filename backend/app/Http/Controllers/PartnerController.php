<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\PartnerResource;
use App\Models\Partner;
use Illuminate\Http\JsonResponse;

class PartnerController extends Controller
{
    /**
     * Display a list of all partners ordered by display order.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $partners = Partner::orderBy('order')
            ->orderBy('name')
            ->get();

        return ApiResponse::success(
            PartnerResource::collection($partners),
            'Partners retrieved successfully'
        );
    }
}
