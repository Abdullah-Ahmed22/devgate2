<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // $id = $this->route('id');
        return [
            
            'title'       => 'nullable|string|max:255',
            'text1'       => 'nullable|string',
            'text2'       => 'nullable|string',
            'text3'       => 'nullable|string',

            'image1'      => 'nullable|image|mimes:jpg,jpeg,png,webp',
            'image2'      => 'nullable|image|mimes:jpg,jpeg,png,webp',
            'image3'      => 'nullable|image|mimes:jpg,jpeg,png,webp',
        ];
    }

    public function messages()
    {
        return[
            'title.max' => 'Title must be less than 255 characters.',

            'image1.image' => 'Image1 must be a valid image file.',
            'image1.mimes' => 'Image1 must be a JPG, JPEG, PNG, or WEBP file.',

            'image2.image' => 'Image2 must be a valid image file.',
            'image2.mimes' => 'Image2 must be a JPG, JPEG, PNG, or WEBP file.',

            'image3.image' => 'Image3 must be a valid image file.',
            'image3.mimes' => 'Image3 must be a JPG, JPEG, PNG, or WEBP file.',
        ];

    }
}
