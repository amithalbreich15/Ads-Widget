/**
 * SponsoredRecommendation
 * Class for handling sponsored recommendation items
 * Opens in a new tab when clicked
 */
class SponsoredRecommendation extends BaseRecommendation {
    /**
     * Returns the target for link opening
     * @returns {string} '_blank' to open in a new tab
     */
    getTarget() {
        return '_blank'; // Open in new tab
    }
    
    /**
     * Renders the branding section with sponsored indicator
     * @returns {string} HTML string for branding
     */
    renderBranding() {
        return `
            <div class="taboola-branding">
                <span class="taboola-origin"> Sponsored | </span>
                ${this.branding}   
            </div>
        `;
    }
}