export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { input, conversationHistory } = req.body || {};

        if (!input) {
            return res.status(400).json({ error: "Missing input" });
        }

        const API_KEY = process.env.GOOGLE_API_KEY;
        if (!API_KEY) {
            console.error("GOOGLE_API_KEY not set in Vercel environment");
            return res.status(500).json({ error: "API key not configured" });
        }

        const body = {
            contents: [
                {
                    parts: [
                        {
                            text: `You are the Enigma Club assistant at FET (Faculty of Engineering and Technology), Jain University. Answer concisely.\n\nPrevious conversation:\n${conversationHistory || ""}\n\nUser: ${input}\n\nRespond helpfully.`,
                        },
                    ],
                },
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            },
        };

        // Using gemini-2.5-flash per request
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const text = await response.text().catch(() => "");
            console.error(`Google API error (${response.status}):`, text);
            if (response.status === 429) {
                return res.status(429).json({ error: "Rate limit exceeded" });
            }
            try {
                const parsed = JSON.parse(text || "{}");
                return res.status(response.status).json({ error: parsed });
            } catch (e) {
                return res.status(response.status).json({ error: text });
            }
        }

        let data;
        try {
            data = await response.json();
        } catch (e) {
            console.error('Failed to parse JSON from Google API:', e);
            return res.status(500).json({ error: 'Invalid response from AI' });
        }

        // Extract assistant text from Google response (robust)
        let message = null;
        try {
            if (Array.isArray(data?.candidates) && data.candidates[0]) {
                const cand = data.candidates[0];
                message = cand?.content?.parts?.[0]?.text || cand?.content?.[0]?.text || cand?.output || cand?.content?.text;
            }
            message = message || data?.output || data?.text || data?.candidates?.[0]?.output || null;
        } catch (e) {
            console.error('Error extracting message from API response:', e);
            message = null;
        }

        if (!message) {
            console.error('Unexpected API response format:', JSON.stringify(data));
            return res.status(500).json({ error: 'Invalid response from AI' });
        }

        return res.status(200).json({ message });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: error.message || "Server error" });
    }
}