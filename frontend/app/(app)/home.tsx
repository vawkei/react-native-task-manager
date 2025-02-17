import Card from "@/components/ui/card/Card";
import { AddDispatch, RootState } from "@/store/store";
import { useRouter } from "expo-router";
import { Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { useLogoutMutation } from "@/store/rtk/authApi/authApi";
import { RESET_AUTH, SET_LOGGEDOUT_USER } from "@/store/authIndex";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect } from "react";

export default function UserDashboard() {
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { user, message } = useTypedSelector((state) => state.auth);
  console.log("username:", user?.username);

  const router = useRouter();
  const dispatch = useDispatch<AddDispatch>();

  const [logoutUser] = useLogoutMutation();

  // 👇👇Logout User Alert Handler========================================👇👇
  //📒📒 use for mobile not web   📒📒//
  // const logoutUserAlertHandler = () => {
  //   console.log("Alert function triggered");
  //   console.log("Running on:", Platform.OS);

  //   Alert.alert("Confirm", "Are you sure you want to log out?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => console.log("modal cancelled"),
  //       style: "cancel",
  //     },
  //     {
  //       text: "Logout",
  //       onPress: () => logoutUserHandler(),
  //       style: "destructive",
  //     },
  //   ]);
  // };

  // 👇👇Logout User Handler============================================👇👇
  const logoutUserHandler = async () => {
    try {
      const response = await logoutUser({}).unwrap();
      console.log("logout response:", response);
      dispatch(SET_LOGGEDOUT_USER(response));

      // router.push("/")
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      console.log("message:", message);
    }
  };

  useEffect(() => {
    if (message === "user logged out successfully") {
      router.push("/");
      dispatch(RESET_AUTH())
    }
  }, [message]);

  return (
    <Card style={styles.cardClass}>
      <Card style={styles.headingContainer}>
        <Text style={styles.headingText}>Welcome {user?.username}</Text>
      </Card>

      <View style={styles.optionsContainer}>
        <View style={styles.createTaskContainer}>
          <Pressable onPress={() => router.push("/create-task")}>
            <Text style={styles.optionText}>Create Task?</Text>
          </Pressable>
        </View>

        <View style={styles.checkTaskContainer}>
          <Pressable onPress={() => router.push("/task-list")}>
            <Text style={styles.optionText}>Check Tasks?</Text>
          </Pressable>
        </View>

        <View style={styles.button}>
          <Pressable onPress={logoutUserHandler}>
            {/* <Text style={styles.buttonText}>Log out</Text> */}
            <FontAwesome name="power-off" size={18} style={styles.buttonText} />
          </Pressable>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardClass: {
    width: "80%",
    marginHorizontal: "auto",
    padding: 16,
    marginTop: 50,
  },
  headingContainer: {
    padding: 12,
  },
  headingText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  optionsContainer: {
    padding: 12,
    marginTop: 30,
    gap: 20,
    marginHorizontal: "auto",
  },
  createTaskContainer: {},

  optionText: {
    fontWeight: "bold",
  },
  checkTaskContainer: {},
  button: {
    width: "100%",
    padding: 6,
    borderRadius: 6,
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
