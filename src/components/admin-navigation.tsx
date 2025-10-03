"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  BookOpen,
  MessageSquare,
  Users,
  FileText,
  Menu,
  ChevronDown,
  Plus,
  Shield,
  BarChart3,
  UserCheck,
  Settings,
  ChartArea,
} from "lucide-react";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const mainNavigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Publications", href: "/publications", icon: BookOpen },
  { name: "Forum", href: "/forum", icon: MessageSquare },
  { name: "Leaderboard", href: "/leaderboard", icon: ChartArea },
];

const adminNavItems = [
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Moderation",
    href: "/moderation",
    icon: Shield,
  },
  {
    title: "Content Manager",
    href: "/content-manager",
    icon: FileText,
  },
  {
    title: "Admissions",
    href: "/admissions",
    icon: UserCheck,
  },

  {
    title: "Role Change Requests",
    href: "/role-request",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const slugify = (str: string) => {
  return str;
};

const forumCategories = [
  { name: "General Discussion" },
  { name: "Academic" },
  { name: "Clubs & Activities" },
  { name: "Sports" },
  { name: "Arts & Culture" },
  { name: "Technology" },
  { name: "Study Groups" },
  { name: "Events" },
  { name: "Help & Support" },
  { name: "Uncategorized" },
].map((cat) => ({
  ...cat,
  href: `/forum/category/${slugify(cat.name)}`,
}));

export function AdminNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-1">
        {/* Desktop Navigation */}
        <div className="hidden xl:flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge
              variant="secondary"
              className="bg-red-100 text-red-800 shrink-0"
            >
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </Badge>
            {/* Main Navigation */}
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
            {/* Admin Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-sm font-medium"
                >
                  Admin Tools
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Admin Tools</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {adminNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2",
                          isActive && "bg-secondary"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Forum Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-sm font-medium"
                >
                  Forum Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Forum Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {forumCategories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link
                      href={category.href}
                      className="flex items-center justify-between"
                    >
                      <span>{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Quick Actions
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"/users"}>
                  <DropdownMenuItem> Manage Users</DropdownMenuItem>
                </Link>
                <Link href={"/admissions"}>
                  <DropdownMenuItem>Manage Admissions</DropdownMenuItem>
                </Link>
                <Link href={"/moderation"}>
                  <DropdownMenuItem> Moderate Content</DropdownMenuItem>
                </Link>
                <Link href={"content-manager"}>
                  <DropdownMenuItem>Manage Publications</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Large Screen Navigation (but smaller than xl) */}
        <div className="hidden lg:flex xl:hidden h-14 items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge
              variant="secondary"
              className="bg-red-100 text-red-800 shrink-0"
            >
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </Badge>

            {/* Main Navigation - condensed */}
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.name}</span>
                </Link>
              );
            })}

            {/* Combined Admin & Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-sm font-medium"
                >
                  More
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Admin Tools</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {adminNavItems.slice(0, 4).map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2",
                          isActive && "bg-secondary"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {forumCategories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link
                      href={category.href}
                      className="flex items-center justify-between"
                    >
                      <span>{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span className="hidden lg:inline">Actions</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden h-14 items-center justify-between mx-3.5 overflow-y-auto">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </Badge>
            {mainNavigation.slice(0, 2).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Admin Navigation</SheetTitle>
                <SheetDescription>Full administrative access</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Main Navigation */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Main
                  </h3>
                  {mainNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          isActive
                            ? "bg-secondary text-secondary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                {/* Admin Navigation Items */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Admin Tools
                  </h3>
                  {adminNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          isActive
                            ? "bg-secondary text-secondary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    );
                  })}
                </div>

                <Separator />

                {/* Forum Categories */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Forum Categories
                  </h3>

                  {/* scrollable area */}
                  <div className="max-h-56 overflow-y-auto pr-2 -mr-2 space-y-1">
                    {forumCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                      >
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Quick Actions */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Quick Actions
                  </h3>
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Announcement
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Moderate Content
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
