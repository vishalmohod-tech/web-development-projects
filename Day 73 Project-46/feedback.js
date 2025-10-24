document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    const reviewsList = document.getElementById('reviewsList');

    let reviews = [];

    function renderReviews() {
        reviewsList.innerHTML = '';
        if (reviews.length === 0) {
            reviewsList.innerHTML = '<p class="no-reviews">No reviews submitted yet. Be the first! 🚀</p>';
            return;
        }

        reviews.forEach((review, index) => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');

            const starRating = '⭐'.repeat(review.rating) + ' (Rating: ' + review.rating + ')';

            reviewCard.innerHTML = `
                <h4>Review from: ${review.name}</h4>
                <p class="rating">${starRating}</p>
                <p>${review.text}</p>
            `;
            reviewsList.prepend(reviewCard); 
        });
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const reviewerName = document.getElementById('reviewerName').value.trim();
        const rating = parseInt(document.getElementById('rating').value);
        const reviewText = document.getElementById('reviewText').value.trim();

        if (!reviewerName || !rating || !reviewText) {
            alert('Please fill out all fields.');
            return;
        }
        if (rating < 1 || rating > 5) {
            alert('Rating must be between 1 and 5.');
            return;
        }

        const newReview = {
            name: reviewerName,
            rating: rating,
            text: reviewText,
            timestamp: new Date().toISOString() 
                };

        reviews.push(newReview);

        
        renderReviews();

        form.reset();
    });
    renderReviews();
});