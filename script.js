document.addEventListener("DOMContentLoaded", (event) => {
    // Select all nav links instead of the container
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Loop through each link directly
    navLinks.forEach(link => {
        // Create SplitText instance for each link
        let sticky = new SplitText(link, {
            type: "chars",
            charsClass: "char"
        });

        let hoversticky = gsap.timeline({
            paused: true,
            defaults: {
                duration: 0.3,
                ease: "power2.out"
            }
        });

        // Set initial state
        gsap.set(sticky.chars, {
            y: 0,
            opacity: 1
        });

        hoversticky.to(sticky.chars, {
            y: -20,
            opacity: 0,
            stagger: 0.02,
            duration: 0.2
        })
        .to (sticky.chars, {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.2
        }, 0.1);

        link.addEventListener("mouseenter", () => {
            hoversticky.play();
        });

        link.addEventListener("mouseleave", () => {
            hoversticky.reverse();
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const capabilities = document.querySelectorAll('.capability-item');
    
    capabilities.forEach(item => {
        const image = item.querySelector('.capability-image');
        const header = item.querySelector('.capability-header h3');
        let splitText;
        let hoverAnimation;
        
        // Initialize SplitText
        splitText = new SplitText(header, {
            type: "chars",
        });

        // Create hover timeline
        let hoverTl = gsap.timeline({
            paused: true,
            defaults: {
                duration: 0.5,
                ease: 'power4.inOut'
            }
        });

        // Set initial states
        gsap.set(image, {
            opacity: 0,
            scale: 0.8,
            transformOrigin: 'center center'
        });

        gsap.set(splitText.chars, {
            y: 0,
            opacity: 1
        });

        // Build the animation
        hoverTl
            .to(image, {
                opacity: 1,
                scale: 1,
                duration: 0.3
            })
            .to(splitText.chars, {
                y: -20,
                opacity: 0,
                stagger: 0.02,
                duration: 0.2,
            }, 0)
            .to(splitText.chars, {
                y: 0,
                opacity: 1,
                stagger: 0.02,
                duration: 0.5
            }, 0.15);

        item.addEventListener('mouseenter', (e) => {
            if (hoverAnimation) hoverAnimation.kill();
            
            // Set initial position
            gsap.set(image, {
                left: e.clientX + 20,
                top: e.clientY - 200,
                opacity: 0,
                scale: 0.8
            });
            
            // Play hover animation immediately
            hoverTl.restart();
        });

        item.addEventListener('mousemove', (e) => {
            if (image) {
                gsap.to(image, {
                    left: e.clientX + 20,
                    top: e.clientY - 200,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        item.addEventListener('mouseleave', () => {
            if (hoverAnimation) {
                hoverAnimation.kill();
            }
            
            // Quick fade out for image
            gsap.to(image, {
                opacity: 0,
                scale: 0.8,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => {
                    // Reset the timeline
                    hoverTl.pause(0);
                    gsap.set(splitText.chars, {
                        y: 0,
                        opacity: 1
                    });
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Create cursor follower
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    // Add variables for smooth movement
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    // Update cursor position with smooth animation
    function updateCursor() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;

        requestAnimationFrame(updateCursor);
    }

    updateCursor();

    // Update target position on mouse move
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Hide cursor on project images
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0';
        });

        img.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0.7';
        });
    });

    // Keep existing mouse enter/leave handlers for window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.7';
    });
    
    // ...existing code...
});
// Add active class to the current navigation item based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    // Create hover text element for projects
    const hoverText = document.createElement('div');
    hoverText.className = 'hover-text';
    hoverText.textContent = 'View Project';
    document.body.appendChild(hoverText);

    // Get all project images
    const projectImages = document.querySelectorAll('.project-image img');
    let mousePos = { x: 0, y: 0 };
    let targetPos = { x: 0, y: 0 };
    let isHovering = false;
    let animationFrame;

    function updatePosition() {
        if (isHovering) {
            // Smoothly interpolate between current and target position
            mousePos.x += (targetPos.x - mousePos.x) * 0.2;
            mousePos.y += (targetPos.y - mousePos.y) * 0.2;
            
            hoverText.style.left = mousePos.x + 'px';
            hoverText.style.top = mousePos.y + 'px';
            
            animationFrame = requestAnimationFrame(updatePosition);
        }
    }

    projectImages.forEach(img => {
        img.addEventListener('mouseenter', (e) => {
            isHovering = true;
            // Initialize position to current mouse position
            mousePos.x = targetPos.x = e.clientX;
            mousePos.y = targetPos.y = e.clientY;
            hoverText.style.left = mousePos.x + 'px';
            hoverText.style.top = mousePos.y + 'px';
            
            // Show text immediately at cursor position
            hoverText.classList.add('active');
            
            // Start animation
            if (!animationFrame) {
                animationFrame = requestAnimationFrame(updatePosition);
            }
        });

        img.addEventListener('mousemove', (e) => {
            if (isHovering) {
                targetPos.x = e.clientX;
                targetPos.y = e.clientY;
            }
        });

        img.addEventListener('mouseleave', () => {
            isHovering = false;
            hoverText.classList.remove('active');
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }
        });
    });

    // Update active class on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    //SMOOTH SCROLL USING LENIS
    const lenis = new Lenis({
    autoRaf: true,
    });

    lenis.on('scroll', (e) => {
    console.log(e);
    });

});

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger,SplitText,Observer);

        let seemore = new SplitText(['.More-text h2, .More-text h6'], {
            type:'chars',
        })

        let exp = new SplitText(['.capabilities-list h3, .capabilities-wrapper h2, .capability-number, .capability-divider'], {
            type:'lines',
        })

        let seemore2 = new SplitText('.More-text p, .More-text button', {
            type:'chars',
        })

        let prfl = new SplitText('.profile-cards h1',{
            type:'words',
        })

        gsap.to('.Home',{
            scrollTrigger:{
                trigger:'.Home',
                start:'bottom bottom',
                end:'bottom top',
                scrub:1,
                pin:true,
                pinSpacing: false,
            },
            scale:0.5,
            rotation: -5,
            borderRadius: 100,
            filter: 'blur(10px)',
            ease:'power1.inOut',
        });

        gsap.to('.projects-card',{
            scrollTrigger:{
                trigger:'.projects-card',
                start:'top center',
                end:'top top',
                scrub:1,
            },
            y:80,
            ease:'power1.inOut',
        });

        gsap.to('.experience-card',{
            scrollTrigger:{
                trigger:'.experience-card',
                start:'top 30%',
                end:'top 5%',
                scrub:2,
            },
            y:90,

            ease:'power1.inOut',
        });

        gsap.to('.profile-illustration',{
            scrollTrigger:{
                trigger:'.profile-illustration',
                start:'top 30%',
                end:'top 5%',
                scrub:1,
            },
            y:-10,
            ease:'power1.inOut',
        });

        gsap.to('.headline2',{
            scrollTrigger:{
                trigger:'.headline2',
                start:'bottom 40%',
                end:'bottom bottom',
                scrub:2,
            },
            y:70,
        });  

        gsap.to('.horizontal', {
            scrollTrigger:{
                trigger:'.horizontal',
                start:'bottom 60%',
                pin:'.About',
                end:'+=2000',
                scrub:1,
            },
            x:-3000,
            ease:'power1.inOut',
        }); 
        gsap.from('.horizontal2', {
            scrollTrigger:{
                trigger:'.horizontal2',
                start:'40 center',
                end:'+=2000',
                scrub:1,
            },
            x:-3000,
            ease:'power1.inOut',
        }); 

        gsap.from('.experience-profile-text',{
            scrollTrigger:{
                trigger:'.experience-profile-pic',
                start:'top bottom',
                end:'top 20%',
                scrub:2,
            },
            opacity:0,
            y:100,
            ease:'power1.inOut',
        }); 

        let tl = gsap.timeline({
            scrollTrigger:{
                trigger:'.capabilities-wrapper',
                start:'top 80%',
                end:'bottom bottom',
                scrub:2,
            },
            });
            tl.to(".experience-profile-pic",{
                x:800,
                y:640,
                scale: 0.4,
            })
        
        let tl2 = gsap.timeline({
            scrollTrigger:{
                trigger:'.profile-cards-container',
                start:'bottom bottom',
                end:'+=3000',
                scrub:2,
                pin:'.profile-cards',
            }, 
        });
        tl2.to('.profile-cards',{
        })

        gsap.from(prfl.words,{
            stagger:0.2,
            scrollTrigger:{
                trigger:'.profile-cards-container',
                start:'15% bottom',
                end:'15% 30%',
                scrub:1,
            },
            opacity:0,
            y:100,
            ease:'power1.inOut',
        })

        gsap.from(exp.lines,{
            stagger:0.02,
            scrollTrigger:{
                trigger:'.capabilities-wrapper',
                start:'top 80%',
                end:'bottom bottom',
                scrub:1.5,
            },
            opacity:0,
            y:100,
            ease:'power1.inOut',
        })

        gsap.to('.left-project-pic1',{
            scrollTrigger:{
                trigger:'.left-project-pic1',
                start:'top 80%',
                end:'bottom 40%',
                scrub:1,
            },
            x:150,
            rotation:5,
            ease:'power1.inOut',
        });

        gsap.to('.right-project-pic1',{
            scrollTrigger:{
                trigger:'.right-project-pic1',
                start:'top bottom',
                end:'bottom 20%',
                scrub:1,
            },
            x:-150,
            y:-100,
            rotation:-5,
            ease:'power1.inOut',
        });

        gsap.to('.left-project-pic2',{
            scrollTrigger:{
                trigger:'.left-project-pic2',
                start:'top 80%',
                end:'20% 10%',
                scrub:1,
            },
            x:300,
            y:200,
            rotation:-10,
            ease:'power1.inOut',
        });

        gsap.to('.right-project-pic2',{
            scrollTrigger:{
                trigger:'.right-project-pic2',
                start:'top bottom',
                end:'top 20%',
                scrub:1,
            },
            x:150,
            rotation:10,
            ease:'power1.inOut',
        });

        gsap.to('.left-project-pic3',{
            scrollTrigger:{
                trigger:'.left-project-pic3',
                start:'top bottom',
                end:'top 20%',
                scrub:1,
            },
            x:150,
            rotation:10,
            ease:'power1.inOut',
        });

        let moreexp = gsap.timeline({
            scrollTrigger:{
                trigger:'.More-container',
                start:'top bottom',
                end:'bottom bottom',
                scrub:2,
            },
            });
            moreexp.from(".More-container video",{
                scale:0.8,
                borderRadius: 100,
                rotation: -10,
                ease:'power1.inOut',
            })

        gsap.from(seemore.chars,{
            stagger:0.2,
            scrollTrigger:{
                trigger:'.More-container video',
                start:'20% 60%',
                end:'bottom bottom',
                scrub:1,
            },
            opacity:0,
            y:-100,
            ease:'power1.inOut',
        })

        gsap.from(seemore2.chars,{
            stagger:0.1,
            scrollTrigger:{
                trigger:'.More-container video',
                start:'center 60%',
                end:'90% bottom',
                scrub:1,
            },
            opacity:0,
            y:100,
            ease:'power1.inOut',
        })

        gsap.from('.More-text button',{
            scrollTrigger:{
                trigger:'.More-container video',
                start:'center 60%',
                end:'90% bottom',
                scrub:1,
            },
            opacity:0,
            y:100,
            ease:'power1.inOut',
        })

        gsap.from('.Contact',{
            scrollTrigger: {
                trigger: '.More-container',
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 1,
                pin: '.More-container',
                pinSpacing: false,
            },
            y: 500,
            rotation: 5,
            scaleX: 0.7,
            borderRadius: 100,
            ease: "power1.inOut",
        })


// LOOPING TEXT
const scrollingText = gsap.utils.toArray('.rail h4');

const obs = horizontalLoop(scrollingText, {
  repeat: -1,
  paddingRight: 30,
});

Observer.create({
  onChangeY(self) {
    let factor = 2.5;
    if (self.deltaY < 0) {
      factor *= -1;
    } 
    gsap.timeline({
      defaults: {
        ease: "none",
      }
    })
      .to(obs, { timeScale: factor * 2.5, duration: 0.2, overwrite: true, })
      .to(obs, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
  }
});

function horizontalLoop(items, config) {
	items = gsap.utils.toArray(items);
	config = config || {};
	let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
		length = items.length,
		startX = items[0].offsetLeft,
		times = [],
		widths = [],
		xPercents = [],
		curIndex = 0,
		pixelsPerSecond = (config.speed || 1) * 100,
		snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), 
		totalWidth, curX, distanceToStart, distanceToLoop, item, i;
	gsap.set(items, { 
		xPercent: (i, el) => {
			let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
			xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
			return xPercents[i];
		}
	});
	gsap.set(items, {x: 0});
	totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
	for (i = 0; i < length; i++) {
		item = items[i];
		curX = xPercents[i] / 100 * widths[i];
		distanceToStart = item.offsetLeft + curX - startX;
		distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
		tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
		  .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
		  .add("label" + i, distanceToStart / pixelsPerSecond);
		times[i] = distanceToStart / pixelsPerSecond;
	}
	function toIndex(index, vars) {
		vars = vars || {};
		(Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
		let newIndex = gsap.utils.wrap(0, length, index),
			time = times[newIndex];
		if (time > tl.time() !== index > curIndex) { 
			vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
			time += tl.duration() * (index > curIndex ? 1 : -1);
		}
		curIndex = newIndex;
		vars.overwrite = true;
		return tl.tweenTo(time, vars);
	}
	tl.next = vars => toIndex(curIndex+1, vars);
	tl.previous = vars => toIndex(curIndex-1, vars);
	tl.current = () => curIndex;
	tl.toIndex = (index, vars) => toIndex(index, vars);
	tl.times = times;
	tl.progress(1, true).progress(0, true); 
	if (config.reversed) {
	  tl.vars.onReverseComplete();
	  tl.reverse();
	}
	return tl;
}


//STROKE effect
        let svg = document.querySelector("svg");
        let path = svg.querySelector("path");

        const pathLength = path.getTotalLength();

        console.log(pathLength);

        gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });
        
        gsap.to(path, {
            strokeDashoffset: 0,
            scrollTrigger: {
                trigger: '.svg-container',  
                start: 'top center',         
                end: '=+3500px',
                scrub: 1.5,
            },
        });
        
// hover left pic1
        let leftpic1 = document.querySelector(".left-project-pic1");
        let hoverLpic1 = gsap.to(".left-project-pic1", {
            paused:true,
            ease:'power4.inOut',
            scale:1.2,
            duration:0.7,
    })

        leftpic1.addEventListener("mouseenter", () => hoverLpic1.play());
        leftpic1.addEventListener("mouseleave", () => hoverLpic1.reverse());

// hover left pic2
        let leftpic2 = document.querySelector(".left-project-pic2");
        let hoverLpic2 = gsap.to(".left-project-pic2", {
            paused:true,
            ease:'power4.inOut',
            scale:1.2,
            duration:0.7,
        })

        leftpic2.addEventListener("mouseenter", () => hoverLpic2.play());
        leftpic2.addEventListener("mouseleave", () => hoverLpic2.reverse());

// hover right pic1

        let rightpic1 = document.querySelector(".right-project-pic1");
        let hoverRpic1 = gsap.to(".right-project-pic1", {
            paused:true,
            ease:'power4.inOut',
            scale:1.2,
            duration:0.7,

    })

        rightpic1.addEventListener("mouseenter", () => hoverRpic1.play());
        rightpic1.addEventListener("mouseleave", () => hoverRpic1.reverse());

//hover right pic2
        let rightpic2 = document.querySelector(".right-project-pic2");
        let hoverRpic2 = gsap.to(".right-project-pic2", {
            paused:true,
            ease:'power4.inOut',
            scale:1.2,
            duration:0.7,

        })

        rightpic2.addEventListener("mouseenter", () => hoverRpic2.play());
        rightpic2.addEventListener("mouseleave", () => hoverRpic2.reverse());

//hover left pic3
        let Lpic3 = document.querySelector(".left-project-pic3");
        let hoverLpic3 = gsap.to(".left-project-pic3", {
            paused:true,
            ease:'power4.inOut',
            scale:1.2,
            duration:0.7,

        })

        Lpic3.addEventListener("mouseenter", () => hoverLpic3.play());
        Lpic3.addEventListener("mouseleave", () => hoverLpic3.reverse());
});

// Preloader
document.addEventListener('DOMContentLoaded', function() {
    // Initial page load preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        
        // Add a slight delay for better effect
        setTimeout(function() {
            preloader.classList.add('hidden');
            
            // Remove preloader from DOM after transition completes
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500); // Match this to your transition time
        }, 1500); // Adjust delay as needed
    });
    
    // Show preloader when clicking on links
    document.addEventListener('click', function(e) {
        // Check if the clicked element is a link
        const link = e.target.closest('a');
        
        if (link) {
            const href = link.getAttribute('href');
            
            // Only show preloader for external links or page navigations (not hash links)
            if (href && !href.startsWith('#')) {
                e.preventDefault(); // Prevent default navigation
                
                const preloader = document.querySelector('.preloader');
                
                // Show preloader
                preloader.style.display = 'flex';
                preloader.classList.remove('hidden');
                
                // Navigate after a short delay
                setTimeout(function() {
                    window.location.href = href;
                }, 1000); // Adjust timing as needed
            }
        }
    });

//HOME 
console.clear();

gsap.registerPlugin(Observer);

const scrollingText = gsap.utils.toArray('.marquee-text h4');

const tl = horizontalLoop(scrollingText, {
  repeat: -1,
  paddingRight: 30,
});

Observer.create({
  onChangeY(self) {
    let factor = 2.5;
    if (self.deltaY < 0) {
      factor *= -1;
    } 
    gsap.timeline({
      defaults: {
        ease: "none",
      }
    })
      .to(tl, { timeScale: factor * 2.5, duration: 0.2, overwrite: true, })
      .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
  }
});

function horizontalLoop(items, config) {
	items = gsap.utils.toArray(items);
	config = config || {};
	let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
		length = items.length,
		startX = items[0].offsetLeft,
		times = [],
		widths = [],
		xPercents = [],
		curIndex = 0,
		pixelsPerSecond = (config.speed || 1) * 100,
		snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
		totalWidth, curX, distanceToStart, distanceToLoop, item, i;
	gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
		xPercent: (i, el) => {
			let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
			xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
			return xPercents[i];
		}
	});
	gsap.set(items, {x: 0});
	totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
	for (i = 0; i < length; i++) {
		item = items[i];
		curX = xPercents[i] / 100 * widths[i];
		distanceToStart = item.offsetLeft + curX - startX;
		distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
		tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
		  .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
		  .add("label" + i, distanceToStart / pixelsPerSecond);
		times[i] = distanceToStart / pixelsPerSecond;
	}
	function toIndex(index, vars) {
		vars = vars || {};
		(Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
		let newIndex = gsap.utils.wrap(0, length, index),
			time = times[newIndex];
		if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
			vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
			time += tl.duration() * (index > curIndex ? 1 : -1);
		}
		curIndex = newIndex;
		vars.overwrite = true;
		return tl.tweenTo(time, vars);
	}
	tl.next = vars => toIndex(curIndex+1, vars);
	tl.previous = vars => toIndex(curIndex-1, vars);
	tl.current = () => curIndex;
	tl.toIndex = (index, vars) => toIndex(index, vars);
	tl.times = times;
	tl.progress(1, true).progress(0, true); // pre-render for performance
	if (config.reversed) {
	  tl.vars.onReverseComplete();
	  tl.reverse();
	}
	return tl;
}

//
document.addEventListener('DOMContentLoaded', function() {
    // Modern navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const navLinks = document.querySelectorAll('.nav-item a');
    const sections = document.querySelectorAll('section');
    
    // Open navigation
    navToggle.addEventListener('click', function() {
        navOverlay.classList.add('active');
        
        // Animate menu items
        gsap.fromTo('.nav-item', 
            {y: 30, opacity: 0},
            {y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out", delay: 0.2}
        );
        
        // Animate header and footer
        gsap.fromTo(['.nav-header', '.nav-footer'],
            {y: 20, opacity: 0},
            {y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4}
        );
    });
    
    // Close navigation
    closeBtn.addEventListener('click', function() {
        closeNavigation();
    });
    
    // Close navigation when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's a hash link, handle smooth scrolling
            if (href.startsWith('#')) {
                e.preventDefault();
                closeNavigation();
                
                // Scroll to section after navigation closes
                setTimeout(() => {
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        gsap.to(window, {
                            duration: 1,
                            scrollTo: {
                                y: targetSection,
                                offsetY: 50
                            },
                            ease: "power2.inOut"
                        });
                    }
                }, 500);
            } else {
                // For non-hash links, show preloader
                e.preventDefault();
                closeNavigation();
                
                setTimeout(() => {
                    const preloader = document.querySelector('.preloader');
                    preloader.style.display = 'flex';
                    preloader.classList.remove('hidden');
                    
                    // Navigate after a short delay
                    setTimeout(function() {
                        window.location.href = href;
                    }, 1000);
                }, 500);
            }
        });
    });
    
});
});
