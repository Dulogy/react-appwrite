import configAppwrite from "../config/appwrite";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(configAppwrite.appwriteUrl)
            .setProject(configAppwrite.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email,password}){
        console.log(email,password)
        try {
            let userDetails = await this.account.create(ID.unique(),email,password)
            if(userDetails){
                return this.login({email,password})
            }else{
                return userDetails;
            }
        } catch (error) {
            throw error;
        } 
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("error in user details",error)
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("erroe",error)
        }
    }
}

const authService = new AuthService()

export default authService;