<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HomeImageRequest extends FormRequest
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
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp',
        ];
    }

    public function messages()
    {
        return[
            'image.image' => 'Image must be a valid image file.',
            'image.mimes' => 'Image must be a PNG or JPG file.',
        ];

    }
}
