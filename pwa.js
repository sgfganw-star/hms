if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js').then((registration) => {
                    console.log('ServiceWorker registration successful');
                }).catch((err) => {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }

        let deferredPrompt;
        const installBtn = document.getElementById('install-app-btn');

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.classList.remove('hidden');
        });

        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                    installBtn.classList.add('hidden');
                }
                deferredPrompt = null;
            }
        });

        window.addEventListener('appinstalled', (evt) => {
            installBtn.classList.add('hidden');
        });