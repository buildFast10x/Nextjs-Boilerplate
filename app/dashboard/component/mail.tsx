"use client";

import axiosInstance from "@/lib/axios";
import AllAPIRouteMapping from "@/utils/AllAPIRouteMapping";
import { Loader } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

type Props = {};

export default function Mail({}: Props) {
  
  const [mailStatus, setMailStatus] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const sendEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMailStatus(true);
    try {
      const axios = new axiosInstance();
      axios.setPayload(JSON.stringify({
        email: emailRef.current?.value,
        name: nameRef.current?.value,
      }));

      const response = await axios.makeCall(AllAPIRouteMapping.mails.send.apiPath, AllAPIRouteMapping.mails.send.method);    
      // console.log("response: ", response);  
      const { error } = response;
      if (error) {
        toast.error("Something went wrong!!");
        return;
      }
      toast.success("Email send successfully");
    } catch (error) {
      toast.error("Something went wrong!!");
    } finally {
      setMailStatus(false);
    }
  };
  return (
    <div className="p-10">
      <form
        onSubmit={sendEmail}
        className="flex flex-col gap-5 max-w-xl mx-auto"
      >
        <input
          className="border rounded-xl p-2"
          type="text"
          name="name"
          placeholder="name"
          ref={nameRef}
        />
        <input
          className="border rounded-xl p-2"
          type="email"
          name="email"
          placeholder="email"
          ref={emailRef}
        />
        <button
          disabled={mailStatus}
          className="border bg-blue-400 px-5 py-2 rounded-xl flex items-center justify-center gap-2"
        >
          Send Email {mailStatus ? <Loader size={16} className="animate-spin ease-in-out" /> : ""}
        </button>
      </form>
    </div>
  );
}
