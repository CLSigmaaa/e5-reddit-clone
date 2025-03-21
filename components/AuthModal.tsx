import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';
import Svg, { Path } from "react-native-svg";

const AppleIcon = () => (
    <Svg viewBox="0 0 24 24" width={24} height={24}>
        <Path
            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
            fill="currentColor"
        />
    </Svg>
);

const GoogleIcon = () => (
    <Svg viewBox="0 0 24 24" width={24} height={24}>
        <Path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
        />
    </Svg>
);

export const AuthModal = ({
    className,
    ...props
}: {
    className?: string;
    props?: any;
}) => {
    return (
        <View className={`flex flex-col gap-6 ${className}`} {...props}>
            <Card className="border-0 shadow-none">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        <Text>
                            Welcome back
                        </Text>
                    </CardTitle>
                    <CardDescription>
                        <Text>
                            Login with your Apple or Google account
                        </Text>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <View className="grid gap-6">
                        <View className="flex flex-col gap-4">
                            <Button variant="outline" className="w-full flex flex-row items-center justify-center gap-x-2">
                                <AppleIcon />
                                <Text className="text-white font-semibold">Login with Apple</Text>
                            </Button>
                            <Button variant="outline" className="w-full flex flex-row items-center justify-center gap-2">
                                <GoogleIcon />
                                <Text className="text-white font-semibold">Login with Google</Text>
                            </Button>
                        </View>
                        <View className="relative text-center text-sm">
                            <Text className="relative z-10 bg-background px-2 text-muted-foreground">
                                Or continue with
                            </Text>
                        </View>
                        <View className="grid gap-6">
                            <View className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="m@example.com"
                                />
                            </View>
                            <View className="flex-col gap-y-2">
                                <View className="flex-row justify-between items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Pressable onPress={() => console.log('Forgot password pressed')}>
                                        <Text className="ml-auto text-sm underline-offset-4 hover:underline text-gray-300">
                                            Forgot your password?
                                        </Text>
                                    </Pressable>
                                </View>
                                <Input
                                    id="password"
                                    secureTextEntry
                                />
                            </View>
                            <Button className="w-full">
                                <Text className="text-base">Login</Text>
                            </Button>
                        </View>
                        <View className="text-center text-sm flex-row items-center justify-center">
                            <Text className="text-gray-300 flex items-center">
                                Don&apos;t have an account?{' '}
                                <Text className="underline underline-offset-4 text-gray-300">Sign up</Text>
                            </Text>
                        </View>
                    </View>
                </CardContent>
            </Card>
        </View>
    );
};