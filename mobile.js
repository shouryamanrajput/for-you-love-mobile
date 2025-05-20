let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  touchEndX = 0;
  touchEndY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  initialTouchDistance = 0;
  initialRotation = 0;

  init(paper) {
    // Prevent default touch behaviors
    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });

    paper.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if(this.holdingPaper) return; 
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;

      // Handle two-finger touch for rotation
      if (e.touches.length === 2) {
        this.rotating = true;
        this.initialTouchDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        this.initialRotation = this.rotation;
      }
    }, { passive: false });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      
      if (e.touches.length === 2) {
        // Handle rotation with two fingers
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const angle = Math.atan2(
          e.touches[1].clientY - e.touches[0].clientY,
          e.touches[1].clientX - e.touches[0].clientX
        );
        this.rotation = this.initialRotation + (angle * (180 / Math.PI));
      } else if (!this.rotating) {
        // Handle movement with one finger
        this.touchMoveX = e.touches[0].clientX;
        this.touchMoveY = e.touches[0].clientY;
        
        this.velX = this.touchMoveX - this.prevTouchX;
        this.velY = this.touchMoveY - this.prevTouchY;
        
        if(this.holdingPaper) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
          this.prevTouchX = this.touchMoveX;
          this.prevTouchY = this.touchMoveY;
        }
      }

      // Apply transformations
      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }, { passive: false });

    paper.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (e.touches.length === 0) {
        this.holdingPaper = false;
        this.rotating = false;
      }
    }, { passive: false });

    // Add touch cancel handler
    paper.addEventListener('touchcancel', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
