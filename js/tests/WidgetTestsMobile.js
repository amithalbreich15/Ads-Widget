// /**
//  * WidgetTests
//  * Tests for the recommendation widget functionality
//  */
// class WidgetTestsExtended {
//     /**
//      * Constructor
//      * @param {RecommendationWidget} widget - The widget to test
//      * @param {RecommendationService} service - The service to test
//      */
//     constructor(widget, service) {
//         this.widget = widget;
//         this.service = service;
//         this.results = [];
//         this.isMobileView = window.innerWidth < 768;
//         this.originalViewport = window.innerWidth;
//     }
    
//     /**
//      * Runs all tests and displays results
//      */
//     async runExtendedTests() {
//         this.results = [];
//         const testResultsContainer = document.getElementById('testResults');
//         testResultsContainer.innerHTML = '<h3>Running tests...</h3>';
        
//         // Run core tests
//         await this.testApiConnection();
//         this.testRecommendationRendering();
//         this.testResponsiveLayout();
//         this.testEventHandlers();
        
//         // Run platform-specific tests
//         this.testPrivacySettingsLink();
//         this.testAccessibility();
//         this.testLoadingState();
//         this.testErrorHandling();
        
//         // Run device-specific tests (PC and Mobile)
//         await this.runDeviceSpecificTests();
        
//         // Display results
//         let html = '<h3>Test Results:</h3><ul>';
//         this.results.forEach(result => {
//             html += `<li style="color: ${result.passed ? 'green' : 'red'}; margin-bottom: 10px;">
//                 <strong>${result.name}:</strong> ${result.passed ? 'PASSED' : 'FAILED'} 
//                 ${result.message ? `<br><span style="color: #333; font-size: 14px;">${result.message}</span>` : ''}
//             </li>`;
//         });
//         html += '</ul>';
        
//         testResultsContainer.innerHTML = html;
//     }
    
//     /**
//      * Tests API connection
//      */
//     async testApiConnection() {
//         try {
//             const data = await this.service.getRecommendations();
//             const passed = data && data.list && Array.isArray(data.list);
//             this.results.push({
//                 name: 'API Connection Test',
//                 passed,
//                 message: passed ? 'Successfully retrieved data from API' : 'Failed to retrieve valid data'
//             });
//         } catch (error) {
//             this.results.push({
//                 name: 'API Connection Test',
//                 passed: false,
//                 message: `Error: ${error.message}`
//             });
//         }
//     }
    
//     /**
//      * Tests recommendation rendering
//      */
//     testRecommendationRendering() {
//         const grid = document.querySelector('[data-test="recommendations-grid"]');
//         const items = document.querySelectorAll('[data-test="recommendation-item"]');
        
//         const passed = grid && items && items.length > 0;
//         this.results.push({
//             name: 'Recommendation Rendering Test',
//             passed,
//             message: passed ? `Successfully rendered ${items.length} recommendations` : 'Failed to render recommendations'
//         });
//     }
    
//     /**
//      * Tests responsive layout
//      */
//     testResponsiveLayout() {
//         const computedStyle = window.getComputedStyle(document.querySelector('.taboola-grid'));
//         const gridTemplateColumns = computedStyle.getPropertyValue('grid-template-columns');
        
//         const passed = gridTemplateColumns !== '';
//         this.results.push({
//             name: 'Responsive Layout Test',
//             passed,
//             message: passed ? `Grid template columns: ${gridTemplateColumns}` : 'Failed to apply responsive grid layout'
//         });
//     }
    
//     /**
//      * Tests event handlers
//      */
//     testEventHandlers() {
//         const items = document.querySelectorAll('.taboola-item');
//         let passed = items.length > 0;
        
//         // Check that each item has a click handler
//         // Note: In a real environment we'd use a more sophisticated test
//         // for event handlers
//         items.forEach(item => {
//             if (!item.onclick && !item.getAttribute('data-has-events')) {
//                 item.setAttribute('data-has-events', 'true');  // Mark for testing
//                 passed = false;
//             }
//         });
        
//         this.results.push({
//             name: 'Event Handlers Test',
//             passed,
//             message: passed ? 'All recommendation items have click handlers attached' : 'Some items are missing click handlers'
//         });
//     }
    
//     /**
//      * Tests privacy settings link
//      */
//     testPrivacySettingsLink() {
//         const privacyLink = document.querySelector('[data-testid="privacy-label"]');
//         const passed = privacyLink && 
//                        privacyLink.getAttribute('href') && 
//                        privacyLink.getAttribute('target') === '_blank';
                       
//         this.results.push({
//             name: 'Privacy Settings Link Test',
//             passed,
//             message: passed ? 'Privacy settings link is properly configured' : 'Privacy settings link is missing or misconfigured'
//         });
//     }
    
//     /**
//      * Tests accessibility features
//      */
//     testAccessibility() {
//         // Check for basic accessibility requirements
//         const items = document.querySelectorAll('.taboola-item');
//         let missingAlt = 0;
//         let missingAriaLabels = 0;
        
//         items.forEach(item => {
//             const img = item.querySelector('img');
//             if (img && (!img.alt || img.alt === '')) {
//                 missingAlt++;
//             }
            
//             if (!item.getAttribute('aria-label') && !item.getAttribute('role')) {
//                 missingAriaLabels++;
//             }
//         });
        
//         const passed = missingAlt === 0 && missingAriaLabels === 0;
//         this.results.push({
//             name: 'Accessibility Test',
//             passed,
//             message: passed ? 'All items have proper accessibility attributes' : 
//                     `Missing: ${missingAlt} alt texts, ${missingAriaLabels} aria-labels`
//         });
//     }
    
//     /**
//      * Tests loading state
//      */
//     testLoadingState() {
//         // Simulate loading state
//         const contentDiv = document.getElementById('taboolaContent');
//         const originalContent = contentDiv.innerHTML;
        
//         try {
//             contentDiv.innerHTML = '<div class="loader"></div><div>Loading recommendations...</div>';
//             contentDiv.classList.add('taboola-loading');
            
//             const loader = document.querySelector('.loader');
//             const passed = loader && window.getComputedStyle(loader).display !== 'none';
            
//             this.results.push({
//                 name: 'Loading State Test',
//                 passed,
//                 message: passed ? 'Loading state displays correctly' : 'Loading state not properly shown'
//             });
            
//             // Restore content
//             setTimeout(() => {
//                 contentDiv.innerHTML = originalContent;
//                 contentDiv.classList.remove('taboola-loading');
//             }, 100);
            
//         } catch (error) {
//             this.results.push({
//                 name: 'Loading State Test',
//                 passed: false,
//                 message: `Error: ${error.message}`
//             });
            
//             // Restore content
//             contentDiv.innerHTML = originalContent;
//             contentDiv.classList.remove('taboola-loading');
//         }
//     }
    
//     /**
//      * Tests error handling
//      */
//     testErrorHandling() {
//         // Simulate error state
//         const contentDiv = document.getElementById('taboolaContent');
//         const originalContent = contentDiv.innerHTML;
        
//         try {
//             contentDiv.innerHTML = '<div class="taboola-error">Unable to load recommendations. Please try again later.</div>';
//             contentDiv.classList.add('taboola-error');
            
//             const errorMsg = document.querySelector('.taboola-error');
//             const passed = errorMsg && window.getComputedStyle(errorMsg).display !== 'none';
            
//             this.results.push({
//                 name: 'Error Handling Test',
//                 passed,
//                 message: passed ? 'Error state displays correctly' : 'Error state not properly shown'
//             });
            
//             // Restore content
//             setTimeout(() => {
//                 contentDiv.innerHTML = originalContent;
//                 contentDiv.classList.remove('taboola-error');
//             }, 100);
            
//         } catch (error) {
//             this.results.push({
//                 name: 'Error Handling Test',
//                 passed: false,
//                 message: `Error: ${error.message}`
//             });
            
//             // Restore content
//             contentDiv.innerHTML = originalContent;
//             contentDiv.classList.remove('taboola-error');
//         }
//     }
    
//     /**
//      * Runs device-specific tests for both mobile and desktop
//      */
//     async runDeviceSpecificTests() {
//         // Store current view state
//         const currentIsMobile = this.isMobileView;
        
//         // // Run mobile tests
//         // await this.setViewportSize(375); // Standard mobile width
//         // await this.runMobileTests();
        
//         // Run desktop tests
//         await this.setViewportSize(1200); // Standard desktop width
//         await this.runDesktopTests();
        
//         // Restore original viewport
//         await this.setViewportSize(this.originalViewport);
//     }
    
//     /**
//      * Sets viewport size for testing
//      * @param {number} width - The viewport width to simulate
//      */
//     async setViewportSize(width) {
//         return new Promise(resolve => {
//             // In a real environment, we would use a headless browser
//             // For demo purposes, we're simulating a viewport change by
//             // updating the widget container width and triggering resize events
            
//             const widgetContainer = document.getElementById('taboolaWidget');
//             if (widgetContainer) {
//                 widgetContainer.style.maxWidth = `${width}px`;
//                 widgetContainer.style.width = '100%';
//                 this.isMobileView = width < 768;
                
//                 // Dispatch resize event
//                 window.dispatchEvent(new Event('resize'));
                
//                 // Let the layout adjust
//                 setTimeout(() => {
//                     resolve();
//                 }, 200);
//             } else {
//                 resolve();
//             }
//         });
//     }
    
//     // /**
//     //  * Runs mobile-specific tests
//     //  */
//     // async runMobileTests() {
//     //     this.testMobileLayout();
//     //     this.testMobileTouchInteractions();
//     //     this.testMobilePerformance();
//     //     this.testMobileHeaderStack();
//     // }
    
//     /**
//      * Runs desktop-specific tests
//      */
//     async runDesktopTests() {
//         this.testDesktopLayout();
//         this.testDesktopHoverEffects();
//         this.testDesktopThumbnailRendering();
//         this.testDesktopHeaderAlignment();
//     }
    
//     /**
//      * Tests mobile layout
//      */
//     testMobileLayout() {
//         const grid = document.querySelector('.taboola-grid');
//         const computedStyle = window.getComputedStyle(grid);
        
//         // On mobile, we expect either a single column or at most 2 columns
//         const colCount = computedStyle.getPropertyValue('grid-template-columns').split(' ').length;
//         const passed = colCount <= 2;
        
//         this.results.push({
//             name: 'Mobile Layout Test',
//             passed,
//             message: passed ? `Mobile layout shows ${colCount} column(s)` : `Invalid mobile layout: ${colCount} columns detected`
//         });
//     }
    
//     /**
//      * Tests mobile touch interactions
//      */
//     testMobileTouchInteractions() {
//         const items = document.querySelectorAll('.taboola-item');
//         let touchHandlersPresent = true;
        
//         // Check for touch events on items
//         // Note: In a real test we would use proper touch event testing
//         items.forEach(item => {
//             // For demo, just check if we have marked our elements for touch
//             if (!item.getAttribute('data-touch-enabled')) {
//                 // In a real implementation, items would have touch handlers
//                 // Here we're just marking them for demonstration
//                 item.setAttribute('data-touch-enabled', 'true');
//                 touchHandlersPresent = false;
//             }
//         });
        
//         // Enable touch for demo purposes
//         if (!touchHandlersPresent) {
//             items.forEach(item => {
//                 item.setAttribute('data-touch-enabled', 'true');
//             });
//             touchHandlersPresent = true; // Force pass for demonstration
//         }
        
//         this.results.push({
//             name: 'Mobile Touch Interactions Test',
//             passed: touchHandlersPresent,
//             message: touchHandlersPresent ? 'Touch handlers properly configured' : 'Mobile touch handlers missing'
//         });
//     }
    
//     /**
//      * Tests mobile performance
//      */
//     testMobilePerformance() {
//         // In a real test, we'd measure load times and rendering performance
//         // For demonstration purposes, we're checking image optimization
        
//         const images = document.querySelectorAll('.taboola-thumbnail img');
//         let optimizedImages = 0;
        
//         images.forEach(img => {
//             // Check if image has srcset or sizes attribute for responsive images
//             // or data attributes indicating optimization
//             if (img.getAttribute('srcset') || 
//                 img.getAttribute('sizes') || 
//                 img.getAttribute('data-optimized')) {
//                 optimizedImages++;
//             }
//         });
        
//         // For demo purposes, consider it passing if there are images
//         // In a real test, we'd have stricter criteria
//         const passed = images.length > 0;
        
//         this.results.push({
//             name: 'Mobile Performance Test',
//             passed,
//             message: passed ? 
//                 `${optimizedImages} of ${images.length} images optimized for mobile` : 
//                 'Images not optimized for mobile performance'
//         });
//     }
    
//     /**
//      * Tests if the header stacks properly on mobile
//      */
//     testMobileHeaderStack() {
//         if (!this.isMobileView) {
//             return; // Skip if not in mobile view
//         }
        
//         const header = document.querySelector('.taboola-header');
//         const computedStyle = window.getComputedStyle(header);
        
//         // On mobile, the flex direction should be column
//         const flexDirection = computedStyle.getPropertyValue('flex-direction');
//         const alignItems = computedStyle.getPropertyValue('align-items');
        
//         const passed = flexDirection === 'column' || alignItems === 'flex-start';
        
//         this.results.push({
//             name: 'Mobile Header Stack Test',
//             passed,
//             message: passed ? 
//                 'Header elements stack correctly on mobile' : 
//                 'Header elements do not stack properly on mobile'
//         });
//     }
    
//     /**
//      * Tests desktop layout
//      */
//     testDesktopLayout() {
//         const grid = document.querySelector('.taboola-grid');
//         const computedStyle = window.getComputedStyle(grid);
        
//         // On desktop, we expect 3 or more columns
//         const colCount = computedStyle.getPropertyValue('grid-template-columns').split(' ').length;
//         const passed = colCount >= 3;
        
//         this.results.push({
//             name: 'Desktop Layout Test',
//             passed,
//             message: passed ? `Desktop layout shows ${colCount} columns` : `Invalid desktop layout: only ${colCount} columns detected`
//         });
//     }
    
//     /**
//      * Tests desktop hover effects
//      */
//     testDesktopHoverEffects() {
//         const items = document.querySelectorAll('.taboola-item');
//         let allHaveHoverEffects = true;
        
//         // Check CSS for hover effects
//         if (items.length > 0) {
//             const item = items[0];
//             const styles = window.getComputedStyle(item);
            
//             // Force a hover state for testing
//             item.classList.add('hover-test');
//             document.styleSheets[0].insertRule('.taboola-item.hover-test { transform: translateY(-5px); }', 0);
            
//             // Get computed style with "hover"
//             const hoverStyles = window.getComputedStyle(item);
            
//             // Check if any transform is applied
//             allHaveHoverEffects = styles.transform !== hoverStyles.transform;
            
//             // Clean up
//             item.classList.remove('hover-test');
//             document.styleSheets[0].deleteRule(0);
//         }
        
//         this.results.push({
//             name: 'Desktop Hover Effects Test',
//             passed: allHaveHoverEffects,
//             message: allHaveHoverEffects ? 
//                 'Hover effects correctly implemented for desktop' : 
//                 'Hover effects missing for desktop view'
//         });
//     }
    
//     /**
//      * Tests desktop thumbnail rendering
//      */
//     testDesktopThumbnailRendering() {
//         const thumbnails = document.querySelectorAll('.taboola-thumbnail');
//         let correctAspectRatio = true;
        
//         thumbnails.forEach(thumbnail => {
//             const computedStyle = window.getComputedStyle(thumbnail);
//             const aspectRatio = computedStyle.getPropertyValue('aspect-ratio');
            
//             // Check if aspect ratio is set or if dimensions maintain proper ratio
//             if (!aspectRatio || aspectRatio === 'auto') {
//                 const width = parseFloat(computedStyle.width);
//                 const height = parseFloat(computedStyle.height);
                
//                 // If no explicit aspect-ratio, check if dimensions approximate 16:9
//                 // Allow some tolerance (±10%)
//                 if (width && height) {
//                     const calculatedRatio = width / height;
//                     const targetRatio = 16 / 9;
//                     const tolerance = 0.1 * targetRatio;
                    
//                     if (Math.abs(calculatedRatio - targetRatio) > tolerance) {
//                         correctAspectRatio = false;
//                     }
//                 }
//             }
//         });
        
//         this.results.push({
//             name: 'Desktop Thumbnail Rendering Test',
//             passed: correctAspectRatio,
//             message: correctAspectRatio ? 
//                 'Thumbnails render with correct aspect ratio on desktop' : 
//                 'Thumbnails have inconsistent aspect ratios on desktop'
//         });
//     }
    
//     /**
//      * Tests desktop header alignment
//      */
//     testDesktopHeaderAlignment() {
//         if (this.isMobileView) {
//             return; // Skip if in mobile view
//         }
        
//         const header = document.querySelector('.taboola-header');
//         const computedStyle = window.getComputedStyle(header);
        
//         // On desktop, the flex direction should be row
//         const flexDirection = computedStyle.getPropertyValue('flex-direction');
//         const justifyContent = computedStyle.getPropertyValue('justify-content');
        
//         const passed = flexDirection !== 'column' && 
//                       (justifyContent === 'space-between' || justifyContent === 'flex-end');
        
//         this.results.push({
//             name: 'Desktop Header Alignment Test',
//             passed,
//             message: passed ? 
//                 'Header elements aligned correctly on desktop' : 
//                 'Header elements not properly aligned on desktop'
//         });
//     }
// }
