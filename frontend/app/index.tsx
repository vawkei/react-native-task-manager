import Auth from "@/components/auth/Auth";
import Button from "@/components/ui/button/Button";
import { Text, View, StyleSheet, Modal } from "react-native";
import { HIDE_AUTH_MODAL, SHOW_AUTH_MODAL } from "../store/authModalIndex";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AddDispatch, RootState } from "@/store/store";
import { useEffect } from "react";

export default function HomeScreen() {
  // const [showModal, setShowModal] = useState(true);

  const dispatch = useDispatch<AddDispatch>();

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { showModal } = useTypedSelector((state) => state.authModal);

  const showAuthModalHandler = () => {
    dispatch(SHOW_AUTH_MODAL());
    console.log(showModal);
  };

  const hideAuthModalHandler = () => {
    dispatch(HIDE_AUTH_MODAL());
    console.log("we major:", showModal);
  };

  useEffect(() => {
    console.log("Updated showModal state:", showModal);
  }, [showModal]);

  return (
    <View style={styles.homeContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.homeText}>Task Manager</Text>
      </View>

      {showModal && (
        <Modal
          // style={styles.authContainer}
          // onRequestClose={hideAuthModalHandler}
          animationType="slide"
          visible={showModal}>

          <View style={styles.modalOverlay}>
            <View style={styles.authContainer}>
              <Auth hideAuthModalHandler={hideAuthModalHandler} />
            </View>
          </View>

        </Modal>
      )}

      {!showModal && (
        <View style={styles.buttonContainer}>
          <Button
            type="button"
            title="Auth"
            submitHandler={() => showAuthModalHandler()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "25%",
    width: "100%",
  },
  textContainer: {},
  homeText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  authContainer: {
    width: "100%",
    maxWidth: "90%",
    marginHorizontal:"auto"
    // height:"100%",
    // marginTop:"20%"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center", // Keeps modal at the center
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  buttonContainer: {
    width: "50%",
    marginTop: 35,
  },
});
