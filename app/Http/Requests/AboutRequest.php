<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AboutRequest extends FormRequest
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
            'image' => ['required', 'image', 'mimes:png,jpg,jpeg'],
            'header' => ['required', 'min:3'],
            'header_description' => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'image.required' => 'Image is required.',
            'image.image' => 'The uploaded file must be a valid image.',
            'image.mimes' => 'The image must be a file of type: png, jpg, jpeg.',

            'header.required' => 'Header is required.',
            'header.min' => 'Header must be at least 3 characters.',

            'header_description.required' => 'Header description is required.',
        ];
    }
}
