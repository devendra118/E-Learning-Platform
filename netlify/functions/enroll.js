
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: {"Content-Type":"application/json"}, body: JSON.stringify({error:"Method not allowed"}) };
  }
  try {
    const data = JSON.parse(event.body || "{}");
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const course = String(data.course || "").trim();
    if (!name || !email || !course) {
      return {statusCode:400,headers:{"Content-Type":"application/json"},body:JSON.stringify({error:"Name, email and course are required."})};
    }
    console.log(JSON.stringify({type:"enrollment",name,email,course,createdAt:new Date().toISOString()}));
    return {statusCode:200,headers:{"Content-Type":"application/json"},body:JSON.stringify({ok:true,message:"Enrollment request received."})};
  } catch {
    return {statusCode:400,headers:{"Content-Type":"application/json"},body:JSON.stringify({error:"Invalid request."})};
  }
};
