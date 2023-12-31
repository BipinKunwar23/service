<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\qualification;

class qualificationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    use qualification;
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $action=$this->route()->getActionMethod();
        switch($action){
            case "create":{
                return $this->commonRules();
            }
            case "update":{
                return $this->commonRules();

            }
          
        }

    }
}
