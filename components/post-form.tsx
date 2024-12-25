"use client"
import React from 'react'
import FormSubmit from './form-submit';
import {useFormState}from 'react-dom'
import { formState } from '@/app/types/formType';

export default function PostForm({action}) {
  // 获取到表单的状态
  const [state,formAction]=useFormState<formState>(action, { errors: [] })
  
    return (
        <>
          <h1>Create a new post</h1>
          <form action={formAction}>
            <p className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" />
            </p>
            <p className="form-control">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="image"
                name="image"
              />
            </p>
            <p className="form-control">
              <label htmlFor="content">Content</label>
              <textarea id="content" name="content" rows={5} />
            </p>
            <p className="form-actions">
             <FormSubmit />
            </p>
            {state.errors.length > 0 && (
                <ul className='form-errors'>
                  {state.errors.map((error: string) => (
                    <li key={error} className='form-error'>{error}</li>
                  ))}
                </ul>
            )}
            
          </form>
          
        </>
      );
}
