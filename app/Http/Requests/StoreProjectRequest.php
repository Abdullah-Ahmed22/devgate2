<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Allow only authenticated users
        return auth()->check();

        // If you want to allow everyone (even without login), use:
        // return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title'       => 'required|string|max:255',

            'text1'       => 'required|string',
            'text2'       => 'nullable|string',
            'text3'       => 'nullable|string',

            'image1'      => 'required|image|mimes:jpg,jpeg,png,webp',
            'image2'      => 'nullable|image|mimes:jpg,jpeg,png,webp',
            'image3'      => 'nullable|image|mimes:jpg,jpeg,png,webp',

            'types'       => 'nullable|array',
            'types.*'     => 'exists:types,id',


        ];
    }

    /**
     * Custom error messages (optional but cleaner)
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Title is required.',

            'text1.required' => 'Text1 is required.',

            'image1.image' => 'Image 1 must be a valid image file.',
            'image1.mimes' => 'Image 1 must be a JPG, JPEG, PNG, or WEBP file.',
            'image1.required' => 'Image 1 is required.',

            'image2.image' => 'Image 2 must be a valid image file.',
            'image2.mimes' => 'Image 2 must be a JPG, JPEG, PNG, or WEBP file.',

            'image3.image' => 'Image 3 must be a valid image file.',
            'image3.mimes' => 'Image 3 must be a JPG, JPEG, PNG, or WEBP file.',

            'types.array' => 'Types must be an array.',
            'types.*.exists' => 'One or more selected types are invalid.',
        ];
    }
}
