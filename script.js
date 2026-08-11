const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const revealItems = document.querySelectorAll(".reveal");
const marquee = document.querySelector(".marquee div");

if (marquee) {
  marquee.innerHTML += marquee.innerHTML;
}

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  header.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    header.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

revealItems.forEach((item) => revealObserver.observe(item));

document.querySelectorAll(".resource-card a[download]").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!button.getAttribute("href")?.startsWith("#")) {
      return;
    }

    event.preventDefault();
    const card = button.closest(".resource-card");
    const title = card?.querySelector("h3")?.textContent || "Social Marketeer Resource";
    const copy = [
      "SM | Social Marketeer",
      title,
      "",
      "Thank you for downloading this resource.",
      "Use it to plan stronger content, polish your online presence and build a more consistent brand.",
      "",
      "For custom support, email gsocialmarketeer@gmail.com"
    ].join("\n");
    const blob = new Blob([copy], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${title.toLowerCase().replaceAll(" ", "-")}.txt`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  });
});

const formState = new URLSearchParams(window.location.search);

if (formState.get("submitted") === "true") {
  document.querySelector(".inquiry-form")?.insertAdjacentHTML(
    "beforebegin",
    '<p class="form-success" role="status">Thank you. Your inquiry has been sent successfully. I will be in touch soon.</p>'
  );
}

if (formState.get("subscribed") === "true") {
  document.querySelector(".email-capture")?.insertAdjacentHTML(
    "beforebegin",
    '<p class="form-success" role="status">Thank you. You have joined the Social Marketeer resource list.</p>'
  );
}
