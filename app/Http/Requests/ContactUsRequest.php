<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactUsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'regex:/^(010|011|012|015)[0-9]{8}$/'],
            'message' => ['required']
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required.',
            'name.min' => 'Name must be at least 3 characters.',
            
            'email.required' => 'Email is required.',
            'email.email' => 'Email must be a valid email address.',

            'phone.required' => 'Phone number is required.',
            'phone.regex' => 'Phone must start with 010, 011, 012, or 015 and contain 11 digits.',
            'phone.unique' => 'This phone number has already been used.',

            'message.required' => 'Message cannot be empty.'
        ];
    }
}
