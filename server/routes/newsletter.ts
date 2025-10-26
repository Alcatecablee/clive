import { Router, Request, Response } from "express";
import { z } from "zod";
import { getUncachableResendClient } from "../lib/resend.js";

const router = Router();

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

router.post("/", async (req: Request, res: Response) => {
  console.log("📬 [API NEWSLETTER] POST request received");
  console.log("📋 [API NEWSLETTER] Request body fields:", {
    hasEmail: !!req.body?.email,
  });
  
  try {
    console.log("🔍 [API NEWSLETTER] Validating request data with Zod schema");
    const validatedData = newsletterSchema.parse(req.body);
    const { email } = validatedData;
    
    console.log("✅ [API NEWSLETTER] Validation successful");

    console.log("🔐 [API NEWSLETTER] Getting Resend client credentials");
    const { client: resend } = await getUncachableResendClient();
    console.log("✅ [API NEWSLETTER] Resend client initialized successfully");

    console.log("📧 [API NEWSLETTER] Sending newsletter subscription email");

    const { data, error } = await resend.emails.send({
      from: "Just Clive Newsletter <newsletter@justc.live>",
      to: ["hello@justc.live"],
      replyTo: email,
      subject: `New Newsletter Subscription from ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Newsletter Subscription</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p style="color: #6b7280; font-size: 14px; margin-top: 16px;">
              Add this email to your newsletter mailing list.
            </p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            This subscription was submitted from your portfolio newsletter form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("❌ [API NEWSLETTER] Resend API error - type:", typeof error);
      return res.status(500).json({
        success: false,
        error: "Failed to process subscription",
      });
    }

    console.log("✅ [API NEWSLETTER] Email sent successfully - ID:", data?.id);
    
    return res.status(200).json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
    
  } catch (error) {
    console.error("❌ [API NEWSLETTER] Error processing newsletter subscription:", error);
    
    if (error instanceof z.ZodError) {
      console.error("📛 [API NEWSLETTER] Validation error - issues:", error.issues);
      return res.status(400).json({
        success: false,
        error: error.issues[0].message,
      });
    }
    
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred",
    });
  }
});

export default router;
