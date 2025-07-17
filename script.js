// ===== INICIALIZAÇÃO ===== 
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Inicializar todas as funcionalidades
    initNavigation();
    initSkillBars();
    initProjectFilters();
    initContactForm();
    initScrollIndicator();
    initTypingEffect();
    initScrollAnimations();
    initParticleBackground();
    initThemeToggle();
    initBackToTop();
    initLazyLoading();
    initPreloader();
});

// ===== NAVEGAÇÃO ===== 
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Toggle menu mobile
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Scroll suave para seções
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Atualizar link ativo baseado no scroll
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        updateHeaderBackground();
        updateScrollProgress();
    });
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    function updateHeaderBackground() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 15, 35, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(15, 15, 35, 0.9)';
            header.style.backdropFilter = 'blur(5px)';
        }
    }
    
    function updateScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        }
    }
}

// ===== BARRAS DE HABILIDADES ===== 
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Criar observer para animar barras quando visíveis
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const targetWidth = skillBar.getAttribute('data-width');
                
                // Animar barra com delay
                setTimeout(() => {
                    skillBar.style.width = targetWidth;
                    skillBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 300);
                
                // Animar contador
                animateCounter(skillBar, targetWidth);
                
                // Adicionar efeito de brilho
                addGlowEffect(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    function animateCounter(skillBar, targetWidth) {
        const percentage = parseInt(targetWidth);
        const skillItem = skillBar.closest('.skill-item');
        const percentageElement = skillItem.querySelector('.skill-percentage');
        
        if (percentageElement) {
            let currentPercentage = 0;
            const increment = percentage / 50; // Duração da animação
            
            const counterInterval = setInterval(() => {
                currentPercentage += increment;
                if (currentPercentage >= percentage) {
                    currentPercentage = percentage;
                    clearInterval(counterInterval);
                }
                percentageElement.textContent = Math.round(currentPercentage) + '%';
            }, 20);
        }
    }
    
    function addGlowEffect(skillBar) {
        setTimeout(() => {
            skillBar.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
            setTimeout(() => {
                skillBar.style.boxShadow = 'none';
            }, 1000);
        }, 1500);
    }
}

// ===== FILTROS DE PROJETOS ===== 
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Atualizar botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrar projetos
            filterProjects(filter);
        });
    });
    
    function filterProjects(filter) {
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.display = 'block';
                
                // Animar entrada com delay escalonado
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.classList.add('hidden');
                
                setTimeout(() => {
                    if (card.classList.contains('hidden')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    }
    
    // Hover effects nos cards de projeto
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });
}

// ===== FORMULÁRIO DE CONTATO ===== 
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);

        
        // Validação em tempo real
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
            input.addEventListener('focus', addFocusEffect);
            input.addEventListener('blur', removeFocusEffect);
        });
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Mostrar loading
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        const formData = new FormData(e.target);
        const formValues = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validar todos os campos
        const isValid = validateForm(formValues);
        
        if (isValid) {
            // NOVA FUNCIONALIDADE: Enviar para FormSubmit
            sendToFormSubmit(formData, submitButton, originalText, e.target);
        } else {
            // Restaurar botão em caso de erro de validação
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            showFormFeedback('error', 'Por favor, preencha todos os campos corretamente.');
        }
    }
    
    // NOVA FUNÇÃO: Enviar dados para FormSubmit
    function sendToFormSubmit(formData, submitButton, originalText, form) {
        console.log('Iniciando envio para FormSubmit...');
        
        // Método 1: Tentar com fetch primeiro
        const formSubmitUrl = 'https://formsubmit.co/raquelbaqui.rb@gmail.com';
        
        // Criar um novo FormData com configurações adicionais do FormSubmit
        const formSubmitData = new FormData();
        
        // Adicionar os dados do formulário
        formSubmitData.append('name', formData.get('name'));
        formSubmitData.append('email', formData.get('email'));
        formSubmitData.append('subject', formData.get('subject'));
        formSubmitData.append('message', formData.get('message'));
        
        // Configurações do FormSubmit
        formSubmitData.append('_subject', `Nova mensagem de: ${formData.get('name')}`);
        formSubmitData.append('_captcha', 'false');
        formSubmitData.append('_template', 'table');
        formSubmitData.append('_autoresponse', 'Obrigada pelo contato! Retornarei em breve.');
        
        // Tentar envio com fetch
        fetch(formSubmitUrl, {
            method: 'POST',
            body: formSubmitData,
            mode: 'no-cors' // Importante para evitar problemas de CORS
        })
        .then(response => {
            console.log('Resposta recebida do FormSubmit');
            // Com no-cors, sempre será opaque, então assumimos sucesso
            showFormFeedback('success', 'Mensagem enviada com sucesso! Retornarei o contato em breve.');
            form.reset();
            createConfettiEffect();
        })
        .catch(error => {
            console.error('Erro com fetch, tentando método alternativo:', error);
            // Se fetch falhar, usar método de formulário oculto
            sendWithHiddenForm(formData, submitButton, originalText, form);
        })
        .finally(() => {
            // Restaurar botão
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        });
    }
    
    // MÉTODO ALTERNATIVO: Enviar com formulário oculto
    function sendWithHiddenForm(formData, submitButton, originalText, form) {
        console.log('Usando método de formulário oculto...');
        
        // Criar formulário oculto
        const hiddenForm = document.createElement('form');
        hiddenForm.action = 'https://formsubmit.co/raquelbaqui.rb@gmail.com';
        hiddenForm.method = 'POST';
        hiddenForm.style.display = 'none';
        
        // Adicionar campos
        const fields = [
            { name: 'name', value: formData.get('name') },
            { name: 'email', value: formData.get('email') },
            { name: 'subject', value: formData.get('subject') },
            { name: 'message', value: formData.get('message') },
            { name: '_subject', value: `Nova mensagem de: ${formData.get('name')}` },
            { name: '_captcha', value: 'false' },
            { name: '_template', value: 'table' },
            { name: '_autoresponse', value: 'Obrigada pelo contato! Retornarei em breve.' },
            { name: '_next', value: window.location.href + '?success=true' }
        ];
        
        fields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            hiddenForm.appendChild(input);
        });
        
        // Adicionar ao documento e enviar
        document.body.appendChild(hiddenForm);
        
        // Mostrar feedback antes do envio
        showFormFeedback('success', 'Mensagem enviada com sucesso! Retornarei o contato em breve.');
        form.reset();
        createConfettiEffect();
        
        // Enviar após um pequeno delay
        setTimeout(() => {
            hiddenForm.submit();
            document.body.removeChild(hiddenForm);
        }, 1000);
        
        // Restaurar botão
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
    
    function validateForm(values) {
        let isValid = true;
        
        // Validar nome
        if (!values.name || values.name.trim().length < 2) {
            showFieldError('name', 'Nome deve ter pelo menos 2 caracteres');
            isValid = false;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!values.email || !emailRegex.test(values.email)) {
            showFieldError('email', 'Email inválido');
            isValid = false;
        }
        
        // Validar assunto
        if (!values.subject || values.subject.trim().length < 5) {
            showFieldError('subject', 'Assunto deve ter pelo menos 5 caracteres');
            isValid = false;
        }
        
        // Validar mensagem
        if (!values.message || values.message.trim().length < 10) {
            showFieldError('message', 'Mensagem deve ter pelo menos 10 caracteres');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(e) {
        const field = e.target;
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        
        clearFieldError(e);
        
        switch (fieldName) {
            case 'name':
                if (fieldValue.length < 2) {
                    showFieldError(fieldName, 'Nome deve ter pelo menos 2 caracteres');
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(fieldValue)) {
                    showFieldError(fieldName, 'Email inválido');
                }
                break;
            case 'subject':
                if (fieldValue.length < 5) {
                    showFieldError(fieldName, 'Assunto deve ter pelo menos 5 caracteres');
                }
                break;
            case 'message':
                if (fieldValue.length < 10) {
                    showFieldError(fieldName, 'Mensagem deve ter pelo menos 10 caracteres');
                }
                break;
        }
    }

    // FUNÇÕES AUXILIARES (você precisa implementar estas se não existirem)
    function showFieldError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.classList.add('error');
            
            // Remover mensagem de erro anterior
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Adicionar nova mensagem de erro
            const errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            errorElement.style.color = '#e74c3c';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '5px';
            errorElement.style.display = 'block';
            
            field.parentNode.appendChild(errorElement);
        }
    }
    
    function clearFieldError(e) {
        const field = e.target;
        field.classList.remove('error');
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function addFocusEffect(e) {
        e.target.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.3)';
        e.target.style.borderColor = '#667eea';
    }
    
    function removeFocusEffect(e) {
        e.target.style.boxShadow = 'none';
        e.target.style.borderColor = '#ddd';
    }
    
    function showFormFeedback(type, message) {
        // Remover feedback anterior
        const existingFeedback = document.querySelector('.form-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Criar novo feedback
        const feedback = document.createElement('div');
        feedback.className = `form-feedback ${type}`;
        feedback.textContent = message;
        
        // Estilos do feedback
        feedback.style.padding = '15px';
        feedback.style.borderRadius = '8px';
        feedback.style.marginTop = '20px';
        feedback.style.textAlign = 'center';
        feedback.style.fontWeight = '600';
        
        if (type === 'success') {
            feedback.style.backgroundColor = '#d4edda';
            feedback.style.color = '#155724';
            feedback.style.border = '1px solid #c3e6cb';
        } else {
            feedback.style.backgroundColor = '#f8d7da';
            feedback.style.color = '#721c24';
            feedback.style.border = '1px solid #f5c6cb';
        }
        
        // Adicionar ao formulário
        const form = document.querySelector('.contact-form');
        form.appendChild(feedback);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 5000);
    }
    
    function createConfettiEffect() {
        // Efeito simples de confetti
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            // Animação de queda
            let position = -10;
            const fall = setInterval(() => {
                position += Math.random() * 5 + 2;
                confetti.style.top = position + 'px';
                confetti.style.transform = `rotate(${position * 2}deg)`;
                
                if (position > window.innerHeight) {
                    clearInterval(fall);
                    confetti.remove();
                }
            }, 16);
        }
    }
}

// Inicializar quando o DOM carregar
document.addEventListener('DOMContentLoaded', initContactForm);
    function addFocusEffect(e) {
        const field = e.target;
        const formGroup = field.closest('.form-group');
        formGroup.style.transform = 'scale(1.02)';
        field.style.borderColor = '#6366f1';
        field.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
    }
    
    function removeFocusEffect(e) {
        const field = e.target;
        const formGroup = field.closest('.form-group');
        formGroup.style.transform = 'scale(1)';
        
        if (!field.closest('.form-group').querySelector('.field-error')) {
            field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            field.style.boxShadow = 'none';
        }
    }
    
    function showFieldError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        const formGroup = field.closest('.form-group');
        
        // Remover erro anterior
        clearFieldError({ target: field });
        
        // Adicionar erro
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            display: block;
            animation: slideInError 0.3s ease-out;
        `;
        
        formGroup.appendChild(errorElement);
        
        // Adicionar animação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInError {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        if (!document.querySelector('#error-animation-styles')) {
            style.id = 'error-animation-styles';
            document.head.appendChild(style);
        }
    }
    
    function clearFieldError(e) {
        const field = e.target;
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.field-error');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        field.style.boxShadow = 'none';
    }
    
    function showFormFeedback(type, message) {
        // Remover feedback anterior
        const existingFeedback = document.querySelector('.form-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Criar novo feedback
        const feedback = document.createElement('div');
        feedback.className = `form-feedback ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            text-align: center;
            animation: slideInFeedback 0.5s ease-out;
            ${type === 'success' ? 
                'background: rgba(34, 197, 94, 0.1); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.3);' : 
                'background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);'
            }
        `;
        
        contactForm.appendChild(feedback);
        
        // Adicionar animação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInFeedback {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        if (!document.querySelector('#feedback-animation-styles')) {
            style.id = 'feedback-animation-styles';
            document.head.appendChild(style);
        }
        
        // Remover feedback após 5 segundos
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.style.animation = 'fadeOut 0.10s ease-out';
                setTimeout(() => feedback.remove(), 500);
            }
        }, 5000);
    }
    
    function createConfettiEffect() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}vw;
                    top: -10px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 5000);
            }, i * 100);
        }
        
        // Adicionar animação do confetti
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(calc(100vh + 10px)) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        if (!document.querySelector('#confetti-animation-styles')) {
            style.id = 'confetti-animation-styles';
            document.head.appendChild(style);
        }
    }

// ===== INDICADOR DE SCROLL ===== 
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        // Adicionar animação pulsante
        scrollIndicator.style.animation = 'pulse 2s infinite';
        
        scrollIndicator.addEventListener('click', () => {
            const sobreSection = document.querySelector('#sobre');
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            window.scrollTo({
                top: sobreSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
        
        // Esconder indicador após scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateY(20px)';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateY(0)';
            }
        });
        
        // Adicionar animação CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: translateY(0); opacity: 1; }
                50% { transform: translateY(-10px); opacity: 0.7; }
            }
        `;
        if (!document.querySelector('#pulse-animation-styles')) {
            style.id = 'pulse-animation-styles';
            document.head.appendChild(style);
        }
    }
}

// ===== EFEITO DE DIGITAÇÃO ===== 
function initTypingEffect() {
    const nameElement = document.querySelector('.home-name');
    
    if (!nameElement) return;
    
    const originalText = nameElement.textContent;
    
    // Resetar texto
    nameElement.textContent = '';
    nameElement.style.borderRight = '2px solid #6366f1';
    nameElement.style.animation = 'blink 1s infinite';
    
    let i = 0;
    const typingSpeed = 100;
    
    function typeWriter() {
        if (i < originalText.length) {
            nameElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed + Math.random() * 50); // Velocidade variável
        } else {
            // Remover cursor após terminar
            setTimeout(() => {
                nameElement.style.borderRight = 'none';
                nameElement.style.animation = 'none';
                
                // Adicionar efeito de brilho
                nameElement.style.textShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
                setTimeout(() => {
                    nameElement.style.textShadow = 'none';
                }, 1000);
            }, 1000);
        }
    }
    
    // Iniciar efeito após delay
    setTimeout(typeWriter, 500);
    
    // Adicionar animação do cursor
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { border-color: #6366f1; }
            51%, 100% { border-color: transparent; }
        }
    `;
    if (!document.querySelector('#blink-animation-styles')) {
        style.id = 'blink-animation-styles';
        document.head.appendChild(style);
    }
}

// ===== ANIMAÇÕES DE SCROLL ===== 
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Adicionar delay escalonado para elementos filhos
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observar elementos com animação
    const animatedElements = document.querySelectorAll('[data-aos], .animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    
    // Adicionar estilos de animação
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-child {
            opacity: 0;
            transform: translateX(-20px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-child.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    if (!document.querySelector('#scroll-animation-styles')) {
        style.id = 'scroll-animation-styles';
        document.head.appendChild(style);
    }
}

// ===== BACKGROUND DE PARTÍCULAS ===== 
function initParticleBackground() {
    const particleContainer = document.querySelector('.particle-background');
    
    if (!particleContainer) {
        // Criar container se não existir
        const container = document.createElement('div');
        container.className = 'particle-background';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(container);
    }
    
    const container = document.querySelector('.particle-background');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 20;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${duration}s ${delay}s infinite linear;
        `;
        
        container.appendChild(particle);
    }
    
    // Adicionar animação das partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('#particle-animation-styles')) {
        style.id = 'particle-animation-styles';
        document.head.appendChild(style);
    }
}

// ===== TOGGLE DE TEMA ===== 
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        // Verificar tema salvo
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Efeito de transição suave
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// ===== BOTÃO VOLTAR AO TOPO ===== 
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
        // Criar botão se não existir
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: #6366f1;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
        `;
        document.body.appendChild(btn);
    }
    
    const btn = document.querySelector('.back-to-top');
    
    // Mostrar/esconder botão baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
            btn.style.transform = 'translateY(0)';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
            btn.style.transform = 'translateY(10px)';
        }
    });
    
    // Scroll para o topo
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Efeito de clique
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Hover effect
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px) scale(1.1)';
        btn.style.boxShadow = '0 6px 25px rgba(99, 102, 241, 0.4)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
        btn.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.3)';
    });
}

// ===== LAZY LOADING ===== 
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                // Criar nova imagem para pré-carregar
                const newImg = new Image();
                newImg.onload = () => {
                    img.src = src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                };
                newImg.src = src;
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    images.forEach(img => {
        // Adicionar placeholder blur
        img.style.filter = 'blur(5px)';
        img.style.transition = 'filter 0.3s ease';
        
        // Remover blur quando carregada
        img.addEventListener('load', () => {
            if (img.classList.contains('loaded')) {
                img.style.filter = 'none';
            }
        });
        
        imageObserver.observe(img);
    });
}

// ===== PRELOADER ===== 
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) {
        // Criar preloader se não existir
        const loader = document.createElement('div');
        loader.className = 'preloader';
        loader.innerHTML = `
            <div class="preloader-content">
                <div class="preloader-logo">
                    <div class="logo-animation"></div>
                </div>
                <div class="preloader-text">Carregando...</div>
                <div class="preloader-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        `;
        document.body.appendChild(loader);
        
        // Adicionar estilos do preloader
        const style = document.createElement('style');
        style.textContent = `
            .preloader-content {
                text-align: center;
                color: white;
            }
            
            .preloader-logo {
                margin-bottom: 2rem;
            }
            
            .logo-animation {
                width: 60px;
                height: 60px;
                border: 3px solid rgba(99, 102, 241, 0.3);
                border-top: 3px solid #6366f1;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            }
            
            .preloader-text {
                font-size: 1.2rem;
                margin-bottom: 2rem;
                font-weight: 300;
            }
            
            .preloader-progress {
                width: 200px;
                height: 3px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
                overflow: hidden;
                margin: 0 auto;
            }
            
            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #6366f1, #8b5cf6);
                width: 0%;
                transition: width 0.3s ease;
                border-radius: 3px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        if (!document.querySelector('#preloader-styles')) {
            style.id = 'preloader-styles';
            document.head.appendChild(style);
        }
    }
    
    const loader = document.querySelector('.preloader');
    const progressBar = loader.querySelector('.progress-bar');
    
    // Simular progresso de carregamento
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Esconder preloader após carregamento completo
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 500);
        }
    }, 100);
    
    // Garantir que o preloader seja removido mesmo se houver erro
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader && loader.parentNode) {
                progress = 100;
                progressBar.style.width = '100%';
                
                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.style.visibility = 'hidden';
                    
                    setTimeout(() => {
                        if (loader.parentNode) {
                            loader.remove();
                        }
                    }, 500);
                }, 300);
            }
        }, 1000);
    });
}

// ===== MODAL DE PROJETOS ===== 
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const viewBtn = card.querySelector('.view-project-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectData = getProjectData(card);
                openProjectModal(projectData);
            });
        }
    });
    
    function getProjectData(card) {
        return {
            title: card.querySelector('.project-title')?.textContent || '',
            description: card.querySelector('.project-description')?.textContent || '',
            image: card.querySelector('.project-image')?.src || '',
            technologies: Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent),
            liveUrl: card.getAttribute('data-live-url') || '#',
            githubUrl: card.getAttribute('data-github-url') || '#',
            category: card.getAttribute('data-category') || ''
        };
    }
    
    function openProjectModal(data) {
        // Remover modal existente
        const existingModal = document.querySelector('.project-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Criar modal
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-header">
                        <img src="${data.image}" alt="${data.title}" class="modal-image">
                        <div class="modal-info">
                            <h3 class="modal-title">${data.title}</h3>
                            <p class="modal-description">${data.description}</p>
                            <div class="modal-technologies">
                                ${data.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <a href="${data.liveUrl}" target="_blank" class="btn btn-primary">
                            <i class="fas fa-external-link-alt"></i> Ver Projeto
                        </a>
                        <a href="${data.githubUrl}" target="_blank" class="btn btn-secondary">
                            <i class="fab fa-github"></i> Ver Código
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // Adicionar estilos do modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            animation: modalFadeIn 0.3s ease-out;
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Event listeners
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
        
        // Fechar com ESC
        document.addEventListener('keydown', handleEscKey);
        
        function closeModal() {
            modal.style.animation = 'modalFadeOut 0.3s ease-out';
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                modal.remove();
                document.removeEventListener('keydown', handleEscKey);
            }, 300);
        }
        
        function handleEscKey(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        }
    }
    
    // Adicionar estilos do modal
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .modal-overlay {
            background: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .modal-content {
            background: #1a1a3a;
            border-radius: 1rem;
            max-width: 600px;
            width: 100%;
            position: relative;
            animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
        }
        
        .modal-close:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .modal-header {
            padding: 2rem;
        }
        
        .modal-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .modal-title {
            color: white;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .modal-description {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        
        .modal-technologies {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .modal-actions {
            padding: 0 2rem 2rem;
            display: flex;
            gap: 1rem;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .btn-primary {
            background: #6366f1;
            color: white;
        }
        
        .btn-primary:hover {
            background: #5855eb;
            transform: translateY(-2px);
        }
        
        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
    `;
    if (!document.querySelector('#modal-styles')) {
        style.id = 'modal-styles';
        document.head.appendChild(style);
    }
}

// ===== CURSOR PERSONALIZADO ===== 
function initCustomCursor() {
    if (window.innerWidth < 768) return; // Não usar em mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(99, 102, 241, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    cursorTrail.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(cursorTrail);
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    });
    
    // Animar trail com delay
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX - 20 + 'px';
        cursorTrail.style.top = trailY - 20 + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
    
    // Efeitos de hover
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorTrail.style.transform = 'scale(1.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorTrail.style.transform = 'scale(1)';
        });
    });
    
    // Esconder cursor padrão
    document.body.style.cursor = 'none';
    
    // Esconder cursor personalizado quando sair da janela
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorTrail.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorTrail.style.opacity = '1';
    });
}

// ===== SISTEMA DE NOTIFICAÇÕES ===== 
function initNotificationSystem() {
    window.showNotification = function(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <i class="${icons[type]}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: slideInNotification 0.3s ease-out;
            ${getNotificationColor(type)}
        `;
        
        document.body.appendChild(notification);
        
        // Fechar notificação
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => closeNotification(notification));
        
        // Auto fechar
        if (duration > 0) {
            setTimeout(() => closeNotification(notification), duration);
        }
        
        function closeNotification(notification) {
            notification.style.animation = 'slideOutNotification 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    };
    
    function getNotificationColor(type) {
        const colors = {
            success: 'background: linear-gradient(135deg, #22c55e, #16a34a);',
            error: 'background: linear-gradient(135deg, #ef4444, #dc2626);',
            warning: 'background: linear-gradient(135deg, #f59e0b, #d97706);',
            info: 'background: linear-gradient(135deg, #6366f1, #5855eb);'
        };
        return colors[type] || colors.info;
    }
    
    // Adicionar animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInNotification {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutNotification {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
}

// ===== PERFORMANCE MONITORING ===== 
function initPerformanceMonitoring() {
    // Monitorar FPS
    let frames = 0;
    let lastTime = performance.now();
    
    function countFPS() {
        frames++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            const fps = Math.round((frames * 1000) / (currentTime - lastTime));
            
            // Log FPS baixo
            if (fps < 30) {
                console.warn(`Low FPS detected: ${fps}`);
            }
            
            frames = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(countFPS);
    }
    
    requestAnimationFrame(countFPS);
    
    // Monitorar tempo de carregamento
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        if (loadTime > 3000) {
            console.warn('Slow page load detected');
        }
    });
    
    // Monitorar uso de memória (se disponível)
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
            const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);
            
            if (usedMB > limitMB * 0.8) {
                console.warn(`High memory usage: ${usedMB}MB / ${limitMB}MB`);
            }
        }, 30000);
    }
}

// ===== INICIALIZAÇÃO FINAL ===== 
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se todas as funções foram carregadas
    const requiredFunctions = [
        'initNavigation', 'initSkillBars', 'initProjectFilters', 
        'initContactForm', 'initScrollIndicator', 'initTypingEffect'
    ];
    
    const missingFunctions = requiredFunctions.filter(fn => typeof window[fn] !== 'function');
    
    if (missingFunctions.length > 0) {
        console.error('Missing functions:', missingFunctions);
        return;
    }
    
    // Inicializar funcionalidades adicionais
    setTimeout(() => {
        initProjectModals();
        initCustomCursor();
        initNotificationSystem();
        initPerformanceMonitoring();
    }, 1000);
    
    // Mostrar notificação de boas-vindas
    setTimeout(() => {
        if (typeof showNotification === 'function') {
            showNotification('Bem-vindo(a) ao meu portfólio! 🚀', 'success', 4000);
        }
    }, 2000);
    
    console.log('✅ Portfolio JavaScript carregado com sucesso!');
});

// ===== UTILITÁRIOS ADICIONAIS ===== 
const PortfolioUtils = {
    // Debounce function
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Smooth scroll to element
    scrollToElement: function(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Format date
    formatDate: function(date) {
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },
    
    // Generate random ID
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    }
};

// Tornar utilitários disponíveis globalmente
window.PortfolioUtils = PortfolioUtils;