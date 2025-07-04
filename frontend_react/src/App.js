import React, { useState, useEffect } from 'react';
import './App.css';

// Accent color for inline styles
const COLORS = {
  primary: '#abd3df',
  secondary: '#fcf6f5',
  accent: '#e7a7c1'
};

// Helper: Generate a random hex color for demo
function randomHexColor() {
  const hex = Math.floor(Math.random()*0xffffff).toString(16);
  return "#" + "0".repeat(6 - hex.length) + hex;
}

// Dummy emotional association data
const EMOTION_PALETTE = {
  "#abd3df": ["Calm", "Peaceful", "Clear"],
  "#fcf6f5": ["Gentle", "Soft", "Cozy"],
  "#e7a7c1": ["Compassion", "Romance", "Warmth"]
};

// Dummy music data for demo
const MUSIC_PLAYLISTS = {
  "#abd3df": { title: "Gentle Streams", url: "https://open.spotify.com/", artist: "Calm Collective" },
  "#fcf6f5": { title: "Soft Mornings", url: "https://open.spotify.com/", artist: "Dream Pop" },
  "#e7a7c1": { title: "Warm Hues", url: "https://open.spotify.com/", artist: "Blush" }
};

// Dummy art data for demo
const ARTWORKS = {
  "#abd3df": {
    title: "The Blue Boat", artist: "Winslow Homer", image: "https://uploads8.wikiart.org/images/winslow-homer/the-blue-boat-1892.jpg!Large.jpg"
  },
  "#fcf6f5": {
    title: "Cherry Blossom", artist: "Utagawa Hiroshige", image: "https://www.katebridger.ca/wordpress/wp-content/uploads/2014/04/129-cherry-blossoms.jpg"
  },
  "#e7a7c1": {
    title: "Water Lilies", artist: "Claude Monet", image: "https://uploads4.wikiart.org/images/claude-monet/water-lilies-1919.jpg!Large.jpg"
  }
};

// Dummy quotes/poetry for demo
const QUOTES = {
  "#abd3df": `"There is peace even in the storm." — Vincent Van Gogh`,
  "#fcf6f5": `"Softness is not weakness. It takes courage to stay delicate in a world this cruel." — Beau Taplin`,
  "#e7a7c1": `"Where words are restrained, the eyes often talk a great deal." — Samuel Richardson`
};

const COLOR_OF_DAY = "#e7a7c1"; // For demo

// Core modular card component for each info section
function InfoCard({ title, children, style, className }) {
  return (
    <div className={`info-card ${className || ""}`} style={style}>
      <h3 className="info-card-title">{title}</h3>
      <div className="info-card-content">{children}</div>
    </div>
  );
}

// Color palette and hex picker component
function ColorSelector({ selectedColor, setSelectedColor }) {
  const palette = [COLORS.primary, COLORS.secondary, COLORS.accent];
  const [hexInput, setHexInput] = useState(selectedColor);

  function onHexChange(e) {
    const val = e.target.value;
    setHexInput(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setSelectedColor(val);
  }

  useEffect(() => setHexInput(selectedColor), [selectedColor]);

  return (
    <div className="color-selector">
      <div className="palette">
        {palette.map((color) => (
          <button
            key={color}
            className={`palette-color${selectedColor.toLowerCase() === color ? " active" : ""}`}
            style={{backgroundColor: color}}
            aria-label={color}
            onClick={() => setSelectedColor(color)}
          />
        ))}
        <button
          className="palette-color random-picker"
          style={{backgroundColor: randomHexColor()}}
          aria-label="Random color"
          onClick={() => {
            const rnd = randomHexColor();
            setSelectedColor(rnd);
            setHexInput(rnd);
          }}
        >
          ?
        </button>
      </div>
      <input
        className="hex-input"
        type="text"
        value={hexInput}
        onChange={onHexChange}
        placeholder="#RRGGBB"
        aria-label="Hex code input"
        maxLength={7}
        style={{borderColor: selectedColor}}
      />
      <div className="selector-color-sample" style={{background: selectedColor}} aria-label="Selected color" />
    </div>
  );
}

// Emotion Association Card
function EmotionCard({ color }) {
  const emotions = EMOTION_PALETTE[color.toLowerCase()] || ["Unknown", "Mood"];
  return (
    <InfoCard title="Emotional Associations" style={{borderColor: color}}>
      <div className="emotion-tags">
        {emotions.map((e) => (
          <span key={e} className="emotion-tag" style={{background: color + '22', color: color}}>{e}</span>
        ))}
      </div>
    </InfoCard>
  );
}

// Music Playlist Card
function MusicCard({ color }) {
  const playlist = MUSIC_PLAYLISTS[color.toLowerCase()];
  if (!playlist) return (
    <InfoCard title="Music Playlist" style={{borderColor: color}}>No playlist found.</InfoCard>
  );
  return (
    <InfoCard title="Music Playlist" style={{borderColor: color}}>
      <div>
        {/* In real app, would embed Spotify/Apple Music player */}
        <a
          href={playlist.url}
          className="music-link"
          target="_blank"
          rel="noopener noreferrer"
          style={{color}}
        >
          {playlist.title}
        </a>
        <div className="music-artist">{playlist.artist}</div>
      </div>
    </InfoCard>
  );
}

// Artwork Card
function ArtworkCard({ color }) {
  const artwork = ARTWORKS[color.toLowerCase()];
  if (!artwork) return (
    <InfoCard title="Artwork" style={{borderColor: color}}>No artwork found.</InfoCard>
  );
  return (
    <InfoCard title="Artwork" style={{borderColor: color}}>
      <img src={artwork.image} alt={artwork.title} className="artwork-img" />
      <div className="artwork-title">{artwork.title}</div>
      <div className="artwork-artist">{artwork.artist}</div>
    </InfoCard>
  );
}

// Quotes or Poetry Card
function QuoteCard({ color }) {
  const quote = QUOTES[color.toLowerCase()] || "Let color inspire you.";
  return (
    <InfoCard title="Quote / Poem" style={{borderColor: color}}>
      <div className="quote-content">{quote}</div>
    </InfoCard>
  );
}

// Color of the Day Card
function ColorOfDayCard({ color, setSelectedColor }) {
  return (
    <InfoCard title="Color of the Day" style={{borderColor: color}} className="color-of-day-card">
      <div className="color-of-day-box" style={{background: color}} />
      <div className="color-of-day-hex">{color}</div>
      <button
        className="btn btn-accent"
        style={{background: color}}
        onClick={() => setSelectedColor(color)}
      >
        Explore this color
      </button>
    </InfoCard>
  );
}

// Moodboard Sharing
function MoodboardShare({ selectedColor }) {
  function handleShare() {
    // Copy a (dummy) sharable link to clipboard
    const url = window.location.origin + '/?color=' + encodeURIComponent(selectedColor);
    window.navigator.clipboard.writeText(url);
    alert("Moodboard link copied to clipboard!");
  }
  return (
    <InfoCard title="Share Moodboard" style={{borderColor: COLORS.accent}}>
      <button
        className="btn btn-share"
        style={{background: COLORS.accent, color: COLORS.secondary}}
        onClick={handleShare}
      >
        Share this mood
      </button>
      <div className="share-url">
        <code>{window.location.origin}/?color={selectedColor}</code>
      </div>
    </InfoCard>
  );
}

// Navigation (top/bottom bar)
function AppNav() {
  return (
    <nav className="app-nav">
      <span className="nav-title">🎨 Color Mood Explorer</span>
    </nav>
  );
}

function AppFooter() {
  return (
    <footer className="app-footer">
      <span>Made with <span style={{color: COLORS.accent}}>♥</span> to bring color and calm to your world.</span>
    </footer>
  );
}

// PUBLIC_INTERFACE
function App() {
  // UI theme is locked to light per requirements (could be made toggleable)
  const [selectedColor, setSelectedColor] = useState(COLORS.primary);

  // Pre-fill from URL params for moodboard sharing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const color = params.get('color');
    if (color && /^#[0-9a-fA-F]{6}$/.test(color)) setSelectedColor(color);
  }, []);

  return (
    <div className="App" style={{background: COLORS.secondary}}>
      <AppNav />
      <main className="main-content">
        {/* Color palette and hex code input */}
        <section className="color-section">
          <h2 className="section-title" style={{color: COLORS.primary}}>
            Choose a Color to Explore
          </h2>
          <ColorSelector selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </section>
        {/* Modular Info Cards */}
        <div className="info-card-grid">
          <EmotionCard color={selectedColor} />
          <MusicCard color={selectedColor} />
          <ArtworkCard color={selectedColor} />
          <QuoteCard color={selectedColor} />
        </div>
        {/* Side Section: Color of Day & Sharing */}
        <aside className="side-section">
          <ColorOfDayCard color={COLOR_OF_DAY} setSelectedColor={setSelectedColor} />
          <MoodboardShare selectedColor={selectedColor} />
        </aside>
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
