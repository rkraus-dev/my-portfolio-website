export function ensureMuted(video) {
    if (!video) return;
    video.muted = true;
    video.addEventListener("canplay", () => video.classList.add("is-ready"));

    // ease out playback only in the final moment
    video.addEventListener("timeupdate", () => {
        const remaining = video.duration - video.currentTime;
        if (remaining < 0.6 && video.playbackRate > 0.55) {
            video.playbackRate = Math.max(0.55, remaining / 0.6 * 0.9 + 0.1);
        }
    });

    video.addEventListener("ended", () => {
        video.classList.add("is-ended");
        video.pause(); // holds the last frame
    });

    video.play().catch(() => {});
}

export function initNavbarScroll() {
    const nav = document.querySelector(".navbar");
    if (!nav) return;
    const toggle = () => nav.classList.toggle("scrolled", window.scrollY > window.innerHeight - 80);
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
}