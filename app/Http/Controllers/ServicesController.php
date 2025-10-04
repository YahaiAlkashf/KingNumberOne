<?php

namespace App\Http\Controllers;


use App\Models\MarketingService;
use App\Models\Faq;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ServicesController extends Controller
{
    // (Services)


    public function getServices()
    {
        try {
            $services = Service::orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'services' => $services
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في جلب الخدمات'
            ], 500);
        }
    }


    public function addService(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name_ar' => 'required|string',
            'name_en' => 'required|string',
            'name_tr' => 'required|string',
            'description_ar' => 'required|string',
            'description_en' => 'required|string',
            'description_tr' => 'required|string',
            'image' => 'nullable|image'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $service = new Service();
            $service->name_ar = $request->name_ar;
            $service->name_en = $request->name_en;
            $service->name_tr = $request->name_tr;
            $service->description_ar = $request->description_ar;
            $service->description_en = $request->description_en;
            $service->description_tr = $request->description_tr;

            if ($request->hasFile('image')) {
                $iconPath = $request->file('image')->store('services/image', 'public');
                $service->image = $iconPath;
            }

            $service->save();

            return response()->json([
                'success' => true,
                'message' => 'تم إضافة الخدمة بنجاح',
                'service' => $service
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في إضافة الخدمة',
                'error' => $e->getMessage()

            ], 500);
        }
    }


    public function updateService(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name_ar' => 'required|string',
            'name_en' => 'required|string',
            'name_tr' => 'required|string',
            'description_ar' => 'required|string',
            'description_en' => 'required|string',
            'description_tr' => 'required|string',
            'image' => 'nullable|image'
        ]);


        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $service = Service::findOrFail($id);
            $service->name_ar = $request->name_ar;
            $service->name_en = $request->name_en;
            $service->name_tr = $request->name_tr;
            $service->description_ar = $request->description_ar;
            $service->description_en = $request->description_en;
            $service->description_tr = $request->description_tr;


            if ($request->hasFile('image')) {
                if ($service->image && Storage::disk('public')->exists($service->icon)) {
                    Storage::disk('public')->delete($service->icon);
                }

                $iconPath = $request->file('image')->store('services/image', 'public');
                $service->image = $iconPath;
            }

            $service->save();

            return response()->json([
                'success' => true,
                'message' => 'تم تحديث الخدمة بنجاح',
                'service' => $service
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في تحديث الخدمة'
            ], 500);
        }
    }


    public function deleteService($id)
    {
        try {
            $service = Service::findOrFail($id);

            if ($service->image && Storage::disk('public')->exists($service->image)) {
                Storage::disk('public')->delete($service->image);
            }

            $service->delete();

            return response()->json([
                'success' => true,
                'message' => 'تم حذف الخدمة بنجاح'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في حذف الخدمة'
            ], 500);
        }
    }

    // (Marketing Services)

    public function getMarketingServices()
    {
        try {
            $marketingServices = MarketingService::orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'marketingServices' => $marketingServices
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في جلب خدمات التسويق'
            ], 500);
        }
    }


    public function addMarketingService(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name_ar' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'name_tr' => 'required|string|max:255',
            'description_ar' => 'nullable|string',
            'description_en' => 'nullable|string',
            'description_tr' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $marketingService = new MarketingService();
            $marketingService->name_ar = $request->name_ar;
            $marketingService->name_en = $request->name_en;
            $marketingService->name_tr = $request->name_tr;
            $marketingService->description_ar = $request->description_ar;
            $marketingService->description_en = $request->description_en;
            $marketingService->description_tr = $request->description_tr;

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('marketing-services/images', 'public');
                $marketingService->image = $imagePath;
            }

            $marketingService->save();

            return response()->json([
                'success' => true,
                'message' => 'تم إضافة خدمة التسويق بنجاح',
                'marketingService' => $marketingService
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في إضافة خدمة التسويق'
            ], 500);
        }
    }


    public function updateMarketingService(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name_ar' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'name_tr' => 'required|string|max:255',
            'description_ar' => 'nullable|string',
            'description_en' => 'nullable|string',
            'description_tr' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);


        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $marketingService = MarketingService::findOrFail($id);
            $marketingService->name_ar = $request->name_ar;
            $marketingService->name_en = $request->name_en;
            $marketingService->name_tr = $request->name_tr;
            $marketingService->description_ar = $request->description_ar;
            $marketingService->description_en = $request->description_en;
            $marketingService->description_tr = $request->description_tr;

            if ($request->hasFile('image')) {
                if ($marketingService->image && Storage::disk('public')->exists($marketingService->image)) {
                    Storage::disk('public')->delete($marketingService->image);
                }

                $imagePath = $request->file('image')->store('marketing-services/images', 'public');
                $marketingService->image = $imagePath;
            }

            $marketingService->save();

            return response()->json([
                'success' => true,
                'message' => 'تم تحديث خدمة التسويق بنجاح',
                'marketingService' => $marketingService
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في تحديث خدمة التسويق'
            ], 500);
        }
    }


    public function deleteMarketingService($id)
    {
        try {
            $marketingService = MarketingService::findOrFail($id);

            if ($marketingService->image && Storage::disk('public')->exists($marketingService->image)) {
                Storage::disk('public')->delete($marketingService->image);
            }

            $marketingService->delete();

            return response()->json([
                'success' => true,
                'message' => 'تم حذف خدمة التسويق بنجاح'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في حذف خدمة التسويق'
            ], 500);
        }
    }

    // (FAQ)

    public function getFaqs()
    {
        try {
            $faqs = Faq::orderBy('created_at', 'desc')->get();
            return response()->json([
                'success' => true,
                'faqs' => $faqs
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في جلب الأسئلة الشائعة'
            ], 500);
        }
    }


    public function addFaq(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'question_ar' => 'required|string',
            'question_en' => 'required|string',
            'question_tr' => 'required|string',
            'answer_ar' => 'required|string',
            'answer_en' => 'required|string',
            'answer_tr' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $faq = new Faq();
            $faq->question_ar = $request->question_ar;
            $faq->question_en = $request->question_en;
            $faq->question_tr = $request->question_tr;
            $faq->answer_ar = $request->answer_ar;
            $faq->answer_en = $request->answer_en;
            $faq->answer_tr = $request->answer_tr;
            $faq->save();

            return response()->json([
                'success' => true,
                'message' => 'تم إضافة السؤال بنجاح',
                'faq' => $faq
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في إضافة السؤال'
            ], 500);
        }
    }

    public function updateFaq(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'question_ar' => 'required|string',
            'question_en' => 'required|string',
            'question_tr' => 'required|string',
            'answer_ar' => 'required|string',
            'answer_en' => 'required|string',
            'answer_tr' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $faq = Faq::findOrFail($id);
            $faq->question_ar = $request->question_ar;
            $faq->question_en = $request->question_en;
            $faq->question_tr = $request->question_tr;
            $faq->answer_ar = $request->answer_ar;
            $faq->answer_en = $request->answer_en;
            $faq->answer_tr = $request->answer_tr;
            $faq->save();

            return response()->json([
                'success' => true,
                'message' => 'تم تحديث السؤال بنجاح',
                'faq' => $faq
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في تحديث السؤال'
            ], 500);
        }
    }


    public function deleteFaq($id)
    {
        try {
            $faq = Faq::findOrFail($id);
            $faq->delete();

            return response()->json([
                'success' => true,
                'message' => 'تم حذف السؤال بنجاح'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في حذف السؤال'
            ], 500);
        }
    }
}
