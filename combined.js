let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    // Touch events
    paper.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      this.touchStartX = e.touches[0].clientX - this.currentPaperX;
      this.touchStartY = e.touches[0].clientY - this.currentPaperY;
    });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.holdingPaper) return;

      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;

      this.currentPaperX = touchX - this.touchStartX;
      this.currentPaperY = touchY - this.touchStartY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });

    // Mouse events for desktop
    paper.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      this.touchStartX = e.clientX - this.currentPaperX;
      this.touchStartY = e.clientY - this.currentPaperY;
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.holdingPaper) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      this.currentPaperX = mouseX - this.touchStartX;
      this.currentPaperY = mouseY - this.touchStartY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });

    document.addEventListener('mouseup', () => {
      this.holdingPaper = false;
    });

    // Prevent context menu
    paper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
}); 