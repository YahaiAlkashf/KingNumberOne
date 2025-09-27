<?php
// app/Http/Controllers/ContactController.php

namespace App\Http\Controllers;

use App\Models\SocialLink;
use App\Models\ContactInfo;
use App\Models\ContactFaq;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    // Social Links Methods
    public function getSocialLinks()
    {
        $socialLinks = SocialLink::all();

        return response()->json([
            'socialLinks' => $socialLinks
        ]);
    }

    public function saveSocialLink(Request $request, $id = null)
    {
        $validator = Validator::make($request->all(), [
            'platform' => 'required|string',
            'url' => 'required|url',
            'icon' => 'nullable|string',
            'name_ar' => 'nullable|string',
            'name_en' => 'nullable|string',
            'name_tr' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if ($id) {
            $socialLink = SocialLink::findOrFail($id);
            $socialLink->update($request->all());
            $message = 'تم تحديث رابط التواصل بنجاح';
        } else {
            $socialLink = SocialLink::create($request->all());
            $message = 'تم إضافة رابط التواصل بنجاح';
        }

        return response()->json([
            'message' => $message,
            'socialLink' => $socialLink
        ]);
    }

    public function deleteSocialLink($id)
    {
        $socialLink = SocialLink::findOrFail($id);
        $socialLink->delete();

        return response()->json([
            'message' => 'تم حذف رابط التواصل بنجاح'
        ]);
    }

    // Contact Info Methods
    public function getContactInfo()
    {
        $contactInfo = ContactInfo::all();

        return response()->json([
            'contactInfo' => $contactInfo
        ]);
    }

    public function saveContactInfo(Request $request, $id = null)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|in:address,phone,email,hours,location',
            'value_ar' => 'required|string',
            'value_en' => 'required|string',
            'value_tr' => 'required|string',
            'icon' => 'nullable|string',
            'title_ar' => 'nullable|string',
            'title_en' => 'nullable|string',
            'title_tr' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if ($id) {
            $contactInfo = ContactInfo::findOrFail($id);
            $contactInfo->update($request->all());
            $message = 'تم تحديث معلومات الاتصال بنجاح';
        } else {
            $contactInfo = ContactInfo::create($request->all());
            $message = 'تم إضافة معلومات الاتصال بنجاح';
        }

        return response()->json([
            'message' => $message,
            'contactInfo' => $contactInfo
        ]);
    }

    public function deleteContactInfo($id)
    {
        $contactInfo = ContactInfo::findOrFail($id);
        $contactInfo->delete();

        return response()->json([
            'message' => 'تم حذف معلومات الاتصال بنجاح'
        ]);
    }

    // FAQ Methods
    public function getContactFaqs()
    {
        $faqs = ContactFaq::all();

        return response()->json([
            'faqs' => $faqs
        ]);
    }

    public function saveContactFaq(Request $request, $id = null)
    {
        $validator = Validator::make($request->all(), [
            'question_ar' => 'required|string',
            'question_en' => 'nullable|string',
            'question_tr' => 'nullable|string',
            'answer_ar' => 'required|string',
            'answer_en' => 'nullable|string',
            'answer_tr' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if ($id) {
            $faq = ContactFaq::findOrFail($id);
            $faq->update($request->all());
            $message = 'تم تحديث السؤال بنجاح';
        } else {
            $faq = ContactFaq::create($request->all());
            $message = 'تم إضافة السؤال بنجاح';
        }

        return response()->json([
            'message' => $message,
            'faq' => $faq
        ]);
    }

    public function deleteContactFaq($id)
    {
        $faq = ContactFaq::findOrFail($id);
        $faq->delete();

        return response()->json([
            'message' => 'تم حذف السؤال بنجاح'
        ]);
    }

    public function getContactMessages()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();

        return response()->json([
            'messages' => $messages
        ]);
    }

    public function saveContactMessage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'service_type' => 'nullable|string',
            'message' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $message = ContactMessage::create($request->all());

        return response()->json([
            'message' => 'تم إرسال الرسالة بنجاح',
            'contactMessage' => $message
        ]);
    }

    public function deleteContactMessage($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();

        return response()->json([
            'message' => 'تم حذف الرسالة بنجاح'
        ]);
    }

    // Public method for frontend to submit messages
    public function submitContactMessage(Request $request)
    {
        return $this->saveContactMessage($request);
    }
}
