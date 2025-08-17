import axios from "axios";

const KHALTI_API_URL = "https://a.khalti.com/api/v2/epayment/initiate/";
const KHALTI_RETURN_URL = "https://yourdomain.com/khalti/callback"; // replace with your actual return URL
const WEBSITE_URL = "https://yourfrontend.com"; // your website frontend
const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY || "YOUR_SECRET_KEY";

const payViaKhalti = async ({ amount, orderId, orderName }) => {
  try {
    const payload = {
      return_url: KHALTI_RETURN_URL,
      website_url: WEBSITE_URL,
      amount: String(amount),
      purchase_order_id: orderId,
      purchase_order_name: orderName,
    };

    const headers = {
      Authorization: `Key ${KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(KHALTI_API_URL, payload, { headers });

    return response.data; // includes payment_url, pidx, etc.
  } catch (error) {
    console.error("Khalti API Error:", error.response?.data || error.message);
    return null;
  }
};

export default payViaKhalti;
