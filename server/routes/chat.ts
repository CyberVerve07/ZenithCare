import express, { Response } from 'express';
import { optionalAuthenticate, AuthRequest } from '../middleware/auth';
import axios from 'axios';

const router = express.Router();

router.post('/', optionalAuthenticate, async (req: AuthRequest, res: Response) => {
  const { messages, userContext } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body. Expected an array of messages.' });
  }

  const groqApiKey = process.env.GROQ_API_KEY || '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';

  // Construct message payload for Groq chat completion customized for personal assistant use
  const name = userContext?.name || 'hospital member';
  const role = userContext?.role || req.user?.role || 'staff member';

  const systemPrompt = `You are MediFlow AI, a premium, intelligent personal and clinical co-pilot at Orchids MediFlow Hospital. You are currently assisting ${name}, who is logged in as a ${role}. 
You are highly versatile and ready for "personal use" to assist them with:
1. General clinical reference, ICU vital thresholds, patient diagnosis notes, and patient diet adjustments.
2. Personal productivity, task lists, drafting professional emails/messages to patients or staff, calculation of clinical values (e.g. BMI, GFR, drug dosages).
3. Operational guidance like appointment booking guidelines and scheduling conflict prevention.

Answer professionally, concisely, and with premium styling. Use structured format, bullet points, lists, or step-by-step instructions where applicable. Be highly helpful, supportive, and friendly, but keep replies concise to optimize token usage.`;

  const chatMessages = [
    {
      role: 'system',
      content: systemPrompt
    },
    ...messages.slice(-10) // Limit to last 10 messages for token optimization
  ];

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: chatMessages,
        temperature: 0.5,
        max_tokens: 500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        timeout: 8000 // 8s timeout
      }
    );

    const reply = response.data.choices[0].message.content.trim();
    res.json({ reply });
  } catch (err: any) {
    console.error('[Groq Chat Assistant Error]:', err.message);

    // Dynamic mock response fallback based on the last message keywords
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    let fallbackReply = '';

    if (lastUserMessage.includes('icu') || lastUserMessage.includes('critical') || lastUserMessage.includes('vitals')) {
      fallbackReply = `**[MediFlow AI Fallback Assistant]**
Based on critical care telemetry standards:
- Continuous EKG, pulse oximetry, and arterial BP monitoring is advised.
- Maintain SPO2 > 93% for standard critical patients.
- Immediate doctor escalation if heart rate fluctuates below 50 bpm or above 120 bpm.`;
    } else if (lastUserMessage.includes('diet') || lastUserMessage.includes('food') || lastUserMessage.includes('nutrition')) {
      fallbackReply = `**[MediFlow AI Fallback Assistant]**
Standard clinical nutrition recommendations:
- **Cardiovascular Strain**: Strict sodium restriction (<2g/day), low saturated fats, fluid restriction if congestive failure is present.
- **Diabetes/Glycemic control**: High fiber, slow-release complex carbohydrates, controlled portion sizes.
- **Recovery/Observation**: High protein lean meats, leafy vegetables, zero added sugar.`;
    } else if (lastUserMessage.includes('appointment') || lastUserMessage.includes('schedule') || lastUserMessage.includes('conflict')) {
      fallbackReply = `**[MediFlow AI Fallback Assistant]**
MediFlow scheduling guidelines:
- Clinician double-booking is strictly prohibited in our PostgreSQL registry.
- Standard appointment intervals are 30 minutes.
- Urgently admitted patients (ICU) bypass the scheduling queue automatically.`;
    } else {
      fallbackReply = `**[MediFlow AI Fallback Assistant]**
Hello! I am MediFlow AI.
- You can ask me about **clinical state summaries**, **ICU patient telemetry**, **dietary instructions**, or **general diagnostics advice**.
- I am currently operating on standard diagnostic models. Please verify all clinical parameters before prescribing medication.`;
    }

    res.json({ reply: fallbackReply });
  }
});

export default router;
