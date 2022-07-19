export default function authHeader() {
  const userStr = localStorage.getItem('user');
  let user = null;
  if (userStr) user = JSON.parse(userStr);
   if (user && user.auth.authorization) {
    return { Authorization: user.auth.authorization  };
  } else {
    return { Authorization: '' };
  }
}
