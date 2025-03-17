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
import { loginUser, registerUser } from '@/api';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
// ShadCN imports

type InputsForm = {
    email: string
    name: string
    password: string
    confirmPassword: string
}

export const RegisterForm = () => {
  const router = useRouter()
  const [errorLogin, setErrorLogin] = useState('')
    const { register, handleSubmit, formState: { errors}, watch } = useForm<InputsForm>({
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
        }
    })

    const password = watch('password')

    const handleRegister = async (data: InputsForm) => {
      const dataForRegister = {
        email: data.email.trim().toLowerCase(),
        name: data.name.trim(),
        password: data.password.trim()
      }
      const res: {success: boolean, message: string} = await registerUser(dataForRegister)
      

      if( res.success === false) {
        setErrorLogin(res.message)
        toast.error(res.message)
        return
      }

      toast.success('User registered successfully')
      router.push('/')
    }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Register for an Account</CardTitle>
        <CardDescription>
        Already have an account?
          <Link
            className="font-bold"
            style={{
              color: uiConfig.mainColor,
            }}
            href="/register"
          >
            {" "}
            Login here
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleRegister)}>
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
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="John Smith" 
                {...register('name', { required: 'Name is required.', 
                  minLength: {
                    value: 3,
                    message: "At least 3 characters for name",
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

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="***************"
                {...register('confirmPassword', {required: 'Password is required.', minLength: {
                  value: 6,
                  message: 'Password needs min 6 characters.'
                },
                validate: value => value === password || 'Passwords do not match'
              })}
              />
              {errors.confirmPassword && <InputErrorMessage >{errors.confirmPassword.message}</InputErrorMessage>}
            </div>

            {errorLogin && <InputErrorMessage>{errorLogin}
            </InputErrorMessage>}

          </div>
          <Button className="w-full mt-8">Register Now</Button>
        </form>
      </CardContent>
    </Card>
  );
};
