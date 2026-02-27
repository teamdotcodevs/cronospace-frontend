document.addEventListener("DOMContentLoaded", () => {
    const path = document.querySelector("#scroll-path");
    const pathLength = path.getTotalLength();

    // Prepare path for animation
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    window.addEventListener("scroll", () => {
        const section = document.querySelector(".onboarding-staggered");
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Trigger drawing slightly before section enters middle of screen
        const scrollPercent = (window.scrollY - (sectionTop - window.innerHeight / 2)) / sectionHeight;
        
        const draw = pathLength * Math.max(0, Math.min(1, scrollPercent));
        path.style.strokeDashoffset = pathLength - draw;
    });
});


function toggleModal(isVisible) {
    const modal = document.getElementById('demoModal');
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

// Sync Date/Time Text
function syncDisplay(inputId, displayId, fallback) {
    const input = document.getElementById(inputId);
    const display = document.getElementById(displayId);
    
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
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-black-glow');
    btn.innerHTML = "<span>details Sended..</span>";
    
    setTimeout(() => {
        btn.innerHTML = "<span> Thank You!. Our team will connect You On the time you provided</span>";
        btn.style.background = "#00d285";
        // Close modal after success
        setTimeout(() => toggleModal(false), 4000);
    }, 1500);
});



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


function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
    
    // Prevent scrolling when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}