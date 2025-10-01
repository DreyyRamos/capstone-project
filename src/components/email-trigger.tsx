// components/EmailTrigger.tsx
"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";

type EmailType = "request" | "confirmation";

type Props = {
  to: string;
  firstName: string;
  lastName: string;
  send: boolean;
  emailType: EmailType;
  onSent?: (result: any) => void;
  onError?: (error: any) => void;
};

export default function EmailTrigger({
  to,
  firstName,
  lastName,
  send,
  emailType,
  onSent,
  onError,
}: Props) {
  const busy = useRef(false);

  // pick the right template id
  const getTemplateId = (type: EmailType): string => {
    switch (type) {
      case "request":
        return process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      case "confirmation":
        return process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID!;
      //   case "rejected":
      //     return process.env.NEXT_PUBLIC_EMAILJS_REJECTED_TEMPLATE_ID!; // add this env var
      default:
        // exhaustive check – TS will error if a new type is added
        const _exhaustive: never = type;
        throw new Error(`Unhandled email type: ${_exhaustive}`);
    }
  };

  if (send && !busy.current) {
    busy.current = true;

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        getTemplateId(emailType),
        { email: to, firstName, lastName },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(onSent)
      .catch(onError)
      .finally(() => (busy.current = false));
  }

  return null;
}
