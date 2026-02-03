// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    const notificationClose = document.querySelector('.notification-close');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');
            
            // In a real application, you would add this to a shopping cart
            // For this demo, we'll just show a notification
            showNotification(`${productName} added to your order!`);
            
            // Update order form checkboxes
            const checkboxes = document.querySelectorAll('input[name="products[]"]');
            checkboxes.forEach(checkbox => {
                if (checkbox.value === productName) {
                    checkbox.checked = true;
                }
            });
        });
    });
    
    // Notification functionality
    function showNotification(message) {
        notificationMessage.textContent = message;
        notification.classList.add('active');
        
        setTimeout(() => {
            notification.classList.remove('active');
        }, 3000);
    }
    
    if (notificationClose) {
        notificationClose.addEventListener('click', function() {
            notification.classList.remove('active');
        });
    }
    
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    const orderForm = document.getElementById('orderForm');
    
    // Contact Form Validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('contactName');
            const email = document.getElementById('contactEmail');
            const message = document.getElementById('contactMessage');
            
            let isValid = true;
            
            // Reset error states
            [name, email, message].forEach(field => {
                field.style.borderColor = '';
            });
            
            // Validate name
            if (!name.value.trim()) {
                name.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                email.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                message.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            if (isValid) {
                // In a real application, you would send the form data to Formspree or a backend
                // Replace {your-form-id} with your actual Formspree form ID
                this.action = 'https://formspree.io/f/{your-form-id}';
                
                // Show success message
                showNotification('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                showNotification('Please fill in all required fields correctly.');
            }
        });
    }
    
    // Order Form Validation
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('orderName');
            const email = document.getElementById('orderEmail');
            const phone = document.getElementById('orderPhone');
            const quantity = document.getElementById('orderQuantity');
            const orderType = document.getElementById('orderType');
            const date = document.getElementById('orderDate');
            const productCheckboxes = document.querySelectorAll('input[name="products[]"]:checked');
            
            let isValid = true;
            
            // Reset error states
            [name, email, phone, quantity, orderType, date].forEach(field => {
                if (field) field.style.borderColor = '';
            });
            
            // Validate name
            if (!name.value.trim()) {
                name.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                email.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            // Validate phone
            const phoneRegex = /^[+]?[\d\s\-()]+$/;
            if (!phone.value.trim() || !phoneRegex.test(phone.value)) {
                phone.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            // Validate at least one product selected
            if (productCheckboxes.length === 0) {
                showNotification('Please select at least one product.');
                isValid = false;
            }
            
            // Validate quantity
            if (!quantity.value) {
                quantity.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            // Validate order type
            if (!orderType.value) {
                orderType.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            // Validate date
            if (!date.value) {
                date.style.borderColor = '#d32f2f';
                isValid = false;
            }
            
            if (isValid) {
                // In a real application, you would send the form data to Formspree or a backend
                // Replace {your-form-id} with your actual Formspree form ID
                this.action = 'https://formspree.io/f/{your-form-id}';
                
                // Show success message
                showNotification('Thank you for your order! We will contact you to confirm details.');
                this.reset();
                
                // Set default date to tomorrow
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                date.value = tomorrow.toISOString().split('T')[0];
            } else {
                showNotification('Please fill in all required fields correctly.');
            }
        });
        
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('orderDate').min = today;
        
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('orderDate').value = tomorrow.toISOString().split('T')[0];
    }
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});