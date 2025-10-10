import { Router, Request, Response } from "express";
import { z } from "zod";
import { getUncachableResendClient } from "../lib/resend.js";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const validatedData = contactSchema.parse(req.body);
    const { name, email, message } = validatedData;

    const { client: resend } = await getUncachableResendClient();

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <contact@justc.live>",
      to: ["hello@justc.live"],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to send email",
      });
    }

    console.log("Email sent successfully:", data);

    res.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.errors[0].message,
      });
    }

    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred. Please try again.",
    });
  }
});

export default router;
