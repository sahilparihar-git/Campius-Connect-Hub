---
description: Comprehensive guide for presenting the Campus Connect Hub project to the jury.
---

# 🎓 Jury Presentation Guide: Campus Connect Hub

This guide provides a structured flow for your presentation, along with line-by-line code explanations to help you answer technical questions from the jury.

## 🎤 Presentation Flow (Step-by-Step)

1.  **Opening (1 min)**: Introduce the project name (**Campus Connect Hub**) and the core problem it solves (centralizing university club activities).
2.  **Visual Demo (2 mins)**: 
    - Show the **Hero Video Banner**. Explain that this video is saved locally in the `resources/` folder to ensure it plays even without internet.
    - Demonstrate the **Live Announcements** ticker at the top.
    - Show the **Stats Cards** (Total Clubs, Applications, Events).
3.  **Core Features (3 mins)**:
    - **Clubs Page**: Scroll through the clubs. Mention they are dynamically rendered using JavaScript.
    - **Application Form**: Click "Apply to Join". Fill 'Test User' data. Show the validation (e.g., college email requirement).
    - **Success State**: Submit the form. Show the success checkmark animation and explain that data is sent to a **Google Sheet**.
    - **Events & Timetable**: Briefly show the upcoming events and the weekly schedule.
4.  **Technical Explanation (4 mins)**: (Refer to the "Code Explanation" section below if the jury asks "How does this work?").
5.  **Closing (1 min)**: Summarize the tech stack (HTML/CSS/JS/Bootstrap) and mention that the project is deployment-ready for platforms like Vercel or Cloudflare.

---

## 💻 Technical Code Explanation (Point-wise)

### 1. `index.html` (The Structure)
- **Line 19**: Uses Bootstrap classes `sticky-top` and `navbar-expand` for a responsive, fixed-to-top navigation bar.
- **Line 32-37**: The `announcement-bar` creates a marquee-style ticker. It uses a CSS animation defined in `styles.css`.
- **Line 41**: The `<video>` tag uses the `autoplay`, `loop`, and `muted` attributes. 
    - *Jury Question*: "Why is it muted?" 
    - *Answer*: Most browsers block autoplaying videos unless they are muted.
- **Line 42**: `<source src="resources/university-video.mp4" ...>` points to the local asset. This makes the project portable and reliable.

### 2. `styles.css` (The Design)
- **Line 5-12**: Uses **CSS Variables** (`:root`) for colors. This makes it easy to change the entire theme (e.g., from purple to blue) just by changing one line.
- **Line 66-72**: `.video-banner-section` uses `height: 500px` (on large screens) and `overflow: hidden` to create a cinematic hero section.
- **Line 138**: `animation: ticker-scroll 30s linear infinite;` creates the smooth moving text effect for announcements.
- **Line 393-502**: This is the "Success Checkmark" animation. It uses complex keyframe animations (`@keyframes`) to draw the green checkmark purely with CSS (no images used).

### 3. `script.js` (The Brain)
- **Line 6**: `SHEET_BEST_URL` is the API endpoint. We use the **Sheet.best** service to turn a Google Sheet into a database.
- **Line 9-20**: The `clubs` array stores all club data. This is "Clean Code" because adding a new club only requires adding one object to this array.
- **Line 161-184**: `renderClubs()` function. It loops through the `clubs` array and creates HTML "on the fly" using JavaScript. This is much more efficient than writing 10 separate HTML cards.
- **Line 368**: `validateForm()` checks if the email ends with `@ghristu.edu.in`. This ensures only valid students can apply.
- **Line 432-437**: `fetch(SHEET_BEST_URL, ...)` sends the form data to the server using the **POST method**. This is how the "Google Sheet" integration works.

---

## 🛠️ Frequently Asked Questions (FAQ)

**Q: Why did you use Vanilla JavaScript instead of React/Next.js?**
*A: To keep the project lightweight, high-performance, and easy to deploy without complex build steps. It perfectly handles the requirements using standard web technologies.*

**Q: How do you handle the "Applications Submitted" count?**
*A: I use a base number (51) and add the number of applications submitted during the current session (`applications.length`) to demonstrate live interaction.*

**Q: How can we deploy this?**
*A: Since it's built with relative paths and standard HTML/CSS, you can simply drag the folder into Vercel, Netlify, or Cloudflare Pages for instant global hosting.*
