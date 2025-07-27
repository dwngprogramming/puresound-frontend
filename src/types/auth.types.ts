import * as yup from 'yup';
import {createLoginSchema} from "@/libs/validation/auth.validation";

export type LoginFormData = yup.InferType<ReturnType<typeof createLoginSchema>>;
