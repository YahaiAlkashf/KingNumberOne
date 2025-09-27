<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\WhyChooseUs;
use App\Models\Project;
use App\Models\OurNumber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    // ==================== SERVICES ====================

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
                if ($service->image && Storage::disk('public')->exists($service->image)) {
                    Storage::disk('public')->delete($service->image);
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
         Log::error('Error in addService: ', [
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'trace' => $e->getTraceAsString()
        ]);
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

            if ($service->image) {
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

    // ==================== WHY CHOOSE US ====================


    public function getWhyChooseUs()
    {
        try {
            $whyChooseUs = WhyChooseUs::orderBy('created_at', 'desc')->get();
            return response()->json([
                'success' => true,
                'whyChooseUs' => $whyChooseUs
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في جلب العناصر'
            ], 500);
        }
    }

    public function addWhyChooseUs(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name_ar' => 'required|string',
            'name_ar' => 'required|string',
            'name_ar' => 'required|string',
            'description_ar' => 'required|string',
            'description_en' => 'required|string',
            'description_tr' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $whyChoose = new WhyChooseUs();
            $whyChoose->name_ar = $request->name_ar;
            $whyChoose->name_en = $request->name_en;
            $whyChoose->name_tr = $request->name_tr;
            $whyChoose->description_ar = $request->description_ar;
            $whyChoose->description_en = $request->description_en;
            $whyChoose->description_tr = $request->description_tr;

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('why_choose_us', 'public');
                $whyChoose->image = $imagePath;
            }

            $whyChoose->save();

            return response()->json([
                'success' => true,
                'message' => 'تم إضافة العنصر بنجاح',
                'whyChooseUs' => $whyChoose
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في إضافة العنصر'
            ], 500);
        }
    }


    public function updateWhyChooseUs(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name_ar' => 'required|string',
            'name_ar' => 'required|string',
            'name_ar' => 'required|string',
            'description_ar' => 'required|string',
            'description_en' => 'required|string',
            'description_tr' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $whyChoose = WhyChooseUs::findOrFail($id);
            $whyChoose->name_ar = $request->name_ar;
            $whyChoose->name_en = $request->name_en;
            $whyChoose->name_tr = $request->name_tr;
            $whyChoose->description_ar = $request->description_ar;
            $whyChoose->description_en = $request->description_en;
            $whyChoose->description_tr = $request->description_tr;

            if ($request->hasFile('image')) {
                if ($whyChoose->image) {
                    Storage::disk('public')->delete($whyChoose->image);
                }
                $imagePath = $request->file('image')->store('why_choose_us', 'public');
                $whyChoose->image = $imagePath;
            }

            $whyChoose->save();

            return response()->json([
                'success' => true,
                'message' => 'تم تحديث العنصر بنجاح',
                'whyChooseUs' => $whyChoose
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في تحديث العنصر'
            ], 500);
        }
    }


    public function deleteWhyChooseUs($id)
    {
        try {
            $whyChoose = WhyChooseUs::findOrFail($id);

            if ($whyChoose->image) {
                Storage::disk('public')->delete($whyChoose->image);
            }

            $whyChoose->delete();

            return response()->json([
                'success' => true,
                'message' => 'تم حذف العنصر بنجاح'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في حذف العنصر'
            ], 500);
        }
    }

    // ==================== PROJECTS ====================


    public function getProjects()
    {
        try {
            $projects = Project::orderBy('created_at', 'desc')->get();
            return response()->json([
                'success' => true,
                'projects' => $projects
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في جلب المشاريع'
            ], 500);
        }
    }


    public function addProject(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name_ar' => 'required|string',
            'name_en' => 'required|string',
            'name_tr' => 'required|string',
            'description_ar' => 'required',
            'description_en' => 'required',
            'description_tr' => 'required',
            'category_ar' => 'required|string',
            'category_en' => 'required|string',
            'category_tr' => 'required|string',
            'project_url' => 'nullable|url',
            'image' => 'nullable|image'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $project = new Project();
            $project->name_ar = $request->name_ar;
            $project->name_en = $request->name_en;
            $project->name_tr = $request->name_tr;
            $project->description_ar = $request->description_ar;
            $project->description_en = $request->description_en;
            $project->description_tr = $request->description_tr;
            $project->category_ar = $request->category_ar;
            $project->category_en = $request->category_en;
            $project->category_tr = $request->category_tr;
            $project->project_url = $request->project_url;

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('projects', 'public');
                $project->image = $imagePath;
            }

            $project->save();

            return response()->json([
                'success' => true,
                'message' => 'تم إضافة المشروع بنجاح',
                'project' => $project
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في إضافة المشروع'
            ], 500);
        }
    }


    public function updateProject(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name_ar' => 'required|string',
            'name_en' => 'required|string',
            'name_tr' => 'required|string',
            'description_ar' => 'required',
            'description_en' => 'required',
            'description_tr' => 'required',
            'category_ar' => 'required|string',
            'category_en' => 'required|string',
            'category_tr' => 'required|string',
            'project_url' => 'nullable|url',
            'image' => 'nullable|image'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $project = Project::findOrFail($id);
            $project->name_ar = $request->name_ar;
            $project->name_en = $request->name_en;
            $project->name_tr = $request->name_tr;
            $project->description_ar = $request->description_ar;
            $project->description_en = $request->description_en;
            $project->description_tr = $request->description_tr;
            $project->category_ar = $request->category_ar;
            $project->category_en = $request->category_en;
            $project->category_tr = $request->category_tr;
            $project->project_url = $request->project_url;

            if ($request->hasFile('image')) {
                if ($project->image) {
                    Storage::disk('public')->delete($project->image);
                }
                $imagePath = $request->file('image')->store('projects', 'public');
                $project->image = $imagePath;
            }

            $project->save();

            return response()->json([
                'success' => true,
                'message' => 'تم تحديث المشروع بنجاح',
                'project' => $project
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في تحديث المشروع'
            ], 500);
        }
    }


    public function deleteProject($id)
    {
        try {
            $project = Project::findOrFail($id);

            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }

            $project->delete();

            return response()->json([
                'success' => true,
                'message' => 'تم حذف المشروع بنجاح'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في حذف المشروع'
            ], 500);
        }
    }

    // ==================== OUR NUMBERS ====================


    public function getOurNumbers()
    {
        try {
            $ourNumbers = OurNumber::orderBy('created_at', 'desc')->get();
            return response()->json([
                'success' => true,
                'ourNumbers' => $ourNumbers
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في جلب الأرقام'
            ], 500);
        }
    }


    public function addOurNumber(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'number' => 'required|integer',
            'name_ar' => 'required|string',
            'name_en' => 'required|string',
            'name_tr' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $ourNumber = new OurNumber();
            $ourNumber->number = $request->number;
            $ourNumber->name_ar = $request->name_ar;
            $ourNumber->name_en = $request->name_en;
            $ourNumber->name_tr = $request->name_tr;
            $ourNumber->save();

            return response()->json([
                'success' => true,
                'message' => 'تم إضافة الرقم بنجاح',
                'ourNumber' => $ourNumber
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في إضافة الرقم'
            ], 500);
        }
    }


    public function updateOurNumber(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'number' => 'required|integer',
            'name_ar' => 'required|string',
            'name_en' => 'required|string',
            'name_tr' => 'required|string'
        ]);


        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $ourNumber = OurNumber::findOrFail($id);
            $ourNumber->number = $request->number;
            $ourNumber->name_ar = $request->name_ar;
            $ourNumber->name_en = $request->name_en;
            $ourNumber->name_tr = $request->name_tr;
            $ourNumber->save();

            return response()->json([
                'success' => true,
                'message' => 'تم تحديث الرقم بنجاح',
                'ourNumber' => $ourNumber
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في تحديث الرقم'
            ], 500);
        }
    }


    public function deleteOurNumber($id)
    {
        try {
            $ourNumber = OurNumber::findOrFail($id);
            $ourNumber->delete();

            return response()->json([
                'success' => true,
                'message' => 'تم حذف الرقم بنجاح'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في حذف الرقم'
            ], 500);
        }
    }
}
