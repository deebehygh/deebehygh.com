import PostForm from '../components/PostForm';

export default function AdminDashboard({ token }) {
  return (
    <div>
      <h1>Admin Page</h1>
      <PostForm token={token} />
    </div>
  );
}
