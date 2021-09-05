const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

// determining slide positions
const slideSize = slides[0].getBoundingClientRect().width;

slides.forEach((slide, index) => {
    slide.style.left = slideSize * index + 'px';
})

// Moves the carousel to a target slide
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current_slide_carousel');
    targetSlide.classList.add('current_slide_carousel');
}

// Update carousel nav dots
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current_slide');
    targetDot.classList.add('current_slide');
}

// hiding left-right arrow controls when on left or right end slides
const hideShowArrow = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

// Left button click
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current_slide_carousel');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current_slide');
    const targetDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    // Move to prev slide
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, targetDot);
    hideShowArrow(slides, prevButton, nextButton, prevIndex);
})

// Right button click
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current_slide_carousel');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current_slide');
    const targetDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    
    // Move to next slide
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, targetDot);
    hideShowArrow(slides, prevButton, nextButton, nextIndex);
})

// Click nav buttons
dotsNav.addEventListener('click', e=> {
    // what indicator was clicked
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current_slide_carousel');
    const currentDot = dotsNav.querySelector('.current_slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrow(slides, prevButton, nextButton, targetIndex);
})