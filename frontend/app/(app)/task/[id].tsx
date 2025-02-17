import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Switch,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Card from "@/components/ui/card/Card";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DatePicker from "react-datepicker";
import {
  useUpdateTaskMutation,
  useGetTaskQuery,
} from "@/store/rtk/taskApi/taskApi";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Button from "@/components/ui/button/Button";
import { useDispatch,useSelector,TypedUseSelectorHook } from "react-redux";
import { AddDispatch, RootState } from "@/store/store";
import { RESET_TASK_MSG, UPDATED_TASK } from "@/store/taskIndex";


export default function TaskDetailPage() {
  const { id } = useLocalSearchParams(); // Fetch dynamic ID

  const { data } = useGetTaskQuery(id);
  console.log(data);

  const router = useRouter();

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredTaskStatus, setEnteredTaskStatus] = useState(false);
  const [enteredDateWeb, setEnteredDateWeb] = useState<Date | null>(null);

  const [updateTask] = useUpdateTaskMutation();


  const useTypedSelector :TypedUseSelectorHook<RootState>=useSelector;
  const {message} = useTypedSelector((state)=>state.task);

  const dispatch = useDispatch<AddDispatch>();

  const onSubmit = async () => {
    const taskData = {
      enteredTitle: enteredTitle,
      enteredDescription: enteredDescription,
      enteredTaskStatus: enteredTaskStatus,
      enteredDateWeb: enteredDateWeb
        ? format(enteredDateWeb, "yyyy-MM-dd")
        : null,
      // This converts the date into a string in YYYY-MM-DD format (e.g., "2025-02-17"). because thats the pattern of mysql date
    };
    try {
     const response =  await updateTask({ id, taskData }).unwrap();
      console.log("response from server:",response)
      dispatch(UPDATED_TASK(response))
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      console.log("error message:", message);
    }
  };

  useEffect(() => {
    if (data) {
      setEnteredTitle(data?.task.title);
      setEnteredDescription(data?.task.description);
      setEnteredTaskStatus(data?.task.status);
      setEnteredDateWeb(new Date(data?.task.dateDue));
      console.log("data loaded and states filled");
    }
  }, [data]);

  useEffect(()=>{
    if(message==="task updated successfully"){
      router.push("/(app)/task-list");
      dispatch(RESET_TASK_MSG())
    }
  },[message])

  return (
    <Card style={styles.cardClass}>
      <View>
        <Pressable onPress={() => router.push("/task-list")}>
          <Text>
            <FontAwesome name="arrow-left" size={24} color="black" />
          </Text>
        </Pressable>
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Edit Task</Text>
      </View>

      <View style={styles.inputsContainer}>
        {/*👇👇👇 ==================title==========================👇👇👇 */}
        <View style={styles.textInputContainer}>
          <TextInput
            value={enteredTitle}
            onChangeText={(enteredText) => setEnteredTitle(enteredText)}
          />
        </View>

        {/*👇👇👇 ==================description===============👇👇👇 */}

        <View style={styles.textInputContainer}>
          <TextInput
            value={enteredDescription}
            multiline={true}
            numberOfLines={4}
            onChangeText={(enteredText) => setEnteredDescription(enteredText)}
          />
        </View>

        {/*👇👇👇 ==================taskStatus=====================👇👇👇 */}

        <View style={styles.textInputContainer}>
          <Text>status</Text>
          <Switch
            value={enteredTaskStatus}
            onValueChange={setEnteredTaskStatus}
            trackColor={{ false: "", true: "blue" }}
          />
        </View>

        {/*👇👇👇 ==================Date=====================👇👇👇 */}

        <View style={styles.textInputContainer}>
          <Text>date:</Text>
          {Platform.OS === "web" ? (
            <DatePicker
              selected={enteredDateWeb}
              onChange={(date: Date | null) => setEnteredDateWeb(date)}
            />
          ) : (
            <Text>{null}</Text>
          )}
        </View>

        <View>
          <Button type="submit" submitHandler={onSubmit} title="Edit" />
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
    marginTop: 40,
  },
  headingContainer: {
    padding: 12,
  },
  headingText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  inputsContainer: {
    padding: 6,
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 25,
    borderColor: "#cccccc",
    borderWidth: 2,
    borderRadius: 6,
  },
  textInputContainer: {
    borderColor: "#cccccc",
    borderWidth: 2,
    borderRadius: 6,
    padding: 6,
  },
});
