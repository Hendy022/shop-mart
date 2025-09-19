'use client'

import { Button } from "@/components/ui/button"
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { signIn } from 'next-auth/react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
    email: z.email("Please enter invalid email"),
    password: z.string('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, `Matches 8 or more characters that are alphanumeric or from the specified special character set.
    at least one uppercase letter.
    at least one lowercase letter.
    at least one digit.
    at least one special character.`)
})

export default function LoginForm() {
    type LoginFields = z.infer<typeof formSchema>;
    const [apiError, setApiError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<LoginFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })

    async function onSubmit(values: LoginFields) {
        setIsLoading(true)
        const response = await signIn("credentials", {
            callbackUrl: "/",
            redirect: false,
            email: values.email,
            password: values.password,
        })
        if (response?.ok) {
            location.href = response.url || '/'
        } else {

            setApiError(response?.error || 'Login failed')
        }
        setIsLoading(false)
    }

    return <>
        {apiError && <p className="text-destructive text-center">{apiError}</p>}
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="ahmed@gmail.com...  " {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Ahmed@123" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading} type="submit" className="w-full">
                    {isLoading && <Loader2 className="animate-spin" />}Submit
                </Button>
            </form>
        </Form>

    </>
}
