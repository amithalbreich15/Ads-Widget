/**
 * OrganicRecommendation
 * Handles organic recommendation items, supports videos in a large modal
 */
class OrganicRecommendation extends BaseRecommendation {
    constructor(data) {
        super(data);
        this.isVideo = data.type === "video";
        this.videoUrl = data.videoUrl || data.url;
    }

    /**
     * Returns the target for link opening
     * @returns {string} '_self' to open in the same tab
     */
    getTarget() {
        return "_self"; // Open in the same tab for articles
    }

    /**
     * Renders the branding section with organic indicator
     * @returns {string} HTML string for branding
     */
    renderBranding() {
        return `
            <div class="taboola-branding">
                <span class="taboola-origin"> Organic | </span>
                ${this.branding}
            </div>
        `;
    }

    /**
     * Renders the recommendation item HTML
     * @returns {string} HTML string for the recommendation item
     */
    renderHtml() {
        return `
            <div class="taboola-item ${this.isVideo ? 'video-item' : ''}" 
                data-id="${this.id}" 
                data-test="recommendation-item" 
                data-is-video="${this.isVideo}" 
                data-video-url="${this.isVideo ? this.videoUrl : ''}">
                
                <div class="taboola-thumbnail">
                    <img src="${this.thumbnailUrl}" alt="${this.name}" loading="lazy">
                    ${this.isVideo ? '<div class="video-play-icon"></div>' : ''}
                </div>
                <div class="taboola-caption">${this.name}</div>
                ${this.renderBranding()}
            </div>
        `;
    }

    /**
     * Attaches event listeners to the recommendation item
     * @param {HTMLElement} element - The DOM element to attach events to
     */
    attachEvents(element) {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.isVideo) {
                openVideoPopup(this.videoUrl);
            } else {
                window.open(this.url, this.getTarget());
            }
        });
    }
}
