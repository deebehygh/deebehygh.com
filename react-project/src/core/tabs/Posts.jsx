import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { getPosts } from "../services/Api";

import "../css/Posts.css";
import "bootstrap/dist/css/bootstrap.css";

export function HandlePost() {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(-1);
  const handleClose = () => setShow(-1);
  const handleShow = (id) => setShow(id);
  const img = (
    <img
      className="verified"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABS0lEQVR4nOXVPUseQRiF4SvEVEKwSRFBAxZaSEqJxduKnQZBG20CKVKkkGAnWCRt2iAE/4D48Q+UVGKR0kabFCIqJNUbA0HMysIIyzK7zroRAjlwit1n9j7D7Dwz/E96h1McYuJvAJ8G51pAVvAvjOIBnqGvKfwT/gTYCS5LAbm7+F4IfJUKH4vAsgT/xMOUgOk7BmR4khLw8r4CerCMHy0CjjBXFbDaELaBfnyL1OZjAecN4Y/Qwe9IfTsWsBMZuIcvNfBuxQTexwKGcVYa+DrANsLzZgJ8H71V/+FNpJk6AbqYAM/9vG4nbVV0bCfUb4Nn4cyKKu/Ci4qPuvicAM+9WxWQH1zHLXogC16vW6LJhts1K/kAQ3UBN0s1gg+J0CvMYlBDPa5oorK/aqGPBVB+5q9grXBX5LOf0VJTeIuBwrtxLOFFW/i/r2tRWPy9VfDqcwAAAABJRU5ErkJggg=="
    />
  );

  useEffect(() => {
    getPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving posts", error);
        setPosts('No Posts')
      });
  }, []);

  return (
    <>
      <article>
        <ul className="postlist">
          {posts == null ? <p>No posts</p> : posts.map((post, index) => (
            <>
              <li
                className="myposts"
                key={index}
                onClick={() => handleShow(index)}
              >
                <h2>{post.title}</h2>
                <p className="cxt">{post.content}</p>
                <div className="admin-user-badge">
                  <img
                    className="adminpfp"
                    src="https://yt3.googleusercontent.com/7x2-0ytnmRutv5id2TmfD71IaPzQyVoJPC4keywIsMg-66zqL8FyLZsdylvImFDM-EGZNTdgXQ=s160-c-k-c0x00ffffff-no-rj"
                    alt="Desmond Ward"
                  />
                  <p>DeeBeHygh</p>
                </div>
              </li>
              <div
                style={{ display: "block", position: "center" }}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal
                  key={index}
                  show={show == index}
                  onHide={handleClose}
                  animation={true}
                  aria-labelledby="contained-modal-title-vcenter"
                  size="lg"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title style={{ textAlign: "center" }}>
                      {post.title}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{post.content}</Modal.Body>
                  <Modal.Footer>
                    <Modal.Dialog>Uploaded by DeeBeHygh {img}</Modal.Dialog>
                  </Modal.Footer>
                </Modal>
              </div>
            </>
          ))}
        </ul>
      </article>
    </>
  );
}

