tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: { 
                    50: '#fffbeb', 
                    100: '#fef3c7', 
                    500: '#f59e0b', 
                    600: '#d97706', 
                    700: '#b45309', 
                    800: '#92400e',
                    950: '#451a03' 
                },
                darkBg: '#090d16', 
                darkCard: '#111827', 
                darkBorder: '#1f2937'
            },
            fontFamily: { 
                sans: ['Tajawal', 'sans-serif'],
                en: ['Inter', 'sans-serif']
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scale-up': 'scaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
            },
            keyframes: {
                fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                slideUp: { '0%': { opacity: '0', transform: 'translateY(15px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                scaleUp: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } }
            }
        }
    }
}