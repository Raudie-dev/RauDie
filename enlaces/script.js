// Enhanced hover effects for links
document.querySelectorAll('.link-card').forEach(card => {
  // Add hover effect
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-3px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
  
  // Add click animation
  card.addEventListener('click', function() {
    this.style.transform = 'scale(0.98)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 100);
  });
});

// Add subtle parallax effect to background
document.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX / window.innerWidth) * 5;
  const moveY = (e.clientY / window.innerHeight) * 5;
  
  document.querySelector('.background-pattern').style.transform = 
    `translate(${moveX}px, ${moveY}px)`;
});

// Add dynamic year to footer
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.querySelector('footer p');
  const currentYear = new Date().getFullYear();
  yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
  
  // Add subtle animation to logo
  const logo = document.querySelector('.logo');
  logo.addEventListener('mouseenter', () => {
    logo.style.transform = 'translateY(-3px) rotate(5deg)';
  });
  
  logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'translateY(0) rotate(0)';
  });
  
  // Add subtle animation to header line
  const headerLine = document.querySelector('.header-line');
  setTimeout(() => {
    headerLine.style.width = '60px';
    headerLine.style.transition = 'width 0.5s ease';
  }, 1000);
  
  // Enhance link subtitles on hover
  document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const subtitle = card.querySelector('.link-subtitle');
      if (subtitle) {
        subtitle.style.color = 'var(--color-primary-light)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const subtitle = card.querySelector('.link-subtitle');
      if (subtitle) {
        subtitle.style.color = 'var(--color-text-light)';
      }
    });
  });
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';