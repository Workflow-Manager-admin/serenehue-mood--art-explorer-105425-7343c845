import React, { useState, useEffect } from "react";

/**
 * This imports component logic from App.js (to maintain functionality/division).
 * If these are pure component functions, we can extract/copy as needed.
 * In real app, import shared components; here, keep same file as per code structure.
 */

// Inline below: the palette, info cards, and color picker used in original App.js

const COLORS = {
  primary: '#abd3df',
  secondary: '#fcf6f5',
  accent: '#e7a7c1'
};
const EMOTION_PALETTE = {
  "#abd3df": ["Calm", "Peaceful", "Clear"],
  "#fcf6f5": ["Gentle", "Soft", "Cozy"],
  "#e7a7c1": ["Compassion", "Romance", "Warmth"]
};
const MUSIC_PLAYLISTS = {
  "#abd3df": { title: "Gentle Streams", url: "https://open.spotify.com/", artist: "Calm Collective" },
  "#fcf6f5": { title: "Soft Mornings", url: "https://open.spotify.com/", artist: "Dream Pop" },
  "#e7a7c1": { title: "Warm Hues", url: "https://open.spotify.com/", artist: "Blush" }
};
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
const QUOTES = {
  "#abd3df": `"There is peace even in the storm." — Vincent Van Gogh`,
  "#fcf6f5": `"Softness is not weakness. It takes courage to stay delicate in a world this cruel." — Beau Taplin`,
  "#e7a7c1": `"Where words are restrained, the eyes often talk a great deal." — Samuel Richardson`
};
const COLOR_OF_DAY = "#e7a7c1";

function randomHexColor() {
  const hex = Math.floor(Math.random()*0xffffff).toString(16);
  return "#" + "0".repeat(6 - hex.length) + hex;
}

// InfoCard used in main App
function InfoCard({ title, children, style, className }) {
  return (
    <div className={`info-card ${className || ""}`} style={style}>
      <h3 className="info-card-title">{title}</h3>
      <div className="info-card-content">{children}</div>
    </div>
  );
}

function ColorSelector({ selectedColor, setSelectedColor }) {
  const palette = [COLORS.primary, COLORS.secondary, COLORS.accent];
  const [hexInput, setHexInput] = useState(selectedColor);
  const [hexError, setHexError] = useState("");

  // Only generate a new random color when user clicks random, not on render
  const [randomColor, setRandomColor] = useState(randomHexColor());

  function onHexChange(e) {
    const val = e.target.value;
    setHexInput(val);
    // Accept both #RRGGBB and #RGB (expand to #RRGGBB)
    let hexVal = val;
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      setSelectedColor(val);
      setHexError("");
    } else if (/^#[0-9a-fA-F]{3}$/.test(val)) {
      // Convert #RGB to #RRGGBB
      const r = val[1], g = val[2], b = val[3];
      const expanded = `#${r}${r}${g}${g}${b}${b}`;
      setSelectedColor(expanded);
      setHexError("");
      setHexInput(expanded);
    } else {
      setHexError(val.length > 1 ? "Enter a valid #RRGGBB hex code" : "");
    }
  }
  useEffect(() => setHexInput(selectedColor), [selectedColor]);

  return (
    <div className="color-selector">
      <div className="palette">
        {palette.map((color) => (
          <button
            key={color}
            className={`palette-color${selectedColor.toLowerCase() === color ? " active" : ""}`}
            style={{ backgroundColor: color }}
            aria-label={`Pick ${color}`}
            onClick={() => {
              setSelectedColor(color);
              setHexInput(color);
              setHexError("");
            }}
          />
        ))}
        <button
          className="palette-color random-picker"
          style={{ backgroundColor: randomColor }}
          aria-label="Random color"
          onClick={() => {
            const rnd = randomHexColor();
            setRandomColor(randomHexColor()); // Update button display color also
            setSelectedColor(rnd);
            setHexInput(rnd);
            setHexError("");
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
        style={{ borderColor: selectedColor }}
      />
      <div className="selector-color-sample" style={{ background: selectedColor }} aria-label="Selected color" />
      {hexError && (
        <div style={{ color: COLORS.accent, fontSize: ".93em", marginTop: 2, minHeight: 20 }}>
          {hexError}
        </div>
      )}
    </div>
  );
}

function EmotionCard({ color }) {
  const lowerColor = color.toLowerCase();
  const emotions = EMOTION_PALETTE[lowerColor];
  return (
    <InfoCard title="Emotional Associations" style={{ borderColor: color }}>
      <div className="emotion-tags">
        {emotions
          ? emotions.map((e) => (
              <span key={e} className="emotion-tag" style={{ background: color + "22", color }}>{e}</span>
            ))
          : (
            <>
              <span className="emotion-tag" style={{ background: color + "22", color }}>
                Expressive
              </span>
              <span className="emotion-tag" style={{ background: color + "22", color }}>
                Unique
              </span>
              <span className="emotion-tag" style={{ background: color + "22", color }}>
                Mood
              </span>
            </>
          )}
      </div>
    </InfoCard>
  );
}

function MusicCard({ color }) {
  const playlist = MUSIC_PLAYLISTS[color.toLowerCase()];
  if (!playlist)
    return (
      <InfoCard title="Music Playlist" style={{ borderColor: color }}>
        <div>
          Enjoy a song that matches your unique vibe!
          <br />
          <a
            href="https://open.spotify.com/search/"
            className="music-link"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color, textDecoration: "underline", display: "block", marginTop: 6 }}
          >
            Discover music for your mood
          </a>
        </div>
      </InfoCard>
    );
  return (
    <InfoCard title="Music Playlist" style={{ borderColor: color }}>
      <div>
        <a
          href={playlist.url}
          className="music-link"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color }}
        >
          {playlist.title}
        </a>
        <div className="music-artist">{playlist.artist}</div>
      </div>
    </InfoCard>
  );
}

/**
 * Attempts to fetch a public artwork related to the selected color from Wikimedia Commons API,
 * falling back to placeholders if API fails. Uses a color keyword for approximate matching.
 */
function ArtworkCard({ color }) {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(false);

  // Map colors to broad artwork search terms
  const colorTerms = {
    "#abd3df": "blue painting",
    "#fcf6f5": "cherry blossom",
    "#e7a7c1": "pink impressionism"
  };

  const placeholder = ARTWORKS[color.toLowerCase()] || null;

  useEffect(() => {
    let isMounted = true;
    const q = colorTerms[color.toLowerCase()] || "abstract painting";
    setLoading(true);
    setArtwork(null);
    // Wikimedia Commons API sample endpoint:
    fetch(
      `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&generator=search&gsrsearch=${encodeURIComponent(
        q
      )}&gsrnamespace=6&iiprop=url&format=json&origin=*`
    )
      .then((r) => r.json())
      .then((data) => {
        if (!isMounted) return;
        // Search for first result with image file
        let first = null;
        if (data && data.query && data.query.pages) {
          for (const pgid in data.query.pages) {
            const pg = data.query.pages[pgid];
            if (pg.imageinfo && pg.imageinfo[0]?.url) {
              first = {
                title: pg.title ? pg.title.replace("File:", "") : "Artwork",
                image: pg.imageinfo[0].url,
                artist: "Public Domain (Wikimedia)",
              };
              break;
            }
          }
        }
        setArtwork(first || placeholder || null);
      })
      .catch(() => {
        if (isMounted) setArtwork(placeholder || null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  if (loading) return (
    <InfoCard title="Artwork" style={{borderColor: color}}>
      <div>Loading related art...</div>
    </InfoCard>
  );

  if (!artwork) return (
    <InfoCard title="Artwork" style={{borderColor: color}}>
      <div>No artwork found.</div>
    </InfoCard>
  );

  return (
    <InfoCard title="Artwork" style={{borderColor: color}}>
      <img src={artwork.image} alt={artwork.title} className="artwork-img" />
      <div className="artwork-title">{artwork.title}</div>
      <div className="artwork-artist">{artwork.artist}</div>
    </InfoCard>
  );
}

function QuoteCard({ color }) {
  const lowerColor = color.toLowerCase();
  const quote =
    QUOTES[lowerColor] ||
    "Let color inspire you. \"Color is a power which directly influences the soul.\" – Kandinsky";
  return (
    <InfoCard title="Quote / Poem" style={{ borderColor: color }}>
      <div className="quote-content">{quote}</div>
    </InfoCard>
  );
}

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

/**
 * MoodboardShare:
 *  - Copy link to clipboard (default).
 *  - Show a preview & allow download as image (requires html2canvas, loads only when user clicks).
 */
function MoodboardShare({ selectedColor }) {
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [generating, setGenerating] = useState(false);

  // For accessibility/tight UI
  const colorNameMap = {
    "#abd3df": "Soothing Blue",
    "#fcf6f5": "Soft Blossom",
    "#e7a7c1": "Romantic Blush",
  };

  // CLEANUP: Revoke previous blob URL when new image is generated or component is unmounted
  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
    // eslint-disable-next-line
  }, [downloadUrl]);

  function handleShare() {
    const url = window.location.origin + '/explore?color=' + encodeURIComponent(selectedColor);
    window.navigator.clipboard.writeText(url);
    alert("Moodboard link copied to clipboard!");
  }

  async function handleDownload() {
    setGenerating(true);
    if (!window.html2canvas) {
      // Dynamically load html2canvas if not present
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
    const el = document.getElementById('moodboard-share-preview');
    if (!el || !window.html2canvas) {
      setGenerating(false);
      alert("Could not render image.");
      return;
    }
    window.html2canvas(el, {
      backgroundColor: null,
      useCORS: true,
      allowTaint: false,
    }).then(canvas => {
      canvas.toBlob(blob => {
        if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setGenerating(false);
      }, "image/png");
    }).catch(() => setGenerating(false));
  }

  return (
    <InfoCard title="Share Moodboard" style={{borderColor: COLORS.accent}}>
      <button
        className="btn btn-share"
        style={{background: COLORS.accent, color: COLORS.secondary, marginRight: "0.5em"}}
        onClick={handleShare}
        aria-label="Copy moodboard share link"
        disabled={generating}
      >
        Share this mood
      </button>
      <button
        className="btn"
        style={{background: COLORS.secondary, color: COLORS.accent, border: `1.5px solid ${COLORS.accent}`, marginLeft: "0.5em"}}
        onClick={handleDownload}
        aria-label="Download moodboard as image"
        disabled={generating}
      >
        {generating ? "Generating..." : "Download as Image"}
      </button>
      <div className="share-url" style={{marginTop: "10px"}}>
        <div>
          <span style={{fontWeight: 600, color: COLORS.accent}}>Share URL:</span>
        </div>
        <code style={{background: "#f7f4f8", padding: ".2em .4em", borderRadius: "10px", display: "block", wordBreak: "break-word"}}>
          {window.location.origin}/explore?color={selectedColor}
        </code>
      </div>
      {/* Style-matched preview for image rendering (hidden if not generating/downloadUrl, otherwise shown) */}
      <div style={{
        marginTop: "18px",
        marginBottom: "0.6em",
        opacity: "0.87"
      }}>
        <div
          id="moodboard-share-preview"
          style={{
            padding: "24px 24px 20px 24px",
            borderRadius: "22px",
            background: selectedColor,
            color: "#222",
            boxShadow: "0 2px 18px rgba(173,211,223,0.08)",
            maxWidth: "300px",
            margin: "0 auto",
            border: `2.5px solid ${COLORS.accent}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{
            width: "52px", height: "52px",
            borderRadius: "70%",
            background: selectedColor,
            border: "3.5px solid #FFF",
            marginBottom: "8px"
          }}></div>
          <span style={{
            fontSize: "1.27em",
            fontWeight: 700,
            letterSpacing: ".01em",
            color: "#fff",
            textShadow: "0 1px 9px #2222"
          }}>
            {colorNameMap[selectedColor.toLowerCase()] || selectedColor}
          </span>
          <span style={{
            fontSize: ".98em",
            margin: "8px 0 2px 0"
          }}>
            Moodboard by Color Mood Explorer
          </span>
          <code style={{
            background: "#fff9",
            color: selectedColor,
            fontSize: '.93em',
            padding: ".1em .4em",
            borderRadius: '9px',
            marginTop: "8px"
          }}>{selectedColor.toUpperCase()}</code>
        </div>
        {downloadUrl &&
          <a
            href={downloadUrl}
            download={`moodboard-${selectedColor.replace("#", "")}.png`}
            className="btn"
            style={{
              display: "block",
              marginTop: "8px",
              background: COLORS.primary,
              color: COLORS.accent
            }}
          >
            Download Moodboard Image
          </a>
        }
      </div>
    </InfoCard>
  );
}

/**
 * PUBLIC_INTERFACE
 * ColorMoodExplorerPage displays the interactive "Explore Colors" interface.
 * Lets users pick/enter a color to explore associated emotions, music, artwork, and quote.
 * Extended features: color of the day, moodboard sharing (link & image), fully responsive layout.
 * All user features robust, with error and fallback handling for artwork API and custom colors.
 *
 * @returns {JSX.Element} The full Color Mood Explorer page content.
 */
function ColorMoodExplorerPage() {
  const [selectedColor, setSelectedColor] = useState(COLORS.primary);

  // Pre-fill from URL params for moodboard sharing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const color = params.get('color');
    if (color && /^#[0-9a-fA-F]{6}$/.test(color)) setSelectedColor(color);
  }, []);

  return (
    <div>
      <main className="main-content">
        <section className="color-section">
          <h2 className="section-title" style={{color: COLORS.primary}}>
            Choose a Color to Explore
          </h2>
          <ColorSelector selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
          {/* Move aside section outside main-content grid to fix layout */}
        </section>
        <div className="info-card-grid">
          <EmotionCard color={selectedColor} />
          <MusicCard color={selectedColor} />
          <ArtworkCard color={selectedColor} />
          <QuoteCard color={selectedColor} />
        </div>
      </main>
      <aside className="side-section">
        <ColorOfDayCard color={COLOR_OF_DAY} setSelectedColor={setSelectedColor} />
        <MoodboardShare selectedColor={selectedColor} />
      </aside>
    </div>
  );
}

export default ColorMoodExplorerPage;
