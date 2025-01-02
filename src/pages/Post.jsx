import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/postService.js";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    console.log(slug);
    if (slug) {
      postService.getPost(slug).then((post) => {
        console.log(post);
        postService.filePreview(post.blog_image).then((res) => {
          setImageSrc(res);
        });
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    postService.deletePost(post.$id).then((status) => {
      console.log(status);
      if (status) {
        postService.deleteImage(post.blog_image);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-start mb-4 relative border rounded-xl p-2">
          <img
            style={{
              width: "250px",
              borderRadius: "12px",
              height: "48px",
            }}
            src={imageSrc}
            alt={post.title}
            className="rounded-xl h-12"
          />

          {isAuthor && (
            <div className="absolute right-6 top-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-1">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
