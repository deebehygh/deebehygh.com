import React, { useState } from 'react';
import { createPost } from '../services/Api';

import '../css/PostForms.css'

const PostForm = ({ token }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = () => {
    createPost(title, content, token)
      .then(res => {
        setResponse('Successfully posted!');
        setTitle('');
        setContent('');
        if (response) {
          setTimeout(() => {
            setResponse("");
          }, 5000);
        }
      })
      .catch(error => {
        console.log('Error creating post', error);
        setResponse(error.response);
      });
  };

  return (
    <div className='createPost'>
      <h1>Create a Post</h1>
      <p className='sometext'>Title:</p>
      <input
      className='postTit'
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p className='sometext'>Content:</p>
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Create Post</button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default PostForm;