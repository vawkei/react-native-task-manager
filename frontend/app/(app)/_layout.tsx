import { Redirect, Stack } from "expo-router";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "@/store/store";

export default function AppLayout() {
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { isLoggedIn, token } = useTypedSelector((state) => state.auth);
  console.log("isLoggedIn:", isLoggedIn);
  console.log("token:", token);

  if (!isLoggedIn && !token) {
    return <Redirect href={"/"} />;
  } else {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="home"
          options={{ headerTitle: "User Dashboard", headerShown: false }}
        />

        <Stack.Screen
          name="create-task"
          options={{ headerTitle: "Create Task" }}
        />

        <Stack.Screen name="task-list" options={{ headerTitle: "Task List" }} />

        <Stack.Screen
          name="task/[id]"
          options={{ headerTitle: "Edit Task", headerShown: false }}
        />
      </Stack>
    );
  }
}

// import { Slot } from "expo-router";

// export default function AppLayout() {
//   return <Slot />;
// }

{
  /* <>
<Stack.Screen
  name="user-dashboard"
  options={{ headerTitle: "User Dashboard" }}
/>

<Stack.Screen
  name="create-task"
  options={{ headerTitle: "Create Task" }}
/>

<Stack.Screen
  name="task-list"
  options={{ headerTitle: "Task List" }}
/>
</> */
}
