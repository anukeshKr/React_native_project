import { useUserSync } from "@/hooks/useUserSync";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
    const { isLoaded, isSignedIn } = useAuth();

    useUserSync();

    if (!isSignedIn) {
        return <Redirect href="/sign-in" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}