export default {
  USERNAME_REGEX: /^[a-zA-Z0-9\-_.]{6,30}$/,
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@\-_=+.])[a-zA-Z\d@\-_=+.]{8,30}$/
};
