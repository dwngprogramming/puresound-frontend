"use client";

import {useTranslations} from "next-intl";
import Image from "next/image";
import {Button, Divider, Form, Input} from "@heroui/react";
import React, {useMemo, useState} from "react";
import {useBreakpoint} from "@/hooks/useBreakpoint";
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginFormData} from "@/types/auth.types";
import {createLoginSchema} from "@/libs/validation/auth.validation";
import {LoginRequest} from "@/models/auth/LoginRequest";
import authApi from "@/apis/auth/auth.api";
import {useMutation} from "@tanstack/react-query";
import { useAppDispatch } from "@/libs/redux/hooks";
import {setCredentials} from "@/libs/redux/features/auth/authSlice";
import {TokenResponse} from "@/models/auth/TokenResponse";
import {ApiResponse} from "@/models/ApiResponse";
import {CustomJwtPayload} from "@/models/auth/CustomJwtPayload";
import {jwtDecode} from "jwt-decode";
import {UserPrincipal} from "@/models/auth/UserPrincipal";

export const Login = () => {
  const t = useTranslations("Login");
  const [isVisible, setIsVisible] = useState(false);
  const [loginError, setLoginError] = useState<string>('');
  const {breakpoint, mounted} = useBreakpoint();
  const dispatch = useAppDispatch();
  const tValidation = useTranslations("Login.validation");
  // Yub schema for validation
  const loginSchema = useMemo(() => createLoginSchema(tValidation), [tValidation]);

  const loginMutation = useMutation({
    mutationFn: async (request: LoginRequest) => {
      return await authApi.login(request);
    },
    onSuccess: (response: ApiResponse<TokenResponse>) => {
      const accessToken = response.data.accessToken;
      const payload: CustomJwtPayload = jwtDecode(accessToken);
      const user: UserPrincipal = {
        id: payload.sub,
        fullname: payload.fullname,
        userType: payload.userType,
        authorities: payload.authorities,
      };

      dispatch(setCredentials({
        user: user,
        token: accessToken
      }));

      const refreshToken = response.data.refreshToken;
      localStorage.setItem('rt', refreshToken);

      console.log('Login successful:', response);
    },
  })

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });

  const handleVisiblePw = () => {
    setIsVisible(!isVisible);
  };

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('');

    const loginRequest: LoginRequest = {
      usernameOrEmail: data.usernameOrEmail,
      password: data.password,
    };

    loginMutation.mutate(loginRequest);
  };

  // Social login handlers (console.log only)
  const handleGoogleLogin = () => {
    console.log('=== GOOGLE LOGIN ===');
    console.log('Would redirect to: /api/auth/google');
    console.log('Or open Google OAuth popup');
    console.log('=== END GOOGLE LOGIN ===');
  };

  const handleFacebookLogin = () => {
    console.log('=== FACEBOOK LOGIN ===');
    console.log('Would redirect to: /api/auth/facebook');
    console.log('Or open Facebook OAuth popup');
    console.log('=== END FACEBOOK LOGIN ===');
  };

  return (
    <div
      className="flex justify-center items-center bg-gray-900 sm:p-8 sm:bg-gradient-to-t from-black to-blue-950 min-h-screen">
      {mounted ? (
        <div
          className="w-full flex flex-col justify-center items-center gap-2 md:max-w-[768px] mx-auto px-6 py-12 sm:p-8 sm:bg-gray-900 sm:rounded-xl">
          <>
            <Image src="/puresound-logo.svg" alt="logo" width={100} height={100}/>
            <div className="mb-6">
              <h1
                className={`text-white ${breakpoint === 'base' ? 'text-2xl' : 'text-3xl'} font-bold inline`}>{t('title')}</h1>
              <h1
                className={`text-blue-300 ${breakpoint === 'base' ? 'text-2xl' : 'text-3xl'} font-bold inline`}> Pure</h1>
              <h1
                className={`text-gray-400 ${breakpoint === 'base' ? 'text-2xl' : 'text-3xl'} font-bold inline`}>Sound</h1>
            </div>

            {/* Social Login Buttons */
            }
            <div className="flex flex-col gap-3">
              <Button
                variant="bordered"
                size={breakpoint === 'base' ? 'md' : 'lg'}
                onPress={handleGoogleLogin}
                disabled={isSubmitting}
                className="text-white py-4 px-8 md:px-10 rounded-full justify-center items-center font-bold hover:text-white border-gray-600
                hover:border-white [&[data-hover=true]]:opacity-100 disabled:opacity-50">
                <svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path fill="#4285F4"
                        d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"/>
                  <path fill="#34A853"
                        d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"/>
                  <path fill="#FBBC04"
                        d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"/>
                  <path fill="#EA4335"
                        d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"/>
                </svg>
                <span>{t('google')}</span>
              </Button>
              <Button
                variant="bordered"
                size={breakpoint === 'base' ? 'md' : 'lg'}
                onPress={handleFacebookLogin}
                disabled={isSubmitting}
                className="text-white py-4 md:px-10 rounded-full justify-center items-center font-bold hover:text-white border-gray-600
                hover:border-white [&[data-hover=true]]:opacity-100 disabled:opacity-50">
                <svg width="28px" height="28px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path fill="#1877F2"
                        d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"/>
                  <path fill="#ffffff"
                        d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"/>
                </svg>
                <span className="md:text-normal">{t('facebook')}</span>
              </Button>
            </div>

            <Divider className="my-8 divider bg-gray-600"/>

            {/* General Error Message */
            }
            {
              loginError && (
                <div className="w-full max-w-md bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                  <p className="text-red-400 text-sm text-center">{loginError}</p>
                </div>
              )
            }

            {/* Login Form with React Hook Form */
            }
            <Form className="mx-auto gap-4" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="usernameOrEmail"
                control={control}
                render={({field}) => (
                  <Input
                    {...field}
                    type="text"
                    size={breakpoint === 'base' ? 'md' : 'lg'}
                    label={t('usernameOrEmail')}
                    labelPlacement="outside-top"
                    classNames={{
                      label: 'text-white text-[.8rem] sm:text-[.9rem] font-bold',
                      input: 'auth-input',
                      errorMessage: 'text-base mt-2 font-[.9rem] auth-input'
                    }}
                    placeholder={t('placeholderUOE')}
                    isInvalid={!!errors.usernameOrEmail}
                    errorMessage={errors.usernameOrEmail?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({field}) => (
                  <Input
                    {...field}
                    type={isVisible ? 'text' : 'password'}
                    size={breakpoint === 'base' ? 'md' : 'lg'}
                    label={t('password')}
                    labelPlacement="outside-top"
                    classNames={{
                      label: 'text-white text-[.8rem] sm:text-[.9rem] font-bold',
                      input: 'auth-input',
                      errorMessage: 'text-base mt-2 font-[.9rem] auth-input' // Lớn hơn mặc định
                    }}
                    placeholder={t('placeholderPassword')}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    endContent={
                      <button
                        type="button"
                        onClick={handleVisiblePw}
                        className="text-gray-400 hover:text-blue-400 transition-colors focus:cursor-pointer"
                      >
                        {
                          isVisible ? (
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd"
                                    d="M22.2954 6.31083C22.6761 6.474 22.8524 6.91491 22.6893 7.29563L21.9999 7.00019C22.6893 7.29563 22.6894 7.29546 22.6893 7.29563L22.6886 7.29731L22.6875 7.2998L22.6843 7.30716L22.6736 7.33123C22.6646 7.35137 22.6518 7.37958 22.6352 7.41527C22.6019 7.48662 22.5533 7.58794 22.4888 7.71435C22.3599 7.967 22.1675 8.32087 21.9084 8.73666C21.4828 9.4197 20.8724 10.2778 20.0619 11.1304L21.0303 12.0987C21.3231 12.3916 21.3231 12.8665 21.0303 13.1594C20.7374 13.4523 20.2625 13.4523 19.9696 13.1594L18.969 12.1588C18.3093 12.7115 17.5528 13.2302 16.695 13.6564L17.6286 15.0912C17.8545 15.4383 17.7562 15.9029 17.409 16.1288C17.0618 16.3547 16.5972 16.2564 16.3713 15.9092L15.2821 14.2353C14.5028 14.4898 13.659 14.6628 12.7499 14.7248V16.5002C12.7499 16.9144 12.4141 17.2502 11.9999 17.2502C11.5857 17.2502 11.2499 16.9144 11.2499 16.5002V14.7248C10.3689 14.6647 9.54909 14.5004 8.78982 14.2586L7.71575 15.9093C7.48984 16.2565 7.02526 16.3548 6.67807 16.1289C6.33089 15.903 6.23257 15.4384 6.45847 15.0912L7.37089 13.689C6.5065 13.2668 5.74381 12.7504 5.07842 12.1984L4.11744 13.1594C3.82455 13.4523 3.34968 13.4523 3.05678 13.1594C2.76389 12.8665 2.76389 12.3917 3.05678 12.0988L3.98055 11.175C3.15599 10.3153 2.53525 9.44675 2.10277 8.75486C1.83984 8.33423 1.6446 7.97584 1.51388 7.71988C1.44848 7.59182 1.3991 7.48914 1.36537 7.41683C1.3485 7.38067 1.33553 7.35207 1.32641 7.33167L1.31562 7.30729L1.31238 7.29984L1.31129 7.29733L1.31088 7.29638C1.31081 7.2962 1.31056 7.29563 1.99992 7.00019L1.31088 7.29638C1.14772 6.91565 1.32376 6.474 1.70448 6.31083C2.08489 6.1478 2.52539 6.32374 2.68888 6.70381C2.68882 6.70368 2.68894 6.70394 2.68888 6.70381L2.68983 6.706L2.69591 6.71972C2.7018 6.73291 2.7114 6.7541 2.72472 6.78267C2.75139 6.83983 2.79296 6.92644 2.84976 7.03767C2.96345 7.26029 3.13762 7.58046 3.37472 7.95979C3.85033 8.72067 4.57157 9.70728 5.55561 10.6218C6.42151 11.4265 7.48259 12.1678 8.75165 12.656C9.70614 13.0232 10.7854 13.2502 11.9999 13.2502C13.2416 13.2502 14.342 13.013 15.3124 12.631C16.5738 12.1345 17.6277 11.3884 18.4866 10.5822C19.4562 9.67216 20.1668 8.69535 20.6354 7.9434C20.869 7.5685 21.0405 7.25246 21.1525 7.03286C21.2085 6.92315 21.2494 6.83776 21.2757 6.78144C21.2888 6.75328 21.2983 6.73242 21.3041 6.71943L21.31 6.70595L21.3106 6.70475C21.3105 6.70485 21.3106 6.70466 21.3106 6.70475M22.2954 6.31083C21.9147 6.14771 21.4738 6.32423 21.3106 6.70475L22.2954 6.31083ZM2.68888 6.70381C2.68882 6.70368 2.68894 6.70394 2.68888 6.70381V6.70381Z"
                                    fill="currentColor"/>
                            </svg>
                          ) : (
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd"
                                    d="M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                                    fill="currentColor"/>
                              <path fillRule="evenodd" clipRule="evenodd"
                                    d="M12 3.25C7.48587 3.25 4.44529 5.9542 2.68057 8.24686L2.64874 8.2882C2.24964 8.80653 1.88206 9.28392 1.63269 9.8484C1.36564 10.4529 1.25 11.1117 1.25 12C1.25 12.8883 1.36564 13.5471 1.63269 14.1516C1.88206 14.7161 2.24964 15.1935 2.64875 15.7118L2.68057 15.7531C4.44529 18.0458 7.48587 20.75 12 20.75C16.5141 20.75 19.5547 18.0458 21.3194 15.7531L21.3512 15.7118C21.7504 15.1935 22.1179 14.7161 22.3673 14.1516C22.6344 13.5471 22.75 12.8883 22.75 12C22.75 11.1117 22.6344 10.4529 22.3673 9.8484C22.1179 9.28391 21.7504 8.80652 21.3512 8.28818L21.3194 8.24686C19.5547 5.9542 16.5141 3.25 12 3.25ZM3.86922 9.1618C5.49864 7.04492 8.15036 4.75 12 4.75C15.8496 4.75 18.5014 7.04492 20.1308 9.1618C20.5694 9.73159 20.8263 10.0721 20.9952 10.4545C21.1532 10.812 21.25 11.2489 21.25 12C21.25 12.7511 21.1532 13.188 20.9952 13.5455C20.8263 13.9279 20.5694 14.2684 20.1308 14.8382C18.5014 16.9551 15.8496 19.25 12 19.25C8.15036 19.25 5.49864 16.9551 3.86922 14.8382C3.43064 14.2684 3.17374 13.9279 3.00476 13.5455C2.84684 13.188 2.75 12.7511 2.75 12C2.75 11.2489 2.84684 10.812 3.00476 10.4545C3.17374 10.0721 3.43063 9.73159 3.86922 9.1618Z"
                                    fill="currentColor"/>
                            </svg>
                          )
                        }
                      </button>
                    }
                  />
                )}
              />

              <Button
                type="submit"
                size={breakpoint === 'base' ? 'md' : 'lg'}
                disabled={isSubmitting}
                className="w-full mt-2 bg-blue-400 hover:bg-blue-500 text-white py-4 md:px-10 rounded-full justify-center items-center font-bold hover:text-white border-gray-600
                hover:border-white [&[data-hover=true]]:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('processing') : t('submit')}
              </Button>
            </Form>
          </>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};
