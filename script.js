// Tech stack data with colored logos from skill-icons
const techStack = [
    { name: 'Java', logo: 'https://skillicons.dev/icons?i=java' },
    { name: 'SQL', logo: 'https://cdn-icons-png.freepik.com/256/17266/17266015.png?semt=ais_white_label' },
    { name: 'Spring Boot', logo: 'https://skillicons.dev/icons?i=spring' },
    { name: 'GraphQL', logo: 'https://skillicons.dev/icons?i=graphql' },
    { name: 'Node.js', logo: 'https://skillicons.dev/icons?i=nodejs' },
    { name: 'TypeScript', logo: 'https://skillicons.dev/icons?i=typescript' },
    { name: 'JavaScript', logo: 'https://skillicons.dev/icons?i=javascript' },
    { name: 'PHP', logo: 'https://skillicons.dev/icons?i=php' },
    { name: 'HTML/CSS', logo: 'https://skillicons.dev/icons?i=html' },
    { name: 'JUnit', logo: 'https://skillicons.dev/icons?i=java' },
    { name: 'AWS', logo: 'https://skillicons.dev/icons?i=aws' },
    { name: 'Git', logo: 'https://skillicons.dev/icons?i=git' },
    { name: 'GitHub', logo: 'https://skillicons.dev/icons?i=github' },
    { name: 'Docker', logo: 'https://skillicons.dev/icons?i=docker' },
    { name: 'Kubernetes', logo: 'https://skillicons.dev/icons?i=kubernetes' },
    { name: 'Postman', logo: 'https://skillicons.dev/icons?i=postman' },
    { name: 'SonarQube', logo: 'https://www.svgrepo.com/show/354365/sonarqube.svg' },
    { name: 'Splunk', logo: 'https://avatars.githubusercontent.com/u/651467?s=280&v=4' },
    { name: 'Grafana', logo: 'https://skillicons.dev/icons?i=grafana' }
];

// Create tech items and properly duplicate for seamless loop
function createTechCarousel() {
    const techTrack = document.getElementById('tech-track');
    
    // Create three sets for truly seamless scrolling
    const allTech = [...techStack, ...techStack, ...techStack];
    
    allTech.forEach(tech => {
        const techItem = document.createElement('div');
        techItem.className = 'tech-item';
        
        const img = document.createElement('img');
        img.src = tech.logo;
        img.alt = tech.name;
        img.title = tech.name;
        
        // Add error handling for broken images
        img.onerror = function() {
            // Create a fallback with colored background and text
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #F56600, #ff7722);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 12px;
                text-align: center;
                line-height: 1;
                flex-shrink: 0;
            `;
            // Use first 2 characters or common abbreviations
            const abbrev = tech.name === 'JavaScript' ? 'JS' : 
                          tech.name === 'TypeScript' ? 'TS' :
                          tech.name === 'HTML/CSS' ? 'H5' :
                          tech.name === 'Node.js' ? 'N' :
                          tech.name === 'Spring Boot' ? 'SB' :
                          tech.name === 'GitHub Actions' ? 'GA' :
                          tech.name.substring(0, 2).toUpperCase();
            fallback.textContent = abbrev;
            this.parentNode.replaceChild(fallback, this);
        };
        
        const span = document.createElement('span');
        span.textContent = tech.name;
        
        techItem.appendChild(img);
        techItem.appendChild(span);
        techTrack.appendChild(techItem);
    });
}

// Resume Modal Functionality
const resumeBtn = document.getElementById('resume-btn');
const modal = document.getElementById('resume-modal');
const closeBtn = document.getElementById('close-modal');
const resumeFrame = document.getElementById('resume-frame');
const loadingMessage = document.getElementById('loading-message');

function openModal() {
    modal.style.display = 'flex';
    // Small delay to ensure display is set before adding show class
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Load the PDF
    resumeFrame.src = 'Nick_Thomas_Resume_2025.pdf';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        resumeFrame.style.display = 'none';
        loadingMessage.style.display = 'flex';
        resumeFrame.src = ''; // Clear the iframe
    }, 300);
    document.body.style.overflow = ''; // Restore scrolling
}

// Event listeners for modal
function initializeModal() {
    if (resumeBtn) resumeBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Handle iframe load
    if (resumeFrame) {
        resumeFrame.addEventListener('load', function() {
            if (loadingMessage) loadingMessage.style.display = 'none';
            resumeFrame.style.display = 'block';
        });
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createTechCarousel();
    initializeModal();
});