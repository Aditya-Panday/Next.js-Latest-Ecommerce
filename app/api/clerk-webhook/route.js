import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function POST(request) {
    try {
      const body = await request.json();
    //   console.log("body: ", body);
  
      // Clerk user object
      const eventType = body.type;
    //   console.log("eventType: ", eventType);
      const user = body.data;
    //   console.log("user: ", user);

  
      if (eventType === "user.created") {
            const { id: clerkUserId, email_addresses, first_name, last_name } = user;
      
            const email = email_addresses[0]?.email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();
      
            const { error } = await supabase.from("users").insert([
              {
                clerk_user_id: clerkUserId,
                email,
                name,
              },
            ]);
  
        if (error) {
          console.error("Error inserting into Supabase:", error);
          return NextResponse.json({ success: false, error }, { status: 500 });
        }
      }
  
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("Webhook Error:", err);
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
  }

export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
