const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let initialX = null;

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots[index].classList.remove('active');
    });
    dots[currentIndex].classList.add('active');
    
    // Save the ID of the active "dot" to local storage
    localStorage.setItem('activeDotID', dots[currentIndex].id);
}

function nextSlide() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

function handleTouchStart(e) {
    initialX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    if (initialX === null) return;

    const currentX = e.touches[0].clientX;
    const deltaX = currentX - initialX;

    if (deltaX > 30) {
        prevSlide();
        initialX = null;
    } else if (deltaX < -30) {
        nextSlide();
        initialX = null;
    }
}

function handleTouchEnd() {
    initialX = null;
}

document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
document.addEventListener('touchend', handleTouchEnd);

// Load the active "dot" ID from local storage
const activeDotID = localStorage.getItem('activeDotID');
if (activeDotID) {
    // Find the index of the active "dot" and set the currentIndex
    const activeDotIndex = Array.from(dots).findIndex(dot => dot.id === activeDotID);
    if (activeDotIndex !== -1) {
        currentIndex = activeDotIndex;
        updateCarousel();
    }
}

// Save the ID of the active "dot" to local storage
localStorage.setItem('activeDotID', dots[currentIndex].id);
console.log(localStorage.getItem('activeDotID'));
console.log(localStorage.getItem('selectedTime'));
