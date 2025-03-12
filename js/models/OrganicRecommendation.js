/**
 * OrganicRecommendation
 * Class for handling organic recommendation items
 * Opens in the same tab when clicked
 */
class OrganicRecommendation extends BaseRecommendation {
    /**
     * Returns the target for link opening
     * @returns {string} '_self' to open in the same tab
     */
    getTarget() {
        return '_self'; // Open in same tab
    }
    
    /**
     * Renders the branding section with organic indicator
     * @returns {string} HTML string for branding
     */
    renderBranding() {
        return `
            <div class="taboola-branding">
                ${this.branding}
                <span class="taboola-origin">• Organic</span>
            </div>
        `;
    }
}