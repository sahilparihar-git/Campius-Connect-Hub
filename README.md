# Campus Connect Hub - University Club Dashboard

A simple yet powerful university club management dashboard designed for GHRISTU. This project allows students to manage university clubs, track events, view timetables, and submit member applications in one centralized place.

## 🚀 About the Project

The **Campus Connect Hub** is a responsive web application that streamlines the interaction between students and campus organizations. It features a dynamic video banner, real-time stat tracking, and a smooth application process integrated with Google Sheets.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla CSS)
- **Framework**: Bootstrap 5.3 (for responsive layout)
- **Logic**: Vanilla JavaScript
- **Typography**: Google Fonts (Playfair Display & DM Sans)
- **Integration**: Sheet.best (Google Sheets API for form submissions)

## 💻 Running Locally

You can run the project in two ways:

### 1. Simple Open (No Install Needed)
Just double-click the `index.html` file in your file explorer to open it in any modern web browser.

### 2. Local Development Server
If you want to run it via a local server (recommended for testing API interactions):
```bash
# Using npx (Node.js required)
npx serve .

# Or using Python
python -m http.server 8000
```

## ⬆️ Uploading to GitHub

Follow these steps to upload your project to a new GitHub repository:

1. **Initialize Git**:
   ```bash
   git init
   ```

2. **Stage All Files**:
   ```bash
   git add .
   ```

3. **Commit Changes**:
   ```bash
   git commit -m "Final version of Club Dashboard"
   ```

4. **Add Remote Origin**:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   ```

5. **Push to Main**:
   ```bash
   git push -u origin main
   ```

## 📁 Project Structure

```text
/
├── index.html          # Main dashboard interface
├── styles.css          # Core design and layout system
├── script.js           # Dashboard logic and API handling
├── package.json        # Project metadata and scripts
├── resources/          # Static assets (Video, Images)
│   └── university-video.mp4
└── README.md           # This file
```

---
*Developed for GHRISTU Central Club Dashboard.*
