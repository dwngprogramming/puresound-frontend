// Schema validation with updated rules
import regex from "@/const/regex";
import * as yup from 'yup';

export const createLoginSchema = (t: any) => {
  return yup.object({
    usernameOrEmail: yup
      .string()
      .required(t('uoeRequired'))
      .test('username-or-email-format', t('uoeFormat'), function (value) {
        if (!value) return false;

        // If it contains @, validate as email
        if (value.includes('@')) {
          if (!regex.EMAIL_REGEX.test(value)) {
            return this.createError({
              message: t('emailFormat')
            });
          }
          return true;
        } else {
          // Validate as username
          if (!regex.USERNAME_REGEX.test(value)) {
            return this.createError({
              message: t('usernameFormat')
            });
          }
          return true;
        }
      }),
    password: yup
      .string()
      .required(t('passwordRequired'))
      .test('password-strength', t('passwordFormat'), function (value) {
        if (!value) return false;
        return regex.PASSWORD_REGEX.test(value);
      }),
  });
}
