<?php

namespace App\Http\Controllers;

use App\Http\Requests\serviceRequest;
use App\Http\Resources\CatServiceResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\ServiceScopeResource;
use App\Http\Resources\SubCategoryResoruce;
use App\Http\Resources\UnitScopeResource;
use App\Models\Category;
use App\Models\Scope;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Subcategory;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
  public function create(Request $request, $id)
  {
    $path = null;

    if ($request->hasFile('icons')) {
      $file = $request->file('icons');
      $extension = $file->getClientOriginalExtension();
      $name = time() . '.' . $extension;
      $file->move('catservice/icons', $name);
      $path = 'catservice/icons/' . $name;
    }

    $value = Service::create([
      'subcategory_id' => $id,
      'name' => $request->name,
      'description' => $request->description,
      'keywords' => $request->keywords,
      'units' => $request->units,
      'icons' => $path,

    ]);
    $serviceId = $value->id;
    $scopes = json_decode($request->scopes);
    foreach ($scopes as $scope) {
      $value = new Scope();
      $value->name = $scope->name;
      $value->service_id = $serviceId;

      $value->save();
    }

    return response()->json([
      'message' => 'successfully created'
    ], 200);
  }

  public function viewServiceById($id)
  {
    $services = Service::find($id);
    return response()->json($services);
  }

  public function updateService(Request $request, Service $service)
  {
    $validate = $request->validate([
      'name' => ['required', Rule::unique('services', 'name')->ignore($service->id)],

      'description' => 'sometimes',
      'image' => 'sometimes',
      'subcategory_id' => 'required',
      'keywords' => 'sometimes'

    ]);
    if ($request->hasFile('icons')) {
      $destination = $service->icons;
      if (File::exists($destination)) {
        File::delete($destination);
      }
      $file = $request->file('icons');
      $extension = $file->getClientOriginalExtension();
      $name = time() . '.' . $extension;
      $file->move('category/icons', $name);
      $path = 'category/icons/' . $name;
    } else {
      $path = $service->icons;
    }

    $service->fill(collect($validate)->put('icons', $path)->toArray())->save();

    return response()->json([
      'message' => 'successfully updated'
    ], 200);
  }
  public function delete(Service $service)
  {
    $service->delete();
    return response()->json([
      'message' => 'deleted successfully'
    ], 200);
  }
  public function otherServices($id)
  {
    $item = Category::find($id)->services()->select('id', 'name')->get();
    return response()->json($item);
  }

  public function getAll()
  {
    $services = Service::all();
    if ($services) {
      return response()->json([
        'services'=>CatServiceResource::collection($services)
      ]);
    }
  }
  public function getBysubcategory($id)
  {

    $service=Subcategory::with('services')->find($id);

    
    if ($service) {
      return new SubCategoryResoruce($service);
    }
  }
  public function getByCategory($id)
  {
    
    $service = Service::whereHas('subcategory', function ($query) use ($id) {
      $query->where('category_id', $id);
    })
      ->get();
    if ($service) {
      return response()->json([
        'services'=>CatServiceResource::collection($service)
      ]);
    }
  }
  public function getScopes($serviceId){
    $scopes=Service::with('scopes')->find($serviceId);
    return new UnitScopeResource($scopes);
  }
}
