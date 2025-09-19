'use client'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { signIn } from 'next-auth/react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
    name: z.string().nonempty('name is required'),
    email: z.email("Please enter invalid email"),
    password: z.string('password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, `Matches 8 or more characters that are alphanumeric or from the specified special character set.
    at least one uppercase letter.
    at least one lowercase letter.
    at least one digit.
    at least one special character.`),
    rePassword: z.string().nonempty('rePassword is required'),
    phone: z.string().nonempty('phone is required').regex(/^(\+2|002)?01[0125]\d{8}$/, "we need egyptian phone number")
}).refine((values) => values.password === values.rePassword, { path: ["rePassword"], error: 'password and rePassword dont match' })

export default function RegisterForm() {
    type RegisterFields = z.infer<typeof formSchema>;
    const [apiError, setApiError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<RegisterFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: '',
            rePassword: "",
            phone: "",
        },
    })

    async function onSubmit(values: RegisterFields) {
        setIsLoading(true)
        const response = await signIn("Credentials-register", {
            callbackUrl: "/",
            redirect: false,
            email: values.email,
            password: values.password,
        })
        if (response?.ok) {
            location.href = response.url || '/'
        } else {

            setApiError(response?.error || 'Registration failed')
        }
        setIsLoading(false)
    }

    return <>
        {apiError && <p className="text-destructive text-center">{apiError}</p>}
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Ahmed  " {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="rePassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Ahmed@123" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="01009000900  " {...field} />
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
