import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Property } from "@/types";
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from '@/lib/utils';

export default function FeaturedCard({ property }: { property: Property }) {
    console.log("log from property Card", property);

    const router = useRouter();
    return (
        <TouchableOpacity
            className="w-72 mr-4 rounded-2xl bg-white mb-3"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.06,
                shadowRadius: 10,
                elevation: 3,
                opacity: property.is_sold ? 0.6 : 1,
            }}
            // onPress={() => router.push(`/(root)/property/${property.id}`)}
        >
            {/* Image Container with Badges */}
            <View className="relative w-full h-44 rounded-2xl overflow-hidden">
                <Image
                    source={{ uri: property.images[0] }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                />

                {/* Category Tag */}
                <View className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-full shadow-sm">
                    <Text className="text-xs font-bold text-blue-600 tracking-wide uppercase">
                        {property.type}
                    </Text>
                </View>

                {/* Sold Tag */}
                {property.is_sold && (
                    <View className="absolute top-3 right-3 bg-red-500/95 px-3 py-1.5 rounded-full shadow-sm">
                        <Text className="text-xs font-bold text-white tracking-wide uppercase">
                            Sold
                        </Text>
                    </View>
                )}
            </View>

            {/* Text & Specs Content Area */}
            <View className="p-4 space-y-2">
                {/* Title */}
                <Text
                    className="text-base font-extrabold text-gray-800 capitalize leading-snug"
                    numberOfLines={1}
                >
                    {property.title}
                </Text>

                {/* Location Row */}
                <View className="flex-row items-center space-x-1.5">
                    <Ionicons name="location-sharp" size={14} color="#6B7280" />
                    <Text className="text-xs text-gray-500 font-medium flex-1" numberOfLines={1}>
                        {property.address}, {property.city}
                    </Text>
                </View>

                {/* Divider Separator Line */}
                <View className="h-[1px] bg-gray-100 my-1" />

                {/* Footer: Price & Amenities */}
                <View className="flex-row items-center justify-between pt-1">
                    <Text className="text-blue-600 font-black text-lg tracking-tight">
                        {formatPrice(property.price)}
                    </Text>

                    <View className="flex-row items-center space-x-3">
                        {/* Beds */}
                        <View className="flex-row items-center space-x-1 bg-gray-50 px-2 py-1 rounded-md">
                            <Ionicons name="bed-outline" size={14} color="#4B5563" />
                            <Text className="text-xs font-semibold text-gray-600">
                                {property.bedrooms}
                            </Text>
                        </View>

                        {/* Baths */}
                        <View className="flex-row items-center space-x-1 bg-gray-50 px-2 py-1 rounded-md">
                            <Ionicons name="water-outline" size={14} color="#4B5563" />
                            <Text className="text-xs font-semibold text-gray-600">
                                {property.bathrooms}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}