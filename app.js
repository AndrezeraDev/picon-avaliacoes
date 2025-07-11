const stars = document.querySelectorAll('#stars span');
const feedbackSection = document.getElementById('feedback-section');
const thankYou = document.getElementById('thank-you');
const sendBtn = document.getElementById('send-feedback');
let selectedRating = 0;

// Tooltip de descrição das estrelas
const starDescTooltip = document.getElementById('star-desc-tooltip');
const starDescriptions = ['Péssimo', 'Ruim', 'Bom', 'Muito bom', 'Excelente!'];

stars.forEach((star, index) => {
  star.addEventListener('mouseenter', (e) => {
    if (starDescTooltip) {
      starDescTooltip.textContent = starDescriptions[index];
      const starsRect = document.getElementById('stars').getBoundingClientRect();
      const starRect = star.getBoundingClientRect();
      // Calcula posição central da estrela relativa ao container das estrelas
      const offsetLeft = starRect.left - starsRect.left + starRect.width / 2;
      starDescTooltip.style.left = `${offsetLeft}px`;
      starDescTooltip.classList.add('show');
    }
  });
  star.addEventListener('mouseleave', () => {
    if (starDescTooltip) {
      starDescTooltip.classList.remove('show');
    }
  });
});

// Tooltip logic
const starsTooltip = document.getElementById('stars-tooltip');
function showStarsTooltip() {
  if (starsTooltip) {
    starsTooltip.classList.add('show');
    setTimeout(() => {
      starsTooltip.classList.remove('show');
    }, 3500);
  }
}

// Show tooltip on page load and on scroll (once)
window.addEventListener('DOMContentLoaded', showStarsTooltip);
let tooltipShownOnScroll = false;
window.addEventListener('scroll', () => {
  if (!tooltipShownOnScroll) {
    showStarsTooltip();
    tooltipShownOnScroll = true;
  }
});

// Hide tooltip if user interacts with stars
stars.forEach(star => {
  star.addEventListener('mouseenter', () => {
    if (starsTooltip) starsTooltip.classList.remove('show');
  });
});

stars.forEach((star, index) => {
  star.addEventListener('mouseover', () => highlightStars(index + 1));
  star.addEventListener('mouseout', () => highlightStars(selectedRating));
  star.addEventListener('click', () => {
    selectedRating = index + 1;
    highlightStars(selectedRating);

    if (selectedRating >= 4) {
      launchConfetti();
      setTimeout(() => {
        const confirmGoogle = confirm("Ficamos muito felizes com sua avaliação! 🥰\n\nVocê poderia nos avaliar também no Google? Isso nos ajuda demais!\n\nClique em OK para ser redirecionado.");
        if (confirmGoogle) {
          window.open("https://www.google.com/gasearch?q=picon%20corretora%20de%20seguros&source=sh/x/gs/m2/5#vhid=43:/g/1vbnqj03&vssid=reviews-collection-viewer-reviews-fact-entrypoint&lkt=LocalPoiReviews&rlimm=7616347167602505725&lrd=0x94bc1e623cdacae9:0x69b2b36552fff7fd,3,,,,", "_blank"); 
        }
      }, 600);
    } else {
         feedbackSection.classList.remove('hidden');
         feedbackSection.classList.add('show');
         const introSection = document.getElementById('intro-section');
         if (introSection) {
           introSection.classList.add('hide-intro');
         }
    }
  });
});

function highlightStars(rating) {
  stars.forEach((star, index) => {
    star.classList.toggle('active', index < rating);
  });
}

sendBtn.addEventListener('click', () => {
  const feedbackText = document.getElementById('feedback').value.trim();
  if (feedbackText.length < 3) {
    alert("Por favor, escreva um comentário antes de enviar.");
    return;
  }

  console.log("Feedback recebido:", feedbackText);
  feedbackSection.classList.add('hidden');
  thankYou.classList.remove('hidden');
  thankYou.classList.add('show');
});

// 🎉 Função para confetes
function launchConfetti() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  });
}
