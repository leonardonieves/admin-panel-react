import axiosInstance from './api';
import ApiEndPointEnum from '../helpers/ApiEndPointEnum';
import { IRegisterUser } from '../request/IRegisterUser';
import { ILoginUser } from '../request/ILoginUser';
import authHeader from './auth-header';
import { IRecoveryPassword } from '../request/IRecoveryPassword';

class AuthService {

  login(user: ILoginUser) {return axiosInstance.post(ApiEndPointEnum.Signin, user);}

  logout() {return axiosInstance.post(ApiEndPointEnum.Logout, null , { headers: authHeader() } );}

  register(user: IRegisterUser) {return axiosInstance.post(ApiEndPointEnum.Signup, user);}

  recovery_password(data: IRecoveryPassword, token:string) {return axiosInstance.post(ApiEndPointEnum.RecoveryPassword+token, data);}

  verify_token(token:string) {return axiosInstance.get(ApiEndPointEnum.VerifyToken+token);}

  forgot_password(email: string) {return axiosInstance.post(`${ApiEndPointEnum.forgot_password}?email=${email}`);}
  
  email_verify(token:string|null){ return axiosInstance.get(`${ApiEndPointEnum.VerifyEmail}?token=${token}`);}
}

export default new AuthService();
