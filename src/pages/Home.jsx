import React, { useState, useEffect } from "react";
import postService from "../appwrite/postService.js";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    postService.getPostList().then((posts) => {
      console.log(posts)
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  console.log(posts)
  if (posts?.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1>No Posts</h1>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts &&
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
