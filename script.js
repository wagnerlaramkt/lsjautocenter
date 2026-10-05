document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. SMART HEADER SCROLL
  const header = document.getElementById('smartHeader');
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const headerHeight = header.offsetHeight;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Apenas aplicar a lógica se rolarmos além do topo para evitar glitch no bounce scroll (ex: iOS)
    if (scrollTop > headerHeight) {
      if (scrollTop > lastScrollTop) {
        // Rolando para BAIXO - Esconde o header
        header.classList.add('header-hidden');
      } else {
        // Rolando para CIMA - Mostra o header
        header.classList.remove('header-hidden');
        header.classList.add('header-scrolled');
      }
    } else {
      // Se estiver no topo
      header.classList.remove('header-hidden');
      header.classList.remove('header-scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Previne valores negativos no Mobile
  }, { passive: true });

  // 2. MOBILE MENU TOGGLE
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      // Toggle a exibição do menu no formato flex
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.backgroundColor = '#111111';
        navMenu.style.padding = '24px 0';
        navMenu.style.borderTop = '1px solid #333';
        navMenu.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.5)';
      }
    });

    // Fecha o menu mobile ao clicar em algum link
    navMenu.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.style.display = 'none';
        }
      });
    });
  }

  // 3. SMOOTH SCROLL PARA ÂNCORAS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        
        // Calcula a posição considerando que o header vai aparecer e ocupa espaço
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - 80; // 80px é a altura aproximada do header

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. ATUALIZAR ANO DO FOOTER
  const footerYear = document.querySelector('.footer p');
  if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
  }
});
