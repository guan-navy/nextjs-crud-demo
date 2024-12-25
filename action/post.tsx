"use server"
import { redirect } from 'next/navigation';
import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { uploadImage } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

export default async function createPost(prevState:FormData,formData: FormData) {
    "use server";
    const title = formData.get('title') as string;
    const image = formData.get('image') as File;
    const content = formData.get('content') as string;
    // console.log(title, image, content);
    let errors:string[]=[]
    if(!title || title.trim().length===0){
      errors.push('Title is required')
    }
    if(!content||content.trim().length==0){
      errors.push("Content is required")
    }
    if(image.size===0){
      errors.push("Image is required")
    }
    console.log(errors);
    
    if(errors.length>0){
      return {errors}
    }
    // 上传图片
    let imageUrl = ''
    try {
    imageUrl = await uploadImage(image)||''
      
    } catch (error) {
      throw new Error('Failed to upload image, please try again')
    }
    await storePost({
      imageUrl,
      title,
      content,
      userId: 1
    })
    revalidatePath('/','layout')
    redirect('/feed');
  }
export async function togglePostLikeStatus(postId:string){
 await updatePostLikeStatus(postId,2)
 revalidatePath('/feed')  
}
