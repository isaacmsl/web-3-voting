"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  function login() {
    console.log("Login!");
  }

  return (
    <div className="flex flex-col items-center justify-center sm:h-screen">
      <Head>
        <title>Web 3 Voting | Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col sm:flex-row gap-12 p-12 justify-center">
        <section className="flex flex-col items-start justify-center gap-12 md:gap-20">
          <header className="grid gap-4">
            <h1 className="text-4xl font-bold">Web 3 Voting</h1>
            <p>An ilustrative secure and privative voting system using Blockchain tecnology.</p>
          </header>
          <button
            onClick={login}
            type="button"
            className="bg-orange-700 rounded p-2 hover:scale-105 hover:font-bold flex gap-4 items-center"
          >
            <Image
              src="/MetaMask_Fox.svg"
              alt="MetaMask Logo"
              width={32}
              height={32}
            />
            Connect with MetaMask
          </button>
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
