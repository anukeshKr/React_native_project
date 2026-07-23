import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
    const { isLoaded, isSignedIn } = useAuth();

    // sync clerk user 

    if (!isSignedIn) {
        return <Redirect href="/sign-in" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}