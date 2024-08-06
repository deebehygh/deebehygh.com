import PostForm from '../components/Admin/PostForm';

export default function AdminDashboard({ profile, token }) {
  return (
    <div>
      <PostForm profile={profile} token={token} />
    </div>
  );
}
