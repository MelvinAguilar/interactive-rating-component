let ratingInputs = null;
let ratingSubmit = null;
let ratingReset = null;
let ratingTextSubmit = null;
let ratingContainer = null;
let thanksContainer = null;
let ratingForm = null;

// Set elements
const bindElements = () => {
    ratingForm = document.querySelector('.rating-form');
    ratingInputs = document.querySelectorAll('.rating-form__input');
    ratingSubmit = document.querySelector('#rating-submit');
    ratingReset = document.querySelector('#rating-reset');
    ratingTextSubmit = document.querySelector('#rating-text');
    ratingContainer = document.querySelector('#rating-state');
    thanksContainer = document.querySelector('#thanks-state');
}

// Set listeners for form
const setFormListeners = () => {
    // If rating is clicked change state of submit button to active
    ratingInputs.forEach(input => {
        input.addEventListener('change', () => {
            ratingSubmit.disabled = false;
        });
    });

    ratingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get rating value and write it to span element
        const formData = new FormData(ratingForm);
        ratingTextSubmit.textContent = formData.get('rating');

        // Update animation of rating container and show thanks container
        ratingContainer.classList.remove('card--show');
        void ratingContainer.offsetWidth;
        ratingContainer.classList.add('card--hidden');
        thanksContainer.classList.remove('card--top');
    });

    ratingReset.addEventListener('click', event => {
        // Reset form and show rating card
        thanksContainer.classList.remove('card--center');
        thanksContainer.classList.add('card--top');
        ratingSubmit.disabled = true;

        // Remove checked state from all inputs
        ratingInputs.forEach(input => {
            input.checked = false;
        });
    });
}

// Set animations for form
const setFormAnimations = () => {
    ratingContainer.onanimationend = () => {
        // If animation of show rating container is finished show thanks container
        if (ratingContainer.classList.contains('card--hidden')) {
            ratingContainer.style.display = 'none';
            thanksContainer.style.display = 'flex';
            thanksContainer.classList.add('card--center');
        } 
    };

    thanksContainer.onanimationend = () => {
        // If animation of hide thanks container is finished show rating container
        if (thanksContainer.classList.contains('card--top')){
            thanksContainer.style.display = 'none';
            ratingContainer.style.display = 'flex';
            ratingContainer.classList.remove('card--hidden');
            ratingContainer.classList.add('card--show');
        }
    };
}

// Main function
const main = () => {
    bindElements();
    setFormListeners();
    setFormAnimations();
}

// Run main function
main();