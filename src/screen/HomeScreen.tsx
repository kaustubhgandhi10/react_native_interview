import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  RefreshControl,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ProductScreen } from "./ProductScreen";
import useProducts from "../hooks/useProducts";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = React.useState("");

  const { data, isLoading, error, refetch, isRefetching } = useProducts();

  const filteredproducts = data?.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          <Text className="text-lg text-center font-bold my-4">
            Products List
          </Text>
        </View>

        <TextInput
          value={search}
          className="border border-gray-300 rounded-md p-3 m-2 bg-white text-black mb-5"
          placeholder="Search..."
          placeholderTextColor="#888"
          onChangeText={(text) => setSearch(text)}
        />

        {filteredproducts && filteredproducts?.length > 0 ? (
          <FlatList
            data={filteredproducts}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
            renderItem={({ item }) => (
              <Pressable
                className="flex flex-row p-4 border-b border-gray-200 pl-1"
                key={item.id}
                onPress={() => navigation.navigate("Product", { id: item.id })}
              >
                <View className="flex flex-row">
                  <View>
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: 100, height: 100 }}
                      resizeMode="contain"
                    />
                  </View>

                  <View className=" gap-2">
                    <Text className="text-sm font-semibold">
                      {item.productName}
                    </Text>
                    <Text className="text-gray-600">${item.price}</Text>
                    <Text className="text-xs text-gray-400">
                      {item.category}
                    </Text>
                    <Text className="text-yellow-500">
                      Rating: {item.rating}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg font-bold text-slate-800">
              No products found
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
