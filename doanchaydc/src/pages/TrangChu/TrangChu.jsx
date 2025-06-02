// src/pages/TrangChu/TrangChu.jsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';               // Axios instance (baseURL + interceptor)
import '../../styles/MainPost.css';              // CSS đã cung cấp
import images from '../../assets/loadImg';       // Chứa avatar mặc định, v.v.
import moment from 'moment';

export default function MainFeed() {
  /*** 1. Các state chính ***/
  const [posts, setPosts] = useState([]);               // mảng posts
  const [loading, setLoading] = useState(true);         // show loader khi fetch lần đầu
  const [error, setError] = useState('');               // lỗi chung
  const [newContent, setNewContent] = useState('');     // nội dung textarea (post mới)
  const [submitting, setSubmitting] = useState(false);  // trạng thái nút đăng bài
  const [activeTab, setActiveTab] = useState('for_you'); // 'for_you' | 'following'
  const [currentUser, setCurrentUser] = useState(null); // thông tin user hiện tại

  // Lưu comments của mỗi post khi mở rộng
  const [commentsByPost, setCommentsByPost] = useState({});
  // Lưu trạng thái post đang được mở rộng (để show comment)
  const [expandedPostId, setExpandedPostId] = useState(null);
  // Lưu nội dung comment/reply mới (key = `${postId}_${parentId || 'root'}`)
  const [newCommentContent, setNewCommentContent] = useState({});
  // Lưu commentId mà user đang reply (dùng để show form reply ngay dưới comment đó)
  const [replyingTo, setReplyingTo] = useState(null);

  const feedTopRef = useRef(null);

  /*** 2. Lấy thông tin user hiện tại (GET /user/profile) ***/
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get('/user/profile');
        // Giả sử backend trả về { user_id, name, username, avatar_path, ... }
        setCurrentUser(res.data);
      } catch (err) {
        console.error('Không lấy được thông tin user:', err);
      }
    };
    loadProfile();
  }, []);

  /*** 3. Fetch posts khi mount hoặc activeTab thay đổi ***/
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // ============================================================
  // Fetch posts từ backend
  // GET /user/posts?type=for_you  hoặc ?type=following
  // ============================================================
  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/user/posts?type=${activeTab}`);
      // Giả sử Laravel paginate trả về { data: [ ... ], ... }
      if (res.data && Array.isArray(res.data.data)) {
        setPosts(res.data.data);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error('Lỗi khi fetch posts:', err);
      setError('Không tải được bài viết. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // Build nested comments tree từ flat list nếu API trả về flat
  // Nếu API đã trả về nested array (children), bạn có thể bỏ hàm này
  // ============================================================
  const buildCommentsTree = (flatComments) => {
    const map = {};
    const tree = [];

    // Clone từng comment, thêm children = []
    flatComments.forEach((c) => {
      map[c.comment_id] = { ...c, children: [] };
    });

    // Duyệt từng comment, nếu parent_id null => top-level, else gán vào children của parent
    flatComments.forEach((c) => {
      if (c.parent_id) {
        if (map[c.parent_id]) {
          map[c.parent_id].children.push(map[c.comment_id]);
        }
      } else {
        tree.push(map[c.comment_id]);
      }
    });

    return tree;
  };

  // ============================================================
  // Mở rộng / đóng phần bình luận của 1 post
  // Nếu mở mới => fetch comments (nếu chưa fetch)
  // ============================================================
  const handleToggleExpandPost = async (postId) => {
    if (expandedPostId === postId) {
      // Nếu đang mở, bấm lại => đóng
      setExpandedPostId(null);
      return;
    }

    // Mở post đó
    setExpandedPostId(postId);

    // Nếu chưa fetch comments lần nào thì gọi API
    if (!commentsByPost[postId]) {
      try {
        const res = await api.get(`/user/posts/${postId}/comments`);
        // Giả sử backend trả về { data: [ flatCommentArray ] }
        const flatList = res.data.data || [];
        // Build nested tree
        const tree = buildCommentsTree(flatList);
        setCommentsByPost((prev) => ({
          ...prev,
          [postId]: tree,
        }));
      } catch (err) {
        console.error(`Lỗi khi fetch comments của post ${postId}:`, err);
      }
    }
  };

  // ============================================================
  // Thêm 1 bình luận mới (cấp 1 hoặc reply)
  // POST /user/posts/{postId}/comments  với payload { content, parent_id? }
  // ============================================================
  const handleAddComment = async (postId, parentId = null) => {
    const key = `${postId}_${parentId || 'root'}`;
    const content = newCommentContent[key]?.trim();
    if (!content) return;

    try {
      const payload = { content };
      if (parentId) payload.parent_id = parentId;

      const res = await api.post(`/user/posts/${postId}/comments`, payload);
      // Backend trả về comment mới: { comment_id, user, content, parent_id, heart_count, liked, created_at }
      const newComment = res.data;

      // Cập nhật comments_count cho post
      setPosts((prev) =>
        prev.map((p) =>
          p.post_id === postId
            ? { ...p, comments_count: (p.comments_count || 0) + 1 }
            : p
        )
      );

      // Thêm comment mới vào commentsByPost
      setCommentsByPost((prev) => {
        const prevTree = prev[postId] || [];
        if (parentId) {
          // Reply: tìm parent node rồi thêm vào children
          const addReplyRecursively = (nodes) => {
            return nodes.map((node) => {
              if (node.comment_id === parentId) {
                return {
                  ...node,
                  children: [...(node.children || []), { ...newComment, children: [] }],
                };
              } else if (node.children && node.children.length > 0) {
                return { ...node, children: addReplyRecursively(node.children) };
              }
              return node;
            });
          };
          return {
            ...prev,
            [postId]: addReplyRecursively(prevTree),
          };
        } else {
          // Comment cấp 1: prepend vào đầu
          return {
            ...prev,
            [postId]: [{ ...newComment, children: [] }, ...prevTree],
          };
        }
      });

      // Clear input và reset reply nếu có
      setNewCommentContent((prev) => ({ ...prev, [key]: '' }));
      setReplyingTo(null);
    } catch (err) {
      console.error('Lỗi khi thêm comment:', err);
    }
  };

  // ============================================================
  // Toggle “thả tim” (like) cho 1 post
  // POST /user/hearts/toggle  với payload { post_id }
  // ============================================================
  const handleToggleHeart = async (postId) => {
    try {
      await api.post('/user/hearts/toggle', { post_id: postId });
      // Cập nhật state local: toggle liked và tăng/giảm heart_count
      setPosts((prev) =>
        prev.map((p) => {
          if (p.post_id === postId) {
            const wasLiked = p.liked;
            return {
              ...p,
              liked: !wasLiked,
              heart_count: wasLiked ? p.heart_count - 1 : p.heart_count + 1,
            };
          }
          return p;
        })
      );
    } catch (err) {
      console.error('Toggle heart lỗi:', err);
    }
  };

  // ============================================================
  // Toggle “thả tim” (like) cho 1 comment
  // POST /user/comment-hearts/toggle  với payload { comment_id }
  // ============================================================
  const handleToggleCommentHeart = async (postId, commentId) => {
    try {
      await api.post('/user/comment-hearts/toggle', { comment_id: commentId });
      // Cập nhật local state commentsByPost (toggle liked + tăng/giảm heart_count)
      setCommentsByPost((prev) => {
        const updateRecursively = (nodes) => {
          return nodes.map((node) => {
            if (node.comment_id === commentId) {
              const wasLiked = node.liked;
              return {
                ...node,
                liked: !wasLiked,
                heart_count: wasLiked ? node.heart_count - 1 : node.heart_count + 1,
              };
            }
            if (node.children && node.children.length > 0) {
              return { ...node, children: updateRecursively(node.children) };
            }
            return node;
          });
        };
        return {
          ...prev,
          [postId]: updateRecursively(prev[postId] || []),
        };
      });
    } catch (err) {
      console.error('Toggle like comment lỗi:', err);
    }
  };

  return (
    <div className="main-feed-wrapper">
      {/* ========== 1. TAB CHỌN (Dành cho bạn / Đang theo dõi) ========== */}
      <div className="tabs-container">
        <button
          className={`tab-item ${activeTab === 'for_you' ? 'active' : ''}`}
          onClick={() => setActiveTab('for_you')}
        >
          Dành cho bạn
        </button>
        <button
          className={`tab-item ${activeTab === 'following' ? 'active' : ''}`}
          onClick={() => setActiveTab('following')}
        >
          Đang theo dõi
        </button>
      </div>

      {/* ========== 2. CREATE POST (ĐĂNG BÀI) ========== */}
      <div className="create-post-container">
        <div className="create-post-avatar">
          <img
            src={
              currentUser?.avatar_path ||
              images['default_avatar.png'] ||
              'https://via.placeholder.com/40x40'
            }
            alt="Avatar"
          />
        </div>
        <form
          className="create-post-form"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!newContent.trim()) return;
            setError('');
            setSubmitting(true);
            try {
              const payload = { content: newContent.trim(), privacy: 'public' };
              const res = await api.post('/user/posts', payload);
              const createdPost = res.data;
              // Gán thêm user vào post mới
              const postWithUser = {
                ...createdPost,
                user: {
                  user_id: currentUser.user_id,
                  name: currentUser.name,
                  username: currentUser.username,
                  avatar_path: currentUser.avatar_path,
                },
                heart_count: 0,
                comments_count: 0,
                images: createdPost.images || [],
              };
              setPosts((prev) => [postWithUser, ...prev]);
              setNewContent('');
              // Scroll lên đầu feed
              if (feedTopRef.current) {
                feedTopRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            } catch (err) {
              console.error('Đăng bài thất bại:', err);
              setError(
                err.response?.data?.message || 'Đăng bài thất bại. Vui lòng thử lại.'
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <textarea
            className="create-post-input"
            rows="2"
            placeholder="Chuyện gì đang xảy ra?!"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            disabled={submitting}
          />
          <div className="create-post-actions">
            <div className="action-icons">
              <i className="fa-regular fa-image" title="Thêm ảnh"></i>
              <i className="fa-regular fa-face-smile" title="Emoji"></i>
              <i className="fa-solid fa-location-dot" title="Địa điểm"></i>
            </div>
            <button
              type="submit"
              className="create-post-btn"
              disabled={submitting || !newContent.trim()}
            >
              {submitting ? 'Đang đăng…' : 'Đăng'}
            </button>
          </div>
        </form>
        {error && (
          <div className="create-post-error">
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* ========== 3. LOADING & ERROR ========== */}
      {loading && (
        <div className="feed-loading">
          <p>Đang tải bài viết…</p>
        </div>
      )}
      {!loading && error && (
        <div className="feed-error">
          <p>{error}</p>
        </div>
      )}

      {/* ========== 4. DANH SÁCH BÀI VIẾT ========== */}
      <div className="posts-list" ref={feedTopRef}>
        <AnimatePresence>
          {!loading &&
            !error &&
            posts.map((post) => {
              const timeAgo = moment(post.created_at).fromNow();
              const isExpanded = expandedPostId === post.post_id;
              const commentsTree = commentsByPost[post.post_id] || [];

              return (
                <motion.div
                  key={post.post_id}
                  className={`single-post ${isExpanded ? 'expanded' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* ---------- Header của bài viết ---------- */}
                  <div
                    className="post-header"
                    onClick={() => handleToggleExpandPost(post.post_id)}
                  >
                    <img
                      className="post-header-avatar"
                      src={
                        post.user?.avatar_path ||
                        images['default_avatar.png'] ||
                        'https://via.placeholder.com/40x40'
                      }
                      alt="User Avatar"
                    />
                    <div className="post-header-info">
                      <div className="post-author-top">
                        <span className="post-author-name">{post.user?.name}</span>
                        <span className="post-username">
                          @{post.user?.username}
                        </span>
                      </div>
                      <span className="post-time">{timeAgo}</span>
                    </div>
                  </div>

                  {/* ---------- Nội dung text ---------- */}
                  <div
                    className="post-content"
                    onClick={() => handleToggleExpandPost(post.post_id)}
                  >
                    <p>{post.content}</p>
                  </div>

                  {/* ---------- Ảnh nếu có ---------- */}
                  {Array.isArray(post.images) && post.images.length > 0 && (
                    <div className="post-media">
                      {post.images.map((imgUrl, idx) => (
                        <img
                          key={idx}
                          className="post-media-img"
                          src={imgUrl}
                          alt={`Post media ${idx + 1}`}
                          loading="lazy"
                          onClick={() => handleToggleExpandPost(post.post_id)}
                        />
                      ))}
                    </div>
                  )}

                  {/* ---------- Footer: Heart + Comment ---------- */}
                  <div className="post-footer">
                    <div
                      className={`footer-item ${post.liked ? 'liked' : ''}`}
                      onClick={() => handleToggleHeart(post.post_id)}
                    >
                      <i
                        className={
                          post.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
                        }
                      ></i>
                      <span>{post.heart_count || 0}</span>
                    </div>
                    <div
                      className="footer-item"
                      onClick={() => handleToggleExpandPost(post.post_id)}
                    >
                      <i className="fa-regular fa-comment"></i>
                      <span>{post.comments_count || 0}</span>
                    </div>
                  </div>

                  {/* ========== 5. PHẦN BÌNH LUẬN (nếu expanded) ========== */}
                  {isExpanded && (
                    <div className="comments-section">
                      <div className="comments-title">Bình luận</div>

                      {/* --- Form thêm comment cấp 1 --- */}
                      <div className="add-comment-root">
                        <div className="comment-avatar-small">
                          <img
                            src={
                              currentUser?.avatar_path ||
                              images['default_avatar.png']
                            }
                            alt="Avatar"
                          />
                        </div>
                        <textarea
                          className="add-comment-input"
                          rows="1"
                          placeholder="Viết bình luận…"
                          value={newCommentContent[`${post.post_id}_root`] || ''}
                          onChange={(e) =>
                            setNewCommentContent((prev) => ({
                              ...prev,
                              [`${post.post_id}_root`]: e.target.value,
                            }))
                          }
                        />
                        <div className="add-comment-actions">
                          <button
                            className="btn-add-comment"
                            onClick={() => handleAddComment(post.post_id, null)}
                          >
                            Bình luận
                          </button>
                        </div>
                      </div>

                      {/* --- Danh sách comment tree --- */}
                      <div className="comments-list">
                        {commentsTree.length === 0 && (
                          <div className="no-comments">Chưa có bình luận nào.</div>
                        )}
                        {commentsTree.map((comment) => (
                          <CommentItem
                            key={comment.comment_id}
                            comment={comment}
                            postId={post.post_id}
                            depth={0}
                            replyingTo={replyingTo}
                            setReplyingTo={setReplyingTo}
                            newCommentContent={newCommentContent}
                            setNewCommentContent={setNewCommentContent}
                            handleAddComment={handleAddComment}
                            handleToggleCommentHeart={handleToggleCommentHeart}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
}

/*** Component đệ quy để render 1 comment và tất cả children ***/
function CommentItem({
  comment,
  postId,
  depth,
  replyingTo,
  setReplyingTo,
  newCommentContent,
  setNewCommentContent,
  handleAddComment,
  handleToggleCommentHeart,
}) {
  const timeAgo = moment(comment.created_at).fromNow();
  const keyInput = `${postId}_${comment.comment_id}`;
  const isReplying = replyingTo === comment.comment_id;

  return (
    <div className={`comment-item depth-${depth}`}>
      {/* Avatar người comment */}
      <div className="comment-avatar-small">
        <img
          src={
            comment.user?.avatar_path ||
            '/images/default_avatar.png'
          }
          alt="Avatar"
        />
      </div>
      <div className="comment-body">
        <div className="comment-header">
          <span className="comment-author-name">{comment.user.name}</span>
          <span className="comment-username">@{comment.user.username}</span>
          <span className="comment-time"> · {timeAgo}</span>
        </div>
        <div className="comment-content">
          <p>{comment.content}</p>
        </div>
        <div className="comment-footer">
          <div
            className={`comment-footer-item ${comment.liked ? 'liked' : ''}`}
            onClick={() => handleToggleCommentHeart(postId, comment.comment_id)}
          >
            <i
              className={
                comment.liked
                  ? 'fa-solid fa-heart'
                  : 'fa-regular fa-heart'
              }
            ></i>
            <span>{comment.heart_count || 0}</span>
          </div>
          <div
            className="comment-footer-item"
            onClick={() => {
              setReplyingTo(
                comment.comment_id === replyingTo ? null : comment.comment_id
              );
            }}
          >
            <i className="fa-regular fa-reply"></i>
            <span>Trả lời</span>
          </div>
        </div>

        {/* Nếu đang reply, hiển thị form reply */}
        {isReplying && (
          <div className="reply-form">
            <div className="comment-avatar-small">
              <img
                src={
                  comment.user.avatar_path ||
                  '/images/default_avatar.png'
                }
                alt="Avatar"
              />
            </div>
            <textarea
              className="add-comment-input"
              rows="1"
              placeholder="Viết câu trả lời…"
              value={newCommentContent[keyInput] || ''}
              onChange={(e) =>
                setNewCommentContent((prev) => ({
                  ...prev,
                  [keyInput]: e.target.value,
                }))
              }
            />
            <div className="reply-actions">
              <button
                className="btn-add-comment"
                onClick={() => handleAddComment(postId, comment.comment_id)}
              >
                Gửi
              </button>
              <button
                className="btn-cancel-reply"
                onClick={() => setReplyingTo(null)}
              >
                Huỷ
              </button>
            </div>
          </div>
        )}

        {/* Render children (nếu có) */}
        {Array.isArray(comment.children) &&
          comment.children.map((child) => (
            <CommentItem
              key={child.comment_id}
              comment={child}
              postId={postId}
              depth={depth + 1}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              newCommentContent={newCommentContent}
              setNewCommentContent={setNewCommentContent}
              handleAddComment={handleAddComment}
              handleToggleCommentHeart={handleToggleCommentHeart}
            />
          ))}
      </div>
    </div>
  );
}
