"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GithubSigninButton from "@/app/components/GithubButton";
import GoogleSigninButton from "@/app/components/GoogleButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/home");
  };

  return (
    <div className="mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold text-white">Sign In</h1>
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        <div className="space-y-4 mt-5">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block"
          />
          <Button
            type="submit"
            variant="destructive"
            className="w-full bg-[#e50914] hover:bg-red-500 text-white"
          >
            Sign In
          </Button>
        </div>
      </form>

      <div className="text-gray-500 text-sm mt-4 text-center">
        First time on Netflix?{" "}
        <Link href="/signup" className="text-white ml-1 hover:underline">
          Sign Up
        </Link>
      </div>

      <div className="flex mt-6 gap-x-3 justify-center w-full">
        <GithubSigninButton />
        <GoogleSigninButton />
      </div>
    </div>
  );
}
