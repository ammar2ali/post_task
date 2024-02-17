//@ts-nocheck
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../store";

const AddPost = () => {
  const navigate = useNavigate();
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const { user } = useTypedSelector((state: any) => state.authReducer.user);

  useEffect(() => {
    if (!(user && Object.keys(user).length)) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [user]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("https://65d087bfab7beba3d5e345c5.mockapi.io/posts", {
        title,
        body,
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Add Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea
              rows="6"
              cols="60"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            style={{ padding: "10px 15px", borderRadius: "10px" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
