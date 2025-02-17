import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import Card from "../ui/card/Card";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { useRouter } from "expo-router";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AddDispatch, RootState } from "@/store/store";
// import { HIDE_AUTH_MODAL } from "../../store/index";
import {
  useRegisterMutation,
  useLoginMutation,
} from "@/store/rtk/authApi/authApi";
import { RESET_AUTH, SET_LOGGEDIN_USER, SET_REGISTERED_USER } from "@/store/authIndex";

interface AuthProps {
  hideAuthModalHandler: () => void;
}

export default function Auth(props: AuthProps) {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  // rtkQuery usage:
  const [registerUser] = useRegisterMutation();
  const [loginUser] = useLoginMutation();

  const dispatch = useDispatch<AddDispatch>();

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  // const { showModal } = useTypedSelector((state) => state.authModal);
  const { message,isLoggedIn,isSuccess } = useTypedSelector((state) => state.auth);

  const [haveAccount, setHaveAccount] = useState(false);
  const switchAuthModeHandler = () => {
    setHaveAccount((currState) => !currState);
  };

  const router = useRouter();

  const submitHandler = async () => {
    if (haveAccount) {
      //👇👇👇 Login===========================================>>
      if (
        enteredEmail.trim().length === 0 ||
        enteredPassword.trim().length < 6
      ) {
        return console.log(
          "Enter name and email. Password shouldn't less than 6 characters"
        );
      }

      const userData = {
        email: enteredEmail,
        password: enteredPassword,
      };

      console.log("login:", userData);
      const response = await loginUser(userData).unwrap();
      
      console.log("login response from server:", response);
      dispatch(SET_LOGGEDIN_USER(response))
      //dispatch(props.hideAuthModalHandler);


    } else {
      //👇👇👇 Register===========================================👇👇👇>>
      if (
        enteredName.trim().length === 0 ||
        enteredEmail.trim().length === 0 ||
        enteredPassword.trim().length < 6
      ) {
        return console.log(
          "Enter name and email. Password shouldn't less than 6 characters"
        );
      }

      const userData = {
        username: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      };

      console.log("register:", userData);

      const response = await registerUser({ userData }).unwrap();
      console.log("register response from server:", response);
      dispatch(SET_REGISTERED_USER(response));

      setEnteredName("");
      setEnteredEmail("");
      setEnteredPassword("")
    }
  };

  useEffect(()=>{
    if(isLoggedIn && isSuccess){
      // router.push("/user-dashboard")
      router.replace("/(app)/home"); 
      dispatch(RESET_AUTH());
      dispatch(props.hideAuthModalHandler);
    };
    
  },[isLoggedIn,isSuccess,dispatch])

  //📒📒 Moved this to its parent, indexed.tsx cuz of this:onRequestClose in Modal

  // const hideAuthModalHandler = () => {
  //     dispatch(HIDE_AUTH_MODAL());
  //     console.log("we major:", showModal);
  //   };

  return (
    <Card style={styles.cardStyle}>
      
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{haveAccount ? "Login" : "Register"}</Text>
        <Pressable
          style={{ zIndex: 999, position: "absolute", top: 0, right: 10 }}
          onPress={() => {
            console.log("Pressable clicked!");
            props.hideAuthModalHandler();
          }}>
          <Text style={styles.closeButton}>X</Text>
        </Pressable>
      </View>

      <View style={styles.inputsContainer}>
        {haveAccount ? null : (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter name here"
              value={enteredName}
              onChangeText={(enteredText) => setEnteredName(enteredText)}
            />
          </View>
        )}

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter email here"
            value={enteredEmail}
            onChangeText={(enteredText) => setEnteredEmail(enteredText)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter password here"
            value={enteredPassword}
            secureTextEntry={true}
            onChangeText={(enteredText) => setEnteredPassword(enteredText)}
          />
        </View>
      </View>

      <View>
        <Button
          type="submit"
          title={haveAccount ? "Login" : "Register"}
          submitHandler={submitHandler}
        />

        <View style={styles.switchAuthMode}>
          <Pressable onPress={switchAuthModeHandler}>
            <Text style={styles.switchAuthModeText}>
              {haveAccount ? "create an account" : "login"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    width: "100%",
    padding: 20,
    marginTop: 12,
  },
  messageContainer:{},
  
  messageText: {
    color: "green",
  },
  headingContainer: {
    position: "relative",
  },
  heading: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    // position: "absolute",
    // top: 0,
    // right: 1,  📒📒Put it in pressable instead. same with:zIndex: 999
    fontWeight: "bold",
    backgroundColor: "red",
    padding: 3,
    borderRadius: 50, // Half of width/height
  },
  inputsContainer: {
    padding: 6,
  },
  textInputContainer: {
    padding: 12,
  },
  textInput: {
    padding: 12,
    fontSize: 20,
    borderRadius: 6,
  },
  switchAuthMode: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  switchAuthModeText: {
    color: "green",
  },
});
