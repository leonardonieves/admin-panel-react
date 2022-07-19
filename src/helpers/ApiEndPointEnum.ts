/* eslint-disable no-unused-vars */

enum ApiEndPointsEnum {
  Signin = '/api/account/login',
  Signup = '/api/account/register',
  RecoveryPassword = '/api/account/recovery-password',
  forgot_password = '/api/account/forgot-password',
  Logout = '/api/account/logout',
  PasswordReset = '/api/account/change-password',
  ProfileUpdate = '/api/account/update-profile',
  GetSports = '/api/sport/list',
  VerifyEmail = 'api/account/validate-email',
  getCompetitions = '/api/competition/list',
  UploadAvatar = 'api/account/upload-avatar',
  RemoveAvatar = 'api/account/remove-avatar',
  VerifyToken = 'api/account/verify-token'
}

export default ApiEndPointsEnum;
