<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerOrdersResource;
use App\Http\Resources\ViewCustomerOrderResource;
use App\Models\Order;
use App\Models\OrderImage;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class BuyerOrderController extends Controller
{
    public function placeOrder(Request $req, $customerId, $serviceId, $providerId)
    {


        $order =  Order::create([

            'customer_id' => $customerId,
            'service_id' => $serviceId,
            'provider_id' => $providerId,

            'service_date' => $req->service_date,
            'response_time' => $req->response_time,
            'emergency' => filter_var($req->emergency, FILTER_VALIDATE_BOOLEAN),

            'max_delay' => $req->max_delay,
            'delivery_location' => $req->delivery_location,
            'service_detail' => $req->service_detail,
            'requirements' => $req->requirements,

            'name' => $req->name,

            'email' => $req->email,
            'number' => $req->number,
            'accept_terms' =>  filter_var($req->accept_terms, FILTER_VALIDATE_BOOLEAN)

        ]);
        $data = json_decode($req->scopes);


        $collection = collect($data)->keyBy('id')
            ->map(function ($item) {
                return collect($item)->except('id')->toArray();
            });

        $order->scopes()->syncWithoutDetaching($collection);

        $imageNames = [];
        if (isset($req->images)) {

            foreach ($req->images as $file) {

                if (isset($file) && $file instanceof UploadedFile) {

                    $extension = $file->getClientOriginalExtension();

                    $name = time() . '_' . uniqid() . '.' . $extension;

                    $file->move('order', $name);
                    $path = 'order/' . $name;

                    $imageNames[] = $path;
                }
            }
        }

        if (isset($imageNames)) {
            foreach ($imageNames as $image) {
                $data = new OrderImage();
                $data->name = $image;
                $data->order_id = $order->id;

                $data->save();
            }
        }

        return response()->json([
            'message' => 'Successfully Created'
        ]);
    }

    public function getBuyerOrders($customerId)
    {
        $orders = Order::with('services', 'providers.profile', 'status')->where('customer_id', $customerId)->orderBy('created_at', 'desc')->get();
        // return $orders;
        if ($orders) {
            return CustomerOrdersResource::collection($orders);
        }
        return $orders;
    }

    public function viewOrder($orderId)
    {


        $order = Order::whereHas('providers', function ($query) use ($orderId) {
            $query->where('id', Order::find($orderId)->provider_id);
        })
            ->with([
                'images',
                'services',
                'providers.profile',
                'status',
                'providers.scopes' => function ($query) use ($orderId) {
                    $query->whereIn('scope_user.scope_id', function ($subquery) use ($orderId) {
                        $subquery->select('scope_id')
                            ->from('order_scope') // Adjust the pivot table name if needed
                            ->where('order_id', $orderId);
                    });
                },
                'scopes'
            ])

            ->find($orderId);
        // return $order;

        return new ViewCustomerOrderResource($order);
    }
}
