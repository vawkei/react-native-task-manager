import { RootState, store } from "@/store/store";
import { Provider } from "react-redux";
import { Slot, Stack, useRouter } from "expo-router";
import { useSelector,TypedUseSelectorHook } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function App() {

const useTypedSelector:TypedUseSelectorHook<RootState>=useSelector;

const {isLoggedIn,token} = useTypedSelector((state)=>state.auth);
console.log("isLoggedIn:",isLoggedIn);
console.log("token:",token);

const router = useRouter();


// useEffect(()=>{
//   const fetchToken = async()=>{
//     try{
//       const jsonValue = await AsyncStorage.getItem("authToken");
//       console.log("authToken:",jsonValue)
//     }catch(error){
//       const message = error instanceof Error?error.message:"something went wrong";
//       console.log("asyncStorageError:",message)
//     }
//   };
//   fetchToken()
// },[])


useEffect(()=>{
  if(isLoggedIn && token){
    router.replace("/(app)/home")
  }else{
    router.push("/")
  }
},[isLoggedIn,token])

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "yellow" },
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
      <Stack.Screen 
        name="+not-found" 
        options={{ headerTitle: "Not Found" }}
      />
      <Stack.Screen name="(app)" options={{ headerShown: true }} />
      <Slot />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}