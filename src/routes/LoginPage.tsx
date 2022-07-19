import { useForm } from 'react-hook-form';
import LoginImage from '../assets/images/Login.svg';
import authService from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFail } from '../store/slices/authorization';
import { useLocation, useNavigate } from "react-router-dom";
import userService from '../services/user.service';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ErrorNotification from '../components/Notifications/error';
import { Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showPassword, setPasswordShown] = useState(false);

  const state = JSON.parse(JSON.stringify(location.state || "/"));
  const from = state.from?.pathname || "/";


  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'all',
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUseNativeValidation: false
  });

  const togglePasswordVisiblity = () => {
    setPasswordShown(!showPassword);
  };

  const onSubmit = (event: any) => {

    setLoading(true);

    const { email, password } = event;

    authService.login({ email: email, password: password }).then(
      (response) => {
        setLoading(false);
        if (response.status === 200) {
          const auth = response.headers;
          const user = { userData: response.data, auth: auth }
          userService.setLocalCurrentUser(user);
          dispatch(loginSuccess(user));
          navigate(from, { replace: true });
        }
        else { dispatch(loginFail(response.data)); }
      },
      (error) => {
        let message = error.message;
        if (error.response.data.statusCode === 403 && error.response.data.customStatusCode === 403003) {
          message = 'Verification of your email address is required';
        }
        if (error.response.data.statusCode === 401 && error.response.data.customStatusCode === 401001) {
          message = 'Password Incorrect or User does not exist in the system'
        }
        if (error.response.data.statusCode === 403 && error.response.data.customStatusCode === 403001) {
          message = 'Your access is blocked because your account is inactive'
        }
        
        setLoading(false);
        dispatch(loginFail(message));
        toast.custom((t) => <ErrorNotification t={t} title={'Error'} message={message} />);
      }
    );
  };

  return (
    <div className="w-full h-full lg:h-screen flex flex-col-reverse lg:flex-row justify-between mx-auto">

      <div className="flex-none w-full lg:w-1/2 h-screen flex flex-row justify-center mx-auto">
        <Button
          onClick={() => { navigate('/'); }}
        />
        <div className="flex flex-col mt-5 lg:my-auto lg:w-1/2">
          <div className="flex gap-2 h-[46px] font-sharpBold font-black text-[32px] justify-center">
            <p className="text-[#4D4D4D]">Sign</p>
            <p className="text-[#FD4F0A]">In</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col justify-items-center mt-16">
              <label className="text-[14px] mt-5">Email <span className='text-orange1'>*</span></label>
              <input
                className={`mt-2 w-full p-3 border-2 border-gray rounded-[4px] h-[40px] ${errors.email ? 'border-orange1' : ''}`}
                type="email"
                {...register('email', {
                  required: { value: true, message: 'The field is required!' },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email!'
                  }
                })}
                autoFocus
                disabled={loading}
              />
              <p className="text-orange1 text-sm mt-1"></p>
              <label className="text-[14px] mt-5">Password <span className='text-orange1'>*</span></label>
              <div className="relative">
                <input
                  className={`mt-2 w-full p-3 border-2 border-gray rounded-[4px] h-[40px] ${errors.password ? 'border-orange1' : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'You must specify a password',
                  })}
                  disabled={loading}
                />
                <div className="absolute inset-y-0 mt-2 right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? (
                    <Visibility onClick={togglePasswordVisiblity} className="w-5 text-[#A0A0A0]" />
                  ) : (
                    <VisibilityOff onClick={togglePasswordVisiblity} className="w-5 text-[#A0A0A0]" />
                  )}
                </div>
              </div>
              <p className="text-orange1 text-sm mt-1"></p>
              <div className="flex flex-row gap-2 mt-[32px] justify-between text-[14px] justify-items-center">
                <div className="flex gap-2">
                  <input className="h-7 w-4 justify-items-center" type="checkbox" disabled={loading} />
                  <p className='mt-[2px]'>Remember me</p>
                </div>
                <button type="button" className="text-orange1 underline" onClick={() => navigate('/forgotpassw')}
                  disabled={loading}
                >
                  Forgot your password?
                </button>
              </div>
              <button
                className={`mt-[70px] bg-orange1 w-[155px] h-[47px] border-none py-[14px] px-[39px] rounded-[4px] text-white font-semibold mx-auto text-center justify-center ${loading ? 'btn loading' : ''}`}
                type="submit"
                disabled={loading}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${LoginImage}")`
        }}
        className="w-full p-10 lg:w-1/2 bg-no-repeat bg-cover bg-center flex flex-row justify-center mx-auto"
      >
        <div className="flex flex-col justify-items-center my-auto">
          <p className="text-[32px] font-bold text-white font-sharpBold text-center">Hello, Friend!</p>
          <p className="mt-[64px] w-full lg:w-[370px] h-[64px] text-[20px] font-sharp font-bold leading-[32px] text-white text-center">
            Enter your personal details and start journey with us
          </p>
          <button className="mt-[64px] bg-orange1 w-[160px] h-[47px] flex flex-row items-center mx-auto justify-center gap-[10px] border-none py-[14px] px-[39px] rounded-[4px] text-white font-semibold" onClick={() => navigate('/signup')}>
            Sign Up
          </button>

        </div>
      </div>
    </div>
  );
}
