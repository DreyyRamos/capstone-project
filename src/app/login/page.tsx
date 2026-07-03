"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, BookOpen, Users, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, user } = data;

        // Set the cookie
        Cookies.set("token", token, { expires: 1 });

        // Trigger token refresh for immediate UI update
        window.dispatchEvent(new CustomEvent("tokenRefresh"));

        // Invalidate all queries to force refetch with new auth state
        await queryClient.invalidateQueries();

        setSuccessMessage("Login successful! Redirecting to homepage...");
        console.log("User logged in:", user);

        switch (user.role) {
          case "EDITOR":
            router.push("/content-manager");
            break;
          case "MODERATOR":
            router.push("/moderation");
            break;
          default:
            router.push("/");
        }
      } else {
        setLoading(false);
        setErrorMessage(
          data.message || "Login failed. Please check your email and password."
        );
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMessage("Login failed. Please try again later.");
      console.error("Login failed:", error);
    }
  };


  return (
    <div id="page-flex-1" data-testId="page-flex-1" className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div id="page-flex-2" data-testId="page-flex-2" className="flex-1 flex items-center justify-center p-8">
        <div id="page-div-3" data-testId="page-div-3" className="w-full max-w-md space-y-6">
          <div id="page-div-4" data-testId="page-div-4" className="text-center space-y-2">
            <div id="page-flex-5" data-testId="page-flex-5" className="flex items-center justify-center gap-2 mb-4">
              <div id="page-flex-6" data-testId="page-flex-6" className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span id="page-span-1" data-testId="page-span-1" className="text-white font-bold">RS</span>
              </div>
              <span id="page-span-2" data-testId="page-span-2" className="font-bold text-xl">Ramos School</span>
            </div>
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div id="page-div-7" data-testId="page-div-7" className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your.email@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div id="page-div-8" data-testId="page-div-8" className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div id="page-div-9" data-testId="page-div-9" className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Button id="page-button-1" data-testId="page-button-1"
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {successMessage && (
                  <div id="page-flex-10" data-testId="page-flex-10" className="text-sm text-green-600 bg-green-50 p-3 rounded-md flex items-center">
                    <div id="page-div-11" data-testId="page-div-11" className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div id="page-div-12" data-testId="page-div-12" className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {errorMessage}
                  </div>
                )}

                <Button id="page-button-2" data-testId="page-button-2" type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div id="page-div-13" data-testId="page-div-13" className="mt-4 text-center">
                {/* <Link id="page-link-1" data-testId="page-link-1"
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot your password?
                </Link> */}
              </div>
            </CardContent>
          </Card>

          <div id="page-div-14" data-testId="page-div-14" className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link id="page-link-2" data-testId="page-link-2" href="/register" className="text-blue-600 hover:underline">
              Register here and check your email for account approval!
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Features */}
      <div id="page-div-15" data-testId="page-div-15" className="hidden lg:flex flex-1 bg-blue-50 dark:bg-blue-950/20 items-center justify-center p-8">
        <div id="page-div-16" data-testId="page-div-16" className="max-w-md space-y-8">
          <div id="page-div-17" data-testId="page-div-17" className="text-center">
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
              Connect with your school community
            </h2>
            <p className="text-blue-700 dark:text-blue-200">
              Access publications, join discussions, and stay updated with
              school news
            </p>
          </div>

          <div id="page-div-18" data-testId="page-div-18" className="space-y-6">
            <div id="page-flex-19" data-testId="page-flex-19" className="flex items-start gap-4">
              <div id="page-div-20" data-testId="page-div-20" className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div id="page-div-21" data-testId="page-div-21">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  School Publications
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  Read and create articles, news, and announcements
                </p>
              </div>
            </div>

            <div id="page-flex-22" data-testId="page-flex-22" className="flex items-start gap-4">
              <div id="page-div-23" data-testId="page-div-23" className="bg-blue-600 p-2 rounded-lg">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div id="page-div-24" data-testId="page-div-24">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Discussion Forums
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  Participate in academic discussions and get help from peers
                </p>
              </div>
            </div>

            <div id="page-flex-25" data-testId="page-flex-25" className="flex items-start gap-4">
              <div id="page-div-26" data-testId="page-div-26" className="bg-blue-600 p-2 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div id="page-div-27" data-testId="page-div-27">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Community
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  Connect with students, teachers, and staff
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
