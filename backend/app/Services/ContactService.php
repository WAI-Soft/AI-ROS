<?php

namespace App\Services;

use App\Models\ContactSubmission;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactService
{
    /**
     * Process a contact form submission.
     *
     * @param array $data
     * @return ContactSubmission
     */
    public function processSubmission(array $data): ContactSubmission
    {
        // Verify reCAPTCHA
        if (!$this->verifyRecaptcha($data['recaptcha_token'] ?? '')) {
            throw new \Exception('reCAPTCHA verification failed');
        }

        // Generate unique reference ID
        $referenceId = $this->generateReferenceId();

        // Create submission
        $submission = ContactSubmission::create([
            'name' => $data['name'],
            'company' => $data['company'] ?? null,
            'email' => $data['email'],
            'subject' => $data['subject'],
            'message' => $data['message'],
            'reference_id' => $referenceId,
            'status' => 'new',
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);

        // Send emails asynchronously
        try {
            $this->sendConfirmationEmail($submission);
            $this->sendNotificationEmail($submission);
        } catch (\Exception $e) {
            Log::error('Failed to send contact form emails: ' . $e->getMessage());
        }

        return $submission;
    }

    /**
     * Generate a unique reference ID in format CNT-YYYYMMDD-XXXX.
     *
     * @return string
     */
    public function generateReferenceId(): string
    {
        $date = now()->format('Ymd');
        $random = strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 4));
        
        return "CNT-{$date}-{$random}";
    }

    /**
     * Verify reCAPTCHA token with Google API.
     *
     * @param string $token
     * @return bool
     */
    public function verifyRecaptcha(string $token): bool
    {
        $secretKey = config('services.recaptcha.secret_key');
        
        // Skip verification in local environment if no key is set
        if (empty($secretKey) && app()->environment('local')) {
            return true;
        }

        if (empty($secretKey)) {
            return false;
        }

        try {
            $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => $secretKey,
                'response' => $token,
                'remoteip' => request()->ip(),
            ]);

            $result = $response->json();
            
            return $result['success'] ?? false;
        } catch (\Exception $e) {
            Log::error('reCAPTCHA verification error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Send confirmation email to the user.
     *
     * @param ContactSubmission $submission
     * @return void
     */
    public function sendConfirmationEmail(ContactSubmission $submission): void
    {
        // TODO: Implement email sending with Mailgun/SendGrid
        // For now, just log it
        Log::info('Confirmation email would be sent to: ' . $submission->email, [
            'reference_id' => $submission->reference_id,
        ]);
    }

    /**
     * Send notification email to the sales team.
     *
     * @param ContactSubmission $submission
     * @return void
     */
    public function sendNotificationEmail(ContactSubmission $submission): void
    {
        // TODO: Implement email sending with Mailgun/SendGrid
        // For now, just log it
        $salesEmail = config('mail.sales_email', 'sales@ai-ros.com');
        
        Log::info('Notification email would be sent to: ' . $salesEmail, [
            'reference_id' => $submission->reference_id,
            'from' => $submission->email,
            'subject' => $submission->subject,
        ]);
    }
}
