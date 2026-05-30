async function test() {
  const formId = "xwvzjvon";
  console.log(`Submitting test lead to Formspree form ID: ${formId}...`);
  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        phone: "+27 82 123 4567",
        businessName: "Test Business",
        budget: "R5000",
        message: "This is a test message to diagnose email delivery.",
        _subject: "Formspree Test Submission"
      })
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

test();
