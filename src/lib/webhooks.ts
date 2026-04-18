/**
 * Utility to send data to external webhooks like Zapier.
 * This is used for notification and business process automation.
 */

export async function sendZapierNotification(type: 'LEAD' | 'QUOTE', data: any) {
  const zapierUrl = process.env.ZAPIER_WEBHOOK_URL;

  if (!zapierUrl || zapierUrl.includes("17rI-FuBlyXjJcArjbRlckhQUyUvQW9IzuTM3S2f4V_4")) {
    console.warn("Zapier Webhook URL not configured. Skipping notification.");
    return;
  }

  try {
    const response = await fetch(zapierUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: "TinyStrophic Web Studio",
        type,
        timestamp: new Date().toISOString(),
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error(`Zapier returned ${response.status}: ${response.statusText}`);
    }

    // console.log(`Zapier notification sent successfully for ${type}`);
  } catch (error) {
    console.error("Failed to send Zapier notification:", error);
  }
}
