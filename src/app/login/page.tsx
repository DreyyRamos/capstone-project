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

        router.push("/");

        // Shorter delay since queries are already invalidated
        // setTimeout(() => {
        //   router.push("/");
        // }, 1000);
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

  // Show loading spinner while processing
  // if (loading && !successMessage) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
  //         <p className="mt-2 text-gray-600">Logging in...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">LHS</span>
              </div>
              <span className="font-bold text-xl">Lincoln High School</span>
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
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your.email@lincolnhigh.edu"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Button
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
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {errorMessage}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Contact your administrator
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex flex-1 bg-blue-50 dark:bg-blue-950/20 items-center justify-center p-8">
        <div className="max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
              Connect with your school community
            </h2>
            <p className="text-blue-700 dark:text-blue-200">
              Access publications, join discussions, and stay updated with
              school news
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  School Publications
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  Read and create articles, news, and announcements
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Discussion Forums
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  Participate in academic discussions and get help from peers
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
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
