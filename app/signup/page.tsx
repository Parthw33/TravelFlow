"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      username: formData.get("name") as string,
      password: formData.get("password") as string,
    };

    try {
      if (!data.email || !data.password || !data.username) {
        throw new Error("Please fill in all required fields");
      }
      if (!isLogin && !passwordMatch) {
        throw new Error("Passwords do not match");
      }

      if (isLogin) {
        // Handle login
        const result = await signIn("credentials", {
          name: data.username,
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        router.push("/dashboard");
        router.refresh();
      } else {
        // Handle registration
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Something went wrong");
        }

        // After successful registration, sign in the user
        const signInResult = await signIn("credentials", {
          email: data.email,
          password: data.password,
          username: data.username,
          redirect: false,
        });

        if (signInResult?.error) {
          throw new Error(signInResult.error);
        }

        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const handlesignup = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/50">
      <div className="w-full max-w-xl mx-4">
        <motion.div
          className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-border/50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative h-24 bg-gradient-to-r from-[#39c6ab] to-[#2e8b9a] px-6 flex flex-col justify-center">
            <motion.div variants={headerVariants}>
              <h1 className="text-xl font-bold text-primary-foreground">
                {isLogin ? "Welcome Back" : "Create an Account"}
              </h1>
              <p className="text-primary-foreground/80 text-xs mt-1">
                {isLogin
                  ? "Sign in to TravelFlow with your credentials"
                  : "Join TravelFlow today and get started"}
              </p>
            </motion.div>
          </div>

          <div className="p-6 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-red-500 text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <Input
                name="name"
                type="text"
                placeholder="Username"
                className="h-10 text-sm px-4 rounded-lg"
                required
              />

              <Input
                name="email"
                type="email"
                placeholder="Email"
                className="h-10 text-sm px-4 rounded-lg"
                required
              />

              <PasswordInput
                name="password"
                placeholder="Password"
                className="h-10 text-sm px-4 rounded-lg"
                required
              />

              {!isLogin && (
                <PasswordInput
                  name="confirmPassword"
                  placeholder="Re-enter Password"
                  className="h-10 text-sm px-4 rounded-lg"
                  required
                  onChange={(e) => {
                    const password = (
                      document.querySelector(
                        'input[name="password"]'
                      ) as HTMLInputElement
                    ).value;
                    setPasswordMatch(e.target.value === password);
                  }}
                />
              )}

              {!passwordMatch && (
                <div className="text-sm text-red-500 mt-1">
                  Passwords do not match
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-10 text-sm font-medium rounded-lg bg-gradient-to-r from-[#39c6ab] to-[#2e8b9a] hover:opacity-90"
                disabled={loading || (!isLogin && !passwordMatch)}
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </Button>
            </form>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">
                or continue with
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-10 text-sm font-medium rounded-lg"
              onClick={() => handlesignup("google")}
            >
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="hover:underline focus:outline-none"
              >
                {isLogin
                  ? "Need an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
            <div className="text-center text-sm">
              <Link
                href="/login"
                className="text-[#39c6ab] hover:underline focus:outline-none"
              >
                Click here to log in with username and password
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
