/* =========================================
   NAKSH GUPTA — PORTFOLIO INTERACTIONS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== PAGE LOADER =====
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Start hero animations after loader
      document.body.style.overflow = 'auto';
    }, 1200);
  });

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : 'auto';
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  });

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== REVEAL ON SCROLL (Intersection Observer) =====
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-count]');
  let countersAnimated = new Set();

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated.has(entry.target)) {
        countersAnimated.add(entry.target);
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();
    const suffix = target >= 100 ? '+' : '+';

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      
      element.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }

  // ===== DYNAMIC RENDER PORTFOLIO =======
  function getData(key) { return JSON.parse(localStorage.getItem('nk_' + key) || '[]'); }
  function saveData(key, arr) { localStorage.setItem('nk_' + key, JSON.stringify(arr)); }

  // Seed default data if completely empty
  if (getData('trailers').length === 0 && getData('reels').length === 0) {
    const defaultTrailers = [
      { id: 1, title: 'Kinaree x Vishal — two souls, one story', year: '2025', ratio: 'horizontal', url: 'https://play.gumlet.io/embed/69dea1a81fa8b408f622060b?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 2, title: 'Shambhavi x Amoolya', year: '2025', ratio: 'horizontal', url: 'https://play.gumlet.io/embed/69dea8dfdbd80813257f2b3c?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 3, title: 'Riddhi x Shishir', year: '2024', ratio: 'horizontal', url: 'https://play.gumlet.io/embed/69dea8df0e45fb2cfcef0d13?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 4, title: 'Aastha x Shiva', year: '2024', ratio: 'horizontal', url: 'https://play.gumlet.io/embed/69dea1840e45fb2cfcee7081?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 5, title: 'Akshay x Sonakshi', year: '2023', ratio: 'horizontal', url: 'https://play.gumlet.io/embed/69dea8dfdbd80813257f2b45?background=false&autoplay=false&loop=false&disable_player_controls=false' }
    ];
    const defaultReactions = [
      { id: 6, title: 'Priya & Arjun Sharma', year: '2024', ratio: 'horizontal', url: 'https://play.gumlet.io/embed/69deaaebdbd80813257fc6eb?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 21, title: 'Client Feedback — ZoomVista', year: '2024', ratio: 'horizontal', url: 'https://play.gumlet.io/embed/69e694c3d04993c17e0940d4?background=false&autoplay=false&loop=false&disable_player_controls=false' }
    ];
    const defaultBreakdowns = [
      { id: 7, title: 'Timeline Breakdown 1', ratio: 'vertical', url: 'https://play.gumlet.io/embed/69dec4621fa8b408f62504fa?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 8, title: 'Timeline Breakdown 2', ratio: 'vertical', url: 'https://play.gumlet.io/embed/69dec4620e45fb2cfcf17169?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 9, title: 'Timeline Breakdown 3', ratio: 'vertical', url: 'https://play.gumlet.io/embed/69dec462dbd8081325818aa4?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 10, title: 'Timeline Breakdown 4', ratio: 'vertical', url: 'https://play.gumlet.io/embed/69dffd55a9b612503f1845fc?background=false&autoplay=false&loop=false&disable_player_controls=false' }
    ];
    const defaultReels = [
      { id: 11, title: 'Reel 1', ratio: 'horizontal', url: 'https://play.gumlet.io/embed/69e004a3e034f96e26e07c93?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 12, title: 'Reel 2', ratio: 'horizontal', url: 'https://play.gumlet.io/embed/69e004a3e034f96e26e07c68?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 13, title: 'Reel 3', ratio: 'horizontal', url: 'https://play.gumlet.io/embed/69e004a3e034f96e26e07c7d?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 14, title: 'Reel 4', ratio: 'horizontal', url: 'https://play.gumlet.io/embed/69e004a3e034f96e26e07c6c?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 15, title: 'Reel 5', ratio: 'vertical', url: 'https://play.gumlet.io/embed/69e004a3e034f96e26e07c66?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 16, title: 'Reel 6', ratio: 'vertical', url: 'https://play.gumlet.io/embed/69e004a3aa34550ef76abb25?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 17, title: 'Reel 7', ratio: 'horizontal', url: 'https://play.gumlet.io/embed/69e004a2aa34550ef76abb14?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 18, title: 'Reel 8', ratio: 'horizontal', url: 'https://play.gumlet.io/embed/69e004a3a9b612503f1905c2?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 19, title: 'Reel 9', ratio: 'vertical', url: 'https://play.gumlet.io/embed/69e004a3e034f96e26e07c87?background=false&autoplay=false&loop=false&disable_player_controls=false' },
      { id: 20, title: 'Reel 10', ratio: 'vertical', url: 'https://play.gumlet.io/embed/69e00013a9b612503f188d77?background=false&autoplay=false&loop=false&disable_player_controls=false' }
    ];
    saveData('trailers', defaultTrailers);
    saveData('reactions', defaultReactions);
    saveData('breakdowns', defaultBreakdowns);
    saveData('reels', defaultReels);
  }

  // Force-sync specific new content if not present (Migration)
  const currentReactions = getData('reactions');
  const newReactionId = 21;
  const exists = currentReactions.some(v => v.id === newReactionId);
  if (!exists) {
    currentReactions.push({ 
      id: newReactionId, 
      title: 'Client Feedback — ZoomVista', 
      year: '2024', 
      ratio: 'horizontal', 
      url: 'https://play.gumlet.io/embed/69e694c3d04993c17e0940d4?background=false&autoplay=false&loop=false&disable_player_controls=false' 
    });
    saveData('reactions', currentReactions);
  }

  // Inject generated HTML into the grid
  const videoGrid = document.querySelector('.video-grid');
  if (videoGrid) {
    let allCardsHtml = '';
    const categories = [
      { key: 'trailers', catData: 'trailer', catName: 'Wedding Trailer' },
      { key: 'reactions', catData: 'reaction', catName: 'Client Reaction' },
      { key: 'breakdowns', catData: 'breakdown', catName: 'Editing Process' }
    ];

    categories.forEach(c => {
      const arr = getData(c.key);
      arr.forEach(v => {
        const isVertical = v.ratio === 'vertical';
        const padding = isVertical ? '177.78%' : '56.25%';
        const metaText = c.catName + (v.year ? ` <span>·</span> ${v.year}` : '');
        allCardsHtml += `
          <div class="video-card reveal visible" data-category="${c.catData}">
            <div class="video-wrapper" style="padding-top: ${padding};">
              <iframe loading="lazy" src="${v.url}" 
                style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" 
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;clipboard-write;" referrerpolicy="origin"></iframe>
            </div>
            <div class="video-info">
              <h3>${v.title}</h3>
              <p class="video-meta">${metaText}</p>
            </div>
          </div>
        `;
      });
    });
    videoGrid.innerHTML = allCardsHtml;
  }

  // Inject Reels HTML
  const reelsSlider = document.getElementById('reelsSlider');
  if (reelsSlider) {
    const reelsArr = getData('reels');
    let reelsHtml = '';
    reelsArr.forEach(v => {
      reelsHtml += `
        <div class="reel-card">
          <div class="reel-wrapper" style="padding-top: 177.78%;">
            <iframe loading="lazy" title="Gumlet video player" src="${v.url}" style="border:none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" referrerpolicy="origin" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;clipboard-write;"></iframe>
          </div>
          <div class="reel-title"><h4>${v.title}</h4></div>
        </div>
      `;
    });
    reelsSlider.innerHTML = reelsHtml;
  }

  // ===== PORTFOLIO FILTER TABS =====
  const filterTabs = document.querySelectorAll('.filter-tab');
  // Re-query videoCards after we injected them dynamically
  const videoCards = document.querySelectorAll('.video-card');
  const viewMoreWrapper = document.getElementById('viewMoreWrapper');
  const viewMoreBtn = document.getElementById('viewMoreBtn');

  // Trigger click on 'View More' -> Go to Trailer tab
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      const trailerTab = document.querySelector('.filter-tab[data-filter="trailer"]');
      if (trailerTab) trailerTab.click();
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      let visibleCount = 0;

      videoCards.forEach(card => {
        const category = card.getAttribute('data-category');
        let shouldShow = false;
        
        if (filter === 'all') {
          shouldShow = visibleCount < 4;
          if (shouldShow) visibleCount++;
        } else {
          shouldShow = (category === filter);
        }
        
        if (shouldShow) {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 400);
        }
      });
      
      if (viewMoreWrapper) {
        if (filter === 'all' && videoCards.length > 4) {
          viewMoreWrapper.style.display = 'block';
        } else {
          viewMoreWrapper.style.display = 'none';
        }
      }
    });
  });

  // Initialize filter on page load to apply limits
  const activeTab = document.querySelector('.filter-tab.active');
  if (activeTab) {
    activeTab.click();
  }

  // ===== REVIEWS CAROUSEL =====
  const reviewsTrack = document.getElementById('reviewsTrack');
  const reviewCards = reviewsTrack.querySelectorAll('.review-card');
  const prevBtn = document.getElementById('reviewPrev');
  const nextBtn = document.getElementById('reviewNext');
  const reviewsDots = document.getElementById('reviewsDots').querySelectorAll('.reviews-dot');
  let currentReview = 0;
  const totalReviews = reviewCards.length;
  let reviewAutoTimer;

  function goToReview(index) {
    currentReview = index;
    if (currentReview < 0) currentReview = totalReviews - 1;
    if (currentReview >= totalReviews) currentReview = 0;

    reviewsTrack.style.transform = `translateX(-${currentReview * 100}%)`;
    
    reviewsDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentReview);
    });
  }

  prevBtn.addEventListener('click', () => {
    goToReview(currentReview - 1);
    resetReviewAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    goToReview(currentReview + 1);
    resetReviewAutoplay();
  });

  reviewsDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToReview(i);
      resetReviewAutoplay();
    });
  });

  // Auto-advance reviews
  function startReviewAutoplay() {
    reviewAutoTimer = setInterval(() => {
      goToReview(currentReview + 1);
    }, 5000);
  }

  function resetReviewAutoplay() {
    clearInterval(reviewAutoTimer);
    startReviewAutoplay();
  }

  startReviewAutoplay();

  // Touch/Swipe support for reviews
  let touchStartX = 0;
  let touchEndX = 0;
  
  const reviewsSlider = document.querySelector('.reviews-slider');
  
  reviewsSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  reviewsSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToReview(currentReview + 1);
      } else {
        goToReview(currentReview - 1);
      }
      resetReviewAutoplay();
    }
  }, { passive: true });

  // ===== REELS SLIDER DOTS =====
  const reelsDots = document.getElementById('reelsDots').querySelectorAll('.reels-dot');

  if (reelsSlider) {
    reelsSlider.addEventListener('scroll', () => {
      const scrollLeft = reelsSlider.scrollLeft;
      const maxScroll = reelsSlider.scrollWidth - reelsSlider.clientWidth;
      const scrollPercent = scrollLeft / maxScroll;
      
      const totalDots = reelsDots.length;
      const activeIndex = Math.min(
        Math.round(scrollPercent * (totalDots - 1)),
        totalDots - 1
      );

      reelsDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    }, { passive: true });

    reelsDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const maxScroll = reelsSlider.scrollWidth - reelsSlider.clientWidth;
        const scrollTo = (maxScroll / (reelsDots.length - 1)) * i;
        reelsSlider.scrollTo({
          left: scrollTo,
          behavior: 'smooth'
        });
      });
    });
  }

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'var(--text-light)';
          }
        });
      }
    });
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const type = document.getElementById('formType').value;
    const message = document.getElementById('formMessage').value;
    
    // Visual feedback
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';
    
    // Simulate send (replace with actual form handling e.g. Formspree, EmailJS, etc.)
    setTimeout(() => {
      submitBtn.textContent = 'Message Sent ✓';
      submitBtn.style.background = '#4CAF50';
      submitBtn.style.opacity = '1';
      contactForm.reset();
      
      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.style.background = '';
      }, 3000);
    }, 1500);
  });

  // ===== PARALLAX EFFECT ON HERO (subtle) =====
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero-content');
    if (hero && scrollY < window.innerHeight) {
      hero.style.transform = `translateY(${scrollY * 0.3}px)`;
      hero.style.opacity = 1 - (scrollY / window.innerHeight) * 0.8;
    }
  });

});
