require("dotenv").config();

const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/chat", async (req, res) => {
    try {
        const { message, goal, progress } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "اكتب رسالة الأول."
            });
        }

        const prompt = `
أنت مساعد ذكي داخل موقع اسمه "خُطوة".

ساعد المستخدم بطريقة واضحة وعملية.
استخدم العربية المصرية بشكل طبيعي وودود.

هدف المستخدم:
${goal || "غير محدد"}

نسبة التقدم:
${progress ?? 0}%

رسالة المستخدم:
${message}

قدم إجابة مفيدة ومباشرة.
`;

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
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "Gemini API error:",
                JSON.stringify(data, null, 2)
            );

            return res.status(500).json({
                error: "حصلت مشكلة في الاتصال بالذكاء الاصطناعي."
            });
        }

        const answer =
            data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!answer) {
            return res.status(500).json({
                error: "Gemini لم يرجع ردًا."
            });
        }

        res.json({
            success: true,
            answer: answer
        });

    } catch (error) {

        console.error("Server error:", error);

        res.status(500).json({
            error: "حصل خطأ في السيرفر."
        });
    }
});

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "خُطوة + Gemini جاهزين 🔥"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `Khotwa Backend running on port ${PORT}`
    );
});
