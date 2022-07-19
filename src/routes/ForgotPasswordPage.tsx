import ForgotPassImage from '../assets/images/Forgotpass.svg';
import { useForm } from 'react-hook-form';
import authService from '../services/auth.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessNotification from '../components/Notifications/success';
import toast from 'react-hot-toast';
import ErrorNotification from '../components/Notifications/error';
import { Button } from '@mui/material';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'all',
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUseNativeValidation: false
  });

  const navigate = useNavigate();

  const onSubmit = (event: any) => {
    setLoading(true)
    authService.forgot_password(event?.email).then(
      (response) => {
        console.log(response.status);
        setLoading(false);
        if (response.status === 200) {
          toast.custom((t) => <SuccessNotification t={t} message={'An email was sent to you with the link to reset your password.'} />);
          navigate('/login');
        }
      },
      (error) => {
        setLoading(false);
        let message = error.message;
        if (error.response.data.statusCode === 403 && error.response.data.customStatusCode === 403003) {
          message = 'Verification of your email address is required';
        }
        if (error.response.data.statusCode === 401 && error.response.data.customStatusCode === 401001) {
          message = 'User does not exist in the system'
        }
        if (error.response.data.statusCode === 403 && error.response.data.customStatusCode === 403001) {
          message = 'Your access is blocked because your account is inactive'
        }
        toast.custom((t) => <ErrorNotification t={t} title={'Error'} message={message} />);
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen mx-auto">
      <Button
        onClick={() => { navigate('/login'); }}
      />
      <div className="px-8 py-6 mt-4 text-left">
        <div className="flex justify-center mx-auto w-[198px] h-[186px]">
          <img src={ForgotPassImage} />
        </div>
        <div className="flex gap-2 font-sharpBold mt-[36px] mb-10 text-4xl justify-center">
          <p>Forgot</p>
          <p className="text-[#FD4F0A]">Password?</p>
        </div>

        <p className="text-[16px] w-[400px] leading-[22px] mt-[48px] text-center">
          Please enter your email address and we will email you a link to reset your password
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col justify-items-center mt-5">
            <label className="text-[14px] mt-5 sm:text-left text-center">Email <span className='text-orange1'>*</span></label>
            <input
              className={`mt-[8px] p-3 border border-2 border-gray rounded-[4px] sm:w-full w-[350px] mx-auto h-[40px] ${errors.email ? 'border-[#FD4F0A]' : ''}`}

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
            <p className="text-[#FD4F0A] text-sm mt-1"></p>
            <div className="flex flex-row gap-2 text-[14px] mt-10 justify-center justify-items-center">
              <p>
                Didn’t receive the email? {' '}
                <button className="text-[#FD4F0A]" type='submit' disabled={loading}>
                  Resend
                </button>{' '}
              </p>
            </div>
            <button
              className={`mt-[48px] bg-orange1 w-[150px] h-[47px] flex flex-row items-center mx-auto justify-center gap-[10px] border-none py-[14px] px-[39px] rounded-[4px] text-white font-semibold ${loading ? 'btn loading' : ''}`}
              type="submit"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
