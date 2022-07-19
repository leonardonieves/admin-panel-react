import { useForm } from 'react-hook-form';
import SignupImage from '../assets/images/Signup.svg';
import authService from '../services/auth.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from '../components/Notifications/error';
import toast from 'react-hot-toast';
import WarningNotification from '../components/Notifications/warning';
import SuccessNotification from '../components/Notifications/success';
import Button from '@mui/material/Button';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setPasswordShown] = useState(false);
  const [confirmPassword, setConfirmPasswordShown] = useState(false);

  const [loading, setLoading] = useState(false);
  const [defaultValue, setDefaultValue] = useState(null);
  const [resetC, setResetC] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    shouldUseNativeValidation: false
  });
  const password = watch('password', '');

  const togglePasswordVisiblity = (value: boolean) => {
    value ? setPasswordShown(!showPassword) : setConfirmPasswordShown(!confirmPassword);
  };

  const [agree, setAgree] = useState(false);

  const checkboxHandler = () => {
    setAgree(!agree);
  };
  const onSubmit = (event: any) => {
    if (!agree) {
      toast.custom((t) => (
        <WarningNotification t={t} message={'Conditions and Privacy Policy field is required'} />
      ));
    } else {
      setResetC(false);
      const { name, email, password, birthday /* phone */ } = event;
      if (!birthday) return;

      setLoading(true);
      authService
        .register({
          fullName: name,
          email: email,
          password: password,
          confirmationPassword: password,
          birthday: new Date(moment(birthday, 'YYYY-MM-DD').format('YYYY-MM-DD')),
          phone: ' ' /* phone */
        })
        .then(
          (response) => {
            console.log(response.status);
            setLoading(false);
            if (response.status === 201) {
              toast.custom((t) => (
                <SuccessNotification
                  t={t}
                  message={
                    'Your user has been successfully created. An email was sent to you to activate your account.'
                  }
                />
              ));
              setDefaultValue(null);
              setResetC(true);
            }
            reset();
          },
          (error) => {
            setLoading(false);
            const message =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(message);
            toast.custom((t) => <ErrorNotification t={t} message={message} />);
          }
        );
    }
  };

  const getDataFromBirthday = (value: string) => {
    setValue('birthday', value);
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row justify-between mx-auto">
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${SignupImage}")`
        }}
        className="lg:flex lg:w-1/2 p-10 w-full bg-no-repeat bg-cover bg-center flex flex-row justify-center mx-auto">
        <div className="flex flex-col justify-items-center my-auto w-full">
          <p className="text-[32px]  text-white font-sharpBold text-center">Welcome Back!!</p>
          <p className="mt-11 text-[20px] w-full lg:w-[450px] h-[64px] font-sharp font-bold leading-8  text-white text-center mx-auto">
            To keep connected with us please login with your personal info
          </p>
          <button
            className="mt-[70px] bg-orange1 w-[150px] h-[47px] flex flex-row items-center mx-auto justify-center gap-[10px] border-none py-[14px] px-[39px] rounded-[4px] text-white"
            onClick={() => navigate('/login')}>
            Sign In
          </button>
        </div>
      </div>

      <div className="w-1/2 flex h-full flex-row justify-center mx-auto">
        <Button
          onClick={() => {
            navigate('/');
          }}
        />
        <div className="flex mt-5 flex-col my-auto lg:w-1/2">
          <div className="flex gap-2 font-sharpBold text-[32px] justify-center">
            <p>Create</p>
            <p className="text-orange1">Account</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col h-full justify-items-center">
              <div className="sm:flex mt-[30px] gap-5">
                <div className="w-full">
                  <label className="text-[14px]">
                    FullName <span className="text-orange1">*</span>
                  </label>
                  <input
                    className={`w-full p-3 mt-2 border-2 h-[40px] border-gray rounded-lg font-size ${
                      errors.name ? 'border-orange1' : ''
                    }`}
                    type="text"
                    {...register('name', {
                      required: { value: true, message: 'The field is required!' }
                    })}
                    autoFocus
                  />
                  <p className="text-orange1 text-sm mt-1"></p>
                </div>
              </div>
              <label className="text-[14px] sm:mt-[20px]">
                Email <span className="text-orange1">*</span>
              </label>
              <input
                className={`w-full mt-2 p-3 border-2 border-gray rounded-lg h-[40px] ${
                  errors.email ? 'border-orange1' : ''
                }`}
                type="email"
                {...register('email', {
                  required: { value: true, message: 'The field is required!' },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email!'
                  }
                })}
              />
              <p className="text-orange1 text-sm mt-1"></p>
              {/* 
              <label className="text-[14px] mt-[20px]">
                Phone <span className="text-orange1">*</span>
              </label>
              <input
                className={`mt-2 p-3 border-2 border-gray rounded-lg h-[40px] ${
                  errors.phone ? 'border-orange1' : ''
                }`}
                type="text"
                {...register('phone', {
                  required: 'The field is required!'
                })}
              />
              <p className="text-orange1 text-sm mt-1">{errors.phone && errors.phone.message}</p>
              
              */}
              <label className="text-[14px] mt-[20px]">
                Password <span className="text-orange1">*</span>
              </label>
              <div className="relative">
                <input
                  className={`mt-2 p-3  w-full border-2 border-gray rounded-lg h-[40px] ${
                    errors.password ? 'border-orange1' : ''
                  }`}
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'The field is required!',
                    validate: (value) =>
                      regexp.password.test(value) ||
                      'The password must have at least 8 characters, one digit, at least one capital letter and at least one non-alphanumeric character.'
                  })}
                />
                <div className="absolute inset-y-0 mt-2 right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? (
                    <VisibilityIcon
                      onClick={() => togglePasswordVisiblity(true)}
                      className="w-5 text-[#A0A0A0]"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => togglePasswordVisiblity(true)}
                      className="w-5 text-[#A0A0A0]"
                    />
                  )}
                </div>
              </div>
              <p className="text-orange1 text-sm mt-1">
                
              </p>
              <label className="text-[14px] mt-[20px]">
                Confirm Password <span className="text-orange1">*</span>
              </label>
              <div className="relative">
                <input
                  className={`mt-2 p-3  w-full border-2 border-gray rounded-lg h-[40px] ${
                    errors.password_repeat ? 'border-orange1' : ''
                  }`}
                  type={confirmPassword ? 'text' : 'password'}
                  {...register('password_repeat', {
                    required: 'The field is required!',
                    validate: (value) => value === password || 'The passwords do not match'
                  })}
                />
                <div className="absolute inset-y-0 mt-2 right-0 pr-3 flex items-center text-sm leading-5">
                  {confirmPassword ? (
                    <VisibilityIcon
                      onClick={() => togglePasswordVisiblity(false)}
                      className="w-5 text-[#A0A0A0]"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => togglePasswordVisiblity(false)}
                      className="w-5 text-[#A0A0A0]"
                    />
                  )}
                </div>
              </div>
              <p className="text-orange1 text-sm mt-1">
                
              </p>
              <label className="text-[14px] font-bold mt-[20px]">
                Date of Birth <span className="text-orange1">*</span>
              </label>
              <div className="mt-[16px]">
                
              </div>
              <p className="text-orange1 text-sm mt-1">
                
              </p>
              <div className="flex flex-row gap-2 mt-[20px] justify-start justify-items-center">
                <input
                  className={`h-7 w-4 ${errors.acceptTerms ? 'border-orange1' : ''}`}
                  type="checkbox"
                  {...register('acceptTerms', {
                    required: 'The field is required!'
                  })}
                  checked={agree}
                  onChange={checkboxHandler}
                  required
                />
                <p>
                  I agree to all the{' '}
                  <a className="text-orange1" href="#">
                    Terms
                  </a>{' '}
                  and{' '}
                  <a className="text-orange1" href="#">
                    Privacy Policy
                  </a>
                </p>
              </div>
              <p className="text-orange1 text-sm mt-1">
                
              </p>
              <button
                className={`mt-[25px] bg-orange1 w-[170px] h-[47px] flex flex-row items-center mx-auto justify-center gap-[10px] border-none py-[14px] px-[39px] rounded-[4px] text-white font-semibold ${
                  loading ? 'btn loading' : ''
                } `}
                type="submit"
                disabled={loading}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const regexp = {
  password: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/
};
