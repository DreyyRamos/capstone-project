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
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SearchBar from "./search-bar";

const mainNavigation = [
  { name: "Homepage", href: "/", icon: Home },
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
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div id="admin-navigation-div-1" data-testId="admin-navigation-div-1" className="max-w-7xl mx-auto px-1">
        {/* Desktop Navigation */}
        <div id="admin-navigation-div-2" data-testId="admin-navigation-div-2" className="hidden xl:flex h-14 items-center justify-between">
          <div id="admin-navigation-flex-3" data-testId="admin-navigation-flex-3" className="flex items-center space-x-4">
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
                <Link id="admin-navigation-link-1" data-testId="admin-navigation-link-1"
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
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
                <Button id="admin-navigation-button-1" data-testId="admin-navigation-button-1"
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
                      <Link id="admin-navigation-link-2" data-testId="admin-navigation-link-2"
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2",
                          isActive && "bg-secondary",
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
                <Button id="admin-navigation-button-2" data-testId="admin-navigation-button-2"
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
                    <Link id="admin-navigation-link-3" data-testId="admin-navigation-link-3"
                      href={category.href}
                      className="flex items-center justify-between"
                    >
                      <span id="admin-navigation-span-1" data-testId="admin-navigation-span-1">{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Quick Actions */}
          <div id="admin-navigation-flex-4" data-testId="admin-navigation-flex-4" className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button id="admin-navigation-button-3" data-testId="admin-navigation-button-3" size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Quick Actions
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link id="admin-navigation-link-4" data-testId="admin-navigation-link-4" href={"/users"}>
                  <DropdownMenuItem> Manage Users</DropdownMenuItem>
                </Link>
                <Link id="admin-navigation-link-5" data-testId="admin-navigation-link-5" href={"/admissions"}>
                  <DropdownMenuItem>Manage Admissions</DropdownMenuItem>
                </Link>
                <Link id="admin-navigation-link-6" data-testId="admin-navigation-link-6" href={"/moderation"}>
                  <DropdownMenuItem> Moderate Content</DropdownMenuItem>
                </Link>
                <Link id="admin-navigation-link-7" data-testId="admin-navigation-link-7" href={"content-manager"}>
                  <DropdownMenuItem>Manage Publications</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Large Screen Navigation (but smaller than xl) */}
        <div id="admin-navigation-div-5" data-testId="admin-navigation-div-5" className="hidden lg:flex xl:hidden h-14 items-center justify-between">
          <div id="admin-navigation-flex-6" data-testId="admin-navigation-flex-6" className="flex items-center space-x-3">
            <Badge
              variant="secondary"
              className="bg-red-100 text-red-800 shrink-0"
            >
              {/* <Shield className="h-3 w-3 mr-1" /> */}
              Admin
            </Badge>

            {/* Main Navigation - condensed */}
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link id="admin-navigation-link-8" data-testId="admin-navigation-link-8"
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span id="admin-navigation-span-2" data-testId="admin-navigation-span-2" className="hidden lg:inline">{item.name}</span>
                </Link>
              );
            })}

            {/* Combined Admin & Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button id="admin-navigation-button-4" data-testId="admin-navigation-button-4"
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
                      <Link id="admin-navigation-link-9" data-testId="admin-navigation-link-9"
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2",
                          isActive && "bg-secondary",
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
                    <Link id="admin-navigation-link-10" data-testId="admin-navigation-link-10"
                      href={category.href}
                      className="flex items-center justify-between"
                    >
                      <span id="admin-navigation-span-3" data-testId="admin-navigation-span-3">{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button id="admin-navigation-button-5" data-testId="admin-navigation-button-5" size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span id="admin-navigation-span-4" data-testId="admin-navigation-span-4" className="hidden lg:inline">Actions</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div id="admin-navigation-flex-7" data-testId="admin-navigation-flex-7" className="flex lg:hidden h-14 items-center justify-between px-3">
          {/* Left side: Badge + Navigation (hidden when search is open) */}
          <div id="admin-navigation-div-8" data-testId="admin-navigation-div-8"
            className={cn(
              "flex items-center space-x-2 transition-all duration-300",
              searchOpen
                ? "opacity-0 pointer-events-none w-0 overflow-hidden"
                : "opacity-100 flex-1",
            )}
          >
            <Badge
              variant="secondary"
              className="bg-red-100 text-red-800 shrink-0"
            >
              <Shield className="h-3 w-3 mr-1" />
              <span id="admin-navigation-span-5" data-testId="admin-navigation-span-5" className="hidden sm:inline">Admin</span>
            </Badge>

            <div id="admin-navigation-flex-9" data-testId="admin-navigation-flex-9" className="flex items-center space-x-1">
              {mainNavigation.slice(0, 2).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link id="admin-navigation-link-11" data-testId="admin-navigation-link-11"
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span id="admin-navigation-span-6" data-testId="admin-navigation-span-6" className="hidden sm:inline">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Search Area */}
          <div id="admin-navigation-div-10" data-testId="admin-navigation-div-10"
            className={cn(
              "flex items-center transition-all duration-300",
              searchOpen ? "flex-1" : "shrink-0",
            )}
          >
            {searchOpen ? (
              <div id="admin-navigation-flex-11" data-testId="admin-navigation-flex-11" className="flex items-center gap-2 w-full animate-in fade-in slide-in-from-right-2 duration-200">
                <div id="admin-navigation-div-12" data-testId="admin-navigation-div-12" className="flex-1">
                  <SearchBar
                    placeholder="Search..."
                    autoFocus
                    onClose={() => setSearchOpen(false)}
                  />
                </div>
                <Button id="admin-navigation-button-6" data-testId="admin-navigation-button-6"
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(false)}
                  className="shrink-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button id="admin-navigation-button-7" data-testId="admin-navigation-button-7"
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="shrink-0"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Mobile Menu (hidden when search is open) */}
          <div id="admin-navigation-div-13" data-testId="admin-navigation-div-13"
            className={cn(
              "transition-all duration-300 shrink-0",
              searchOpen
                ? "opacity-0 pointer-events-none w-0 overflow-hidden ml-0"
                : "opacity-100 ml-2",
            )}
          >
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button id="admin-navigation-button-8" data-testId="admin-navigation-button-8" variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span id="admin-navigation-span-7" data-testId="admin-navigation-span-7" className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Admin Navigation</SheetTitle>
                  <SheetDescription>
                    Full administrative access
                  </SheetDescription>
                </SheetHeader>
                <div id="admin-navigation-div-14" data-testId="admin-navigation-div-14" className="mt-6 space-y-6">
                  {/* Main Navigation */}
                  <div id="admin-navigation-div-15" data-testId="admin-navigation-div-15" className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Main
                    </h3>
                    {mainNavigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link id="admin-navigation-link-12" data-testId="admin-navigation-link-12"
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                            isActive
                              ? "bg-secondary text-secondary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Admin Navigation Items */}
                  <div id="admin-navigation-div-16" data-testId="admin-navigation-div-16" className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Admin Tools
                    </h3>
                    {adminNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link id="admin-navigation-link-13" data-testId="admin-navigation-link-13"
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                            isActive
                              ? "bg-secondary text-secondary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
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
                  <div id="admin-navigation-div-17" data-testId="admin-navigation-div-17" className="space-y-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Forum Categories
                    </h3>

                    {/* scrollable area */}
                    <div id="admin-navigation-div-18" data-testId="admin-navigation-div-18" className="max-h-56 overflow-y-auto pr-2 -mr-2 space-y-1">
                      {forumCategories.map((category) => (
                        <Link id="admin-navigation-link-14" data-testId="admin-navigation-link-14"
                          key={category.name}
                          href={category.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                        >
                          <span id="admin-navigation-span-8" data-testId="admin-navigation-span-8">{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Quick Actions */}
                  <div id="admin-navigation-div-19" data-testId="admin-navigation-div-19" className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Quick Actions
                    </h3>
                    <Button id="admin-navigation-button-9" data-testId="admin-navigation-button-9" className="w-full justify-start" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                    <Button id="admin-navigation-button-10" data-testId="admin-navigation-button-10" className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Create Announcement
                    </Button>
                    <Button id="admin-navigation-button-11" data-testId="admin-navigation-button-11" className="w-full justify-start" variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Moderate Content
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
