import ApiEndPointEnum from "../helpers/ApiEndPointEnum";
import axiosInstance from './api';
import authHeader from "./auth-header";
import { IChangePassword } from "../request/IChangePassword";
import { IProfileUpdate } from "../request/IProfileUpdate";
import { ILoginUser } from "../request/ILoginUser";
class UserService {

    updateProfile(profUpdateRequest:IProfileUpdate){
        return axiosInstance.post(ApiEndPointEnum.ProfileUpdate,profUpdateRequest,{headers: authHeader()});
    }

    uploadAvatar(uploadAvatarRequest: FormData){
        return axiosInstance.post(ApiEndPointEnum.UploadAvatar,uploadAvatarRequest,{headers: authHeader()});
    }
    removeAvatar(userRequest: ILoginUser){
        return axiosInstance.post(ApiEndPointEnum.RemoveAvatar,userRequest,{headers: authHeader()}); 
    }

    changePassword(changePassRequest:IChangePassword)
    {
       return axiosInstance.post(ApiEndPointEnum.PasswordReset,changePassRequest,{headers: authHeader()});
    }

    getLocalCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    }

    setLocalCurrentUser(user:any) {
        localStorage.setItem("user", JSON.stringify(user));  
    }
}

export default new UserService();
