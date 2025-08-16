import { useState } from "react";
import AuthModal from "../../components/AuthModal/AuthModal";
import styles from "./Feed.module.css";
import Snackbar from "../../components/Snackbar/Snackbar";

type FeedProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
};

export default function Feed({ isAuthenticated, setIsAuthenticated }: FeedProps) {
  const [posts, setPosts] = useState<string[]>([]);
  const [newPost, setNewPost] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [snackbar, setSnackbar] = useState<string | null>(null);

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
      setSnackbar("✅ Post added successfully!");
    });

  const notImplemented = () => setSnackbar("⚠️ Function not implemented");

  return (
    <div className={styles.container}>
      {/* Post Composer */}
      <div className={styles.editor}>
        <div className={styles["editor-toolbar"]}>
          <span>Paragraph</span>
          <div>
            <button onClick={notImplemented}><b>B</b></button>
            <button onClick={notImplemented}><i>I</i></button>
            <button onClick={notImplemented}><u>U</u></button>
            <button onClick={notImplemented}>• List</button>
            <button onClick={notImplemented}>1. List</button>
            <button onClick={notImplemented}>{`</>`}</button>
            <button onClick={notImplemented} style={{ color: "red" }}>🗑</button>
          </div>
        </div>

        <textarea
          placeholder="How are you feeling today?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          onFocus={() => {
            if (!isAuthenticated) setShowModal(true);
          }}
           onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      publish();
    }
  }}
        />

        <div className={styles["editor-footer"]}>
          <div className={styles.icons}>
            <span onClick={notImplemented}>➕</span>
            <span onClick={notImplemented}>😊</span>
            <span onClick={notImplemented}>📎</span>
          </div>
          <button onClick={publish}>➤</button>
        </div>
      </div>

      {/* Posts */}
      <div className={styles.posts}>
        {posts.map((post, i) => (
          <article key={i} className={styles.post}>
            <div className={styles.postHeader}>
              <img
                src={`https://i.pravatar.cc/150?img=${i + 1}`}
                alt="avatar"
              />
              <div>
                <h4>User {i + 1}</h4>
                <span>Just now</span>
              </div>
            </div>

            <p>{post}</p>

            <div className={styles.postActions}>
              <button onClick={notImplemented}>❤️ Like</button>
              <button onClick={notImplemented}>💬 Comment</button>
              <button onClick={notImplemented}>↗ Share</button>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <AuthModal
    onClose={() => setShowModal(false)}
    setIsAuthenticated={setIsAuthenticated}
    setSnackbar={(msg) => {
      setSnackbar(msg);
    }}
  />
      )}

        {snackbar && (
        <Snackbar message={snackbar} onClose={() => setSnackbar(null)} />
      )}
    </div>
  );
}
