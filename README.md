# Merryland High Schools Entebbe — Premium Offline Redesign

A fully redesigned, responsive, framework-free school website built with **HTML5, CSS3 and vanilla JavaScript**. It works from `index.html` and requires no build process, package manager or network-hosted dependency.

## Run locally

Open `index.html` directly in a modern browser, or use a static server for the most consistent navigation behaviour:

```bash
cd website
python3 -m http.server 8000
```

Open `http://localhost:8000/`.

## Structure

```text
website/
├── index.html
├── about-us.html
├── e-learning.html
├── applications.html
├── fees.html
├── merryland-photos.html
├── news.html
├── contact.html
├── [all retained public application, portal and article routes]
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── slider.js
│   ├── animations.js
│   ├── gallery.js
│   └── contact.js
├── images/
├── documents/
├── fonts/
├── robots.txt
└── sitemap.xml
```

## Design and functionality

- **Professional modern UI/UX:** a clean, image-led international-school experience using Merryland’s original burgundy, magenta, violet, navy and gold brand colours.
- Refined page heroes, accessible navigation, mobile drawer, back-to-top control, contact pathways, admissions flows, gallery, and a 2024 honours wall.
- WebP-optimised imagery, locally hosted assets and no external CSS, scripts or font requests.
- The current visual layer is contained in `css/professional-modern.css`; `css/campus-mosaic.css` supplies the home-page content components and achievement-wall interaction styling.
- Scroll reveals, animated counters, testimonial slider, gallery filter/lightbox, FAQ accordion, and an interactive 2024 UCE/UACE honours wall using the school’s published performance cards.
- Local validation and confirmation for contact, application and portal forms. Connect forms to an authorised backend before using for live submissions.
- Every legacy public route retained as an interconnected, redesigned static HTML page.

## Content notes

The redesign retains the school’s core content: Christian foundation, 2001 Kigungu and 2012 Katabi campuses, academic breadth, mission, vision, motto, admissions process, contact details and student resources. The school’s published imagery is used in `images/`.

Before production deployment, confirm all dates, fees, requirements, contact details and downloadable documents with the school administration.
