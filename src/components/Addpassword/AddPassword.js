import Model from "../UI/Model";
import classes from "./AddPassword.module.css";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import { useEffect, useState, useReducer } from "react";
import inputReducer from "../../inputReducer"; // Import the reducer

const initialState = {
  value: "",
  isValid: false,
  inputURL: "",
  inputURLValid: false,
  inputUserName: "",
  inputUserNameValid: false,
  inputPassword: "",
  inputPasswordValid: false,
  inputNote: "",
  inputNoteValid: false,
  formValid: false,
};

const AddPassword = (props) => {
  // const [inputURL, setInputURL] = useState("");
  // const [inputURLValid, setInputURLValid] = useState();
  // const [inputUserName, setInputUserName] = useState("");
  // const [inputUserNameValid, setInputUserNameValid] = useState();
  // const [inputPassword, setInputPassword] = useState("");
  // const [inputPasswordValid, setInputPasswordValid] = useState();
  // const [inputNote, setInputNote] = useState("");
  // const [inputNoteValid, setInputNoteValid] = useState();

  const [formValid, setFormValid] = useState(false);

  //useReducer
  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);

  const urlChangeHandler = (event) => {
    const inputValue = event.target.value;

    // Modified URL pattern to allow inputs like "chethan.s@idaksh.in"
    const urlPattern =
      /^(https?:\/\/(www\.)?)?[a-zA-Z0-9\-\.]+\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

    // Test the input value against the new pattern
    const isValid = urlPattern.test(inputValue);
    dispatchInput({ type: "URL", val: inputValue, isValid });
  };

  const usernameChangeHandler = (event) => {
    const inputValue = event.target.value;

    if (inputValue) {
      dispatchInput({ type: "USERNAME", val: inputValue, isValid: true });
    } else {
      dispatchInput({ type: "USERNAME", val: inputValue, isValid: false });
    }
  };

  const passwordChangeHandler = (event) => {
    const inputValue = event.target.value;
    if (inputValue) {
      // setInputPassword(inputValue);
      // setInputPasswordValid(true);
      dispatchInput({ type: "PASSWORD", val: inputValue, isValid: true });
    } else {
      // setInputPassword(inputValue);
      // setInputPasswordValid(false);
      dispatchInput({ type: "PASSWORD", val: inputValue, isValid: false });
    }
  };

  useEffect(() => {
    if (
      inputState.inputURLValid &&
      inputState.inputUserNameValid &&
      inputState.inputPasswordValid
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [
    inputState.inputURLValid,
    inputState.inputUserNameValid,
    inputState.inputPasswordValid,
  ]);

  const noteChangeHandler = (event) => {
    const inputValue = event.target.value;

    dispatchInput({ type: "NOTE", val: inputValue, isValid: true });
  };

  let userDataArray = [];

  const addPasswordHandler = (event) => {
    event.preventDefault();

    if (
      inputState.inputURL &&
      inputState.inputUserName &&
      inputState.inputPassword
    ) {
      // Create a new data object
      const newData = {
        id: Math.random() * 10,
        website: inputState.inputURL,
        username: inputState.inputUserName,
        password: inputState.inputPassword,
        note: inputState.inputNote, // Include note if needed
      };

      // Retrieve existing data from local storage
      const storedUserDataJSON = localStorage.getItem("storedUserData");

      // Initialize an array to hold the data

      // If existing data is present, parse it into an array
      if (storedUserDataJSON) {
        userDataArray = JSON.parse(storedUserDataJSON);
      }

      // Add the new data to the array
      userDataArray.push(newData);

      // Convert the updated array to a JSON string
      const updatedUserDataJSON = JSON.stringify(userDataArray);

      // Store the updated JSON string in local storage
      localStorage.setItem("storedUserData", updatedUserDataJSON);

      // Clear input fields and reset validation

      props.onClose();
    }
  };

  return (
    <Model onClose={props.onClose}>
      <h3 slot="title" id="title" className="dialog-title">
        Add new password
      </h3>
      <main>
        <form
          className={classes["password-form"]}
          onSubmit={addPasswordHandler}
        >
          <Input
            id="site-url"
            type="text"
            label="Site URL"
            siteInput={inputState.inputURL}
            placeholder="example.com"
            onChange={urlChangeHandler}
            isValid={inputState.inputURLValid}
            className={classes.invalid}
            readOnly="false"
          />
          <Input
            id="username"
            type="text"
            label="Username"
            siteInput={inputState.inputUserName}
            onChange={usernameChangeHandler}
            isValid={inputState.inputUserNameValid}
            className={classes.invalid}
            readOnly="false"
          />
          <Input
            id="password"
            type="password"
            label="Password"
            onChange={passwordChangeHandler}
            siteInput={inputState.inputPassword}
            isValid={inputState.inputPasswordValid}
            className={classes.invalid}
            readOnly="false"
          />

          <Textarea
            id="note"
            label="Note"
            placeholder="Write your note here..."
            onChange={noteChangeHandler}
            siteInput={inputState.inputNote}
            isValid={inputState.inputNoteValid}
            className={classes.invalid}
            readOnly="false"
          />

          <div className="flex justify-end gap-10">
            <button
              onClick={props.onClose}
              type="button"
              className="{classes.cancel}"
            >
              Cancel
            </button>
            <button type="submit" disabled={!formValid}>
              Save
            </button>
          </div>
        </form>
      </main>
    </Model>
  );
};

export default AddPassword;
