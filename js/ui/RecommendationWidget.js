/**
 * RecommendationWidget
 * Controls the entire widget UI and functionality with pagination
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
        this.contentContainer = document.getElementById("taboolaContent");
        this.paginationContainer = document.getElementById("paginationControls");
        this.service = service;
        this.factory = factory;
        this.recommendations = [];
        this.itemsPerPage = 8;
        this.currentPage = 1;
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
            this.showError("Failed to load recommendations. Please try again later.");
        }
    }

    /**
     * Processes the raw API data into recommendation objects
     * @param {Object} data - Raw data from the API
     */
    processRecommendations(data) {
        if (!data || !data.list || !Array.isArray(data.list)) {
            throw new Error("Invalid data format");
        }

        this.recommendations = data.list.map((item) => this.factory.createRecommendation(item));
    }

    /**
     * Renders the recommendations with pagination
     */
    render() {
        if (this.recommendations.length === 0) {
            this.showError("No recommendations available.");
            return;
        }

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const itemsToDisplay = this.recommendations.slice(startIndex, endIndex);

        const html = `
            <div class="taboola-grid" data-test="recommendations-grid">
                ${itemsToDisplay.map((rec) => rec.renderHtml()).join("")}
            </div>
        `;

        this.contentContainer.innerHTML = html;
        this.setupPaginationControls();

        // Attach event listeners
        itemsToDisplay.forEach((rec) => {
            const element = this.contentContainer.querySelector(`.taboola-item[data-id="${rec.id}"]`);
            if (element) {
                rec.attachEvents(element);
            }
        });
    }

    /**
     * Sets up pagination controls
     */
    setupPaginationControls() {
        const totalPages = Math.ceil(this.recommendations.length / this.itemsPerPage);
        if (totalPages <= 1) {
            this.paginationContainer.innerHTML = "";
            return;
        }

        this.paginationContainer.innerHTML = `
            <button id="prevPage" ${this.currentPage === 1 ? "disabled" : ""}>Previous</button>
            <span>Page ${this.currentPage} of ${totalPages}</span>
            <button id="nextPage" ${this.currentPage === totalPages ? "disabled" : ""}>Next</button>
        `;

        document.getElementById("prevPage").addEventListener("click", () => {
            this.currentPage--;
            this.render();
        });

        document.getElementById("nextPage").addEventListener("click", () => {
            this.currentPage++;
            this.render();
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
