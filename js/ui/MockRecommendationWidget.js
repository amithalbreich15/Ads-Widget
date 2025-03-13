/**
 * MockRecommendationWidget
 * Controls the entire widget UI and functionality with pagination
 * Supports desktop-only use
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
        this.contentContainer = document.getElementById("taboolaContent");
        this.paginationContainer = document.getElementById("paginationControls");
        this.service = service;
        this.factory = factory;
        this.recommendations = [];
        this.itemsPerPage = 8;
        this.currentPage = 1;

        // Ensure pagination container is always visible
        this.setupPaginationContainer();
    }

    /**
     * Initializes the widget
     * Uses mock data from OrganicRecommendationTests.js
     */
    async initialize() {
        try {
            this.showPlaceholderRecommendations(); // Show placeholders while loading data

            // Fetch mock API data
            const mockTest = new OrganicRecommendationTests(this, this.service);
            const mockData = mockTest.mockTaboolaAPI();

            // Process and render recommendations
            this.processRecommendations(mockData);
            this.render();
        } catch (error) {
            this.showError("Failed to load recommendations. Please try again later.");
        }
    }

    /**
     * Processes the raw API data into recommendation objects
     * @param {Object} data - Raw data from the mock API
     */
    processRecommendations(data) {
        if (!data || !data.list || !Array.isArray(data.list)) {
            throw new Error("Invalid data format");
        }

        this.recommendations = data.list.map(item => this.factory.createRecommendation(item));
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

        this.contentContainer.innerHTML = `
            <div class="taboola-grid" data-test="recommendations-grid">
                ${itemsToDisplay.map(rec => rec.renderHtml()).join("")}
            </div>
        `;

        this.setupPaginationControls();

        // Attach event listeners
        itemsToDisplay.forEach(rec => {
            const element = this.contentContainer.querySelector(`.taboola-item[data-id="${rec.id}"]`);
            if (element) {
                rec.attachEvents(element);
            }
        });
    }

    /**
     * Sets up pagination container to ensure it's visible
     */
    setupPaginationContainer() {
        if (!this.paginationContainer) {
            this.paginationContainer = document.createElement("div");
            this.paginationContainer.id = "paginationControls";
            this.paginationContainer.classList.add("pagination-controls");
            this.container.appendChild(this.paginationContainer);
        }
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
     * Displays placeholder recommendations while loading real data
     */
    showPlaceholderRecommendations() {
        const placeholders = Array(8)
            .fill(`
                <div class="taboola-item placeholder">
                    <div class="taboola-thumbnail placeholder-thumbnail"></div>
                    <div class="taboola-caption placeholder-text"></div>
                </div>
            `)
            .join("");

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
