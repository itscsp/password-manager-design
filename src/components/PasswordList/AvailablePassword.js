import { useState } from "react";
import { StrictMode } from "react";
import classes from "./AvailablePassword.module.css";
import SinglePasswordItem from "./SinglePasswordItem";

const DUMMY_PASSWORD = [
  {
    id: "p1",
    website: "apple.com",
    username: "user123",
    password: "password123"
  },
  {
    id: "p2",
    website: "google.com",
    username: "user123",
    password: "password123"
  },
  {
    id: "p3",
    website: "microsoft.com",
    username: "user123",
    password: "password123"
  },
  {
    id: "p4",
    website: "x.com",
    username: "user123",
    password: "password123"
  }
];

function DynamicFavicon({ website }) {
  const faviconUrl = `https://www.google.com/s2/favicons?sz=256&domain_url=${website}`;

  return <img width="24" height="24" src={faviconUrl} alt="Favicon" />;
}

const AvailablePassword = (props) => {
  const [formIsShow, setFormIsShow] = useState(false);

  const showFormHandler = () => {
    setFormIsShow(true);
  };

  const hideFormHandler = () => {
    setFormIsShow(false);
  };

  const passwordItem = DUMMY_PASSWORD.map((pass) => (
    <div
      onClick={showFormHandler}
      key={pass.id}
      className={classes.cardWrapper}
    >
      <p>
        <DynamicFavicon website={pass.website} />
        <span id="website">{pass.website}</span>
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#5F6368"
      >
        <path d="m10 7 5 5-5 5z" />
      </svg>
    </div>
  ));

  return (
    <StrictMode>
      <div className={classes.card}>{passwordItem}</div>
      {formIsShow && <SinglePasswordItem onClose={hideFormHandler} />}
    </StrictMode>
  );
};

export default AvailablePassword;
