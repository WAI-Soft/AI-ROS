<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\ContactRequest;
use App\Services\ContactService;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    protected ContactService $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
        
        // Apply rate limiting middleware: 5 requests per hour
        $this->middleware('throttle.contact');
    }

    /**
     * Store a new contact form submission.
     *
     * @param ContactRequest $request
     * @return JsonResponse
     */
    public function store(ContactRequest $request): JsonResponse
    {
        try {
            $submission = $this->contactService->processSubmission($request->validated());

            return ApiResponse::success(
                [
                    'reference_id' => $submission->reference_id,
                    'message' => 'Thank you for contacting us. We will get back to you soon.',
                ],
                'Contact form submitted successfully',
                201
            );
        } catch (\Exception $e) {
            return ApiResponse::error(
                'Failed to process contact form submission: ' . $e->getMessage(),
                null,
                500
            );
        }
    }
}
