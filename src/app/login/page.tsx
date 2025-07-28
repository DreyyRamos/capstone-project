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
import { useRole } from "@/contexts/role-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useRole();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate login process
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication - this would call auth API
      if (email && password) {
        // Set a mock user based on email domain for demo
        const mockUser = {
          id: "1",
          name: email.includes("admin")
            ? "Admin User"
            : email.includes("teacher")
            ? "Teacher User"
            : "Student User",
          email: email,
          role: email.includes("admin")
            ? ("admin" as const)
            : email.includes("teacher")
            ? ("editor" as const)
            : email.includes("moderator")
            ? ("moderator" as const)
            : ("student" as const),
          avatar: "/placeholder-user.jpg",
        };

        setUser(mockUser);

        // Redirect to the page they were trying to access, or home
        const redirectTo =
          new URLSearchParams(window.location.search).get("redirect") || "/";
        router.push(redirectTo);
      } else {
        setError("Please enter both email and password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: string) => {
    const demoUsers = {
      admin: {
        id: "1",
        name: "Admin User",
        email: "admin@lincolnhigh.edu",
        role: "admin" as const,
      },
      editor: {
        id: "2",
        name: "Editor User",
        email: "editor@lincolnhigh.edu",
        role: "editor" as const,
      },
      moderator: {
        id: "3",
        name: "Moderator User",
        email: "moderator@lincolnhigh.edu",
        role: "moderator" as const,
      },
      student: {
        id: "4",
        name: "Student User",
        email: "student@lincolnhigh.edu",
        role: "student" as const,
      },
    };

    setUser({
      ...demoUsers[role as keyof typeof demoUsers],
      avatar: "/placeholder-user.jpg",
    });
    const redirectTo =
      new URLSearchParams(window.location.search).get("redirect") || "/";
    router.push(redirectTo);
  };

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
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@lincolnhigh.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
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

          {/* Demo Login Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Demo Login</CardTitle>
              <CardDescription className="text-xs">
                Quick login for testing different roles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin("admin")}
                >
                  Admin
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin("editor")}
                >
                  Editor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin("moderator")}
                >
                  Moderator
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin("student")}
                >
                  Student
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
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
