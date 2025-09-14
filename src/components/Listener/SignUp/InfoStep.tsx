import {useLocale} from "next-intl";
import React, {useCallback, useEffect, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {SignUpData} from "@/types/auth.types";
import {DatePicker, Input, Select, SelectItem, Spinner} from "@heroui/react";
import ErrorMessageCustom from "@/components/Utility/ErrorMessageCustom";
import {Gender} from "@/const/user/Gender";
import {Check, Mars, Users, Venus, X} from "lucide-react";
import {I18nProvider} from "@react-aria/i18n";
import {debounce} from "lodash";
import {useQuery} from "@tanstack/react-query";
import authApi from "@/apis/auth/auth.api";
import {CheckExistsRequest} from "@/models/auth/CheckExistsRequest";

interface InfoStepProps {
  t: any,
  breakpoint: any,
}

const InfoStep = ({t, breakpoint}: InfoStepProps) => {
  const [visible, setVisible] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid' | 'exists'>('idle');
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false); // ✅ Thêm state này

  const {
    control,
    formState: {errors, isSubmitSuccessful}, // ✅ Thêm isSubmitSuccessful
    watch,
    setValue,
    trigger
  } = useFormContext<SignUpData>();

  const locale = useLocale();
  const [debouncedUsername, setDebouncedUsername] = useState('');
  const username = watch('username');

  const debouncedSetUsername = useCallback(
    debounce((value: string) => {
      if (isRegistrationComplete) return; // ✅ Không debounce nếu đã đăng ký thành công

      setDebouncedUsername(value);
      if (value) {
        setUsernameStatus('checking');
      } else {
        setUsernameStatus('idle');
      }
    }, 500),
    [isRegistrationComplete]
  );

  const {data: response} = useQuery({
    queryKey: ['checkUsername', debouncedUsername],
    queryFn: async () => {
      if (!debouncedUsername || debouncedUsername.length < 6 || debouncedUsername.length > 30) {
        setUsernameStatus('invalid');
        await trigger('username');
        return null;
      }

      const request: CheckExistsRequest = {field: debouncedUsername};
      const response = await authApi.checkUsername(request);

      if (response.data.exists) {
        setUsernameStatus('exists');
      } else {
        setUsernameStatus('valid');
      }

      return response;
    },
    retry: false,
    enabled: !!debouncedUsername && !isRegistrationComplete && !isSubmitSuccessful // ✅ Disable khi đăng ký thành công
  });

  // ✅ Theo dõi trạng thái đăng ký thành công
  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsRegistrationComplete(true);
      setUsernameStatus('valid'); // Set về valid để hiển thị check mark
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    if (username !== undefined && !isRegistrationComplete) {
      debouncedSetUsername(username);
    }
    return () => {
      debouncedSetUsername.cancel();
    };
  }, [username, debouncedSetUsername, isRegistrationComplete]);

  // Logic hiển thị icon cực đơn giản
  const renderEndContent = () => {
    switch (usernameStatus) {
      case 'checking':
        return <Spinner size="sm"/>;
      case 'valid':
        return <Check className="text-green-500"/>;
      case 'invalid':
      case 'exists':
        return (
          <X
            className="text-red-500 cursor-pointer"
            onClick={() => {
              setValue('username', '');
              setUsernameStatus('idle');
            }}
          />
        );
      default:
        return null;
    }
  };

  const genderIcons = [
    {
      gender: Gender.MALE,
      content: {
        icon: <Mars className="text-blue-500" size={16}/>,
        label: t('genderChoice.male')
      },
    },
    {
      gender: Gender.FEMALE,
      content: {
        icon: <Venus className="text-pink-500" size={16}/>,
        label: t('genderChoice.female')
      },
    },
    {
      gender: Gender.OTHER,
      content: {
        icon: <Users className="text-purple-500" size={16}/>,
        label: t('genderChoice.other')
      },
    }
  ];

  const getGenderIcon = () => {
    const gender = watch('gender');
    const genderIcon = genderIcons.find((item) => item.gender === gender);
    return genderIcon?.content.icon;
  }

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10) // Delay nhỏ để trigger transition
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className={`w-full mb-2 flex flex-col gap-4 p-1 overflow-hidden transition-all duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}>
      <Controller
        name="username"
        control={control}
        render={({field}) => (
          <div
            className="w-full"
          >
            <Input
              {...field}
              name="username"
              type="text"
              size={breakpoint === 'base' ? 'md' : 'lg'}
              label={t('username')}
              labelPlacement="outside-top"
              classNames={{
                label: 'text-darkmode text-sm font-bold',
                input: 'w-full',
                errorMessage: 'text-base mt-2 text-sm w-full'
              }}
              placeholder={t('placeholderUsername')}
              endContent={renderEndContent()}
              isInvalid={!!errors.username || response?.data.exists}
              errorMessage={errors.username?.message}
            />

            {response?.data.exists &&
              <ErrorMessageCustom message={t('validation.usernameExists')}/>
            }
          </div>
        )}
      />
      <div className="grid grid-cols-2 gap-4 p-1">
        <Controller
          name="firstname"
          control={control}
          render={({field}) => (
            <div
              className="w-full"
            >
              <Input
                {...field}
                name="firstname"
                type="text"
                size={breakpoint === 'base' ? 'md' : 'lg'}
                label={t('firstname')}
                labelPlacement="outside-top"
                classNames={{
                  label: 'text-darkmode text-sm font-bold',
                  input: 'w-full',
                  errorMessage: 'text-base mt-2 text-sm w-full'
                }}
                placeholder={t('placeholderFirstname')}
                isInvalid={!!errors.firstname}
                errorMessage={errors.firstname?.message}
              />
            </div>
          )}
        />

        <Controller
          name="lastname"
          control={control}
          render={({field}) => (
            <div
              className="w-full"
            >
              <Input
                {...field}
                name="lastname"
                type="text"
                size={breakpoint === 'base' ? 'md' : 'lg'}
                label={t('lastname')}
                labelPlacement="outside-top"
                classNames={{
                  label: 'text-darkmode text-sm font-bold',
                  input: 'w-full',
                  errorMessage: 'text-base mt-2 text-sm w-full'
                }}
                placeholder={t('placeholderLastname')}
                isInvalid={!!errors.lastname}
                errorMessage={errors.lastname?.message}
              />
            </div>
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({field}) => (
            <div
              className="w-full"
            >
              <Select
                {...field}
                defaultSelectedKeys={[Gender.MALE]}
                name="gender"
                size={breakpoint === 'base' ? 'md' : 'lg'}
                label={t('gender')}
                labelPlacement="outside"
                classNames={{
                  label: 'text-darkmode text-sm font-bold',
                  errorMessage: 'mt-2 text-sm w-full',
                  popoverContent: "text-gray-900"
                }}
                startContent={getGenderIcon()}
                placeholder={t('placeholderGender')}
                isInvalid={!!errors.gender}
              >
                {
                  genderIcons.map((item) => (
                    <SelectItem
                      key={item.gender}
                      startContent={item.content.icon}
                    >
                      {item.content.label}
                    </SelectItem>
                  ))
                }
              </Select>

              {!!errors.gender &&
                <ErrorMessageCustom message={errors.gender?.message}/>
              }
            </div>
          )}
        />

        <Controller
          name="dob"
          control={control}
          render={({field}) => (
            <div className="w-full">
              <I18nProvider locale={locale}>
                <DatePicker
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                    setTimeout(async () => {
                      await trigger('dob');
                    }, 0);
                  }}
                  size={breakpoint === 'base' ? 'md' : 'lg'}
                  showMonthAndYearPickers
                  name="dob"
                  label={t('dob')}
                  labelPlacement="outside"
                  classNames={{
                    label: `${!!errors.dob ? 'text-red-500' : 'text-darkmode'}  text-sm font-bold`,
                    input: 'w-full',
                    timeInputLabel: 'font-inherit',
                    calendar: 'bg-primary-900 text-white',
                    calendarContent: 'bg-primary-900 text-white',
                    popoverContent: 'bg-primary-900 text-white'
                  }}
                  isInvalid={!!errors.dob}
                />
              </I18nProvider>
              {!!errors.dob &&
                <ErrorMessageCustom message={errors.dob?.message}/>
              }
            </div>
          )}
        />
      </div>
    </div>
  )
}

export default InfoStep
