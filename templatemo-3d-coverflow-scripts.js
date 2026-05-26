/*

TemplateMo 595 3d coverflow

https://templatemo.com/tm-595-3d-coverflow

*/

// JavaScript Document

        // Coverflow functionality
        const items = document.querySelectorAll('.coverflow-item');
        const dotsContainer = document.getElementById('dots');
        const currentTitle = document.getElementById('current-title');
        const currentDescription = document.getElementById('current-description');
        const container = document.querySelector('.coverflow-container');
        const menuToggle = document.getElementById('menuToggle');
        const mainMenu = document.getElementById('mainMenu');
        let currentIndex = 3;
        let isAnimating = false;
        const gameAudio = new Audio(); // objeto de áudio compartilhado (evita sobreposição)
        let idleTimer = null;    // timer de 5s para falar ao entrar no jogo
        let repeatTimer = null;  // timer de 60s para repetir enquanto idle

        // Mobile menu toggle
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on menu items (except external links)
        document.querySelectorAll('.menu-item:not(.external)').forEach(item => {
            item.addEventListener('click', (e) => {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        });

        // Image data with titles and descriptions
        const imageData = [
            {
                title: "Bingo das Sílabas",
                description: "Vamos brincar de bingo e formar palavras!",
                url: "https://vieiranaju.github.io/bingo-de-silabas-HTML/",
                audio: "áudios/bingo_das_silabas.mp3"
            },
            {
                title: "Caça ao Tesouro",
                description: "Encontre o tesouro escondido nas palavras!",
                url: "https://hedropedro.github.io/CacaAoAbacada/",
                audio: "áudios/caça_ao_tesouro.mp3"
            },
            {
                title: "Corrida das Sílabas",
                description: "Quem chega primeiro ganha!",
                url: "https://educalza.github.io/Corrida-das-Silabas/",
                audio: "áudios/corrida_das_silabas.mp3"
            },
            {
                title: "Ligue as Sílabas",
                description: "Ligue os pontinhos e forme sílabas!",
                url: "https://rafaeltomazgraciano.github.io/ligue-as-silabas/",
                audio: "áudios/ligue_as_silabas.mp3"
            },
            {
                title: "O Monstrinho Faminto",
                description: "Alimente o monstrinho com as sílabas certas!",
                url: "https://gabrielwitor.github.io/Monstrinho-Faminto/",
                audio: "áudios/monstrinho_faminto.mp3"
            },
            {
                title: "Piscina Maluca",
                description: "Mergulhe na diversão!",
                url: "https://istefanuto.github.io/jogoAbacada/",
                audio: "áudios/piscina_maluca.mp3"
            },
            {
                title: "Robô Montador",
                description: "Ajude o robô a montar as palavras!",
                url: "https://pauloluzkk.github.io/Game-ABACADA/",
                audio: "áudios/robo_montador.mp3"
            },
            {
                title: "Salão das Sílabas",
                description: "Venha para o salão mais divertido!",
                url: "https://juuhgb.github.io/salao-das-silabas/",
                audio: "áudios/salao_das_silabas.mp3"
            },
            {
                title: "Trem das Sílabas",
                description: "Piuiiii! Embarque no trem do conhecimento!",
                url: "https://giovanariber.github.io/trem-de-silabas-html/",
                audio: "áudios/trem_das_silabas.mp3"
            },
            {
                title: "Escova Escova",
                description: "Escove os dentes com as sílabas certas!",
                url: "https://vitorhhiguchi.github.io/escova-escova-uenp/",
                audio: "áudios/escova_escova.mp3"
            },
            {
                title: "Cobrinha das Sílabas",
                description: "Guie a cobrinha e forme palavras!",
                url: "https://dieegovieira.github.io/cobra-das-silabas/",
                audio: "áudios/cobrinha_das_silabas.mp3"
            },
            {
                title: "Pesca Sílabas",
                description: "Lance a isca e pesque as sílabas certas!",
                url: "https://m-valentim.github.io/pesca-silabas/",
                audio: "áudios/pesca_silabas.mp3"
            },
            {
                title: "Enigma da Esfinge",
                description: "Decifre os enigmas e aprenda brincando!",
                url: "https://ilhayoshida.github.io/Enigma_da_Esfinge/",
                audio: "áudios/enigma_da_esfinge.mp3"
            },
            {
                title: "Indicabla",
                description: "Um jogo cheio de desafios e diversão!",
                url: "https://gustavkeller-23.github.io/DiscoGame/",
                audio: "áudios/indicabla.mp3"
            }
        ];

        // Create dots
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.onclick = () => goToIndex(index);
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateCoverflow() {
            if (isAnimating) return;
            isAnimating = true;

            items.forEach((item, index) => {
                let offset = index - currentIndex;
                
                if (offset > items.length / 2) {
                    offset = offset - items.length;
                }
                else if (offset < -items.length / 2) {
                    offset = offset + items.length;
                }
                
                const absOffset = Math.abs(offset);
                const sign = Math.sign(offset);
                
                let translateX = offset * 220;
                let translateZ = -absOffset * 200;
                let rotateY = -sign * Math.min(absOffset * 60, 60);
                let opacity = 1 - (absOffset * 0.2);
                let scale = 1 - (absOffset * 0.1);

                if (absOffset > 3) {
                    opacity = 0;

                    translateX = sign * 800;
                }

                item.style.transform = `
                    translateX(${translateX}px) 
                    translateZ(${translateZ}px) 
                    rotateY(${rotateY}deg)
                    scale(${scale})
                `;
                item.style.opacity = opacity;
                item.style.zIndex = 100 - absOffset;

                item.classList.toggle('active', index === currentIndex);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            const currentData = imageData[currentIndex];
            currentTitle.textContent = currentData.title;
            currentDescription.textContent = currentData.description;
            
            const playButton = document.getElementById('play-button');
            if (playButton) {
                playButton.href = currentData.url;
                playButton.target = '_blank';
                playButton.rel = 'noopener noreferrer';
            }
            
            currentTitle.style.animation = 'none';
            currentDescription.style.animation = 'none';
            setTimeout(() => {
                currentTitle.style.animation = 'fadeIn 0.6s forwards';
                currentDescription.style.animation = 'fadeIn 0.6s forwards';
            }, 10);

            // Tocar áudio imediatamente ao navegar + reiniciar timers de ociosidade
            playCurrentAudio();
            resetIdleTimers();

            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }

        // Toca o áudio do jogo atual (sem sobreposição)
        function playCurrentAudio() {
            const data = imageData[currentIndex];
            if (!data || !data.audio) return;
            gameAudio.pause();
            gameAudio.currentTime = 0;
            gameAudio.src = data.audio;
            gameAudio.play().catch(() => {});
        }

        // Reinicia os timers de repetição automática de áudio
        function resetIdleTimers() {
            clearTimeout(idleTimer);
            clearInterval(repeatTimer);

            // Após 5s parado no jogo, fala o nome (inclui carga inicial)
            idleTimer = setTimeout(() => {
                playCurrentAudio();

                // Repete a cada 60s enquanto o usuário estiver parado no mesmo jogo
                repeatTimer = setInterval(() => {
                    playCurrentAudio();
                }, 60000);
            }, 5000);
        }

        function navigate(direction) {
            if (isAnimating) return;
            
            currentIndex = currentIndex + direction;
            
            if (currentIndex < 0) {
                currentIndex = items.length - 1;
            } else if (currentIndex >= items.length) {
                currentIndex = 0;
            }
            
            updateCoverflow();
        }

        function goToIndex(index) {
            if (isAnimating || index === currentIndex) return;
            currentIndex = index;
            updateCoverflow();
        }

        // Keyboard navigation
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });

        // Click on items to select
        items.forEach((item, index) => {
            item.addEventListener('click', () => goToIndex(index));
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        let isSwiping = false;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isSwiping = true;
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            
            const currentX = e.changedTouches[0].screenX;
            const diff = currentX - touchStartX;
            
            if (Math.abs(diff) > 10) {
                e.preventDefault();
            }
        }, { passive: false });

        container.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
            isSwiping = false;
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 30;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
                handleUserInteraction();
                
                if (diffX > 0) {
                    navigate(1);
                } else {
                    navigate(-1);
                }
            }
        }

        // Initialize images and reflections
        items.forEach((item, index) => {
            const img = item.querySelector('img');
            const reflection = item.querySelector('.reflection');

            function applyReflection(imgEl) {
                imgEl.parentElement.classList.remove('image-loading');
                reflection.style.setProperty('--bg-image', `url(${imgEl.src})`);
                reflection.style.backgroundImage = `url(${imgEl.src})`;
                reflection.style.backgroundSize = 'cover';
                reflection.style.backgroundPosition = 'center';
            }

            // If the image already loaded (e.g. from cache), apply immediately
            if (img.complete && img.naturalWidth > 0) {
                applyReflection(img);
            } else {
                img.onload = function() {
                    applyReflection(this);
                };

                img.onerror = function() {
                    this.parentElement.classList.add('image-loading');
                };
            }
        });

        // Autoplay removed for better accessibility for kids

        function handleUserInteraction() {
            // Navegação do usuário já toca o áudio e reinicia os timers via updateCoverflow
        }

        // Add event listeners
        items.forEach((item) => {
            item.addEventListener('click', handleUserInteraction);
        });

        document.querySelector('.nav-button.prev').addEventListener('click', handleUserInteraction);
        document.querySelector('.nav-button.next').addEventListener('click', handleUserInteraction);
        
        dots.forEach((dot) => {
            dot.addEventListener('click', handleUserInteraction);
        });

        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                handleUserInteraction();
            }
        });

        // Smooth scrolling and active menu item
        const sections = document.querySelectorAll('.section');
        const menuItems = document.querySelectorAll('.menu-item');
        const header = document.getElementById('header');
        const scrollToTopBtn = document.getElementById('scrollToTop');

        // Update active menu item on scroll
        function updateActiveMenuItem() {
            const scrollPosition = window.scrollY + 100;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    menuItems.forEach(item => {
                        if (!item.classList.contains('external')) {
                            item.classList.remove('active');
                        }
                    });
                    if (menuItems[index] && !menuItems[index].classList.contains('external')) {
                        menuItems[index].classList.add('active');
                    }
                }
            });

            // Header background on scroll
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Show/hide scroll to top button
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', updateActiveMenuItem);

        // Smooth scroll to section
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetId = item.getAttribute('href');
                
                // Check if it's an internal link (starts with #)
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                // External links will open normally in new tab
            });
        });

        // Logo click to scroll to top
        document.querySelector('.logo-container').addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Scroll to top button
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Initialize
        updateCoverflow();
        container.focus();

        // Iniciar timers de áudio ocioso desde o carregamento da página
        resetIdleTimers();