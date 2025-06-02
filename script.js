/**
 * RauDie Landing Page JavaScript - Versión Optimizada
 * Incluye menú móvil, scroll to top, animaciones, filtrado de proyectos y más
 */

document.addEventListener("DOMContentLoaded", function() {
  // =============================================
  // FUNCIONES UTILITARIAS
  // =============================================
  
  // Oculta el preloader
  function hidePreloader() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }
  }

  // Debounce para mejorar rendimiento en scroll/resize
  function debounce(func, wait = 20, immediate = false) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // =============================================
  // PRELOADER
  // =============================================
  
  // Múltiples métodos para asegurar que el preloader se oculte
  setTimeout(hidePreloader, 1500);
  window.addEventListener("load", hidePreloader);
  if (document.readyState === "complete") hidePreloader();
  window.onload = hidePreloader;

  // =============================================
  // MENÚ MÓVIL
  // =============================================
  
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  if (mobileToggle && navMenu) {
    // Crear overlay si no existe
    let menuOverlay = document.querySelector(".menu-overlay");
    if (!menuOverlay) {
      menuOverlay = document.createElement("div");
      menuOverlay.className = "menu-overlay";
      body.appendChild(menuOverlay);
    }

    // Toggle del menú
    function toggleMenu(e) {
      if (e) e.preventDefault();
      navMenu.classList.toggle("active");
      mobileToggle.classList.toggle("active");
      menuOverlay.classList.toggle("active");
      body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
    }

    // Cerrar menú
    function closeMenu() {
      navMenu.classList.remove("active");
      mobileToggle.classList.remove("active");
      menuOverlay.classList.remove("active");
      body.style.overflow = "";
    }

    // Event listeners
    mobileToggle.addEventListener("click", toggleMenu);
    menuOverlay.addEventListener("click", closeMenu);

    // Submenús móviles
    document.querySelectorAll(".has-submenu > a").forEach(item => {
      item.addEventListener("click", function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          this.parentElement.classList.toggle("active");
          
          // Cerrar otros submenús
          document.querySelectorAll(".has-submenu").forEach(other => {
            if (other !== this.parentElement) {
              other.classList.remove("active");
            }
          });
        }
      });
    });

    // Cerrar menú al hacer clic en enlaces
    document.querySelectorAll(".nav-menu a:not(.has-submenu > a)").forEach(link => {
      link.addEventListener("click", closeMenu);
    });
  }

  // =============================================
  // SCROLL TO TOP BUTTON (MANTIENE POSICIÓN ORIGINAL)
  // =============================================
  
  const scrollTop = document.getElementById("scroll-top");
  if (scrollTop) {
    function toggleScrollButton() {
      if (window.scrollY > 100) {
        scrollTop.classList.add("active");
      } else {
        scrollTop.classList.remove("active");
      }
    }

    // Configurar posición fija (asegura que esté en la esquina inferior derecha)
    scrollTop.style.position = "fixed";
    scrollTop.style.right = "30px";
    scrollTop.style.bottom = "30px";
    scrollTop.style.zIndex = "99";

    window.addEventListener("scroll", debounce(toggleScrollButton));
    toggleScrollButton(); // Estado inicial

    scrollTop.addEventListener("click", function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // =============================================
  // RESALTAR ENLACES DE NAVEGACIÓN AL SCROLL
  // =============================================
  
  function highlightNavLinks() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (navLink) {
        const isActive = scrollY > sectionTop && scrollY <= sectionTop + sectionHeight;
        navLink.classList.toggle("active", isActive);
      }
    });
  }

  window.addEventListener("scroll", debounce(highlightNavLinks));
  highlightNavLinks(); // Estado inicial

  // =============================================
  // ANIMACIONES AL SCROLL
  // =============================================
  
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".service-card, .info-item, .contact-form, .founder-card, " +
      ".project-card, .resume-card, .skills-box, .contact-item, .highlight-item"
    );

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate", "fade-in");
      }
    });
  }

  window.addEventListener("scroll", debounce(animateOnScroll));
  window.addEventListener("load", animateOnScroll);
  animateOnScroll(); // Estado inicial

  // =============================================
  // VALIDACIÓN DE FORMULARIO
  // =============================================
  
  const form = document.querySelector(".form");
  if (form) {
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll("input, textarea, select").forEach(input => {
        const isRequired = input.hasAttribute("required");
        const isEmpty = !input.value.trim();
        const isEmailInvalid = input.type === "email" && input.value.trim() && !validateEmail(input.value.trim());
        
        if ((isRequired && isEmpty) || isEmailInvalid) {
          valid = false;
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      });

      if (valid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";

        setTimeout(() => {
          alert("¡Mensaje enviado con éxito! Te contactaremos pronto.");
          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }, 1500);
      }
    });

    // Eliminar error al escribir
    form.querySelectorAll("input, textarea, select").forEach(input => {
      input.addEventListener("input", function() {
        if (this.value.trim()) this.classList.remove("error");
      });
    });
  }

  // =============================================
  // SCROLL SUAVE PARA ENLACES
  // =============================================
  
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      // Ignorar para submenús en móvil
      if (this.parentElement.classList.contains("has-submenu") && window.innerWidth <= 768) return;
      
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      
      if (target) {
        const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // =============================================
  // FILTRADO DE PROYECTOS
  // =============================================
  
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card, .project-item");
  
  if (filterBtns.length && projects.length) {
    function filterProjects(filter) {
      projects.forEach(project => {
        const categories = project.dataset.category?.split(" ") || 
                         [project.getAttribute("data-category")];
        
        const shouldShow = filter === "all" || categories.includes(filter);
        project.style.display = shouldShow ? "block" : "none";
        
        if (shouldShow) {
          setTimeout(() => project.classList.add("fade-in"), 100);
        } else {
          project.classList.remove("fade-in");
        }
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        filterBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        filterProjects(this.dataset.filter || this.getAttribute("data-filter"));
      });
    });

    // Inicializar mostrando todos
    filterProjects("all");
  }

  // =============================================
  // MODALES DE PROYECTOS
  // =============================================
  
  function setupProjectModals() {
    function setupCarousel(modal) {
      const thumbnails = modal.querySelectorAll(".carousel-thumbnail");
      const projectId = modal.id.replace("projectModal", "");
      const mainImage = document.getElementById(`mainImage${projectId}`);
      const captionTitle = document.getElementById(`captionTitle${projectId}`);
      const captionDesc = document.getElementById(`captionDesc${projectId}`);
      const prevBtn = modal.querySelector(".carousel-prev");
      const nextBtn = modal.querySelector(".carousel-next");
      
      let currentIndex = 0;

      function updateMainImage(index) {
        if (!thumbnails[index]) return;
        
        const thumbnail = thumbnails[index];
        if (mainImage) {
          mainImage.src = thumbnail.dataset.image;
          mainImage.onerror = () => { 
            if (mainImage) mainImage.src = "img/placeholder.jpg"; 
          };
        }
        
        if (captionTitle) captionTitle.textContent = thumbnail.dataset.title || "";
        if (captionDesc) captionDesc.textContent = thumbnail.dataset.desc || "";
        
        thumbnails.forEach((thumb, i) => {
          thumb.classList.toggle("active", i === index);
        });
        
        currentIndex = index;
      }

      // Event listeners para miniaturas
      thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => updateMainImage(index));
      });

      // Botones anterior/siguiente
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          updateMainImage((currentIndex - 1 + thumbnails.length) % thumbnails.length);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          updateMainImage((currentIndex + 1) % thumbnails.length);
        });
      }

      // Inicializar con primera imagen
      updateMainImage(0);
    }

    // Abrir modal
    document.querySelectorAll(".view-details, .view-project").forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        const modalId = btn.dataset.project ? 
                       `projectModal${btn.dataset.project}` : 
                       btn.getAttribute("href");
        const modal = document.querySelector(modalId);
        
        if (modal) {
          modal.classList.add("active", "show");
          document.body.style.overflow = "hidden";
          setupCarousel(modal);
        }
      });
    });

    // Cerrar modal
    function closeModal(modal) {
      if (modal) {
        modal.classList.remove("active", "show");
        document.body.style.overflow = "";
      }
    }

    // Botones de cerrar
    document.querySelectorAll(".close-modal").forEach(btn => {
      btn.addEventListener("click", function() {
        closeModal(this.closest(".project-modal"));
      });
    });

    // Cerrar al hacer clic fuera
    document.querySelectorAll(".project-modal").forEach(modal => {
      modal.addEventListener("click", function(e) {
        if (e.target === this) {
          closeModal(this);
        }
      });
    });

    // Cerrar con tecla Escape
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".project-modal.active").forEach(modal => {
          closeModal(modal);
        });
      }
    });

    // Inicializar todos los carruseles
    document.querySelectorAll(".project-modal").forEach(setupCarousel);
  }

  setupProjectModals();

  // =============================================
  // BOTÓN FLOTANTE DE WHATSAPP
  // =============================================
  
  const whatsappBtn = document.querySelector(".whatsapp-btn");
  if (whatsappBtn) {
    const notification = document.createElement("div");
    notification.className = "notification whatsapp-notification";
    notification.innerHTML = `
      <div class="notification-header">
        <i class="fab fa-whatsapp notification-icon"></i>
        <div class="notification-title">WhatsApp</div>
      </div>
      <div class="notification-message">Envíanos un mensaje por WhatsApp para atención inmediata</div>
    `;
    document.body.appendChild(notification);

    let notificationTimeout;

    function showNotification() {
      clearTimeout(notificationTimeout);
      notification.classList.add("show");
    }

    function hideNotification() {
      notificationTimeout = setTimeout(() => {
        notification.classList.remove("show");
      }, 500);
    }

    // Event listeners
    whatsappBtn.addEventListener("mouseenter", showNotification);
    whatsappBtn.addEventListener("mouseleave", hideNotification);
    notification.addEventListener("mouseenter", showNotification);
    notification.addEventListener("mouseleave", hideNotification);

    whatsappBtn.addEventListener("click", function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        showNotification();
        setTimeout(() => {
          notification.classList.remove("show");
          window.location.href = whatsappBtn.href;
        }, 2000);
      } else {
        showNotification();
        setTimeout(hideNotification, 3000);
      }
    });

    // Mostrar brevemente al cargar la página
    setTimeout(() => {
      showNotification();
      setTimeout(hideNotification, 2000);
    }, 1500);
  }

  // =============================================
  // AJUSTES DE DISEÑO PARA MÓVIL
  // =============================================
  
  function adjustHeroLayout() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.classList.toggle('mobile-layout', window.innerWidth <= 992);
    }
  }

  window.addEventListener("resize", debounce(adjustHeroLayout));
  adjustHeroLayout(); // Estado inicial

  // =============================================
  // AÑO ACTUAL EN EL FOOTER
  // =============================================
  
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});