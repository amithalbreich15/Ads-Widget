/**
 * Extended test suite for the Recommendation Widget
 * Extends the basic WidgetTests class with additional tests
 */
class WidgetTestsExtended extends WidgetTests {
    constructor(widget, service) {
        super(widget, service);
        this.resultsContainer = document.getElementById('testResults');
        this.results = [];
    }

    /**
     * Runs the extended test suite
     */
    async runExtendedTests() {
        this.results = [];
        const testResultsContainer = document.getElementById('testResults');
        testResultsContainer.innerHTML = '<h3>Running Extended Tests...</h3>';
        
        // Run basic tests first (without displaying their results yet)
        await this.runBasicTests();
        
        // Run extended tests
        await this.testBrandingVisibility();
        await this.testImageLoading();
        await this.testPrivacyLink();
        await this.testResponsiveLayout();
        await this.testAdOriginLabels();
        await this.testNetworkPerformance();
        await this.testCrossOriginResources();
        await this.testContentAccessibility();
        
        // Display all results in the desired format
        this.displayResults('Extended Test Results:');
    }
    
    /**
     * Run basic tests but collect results instead of displaying them immediately
     */
    async runBasicTests() {
        // Execute tests from parent class but don't display results yet
        await this.testApiConnection();
        this.testRecommendationRendering();
        await this.testLayoutConsistency();
        this.testEventHandlers();
    }

    /**
     * Test that branding elements are properly displayed
     */
    async testBrandingVisibility() {
        try {
            const brandingElements = document.querySelectorAll('.taboola-branding');
            const allVisible = Array.from(brandingElements).every(el => 
                window.getComputedStyle(el).display !== 'none');
            
            this.addResult('Branding Visibility', allVisible, 
                allVisible ? 'All branding elements are visible' : 'Some branding elements are hidden');
            
            return allVisible;
        } catch (error) {
            this.addResult('Branding Visibility', false, `Error: ${error.message}`);
            return false;
        }
    }

    /**
     * Test that all images are loaded properly
     */
    async testImageLoading() {
        try {
            const images = document.querySelectorAll('.taboola-thumbnail img');
            let loadedCount = 0;
            
            for (const img of images) {
                if (img.complete && img.naturalHeight !== 0) {
                    loadedCount++;
                }
            }
            
            const result = loadedCount === images.length;
            this.addResult('Image Loading', result, 
                `${loadedCount}/${images.length} images loaded successfully`);
            
            return result;
        } catch (error) {
            this.addResult('Image Loading', false, `Error: ${error.message}`);
            return false;
        }
    }

    /**
     * Test privacy link functionality
     */
    async testPrivacyLink() {
        try {
            const privacyLink = document.querySelector('[data-testid="privacy-label"]');
            const hasCorrectHref = privacyLink && privacyLink.href.includes('microsoft.com/privacy');
            
            this.addResult('Privacy Link Configuration', hasCorrectHref, 
                hasCorrectHref ? 'Privacy link is properly configured' : 'Privacy link is missing or misconfigured');
            
            return hasCorrectHref;
        } catch (error) {
            this.addResult('Privacy Link Configuration', false, `Error: ${error.message}`);
            return false;
        }
    }

    /**
     * Test responsive layout behavior
     */
    async testResponsiveLayout() {
        try {
            const recommendationsGrid = document.querySelector('.taboola-grid');
            const currentDisplay = window.getComputedStyle(recommendationsGrid).display;
            
            const isGridOrFlex = currentDisplay === 'grid' || currentDisplay === 'flex';
            
            this.addResult('Responsive Layout', isGridOrFlex, 
                isGridOrFlex ? `Layout using ${currentDisplay} as expected` : `Unexpected layout: ${currentDisplay}`);
            
            // Additional check for proper item width based on device type
            const items = document.querySelectorAll('.taboola-item');
            const firstItemWidth = window.getComputedStyle(items[0]).width;
            const isCorrectWidth = config.deviceType === 'mobile' ? 
                parseInt(firstItemWidth) > 90 : // Mobile should use nearly full width
                parseInt(firstItemWidth) < 50;  // Desktop should have multiple columns
                
            this.addResult(`Item Width (${config.deviceType})`, isCorrectWidth, 
                `Item width is ${firstItemWidth}`);
            
            return isGridOrFlex && isCorrectWidth;
        } catch (error) {
            this.addResult('Responsive Layout', false, `Error: ${error.message}`);
            return false;
        }
    }

    /**
     * Test that sponsored content is properly labeled
     */
    async testAdOriginLabels() {
        try {
            const originLabels = document.querySelectorAll('.taboola-origin');
            const allHaveSponsored = Array.from(originLabels).every(el => 
                el.textContent.includes('Sponsored'));
            
            this.addResult('Ad Origin Labels', allHaveSponsored, 
                allHaveSponsored ? 'All ads properly labeled as sponsored' : 'Some ads missing sponsored label');
            
            return allHaveSponsored;
        } catch (error) {
            this.addResult('Ad Origin Labels', false, `Error: ${error.message}`);
            return false;
        }
    }
    
    /**
     * Test network performance of loading recommendations
     */
    async testNetworkPerformance() {
        try {
            // Use the Performance API to check resource loading times
            const resources = performance.getEntriesByType('resource');
            const imageResources = resources.filter(res => 
                res.name.includes('images.taboola.com'));
            
            if (imageResources.length === 0) {
                this.addResult('Network Performance', false, 'No Taboola image resources found');
                return false;
            }
            
            // Calculate average load time
            const totalLoadTime = imageResources.reduce((sum, res) => sum + res.duration, 0);
            const avgLoadTime = totalLoadTime / imageResources.length;
            
            // Consider test passed if average load time is under 2 seconds
            const isPassed = avgLoadTime < 2000;
            
            this.addResult('Network Performance', isPassed, 
                `Average image load time: ${avgLoadTime.toFixed(2)}ms (${imageResources.length} resources)`);
            
            return isPassed;
        } catch (error) {
            this.addResult('Network Performance', false, `Error: ${error.message}`);
            return false;
        }
    }
    
    /**
     * Test that all cross-origin resources are loaded correctly
     */
    async testCrossOriginResources() {
        try {
            const images = document.querySelectorAll('.taboola-thumbnail img');
            let failedResources = 0;
            
            // Check for any console errors related to cross-origin issues
            const originalConsoleError = console.error;
            let corsErrors = 0;
            
            // Temporarily override console.error to detect CORS errors
            console.error = function(msg) {
                if (typeof msg === 'string' && 
                    (msg.includes('CORS') || msg.includes('cross-origin'))) {
                    corsErrors++;
                }
                originalConsoleError.apply(console, arguments);
            };
            
            // Restore original console.error after a short delay
            setTimeout(() => {
                console.error = originalConsoleError;
            }, 500);
            
            // Check for any visible signs of failed image loads
            for (const img of images) {
                if (!img.complete || img.naturalHeight === 0) {
                    failedResources++;
                }
            }
            
            const result = failedResources === 0 && corsErrors === 0;
            
            this.addResult('Cross-Origin Resources', result, 
                result ? 'All cross-origin resources loaded correctly' : 
                `Issues detected: ${failedResources} failed resources, ${corsErrors} CORS errors`);
            
            return result;
        } catch (error) {
            this.addResult('Cross-Origin Resources', false, `Error: ${error.message}`);
            return false;
        }
    }
    
    /**
     * Test content accessibility features
     */
    async testContentAccessibility() {
        try {
            const images = document.querySelectorAll('.taboola-thumbnail img');
            let missingAlt = 0;
            
            // Check for alt text on all images
            for (const img of images) {
                if (!img.alt || img.alt.trim() === '') {
                    missingAlt++;
                }
            }
            
            // Check for proper contrast in text elements
            const textElements = document.querySelectorAll('.taboola-caption, .taboola-branding');
            let lowContrastCount = 0;
            
            textElements.forEach(el => {
                const bgColor = window.getComputedStyle(el.parentElement).backgroundColor;
                const textColor = window.getComputedStyle(el).color;
                
                // Simple contrast check (not fully WCAG compliant but indicative)
                if ((bgColor.includes('255, 255, 255') && textColor.includes('200, 200, 200')) || 
                    (bgColor.includes('0, 0, 0') && textColor.includes('50, 50, 50'))) {
                    lowContrastCount++;
                }
            });
            
            const result = missingAlt === 0 && lowContrastCount === 0;
            
            this.addResult('Content Accessibility', result, 
                result ? 'All content meets basic accessibility standards' : 
                `Issues detected: ${missingAlt} images missing alt text, ${lowContrastCount} elements with potential contrast issues`);
            
            return result;
        } catch (error) {
            this.addResult('Content Accessibility', false, `Error: ${error.message}`);
            return false;
        }
    }
    
    /**
     * Test layout consistency across recommendations
     */
    async testLayoutConsistency() {
        try {
            const items = document.querySelectorAll('.taboola-item');
            const heights = [];
            
            // Collect heights of all items
            items.forEach(item => {
                heights.push(item.clientHeight);
            });
            
            // Check if all heights are within 20% of the average
            const avgHeight = heights.reduce((sum, h) => sum + h, 0) / heights.length;
            const allConsistent = heights.every(h => 
                Math.abs(h - avgHeight) <= (avgHeight * 0.2));
            
            this.addResult('Layout Consistency', allConsistent, 
                allConsistent ? 'All recommendations have consistent layout' : 
                'Inconsistent recommendation sizes detected');
            
            return allConsistent;
        } catch (error) {
            this.addResult('Layout Consistency', false, `Error: ${error.message}`);
            return false;
        }
    }

    /**
     * Add a test result to the results array
     */
    addResult(name, passed, message = '') {
        this.results.push({
            name,
            passed,
            message
        });
        
        // Also log to console for debugging
        console.log(`${passed ? '✓' : '✗'} ${name}: ${message}`);
    }
    
    /**
     * Display all test results with the desired format
     */
    displayResults(headerText) {
        let html = `<h3>${headerText}</h3><ul>`;
        
        this.results.forEach(result => {
            html += `<li style="color: ${result.passed ? 'green' : 'red'}; margin-bottom: 10px;">
                <strong>${result.name}:</strong> ${result.passed ? 'PASSED' : 'FAILED'} 
                ${result.message ? `<br><span style="color: #333; font-size: 14px;">${result.message}</span>` : ''}
            </li>`;
        });
        
        html += '</ul>';
        
        this.resultsContainer.innerHTML = html;
    }
    
    /**
     * Override the original runTests method to use the new format
     */
    async runTests() {
        this.results = [];
        this.resultsContainer.innerHTML = '<h3>Running Basic Tests...</h3>';
        
        // Run all tests
        await this.testApiConnection();
        this.testRecommendationRendering();
        await this.testLayoutConsistency();
        this.testEventHandlers();
        
        // Display results
        this.displayResults('Basic Test Results:');
    }
}