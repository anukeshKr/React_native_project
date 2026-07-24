import { supabase } from "@/lib/superbase";
import { Property } from "@/types";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import FeaturedCard from "@/components/FeaturedCard"

import { SafeAreaView } from "react-native-safe-area-context";
import PropertyCard from "@/components/PropertyCard";

export default function Home() {

  const { user } = useUser();
  const router = useRouter();

  const [featured, setFeatured] = useState<Property[]>([]);
  const [recommended, setRecommended] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    setLoading(true);

    const { data: featureData } = await supabase
      .from("properties")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false })

    const { data: recommendedData } = await supabase
      .from("properties")
      .select("*")
      .eq("is_featured", false)
      .order("created_at", { ascending: false });

    setFeatured(featureData ?? []);
    setRecommended(recommendedData ?? []);
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchProperties();
    }, [])
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <FlatList
        data={featured}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View className="flex-row items-center justify-between px-3 pt-4 pb-5">
              <Image
                source={require('@/assets/images/logo.png')}
                style={{ width: 90, height: 36 }}
                className="mb-8"
                resizeMode='contain'
              />

              <View className="items-end space-y-1">
                <Text className="text-sm font-medium text-gray-500">
                  Good Morning 👋
                </Text>
                <Text className="text-xl font-extrabold tracking-tight text-gray-900">
                  {user?.firstName || "Friend"}
                </Text>
              </View>
            </View>
            {/* Search Bara */}
            <TouchableOpacity
              onPress={() => router.push('/(root)/(tabs)/search')}
              className="mx-5 mb-6 flex-row items-center bg-white rounded-2xl px-4 py-3 gap-3"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2
              }}
            >
              <Ionicons name="search-outline" size={18} color="#9CA3AF" />
              <Text className="text-gray-400 text-sm flex-1">
                Search properties, cities...
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/(root)/(tabs)/search?openFilters=true')}
                className="w-8 h-8 bg-blue-600 rounded-xl items-center justify-center"
              >
                <Ionicons name="options-outline" size={15} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
            {/* Featured Section */}
            <View className="mb-6">
              <Text className="text-gray-900 text-lg font-bold px-5 mb-4">
                Featured
              </Text>
              {loading ? (
                <ActivityIndicator size="small"
                  color="#2563EB"
                  className="py-10"
                />
              ) : (
                <FlatList
                  data={featured}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <FeaturedCard property={item} />}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                />
              )}
            </View>
            {/* Recommended header */}
            <Text className="text-gray-900 text-lg font-bold px-5 mb-4">
              Recommended
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="px-5">
            <PropertyCard property={item} />
          </View>
        )}
        ListEmptyComponent={
          !loading ? (
            <View className="items-center py-16">
              <Text className="text-gray-600">No properties found</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView >
  );
}