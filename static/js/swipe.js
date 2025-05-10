// static/js/swipe.js

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cards-container');
    const likeBtn = document.getElementById('like-btn');
    const nopeBtn = document.getElementById('nope-btn');
    let swiper;
  
    // Fetch roommates JSON and initialize Swiper slides
    fetch('/api/roommates')
      .then(res => res.json())
      .then(data => {
        data.forEach(r => {
          const slide = document.createElement('div');
          slide.className = 'swiper-slide';
          slide.innerHTML = `
            <div class="card">
              <img src="${r.photo_url}" alt="${r.name}" class="avatar">
              <div class="card-info">
                <h3>${r.name}, ${r.age}</h3>
                <p>${r.bio || ''}</p>
              </div>
            </div>`;
          container.appendChild(slide);
        });
  
        swiper = new Swiper('.swiper-container', {
          effect: 'cards',
          grabCursor: true,
          cardsEffect: {
            rotate: true,
            slideShadows: false,
          },
        });
      })
      .catch(err => console.error('Error loading roommates:', err));
  
    // Like / Nope buttons
    likeBtn.addEventListener('click', () => {
      if (!swiper) return;
      swiper.slideNext();
      // TODO: send "like" for current user to backend
    });
    nopeBtn.addEventListener('click', () => {
      if (!swiper) return;
      swiper.slidePrev();
      // TODO: send "dislike" for current user to backend
    });
  });
  