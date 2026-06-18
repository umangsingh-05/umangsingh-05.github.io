document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.style.background = "rgba(20,20,20,0.95)";
            navbar.style.backdropFilter = "blur(12px)";
            navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.4)";
        } else {
            navbar.style.background = "#222";
            navbar.style.boxShadow = "none";
        }
    });
    const searchInput = document.getElementById("name");
    const products = document.querySelectorAll(".product");

    searchInput.addEventListener("keyup", () => {

        let value = searchInput.value.toLowerCase();

        products.forEach((product) => {

            let title = product.querySelector("h3").innerText.toLowerCase();

            if (title.includes(value)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });
    const installButtons = document.querySelectorAll(".install-btn");

    installButtons.forEach((btn) => {

        btn.addEventListener("click", () => {

            let originalText = btn.innerText;

            btn.innerText = "Installing...";
            btn.style.background = "#0b57d0";
            btn.style.transform = "scale(0.96)";

            setTimeout(() => {
                btn.innerText = "Installed ✓";
                btn.style.background = "#1e8e3e";
            }, 2000);

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "#0caf25";
                btn.style.transform = "scale(1)";
            }, 5000);

            showToast("Game successfully installed!");
        });
    });
    function showToast(message) {

        const toast = document.createElement("div");

        toast.innerText = message;

        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.right = "30px";
        toast.style.padding = "14px 22px";
        toast.style.background = "#202124";
        toast.style.color = "white";
        toast.style.borderRadius = "12px";
        toast.style.fontSize = "15px";
        toast.style.zIndex = "9999";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
        toast.style.transition = "all 0.4s ease";

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateY(0)";
        }, 100);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(20px)";
        }, 3000);

        setTimeout(() => {
            toast.remove();
        }, 3500);
    }
    const videos = document.querySelectorAll("video");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            const video = entry.target;

            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });

    }, {
        threshold: 0.5
    });

    videos.forEach(video => {
        observer.observe(video);
    });
    products.forEach((card) => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 12;
            const rotateX = ((y / rect.height) - 0.5) * -12;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.03)`;
        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
        });
    });
    const revealElements = document.querySelectorAll(
        ".product, .banner, .banner2nd, .banner3rd"
    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach((el) => {

        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        el.style.transition = "all 0.8s ease";

        revealObserver.observe(el);
    });

    const sliders = document.querySelectorAll(".productflex");

    sliders.forEach((slider) => {

        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener("mousedown", (e) => {

            isDown = true;
            slider.classList.add("active");

            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener("mouseleave", () => {
            isDown = false;
        });

        slider.addEventListener("mouseup", () => {
            isDown = false;
        });

        slider.addEventListener("mousemove", (e) => {

            if (!isDown) return;

            e.preventDefault();

            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;

            slider.scrollLeft = scrollLeft - walk;
        });
    });
    sliders.forEach((slider) => {

        let autoScroll = setInterval(() => {

            slider.scrollLeft += 1;

            if (
                slider.scrollLeft + slider.clientWidth >=
                slider.scrollWidth
            ) {
                slider.scrollLeft = 0;
            }

        }, 20);

        slider.addEventListener("mouseenter", () => {
            clearInterval(autoScroll);
        });

        slider.addEventListener("mouseleave", () => {

            autoScroll = setInterval(() => {

                slider.scrollLeft += 1;

                if (
                    slider.scrollLeft + slider.clientWidth >=
                    slider.scrollWidth
                ) {
                    slider.scrollLeft = 0;
                }

            }, 20);
        });
    });

    document.addEventListener("keydown", (e) => {

        if (e.key === "/") {

            e.preventDefault();
            searchInput.focus();
        }
    });

    const footer = document.querySelector(".language");

    const time = document.createElement("span");

    time.style.fontSize = "14px";
    time.style.opacity = "0.8";

    footer.appendChild(time);

    function updateTime() {

        const now = new Date();

        time.innerText =
            now.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit"
            });
    }

    updateTime();

    setInterval(updateTime, 1000);


    const rippleButtons = document.querySelectorAll("button");

    rippleButtons.forEach((button) => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            const diameter = Math.max(
                this.clientWidth,
                this.clientHeight
            );

            const radius = diameter / 2;

            circle.style.width = circle.style.height =
                `${diameter}px`;

            circle.style.left =
                `${e.clientX - this.offsetLeft - radius}px`;

            circle.style.top =
                `${e.clientY - this.offsetTop - radius}px`;

            circle.classList.add("ripple");

            const ripple = this.getElementsByClassName("ripple")[0];

            if (ripple) {
                ripple.remove();
            }

            this.appendChild(circle);
        });
    });

    const loader = document.createElement("div");

    loader.innerHTML = `
        <div class="loader-spinner"></div>
    `;

    loader.style.position = "fixed";
    loader.style.top = "0";
    loader.style.left = "0";
    loader.style.width = "100%";
    loader.style.height = "100%";
    loader.style.background = "#111";
    loader.style.display = "flex";
    loader.style.justifyContent = "center";
    loader.style.alignItems = "center";
    loader.style.zIndex = "999999";
    loader.style.transition = "opacity 0.8s ease";

    document.body.appendChild(loader);

    const spinner = loader.querySelector(".loader-spinner");

    spinner.style.width = "70px";
    spinner.style.height = "70px";
    spinner.style.border = "8px solid #444";
    spinner.style.borderTop = "8px solid #0caf25";
    spinner.style.borderRadius = "50%";
    spinner.style.animation = "spin 1s linear infinite";

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.remove();
        }, 800);

    }, 1500);

    const style = document.createElement("style");

    style.innerHTML = `
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 600ms linear;
            background-color: rgba(255,255,255,0.5);
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        button {
            position: relative;
            overflow: hidden;
        }

        html {
            scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
            height: 10px;
            width: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: #777;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-track {
            background: #1b1b1b;
        }
    `;

    document.head.appendChild(style);

});