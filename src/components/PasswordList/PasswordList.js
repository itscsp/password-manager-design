import AvailablePassword from "./AvailablePassword";
import classes from "./PasswordList.module.css";

import { StrictMode } from "react";
const PasswordList = () => {
  return (
    <StrictMode>
      <h3 className={classes.heading}>Recently Saved Passwords</h3>
      <AvailablePassword />
    </StrictMode>
  );
};

export default PasswordList;
