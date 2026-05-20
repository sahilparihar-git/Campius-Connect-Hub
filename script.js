// ========================================
// Central Club Dashboard - JavaScript
// ========================================

// Sheet.best API URL for Google Sheets integration
const SHEET_BEST_URL = typeof CONFIG !== 'undefined' ? CONFIG.SHEET_BEST_URL : "";

// Data
const clubs = [
  { id: 1, name: "Trekking Club", emoji: "🥾", tag: "Adventure", description: "Explore nature, organize treks, and promote conservation of plants and forests.", members: 42 },
  { id: 2, name: "Dance Club", emoji: "💃", tag: "Arts & Culture", description: "Learn various dance forms, perform at events, and express yourself through movement.", members: 65 },
  { id: 3, name: "Archery Club", emoji: "🏹", tag: "Sports", description: "Learn the art of archery, compete in tournaments, and develop focus and precision.", members: 28 },
  { id: 4, name: "Toast Master Club", emoji: "🎤", tag: "Communication", description: "Develop public speaking, leadership skills, and communication abilities.", members: 35 },
  { id: 5, name: "Music Club", emoji: "🎵", tag: "Arts & Culture", description: "Explore musical talents, perform at events, and collaborate with fellow musicians.", members: 48 },
  { id: 6, name: "Coders Club", emoji: "💻", tag: "Technical", description: "Coding competitions, hackathons, and programming workshops for all skill levels.", members: 72 },
  { id: 7, name: "Robotics Club", emoji: "🤖", tag: "Technical", description: "Build robots, participate in competitions, and explore automation technologies.", members: 38 },
  { id: 8, name: "Sports Club", emoji: "⚽", tag: "Sports", description: "Organize sports events, inter-college competitions, and promote fitness.", members: 95 },
  { id: 9, name: "Developer Club", emoji: "👨‍💻", tag: "Technical", description: "Web development, app building, open-source contributions, and tech workshops.", members: 45 },
  { id: 10, name: "Cultural Club", emoji: "🎨", tag: "Cultural", description: "Dance, food festivals, traditional art, and inter-cultural exchange.", members: 89 }
];



const events = [
  { id: 1, day: "20", month: "APR", name: "Drone Racing Championship", venue: "Sports Ground", organiser: "Drone Club", time: "10 AM – 4 PM", description: "High-speed drone racing with cash prizes and trophies.", badge: "Applications Open", badgeType: "open", applicationLink: "https://docs.google.com/forms/d/e/1FAIpQLSc31644kxQYzo4LKKzq2ST7De2Jq4MXCqp0dXtDWfWYIFf59Q/viewform?usp=header" },
  { id: 2, day: "22", month: "APR", name: "TechNest Hackathon 2025", venue: "Lab Block 3", organiser: "TechNest Club", time: "9 AM (24 hrs)", description: "24-hour hackathon — build, ship, win.", badge: "Applications Open", badgeType: "open", applicationLink: "https://docs.google.com/forms/d/e/1FAIpQLSdfzduQiIAt4ybzdWdQHiO_MCbrkv2xCXVtODTkoY6aTO7qIA/viewform?usp=header" },
  { id: 3, day: "25", month: "APR", name: "Photography Contest Deadline", venue: "Online Submission", organiser: "Pixel Photography Club", time: "11:59 PM", description: "Submit your best campus shots before the deadline.", badge: "Deadline", badgeType: "deadline", applicationLink: null },
  { id: 4, day: "28", month: "APR", name: '"Echoes" Drama Performance', venue: "Auditorium Block B", organiser: "Ignatius Drama Club", time: "6 PM", description: "An original stage play exploring identity and belonging.", badge: "Free Entry", badgeType: "free", applicationLink: null },
  { id: 5, day: "03", month: "MAY", name: "International Cultural Day", venue: "Main Ground", organiser: "Cultural Club", time: "All Day", description: "A celebration of diversity — food, dance, art from around the world.", badge: "Open to All", badgeType: "free", applicationLink: null }
];



const announcements = [
  "🏁 Drone Racing Championship entries close April 18 — register now!",
  "💻 TechNest Hackathon 2025 on April 22 — form your teams today!",
  "📸 Photography Contest deadline: April 25 — submit online!",
  "🎭 \"Echoes\" Drama Performance on April 28 — free entry for all students!",
  "🌍 International Cultural Day on May 3 — volunteers needed!"
];

// State
let applications = [];
let currentClub = "";

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", function() {
  initVideo();
  initTicker();
  renderClubs();
  renderEvents();
  updateStats();
  initNavigation();
  initFormHandling();
  initContactPage();
  showNotifications();
});

// Video autoplay handler - Simple version
function initVideo() {
  var video = document.getElementById("heroVideo");
  if (!video) return;
  
  video.muted = true;
  video.play();
}

// Navigation
function initNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn");
  var videoSection = document.querySelector(".video-banner-section");
  
  navButtons.forEach(function(btn) {
    btn.addEventListener("click", function() {
      const page = this.getAttribute("data-page");
      
      // Update active button
      navButtons.forEach(function(b) {
        b.classList.remove("active", "btn-primary");
        b.classList.add("btn-outline-secondary");
      });
      this.classList.add("active", "btn-primary");
      this.classList.remove("btn-outline-secondary");
      
      // Show/hide pages
      document.getElementById("clubsPage").classList.add("d-none");
      document.getElementById("eventsPage").classList.add("d-none");
      document.getElementById("contactPage").classList.add("d-none");
      
      // Show/hide video banner (only on clubs page)
      if (page === "clubs") {
        document.getElementById("clubsPage").classList.remove("d-none");
        videoSection.classList.remove("d-none");
      } else if (page === "events") {
        document.getElementById("eventsPage").classList.remove("d-none");
        videoSection.classList.add("d-none");
      } else if (page === "contact") {
        document.getElementById("contactPage").classList.remove("d-none");
        videoSection.classList.add("d-none");
      }
    });
  });
}

// Ticker
function initTicker() {
  var tickerContent = document.getElementById("tickerContent");
  var text = announcements.join("   •   ");
  tickerContent.innerHTML = "<span>" + text + "</span><span>" + text + "</span>";
}

// Render Clubs
function renderClubs() {
  var container = document.getElementById("clubsContainer");
  var html = "";
  
  clubs.forEach(function(club) {
    html += '\
      <div class="col-md-6 col-lg-4">\
        <div class="card club-card h-100 shadow-sm">\
          <div class="card-body d-flex flex-column">\
            <div class="club-emoji">' + club.emoji + '</div>\
            <span class="badge mb-2 align-self-start">' + club.tag + '</span>\
            <h5 class="fw-bold">' + club.name + '</h5>\
            <p class="flex-grow-1">' + club.description + '</p>\
            <div class="d-flex justify-content-between align-items-center mt-2">\
              <span class="members-count">👥 ' + club.members + ' members</span>\
              <button class="btn btn-primary btn-sm" onclick="openApplicationModal(\'' + club.name + '\')">Apply to Join</button>\
            </div>\
          </div>\
        </div>\
      </div>';
  });
  
  container.innerHTML = html;
}

// Render Events
function renderEvents() {
  var container = document.getElementById("eventsContainer");
  var html = "";
  
  events.forEach(function(event) {
    // Show application link button only if applications are open (badgeType === "open")
    var applicationBtn = '';
    if (event.badgeType === "open") {
      var linkHref = event.applicationLink || "#";
      applicationBtn = '<a href="' + linkHref + '" class="btn btn-sm btn-outline-primary mt-2" target="_blank">Apply Now</a>';
    }
    
    html += '\
      <div class="col-md-6">\
        <div class="card event-card shadow-sm">\
          <div class="event-date">\
            <span class="day">' + event.day + '</span>\
            <span class="month">' + event.month + '</span>\
          </div>\
          <div class="event-details">\
            <div class="d-flex justify-content-between align-items-start gap-2 mb-1">\
              <h5 class="mb-0">' + event.name + '</h5>\
              <span class="event-badge ' + event.badgeType + '">' + event.badge + '</span>\
            </div>\
            <p class="mb-2">' + event.description + '</p>\
            <div class="event-meta">\
              <div>📍 ' + event.venue + ' &nbsp;·&nbsp; 🕐 ' + event.time + '</div>\
              <div>🏢 ' + event.organiser + '</div>\
            </div>\
            ' + applicationBtn + '\
          </div>\
        </div>\
      </div>';
  });
  
  container.innerHTML = html;
}

// Show Notifications
function showNotifications() {
  var container = document.getElementById("notificationContainer");
  if (!container) return;
  
  var notifications = [
    "Tomorrow last date of registration is there, apply now!",
    "New events have been added to the calendar."
  ];
  
  notifications.forEach(function(msg, index) {
    setTimeout(function() {
      var notif = document.createElement("div");
      notif.className = "notification-banner";
      notif.innerHTML = '\
        <p>' + msg + '</p>\
        <button class="btn-close-notification">&times;</button>\
      ';
      
      var closeBtn = notif.querySelector(".btn-close-notification");
      closeBtn.addEventListener("click", function() {
        notif.style.opacity = '0';
        setTimeout(function() { notif.remove(); }, 200);
      });
      
      container.appendChild(notif);
    }, 1000 + (index * 1500)); // Show with stagger
  });
}

// Update Stats
function updateStats() {
  document.getElementById("totalClubs").textContent = clubs.length;
  // Fake stat: 51 applications submitted
  document.getElementById("applicationCount").textContent = 51 + applications.length;
  // Fake stat: 10 events this month
  document.getElementById("eventsThisMonth").textContent = 10;
}

// Modal
function openApplicationModal(clubName) {
  currentClub = clubName;
  document.getElementById("modalClubName").textContent = "Apply to " + clubName;
  
  // Reset form
  document.getElementById("applicationForm").reset();
  clearErrors();
  
  // Show form, hide success
  document.getElementById("modalBody").classList.remove("d-none");
  document.getElementById("successMessage").classList.add("d-none");
  
  // Open modal
  var modal = new bootstrap.Modal(document.getElementById("applicationModal"));
  modal.show();
}

// Form Handling
function initFormHandling() {
  var form = document.getElementById("applicationForm");
  
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    var submitBtn = document.getElementById("submitBtn");
    if (submitBtn.disabled) return;
    
    if (validateForm()) {
      checkDuplicateAndSubmit();
    }
  });
}

function checkDuplicateAndSubmit() {
  var submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Checking duplicate...';
  
  var email = document.getElementById("inputEmail").value.trim().toLowerCase();
  
  if (SHEET_BEST_URL) {
    // Add cache busting parameter to prevent browser from returning stale cached data
    var urlWithCacheBust = SHEET_BEST_URL + (SHEET_BEST_URL.indexOf('?') > -1 ? '&' : '?') + '_t=' + new Date().getTime();
    
    fetch(urlWithCacheBust, { cache: "no-store" })
      .then(function(response) {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        // Ensure data is valid
        if (!Array.isArray(data)) {
          throw new Error("Invalid formatted data from API");
        }
        
        var emailExists = data.some(function(row) {
          // Sheet.best returns objects with column names as keys
          return row.Email && String(row.Email).toLowerCase() === email;
        });
        
        if (emailExists) {
          showError("inputEmail", "This email has already been used to submit an application.");
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Submit Application";
        } else {
          submitApplication();
        }
      })
      .catch(function(err) {
        console.error("Error checking duplicates:", err);
        // DO NOT bypass duplicate check if an error occurred — alert instead
        showError("inputEmail", "Unable to verify application status. Please try again.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Submit Application";
      });
  } else {
    submitApplication();
  }
}

function clearErrors() {
  var inputs = document.querySelectorAll(".form-control, .form-select");
  inputs.forEach(function(input) {
    input.classList.remove("is-invalid");
  });
}

function showError(fieldId, message) {
  var input = document.getElementById(fieldId);
  var error = document.getElementById("error" + fieldId.replace("input", ""));
  input.classList.add("is-invalid");
  if (error) error.textContent = message;
}

function validateForm() {
  clearErrors();
  var valid = true;
  
  var name = document.getElementById("inputName").value.trim();
  var rollNo = document.getElementById("inputRollNo").value.trim();
  var year = document.getElementById("inputYear").value;
  var email = document.getElementById("inputEmail").value.trim();
  var branch = document.getElementById("inputBranch").value;
  var role = document.getElementById("inputRole").value;
  var reason = document.getElementById("inputReason").value.trim();
  
  if (!name) {
    showError("inputName", "Full name is required");
    valid = false;
  }
  
  if (!rollNo) {
    showError("inputRollNo", "Roll number is required");
    valid = false;
  }
  
  if (!year) {
    showError("inputYear", "Year is required");
    valid = false;
  }
  
  if (!email || !email.endsWith("@ghristu.edu.in")) {
    showError("inputEmail", "Only college email (@ghristu.edu.in) is accepted");
    valid = false;
  } else {
    var emailExists = applications.some(function(app) {
      return app.email.toLowerCase() === email.toLowerCase();
    });
    if (emailExists) {
      showError("inputEmail", "This email has already been used to submit an application");
      valid = false;
    }
  }
  
  if (!branch) {
    showError("inputBranch", "Branch is required");
    valid = false;
  }
  
  if (!role) {
    showError("inputRole", "Role is required");
    valid = false;
  }
  
  if (!reason) {
    showError("inputReason", "Please tell us why you want to join");
    valid = false;
  }
  
  return valid;
}

function submitApplication() {
  var submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';
  
  var now = new Date();
  var dateStr = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  
  var formData = {
    Name: document.getElementById("inputName").value.trim(),
    "Roll No": document.getElementById("inputRollNo").value.trim(),
    Year: document.getElementById("inputYear").value,
    Email: document.getElementById("inputEmail").value.trim().toLowerCase(),
    Branch: document.getElementById("inputBranch").value,
    Club: currentClub,
    Role: document.getElementById("inputRole").value,
    Reason: document.getElementById("inputReason").value.trim(),
    Date: dateStr
  };
  
  // Save to local state
  applications.push({
    id: applications.length + 1,
    name: formData.Name,
    rollNo: formData["Roll No"],
    email: formData.Email,
    branch: formData.Branch,
    club: formData.Club,
    role: formData.Role,
    date: formData.Date
  });
  
  // Send to Sheet.best
  if (SHEET_BEST_URL) {
    fetch(SHEET_BEST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Submission failed with status: " + response.status);
      }
      showSuccess();
    })
    .catch(function(err) {
      console.error("Error submitting form:", err);
      var submitBtn = document.getElementById("submitBtn");
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Submit Application";
      alert("Failed to submit your application. Please try again later.");
    });
  } else {
    showSuccess();
  }
}

function showSuccess() {
  var submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = false;
  submitBtn.innerHTML = "Submit Application";
  
  // Update stats
  updateStats();
  
  // Show success message
  document.getElementById("modalBody").classList.add("d-none");
  document.getElementById("successMessage").classList.remove("d-none");
  document.getElementById("successClubName").textContent = currentClub;
}

// Contact page address randomizer
function initContactPage() {
  const randomBtn = document.getElementById("randomAddressBtn");
  if (!randomBtn) return;
  
  const campuses = [
    {
      title: "Yerawada (HQ) Campus",
      icon: "🏛️",
      address: "Nyati Unitree East Wing, near Deepak Fertilizers Building, Airport Road, Shastri Nagar, Yerawada, Pune - 411006, Maharashtra, India"
    },
    {
      title: "Wagholi Campus",
      icon: "🏫",
      address: "Gate No. 1200, Domkhel Road, Wagholi, Pune - 412207, Maharashtra, India"
    },
    {
      title: "Nagpur Campus",
      icon: "🏢",
      address: "Shradha House, 345, Kingsway, Nagpur - 440001, Maharashtra, India"
    },
    {
      title: "Jalgaon Campus",
      icon: "⛺",
      address: "Gate No. 57, Shirsoli Road, Mohadi, Jalgaon - 425002, Maharashtra, India"
    },
    {
      title: "Amravati Campus",
      icon: "🏗️",
      address: "Anjangaon Bari Road, Amravati - 444602, Maharashtra, India"
    }
  ];

  let currentIdx = 0;
  
  randomBtn.addEventListener("click", function() {
    let newIdx;
    do {
      newIdx = Math.floor(Math.random() * campuses.length);
    } while (newIdx === currentIdx && campuses.length > 1);
    
    currentIdx = newIdx;
    const campus = campuses[currentIdx];
    
    const iconEl = document.getElementById("addressIcon");
    const titleEl = document.getElementById("addressTitle");
    const detailEl = document.getElementById("addressDetail");
    
    if (iconEl) {
      iconEl.classList.remove("pulse");
      void iconEl.offsetWidth; // trigger reflow
      iconEl.classList.add("pulse");
      iconEl.textContent = campus.icon;
    }
    
    if (titleEl) titleEl.textContent = campus.title;
    if (detailEl) detailEl.textContent = campus.address;
  });
}
