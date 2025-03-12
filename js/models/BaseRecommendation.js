/**
 * BaseRecommendation
 * Base class for all recommendation types
 */
class BaseRecommendation {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.url = data.url;
        this.thumbnailUrl = data.thumbnail[0]?.url || '';
        this.origin = data.origin;
        this.type = data.type;
        this.branding = data.branding || '';
    }
    
    /**
     * Determines the target attribute for the link
     * @returns {string} Target attribute value (_self or _blank)
     */
    getTarget() {
        return '_self'; // Default target
    }
    
    /**
     * Renders the recommendation item HTML
     * @returns {string} HTML string for the recommendation item
     */
    renderHtml() {
        return `
            <div class="taboola-item" data-id="${this.id}" data-test="recommendation-item">
                <div class="taboola-thumbnail">
                    <img src="${this.thumbnailUrl}" alt="${this.name}" loading="lazy">
                </div>
                <div class="taboola-caption">${this.name}</div>
                ${this.renderBranding()}
            </div>
        `;
    }
    
    /**
     * Renders the branding section
     * @returns {string} HTML string for branding
     */
    renderBranding() {
        return this.branding ? `<div class="taboola-branding">${this.branding}</div>` : '';
    }
    
    /**
     * Attaches event listeners to the recommendation item
     * @param {HTMLElement} element - The DOM element to attach events to
     */
    attachEvents(element) {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(this.url, this.getTarget());
        });
    }
}