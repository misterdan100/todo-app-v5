"use client";

import { useForm, SubmitHandler } from 'react-hook-form'

// ShadCN imports
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uiConfig } from "@/config/uiConfig";
import Link from "next/link";
import { InputErrorMessage } from '../errors/InputErrorMessage';
import { loginUser, validateSession } from '@/api';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks';
import { revalidatePath } from 'next/cache';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { verifySession } from '@/store/auth/sessionSlice';
import { revalidateAllData } from '@/actions';
import { DemoCredentials } from '@/app/(auth)/login/DemoCredentials';
// ShadCN imports

type InputsForm = {
    email: string
    password: string
}

export const LoginForm = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [errorLogin, setErrorLogin] = useState('')
    const { register, handleSubmit, formState: { errors} } = useForm<InputsForm>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const handleLogin = async (data: InputsForm) => {
      const res: {success: boolean, data?: {token: string}, message?: string} = await loginUser({email: data.email.toLowerCase(), password: data.password.trim()})

      if( res.success === false) {
        toast.error(res.message)
        return
      }

      localStorage.setItem('token', res.data?.token as string)
      
      await revalidateAllData({})
      
      await dispatch(verifySession())
      router.refresh()
      router.push('/')
    }

  return (
    <Card className="w-[400px] dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="text-2xl">Login to Your Account</CardTitle>
        <CardDescription>
          {"Login Now. Don&apos;t have an account?"}
          <Link
            className="font-bold"
            style={{
              color: uiConfig.mainColor,
            }}
            href="/register"
          >
            {" "}
            Register here
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="grid w-full items-center gap-4">

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                placeholder="home@home.com" 
                {...register('email', { required: 'E-mail is required.', 
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail not valid",
                  }
                })}
              />
              {errors.email && <InputErrorMessage >{errors.email.message}</InputErrorMessage>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="***************"
                {...register('password', {required: 'Password is required.', minLength: {
                  value: 6,
                  message: 'Password needs min 6 characters.'
                }})}
              />
              {errors.password && <InputErrorMessage >{errors.password.message}</InputErrorMessage>}
            </div>

            {errorLogin && <InputErrorMessage>{errorLogin}
            </InputErrorMessage>}

          </div>
          <Button className="w-full mt-8">Login Now</Button>
        </form>

        <DemoCredentials />
      </CardContent>
    </Card>
  );
};
