import * as yup from 'yup';
import {createLoginSchema, createRegisterSchema} from "@/libs/validation/auth.validation";

export type LocalLoginData = yup.InferType<ReturnType<typeof createLoginSchema>>;

export type SignUpData = yup.InferType<ReturnType<typeof createRegisterSchema>>;
