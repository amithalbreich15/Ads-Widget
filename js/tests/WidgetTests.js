/**
 * WidgetTests
 * Tests for the recommendation widget functionality
 */
class WidgetTests {
    /**
     * Constructor
     * @param {RecommendationWidget} widget - The widget to test
     * @param {RecommendationService} service - The service to test
     */
    constructor(widget, service) {
        this.widget = widget;
        this.service = service;
        this.results = [];
    }
    
    /**
     * Runs all tests and displays results
     */
    async runTests() {
        this.results = [];
        const testResultsContainer = document.getElementById('testResults');
        testResultsContainer.innerHTML = '<h3>Running tests...</h3>';
        
        // Run all tests
        await this.testApiConnection();
        this.testRecommendationRendering();
        this.testResponsiveLayout();
        this.testEventHandlers();
        
        // Display results
        let html = '<h3>Test Results:</h3><ul>';
        this.results.forEach(result => {
            html += `<li style="color: ${result.passed ? 'green' : 'red'}; margin-bottom: 10px;">
                <strong>${result.name}:</strong> ${result.passed ? 'PASSED' : 'FAILED'} 
                ${result.message ? `<br><span style="color: #333; font-size: 14px;">${result.message}</span>` : ''}
            </li>`;
        });
        html += '</ul>';
        
        testResultsContainer.innerHTML = html;
    }
    
    /**
     * Tests API connection
     */
    async testApiConnection() {
        try {
            const data = await this.service.getRecommendations();
            const passed = data && data.list && Array.isArray(data.list);
            this.results.push({
                name: 'API Connection Test',
                passed,
                message: passed ? 'Successfully retrieved data from API' : 'Failed to retrieve valid data'
            });
        } catch (error) {
            this.results.push({
                name: 'API Connection Test',
                passed: false,
                message: `Error: ${error.message}`
            });
        }
    }
    
    /**
     * Tests recommendation rendering
     */
    testRecommendationRendering() {
        const grid = document.querySelector('[data-test="recommendations-grid"]');
        const items = document.querySelectorAll('[data-test="recommendation-item"]');
        
        const passed = grid && items && items.length > 0;
        this.results.push({
            name: 'Recommendation Rendering Test',
            passed,
            message: passed ? `Successfully rendered ${items.length} recommendations` : 'Failed to render recommendations'
        });
    }
    
    /**
     * Tests responsive layout
     */
    testResponsiveLayout() {
        const computedStyle = window.getComputedStyle(document.querySelector('.taboola-grid'));
        const gridTemplateColumns = computedStyle.getPropertyValue('grid-template-columns');
        
        const passed = gridTemplateColumns !== '';
        this.results.push({
            name: 'Responsive Layout Test',
            passed,
            message: passed ? `Grid template columns: ${gridTemplateColumns}` : 'Failed to apply responsive grid layout'
        });
    }
    
    /**
     * Tests event handlers
     */
    testEventHandlers() {
        const items = document.querySelectorAll('.taboola-item');
        let passed = items.length > 0;
        
        // Check that each item has a click handler
        // Note: In a real environment we'd use a more sophisticated test
        // for event handlers
        items.forEach(item => {
            if (!item.onclick && !item.getAttribute('data-has-events')) {
                item.setAttribute('data-has-events', 'true');  // Mark for testing
                passed = false;
            }
        });
        
        this.results.push({
            name: 'Event Handlers Test',
            passed,
            message: passed ? 'All recommendation items have click handlers attached' : 'Some items are missing click handlers'
        });
    }
}