/**
 * RecommendationWidget
 * Controls the entire widget UI and functionality
 */
class RecommendationWidget {
    /**
     * Constructor
     * @param {string} containerId - ID of the container element
     * @param {RecommendationService} service - Service for fetching recommendations
     * @param {RecommendationFactory} factory - Factory for creating recommendation objects
     */
    constructor(containerId, service, factory) {
        this.container = document.getElementById(containerId);
        this.contentContainer = document.getElementById('taboolaContent');
        this.service = service;
        this.factory = factory;
        this.recommendations = [];
    }
    
    /**
     * Initializes the widget
     */
    async initialize() {
        try {
            this.showLoading();
            const data = await this.service.getRecommendations();
            this.processRecommendations(data);
            this.render();
        } catch (error) {
            this.showError('Failed to load recommendations. Please try again later.');
        }
    }
    
    /**
     * Processes the raw API data into recommendation objects
     * @param {Object} data - Raw data from the API
     */
    processRecommendations(data) {
        if (!data || !data.list || !Array.isArray(data.list)) {
            throw new Error('Invalid data format');
        }
        
        this.recommendations = data.list.map(item => this.factory.createRecommendation(item));
    }
    
    /**
     * Renders the recommendations to the DOM
     */
    render() {
        if (this.recommendations.length === 0) {
            this.showError('No recommendations available.');
            return;
        }
        
        const html = `
            <div class="taboola-grid" data-test="recommendations-grid">
                ${this.recommendations.map(rec => rec.renderHtml()).join('')}
            </div>
        `;
        
        this.contentContainer.innerHTML = html;
        
        // Attach event listeners
        this.recommendations.forEach((rec, index) => {
            const element = this.contentContainer.querySelector(`.taboola-item[data-id="${rec.id}"]`);
            if (element) {
                rec.attachEvents(element);
            }
        });
    }
    
    /**
     * Shows loading state
     */
    showLoading() {
        this.contentContainer.innerHTML = `
            <div class="taboola-loading">
                <div class="loader"></div>
                <div>Loading recommendations...</div>
            </div>
        `;
    }
    
    /**
     * Shows error state
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.contentContainer.innerHTML = `
            <div class="taboola-error">
                <div>${message}</div>
            </div>
        `;
    }
}