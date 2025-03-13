// /**
//  * Video Player Module
//  * Handles all video playback functionality - inline and popup
//  */
// const VideoPlayer = {
//     /**
//      * Initialize video player functionality
//      */
//     init: function() {
//         // Set up event listeners for existing popup close buttons
//         document.querySelector('.video-close')?.addEventListener('click', this.closeVideoPopup);
        
//         // Add event listener to close when clicking outside the video
//         document.getElementById('videoPopup')?.addEventListener('click', function(e) {
//             if (e.target === this) {
//                 VideoPlayer.closeVideoPopup();
//             }
//         });
//     },
    
//     /**
//      * Play video inline within the recommendation item
//      * @param {string} videoUrl - URL of the video to play
//      * @param {HTMLElement} container - Container element where video will be inserted
//      * @param {string} title - Title of the video
//      */
//     playVideoInline: function(videoUrl, container, title) {
//         // Create a container for the inline video
//         const inlineVideoContainer = document.createElement('div');
//         inlineVideoContainer.className = 'inline-video-container';
        
//         // Determine video type and create appropriate element
//         let videoContent = '';
        
//         if (videoUrl.includes('youtube.com')) {
//             // Convert YouTube URL to embed format if needed
//             if (videoUrl.includes('watch?v=')) {
//                 const videoId = videoUrl.split('watch?v=')[1].split('&')[0];
//                 videoContent = `<iframe width="100%" height="100%" 
//                     src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
//                     frameborder="0" allowfullscreen></iframe>`;
//             } else {
//                 videoContent = `<iframe width="100%" height="100%" 
//                     src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
//             }
//         } else if (videoUrl.includes('vimeo.com')) {
//             // Handle Vimeo videos
//             const vimeoId = videoUrl.split('/').pop();
//             videoContent = `<iframe width="100%" height="100%" 
//                 src="https://player.vimeo.com/video/${vimeoId}?autoplay=1" 
//                 frameborder="0" allowfullscreen></iframe>`;
//         } else {
//             // Default for direct video files (mp4, webm, etc.)
//             videoContent = `<video controls autoplay style="width:100%; height:100%">
//                 <source src="${videoUrl}" type="${this.getVideoType(videoUrl)}">
//                 Your browser does not support the video tag.
//             </video>`;
//         }
        
//         // Add close button
//         videoContent += `<button class="inline-video-close">&times;</button>`;
        
//         // Set the content
//         inlineVideoContainer.innerHTML = videoContent;
        
//         // Replace the thumbnail with the video
//         const thumbnailElement = container.querySelector('.rec-thumbnail');
//         if (thumbnailElement) {
//             // Store the original content for restoration later
//             thumbnailElement.dataset.originalContent = thumbnailElement.innerHTML;
//             thumbnailElement.innerHTML = '';
//             thumbnailElement.appendChild(inlineVideoContainer);
            
//             // Add event listener to the close button
//             const closeButton = inlineVideoContainer.querySelector('.inline-video-close');
//             if (closeButton) {
//                 closeButton.addEventListener('click', function(e) {
//                     e.stopPropagation(); // Prevent the click from bubbling up
//                     VideoPlayer.closeInlineVideo(thumbnailElement);
//                 });
//             }
//         }
//     },
    
//     /**
//      * Close inline video and restore original thumbnail
//      * @param {HTMLElement} thumbnailElement - The thumbnail container element
//      */
//     closeInlineVideo: function(thumbnailElement) {
//         if (thumbnailElement && thumbnailElement.dataset.originalContent) {
//             thumbnailElement.innerHTML = thumbnailElement.dataset.originalContent;
//             delete thumbnailElement.dataset.originalContent;
//         }
//     },
    
//     /**
//      * Open video in a popup modal
//      * @param {string} videoUrl - URL of the video to play
//      * @param {string} title - Title of the video
//      */
//     openVideoPopup: function(videoUrl, title) {
//         const popup = document.getElementById('videoPopup');
//         const videoElement = document.getElementById('videoElement');
        
//         if (!popup || !videoElement) return;
        
//         // Update video source based on URL type
//         if (videoUrl.includes('youtube.com')) {
//             // Convert YouTube URL to embed format if needed
//             if (videoUrl.includes('watch?v=')) {
//                 const videoId = videoUrl.split('watch?v=')[1].split('&')[0];
//                 videoElement.innerHTML = `<iframe width="100%" height="100%" 
//                     src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
//                     frameborder="0" allowfullscreen></iframe>`;
//             } else {
//                 videoElement.innerHTML = `<iframe width="100%" height="100%" 
//                     src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
//             }
//         } else if (videoUrl.includes('vimeo.com')) {
//             // Handle Vimeo videos
//             const vimeoId = videoUrl.split('/').pop();
//             videoElement.innerHTML = `<iframe width="100%" height="100%" 
//                 src="https://player.vimeo.com/video/${vimeoId}?autoplay=1" 
//                 frameborder="0" allowfullscreen></iframe>`;
//         } else {
//             // Default for direct video files
//             videoElement.innerHTML = `<video controls autoplay style="width:100%">
//                 <source src="${videoUrl}" type="${this.getVideoType(videoUrl)}">
//                 Your browser does not support the video tag.
//             </video>`;
//         }
        
//         // Show the popup
//         popup.style.display = 'flex';
//     },
    
//     /**
//      * Close video popup
//      */
//     closeVideoPopup: function() {
//         const popup = document.getElementById('videoPopup');
//         const videoElement = document.getElementById('videoElement');
        
//         if (!popup || !videoElement) return;
        
//         // Clear video source to stop playback
//         videoElement.innerHTML = '';
        
//         // Hide the popup
//         popup.style.display = 'none';
//     },
    
//     /**
//      * Determine video MIME type based on file extension
//      * @param {string} url - URL of the video
//      * @returns {string} MIME type for the video
//      */
//     getVideoType: function(url) {
//         const extension = url.split('.').pop().toLowerCase();
        
//         switch (extension) {
//             case 'mp4':
//                 return 'video/mp4';
//             case 'webm':
//                 return 'video/webm';
//             case 'ogg':
//                 return 'video/ogg';
//             case 'mov':
//                 return 'video/quicktime';
//             default:
//                 return 'video/mp4'; // Default to mp4
//         }
//     }
// };

// // Initialize the video player
// document.addEventListener('DOMContentLoaded', function() {
//     VideoPlayer.init();
// });

// // Make functions available globally
// window.openVideoPopup = function(videoUrl, title) {
//     VideoPlayer.openVideoPopup(videoUrl, title);
// };

// window.playVideoInline = function(videoUrl, container, title) {
//     VideoPlayer.playVideoInline(videoUrl, container, title);
// };

// window.closeVideoPopup = function() {
//     VideoPlayer.closeVideoPopup();
// };