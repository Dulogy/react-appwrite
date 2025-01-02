import React,{useCallback,useState} from 'react'
import { useForm } from 'react-hook-form'
import { Button,Input,Select,RTE} from '../index.js';
import postService from "../../appwrite/postService.js";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({post}) {
    const[imageSrc,setImageSrc]=useState("");
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues : {
            title : post?.title || "",
            slug : post?.slug || "-",
            content : post?.content || "",
            status : post?.status || "active",
        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => {
        console.log(state.auth)
        return state.auth.userData
    })
    console.log(userData);

    const submit = async(data) => {
        console.log(userData,userData.$id)
        if(post){
           const file =  data.image[0] ? await postService.uploadImage(data.image[0]) : null;
           if(file){
            postService.deleteImage(post.blog_image)
           }
           const postDetails = await postService.updatePost(post.$id,{
            ...data,
            blog_image : file ? file.$id : undefined
            })

            if(postDetails){
                navigate(`/post/${postDetails.$id}`)
            }
        }else{
            console.log(data)
            const file = data.image[0] ? await postService.uploadImage(data.image[0]) : '';
            const postData = await postService.createPost({
                ...data,
                userId : userData.$id,
                blog_image : file ? file.$id  : ''
            })
            if(postData){
                navigate(`/post/${postData.$id}`)
            }
        }
    }
    const slugTransform = useCallback((value)=>{
        if(value){
            return value.trim().toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g,'-')
            .replace(/\s/g,'-')
        }else{
            return "-"
        }
    },[])

    React.useEffect(() => {
        console.log(post)
        if(post){
            postService.filePreview(post.blog_image)
            .then((res)=>{
                setImageSrc(res)
            })
        }
        const subscription = watch((value,{name}) => {
            if(name == 'title'){
                setValue('slug',slugTransform(value.title),
                    {shouldValidate : true}
                )
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    },[watch,slugTransform,setValue])
    
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={imageSrc}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
    )
}

export default PostForm