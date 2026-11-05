
const weddingDate = new Date("2027-02-03T00:00:00+05:30").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {
        document.querySelector(".countdown").innerHTML =
            "<h3>It's Wedding Time! ❤️</h3>";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Wedding Gallery Lightbox

const galleryImages = document.querySelectorAll(
    ".gallery-item img, .family-photo img, .header-photos img"
);
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
        lightboxImage.src = img.src;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
});

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }
});
