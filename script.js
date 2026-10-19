/* ===================================================================
   THIỆP 20/10 CHO CRUSH - INTERACTIVE SCRIPT & 360° ANIMATIONS
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const heroStage = document.getElementById('hero-stage');
  const revealedContent = document.getElementById('revealed-content');
  const bouquetContainer = document.getElementById('bouquet-container');
  const bouquetImg = document.getElementById('bouquet-img');
  const bloomBtn = document.getElementById('bloom-btn');
  const replayBloom = document.getElementById('replay-bloom');
  const sendLoveBtn = document.getElementById('send-love-btn');

  // Controls & Modals
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicIcon = document.getElementById('music-icon');
  const musicText = document.getElementById('music-text');
  const bgmAudio = document.getElementById('bgm-audio');

  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  const qrOpenBtn = document.getElementById('qr-open-btn');
  const qrModal = document.getElementById('qr-modal');
  const qrCloseBtn = document.getElementById('qr-close-btn');
  const qrUrlInput = document.getElementById('qr-url-input');
  const generateQrBtn = document.getElementById('generate-qr-btn');
  const downloadQrCardBtn = document.getElementById('download-qr-card-btn');
  const qrCodeDisplay = document.getElementById('qrcode-display');
  const qrExportCanvas = document.getElementById('qr-export-canvas');

  let isMusicPlaying = false;
  let audioContext = null;
  let synthMusicInterval = null;
  let qrcodeInstance = null;

  // ==============================================================
  // 1. AMBIENT BACKGROUND PARTICLES (SOFT BOKEH & SPARKLES)
  // ==============================================================
  const canvasParticles = document.getElementById('canvas-particles');
  const ctxP = canvasParticles.getContext('2d');
  let particles = [];
  let width = (canvasParticles.width = window.innerWidth);
  let height = (canvasParticles.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvasParticles.width = window.innerWidth;
    height = canvasParticles.height = window.innerHeight;
  });

  class AmbientParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 4 + 1.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -Math.random() * 0.6 - 0.2;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.fadeSpeed = Math.random() * 0.005 + 0.002;
      this.color = Math.random() > 0.4 ? '255, 182, 193' : '255, 230, 235';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity += this.fadeSpeed;
      if (this.opacity > 0.75 || this.opacity < 0.15) {
        this.fadeSpeed = -this.fadeSpeed;
      }
      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
        this.y = height + 10;
      }
    }
    draw() {
      ctxP.beginPath();
      ctxP.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctxP.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctxP.shadowBlur = 10;
      ctxP.shadowColor = `rgba(${this.color}, 0.8)`;
      ctxP.fill();
    }
  }

  const numParticles = Math.min(width < 768 ? 22 : 45, 50);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new AmbientParticle());
  }

  function animateAmbient() {
    ctxP.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animateAmbient);
  }
  animateAmbient();

  // ==============================================================
  // 2. BOUQUET 3D TILT EFFECT (FOLLOWS MOUSE / TOUCH)
  // ==============================================================
  let tiltX = 0, tiltY = 0;
  let targetTiltX = 0, targetTiltY = 0;

  function handlePointerMove(e) {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (!clientX || !clientY) return;

    const rect = bouquetContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (clientX - centerX) / (window.innerWidth / 2);
    const deltaY = (clientY - centerY) / (window.innerHeight / 2);

    targetTiltX = -deltaY * 16; // Degrees
    targetTiltY = deltaX * 16;
  }

  window.addEventListener('mousemove', handlePointerMove);
  window.addEventListener('touchmove', handlePointerMove, { passive: true });

  function updateBouquetTilt() {
    tiltX += (targetTiltX - tiltX) * 0.1;
    tiltY += (targetTiltY - tiltY) * 0.1;
    if (bouquetContainer) {
      bouquetContainer.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }
    requestAnimationFrame(updateBouquetTilt);
  }
  updateBouquetTilt();

  // ==============================================================
  // 3. BLOOM TRIGGER & 360° REVEAL ANIMATION
  // ==============================================================
  function triggerBloom() {
    // 1. Play romantic background music
    startMusic();

    // 2. Confetti Petals Explosion
    firePetalsBurst();

    // 3. Smooth transition between stages
    heroStage.classList.add('hidden-hero');
    setTimeout(() => {
      heroStage.style.display = 'none';
      revealedContent.classList.add('active');

      // Trigger 360-degree spin animation for wishes and polaroids
      const wishCards = document.querySelectorAll('.wish-card');
      const polaroids = document.querySelectorAll('.polaroid-card');

      wishCards.forEach(card => card.classList.add('spin-in'));
      polaroids.forEach(card => card.classList.add('spin-in'));

      // Secondary petal shower
      setTimeout(() => {
        fireGentlePetals();
      }, 800);
    }, 400);
  }

  if (bouquetContainer) bouquetContainer.addEventListener('click', triggerBloom);
  if (bloomBtn) bloomBtn.addEventListener('click', triggerBloom);
  if (replayBloom) replayBloom.addEventListener('click', () => {
    firePetalsBurst();
    spawnFloatingHeart(window.innerWidth / 2, 100);
  });

  // ==============================================================
  // 4. PETAL BURST & CONFETTI (CANVAS-CONFETTI)
  // ==============================================================
  function firePetalsBurst() {
    if (typeof confetti !== 'function') return;

    // Pastel Flower Petals Palette
    const petalColors = ['#FF8DA1', '#FFAAA6', '#FFD3B6', '#FF6B8B', '#FFF0F5', '#FFCCD5'];

    // Big central explosion
    confetti({
      particleCount: 70,
      spread: 100,
      origin: { y: 0.6 },
      colors: petalColors,
      shapes: ['circle'],
      scalar: 1.2,
      ticks: 200,
      gravity: 0.8,
      drift: 0.2
    });

    // Left cannon
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors: petalColors,
        scalar: 1.1,
        ticks: 240
      });
    }, 200);

    // Right cannon
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.7 },
        colors: petalColors,
        scalar: 1.1,
        ticks: 240
      });
    }, 400);
  }

  function fireGentlePetals() {
    if (typeof confetti !== 'function') return;
    confetti({
      particleCount: 35,
      spread: 120,
      origin: { y: 0.2 },
      colors: ['#FFAEC0', '#FFD1DC', '#FFF3F5'],
      scalar: 1,
      gravity: 0.6,
      drift: 0.1,
      ticks: 300
    });
  }

  // ==============================================================
  // 5. ROMANTIC AUDIO SYSTEM (MP3 + WEB AUDIO SYNTH FALLBACK)
  // ==============================================================
  function startMusic() {
    if (isMusicPlaying) return;

    // Attempt to play user's mp3
    bgmAudio.play()
      .then(() => {
        isMusicPlaying = true;
        updateMusicUI(true);
      })
      .catch(() => {
        // Fallback: Synthesize soothing romantic piano/music-box melody via Web Audio API!
        initWebAudioMelody();
        isMusicPlaying = true;
        updateMusicUI(true);
      });
  }

  function toggleMusic() {
    if (isMusicPlaying) {
      bgmAudio.pause();
      stopWebAudioMelody();
      isMusicPlaying = false;
      updateMusicUI(false);
    } else {
      bgmAudio.play()
        .then(() => {
          isMusicPlaying = true;
          updateMusicUI(true);
        })
        .catch(() => {
          initWebAudioMelody();
          isMusicPlaying = true;
          updateMusicUI(true);
        });
    }
  }

  function updateMusicUI(playing) {
    if (musicIcon && musicText) {
      if (playing) {
        musicIcon.textContent = '🎶';
        musicText.textContent = 'Nhạc: Bật';
        musicToggleBtn.style.background = '#FFFFFF';
      } else {
        musicIcon.textContent = '🔇';
        musicText.textContent = 'Nhạc: Tắt';
        musicToggleBtn.style.background = 'rgba(255,255,255,0.7)';
      }
    }
  }

  if (musicToggleBtn) musicToggleBtn.addEventListener('click', toggleMusic);

  // Soft Acoustic Piano/Music Box Arpeggio Synth (Romantic Key of C/G)
  function initWebAudioMelody() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContext) audioContext = new AudioCtx();
      if (audioContext.state === 'suspended') audioContext.resume();

      // Gentle romantic melody notes (Hz)
      const notes = [
        261.63, 329.63, 392.00, 523.25, // C - E - G - C
        220.00, 261.63, 329.63, 440.00, // A - C - E - A
        174.61, 220.00, 261.63, 349.23, // F - A - C - F
        196.00, 246.94, 293.66, 392.00  // G - B - D - G
      ];
      let noteIdx = 0;

      function playNextNote() {
        if (!isMusicPlaying) return;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIdx], audioContext.currentTime);

        // Soft bell-like envelope
        gain.gain.setValueAtTime(0.001, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start();
        osc.stop(audioContext.currentTime + 1.25);

        noteIdx = (noteIdx + 1) % notes.length;
      }

      synthMusicInterval = setInterval(playNextNote, 450);
    } catch (e) {
      console.log('Audio init notice:', e);
    }
  }

  function stopWebAudioMelody() {
    if (synthMusicInterval) {
      clearInterval(synthMusicInterval);
      synthMusicInterval = null;
    }
  }

  // ==============================================================
  // 6. INTERACTIVE FLOATING HEARTS ON CLICK
  // ==============================================================
  function spawnFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    const emojis = ['💖', '🌸', '✨', '💕', '🌷', '💐', '❤️'];
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const tx = (Math.random() - 0.5) * 120;
    const rot = (Math.random() - 0.5) * 60;
    heart.style.setProperty('--tx', `${tx}px`);
    heart.style.setProperty('--rot', `${rot}deg`);
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1800);
  }

  // Wish cards click -> spawn burst of hearts
  document.querySelectorAll('.wish-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const rect = card.getBoundingClientRect();
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          spawnFloatingHeart(
            rect.left + Math.random() * rect.width,
            rect.top + Math.random() * rect.height
          );
        }, i * 80);
      }
    });
  });

  // Love button click -> spawn celebratory burst
  if (sendLoveBtn) {
    sendLoveBtn.addEventListener('click', (e) => {
      const rect = sendLoveBtn.getBoundingClientRect();
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          spawnFloatingHeart(
            rect.left + rect.width / 2 + (Math.random() - 0.5) * 80,
            rect.top + (Math.random() - 0.5) * 20
          );
        }, i * 60);
      }
      fireGentlePetals();
    });
  }

  // ==============================================================
  // 7. LIGHTBOX MODAL FOR POLAROIDS
  // ==============================================================
  document.querySelectorAll('.polaroid-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const caption = card.getAttribute('data-caption') || card.querySelector('.photo-caption')?.textContent;
      if (img) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption || '';
        lightboxModal.classList.add('active');
        spawnFloatingHeart(window.innerWidth / 2, window.innerHeight / 2);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', () => lightboxModal.classList.remove('active'));
  if (lightboxModal) lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) lightboxModal.classList.remove('active');
  });

  // ==============================================================
  // 8. QR CODE GENERATOR & BEAUTIFUL POSTCARD DOWNLOAD
  // ==============================================================
  function setupQRCode() {
    // Current web link or placeholder
    const currentUrl = window.location.href.startsWith('http')
      ? window.location.href
      : 'https://thiep-20-10-crush.vercel.app';

    if (qrUrlInput) qrUrlInput.value = currentUrl;
    renderQRCode(currentUrl);
  }

  function renderQRCode(text) {
    if (!qrCodeDisplay) return;
    qrCodeDisplay.innerHTML = '';
    qrcodeInstance = new QRCode(qrCodeDisplay, {
      text: text,
      width: 170,
      height: 170,
      colorDark: '#4A1D2B',
      colorLight: '#FFF8F9',
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  if (qrOpenBtn) qrOpenBtn.addEventListener('click', () => {
    setupQRCode();
    qrModal.classList.add('active');
  });

  if (qrCloseBtn) qrCloseBtn.addEventListener('click', () => qrModal.classList.remove('active'));
  if (qrModal) qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) qrModal.classList.remove('active');
  });

  if (generateQrBtn) {
    generateQrBtn.addEventListener('click', () => {
      const val = qrUrlInput.value.trim() || window.location.href;
      renderQRCode(val);
    });
  }

  // Draw and download aesthetic Postcard with QR Code
  if (downloadQrCardBtn) {
    downloadQrCardBtn.addEventListener('click', () => {
      const canvas = qrExportCanvas;
      const ctx = canvas.getContext('2d');
      const cw = canvas.width;
      const ch = canvas.height;

      // 1. Soft pastel background
      const grad = ctx.createLinearGradient(0, 0, cw, ch);
      grad.addColorStop(0, '#FFF5F7');
      grad.addColorStop(0.5, '#FFE9EE');
      grad.addColorStop(1, '#FFD8E2');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cw, ch);

      // 2. Decorative borders
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 6;
      ctx.strokeRect(14, 14, cw - 28, ch - 28);

      ctx.strokeStyle = '#E8A7B8';
      ctx.lineWidth = 1;
      ctx.strokeRect(20, 20, cw - 40, ch - 40);

      // 3. Card Title & Message
      ctx.textAlign = 'center';
      ctx.fillStyle = '#4A1F2D';
      ctx.font = 'bold 20px "Playfair Display", Georgia, serif';
      ctx.fillText('CHÚC MỪNG NGÀY 20/10', cw / 2, 58);

      ctx.fillStyle = '#855966';
      ctx.font = '13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Một món quà nhỏ dành riêng cho cậu ✨', cw / 2, 82);

      // 4. Center QR Code frame
      const qrBoxSize = 200;
      const qrBoxX = (cw - qrBoxSize) / 2;
      const qrBoxY = 105;

      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(217, 70, 104, 0.2)';
      ctx.shadowBlur = 15;
      ctx.fillRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize);
      ctx.shadowBlur = 0; // reset

      // Get generated QR image from QRCode.js
      const qrImg = qrCodeDisplay.querySelector('img') || qrCodeDisplay.querySelector('canvas');
      if (qrImg) {
        ctx.drawImage(qrImg, qrBoxX + 15, qrBoxY + 15, 170, 170);
      }

      // 5. Instruction text & cute flowers
      ctx.fillStyle = '#C93B61';
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('🌸 Quét mã để mở thiệp bất ngờ 🌸', cw / 2, 335);

      ctx.fillStyle = '#855966';
      ctx.font = 'italic 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Chúc cậu luôn xinh đẹp, rạng rỡ và hạnh phúc!', cw / 2, 362);

      ctx.fillStyle = '#B88B97';
      ctx.font = '11px sans-serif';
      ctx.fillText('Happy Vietnamese Women\'s Day', cw / 2, 392);

      // Trigger download
      const link = document.createElement('a');
      link.download = 'thiep-20-10-gui-crush.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
});
