import { useState } from "react";
import "./styles.css";
import Header from "./components/Layout/Header";
import PasswordList from "./components/PasswordList/PasswordList";
import AddPassword from "./components/Addpassword/AddPassword";

export default function App() {
  const [formIsShow, setFormIsShow] = useState(false);

  const showFormHandler = () => {
    setFormIsShow(true);
  };

  const hideFormHandler = () => {
    setFormIsShow(false);
  };

  return (
    <div className="container">
      {formIsShow && <AddPassword onClose={hideFormHandler} />}
      <Header onClick={showFormHandler} />
      <PasswordList />
    </div>
  );
}
