const elementos = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

elementos.forEach(el => observer.observe(el));

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".galeria img").forEach(img => {
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("activo");
    });
});

lightbox.addEventListener("click", () => {
    lightbox.classList.remove("activo");
});