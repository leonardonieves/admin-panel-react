import { Link, Navigate } from 'react-router-dom';
import EmailVerifiedImage from '../assets/images/EmailVerified.svg';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import authService from '../services/auth.service';
import Spinner from '../components/shared/Spinner';
import ErrorNotification from '../components/Notifications/error';
import toast from 'react-hot-toast';

export default function EmailVerifiedPage() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(true);

  const [emailOK, setEmailOK] = useState(false);
  const [callService,setCallService] = useState(false);

  useEffect(() => {
    if (callService) {
      authService
        .email_verify(token)
        .then(
          (response) => {
            console.log('Responsestatus ' + response.status);
            if (response.status === 200) {
              setEmailOK(true);
            }
          },
          (error) => {
            let message = error.response.data.message;
            if(error.response.data.message.includes('IDX10223')) {
              message = 'The link has expired. We have sent you a new email for validation.'
            } 
            if(error.response.data.message.includes('IDX12729')) {
              message = 'Invalid token'
            }          
            console.log(message)
            toast.custom((t)=><ErrorNotification t={t} title={'Notice!'} message={message} />);
          }
        )
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
    setCallService(true)
  }, [callService]);

  return (
    <>
      {loading ? (
        <Spinner/>
      ) : (
        <>
          {emailOK ? (
            <div className="flex items-center justify-center min-h-screen">
              <div className="px-8 py-6 mt-4 text-left">
                <div className="flex justify-center">
                  <img src={EmailVerifiedImage} />
                </div>
                <div className="flex gap-2 not-italic font-sharp font-bold mt-10 mb-10 text-2xl justify-center text-[#4D4D4D] leading-10">
                  <p>Email</p>
                  <p className="text-[#FD4F0A]">Verified</p>
                </div>

                <p className="flex flex-row gap-2 mt-[32px] justify-center justify-items-center text-[#3A3A3A] font-[Roboto] text-[16px] w-[400px] h-[20px]">
                  Your email address has been successfully verified
                </p>

                <Link
                  className="flex flex-row gap-2 justify-center justify-items-center font-[Roboto] "
                  to="/login">
                  <button className="mt-[72px] font-semibold bg-orange1 not-italic text-base text-white w-[150px] h-[47px] center mx-auto border-none rounded-[4px] gap-2.5 leading-[19px]">
                    Continue
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )}
        </>
      )}
    </>
  );
}
