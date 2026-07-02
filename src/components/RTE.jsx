import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';
import conf from '../conf/conf';


export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'> 
    {label && <label className='mb-3 inline-block pl-1 text-sm font-medium text-slate-700'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange, value}}) => (
        <Editor
        apiKey={conf.tinymceApiKey}
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
