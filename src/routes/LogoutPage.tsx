import LogoutImg from '../assets/images/Logout.svg';
import authService from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/slices/authorization';
import userService from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ErrorNotification from '../components/Notifications/error';

export default function LogoutPage() {

  const defaultClass = 'mt-12 bg-orange1 center mx-auto border-none px-[40px] py-[14px] font-semibold rounded w-[150px] h-[47px]';
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const user = userService.getLocalCurrentUser(); 
  const getUserName = ()=>{
    if(user){
      console.log(user.userData.result);
      return user.userData.result.fullName.split(' ').slice(0, 1)
    }
  } 

  function requestLogout() {

    setLoading(true);

    authService.logout().then(
      
      (response) => {
         setLoading(false);
          localStorage.removeItem("user");
          dispatch(logOut(response.data));
          navigate("/", { replace: true });
        
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();         
          setLoading(false);
          
          toast.custom((t)=><ErrorNotification t={t} message={message} />);
      
      }
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="px-8 py-6 mt-4 text-left">
        <div className="flex justify-center">
          <img src={LogoutImg} />
        </div>
        <div className="flex gap-2 font-sharpBold mt-10 mb-10 text-4xl justify-center">
          <p>Goodbye</p>
          <p className="text-[#FD4F0A]">{getUserName()}</p>
        </div>

        <p className="flex flex-row gap-2 mt-5 justify-center justify-items-center">
          We hope to see you again.
        </p>

        <div className="flex flex-row gap-2 justify-center justify-items-center text-white font-[Roboto]">
          <button
            onClick={requestLogout}
            className={loading ? defaultClass + ' btn loading' : defaultClass}              
            disabled={loading}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
