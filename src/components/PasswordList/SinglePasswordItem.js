import { useEffect, useState } from "react";
import Input from "../UI/Input";
import Model from "../UI/Model";
import Textarea from "../UI/Textarea";
import classes from "./SinglePasswordItem.module.css";

const SinglePasswordItem = (props) => {
  const id = props.selectedPassword.id;
  const [edit, setEdit] = useState(false);
  const [inputURL, setInputURL] = useState(props.selectedPassword.website);
  const [inputURLValid, setInputURLValid] = useState(true);
  const [inputUserName, setInputUserName] = useState(
    props.selectedPassword.username
  );
  const [inputUserNameValid, setInputUserNameValid] = useState(true);
  const [inputPassword, setInputPassword] = useState(
    props.selectedPassword.password
  );
  const [inputPasswordValid, setInputPasswordValid] = useState(true);
  const [inputNote, setInputNote] = useState(props.selectedPassword.note);
  const [inputNoteValid, setInputNoteValid] = useState();
  const [formValid, setFormValid] = useState(true);
  const [userData, setUserData] = useState([]);

  const urlChangeHandler = (event) => {
    const inputValue = event.target.value;

    // Modified URL pattern to allow inputs like "chethan.s@idaksh.in"
    const urlPattern = /^(https?:\/\/(www\.)?)?[a-zA-Z0-9\-\.]+\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{1,}$/;

    // Test the input value against the new pattern
    const isValid = urlPattern.test(inputValue);
    if (isValid) {
      setInputURL(inputValue);
      setInputURLValid(isValid);
    } else {
      setInputURL(inputValue);
      setInputURLValid(isValid);
    }
  };

  const usernameChangeHandler = (event) => {
    const inputValue = event.target.value;

    if (inputValue) {
      setInputUserNameValid(true);
      setInputUserName(inputValue);
    } else {
      setInputUserNameValid(false);
      setInputUserName(inputValue);
    }
  };

  const passwordChangeHandler = (event) => {
    const inputValue = event.target.value;
    if (inputValue) {
      setInputPassword(inputValue);
      setInputPasswordValid(true);
    } else {
      setInputPassword(inputValue);
      setInputPasswordValid(false);
    }
  };

  useEffect(() => {
    if (inputURLValid && inputUserNameValid && inputPasswordValid) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [inputURL, inputUserName, inputPassword]);

  const noteChangeHandler = (event) => {
    setInputNote(event.target.value);
  };

  let editedData = [];

  const editButtonHandler = (event) => {
    event.preventDefault();

    if (edit) {
      const storedUserDataJSON = localStorage.getItem("storedUserData");

      if (storedUserDataJSON) {
        // Parse the existing data into an array
        const userDataArray = JSON.parse(storedUserDataJSON);

        // Find the index of the object to edit (based on ID or any other criteria)
        const indexToEdit = userDataArray.findIndex((item) => item.id === id);

        if (indexToEdit !== -1) {
          // Update the properties of the object
          editedData = {
            id: id,
            website: inputURL,
            username: inputUserName,
            password: inputPassword,
            note: inputNote // Include note if needed
          };

          userDataArray[indexToEdit] = editedData;

          // Convert the updated array to a JSON string
          const updatedUserDataJSON = JSON.stringify(userDataArray);

          // Store the updated JSON string in local storage
          localStorage.setItem("storedUserData", updatedUserDataJSON);
        }
      }
    }
    setEdit((props) => !props);
  };

  const deleteButtonHandler = (event) => {
    event.preventDefault();
    const storedUserDataJSON = localStorage.getItem("storedUserData");

    if (storedUserDataJSON) {
      // Parse the existing data into an array
      const userDataArray = JSON.parse(storedUserDataJSON);
      const indexToDelete = userDataArray.findIndex((item) => item.id === id);

      if (indexToDelete !== -1) {
        // Remove the object from the array
        userDataArray.splice(indexToDelete, 1);

        // Convert the updated array to a JSON string
        const updatedUserDataJSON = JSON.stringify(userDataArray);

        // Store the updated JSON string in local storage
        localStorage.setItem("storedUserData", updatedUserDataJSON);
        props.onClose();
      }
    }
  };

  return (
    <Model onClose={props.onClose}>
      <main>
        <h3> {edit == true ? "Edit" : "Manage"} password</h3>
        <form className={classes["password-form"]}>
          <Input
            id="site-url"
            type="url"
            label="Site URL"
            placeholder="example.com"
            siteInput={inputURL}
            readOnly={edit}
            onChange={urlChangeHandler}
            isValid={inputURLValid}
            className={classes.invalid}
          />
          <Input
            id="username"
            type="text"
            label="Username"
            siteInput={inputUserName}
            readOnly={edit}
            onChange={usernameChangeHandler}
            isValid={inputUserNameValid}
            className={classes.invalid}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="******"
            siteInput={inputPassword}
            readOnly={edit}
            value={inputPassword}
            isValid={inputPasswordValid}
            onChange={passwordChangeHandler}
            className={classes.invalid}
          />
          <Textarea
            id="note"
            label="Note"
            placeholder=""
            siteInput={inputNote}
            readOnly={edit}
            onChange={noteChangeHandler}
            isValid={inputNoteValid}
            className={classes.invalid}
          />

          <div className="flex justify-end gap-10">
            <button
              type="submit"
              onClick={editButtonHandler}
              disabled={formValid}
            >
              {!edit && "Edit"}
              {edit && "Submit"}
            </button>
            {!edit && (
              <button
                onClick={deleteButtonHandler}
                type="button"
                className="{classes.cancel}"
              >
                Delete
              </button>
            )}
            <button onClick={props.onClose}>Close</button>
          </div>
        </form>
      </main>
    </Model>
  );
};

export default SinglePasswordItem;
