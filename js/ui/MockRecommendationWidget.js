/**
 * RecommendationWidget
 * Controls the entire widget UI and functionality
 */
class MockRecommendationWidget {
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
     * Uses mock data from OrganicRecommendationTests.js
     */
    async initialize() {
        try {
            this.showPlaceholderRecommendations(); // Step 1: Show placeholders

            // Step 2: Use mock API data from OrganicRecommendationTests.js
            const mockTest = new OrganicRecommendationTests(this, this.service);
            const mockData = mockTest.mockTaboolaAPI();

            // Step 3: Process and render recommendations
            this.processRecommendations(mockData);
            this.render();
        } catch (error) {
            this.showError('Failed to load recommendations. Please try again later.');
        }
    }
    
    /**
     * Processes the raw API data into recommendation objects
     * @param {Object} data - Raw data from the API (mock in this case)
     */
    processRecommendations(data) {
        if (!data || !data.list || !Array.isArray(data.list)) {
            throw new Error('Invalid data format');
        }
        
        // Filter only organic recommendations
        this.recommendations = data.list
            // .filter(item => item.origin === "organic")
            .map(item => this.factory.createRecommendation(item));
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
        this.recommendations.forEach((rec) => {
            const element = this.contentContainer.querySelector(`.taboola-item[data-id="${rec.id}"]`);
            if (element) {
                rec.attachEvents(element);
            }
        });
    }

    /**
     * Displays placeholder recommendations while loading real data
     */
    showPlaceholderRecommendations() {
        const placeholders = Array(8).fill(`
            <div class="taboola-item placeholder">
                <div class="taboola-thumbnail placeholder-thumbnail"></div>
                <div class="taboola-caption placeholder-text"></div>
            </div>
        `).join('');
        
        this.contentContainer.innerHTML = `<div class="taboola-grid">${placeholders}</div>`;
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
