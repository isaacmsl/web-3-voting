"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { createRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { loginWeb3 } from "@/services/Web3Service";
import { useRouter } from "next/navigation";

export default function Home() {
  const reCaptchaRef = createRef<ReCAPTCHA>();
  const [captcha, setCaptcha] = useState("");

  const { push } = useRouter();

  useEffect(() => {
    reCaptchaRef.current?.execute();
  }, []);

  function handleLogin() {
    loginWeb3()
      .then(() => push("/vote"))
      .catch(err => console.error(err));
  }

  function handleReCaptcha(value: string | null) {
    setCaptcha(String(value));
  }

  return (
    <div className="flex flex-col items-center justify-center sm:h-screen">
      <main className="flex flex-col sm:flex-row gap-12 p-12 justify-center">
        <section className="flex flex-col items-start justify-center gap-12 md:gap-20">
          <header className="grid gap-4">
            <h1 className="text-4xl font-bold">Web 3 Voting</h1>
            <p>An ilustrative secure and privative voting system using Blockchain tecnology.</p>
          </header>
          {captcha.length > 0 && (
            <button
              onClick={handleLogin}
              type="button"
              className="bg-orange-700 rounded p-2 hover:scale-105 hover:font-bold flex gap-4 items-center text-white"
            >
              <Image
                src="/MetaMask_Fox.svg"
                alt="MetaMask Logo"
                width={32}
                height={32}
              />
              Connect with MetaMask
            </button>
          ) || (
              <button
                disabled={true}
                type="button"
                className="bg-orange-700 rounded p-2 flex gap-4 items-center text-white"
              >
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-orange-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                Hmm... are you human?
              </button>
            )}
          <ReCAPTCHA
            size="invisible"
            sitekey="6Ldt5mMpAAAAACYe5_42UP0JrWZc_dlucG-Q2m_G"
            ref={reCaptchaRef}
            onChange={handleReCaptcha}
          />
        </section>
        <iframe
          height={300}
          className="border-2 border-orange-700 rounded hover:scale-105 cursor-pointer w-full"
          src="https://www.youtube.com/embed/EKzZOZUAbfg"
          title="Bringing Voting Systems into the Digital Age with Blockchain | Annika Jacobsen | TEDxZurichSalon"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </main>
      <footer className="flex flex-wrap-reverse justify-between p-12 gap-12 md:gap-40 text-gray-500">
        &copy; 2024 Web 3 Voting, Inc
        <nav className="flex gap-4">
          <Link className="italic" href="/">Home</Link>
          <Link className="italic" href="/">About</Link>
        </nav>
      </footer>
    </div>
  );
}
