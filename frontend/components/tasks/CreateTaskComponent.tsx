import { StyleSheet, Switch, Text, TextInput, View } from "react-native";
import Card from "../ui/card/Card";
import { useState } from "react";
import DatePicker from "react-native-date-picker";

export default function CreateTaskComponent() {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredTaskStatus, setEnteredTaskStatus] = useState(false);
  const [enteredDate, setEnteredDate] = useState<Date>(new Date());

  const [open,setOpen] = useState(false);

  return (
    <Card style={styles.cardClass}>
      <View style={styles.headingContainer}>
        <Text>Create Task</Text>
      </View>

      <View style={styles.inputsContainer}>
        {/*👇👇👇 ==================title==========================👇👇👇 */}
        <View style={styles.textInputContainer}>
          <TextInput
            value={enteredTitle}
            onChangeText={(enteredText) => setEnteredTitle(enteredText)}
          />
        </View>

        {/*👇👇👇 ==================description=====================👇👇👇 */}
        <View style={styles.textInputContainer}>
          <TextInput
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
          <DatePicker
            modal
            open={open}
            date={enteredDate}
            mode={"date"}
            onConfirm={(date)=>{
              setOpen(false);
              setEnteredDate(date)
            }}
            onCancel={()=>setOpen(false)}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardClass: {},
  headingContainer: {},
  inputsContainer: {},
  textInputContainer: {},
});
