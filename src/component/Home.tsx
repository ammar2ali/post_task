//@ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTypedSelector } from "../store";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useTypedSelector((state: any) => state.authReducer.user);

  useEffect(() => {
    if (!(user && Object.keys(user).length)) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    axios
      .get("https://65d087bfab7beba3d5e345c5.mockapi.io/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div>
      <h1>Posts listing</h1>
      {loading ? (
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Loading....
        </h2>
      ) : (
        posts.map((post, index) => (
          <div key={post.id + index}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => navigate("/AddPost")}
          style={{ padding: "10px 15px", borderRadius: "10px" }}
        >
          Add Post
        </button>
      </div>
    </div>
  );
};

export default Home;
