/**
 * RecommendationFactory
 * Creates appropriate recommendation objects based on type
 */
class RecommendationFactory {
    /**
     * Creates a recommendation object based on the data type
     * @param {Object} data - The recommendation data from the API
     * @returns {BaseRecommendation} A recommendation object of the appropriate type
     */
    createRecommendation(data) {
        if (data.origin === 'sponsored') {
            return new SponsoredRecommendation(data);
        } else if (data.origin === 'organic') {
            return new OrganicRecommendation(data);
        } else {
            // Default case for future recommendation types
            return new BaseRecommendation(data);
        }
    }
}