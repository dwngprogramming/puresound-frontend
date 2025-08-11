const baseApiUrl = process.env.NEXT_PUBLIC_BASE_URL;  // Original base URL, not contains "/api"

// Social login handlers
export const handleGoogleLogin = (locale: string) => {
  localStorage.setItem('locale', locale);
  window.location.href = `${baseApiUrl}/oauth2/authorize/google?user_type=listener`;
};

export const handleFacebookLogin = (locale: string) => {
  localStorage.setItem('locale', locale);
  window.location.href = `${baseApiUrl}/oauth2/authorize/facebook?user_type=listener`;
};
