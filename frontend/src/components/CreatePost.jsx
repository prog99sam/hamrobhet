import React, { useMemo, useRef, useState } from "react";
import "../styles/CreatePost.css";

const TIPS = [
  { icon: "🗓️", text: "Post regularly to stay in your supporters' feed." },
  { icon: "🔓", text: "Mix free + exclusive content to attract new fans." },
  { icon: "💬", text: "Engage with supporters in the comments." },
];

const MAX_VIDEO_SECONDS = 5 * 60;

function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return "";
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function getMediaType(file) {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  if (file.type.startsWith("audio/")) return "audio";
  return null;
}

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [postType, setPostType] = useState("free");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [mediaError, setMediaError] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [saveState, setSaveState] = useState("idle");
  const fileInputRef = useRef(null);

  const creator = {
    name: "Sajan Shrestha",
    username: "sajanshrestha",
    avatar: "https://i.pravatar.cc/100?img=68",
  };

  const contentPreview = useMemo(() => {
    const trimmed = content.trim();
    if (!trimmed) return "Your post content will appear here as you write.";
    return trimmed.length > 220 ? `${trimmed.slice(0, 220)}…` : trimmed;
  }, [content]);

  function addMediaItem(item) {
    setMedia((prev) => [...prev, item]);
  }

  function addFiles(fileList) {
    const files = Array.from(fileList);
    setMediaError("");

    files.forEach((file) => {
      const type = getMediaType(file);
      if (!type) {
        setMediaError("Only image, video, or audio files can be uploaded.");
        return;
      }

      const url = URL.createObjectURL(file);
      const id = `${Date.now()}-${Math.random()}`;

      if (type === "video") {
        const probe = document.createElement("video");
        probe.preload = "metadata";
        probe.src = url;
        probe.onloadedmetadata = () => {
          if (probe.duration > MAX_VIDEO_SECONDS) {
            setMediaError(`"${file.name}" is longer than 5 minutes. Trim it and try again.`);
            URL.revokeObjectURL(url);
            return;
          }
          addMediaItem({ id, type, src: url, name: file.name, duration: probe.duration });
        };
      } else {
        addMediaItem({ id, type, src: url, name: file.name });
      }
    });
  }

  function handleFileInput(e) {
    if (e.target.files?.length) addFiles(e.target.files);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  }

  function removeMedia(id) {
    setMedia((prev) => {
      const target = prev.find((m) => m.id === id);
      if (target) URL.revokeObjectURL(target.src);
      return prev.filter((m) => m.id !== id);
    });
  }

  function addTag(raw) {
    const cleaned = raw.trim().replace(/^#/, "").replace(/\s+/g, "");
    if (!cleaned) return;
    setTags((prev) => (prev.includes(cleaned) ? prev : [...prev, cleaned]));
    setTagInput("");
  }

  function handleTagKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags((prev) => prev.slice(0, -1));
    }
  }

  function removeTag(tag) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function handleSaveDraft() {
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2000);
  }

  function handlePublish(e) {
    e.preventDefault();
    // Placeholder — wire to backend as needed.
  }

  return (
    <div className="cp-page">
      <div className="cp-wrap">
        {/* HEADER */}
        <header className="cp-header">
          <div className="cp-header__shapes" aria-hidden="true">
            <span className="cp-shape cp-shape--a" />
            <span className="cp-shape cp-shape--b" />
            <span className="cp-shape cp-shape--c" />
          </div>
          <div className="cp-header__content">
            <span className="cp-badge">Posting builds your income</span>
            <h1>Create a new post</h1>
            <p>Share updates, stories, or exclusive content with your supporters.</p>
          </div>
        </header>

        <form className="cp-grid" onSubmit={handlePublish}>
          {/* LEFT — EDITOR */}
          <section className="cp-editor">
            <div className="cp-card">
              <label className="cp-label" htmlFor="post-title">
                Post title
              </label>
              <input
                id="post-title"
                className="cp-title-input"
                type="text"
                placeholder="Give your post a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="cp-type-row">
                <button
                  type="button"
                  className={`cp-pill ${postType === "free" ? "cp-pill--active" : ""}`}
                  onClick={() => setPostType("free")}
                >
                  🌱 Free Post
                </button>
                <button
                  type="button"
                  className={`cp-pill cp-pill--exclusive ${
                    postType === "exclusive" ? "cp-pill--active" : ""
                  }`}
                  onClick={() => setPostType("exclusive")}
                >
                  🔒 Exclusive (Paid)
                </button>
              </div>

              <label className="cp-label" htmlFor="post-content">
                Content
              </label>
              <textarea
                id="post-content"
                className="cp-content-area"
                placeholder="Write something meaningful to your supporters..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
              />

              <label className="cp-label">Media</label>
              <div
                className={`cp-dropzone ${isDragging ? "cp-dropzone--active" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="cp-dropzone__icon">🖼️</span>
                <p>
                  <strong>Drag & drop photos, video, or audio</strong> or click to upload
                </p>
                <span className="cp-dropzone__hint">
                  Images & audio up to 10MB · Videos up to 5 minutes
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*,audio/*"
                  multiple
                  className="cp-dropzone__input"
                  onChange={handleFileInput}
                />
              </div>

              {mediaError && <p className="cp-media-error">⚠ {mediaError}</p>}

              {media.length > 0 && (
                <div className="cp-thumb-grid">
                  {media.map((item) => (
                    <div className={`cp-thumb cp-thumb--${item.type}`} key={item.id}>
                      {item.type === "image" && <img src={item.src} alt="" />}

                      {item.type === "video" && (
                        <>
                          <video src={item.src} muted />
                          <span className="cp-thumb__play">▶</span>
                          {item.duration != null && (
                            <span className="cp-thumb__duration">
                              {formatDuration(item.duration)}
                            </span>
                          )}
                        </>
                      )}

                      {item.type === "audio" && (
                        <div className="cp-thumb__audio">
                          <span className="cp-thumb__audio-icon">🎵</span>
                          <span className="cp-thumb__audio-name">{item.name}</span>
                        </div>
                      )}

                      <button
                        type="button"
                        className="cp-thumb__remove"
                        onClick={() => removeMedia(item.id)}
                        aria-label="Remove media"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="cp-label" htmlFor="post-tags">
                Tags <span className="cp-label__optional">(optional)</span>
              </label>
              <div className="cp-tags-input">
                {tags.map((tag) => (
                  <span className="cp-tag-chip" key={tag}>
                    #{tag}
                    <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                      ✕
                    </button>
                  </span>
                ))}
                <input
                  id="post-tags"
                  type="text"
                  placeholder={tags.length ? "" : "#art #music #tech"}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  onBlur={() => addTag(tagInput)}
                />
              </div>
            </div>

            <div className="cp-publish-bar">
              <button
                type="button"
                className="cp-btn cp-btn--draft"
                onClick={handleSaveDraft}
              >
                {saveState === "saved" ? "Draft saved ✓" : "Save Draft"}
              </button>
              <button type="submit" className="cp-btn cp-btn--publish">
                Publish Post
              </button>
            </div>
          </section>

          {/* RIGHT — PREVIEW + TIPS */}
          <aside className="cp-side">
            <div className="cp-card cp-preview-card">
              <p className="cp-side-label">Live preview</p>

              <div className="cp-feed-post">
                <div className="cp-feed-post__head">
                  <img src={creator.avatar} alt={creator.name} />
                  <div>
                    <p className="cp-feed-post__name">{creator.name}</p>
                    <p className="cp-feed-post__handle">@{creator.username}</p>
                  </div>
                  {postType === "exclusive" && (
                    <span className="cp-feed-post__lock" title="Exclusive post">
                      🔒
                    </span>
                  )}
                </div>

                <h3 className="cp-feed-post__title">
                  {title.trim() || "Your post title will appear here"}
                </h3>

                <p className="cp-feed-post__body">{contentPreview}</p>

                {media.length > 0 && (
                  <div className="cp-feed-post__media">
                    {media[0].type === "image" && <img src={media[0].src} alt="" />}
                    {media[0].type === "video" && (
                      <video src={media[0].src} controls />
                    )}
                    {media[0].type === "audio" && (
                      <div className="cp-feed-post__audio">
                        <span>🎵</span>
                        <audio src={media[0].src} controls />
                      </div>
                    )}
                    {media.length > 1 && (
                      <span className="cp-feed-post__media-count">+{media.length - 1}</span>
                    )}
                  </div>
                )}

                {tags.length > 0 && (
                  <div className="cp-feed-post__tags">
                    {tags.map((t) => (
                      <span key={t}>#{t}</span>
                    ))}
                  </div>
                )}

                <div className="cp-feed-post__actions">
                  <span>❤️ Like</span>
                  <span>💬 Comment</span>
                  <span>↗ Share</span>
                </div>
              </div>
            </div>

            <div className="cp-card cp-boost-card">
              <p className="cp-side-label cp-side-label--light">Boost your reach</p>
              <ul className="cp-tip-list">
                {TIPS.map((tip) => (
                  <li key={tip.text}>
                    <span className="cp-tip-icon">{tip.icon}</span>
                    {tip.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="cp-card cp-insights-card">
              <p className="cp-side-label">Post insights</p>
              <div className="cp-insight-row">
                <span className="cp-insight-icon">📈</span>
                <div>
                  <p className="cp-insight-value">120 – 300 supporters</p>
                  <p className="cp-insight-label">Estimated reach</p>
                </div>
              </div>
              <div className="cp-insight-row">
                <span className="cp-insight-icon">🖼️</span>
                <div>
                  <p className="cp-insight-value">2x more support</p>
                  <p className="cp-insight-label">Posts with photos, video, or audio perform better</p>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}