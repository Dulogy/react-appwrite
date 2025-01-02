import configAppwrite from "../config/appwrite";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(configAppwrite.appwriteUrl)
            .setProject(configAppwrite.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,blog_image,status,userId}){
        console.log(userId)
        try {
            return await this.databases.createDocument(
                configAppwrite.appwriteDatabaseId,
                configAppwrite.appwriteCollectionId,
                ID.unique(),
                {
                    title,content,blog_image,status,userId
                }
            )
        } catch (error) {
            console.log(error,"error")
        }
    }

    async updatePost(slug,{title,content,blog_image,status}){
        try {
            return await this.databases.updateDocument(
                configAppwrite.appwriteDatabaseId,
                configAppwrite.appwriteCollectionId,
                slug,
                {
                    title,content,blog_image,status
                }
            )
        } catch (error) {
            console.log(error,"error")
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                configAppwrite.appwriteDatabaseId,
                configAppwrite.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(error,"error")
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                configAppwrite.appwriteDatabaseId,
                configAppwrite.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(error,"error")
        }
    }

    async getPostList(){
        try {
            return await this.databases.listDocuments(
                configAppwrite.appwriteDatabaseId,
                configAppwrite.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ]
            )
        } catch (error) {
            console.log(error,"error")
        }
    }

    async uploadImage(file){
        console.log(file)
        try {
            return await this.bucket.createFile(
                configAppwrite.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error,"error")
            return false
        }
    }

    async deleteImage(fileId){
        try {
            return await this.bucket.deleteFile(
                configAppwrite.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(error,"error")
            return false
        }
    }

    async filePreview(fileId){
        try {
            let result =  this.bucket.getFilePreview(
                configAppwrite.appwriteBucketId,
                fileId,
            )
            console.log(result)
            return result
        } catch (error) {
            console.log(error,"error")
        }
    }
}

const postService = new Service();
export default postService;