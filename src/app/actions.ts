'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {createStagingToken, identifyToken} from "@/libs/vercel/store";

const SUPER_TOKEN = process.env.KV_SUPER_TOKEN;
const IS_STAGING = process.env.NEXT_PUBLIC_APP_ENV === 'staging';
const MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export async function verifyStagingToken(prevState: any, formData: FormData) {
  if (!IS_STAGING) {
    return {error: 'Staging environment is not enabled.'}
  }
  
  const token = formData.get('token') as string;
  const cookieStore = await cookies();
  
  // Check super token
  if (token === SUPER_TOKEN) {
    cookieStore.set('stg_role', 'admin', {httpOnly: true, secure: true, path: '/', maxAge: MAX_AGE})
    cookieStore.set('stg_token', token, {httpOnly: true, secure: true, path: '/', maxAge: MAX_AGE})
    redirect('/staging/admin')
  }
  
  // Check user token
  const stagingUser = await identifyToken(token);
  if (stagingUser) {
    cookieStore.set('stg_role', stagingUser.role, {httpOnly: true, secure: true, path: '/', maxAge: MAX_AGE})
    cookieStore.set('stg_token', token, {httpOnly: true, secure: true, path: '/', maxAge: MAX_AGE})
    redirect('/')
  }
  
  return {error: 'Token is not valid.'}
}

export async function generateStagingToken(prevState: any, formData: FormData) {
  if (!IS_STAGING) return;
  
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  
  if (!name) {
    return {error: 'Name is required.'}
  }
  
  if (!role) {
    return {error: 'Role is required.'}
  }
  
  const newToken = await createStagingToken(name, role);
  return { success: true, newToken, name }
}