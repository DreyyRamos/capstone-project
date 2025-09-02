// components/EmailTrigger.tsx
"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";

type Props = {
  to: string; // recipient email
  firstName: string;
  lastName: string;
  send: boolean; // parent flips this to true when ready
  onSent?: (result: any) => void;
  onError?: (error: any) => void;
};

export default function RequestEmailTrigger({
  to,
  firstName,
  lastName,
  send,
  onSent,
  onError,
}: Props) {
  const busy = useRef(false);

  if (send && !busy.current) {
    busy.current = true;

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          email: to,
          firstName,
          lastName,
          // any other {{variables}} in my emailjs template
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(onSent)
      .catch(onError)
      .finally(() => (busy.current = false));
  }

  // Nothing renders; it’s just a side-effect component
  return null;
}
