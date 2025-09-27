<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use App\Models\OurJourney;
use App\Models\OurValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AboutController extends Controller
{

    // About Us Methods
    public function getAboutUs()
    {
        $aboutUs = AboutUs::first();
        return response()->json([
            'aboutUs' => $aboutUs
        ]);
    }

    public function saveAboutUs(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'our_story_ar' => 'nullable|string',
            'our_story_en' => 'nullable|string',
            'our_story_tr' => 'nullable|string',
            'our_vision_ar' => 'nullable|string',
            'our_vision_en' => 'nullable|string',
            'our_vision_tr' => 'nullable|string',
            'our_mission_ar' => 'nullable|string',
            'our_mission_en' => 'nullable|string',
            'our_mission_tr' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $aboutUs = AboutUs::firstOrNew([]);
        $aboutUs->fill($request->all());
        $aboutUs->save();

        return response()->json(['message' => 'تم حفظ البيانات بنجاح']);
    }

    // Our Values Methods
    public function getOurValues()
    {
        $ourValues = OurValue::all();
        return response()->json([
            'ourValues' => $ourValues
        ]);
    }

    public function saveOurValue(Request $request, $id = null)
    {
        $validator = Validator::make($request->all(), [
            'name_ar' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'name_tr' => 'required|string|max:255',
            'description_ar' => 'nullable|string',
            'description_en' => 'nullable|string',
            'description_tr' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($id) {
            $value = OurValue::findOrFail($id);
            $value->update($request->all());
            $message = 'تم تحديث القيمة بنجاح';
        } else {
            OurValue::create($request->all());
            $message = 'تم إضافة القيمة بنجاح';
        }

        return response()->json(['message' => $message]);
    }

    public function deleteOurValue($id)
    {
        $value = OurValue::findOrFail($id);
        $value->delete();

        return response()->json(['message' => 'تم حذف القيمة بنجاح']);
    }

    // Our Journey Methods
    public function getOurJourney()
    {
        $ourJourney = OurJourney::orderBy('year', 'asc')->get();
        return response()->json([
            'ourJourney' => $ourJourney
        ]);
    }

    public function saveOurJourney(Request $request, $id = null)
    {
        $validator = Validator::make($request->all(), [
            'year' => 'required|integer',
            'name_ar' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'name_tr' => 'required|string|max:255',
            'description_ar' => 'nullable|string',
            'description_en' => 'nullable|string',
            'description_tr' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($id) {
            $journey = OurJourney::findOrFail($id);
            $journey->update($request->all());
            $message = 'تم تحديث المرحلة بنجاح';
        } else {
            OurJourney::create($request->all());
            $message = 'تم إضافة المرحلة بنجاح';
        }

        return response()->json(['message' => $message]);
    }

    public function deleteOurJourney($id)
    {
        $journey = OurJourney::findOrFail($id);
        $journey->delete();

        return response()->json(['message' => 'تم حذف المرحلة بنجاح']);
    }

}
