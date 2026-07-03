"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  BookOpen,
  MessageSquare,
  Users,
  TrendingUp,
  FileText,
  Hash,
  Menu,
  ChevronDown,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Homepage", href: "/", icon: Home },
  { name: "Publications", href: "/publications", icon: BookOpen },
  { name: "Forum", href: "/forum", icon: MessageSquare },
  { name: "Users", href: "/users", icon: Users },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
];

const quickActions = [
  { name: "New Publication", href: "/publications/create", icon: FileText },
  { name: "Start Discussion", href: "/forum/create", icon: Hash },
];

const forumCategories = [
  {
    name: "General Discussion",
    count: 45,
    href: "/forum/category/general-discussion",
  },
  { name: "Academic", count: 23, href: "/forum/category/academic" },
  {
    name: "Clubs & Activities",
    count: 18,
    href: "/forum/category/clubs-activities",
  },
  { name: "Sports", count: 12, href: "/forum/category/sports" },
  { name: "Arts", count: 8, href: "/forum/category/arts" },
];

export function TopNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div id="top-navigation-div-1" data-testId="top-navigation-div-1" className="max-w-7xl mx-auto px-6">
        {/* Desktop Navigation */}
        <div id="top-navigation-div-2" data-testId="top-navigation-div-2" className="hidden lg:flex h-14 items-center justify-between">
          <div id="top-navigation-flex-3" data-testId="top-navigation-flex-3" className="flex items-center space-x-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link id="top-navigation-link-1" data-testId="top-navigation-link-1"
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
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

            {/* Forum Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button id="top-navigation-button-1" data-testId="top-navigation-button-1"
                  variant="ghost"
                  className="flex items-center gap-1 text-sm font-medium"
                >
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Forum Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {forumCategories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link id="top-navigation-link-2" data-testId="top-navigation-link-2"
                      href={category.href}
                      className="flex items-center justify-between"
                    >
                      <span id="top-navigation-span-1" data-testId="top-navigation-span-1">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Quick Actions */}
          <div id="top-navigation-flex-4" data-testId="top-navigation-flex-4" className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button id="top-navigation-button-2" data-testId="top-navigation-button-2" size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Create
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {quickActions.map((action) => (
                  <DropdownMenuItem key={action.name} asChild>
                    <Link id="top-navigation-link-3" data-testId="top-navigation-link-3"
                      href={action.href}
                      className="flex items-center gap-2"
                    >
                      <action.icon className="h-4 w-4" />
                      {action.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div id="top-navigation-flex-5" data-testId="top-navigation-flex-5" className="flex lg:hidden h-14 items-center justify-between">
          <div id="top-navigation-flex-6" data-testId="top-navigation-flex-6" className="flex items-center space-x-4">
            {navigation.slice(0, 3).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link id="top-navigation-link-4" data-testId="top-navigation-link-4"
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
                  <span id="top-navigation-span-2" data-testId="top-navigation-span-2" className="hidden sm:inline">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button id="top-navigation-button-3" data-testId="top-navigation-button-3" variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span id="top-navigation-span-3" data-testId="top-navigation-span-3" className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>
                  Access all sections and features
                </SheetDescription>
              </SheetHeader>
              <div id="top-navigation-div-7" data-testId="top-navigation-div-7" className="mt-6 space-y-6">
                {/* Main Navigation */}
                <div id="top-navigation-div-8" data-testId="top-navigation-div-8" className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Main
                  </h3>
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link id="top-navigation-link-5" data-testId="top-navigation-link-5"
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

                <Separator />

                {/* Quick Actions */}
                <div id="top-navigation-div-9" data-testId="top-navigation-div-9" className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Quick Actions
                  </h3>
                  {quickActions.map((action) => (
                    <Link id="top-navigation-link-6" data-testId="top-navigation-link-6"
                      key={action.name}
                      href={action.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      <action.icon className="h-4 w-4" />
                      {action.name}
                    </Link>
                  ))}
                </div>

                <Separator />

                {/* Forum Categories */}
                <div id="top-navigation-div-10" data-testId="top-navigation-div-10" className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Forum Categories
                  </h3>
                  {forumCategories.map((category) => (
                    <Link id="top-navigation-link-7" data-testId="top-navigation-link-7"
                      key={category.name}
                      href={category.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      <span id="top-navigation-span-4" data-testId="top-navigation-span-4">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
