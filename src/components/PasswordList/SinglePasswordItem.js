import Model from "../UI/Model";
import classes from "./SinglePasswordItem.module.css";
const SinglePasswordItem = (props) => {
  return (
    <Model onClose={props.onClose}>
      <main>
        <h3>Manage Password</h3>
        <form className={classes["password-form"]}>
          <div className={classes.flex}>
            <div className={classes["flex-child"]}>
              <label htmlFor="site-url">Site URL</label>
              <input id="site-url" placeholder="example.com"></input>
            </div>
            <div className={classes["flex-child"]}>
              <label htmlFor="username">Username</label>
              <input id="username" placeholder="username"></input>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" placeholder="******"></input>
            </div>
            <div>
              <label htmlFor="note">Note</label>
              <textarea
                id="note"
                placeholder="Write your note here..."
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end gap-10">
            <button type="submit">Edit</button>
            <button
              onClick={props.onClose}
              type="button"
              className="{classes.cancel}"
            >
              Delete
            </button>
            <button onClick={props.onClose}>Close</button>
          </div>
        </form>
      </main>
    </Model>
  );
};

export default SinglePasswordItem;
