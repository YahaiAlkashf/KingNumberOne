<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServicesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('admin/index');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');
Route::get('/aboutus', function () {
    return Inertia::render('AboutUs');
});
Route::get('/contact', function () {
    return Inertia::render('ContactUs');
});
Route::get('/service', function () {
    return Inertia::render('Services');
});


// Route::middleware('auth')->group(function () {

Route::get('/admin', function () {
    return Inertia::render('admin/index');
});
Route::get('/admin/home', function () {
    return Inertia::render('admin/Home');
});
Route::get('/admin/about', function () {
    return Inertia::render('admin/Aboute');
});
Route::get('/admin/contact', function () {
    return Inertia::render('admin/Contact');
});
Route::get('/admin/services', function () {
    return Inertia::render('admin/Services');
});
// });






//home page

Route::get('/services', [HomeController::class, 'getServices']);
Route::post('/services', [HomeController::class, 'addService']);
Route::post('/services/{id}', [HomeController::class, 'updateService']);
Route::delete('/services/{id}', [HomeController::class, 'deleteService']);

Route::get('/why-choose-us', [HomeController::class, 'getWhyChooseUs']);
Route::post('/why-choose-us', [HomeController::class, 'addWhyChooseUs']);
Route::post('/why-choose-us/{id}', [HomeController::class, 'updateWhyChooseUs']);
Route::delete('/why-choose-us/{id}', [HomeController::class, 'deleteWhyChooseUs']);

Route::get('/projects', [HomeController::class, 'getProjects']);
Route::post('/projects', [HomeController::class, 'addProject']);
Route::post('/projects/{id}', [HomeController::class, 'updateProject']);
Route::delete('/projects/{id}', [HomeController::class, 'deleteProject']);

Route::get('/our-numbers', [HomeController::class, 'getOurNumbers']);
Route::post('/our-numbers', [HomeController::class, 'addOurNumber']);
Route::post('/our-numbers/{id}', [HomeController::class, 'updateOurNumber']);
Route::delete('/our-numbers/{id}', [HomeController::class, 'deleteOurNumber']);



//services page

Route::get('/services', [ServicesController::class, 'getServices']);
Route::post('/services', [ServicesController::class, 'addService']);
Route::post('/services/{id}', [ServicesController::class, 'updateService']);
Route::delete('/services/{id}', [ServicesController::class, 'deleteService']);

Route::get('/marketing-services', [ServicesController::class, 'getMarketingServices']);
Route::post('/marketing-services', [ServicesController::class, 'addMarketingService']);
Route::post('/marketing-services/{id}', [ServicesController::class, 'updateMarketingService']);
Route::delete('/marketing-services/{id}', [ServicesController::class, 'deleteMarketingService']);

Route::get('/faqs', [ServicesController::class, 'getFaqs']);
Route::post('/faqs', [ServicesController::class, 'addFaq']);
Route::post('/faqs/{id}', [ServicesController::class, 'updateFaq']);
Route::delete('/faqs/{id}', [ServicesController::class, 'deleteFaq']);



// aboute page

    // About Us Routes
    Route::get('about-us', [AboutController::class, 'getAboutUs']);
    Route::post('about-us', [AboutController::class, 'saveAboutUs']);

    // Our Values Routes
    Route::get('our-values', [AboutController::class, 'getOurValues']);
    Route::post('our-values', [AboutController::class, 'saveOurValue']);
    Route::post('our-values/{id}', [AboutController::class, 'saveOurValue']);
    Route::delete('our-values/{id}', [AboutController::class, 'deleteOurValue']);

    // Our Journey Routes
    Route::get('our-journey', [AboutController::class, 'getOurJourney']);
    Route::post('our-journey', [AboutController::class, 'saveOurJourney']);
    Route::post('our-journey/{id}', [AboutController::class, 'saveOurJourney']);
    Route::delete('our-journey/{id}', [AboutController::class, 'deleteOurJourney']);

    // Contact page

    // Social Links Routes
    Route::get('social-links', [ContactController::class, 'getSocialLinks']);
    Route::post('social-links', [ContactController::class, 'saveSocialLink']);
    Route::post('social-links/{id}', [ContactController::class, 'saveSocialLink']);
    Route::delete('social-links/{id}', [ContactController::class, 'deleteSocialLink']);

    // Contact Info Routes
    Route::get('contact-info', [ContactController::class, 'getContactInfo']);
    Route::post('contact-info', [ContactController::class, 'saveContactInfo']);
    Route::post('contact-info/{id}', [ContactController::class, 'saveContactInfo']);
    Route::delete('contact-info/{id}', [ContactController::class, 'deleteContactInfo']);

    // FAQ Routes
    Route::get('contact-faqs', [ContactController::class, 'getContactFaqs']);
    Route::post('contact-faqs', [ContactController::class, 'saveContactFaq']);
    Route::post('contact-faqs/{id}', [ContactController::class, 'saveContactFaq']);
    Route::delete('contact-faqs/{id}', [ContactController::class, 'deleteContactFaq']);

    // Messages Routes (Admin)
    Route::get('contact-messages', [ContactController::class, 'getContactMessages']);
    Route::delete('contact-messages/{id}', [ContactController::class, 'deleteContactMessage']);

    // Public message submission
    Route::post('submit-message', [ContactController::class, 'submitContactMessage']);




require __DIR__ . '/auth.php';
