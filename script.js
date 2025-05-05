/**
 * RauDie Landing Page JavaScript - Menú móvil con submenús
 */

// Función para ocultar el preloader inmediatamente
function hidePreloader() {
  const preloader = document.getElementById("preloader")
  if (preloader) {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  }
}

// Intenta ocultar el preloader de varias maneras para asegurar que funcione
document.addEventListener("DOMContentLoaded", () => {
  /**
   * Preloader - Solución mejorada
   */
  const preloader = document.getElementById("preloader")
  if (preloader) {
    // Método 1: Usar setTimeout como respaldo inmediato
    setTimeout(hidePreloader, 1500)

    // Método 2: Usar el evento load tradicional
    window.addEventListener("load", hidePreloader)

    // Método 3: Verificar si la página ya está cargada
    if (document.readyState === "complete") {
      hidePreloader()
    }
  }

  /**
   * Mobile Navigation Toggle - CORREGIDO
   */
  const mobileToggle = document.querySelector(".mobile-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const body = document.body

  // Crear overlay para el menú móvil si no existe
  let menuOverlay = document.querySelector(".menu-overlay")
  if (!menuOverlay) {
    menuOverlay = document.createElement("div")
    menuOverlay.className = "menu-overlay"
    body.appendChild(menuOverlay)
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", function (e) {
      e.preventDefault() // Prevenir comportamiento por defecto

      // Toggle de clases
      navMenu.classList.toggle("active")
      this.classList.toggle("active")
      menuOverlay.classList.toggle("active")

      // Bloquear scroll cuando el menú está abierto
      if (navMenu.classList.contains("active")) {
        body.style.overflow = "hidden"
      } else {
        body.style.overflow = ""
      }

      // Log para depuración
      console.log("Menú móvil toggled. Estado:", navMenu.classList.contains("active"))
    })

    // Cerrar menú al hacer clic en el overlay
    menuOverlay.addEventListener("click", () => {
      navMenu.classList.remove("active")
      mobileToggle.classList.remove("active")
      menuOverlay.classList.remove("active")
      body.style.overflow = ""
    })
  }

  /**
   * Submenu Toggle para móvil
   */
  const hasSubmenuItems = document.querySelectorAll(".has-submenu > a")

  hasSubmenuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // Solo prevenir el comportamiento por defecto en móvil
      if (window.innerWidth <= 768) {
        e.preventDefault()
        const parent = this.parentElement
        parent.classList.toggle("active")

        // Cerrar otros submenús abiertos
        hasSubmenuItems.forEach((otherItem) => {
          if (otherItem !== this) {
            otherItem.parentElement.classList.remove("active")
          }
        })
      }
    })
  })

  /**
   * Close mobile nav when clicking on links (except submenu toggles)
   */
  const navLinks = document.querySelectorAll(".nav-menu a:not(.has-submenu > a)")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        mobileToggle.classList.remove("active")
        menuOverlay.classList.remove("active")
        body.style.overflow = ""
      }
    })
  })

  /**
   * Scroll to top button
   */
  const scrollTop = document.getElementById("scroll-top")

  function toggleScrollTop() {
    if (window.scrollY > 100) {
      scrollTop.classList.add("active")
    } else {
      scrollTop.classList.remove("active")
    }
  }

  window.addEventListener("scroll", toggleScrollTop)

  scrollTop.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  /**
   * Active nav links on scroll
   */
  const sections = document.querySelectorAll("section[id]")

  function highlightNavLink() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(".nav-menu a[href*=" + sectionId + "]")

      if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active")
      } else if (navLink) {
        navLink.classList.remove("active")
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)

  /**
   * Animation on scroll
   */
  function revealOnScroll() {
    const elements = document.querySelectorAll(".service-card, .info-item, .contact-form, .founder-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("fade-in")
      }
    })
  }

  window.addEventListener("scroll", revealOnScroll)
  window.addEventListener("load", revealOnScroll)

  /**
   * Form validation
   */
  const form = document.querySelector(".form")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic validation
      let valid = true
      const inputs = form.querySelectorAll("input, textarea, select")

      inputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          valid = false
          input.classList.add("error")
        } else {
          input.classList.remove("error")
        }
      })

      // Email validation
      const emailInput = form.querySelector('input[type="email"]')
      if (emailInput && emailInput.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(emailInput.value.trim())) {
          valid = false
          emailInput.classList.add("error")
        }
      }

      if (valid) {
        // Here you would normally send the form data to the server
        // For demo purposes, we'll just show a success message
        const submitBtn = form.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent

        submitBtn.disabled = true
        submitBtn.textContent = "Enviando..."

        setTimeout(() => {
          alert("¡Mensaje enviado con éxito! Te contactaremos pronto.")
          form.reset()
          submitBtn.disabled = false
          submitBtn.textContent = originalText
        }, 1500)
      }
    })

    // Remove error class on input
    form.querySelectorAll("input, textarea, select").forEach((input) => {
      input.addEventListener("input", function () {
        if (this.value.trim()) {
          this.classList.remove("error")
        }
      })
    })
  }

  /**
   * Smooth scroll for anchor links
   */
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // No prevenir el comportamiento por defecto para submenús en móvil
      if (this.parentElement.classList.contains("has-submenu") && window.innerWidth <= 768) {
        return
      }

      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

// Método 4: Asegurarse de que el preloader se oculte incluso si hay problemas
window.onload = hidePreloader

/**
 * Filtrado de proyectos
 */
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  // Función para filtrar proyectos
  function filterProjects(filter) {
    projectCards.forEach((card) => {
      // Obtener categorías del proyecto
      const categories = card.dataset.category.split(" ")

      // Mostrar todos los proyectos si el filtro es 'all'
      if (filter === "all") {
        card.style.display = "block"
        // Agregar animación de aparición
        setTimeout(() => {
          card.classList.add("fade-in")
        }, 100)
        return
      }

      // Mostrar u ocultar según la categoría
      if (categories.includes(filter)) {
        card.style.display = "block"
        // Agregar animación de aparición
        setTimeout(() => {
          card.classList.add("fade-in")
        }, 100)
      } else {
        card.style.display = "none"
        card.classList.remove("fade-in")
      }
    })
  }

  // Evento click para los botones de filtro
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover clase active de todos los botones
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Agregar clase active al botón clickeado
      this.classList.add("active")

      // Filtrar proyectos según la categoría seleccionada
      const filter = this.getAttribute("data-filter")
      filterProjects(filter)
    })
  })

  // Inicializar con el filtro "all" activo
  filterProjects("all")
})
