require("dotenv").config();

async function askGemini(question) {
    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=" +
        encodeURIComponent(process.env.GEMINI_API_KEY),
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: question
                            }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.log("Gemini error:");
        console.log(JSON.stringify(data, null, 2));
        return;
    }

    const answer =
        data.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("\n🤖 رفيق:");
    console.log(answer || "مفيش رد من Gemini.");
}

askGemini("اكتبلي جملة تشجع شخص يبدأ هدف جديد.");
