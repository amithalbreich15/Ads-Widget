/**
 * OrganicRecommendationTests.js
 * Specialized test suite for organic recommendations
 */
class OrganicRecommendationTests {
    constructor(widget, service) {
        this.widget = widget;
        this.service = service;
        this.results = [];
        this.originalFetch = window.fetch;
        this.resultsContainer = document.getElementById('testResults');
    }
    
    /**
     * Creates mock data with organic and sponsored recommendations
     * @returns {Object} Mock API response with organic and sponsored items
     */
    createMockTaboolaData() {
        // Create mock response ID that matches Taboola format
        const responseId = "_1573fb36d694201d340f1381310c9eac65991d22e203f99802df4a38bb2fa3e4~V15923758711534103511PwN1EOKxggKFBWXnDS2hBKP9W9b5SOUSJ5w2VOcNB3R_IyVF-PUMhnzhEnt6YC709ch5D-rQaOj4yk9c-8GzA93dMQi63Jan54enSgBywwhpKDv3mGwJ4J16jNvceTQd0Hsvo8A8-cMJaEI98_kehq4iCsKsZ0JV1fZ1zxVlfpT3Mw4gT-xZv9WbB44cwmhwjpE6wwaQwVKhWy50dN4itA";
        
        // Create 4 mock organic recommendations with actual Taboola links
        const organicItems = [
            {
                id: "organic-taboola-1",
                type: "video",
                url: "https://discover.taboola.com/wp-content/uploads/2025/02/vdo-Realize_Ads-For_HP-x1-v01.webm",
                title: "Best Display Ads of 2024: What Worked, and Why",
                description: "Learn about content discovery and how it helps publishers and advertisers",
                thumbnail: [
                    {
                        url: "https://www.taboola.com//wp-content/uploads/2025/02/taboola-realize-main-image-1024x538.png",
                        width: "800",
                        height: "450"
                    }
                ],
                name: "Taboola Realize: The Best Display Ads of 2024",
                branding: "Taboola - Realize",
                origin: "organic",
                category: "video",
                created: "Wed, 12 Mar 2025 10:30:00 UTC",
                views: "3452"
            },
            {
                id: "organic-taboola-2",
                type: "video",
                url: "https://www.youtube.com/watch?v=X1YFIUeEUFw",
                title: "10 Best Native Advertising Examples",
                description: "Explore top native advertising examples from leading brands",
                thumbnail: [
                    {
                        url: "https://dmexco.com/wp-content/uploads/2020/04/Taboola.jpg",
                        width: "800",
                        height: "450"
                    }
                ],
                name: "🚀 Unlock Measurable Outcomes with Realize | The Performance Platform for Advertisers",
                branding: "Taboola - Realize",
                origin: "organic",
                category: "Article - Marketing",
                created: "Wed, 12 Mar 2025 11:15:00 UTC",
                views: "2891"
            },
            {
                id: "organic-taboola-3",
                type: "video",
                url: "https://vimeo.com/353392241",
                title: "Taboola Insights: Understanding User Behavior",
                description: "Data-driven research on user engagement and content discovery",
                thumbnail: [
                    {
                        url: "https://miro.medium.com/v2/resize:fit:700/1*yuH4mLbzA6m6QY5asuMWPg.png",
                        width: "800",
                        height: "450"
                    }
                ],
                name: "How to Create an AI Marketing Strategy in 7 Simple Steps",
                branding: "Intel AI - 'Taboola'",
                origin: "organic",
                category: "Article - Marketing",
                created: "Wed, 12 Mar 2025 09:45:00 UTC",
                views: "1876"
            },
            {
                id: "organic-taboola-4",
                url: "https://www.taboola.com/engineering/real-traffic-ci/",
                title: "Video Advertising Trends for 2025",
                description: "Latest video trends and best practices for advertisers",
                thumbnail: [
                    {
                        url: "https://www.taboola.com/wp-content/uploads-neo/2025/03/shutterstock_2207265505-scaled.jpg",
                        width: "800",
                        height: "450"
                    }
                ],
                name: "A Key Component in Taboola CI/CD Pipelines for Achieving High Production Stability",
                branding: "Taboola Engineering",
                origin: "organic",
                category: "Article - Engineering",
                created: "Wed, 12 Mar 2025 13:20:00 UTC",
                views: "4231"
            },
            {
                id: "organic-taboola-5",
                type: "video",
                url: "https://vimeo.com/145317757?embedded=true&source=vimeo_logo&owner=9220477",
                title: "Taboola Insights: Understanding User Behavior",
                description: "Data-driven research on user engagement and content discovery",
                thumbnail: [
                    {
                        url: "https://res.cloudinary.com/hevo/images/c_scale,w_329,h_153/f_webp,q_auto:best/v1686028144/hevo-learn-1/Taboola-Logo-2/Taboola-Logo-2.png?_i=AA",
                        width: "800",
                        height: "450"
                    }
                ],
                name: "How to Create an AI Marketing Strategy in 7 Simple Steps",
                branding: "Taboola - Content You May Like.",
                origin: "organic",
                category: "Video - Taboola Insights",
                created: "Wed, 12 Mar 2025 09:45:00 UTC",
                views: "1876"
            },
            {
                id: "organic-taboola-6",
                type: "image",
                url: "https://www.taboola.com/engineering/how-taboola-powers-the-conversion-data-pipe/",
                title: "Taboola Insights: Understanding User Behavior",
                description: "Data-driven research on user engagement and content discovery",
                thumbnail: [
                    {
                        url: "https://www.taboola.com/wp-content/uploads-neo/2024/11/shutterstock_613464041-scaled-1.jpg",
                        width: "800",
                        height: "450"
                    }
                ],
                name: "How Taboola Powers the Conversion Data Pipe",
                branding: "Taboola Engineering - Big Data",
                origin: "organic",
                category: "Article - Engineering",
                created: "Wed, 12 Mar 2025 09:45:00 UTC",
                views: "1876"
            },
            {
                id: "organic-taboola-7",
                type: "image",
                url: "https://www.taboola.com/engineering/deep-multi-task-learning-3-lessons-learned/",
                title: "For the past year, my team and I have been working on a personalized user experience in the Taboola feed. We used Multi-Task Learning (MTL)",
                description: "Data-driven research on user engagement and content discovery",
                thumbnail: [
                    {
                        url: "https://www.taboola.com/wp-content/uploads-neo/2024/12/mtl_robot.jpeg",
                        width: "800",
                        height: "450"
                    }
                ],
                name: "Deep Multi-Task Learning – 3 Lessons Learned",
                branding: "Taboola Engineering - Machine Learning",
                origin: "organic",
                category: "Article - Engineering",
                created: "Wed, 12 Mar 2025 09:45:00 UTC",
                views: "1876"
            },
            {
                id: "organic-taboola-8",
                type: "image",
                url: "https://www.taboola.com/engineering/we-have-only-just-begun/",
                title: "We Have Only Just Begun: A Message from Our SVP of Research & Development",
                description: "Data-driven research on user engagement and content discovery",
                thumbnail: [
                    {
                        url: "https://www.taboola.com/wp-content/uploads-neo/2024/12/Untitled.jpeg",
                        width: "800",
                        height: "450"
                    }
                ],
                name: "We Have Only Just Begun: A Message from Our SVP of Research & Development",
                branding: "Taboola Engineering - Culture",
                origin: "organic",
                category: "Article - Culture",
                created: "Wed, 12 Mar 2025 09:45:00 UTC",
                views: "1876"
            }
        ];
        
        // Create 4 mock sponsored recommendations with actual Taboola links
        const sponsoredItems = [
            {
                id: "sponsored-taboola-1",
                url: "https://www.taboola.com/engineering/sdk-testing-with-hot-swapper/",
                title: "SDK testing with hot swapper",
                description: "Drive conversions with native advertising that works",
                thumbnail: [
                    {
                        url: "https://www.taboola.com/wp-content/uploads-neo/2024/11/Screen-Shot-2019-08-01-at-5.34.46-PM.png",
                        width: "800",
                        height: "450"
                    }
                ],
                name: "SDK testing with hot swapper",
                branding: "Taboola Engineering - Tips & Tricks",
                origin: "sponsored",
                category: "Article - Advertising",
                created: "Wed, 12 Mar 2025 08:00:00 UTC",
                views: "5678"
            },
            {
                id: "sponsored-taboola-2",
                url: "https://www.taboola.com/engineering/tis-season-fun-decision-trees/",
                title: "Boost Your Site Revenue with Taboola",
                description: "Leading publishers trust Taboola for monetization",
                thumbnail: [
                    {
                        url: "https://www.taboola.com/wp-content/uploads-neo/2024/11/tree2.jpeg",
                        width: "800",
                        height: "450"
                    }
                ],
                name: "‘Tis the Season: Fun with (Decision) Trees",
                branding: "Taboola Engineering - Data Science",
                origin: "sponsored",
                category: "Article",
                created: "Wed, 12 Mar 2025 14:30:00 UTC",
                views: "3987"
            },
            {
                id: "sponsored-taboola-3",
                url: "https://www.taboola.com/engineering/android-working-on-a-multiple-library-project/",
                title: "Android Working On A Multiple Library Project",
                description: "Captivate audiences with premium video content",
                thumbnail: [
                    {
                        url: "https://www.taboola.com/wp-content/uploads-neo/2024/11/GettyImages-159754393-scaled-1.jpg",
                        width: "800",
                        height: "450"
                    }
                ],
                name: "Android Working On A Multiple Library Project",
                branding: "Taboola Engineering - System",
                origin: "sponsored",
                category: "Article",
                created: "Wed, 12 Mar 2025 12:15:00 UTC",
                views: "2543"
            },
            {
                id: "sponsored-taboola-4",
                url: "https://www.taboola.com/engineering/utilizing-llms-for-localized-recommendations/",
                title: "Utilizing LLMs for Localized Recommendations",
                description: "o you ever go to a local boutique brewery and buy a Carlsberg? Drive to your local farmer to buy Walmart packaged tomatoes? Of course not. You want to get a local experience, beer that is brewed from your neighboring produce. News is no different. When browsing your hometown’s news site, you hope to find uniquely related articles.",
                thumbnail: [
                    {
                        url: "https://www.taboola.com/wp-content/uploads-neo/2024/11/image2.png",
                        width: "800",
                        height: "450"
                    }
                ],
                name: "Utilizing LLMs for Localized Recommendations",
                branding: "Taboola Engineering - Machine Learning",
                origin: "sponsored",
                category: "Marketing",
                created: "Wed, 12 Mar 2025 15:45:00 UTC",
                views: "3124"
            }
        ];
        
        return {
            id: responseId,
            list: [...organicItems, ...sponsoredItems]
        };
    }
    
    /**
     * Mock the Taboola API with actual content
     */
    mockTaboolaAPI() {
        const mockData = this.createMockTaboolaData();
        return mockData;
        return {
            ok: true,
            json: async () => mockData
        };
        
        // Mock the fetch function
        window.fetch = async (url) => {
            console.log(`Mocked API call to: ${url}`);
            return {
                ok: true,
                json: async () => mockData
            };
        };
        
        return mockData;
    }
    
    /**
     * Restore original fetch function and widget state
     */
    async cleanup() {
        // Restore original fetch
        window.fetch = this.originalFetch;
        
        // Restore original recommendations
        await this.widget.initialize();
    }
    
    /**
     * Add a test result
     * @param {string} name - Test name
     * @param {boolean} passed - Test result
     * @param {string} message - Test message
     */
    addResult(name, passed, message) {
        this.results.push({
            name,
            passed,
            message
        });
        
        // Log the result to console
        console.log(`Test: ${name} - ${passed ? 'PASSED' : 'FAILED'}`);
        console.log(`  ${message}`);
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
        
        // Check if the results container exists
        if (this.resultsContainer) {
            this.resultsContainer.innerHTML = html;
        } else {
            console.warn('Results container not found, unable to display results on page');
            console.log(html);
        }
    }
    
    /**
     * Run all recommendation tests
     */
    async runOrganicTests() {
        console.log("Running Taboola Recommendation Tests...");
        this.results = [];
        
        try {
            await this.testOrganicRendering();
            await this.testOrganicBranding();
            await this.testOrganicTarget();
            await this.testOrganicClickBehavior();
            await this.testSponsoredRendering();
            await this.testSponsoredBranding();
            await this.testSponsoredTarget();
            await this.testSponsoredClickBehavior();
            
            // Display overall results
            const passedCount = this.results.filter(r => r.passed).length;
            console.log(`Tests Complete: ${passedCount}/${this.results.length} tests passed`);
            
            // Display results using the new method
            this.displayResults(`Taboola Recommendation Tests: ${passedCount}/${this.results.length} tests passed`);
        } catch (error) {
            console.error("Error running tests:", error);
            this.displayResults("Taboola Recommendation Tests (Error Occurred)");
        } finally {
            await this.cleanup();
        }
    }
    
    /**
     * Test that organic recommendations render correctly
     */
    async testOrganicRendering() {
        try {
            const mockData = this.mockTaboolaAPI();
            
            // Clear existing recommendations
            const container = document.getElementById(this.widget.containerId);
            if (container) {
                container.innerHTML = '';
            }
            
            // Re-initialize the widget with mock data
            await this.widget.initialize();
            
            // Filter only organic items from mock data
            const mockOrganicItems = mockData.list.filter(item => item.origin === "organic");
            
            // Check that all organic items are rendered
            const items = document.querySelectorAll('.taboola-item');
            const organicItems = Array.from(items).filter(item => 
                mockOrganicItems.some(mockItem => mockItem.id === item.getAttribute('data-id')));
            
            const allItemsRendered = organicItems.length === mockOrganicItems.length;
            const allTitlesCorrect = organicItems.every(item => {
                const itemId = item.getAttribute('data-id');
                const mockItem = mockOrganicItems.find(mi => mi.id === itemId);
                const titleElement = item.querySelector('.taboola-caption');
                return titleElement && titleElement.textContent === mockItem.title;
            });
            
            const passed = allItemsRendered && allTitlesCorrect;
            
            this.addResult('Organic Rendering', passed,
                passed 
                    ? `All ${mockOrganicItems.length} organic recommendations rendered correctly` 
                    : `Organic rendering test failed: ${!allItemsRendered 
                        ? `Only ${organicItems.length} of ${mockOrganicItems.length} items rendered` 
                        : 'Some titles do not match'}`
            );
            
            return passed;
        } catch (error) {
            this.addResult('Organic Rendering', false,
                `Error testing organic rendering: ${error.message}`
            );
            return false;
        }
    }
    
    /**
     * Test that organic recommendations have correct branding
     */
    async testOrganicBranding() {
        try {
            const mockData = this.mockTaboolaAPI();
            await this.widget.initialize();
            
            // Filter only organic items
            const mockOrganicItems = mockData.list.filter(item => item.origin === "organic");
            
            const items = document.querySelectorAll('.taboola-item');
            const organicItems = Array.from(items).filter(item => 
                mockOrganicItems.some(mockItem => mockItem.id === item.getAttribute('data-id')));
            
            const allBrandingCorrect = organicItems.every(item => {
                const itemId = item.getAttribute('data-id');
                const mockItem = mockOrganicItems.find(mi => mi.id === itemId);
                const brandingElement = item.querySelector('.taboola-branding');
                const originElement = item.querySelector('.taboola-origin');
                
                return brandingElement && 
                       brandingElement.textContent.includes(mockItem.branding) &&
                       originElement && 
                       originElement.textContent.includes('Organic');
            });
            
            this.addResult('Organic Branding', allBrandingCorrect,
                allBrandingCorrect 
                    ? 'All organic recommendations have correct branding and "Organic" label' 
                    : 'Some organic recommendations have incorrect branding or missing "Organic" label'
            );
            
            return allBrandingCorrect;
        } catch (error) {
            this.addResult('Organic Branding', false,
                `Error testing organic branding: ${error.message}`
            );
            return false;
        }
    }
    
    /**
     * Test that organic recommendations have _self target
     */
    async testOrganicTarget() {
        try {
            const mockData = this.mockTaboolaAPI();
            await this.widget.initialize();
            
            // Filter only organic items
            const mockOrganicItems = mockData.list.filter(item => item.origin === "organic");
            
            const items = document.querySelectorAll('.taboola-item');
            const organicItems = Array.from(items).filter(item => 
                mockOrganicItems.some(mockItem => mockItem.id === item.getAttribute('data-id')));
            
            const allTargetsCorrect = organicItems.every(item => {
                const anchor = item.closest('a');
                return (anchor && anchor.getAttribute('target') === '_self') || 
                       item.getAttribute('data-target') === '_self';
            });
            
            this.addResult('Organic Target', allTargetsCorrect,
                allTargetsCorrect 
                    ? 'All organic recommendations have correct _self target' 
                    : 'Some organic recommendations have incorrect target attribute'
            );
            
            return allTargetsCorrect;
        } catch (error) {
            this.addResult('Organic Target', false,
                `Error testing organic target: ${error.message}`
            );
            return false;
        }
    }
    
    /**
     * Test that organic recommendations have correct click behavior
     */
    async testOrganicClickBehavior() {
        try {
            const mockData = this.mockTaboolaAPI();
            await this.widget.initialize();
            
            // Mock window.open and location.href
            const originalOpen = window.open;
            const originalHref = window.location.href;
            let navigationMethod = null;
            let clickedUrl = null;
            let clickedTarget = null;
            
            // Mock window.open for new tab navigation
            window.open = (url, target) => {
                navigationMethod = 'window.open';
                clickedUrl = url;
                clickedTarget = target;
                return { closed: false };
            };
            
            // Mock location.href for same tab navigation
            Object.defineProperty(window.location, 'href', {
                writable: true,
                value: originalHref
            });
            
            // Override location.href setter
            const hrefDescriptor = Object.getOwnPropertyDescriptor(window.location, 'href');
            Object.defineProperty(window.location, 'href', {
                set: function(url) {
                    navigationMethod = 'location.href';
                    clickedUrl = url;
                    hrefDescriptor.set.call(this, originalHref); // Don't actually navigate
                }
            });
            
            // Filter only organic items
            const mockOrganicItems = mockData.list.filter(item => item.origin === "organic");
            
            // Get first organic item
            const items = document.querySelectorAll('.taboola-item');
            const organicItem = Array.from(items).find(item => 
                mockOrganicItems.some(mockItem => mockItem.id === item.getAttribute('data-id')));
            
            if (!organicItem) {
                this.addResult('Organic Click Behavior', false,
                    'No organic items found to test click behavior'
                );
                window.open = originalOpen;
                Object.defineProperty(window.location, 'href', hrefDescriptor);
                return false;
            }
            
            // Get expected URL for this item
            const itemId = organicItem.getAttribute('data-id');
            const mockItem = mockOrganicItems.find(mi => mi.id === itemId);
            
            // Trigger click
            organicItem.click();
            
            // Check results - organic should use same tab (location.href or target=_self)
            const correctNavigation = navigationMethod === 'location.href' || clickedTarget === '_self';
            const urlCorrect = clickedUrl === mockItem.url;
            const passed = correctNavigation && urlCorrect;
            
            this.addResult('Organic Click Behavior', passed,
                passed 
                    ? 'Organic recommendation click handled correctly with same tab navigation' 
                    : `Organic click test failed: ${!correctNavigation ? 'Wrong navigation method' : 'Wrong URL'}`
            );
            
            // Restore original behaviors
            window.open = originalOpen;
            Object.defineProperty(window.location, 'href', hrefDescriptor);
            
            return passed;
        } catch (error) {
            this.addResult('Organic Click Behavior', false,
                `Error testing organic click behavior: ${error.message}`
            );
            
            // Restore original window.open and location.href
            window.open = originalOpen || window.open;
            
            return false;
        }
    }
    
    /**
     * Test that sponsored recommendations render correctly
     */
    async testSponsoredRendering() {
        try {
            const mockData = this.mockTaboolaAPI();
            
            // Re-initialize the widget with mock data if needed
            if (!document.querySelector('.taboola-item')) {
                await this.widget.initialize();
            }
            
            // Filter only sponsored items from mock data
            const mockSponsoredItems = mockData.list.filter(item => item.origin === "sponsored");
            
            // Check that all sponsored items are rendered
            const items = document.querySelectorAll('.taboola-item');
            const sponsoredItems = Array.from(items).filter(item => 
                mockSponsoredItems.some(mockItem => mockItem.id === item.getAttribute('data-id')));
            
            const allItemsRendered = sponsoredItems.length === mockSponsoredItems.length;
            const allTitlesCorrect = sponsoredItems.every(item => {
                const itemId = item.getAttribute('data-id');
                const mockItem = mockSponsoredItems.find(mi => mi.id === itemId);
                const titleElement = item.querySelector('.taboola-caption');
                return titleElement && titleElement.textContent === mockItem.title;
            });
            
            const passed = allItemsRendered && allTitlesCorrect;
            
            this.addResult('Sponsored Rendering', passed,
                passed 
                    ? `All ${mockSponsoredItems.length} sponsored recommendations rendered correctly` 
                    : `Sponsored rendering test failed: ${!allItemsRendered 
                        ? `Only ${sponsoredItems.length} of ${mockSponsoredItems.length} items rendered` 
                        : 'Some titles do not match'}`
            );
            
            return passed;
        } catch (error) {
            this.addResult('Sponsored Rendering', false,
                `Error testing sponsored rendering: ${error.message}`
            );
            return false;
        }
    }
    
    /**
     * Test that sponsored recommendations have correct branding and advertiser label
     */
    async testSponsoredBranding() {
        try {
            const mockData = this.mockTaboolaAPI();
            
            // Re-initialize the widget if needed
            if (!document.querySelector('.taboola-item')) {
                await this.widget.initialize();
            }
            
            // Filter only sponsored items
            const mockSponsoredItems = mockData.list.filter(item => item.origin === "sponsored");
            
            const items = document.querySelectorAll('.taboola-item');
            const sponsoredItems = Array.from(items).filter(item => 
                mockSponsoredItems.some(mockItem => mockItem.id === item.getAttribute('data-id')));
            
            const allBrandingCorrect = sponsoredItems.every(item => {
                const itemId = item.getAttribute('data-id');
                const mockItem = mockSponsoredItems.find(mi => mi.id === itemId);
                const brandingElement = item.querySelector('.taboola-branding');
                const sponsoredElement = item.querySelector('.taboola-sponsored') || 
                                      item.querySelector('.taboola-origin');
                
                return brandingElement && 
                       brandingElement.textContent.includes(mockItem.branding) &&
                       sponsoredElement && 
                       (sponsoredElement.textContent.includes('Sponsored') || 
                        sponsoredElement.textContent.includes('Ad'));
            });
            
            this.addResult('Sponsored Branding', allBrandingCorrect,
                allBrandingCorrect 
                    ? 'All sponsored recommendations have correct advertiser name and "Sponsored" label' 
                    : 'Some sponsored recommendations have incorrect branding or missing "Sponsored" label'
            );
            
            return allBrandingCorrect;
        } catch (error) {
            this.addResult('Sponsored Branding', false,
                `Error testing sponsored branding: ${error.message}`
            );
            return false;
        }
    }
    
    /**
     * Test that sponsored recommendations have _blank target
     */
    async testSponsoredTarget() {
        try {
            const mockData = this.mockTaboolaAPI();
            
            // Re-initialize the widget if needed
            if (!document.querySelector('.taboola-item')) {
                await this.widget.initialize();
            }
            
            // Filter only sponsored items
            const mockSponsoredItems = mockData.list.filter(item => item.origin === "sponsored");
            
            const items = document.querySelectorAll('.taboola-item');
            const sponsoredItems = Array.from(items).filter(item => 
                mockSponsoredItems.some(mockItem => mockItem.id === item.getAttribute('data-id')));
            
            const allTargetsCorrect = sponsoredItems.every(item => {
                const anchor = item.closest('a');
                return (anchor && anchor.getAttribute('target') === '_blank') || 
                       item.getAttribute('data-target') === '_blank';
            });
            
            this.addResult('Sponsored Target', allTargetsCorrect,
                allTargetsCorrect 
                    ? 'All sponsored recommendations have correct _blank target' 
                    : 'Some sponsored recommendations have incorrect target attribute'
            );
            
            return allTargetsCorrect;
        } catch (error) {
            this.addResult('Sponsored Target', false,
                `Error testing sponsored target: ${error.message}`
            );
            return false;
        }
    }
    
    /**
     * Test that sponsored recommendations have correct click behavior (open in new tab)
     */
    async testSponsoredClickBehavior() {
        try {
            const mockData = this.mockTaboolaAPI();
            
            // Re-initialize the widget if needed
            if (!document.querySelector('.taboola-item')) {
                await this.widget.initialize();
            }
            
            // Mock window.open
            const originalOpen = window.open;
            let clickedUrl = null;
            let clickedTarget = null;
            
            window.open = (url, target) => {
                clickedUrl = url;
                clickedTarget = target;
                return { closed: false };
            };
            
            // Filter only sponsored items
            const mockSponsoredItems = mockData.list.filter(item => item.origin === "sponsored");
            
            // Get first sponsored item
            const items = document.querySelectorAll('.taboola-item');
            const sponsoredItem = Array.from(items).find(item => 
                mockSponsoredItems.some(mockItem => mockItem.id === item.getAttribute('data-id')));
            
            if (!sponsoredItem) {
                this.addResult('Sponsored Click Behavior', false,
                    'No sponsored items found to test click behavior'
                );
                window.open = originalOpen;
                return false;
            }
            
            // Get expected URL for this item
            const itemId = sponsoredItem.getAttribute('data-id');
            const mockItem = mockSponsoredItems.find(mi => mi.id === itemId);
            
            // Trigger click
            sponsoredItem.click();
            
            // Check results - sponsored should use new tab
            const targetCorrect = clickedTarget === '_blank';
            const urlCorrect = clickedUrl === mockItem.url;
            const passed = targetCorrect && urlCorrect;
            
            this.addResult('Sponsored Click Behavior', passed,
                passed 
                    ? 'Sponsored recommendation click handled correctly with new tab (_blank) target' 
                    : `Sponsored click test failed: ${!targetCorrect ? 'Wrong target' : 'Wrong URL'}`
            );
            
            // Restore window.open
            window.open = originalOpen;
            
            return passed;
        } catch (error) {
            this.addResult('Sponsored Click Behavior', false,
                `Error testing sponsored click behavior: ${error.message}`
            );
            
            // Restore window.open in case of error
            window.open = originalOpen || window.open;
            
            return false;
        }
    }
}