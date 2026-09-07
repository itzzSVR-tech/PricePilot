import FirecrawlApp from "@mendable/firecrawl-js";

// Handle both default import and named export for SDK compatibility
const FirecrawlClient = FirecrawlApp.default || FirecrawlApp;

const firecrawl = new FirecrawlClient({
    apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
    try {
        const schema = {
            type: "object",
            properties: {
                productName: { type: "string" },
                currentPrice: { type: "number" },
                currencyCode: { type: "string" },
                productImageUrl: { type: "string" },
            },
            required: ["productName", "currentPrice"],
        };

        const result = await firecrawl.scrape(url, {
            formats: [
                {
                    type: "json",
                    prompt: "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
                    schema,
                },
            ],
        });

        // Firecrawl v2 format result handling: result.json or result.extract or result.data?.json
        const extractedData =
            result.json ||
            result.extract ||
            result.data?.json ||
            result.data?.extract ||
            result;

        if (!extractedData || !extractedData.productName) {
            throw new Error("No data extracted from URL");
        }

        return extractedData;
    } catch (error) {
        console.error("Firecrawl scrape error:", error);
        throw new Error(`Failed to scrape product: ${error.message}`);
    }
}

