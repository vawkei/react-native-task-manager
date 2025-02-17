import { Pressable, StyleProp, StyleSheet, Text, ViewProps, ViewStyle } from "react-native";

interface ButtonProps{
    title:string;
    // children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    type?: "button" | "submit";
    submitHandler:()=>void;
}

export default function Button(props:ButtonProps){

    return(
        <Pressable onPress={()=>props.submitHandler()} style={styles.button}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    button:{
        width:"100%",
        padding:6,
        borderRadius:6,
        backgroundColor:"yellow",
        shadowRadius:1
    },
    buttonText:{
        textAlign:"center",
        fontSize:16,
        fontWeight:"bold",
    }
})