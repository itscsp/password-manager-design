import Model from "../UI/Model";
import classes from "./AddPassword.module.css";

const AddPassword = (props) => {
  return (
    <Model onClose={props.onClose}>
      <h3 slot="title" id="title" class="dialog-title">
        Add new password
      </h3>
      <main>
        <form className={classes["password-form"]}>
          <div>
            <label for="site-url">Site URL</label>
            <input id="site-url" placeholder="example.com"></input>
          </div>
          <div>
            <label for="username">Username</label>
            <input id="username" placeholder="username"></input>
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" placeholder="******"></input>
          </div>
          <div>
            <label for="note">Note</label>
            <textarea
              id="note"
              placeholder="Write your note here..."
            ></textarea>
          </div>
          <div className="flex justify-end gap-10">
            <button type="submit">Save</button>
            <button
              onClick={props.onClose}
              type="button"
              className="{classes.cancel}"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </Model>
  );
};

export default AddPassword;
