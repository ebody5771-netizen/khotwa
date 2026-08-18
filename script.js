const screens = {
    home: document.getElementById("homeScreen"),
    goal: document.getElementById("goalScreen"),
    welcome: document.getElementById("welcomeScreen"),
    step: document.getElementById("stepScreen"),
    success: document.getElementById("successScreen"),
    journey: document.getElementById("journeyScreen"),
    companion: document.getElementById("companionScreen")
};

const startButton =
    document.getElementById("startButton");

const journeyButton =
    document.getElementById("journeyButton");

const companionHomeButton =
    document.getElementById("companionHomeButton");

const createGoalButton =
    document.getElementById("createGoalButton");

const startJourneyButton =
    document.getElementById("startJourneyButton");

const completeButton =
    document.getElementById("completeButton");

const continueButton =
    document.getElementById("continueButton");

const successJourneyButton =
    document.getElementById("successJourneyButton");

const journeyStartButton =
    document.getElementById("journeyStartButton");

const companionJourneyButton =
    document.getElementById("companionJourneyButton");

const goalInput =
    document.getElementById("goalInput");

const timeInput =
    document.getElementById("timeInput");

const welcomeGoal =
    document.getElementById("welcomeGoal");

const welcomeTime =
    document.getElementById("welcomeTime");

const journeyGoal =
    document.getElementById("journeyGoal");

const journeyPercent =
    document.getElementById("journeyPercent");

const journeyCount =
    document.getElementById("journeyCount");

const journeyProgressFill =
    document.getElementById("journeyProgressFill");

const successProgress =
    document.getElementById("successProgress");

const successProgressFill =
    document.getElementById("successProgressFill");

const stepCounter =
    document.getElementById("stepCounter");

const stepTitle =
    document.getElementById("stepTitle");

const stepDescription =
    document.getElementById("stepDescription");

const stepTip =
    document.getElementById("stepTip");

const stepsList =
    document.getElementById("stepsList");

const chatMessages =
    document.getElementById("chatMessages");

const chatInput =
    document.getElementById("chatInput");

const sendButton =
    document.getElementById("sendButton");


// =====================================
// خطوات الرحلة
// =====================================

const steps = [

    {
        title: "حدد البداية",
        description:
            "اكتب ليه الهدف ده مهم بالنسبة لك.",
        tip:
            "خلي إجابتك بسيطة ومباشرة."
    },

    {
        title: "خصص وقت صغير",
        description:
            "اختار وقت ثابت كل يوم تقدر تلتزم بيه.",
        tip:
            "الاستمرار أهم من عدد الساعات."
    },

    {
        title: "ابدأ بأبسط حاجة",
        description:
            "اختار مصدر واحد وابدأ أول جزء منه.",
        tip:
            "متستناش الخطة المثالية."
    },

    {
        title: "طبق بإيدك",
        description:
            "حول اللي اتعلمته إلى تجربة صغيرة.",
        tip:
            "التطبيق بيثبت المعلومة."
    },

    {
        title: "راجع اللي عملته",
        description:
            "شوف إيه اللي أنجزته وإيه اللي محتاج يتحسن.",
        tip:
            "الغلط جزء طبيعي من التعلم."
    },

    {
        title: "زود التحدي",
        description:
            "ارفع مستوى المهمة تدريجيًا.",
        tip:
            "كبر الخطوات واحدة واحدة."
    },

    {
        title: "ثبت العادة",
        description:
            "حدد طريقة تستمر بيها بعد أول أسبوع.",
        tip:
            "المهم تبدأ وتكمل."
    }

];


// =====================================
// بيانات المستخدم
// =====================================

let goal =
    localStorage.getItem("khotwaGoal") || "";

let dailyTime =
    localStorage.getItem("khotwaTime") || "30";

let currentStep =
    Number(
        localStorage.getItem("khotwaStep") || "0"
    );


// =====================================
// التنقل
// =====================================

function showScreen(name) {

    Object.values(screens).forEach(screen => {

        screen.classList.remove("active");

    });

    screens[name].classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =====================================
// الصفحة الرئيسية
// =====================================

function updateHome() {

    if (goal) {

        journeyButton.classList.remove("hidden");

    } else {

        journeyButton.classList.add("hidden");

    }
}


// =====================================
// صفحة الرحلة
// =====================================

function updateJourney() {

    if (!goal) {

        showScreen("goal");

        return;
    }

    journeyGoal.textContent =
        goal;

    const percent =
        Math.round(
            (currentStep / steps.length) * 100
        );

    journeyPercent.textContent =
        `${percent}%`;

    journeyCount.textContent =
        `${Math.min(currentStep, steps.length)} / ${steps.length}`;

    journeyProgressFill.style.width =
        `${percent}%`;

    stepsList.innerHTML = "";

    steps.forEach((step, index) => {

        const item =
            document.createElement("div");

        item.className =
            "step-item";

        if (index < currentStep) {

            item.classList.add("completed");

        } else if (index === currentStep) {

            item.classList.add("current");

        } else {

            item.classList.add("locked");

        }

        let icon = "🔒";

        if (index < currentStep) {

            icon = "✓";

        } else if (index === currentStep) {

            icon = "→";

        }

        item.innerHTML = `

            <div class="step-item-icon">
                ${icon}
            </div>

            <div>

                <strong>
                    ${index + 1}. ${step.title}
                </strong>

                <small>

                    ${
                        index < currentStep
                            ? "تم الإنجاز"
                            : index === currentStep
                            ? "الخطوة الحالية"
                            : "مقفولة حاليًا"
                    }

                </small>

            </div>

        `;

        stepsList.appendChild(item);

    });

}


// =====================================
// الخطوة الحالية
// =====================================

function updateStepScreen() {

    if (currentStep >= steps.length) {

        updateJourney();

        showScreen("journey");

        return;
    }

    const step =
        steps[currentStep];

    stepCounter.textContent =
        `${currentStep + 1} / ${steps.length}`;

    stepTitle.textContent =
        step.title;

    stepDescription.textContent =
        step.description;

    stepTip.textContent =
        step.tip;
}


// =====================================
// الإنجاز
// =====================================

function updateSuccess() {

    const percent =
        Math.round(
            (currentStep / steps.length) * 100
        );

    successProgress.textContent =
        `${percent}%`;

    successProgressFill.style.width =
        `${percent}%`;
}


// =====================================
// إنشاء هدف
// =====================================

startButton.addEventListener(
    "click",
    () => {

        showScreen("goal");

    }
);


createGoalButton.addEventListener(
    "click",
    () => {

        const newGoal =
            goalInput.value.trim();

        if (!newGoal) {

            alert(
                "اكتب هدفك الأول ❤️"
            );

            goalInput.focus();

            return;
        }

        goal =
            newGoal;

        dailyTime =
            timeInput.value;

        currentStep =
            0;

        localStorage.setItem(
            "khotwaGoal",
            goal
        );

        localStorage.setItem(
            "khotwaTime",
            dailyTime
        );

        localStorage.setItem(
            "khotwaStep",
            "0"
        );

        welcomeGoal.textContent =
            goal;

        welcomeTime.textContent =
            `${dailyTime} دقيقة يوميًا`;

        updateHome();

        showScreen("welcome");

    }
);


// =====================================
// بداية الرحلة
// =====================================

startJourneyButton.addEventListener(
    "click",
    () => {

        updateStepScreen();

        showScreen("step");

    }
);


// =====================================
// إنهاء خطوة
// =====================================

completeButton.addEventListener(
    "click",
    () => {

        if (
            currentStep <
            steps.length
        ) {

            currentStep++;

        }

        localStorage.setItem(
            "khotwaStep",
            currentStep
        );

        updateSuccess();

        showScreen("success");

    }
);


// =====================================
// الخطوة التالية
// =====================================

continueButton.addEventListener(
    "click",
    () => {

        if (
            currentStep >=
            steps.length
        ) {

            updateJourney();

            showScreen("journey");

            return;
        }

        updateStepScreen();

        showScreen("step");

    }
);


// =====================================
// فتح الرحلة
// =====================================

journeyButton.addEventListener(
    "click",
    () => {

        updateJourney();

        showScreen("journey");

    }
);


successJourneyButton.addEventListener(
    "click",
    () => {

        updateJourney();

        showScreen("journey");

    }
);


journeyStartButton.addEventListener(
    "click",
    () => {

        if (
            currentStep >=
            steps.length
        ) {

            return;
        }

        updateStepScreen();

        showScreen("step");

    }
);


// =====================================
// الرجوع
// =====================================

document
    .querySelectorAll("[data-back]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const destination =
                    button.dataset.back;

                if (
                    destination ===
                    "home"
                ) {

                    showScreen("home");

                }

                if (
                    destination ===
                    "journey"
                ) {

                    updateJourney();

                    showScreen(
                        "journey"
                    );

                }

            }
        );

    });


// =====================================
// إضافة رسالة للشات
// =====================================

function addMessage(
    text,
    type
) {

    const message =
        document.createElement("div");

    message.className =
        `message ${type}`;

    if (
        type ===
        "assistant"
    ) {

        message.innerHTML = `

            <div class="message-avatar">
                ✦
            </div>

            <div class="bubble">
                ${text}
            </div>

        `;

    } else {

        message.innerHTML = `

            <div class="bubble">
                ${text}
            </div>

        `;

    }

    chatMessages.appendChild(
        message
    );

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


// =====================================
// 🤖 الذكاء الاصطناعي الحقيقي
// =====================================

async function sendMessage(
    text = null
) {

    const message =
        text ||
        chatInput.value.trim();

    if (!message) {

        return;
    }

    addMessage(
        message,
        "user"
    );

    chatInput.value = "";

    const typingId =
        "typing-" +
        Date.now();

    const typingMessage =
        document.createElement("div");

    typingMessage.className =
        "message assistant";

    typingMessage.id =
        typingId;

    typingMessage.innerHTML = `

        <div class="message-avatar">
            ✦
        </div>

        <div class="bubble">
            رفيق بيفكر... 🤔
        </div>

    `;

    chatMessages.appendChild(
        typingMessage
    );

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

    try {

        const savedGoal =
            localStorage.getItem(
                "khotwaGoal"
            ) || "";

        const savedStep =
            Number(
                localStorage.getItem(
                    "khotwaStep"
                ) || "0"
            );

        const progress =
            Math.round(
                (
                    savedStep /
                    steps.length
                ) * 100
            );

        const response =
            await fetch(
                "/api/chat",
                {

                    method:
                        "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            message:
                                message,

                            goal:
                                savedGoal,

                            progress:
                                progress

                        })

                }
            );

        const data =
            await response.json();

        const typingElement =
            document.getElementById(
                typingId
            );

        if (typingElement) {

            typingElement.remove();

        }

        if (
            !response.ok ||
            !data.answer
        ) {

            addMessage(

                data.error ||
                "حصلت مشكلة وأنا بحاول أرد عليك 😅",

                "assistant"

            );

            return;
        }

        addMessage(
            data.answer,
            "assistant"
        );

    } catch (error) {

        console.error(
            "Chat error:",
            error
        );

        const typingElement =
            document.getElementById(
                typingId
            );

        if (typingElement) {

            typingElement.remove();

        }

        addMessage(

            "مش قادر أوصل للـAI دلوقتي 😅 جرّب تاني.",

            "assistant"

        );

    }
}


// =====================================
// إرسال الرسائل
// =====================================

sendButton.addEventListener(
    "click",
    () => {

        sendMessage();

    }
);


chatInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Enter"
        ) {

            sendMessage();

        }

    }
);


// =====================================
// الأزرار السريعة
// =====================================

document
    .querySelectorAll(
        ".quick-actions button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                sendMessage(
                    button.dataset.question
                );

            }
        );

    });


// =====================================
// فتح المساعد
// =====================================

companionHomeButton.addEventListener(
    "click",
    () => {

        showScreen(
            "companion"
        );

    }
);


companionJourneyButton.addEventListener(
    "click",
    () => {

        showScreen(
            "companion"
        );

    }
);


// =====================================
// تشغيل الموقع
// =====================================

updateHome();

if (goal) {

    welcomeGoal.textContent =
        goal;

    welcomeTime.textContent =
        `${dailyTime} دقيقة يوميًا`;

}
