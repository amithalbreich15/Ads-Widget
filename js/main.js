/**
 * Main application entry point
 * Initializes the recommendation widget when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize service and factory
    const service = new RecommendationService(config);
    const factory = new RecommendationFactory();
    
    // Initialize the widget
    const widget = new RecommendationWidget('taboolaWidget', service, factory);
    await widget.initialize();
    
    // Initialize tests - using the extended tests class instead of the basic one
    const tests = new WidgetTestsExtended(widget, service);

    const testsOld = new WidgetTests(widget, service);
    
    // Add event listeners for test buttons
    document.getElementById('runTestsButton').addEventListener('click', () => {
        testsOld.runTests();
    });
    
    // Add event listener for the extended tests button
    document.getElementById('runExtendedTestsButton')?.addEventListener('click', () => {
        tests.runExtendedTests();
    });
    
    document.getElementById('toggleDesktopMobile').addEventListener('click', () => {
        config.deviceType = config.deviceType === 'desktop' ? 'mobile' : 'desktop';
        document.getElementById('toggleDesktopMobile').textContent = 
            `Toggle to ${config.deviceType === 'desktop' ? 'Mobile' : 'Desktop'} View`;
        widget.initialize();
    });
});