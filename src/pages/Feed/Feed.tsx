import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import AuthModal from "../../components/AuthModal/AuthModal";
import styles from "./Feed.module.css";

export default function Feed({ isAuthenticated, setIsAuthenticated }: FeedProps) {
  // const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<string[]>([]);
  const [newPost, setNewPost] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Guard helper: if unauthenticated, open modal and abort action
  const requireAuth = (action: () => void) => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }
    action();
  };

  const publish = () =>
    requireAuth(() => {
      if (!newPost.trim()) return;
      setPosts((p) => [newPost.trim(), ...p]);
      setNewPost("");
    });

  // Example "other" buttons — alert only
  const notImplemented = () =>
    alert("Function not implemented");

  return (
    <div className={styles.container}>
      <h2>Feed</h2>

      <div className={styles.editor}>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          onFocus={() => { if (!isAuthenticated) setShowModal(true); }} // ANY interaction -> modal
        />
        <button onClick={publish}>Publish</button>
        {/* Other editor actions (show alert) */}
        <button onClick={notImplemented}>Attach</button>
        <button onClick={notImplemented}>Emoji</button>
      </div>

      <div className={styles.posts}>
        {posts.map((post, i) => (
          <article key={i} className={styles.post}>
            <p>{post}</p>
            <div className={styles.postActions}>
              <button onClick={notImplemented}>Like</button>
              <button onClick={notImplemented}>Comment</button>
              <button onClick={notImplemented}>Share</button>
            </div>
          </article>
        ))}
      </div>

      {showModal && <AuthModal onClose={() => setShowModal(false)} setIsAuthenticated={setIsAuthenticated} />}
    </div>
  );
}
