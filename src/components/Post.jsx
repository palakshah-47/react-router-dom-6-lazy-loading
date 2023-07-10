import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { User } from "./User";

export default function Post() {
  const navigate = useNavigate();
  let { id } = useParams();

  // Store the post in the component state
  const [post, setPost] = useState(null);

  // Set loading as true by default.
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    let { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    // Set loading to false since the data has been receieved
    // from the API
    setLoading(false);

    setPost(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      {loading && "Post Loading...Please wait."}

      {post && (
        <div>
          <h1>{post.title}</h1>
          <User id={post.userId} />
          <p>{post.body}</p>
          <button onClick={() => navigate("/posts")}>Back</button>
        </div>
      )}
    </>
  );
}
