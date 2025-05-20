let highestZ = 1;

class Paper {
  constructor() {
    this.holdingPaper = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.rotating = false;
  }

  init(paper) {
    // Touch start event
    paper.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.holdingPaper = true;
      
      // Bring to front
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      // Get initial touch position
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      
      // Add hover effect
      paper.classList.add('hover');
    }, { passive: false });

    // Touch move event
    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      
      if (!this.holdingPaper) return;

      // Calculate movement
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      
      // Update position
      this.currentPaperX += touchX - this.touchStartX;
      this.currentPaperY += touchY - this.touchStartY;
      
      // Update touch start position for next move
      this.touchStartX = touchX;
      this.touchStartY = touchY;
      
      // Apply transformation
      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }, { passive: false });

    // Touch end event
    paper.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.holdingPaper = false;
      paper.classList.remove('hover');
    }, { passive: false });

    // Touch cancel event
    paper.addEventListener('touchcancel', (e) => {
      e.preventDefault();
      this.holdingPaper = false;
      paper.classList.remove('hover');
    }, { passive: false });

    // Mouse events for desktop
    paper.addEventListener('mouseenter', () => {
      paper.classList.add('hover');
    });

    paper.addEventListener('mouseleave', () => {
      paper.classList.remove('hover');
    });
  }
}

// Initialize all paper elements
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
