"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'
export default function FormSubmit() {
  const status = useFormStatus()
  if(status.pending)return(
    <>Create post...</>
  )
  return (
    <>
       <button type="reset">Reset</button>
       <button>Create Post</button>
    </>
  )
}
