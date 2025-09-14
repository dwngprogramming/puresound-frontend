// Schema validation with updated rules
import regex from "@/const/regex";
import * as yup from 'yup';
import {CalendarDate, getLocalTimeZone, today} from "@internationalized/date";

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

export const createRegisterSchema = (t: any) => {
  return yup.object({
    username: yup
      .string()
      .required(t('usernameRequired'))
      .test('username-format', t('usernameFormat'), function (value) {
        if (!value) return false;
        return regex.USERNAME_REGEX.test(value);
      }),
    email: yup
      .string()
      .required(t('emailRequired'))
      .test('email-format', t('emailFormat'), function (value) {
        if (!value) return false;
        return regex.EMAIL_REGEX.test(value);
      }),
    password: yup
      .string()
      .required(t('passwordRequired'))
      .test('password-strength', t('passwordFormat'), function (value) {
        if (!value) return false;
        return regex.PASSWORD_REGEX.test(value);
      }),
    retypePassword: yup
      .string()
      .required(t('passwordRetypeRequired'))
      .test('password-match', t('passwordRetypeNotMatch'), function (value) {
        if (!value) return false;
        return this.parent.password === value;
      }),
    firstname: yup
      .string()
      .required(t('firstnameRequired')),
    lastname: yup
      .string()
      .required(t('lastnameRequired')),
    gender: yup
      .string()
      .required(t('genderRequired')),
    dob: yup
      // Using with HeroUI DatePicker and type CalendarDate
      .mixed<CalendarDate>()
      .required(t('dobRequired'))
      .test('is-valid-date', t('dobRequired'), () => {
        // Kiểm tra có phải CalendarDate hợp lệ không (Mặc định là truyền vào một CalendarDate)
        return true;
      })
      .test('max-date', t('dobPast'), (value) => {
        if (!value) return true;

        const todayDate = today(getLocalTimeZone());
        return value.compare(todayDate) <= 0;
      })
  });
}
