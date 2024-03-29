<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\OptionsController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\ServiceTypeController;
use App\Http\Controllers\Admin\StandardController;
use App\Http\Controllers\Admin\SubCategoryController;
use App\Http\Controllers\Admin\SubServiceController;
use App\Http\Controllers\Admin\SubsubcateogryController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\Buyer\BuyerCatalogController;
use App\Http\Controllers\Buyer\BuyerFeedbackController;
use App\Http\Controllers\Buyer\BuyerOrderController;
use App\Http\Controllers\Buyer\BuyerServiceController;
use App\Http\Controllers\Buyer\FilterSearchController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\ProfessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RequirementsController;
use App\Http\Controllers\ScopeUserController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SearchHistoryController;
use App\Http\Controllers\Seller\SellerCatalogController;
use App\Http\Controllers\Seller\SellerFeedbackController;
use App\Http\Controllers\Seller\SellerOrderController;
use App\Http\Controllers\Seller\SellerProfileController;
use App\Http\Controllers\Seller\SellerServiceController;
use App\Http\Controllers\ServiceProviderController;
use App\Models\SearchHistory;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('user')->controller(UserController::class)->group(function () {
    Route::post('/create', 'create');
    Route::middleware('auth:sanctum')->get('/get', [UserController::class, 'get']);
    Route::post('/login', 'login');
    Route::get('/view', 'viewAll');
    Route::get('/view/{userId}', 'viewById');
    Route::put('/update/{user}', 'update');
    Route::delete('/delete/{userId}', 'delete');
    Route::get('/profile/auth/{userId}', 'providerAuth');
});

Route::prefix('landing')->controller(LandingPageController::class)->group(function () {

    Route::post('stories/{userId}/create', 'successStoreis');
    Route::post('questions/{userId}/create', 'askquestions');
    Route::post('about/create', 'aboutUs');
    Route::post('contact/create', 'contactUs');
    Route::post('header/create', 'headers');
    Route::post('legal/create', 'legals');

    Route::get('stories/{userId}/get', 'getSuccessStoreis');
    Route::get('questions/{userId}/get', 'getAskquestions');
    Route::get('about/get', 'getAboutUs');
    Route::get('contact/get', 'getcontactUs');
    Route::get('header/get', 'getHeaders');
    Route::get('legal/get', 'getlegals');
});

Route::prefix('profile')->middleware('auth:sanctum')->controller(ProfileController::class)->group(function () {

    // Route::middleware('auth:sanctum')->get('/get',[UserController::class,'get']);

    Route::get('/view', 'viewProfile');
    Route::post('/create', 'create');
    Route::post('/security', 'addSecurity');

    Route::delete('/delete/{profile}', 'delete');
});

Broadcast::routes(['middleware' => ['auth:sanctum']]);
Route::prefix('chat')->middleware('auth:sanctum')->controller(ChatController::class)->group(function () {

    // Route::get('chat/get',[ChatController::class,'sendMessage'])->middleware('auth:sanctum')
    Route::get('private/all', 'index');
    Route::post('private/{receiverId}', 'store');
    Route::get('private/{receiverId}', 'show');
});


Route::prefix('notification')->middleware('auth:sanctum')->controller(NotificationController::class)->group(function () {

    // Route::get('chat/get',[ChatController::class,'sendMessage'])->middleware('auth:sanctum')
    Route::post('create', 'createNotificaitons');
    Route::get('all', 'getNotifications');
    Route::get('private/{receiverId}', 'show');
});


Route::prefix('history')->middleware('auth:sanctum')->controller(SearchHistoryController::class)->group(function () {

    // Route::get('chat/get',[ChatController::class,'sendMessage'])->middleware('auth:sanctum')
    Route::post('create/{serviceId}', 'createSearchRecord');
    Route::post('update/rating/{searchId}', 'upadatRating');
    Route::post('update/rating/{searchId}', 'updateLocation');
    Route::post('update/rating/{searchId}', 'updateBudget');


    Route::get('view', 'viewUserSearchHistory');
    Route::get('private/{receiverId}', 'show');
});




Route::prefix('admin')->group(function () {

    Route::prefix('category')->controller(CategoryController::class)->group(function () {
        Route::post('create', 'create');
        Route::get('all', 'getAllCategory');
        Route::get('view/{id}', 'viewCategoryById');
        Route::post('edit/{id}', 'updateCategory');
    });

    Route::prefix('subcategory')->controller(SubCategoryController::class)->group(function () {
        Route::post('create/{categoryId}', 'create');
        Route::get('all', 'getAllSubCategory');
        Route::get('view/category/{categoryId}', 'getSubCategoryByCategory');
        Route::get('view/{id}', 'getById');
        Route::put('edit/{id}', 'updateSubCategory');
    });

    Route::prefix('option')->controller(OptionsController::class)->group(function () {
        Route::post('create/{serviceId}', 'create');
        Route::get('all', 'getAllSubCategory');
        Route::get('service/{serviceId}', 'getByService');
        Route::get('view/{id}', 'getById');
        Route::put('edit/{id}', 'updateSubCategory');
        Route::prefix('standard')->group(function () {
            Route::post('create/{serviceId}', 'createStandard');

            Route::get('all', 'show');
            Route::get('{serviceId}', 'getStandardByServicesId');
            Route::prefix('value')->group(function () {
                Route::post('create/{standardId}', 'addValues');

                Route::get('{standardId}', 'getValuesByStandard');
            });
        });
    });

    Route::prefix('service')->controller(ServiceController::class)->group(function () {
        Route::post('create/{id}', 'create');
        Route::get('all', 'getAllServices');
        Route::get('view/{id}', 'viewById');
        Route::get('category/{categoryId}', 'getByCategory');
        Route::get('subcategory/{subcategoryId}', 'getBySubCategory');
        Route::post('edit/{service}', 'updateService');
    });
    Route::prefix('user')->controller(UserController::class)->group(function () {
        Route::post('create', 'create');
        Route::get('all', 'viewAllUsers');
        Route::get('services', 'viewAllServices');

        Route::get('view/{id}', 'viewCategoryById');
        Route::post('edit/{id}', 'updateCategory');
    });

});




Route::prefix('buyer')->group(function () {

    Route::prefix('catalog')->controller(BuyerCatalogController::class)->group(function () {
        Route::get('show', 'viewCatalog');
    });

    Route::prefix('service')->controller(BuyerServiceController::class)->group(function () {
        Route::middleware('auth:sanctum')->get('recommend', 'getRecommendedServices');
        Route::get('all', 'getAllServiceCards');
        Route::get('{serviceId}', 'getServiceDetails');
        Route::get('{serviceId}/package', 'getServicePackage');

    });

    Route::prefix('filter')->controller(FilterSearchController::class)->group(function () {
        Route::get('service', 'searchService');
        Route::get('search/list/{name}', 'getSearchList');
        Route::get('location/provider', 'searchByLocation');
        Route::get('location/category/{categoryId}', 'searchCategoryLocation');
        Route::get('search', 'getSearchedServices');
        Route::get('service/{serviceId}', 'getfilteredService');
        Route::get('types/{serviceId}', 'getFilterTypes');
    });

    Route::prefix('order')->middleware('auth:sanctum')->controller(BuyerOrderController::class)->group(function () {
        Route::post('service/{serviceId}', 'placeOrder');
        Route::get('view/{orderId}', 'viewOrder');
        Route::get('all', 'getAllOrders');
    });

    Route::prefix('review')->middleware('auth:sanctum')->controller(BuyerFeedbackController::class)->group(function () {

        Route::post('{serviceId}', 'reviewService');
        Route::get('{serviceId}', 'getReviews');
    });
});




Route::prefix('seller')->middleware('auth:sanctum')->group(function () {

    Route::prefix('catalog')->controller(SellerCatalogController::class)->group(function () {
        Route::get('category', 'viewCategory');
        Route::get('subcategory', 'viewSubCategory');
        Route::get('service', 'viewService');
        Route::get('subservice', 'viewSubService');
        Route::get('subservice/{serviceId}', 'getSubserviceByService');
        Route::get('show', 'viewCatalog');
    });

    Route::prefix('service')->controller(SellerServiceController::class)->group(function () {
        Route::post('overview/{serviceId}', 'createOverView');
        Route::put('overview/{serviceId}', 'updateOverView');


        Route::post('price/{serviceId}', 'createPrice');
        Route::put('price/{serviceId}', 'updatePrice');

        Route::post('gallery/{serviceId}', 'createGallery');
        Route::post('gallery/update/{serviceId}', 'updateGallery');

        Route::post('faqs/{serviceId}', 'createFaq');
        Route::put('faqs/{serviceId}', 'updateFaq');

        Route::post('requirement/{serviceId}', 'createRequirement');
        Route::put('requirement/{serviceId}', 'updateRequirement');

        Route::post('save/{serviceId}', 'saveService');


        Route::get('all', 'viewServiceSummary');
        Route::get('cards', 'viewServiceCards');
        Route::get('draft/{serviceId}', 'DraftService');
        Route::get('{serviceId}', 'getServiceDetails');
        Route::get('option/standard/{optionId}', 'getOptionStandards');
        Route::delete('delete/{id}', 'deleteService');

    });
    Route::prefix('profile')->controller(SellerProfileController::class)->group(function () {
        Route::post('personal', 'createPersonal');
        Route::post('personal/update', 'updatePersonal');


        Route::post('qualification', 'createProfession');
        Route::put('qualification', 'updateProfession');

        Route::post('availability', 'createAvailability');
        Route::put('availability', 'updateAvailability');

        Route::post('security', 'createSecurity');
        Route::post('role', 'setRole');
        Route::get('role', 'getRole');


        Route::get('view', 'viewProfile');
    });

    Route::prefix('order')->controller(SellerOrderController::class)->group(function () {
        Route::get('all', 'getAllReceivedOrders');
        Route::get('view/{orderId}', 'viewOrderReceived');
        Route::put('{orderId}/accept', 'AcceptOrder');
        Route::put('{orderId}/cancel', 'CancelOrder');
    });
});
