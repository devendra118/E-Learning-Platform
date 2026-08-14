
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: {"Content-Type":"application/json"}, body: JSON.stringify({error:"Method not allowed"}) };
  }
  try {
    const data = JSON.parse(event.body || "{}");
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const subject = String(data.subject || "Website enquiry").trim();
    const message = String(data.message || "").trim();

    if (!name || !email || !message) {
      return { statusCode: 400, headers: {"Content-Type":"application/json"}, body: JSON.stringify({error:"Name, email and message are required."}) };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { statusCode: 400, headers: {"Content-Type":"application/json"}, body: JSON.stringify({error:"Please enter a valid email address."}) };
    }

    // Production-ready validation layer. Connect this handler to an email/DB provider
    // using environment variables without exposing secrets in frontend code.
    console.log(JSON.stringify({name,email,subject,message,receivedAt:new Date().toISOString()}));

    return {
      statusCode: 200,
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ok:true,message:"Your enquiry was received successfully."})
    };
  } catch {
    return { statusCode: 400, headers: {"Content-Type":"application/json"}, body: JSON.stringify({error:"Invalid request."}) };
  }
};
