const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelectorAll('.nav-link');
const form = document.getElementById('contect-form'); 
const result = document.getElementById('result');
// const toggleBtn = document.getElementById('theme-toggle');
// const currentTheme = localStorage.getItem('theme');




menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
    document.body.classList.toggle('overflow-hidden');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Agar link sirf isi page ka anchor (#) hai
        if (href.startsWith('#')) {
            mobileMenu.classList.remove('active');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
            document.body.classList.remove('overflow-hidden');
        } 
        // Agar link doosre page (.html) ka hai
        else if (href.includes('.html')) {
            e.preventDefault(); // Default jump ko roko
            
            mobileMenu.classList.remove('active');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
            document.body.classList.remove('overflow-hidden');

            // Halka sa delay taake menu band hone ki animation dikhayi de
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        }
    });
});

const sr = ScrollReveal({
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    delay: 200,
    reset: false
});

sr.reveal('.reveal-up');
sr.reveal('.reveal-left', { origin: 'left' });
sr.reveal('.reveal-right', { origin: 'right' });

document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});


form.addEventListener('submit', function(e) {
  e.preventDefault(); // Page refresh hone se rokne ke liye
  
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = "Sending...";
  result.classList.add('text-cyan-400');

  fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: json
      })
      .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
              // Message chala gaya! Ab form khali karo
              result.innerHTML = "Message sent successfully! ✅";
              form.reset(); // Yeh line inputs ko khali kar degi
          } else {
              console.log(response);
              result.innerHTML = json.message;
          }
      })
      .catch(error => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
      })
      .then(function() {
          // 5 seconds baad success message gayab karne ke liye
          setTimeout(() => {
              result.innerHTML = "";
          }, 5000);
      });
});

// if (currentTheme) {
//     document.documentElement.setAttribute('data-theme', currentTheme);
// }

// toggleBtn.addEventListener('click', () => {
//     let theme = document.documentElement.getAttribute('data-theme');
//     const icon = document.getElementById('theme-icon');

//     if (theme === 'dark') {
//         document.documentElement.setAttribute('data-theme', 'light');
//         localStorage.setItem('theme', 'light');
//         icon.innerText = "🌙";
//     } else {
//         document.documentElement.setAttribute('data-theme', 'dark');
//         localStorage.setItem('theme', 'dark');
//         icon.innerText = "☀️";
//     }
// }); 


// ScrollReveal().reveal('.reveal-left', { origin: 'left', distance: '50px', duration: 1000 });
// ScrollReveal().reveal('.reveal-right', { origin: 'right', distance: '50px', duration: 1000 });