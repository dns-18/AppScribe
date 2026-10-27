import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

// Self-hosted TinyMCE (no Tiny Cloud API key, no approved-domain check).
// Import tinymce first so the global `tinymce` exists for the React wrapper.
import 'tinymce/tinymce';
// DOM model
import 'tinymce/models/dom/model';
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin';
// Content styles, including inline UI like fake cursors
import 'tinymce/skins/content/default/content';
import 'tinymce/skins/ui/oxide/content';
// Import plugins (same set the cloud editor used)
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/image';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/wordcount';
// Include resources that a plugin lazy-loads at run-time
import 'tinymce/plugins/help/js/i18n/keynav/en';


export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'> 
    {label && <label className='mb-3 inline-block pl-1 text-sm font-medium text-slate-700'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange, value}}) => (
        <Editor
        licenseKey='gpl'
        initialValue={defaultValue}
        value={value}
        init={{
          height: 520,
            menubar: true,
            plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
            ],
            toolbar:
            "undo redo | blocks | image media link | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code preview fullscreen | help",
            content_style: "body { font-family:Inter, Arial, sans-serif; font-size:14px; line-height:1.7; color:#0f172a; padding:16px; }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}
