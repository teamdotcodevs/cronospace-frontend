document.addEventListener("DOMContentLoaded", () => {
    const path = document.querySelector("#scroll-path");
    
    // Only run path animation if scroll-path element exists
    if (path) {
        const pathLength = path.getTotalLength();

        // Prepare path for animation
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;

        window.addEventListener("scroll", () => {
            const section = document.querySelector(".onboarding-staggered");
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                // Trigger drawing slightly before section enters middle of screen
                const scrollPercent = (window.scrollY - (sectionTop - window.innerHeight / 2)) / sectionHeight;
                
                const draw = pathLength * Math.max(0, Math.min(1, scrollPercent));
                path.style.strokeDashoffset = pathLength - draw;
            }
        });
    }

    // Initialize Testimonials Pagination
    initTestimonialsPagination();
});

// Testimonials Pagination Functionality
function initTestimonialsPagination() {
    const pages = document.querySelectorAll('.testimonial-page');
    const dots = document.querySelectorAll('.pagination-dot');
    let currentPage = 1;
    let autoRotateInterval;

    // Show first page initially
    showPage(1);

    // Add click handlers to dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const pageNum = parseInt(dot.dataset.page);
            showPage(pageNum);
            resetAutoRotate();
        });
    });

    // Auto-rotate functionality
    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            currentPage = currentPage >= pages.length ? 1 : currentPage + 1;
            showPage(currentPage);
        }, 5000); // Change page every 5 seconds
    }

    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }

    function showPage(pageNum) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active', 'prev');
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show selected page
        const targetPage = document.querySelector(`.testimonial-page[data-page="${pageNum}"]`);
        const targetDot = document.querySelector(`.pagination-dot[data-page="${pageNum}"]`);
        
        if (targetPage && targetDot) {
            // Mark previous page
            const prevPage = document.querySelector('.testimonial-page.active');
            if (prevPage) {
                prevPage.classList.add('prev');
                setTimeout(() => prevPage.classList.remove('prev'), 500);
            }

            targetPage.classList.add('active');
            targetDot.classList.add('active');
            currentPage = pageNum;
        }
    }

    // Start auto-rotation
    startAutoRotate();

    // Pause auto-rotation on hover
    const wrapper = document.querySelector('.testimonials-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
        wrapper.addEventListener('mouseleave', startAutoRotate);
    }
}

// Read More functionality for testimonials
function toggleReadMore(button) {
    const testimonialText = button.previousElementSibling;
    const isExpanded = testimonialText.classList.contains('expanded');
    
    if (isExpanded) {
        testimonialText.classList.remove('expanded');
        button.textContent = 'Read More';
    } else {
        testimonialText.classList.add('expanded');
        button.textContent = 'Read Less';
    }
}


function toggleModal(isVisible) {
    const modal = document.getElementById('demoModal');
    if (!modal) return;

    if (isVisible) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scrolling
    } else {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';   // Unlock scrolling
    }
}

// Handle clicking outside to close
window.addEventListener('click', (e) => {
    const modal = document.getElementById('demoModal');
    if (e.target === modal) {
        toggleModal(false);
    }
});

// Form Submission Feedback
const leadForm = document.getElementById('leadForm');
if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.btn-submit-black');
        const originalText = submitBtn.innerText;
        
        // UI Feedback
        submitBtn.innerText = "SENDING...";
        submitBtn.disabled = true;

        // Simulate an API call
        setTimeout(() => {
            submitBtn.style.background = "#00d285";
            submitBtn.style.color = "#000";
            submitBtn.innerText = "SUCCESS!";
            
            setTimeout(() => {
                toggleModal(false);
                leadForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.style.background = "#000";
                submitBtn.style.color = "#fff";
                submitBtn.disabled = false;
            }, 1500);
        }, 1000);
    });
}

// Sync Date/Time Text
function syncDisplay(inputId, displayId, fallback) {
    const input = document.getElementById(inputId);
    const display = document.getElementById(displayId);
    if (!input || !display) return;
    
    input.addEventListener('change', () => {
        if (input.value) {
            display.innerText = input.value.toUpperCase();
            display.style.color = "#00d285";
        } else {
            display.innerText = fallback;
        }
    });
}

syncDisplay('date-input', 'date-display', 'Select Date');
syncDisplay('time-input', 'time-display', 'Select Time');

// Success Message logic remains similar but with added flare
if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('.btn-black-glow');
        if (!btn) return;

        btn.innerHTML = "<span>details Sended..</span>";
        
        setTimeout(() => {
            btn.innerHTML = "<span> Thank You!. Our team will connect You On the time you provided</span>";
            btn.style.background = "#00d285";
            // Close modal after success
            setTimeout(() => toggleModal(false), 4000);
        }, 1500);
    });
}



function switchPricing() {
    const toggle = document.getElementById('version-toggle');
    const v1Plans = document.getElementById('v1-plans');
    const v2Plans = document.getElementById('v2-plans');

    if (toggle.checked) {
        // Show V2
        v1Plans.style.display = 'none';
        v2Plans.style.display = 'flex';
    } else {
        // Show V1
        v1Plans.style.display = 'flex';
        v2Plans.style.display = 'none';
    }
}


function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = document.getElementById('pricingDropdown');
    if (!dropdown) return;
    
    dropdown.classList.toggle('show');
}

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    if (!navLinks || !menuToggle) return;
    
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
    
    // Prevent scrolling when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('pricingDropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    
    if (dropdown && dropdown.classList.contains('show') && 
        !dropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

// Close menu when clicking on nav links (except Book Demo button and dropdown toggles)
document.addEventListener('click', function(e) {
    const navLinks = document.getElementById('navLinks');
    
    if (navLinks && navLinks.classList.contains('active') && 
        e.target.tagName === 'A' && 
        !e.target.closest('.btn-black') && 
        !e.target.closest('.dropdown-toggle')) {
        toggleMenu();
    }
});

// Handle demo lead form submission
document.addEventListener('DOMContentLoaded', function() {
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(leadForm);
            const submitButton = leadForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<span>Submitting...</span>';
            submitButton.disabled = true;
            
            fetch('/submit-demo-lead/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': formData.get('csrfmiddlewaretoken')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    showNotification('Demo request submitted successfully.Our Team will Contact You Soon!', 'success');
                    leadForm.reset();
                    toggleModal(false);
                } else {
                    showNotification(data.message || 'Error submitting form', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Network error. Please try again.', 'error');
            })
            .finally(() => {
                // Restore button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
});

// Notification function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background-color: #28a745;' : 'background-color: #dc3545;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
