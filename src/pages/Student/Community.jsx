import React, { useState } from "react";
import {
  FiUsers,
  FiPlus,
  FiThumbsUp,
  FiMessageCircle,
  FiShare2,
  FiFlag,
  FiBookmark,
  FiMoreVertical,
} from "react-icons/fi";
import "./Student.css";

const Community = () => {
  const [activeView, setActiveView] = useState("communities"); // communities | posts
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [likedPosts, setLikedPosts] = useState([1, 5, 8]);

  // Static communities data
  const communities = [
    {
      id: 1,
      name: "Mindfulness & Meditation",
      description:
        "A space for sharing meditation techniques, mindfulness practices, and peaceful moments.",
      members: 1234,
      posts: 456,
      icon: "🧘",
      color: "#a29bfe",
      joined: true,
    },
    {
      id: 2,
      name: "Student Wellness Hub",
      description:
        "Connect with fellow students, share experiences, and support each other's mental health journey.",
      members: 2456,
      posts: 892,
      icon: "🎓",
      color: "#74b9ff",
      joined: true,
    },
    {
      id: 3,
      name: "Anxiety Support Group",
      description:
        "A safe space to discuss anxiety, coping strategies, and find support from others who understand.",
      members: 987,
      posts: 345,
      icon: "💙",
      color: "#00b894",
      joined: false,
    },
    {
      id: 4,
      name: "Gratitude Circle",
      description:
        "Share what you're grateful for each day and spread positivity within the community.",
      members: 1567,
      posts: 678,
      icon: "🙏",
      color: "#feca57",
      joined: true,
    },
    {
      id: 5,
      name: "Creative Expression",
      description:
        "Express yourself through art, music, writing, and other creative outlets. All forms welcome!",
      members: 892,
      posts: 234,
      icon: "🎨",
      color: "#ff6b6b",
      joined: false,
    },
    {
      id: 6,
      name: "Fitness & Wellness",
      description:
        "Discuss physical wellness, exercise routines, healthy habits, and their impact on mental health.",
      members: 1789,
      posts: 567,
      icon: "💪",
      color: "#ee5a6f",
      joined: false,
    },
  ];

  // Static posts data
  const posts = [
    {
      id: 1,
      communityId: 2,
      communityName: "Student Wellness Hub",
      author: "Sarah Johnson",
      authorAvatar: "SJ",
      content:
        "Just wanted to share that I've been using the mood logging feature for 2 weeks now and it's really helping me understand my emotional patterns. Highly recommend staying consistent with it! 💙",
      likes: 45,
      comments: 12,
      time: "2 hours ago",
      pinned: true,
    },
    {
      id: 2,
      communityId: 1,
      communityName: "Mindfulness & Meditation",
      author: "Alex Chen",
      authorAvatar: "AC",
      content:
        "Started my day with a 10-minute meditation session. Feeling so much more centered and ready to take on the day. What's your morning routine? 🧘‍♀️",
      likes: 67,
      comments: 23,
      time: "4 hours ago",
      pinned: false,
    },
    {
      id: 3,
      communityId: 4,
      communityName: "Gratitude Circle",
      author: "Maya Patel",
      authorAvatar: "MP",
      content:
        "Today I'm grateful for: ☀️ Beautiful weather, 📚 A good book, 👨‍👩‍👧 Family time, 🎵 My favorite music. What are you grateful for today?",
      likes: 89,
      comments: 34,
      time: "5 hours ago",
      pinned: false,
    },
    {
      id: 4,
      communityId: 2,
      communityName: "Student Wellness Hub",
      author: "Jordan Lee",
      authorAvatar: "JL",
      content:
        "Does anyone else struggle with Sunday anxiety? That feeling of dread about the upcoming week? Looking for some coping strategies that have worked for you all.",
      likes: 34,
      comments: 28,
      time: "6 hours ago",
      pinned: false,
    },
    {
      id: 5,
      communityId: 1,
      communityName: "Mindfulness & Meditation",
      author: "Emma Rodriguez",
      authorAvatar: "ER",
      content:
        "Sharing a breathing exercise that helped me during a stressful moment today: 4-7-8 technique. Breathe in for 4, hold for 7, exhale for 8. Repeat 4 times. Works wonders! 🌬️",
      likes: 112,
      comments: 19,
      time: "8 hours ago",
      pinned: true,
    },
    {
      id: 6,
      communityId: 4,
      communityName: "Gratitude Circle",
      author: "David Kim",
      authorAvatar: "DK",
      content:
        "Grateful for this community and all the support you all provide. It's amazing to have a space where we can be vulnerable and authentic. Thank you all! 🙏",
      likes: 156,
      comments: 42,
      time: "10 hours ago",
      pinned: false,
    },
    {
      id: 7,
      communityId: 2,
      communityName: "Student Wellness Hub",
      author: "Lisa Zhang",
      authorAvatar: "LZ",
      content:
        "Just aced my presentation that I was super anxious about! Remember: You're more capable than you think. Believe in yourself! 💪✨",
      likes: 203,
      comments: 56,
      time: "12 hours ago",
      pinned: false,
    },
    {
      id: 8,
      communityId: 1,
      communityName: "Mindfulness & Meditation",
      author: "Marcus Thompson",
      authorAvatar: "MT",
      content:
        "New to meditation. Any app recommendations or guided meditation resources for beginners? Would love your suggestions! 🙏",
      likes: 23,
      comments: 31,
      time: "14 hours ago",
      pinned: false,
    },
  ];

  const handleJoinCommunity = (communityId) => {
    alert("Joined community successfully!");
  };

  const handleExitCommunity = (communityId) => {
    if (window.confirm("Are you sure you want to exit this community?")) {
      alert("Left community successfully!");
    }
  };

  const handleLikePost = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    alert("Post created successfully!");
    setPostContent("");
    setShowCreatePost(false);
  };

  const handleReportPost = (post) => {
    setReportTarget(post);
    setShowReportModal(true);
  };

  const handlePinPost = (postId) => {
    alert("Post pinned successfully!");
  };

  const myPosts = posts.filter((post) => post.author === "Sarah Johnson");
  const joinedCommunityIds = communities
    .filter((c) => c.joined)
    .map((c) => c.id);
  const filteredPosts = posts.filter((post) =>
    joinedCommunityIds.includes(post.communityId)
  );

  return (
    <div className="student-container">
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "24px 28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", margin: 0 }}>
            Community
          </h2>
          <p style={{ color: "#888", marginTop: "6px", fontSize: "14px" }}>
            Connect, share, and support each other
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            className={`btn ${
              activeView === "communities" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setActiveView("communities")}
          >
            <FiUsers /> Communities
          </button>
          <button
            className={`btn ${
              activeView === "posts" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setActiveView("posts")}
          >
            <FiMessageCircle /> Posts
          </button>
        </div>
      </div>

      {/* Communities View */}
      {activeView === "communities" && (
        <div className="community-grid">
          {communities.map((community) => (
            <div key={community.id} className="community-card">
              <div className="community-header">
                <div
                  className="community-avatar"
                  style={{ background: community.color }}
                >
                  {community.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="community-name">{community.name}</div>
                  <div className="community-members">
                    {community.members} members · {community.posts} posts
                  </div>
                </div>
              </div>
              <div className="community-description">
                {community.description}
              </div>
              <div className="community-actions">
                {community.joined ? (
                  <>
                    <button
                      className="btn btn-secondary"
                      style={{ flex: 1 }}
                      onClick={() => handleExitCommunity(community.id)}
                    >
                      Exit
                    </button>
                    <button
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                      onClick={() => {
                        setSelectedCommunity(community);
                        setShowCreatePost(true);
                      }}
                    >
                      <FiPlus /> Post
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    onClick={() => handleJoinCommunity(community.id)}
                  >
                    Join Community
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Posts View */}
      {activeView === "posts" && (
        <div>
          {/* Create Post Button */}
          <div style={{ marginBottom: "24px" }}>
            <button
              className="btn btn-primary"
              onClick={() => setShowCreatePost(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                justifyContent: "center",
                padding: "16px",
              }}
            >
              <FiPlus /> Create New Post
            </button>
          </div>

          {/* Posts List */}
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              {post.pinned && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: "#00c7b7",
                    fontWeight: "600",
                    marginBottom: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  <FiBookmark /> Pinned Post
                </div>
              )}

              <div className="post-header">
                <div className="post-avatar">{post.authorAvatar}</div>
                <div style={{ flex: 1 }}>
                  <div className="post-author">{post.author}</div>
                  <div className="post-time">
                    {post.communityName} · {post.time}
                  </div>
                </div>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "8px",
                    color: "#888",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f9f9f9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "none")
                  }
                >
                  <FiMoreVertical size={20} />
                </button>
              </div>

              <div className="post-content">{post.content}</div>

              <div className="post-actions">
                <button
                  className={`post-action-btn ${
                    likedPosts.includes(post.id) ? "active" : ""
                  }`}
                  onClick={() => handleLikePost(post.id)}
                >
                  <FiThumbsUp />
                  {likedPosts.includes(post.id)
                    ? post.likes + 1
                    : post.likes}
                </button>

                <button className="post-action-btn">
                  <FiMessageCircle />
                  {post.comments}
                </button>

                <button className="post-action-btn">
                  <FiShare2 />
                  Share
                </button>

                <button
                  className="post-action-btn"
                  onClick={() => handleReportPost(post)}
                >
                  <FiFlag />
                  Report
                </button>

                {post.author === "Sarah Johnson" && (
                  <button
                    className="post-action-btn"
                    onClick={() => handlePinPost(post.id)}
                  >
                    <FiBookmark />
                    Pin
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">💬</div>
              <div className="empty-state-title">No posts yet</div>
              <div className="empty-state-message">
                Join a community and start engaging with others
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create Post Modal */}
      {showCreatePost && (
        <div
          className="modal-overlay"
          onClick={() => setShowCreatePost(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create Post</h3>
              <button
                className="modal-close"
                onClick={() => setShowCreatePost(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreatePost}>
              <div className="modal-body">
                {selectedCommunity && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px",
                      background: "#f9f9f9",
                      borderRadius: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: selectedCommunity.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                      }}
                    >
                      {selectedCommunity.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#222",
                        }}
                      >
                        {selectedCommunity.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#888" }}>
                        Posting as Sarah Johnson
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">What's on your mind?</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Share your thoughts, experiences, or ask a question..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    required
                    style={{ minHeight: "150px" }}
                  />
                </div>

                <div
                  style={{
                    padding: "16px",
                    background: "#f0f9ff",
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: "#0369a1",
                    lineHeight: "1.6",
                  }}
                >
                  💡 Remember to be respectful and supportive. Our community
                  thrives on kindness and understanding.
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreatePost(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <FiPlus /> Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && reportTarget && (
        <div
          className="modal-overlay"
          onClick={() => setShowReportModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Report Post</h3>
              <button
                className="modal-close"
                onClick={() => setShowReportModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: "15px", color: "#666", marginBottom: "20px" }}>
                Please select a reason for reporting this post:
              </p>

              <div style={{ display: "grid", gap: "12px" }}>
                {[
                  "Inappropriate content",
                  "Spam or misleading",
                  "Harassment or bullying",
                  "Hate speech",
                  "Violence or dangerous content",
                  "Other",
                ].map((reason) => (
                  <label
                    key={reason}
                    style={{
                      padding: "16px",
                      border: "2px solid #e0e0e0",
                      borderRadius: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#00c7b7";
                      e.currentTarget.style.background = "#f9f9f9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e0e0e0";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <input type="radio" name="reportReason" value={reason} />
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      {reason}
                    </span>
                  </label>
                ))}
              </div>

              <div className="form-group" style={{ marginTop: "20px" }}>
                <label className="form-label">
                  Additional details (optional)
                </label>
                <textarea
                  className="form-textarea"
                  placeholder="Provide more context about why you're reporting this post..."
                />
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowReportModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  alert("Post reported successfully. Thank you for helping keep our community safe.");
                  setShowReportModal(false);
                }}
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;

