import Card from "@/components/ui/card/Card";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
} from "react-native";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
} from "@/store/rtk/taskApi/taskApi";
import { MysqlTaskData } from "@/interfaces/interface";

export default function TaskListComponent() {
  const { data, error } = useGetTasksQuery(undefined);
  console.log("data from backend:", data);

  const tasks: MysqlTaskData[] = data?.tasks;
  console.log("tasks:", tasks);

  const router = useRouter();

  const [deleteTask] = useDeleteTaskMutation();

  const deleteTaskHandler = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      console.log("error message:", error);
    }
  };

  return (
    <ScrollView>
      <Card style={styles.cardClass}>
        <View>
          <Pressable onPress={() => router.push("/(app)/home")}>
            <Text>
              <FontAwesome name="arrow-left" size={24} color="black" />
            </Text>
          </Pressable>
        </View>

        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Task List</Text>
        </View>

        <View style={styles.taskContainer}>
          <View>
            {tasks?.map((task) => {
              console.log("dueDtate:", task.dateDue);
              return (
                <Card key={task.uuid} style={styles.taskItem}>
                  <View style={styles.row1}>
                    <Text style={styles.titleText}>{task.title}</Text>
                  </View>

                  <View style={styles.row2}>
                    <Text style={styles.descText}>
                      {task.description.slice(0, 45)}...
                    </Text>
                  </View>

                  <View style={styles.row3}>
                    <View style={styles.status}>
                      <Text>Status:</Text>
                      <Switch
                        disabled={true}
                        value={task.status}
                        trackColor={{ false: "", true: "blue" }}
                      />
                    </View>

                    <Text>{task.dateDue}</Text>
                  </View>

                  <View style={styles.row4}>
                    <View>
                      <Pressable
                        onPress={() => router.push(`/task/${task.uuid}`)}>
                        <FontAwesome name="edit" size={24} color="green" />
                      </Pressable>
                    </View>
                    <View>
                      <Pressable onPress={() => deleteTaskHandler(task.uuid)}>
                        <FontAwesome name="trash-o" size={24} color="red" />
                      </Pressable>
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardClass: {
    width: "80%",
    marginHorizontal: "auto",
    padding: 16,
    marginTop: 40,
    marginBottom: 10,
  },
  headingContainer: {
    padding: 12,
  },
  headingText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  taskContainer: {
    padding: 6,
    marginTop: 12,
  },
  taskItem: {
    marginTop: 10,
    padding: 12,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  descText: {
    padding: 6,
  },
  row1: {},
  row2: {},
  row3: {
    // paddingTop:6
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  status: {
    // paddingTop:6
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  row4: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
    marginTop: 12,
  },
});


