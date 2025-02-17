import {
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import Card from "../../components/ui/card/Card";
import { useState } from "react";
// import DatePicker from "react-native-date-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

import DatePicker from "react-datepicker"; //web version
import "react-datepicker/dist/react-datepicker.css"; //web version
import { TaskData } from "@/interfaces/interface";


export default function CreateTaskComponent() {

  const router = useRouter();
  const platform = Platform;

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredTaskStatus, setEnteredTaskStatus] = useState(false);
  // const [enteredDateMobile, setEnteredDateMobile] = useState<Date>(new Date());

  const [enteredDateWeb,setEnteredDateWeb] = useState<Date|null>(null);
  const [open, setOpen] = useState(false);

  const onSubmit =()=>{

    if(enteredTitle.trim().length===0 || enteredDescription.trim().length===0 || enteredDateWeb===null){
      console.log("please fill in your tasks...");
      return
    };

    const taskData:TaskData = {
      title:enteredTitle,
      description:enteredDescription,
      status:enteredTaskStatus,
      dueDate:enteredDateWeb
    };

    

  }   
    



  return (
    <Card style={styles.cardClass}>
      
      <View>
        <Pressable onPress={()=>router.push("/(app)/home")}>
          <Text>
            <FontAwesome name="arrow-left" size={24} color="black" />
          </Text>
        </Pressable>
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Create Task</Text>
      </View>

      <View style={styles.inputsContainer}>
        {/*👇👇👇 ==================title==========================👇👇👇 */}
        <View style={styles.textInputContainer}>
          <TextInput
            value={enteredTitle}
            placeholder="name"
            onChangeText={(enteredText) => setEnteredTitle(enteredText)}
          />
        </View>

        {/*👇👇👇 ==================description=====================👇👇👇 */}
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="description"
            value={enteredDescription}
            onChangeText={(enteredText) => setEnteredDescription(enteredText)}
            multiline={true}
            numberOfLines={4}
          />
        </View>

        {/*👇👇👇 ==================taskStatus=====================👇👇👇 */}
        <View style={styles.textInputContainer}>
          <Text>status</Text>
          <Switch
            value={enteredTaskStatus}
            onValueChange={setEnteredTaskStatus} //directly updates
          />
        </View>

        {/*👇👇👇 ==================Date=====================👇👇👇 */}
        <View style={styles.textInputContainer}>
          <Text>date:</Text>
          {platform.OS==="web"?(
              <DatePicker
              selected={enteredDateWeb}
              placeholderText="pick your date here"
              // value={enteredDate}
              onChange={(date: Date | null) => setEnteredDateWeb(date)}
              //onChange={(date) =>setEnteredDate(date)}
            />
          ):(
            // 📒📒This is for mobile, will change to this after the server and database has been hosted online📒📒
          //   <DatePicker
          //   modal
          //   open={open}
          //   date={enteredDateMobile}
          //   mode={"date"}
          //   onConfirm={(date) => {
          //     setOpen(false);
          //     setEnteredDateMobile(date);
          //   }}
          //   onCancel={() => setOpen(false)}
          // />
          <Text>{null}</Text>
          )}
          
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardClass: {
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 40,
    marginBottom: 40,
    padding: 16,
    flex: 1, // this makes it extend down below.
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
    marginTop: 24,
    padding: 6,
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
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    outlineColor: "none",
  },
})
