/**
 * RecommendationService
 * Handles interactions with the Taboola API
 */
class RecommendationService {
    constructor(config) {
        this.config = config;
    }
    
    /**
     * Fetches recommendations from the Taboola API
     * @returns {Promise} A promise that resolves to the API response data
     */
    async getRecommendations() {
        try {
            const url = this.buildApiUrl();
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            throw error;
        }
    }
    
    /**
     * Builds the API URL with all necessary parameters
     * @returns {string} The complete API URL
     */
    buildApiUrl() {
        const params = new URLSearchParams({
            'app.type': this.config.deviceType,
            'app.apikey': this.config.apiKey,
            'count': this.config.count,
            'source.type': 'text',
            'source.id': this.config.sourceId,
            'source.url': this.config.sourceUrl
        });
        
        return `${this.config.apiUrl}?${params.toString()}`;
    }
}