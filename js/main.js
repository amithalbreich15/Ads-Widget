/**
 * Opens a modal popup to play a video in full size
 * @param {string} videoUrl - The URL of the video
 */
function openVideoPopup(videoUrl) {
    const popup = document.getElementById("videoPopup");
    const videoElement = document.getElementById("videoElement");

    // Clear any previous content
    videoElement.innerHTML = "";

    let embedUrl = "";

    // Handle YouTube videos
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        let videoId = "";
        if (videoUrl.includes("watch?v=")) {
            videoId = videoUrl.split("watch?v=")[1]?.split("&")[0];
        } else if (videoUrl.includes("youtu.be/")) {
            videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0];
        }
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1`;
    }
    // Handle Vimeo videos
    else if (videoUrl.includes("vimeo.com")) {
        const vimeoId = videoUrl.split("/").pop();
        embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&playsinline=1`;
    }
    // Handle direct video files
    else {
        videoElement.innerHTML = `<video controls autoplay style="width:100%; height:auto; max-height:90vh;">
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
        </video>`;
    }

    // If embedding YouTube or Vimeo, use an iframe
    if (embedUrl) {
        videoElement.innerHTML = `<iframe width="100%" height="100%" 
            src="${embedUrl}" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen playsinline></iframe>`;
    }

    // Show the popup
    popup.style.display = "flex";

    // Add event listener to close button
    document.querySelector(".video-close").addEventListener("click", closeVideoPopup);

    // Add event listener to close when clicking outside the video
    popup.addEventListener("click", function (e) {
        if (e.target === popup) {
            closeVideoPopup();
        }
    });
}

/**
 * Closes the video popup
 */
function closeVideoPopup() {
    const popup = document.getElementById("videoPopup");
    const videoElement = document.getElementById("videoElement");

    // Clear video source to stop playback
    videoElement.innerHTML = "";

    // Hide the popup
    popup.style.display = "none";
}



/**
 * Main application entry point
 * Initializes the recommendation widget when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', async () => {
    const service = new RecommendationService(config);
    const factory = new RecommendationFactory();
    let widget = new RecommendationWidget('taboolaWidget', service, factory);
    let organicTests = null; // Declare variable for mock test loading

    // Find all video items and attach click events
    const videoItems = document.querySelectorAll(".taboola-item.video-item");
    videoItems.forEach((item) => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const videoUrl = this.getAttribute("data-video-url");
            if (videoUrl) {
                openVideoPopup(videoUrl);
            }
        });
    });

    // /**
    //  * Opens a modal popup to play a video
    //  * @param {string} videoUrl - The URL of the video
    //  */
    // function openVideoPopup(videoUrl) {
    //     const videoModal = document.getElementById("videoPopup");
    //     const videoElement = document.getElementById("videoElement");

    //     if (videoElement) {
    //         videoElement.src = videoUrl;
    //     }
    //     if (videoModal) {
    //         videoModal.style.display = "block";
    //     }
    // }

    // /**
    //  * Closes the video popup
    //  */
    // function closeVideoPopup() {
    //     const videoModal = document.getElementById("videoPopup");
    //     const videoElement = document.getElementById("videoElement");

    //     if (videoElement) {
    //         videoElement.src = ""; // Stop video playback
    //     }
    //     if (videoModal) {
    //         videoModal.style.display = "none";
    //     }
    // }

    // Close popup when clicking outside of the video
    window.addEventListener("click", (event) => {
        const videoModal = document.getElementById("videoPopup");
        if (event.target === videoModal) {
            closeVideoPopup();
        }
    });


    // Function to load the real API data
    async function loadRealData() {
        widget = new RecommendationWidget('taboolaWidget', service, factory);
        organicTests = null; // Ensure mock tests are not loaded
        await widget.initialize();  // Force reload
    }

    // Function to load mock API data
    function loadMockData() {
        widget = new MockRecommendationWidget('taboolaWidget', service, factory);
        organicTests = new OrganicRecommendationTests(widget, service); // Initialize mock tests
        widget.initialize();
    }

    // Initialize the widget with real API data by default
    await widget.initialize();

    // Initialize tests
    const tests = new WidgetTestsExtended(widget, service);
    const testsOld = new WidgetTests(widget, service);

    // Add event listeners for switching between Real API and Mock API
    document.getElementById('loadRealData').addEventListener('click', loadRealData);
    document.getElementById('loadMockData').addEventListener('click', loadMockData);

    // Event listener for organic tests button (Only runs if using Mock Data)
    document.getElementById('runOrganicTestsButton')?.addEventListener('click', () => {
        if (organicTests) {
            organicTests.runOrganicTests();
        } else {
            console.warn("Organic tests are only available with mock data.");
        }
    });

    // Event listeners for other test buttons
    document.getElementById('runTestsButton').addEventListener('click', () => {
        testsOld.runTests();
    });

    document.getElementById('runExtendedTestsButton')?.addEventListener('click', () => {
        tests.runExtendedTests();
    });

    // Toggle between desktop and mobile views
    document.getElementById('toggleDesktopMobile').addEventListener('click', () => {
        config.deviceType = config.deviceType === 'desktop' ? 'mobile' : 'desktop';
        document.getElementById('toggleDesktopMobile').textContent = 
            `Toggle to ${config.deviceType === 'desktop' ? 'Mobile' : 'Desktop'} View`;
        widget.initialize();
    });
});
