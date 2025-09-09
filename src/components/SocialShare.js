import React, { useState } from 'react';
import './SocialShare.css';

function SocialShare({ title, description, url }) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  return (
    <div className="social-share">
      <button 
        className="share-btn"
        onClick={() => setShowShareMenu(!showShareMenu)}
      >
        📤 Share
      </button>
      
      {showShareMenu && (
        <div className="share-menu">
          <button onClick={shareToFacebook} className="share-option">
            📘 Facebook
          </button>
          <button onClick={shareToLinkedIn} className="share-option">
            💼 LinkedIn
          </button>
          <button onClick={shareToTwitter} className="share-option">
            🐦 Twitter
          </button>
          <button onClick={copyToClipboard} className="share-option">
            📋 Copy Link
          </button>
        </div>
      )}
    </div>
  );
}

export default SocialShare;
