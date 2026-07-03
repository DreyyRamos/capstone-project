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
  FileText,
  Hash,
  Menu,
  ChevronDown,
  Plus,
  Shield,
  Flag,
  BarChart3,
  Search,
  X,
} from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import SearchBar from "./search-bar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Homepage", href: "/", icon: Home },
  { name: "Publications", href: "/publications", icon: BookOpen },
  { name: "Forum", href: "/forum", icon: MessageSquare },
  { name: "Moderation", href: "/moderation", icon: Flag },
  { name: "Leaderboard", href: "/leaderboard", icon: BarChart3 },
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

export function ModeratorNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div id="moderator-navigation-div-1" data-testId="moderator-navigation-div-1" className="max-w-7xl mx-auto px-6">
        {/* Desktop Navigation */}
        <div id="moderator-navigation-div-2" data-testId="moderator-navigation-div-2" className="hidden lg:flex h-14 items-center justify-between">
          <div id="moderator-navigation-flex-3" data-testId="moderator-navigation-flex-3" className="flex items-center space-x-6">
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              <Shield className="h-3 w-3 mr-1" />
              Moderator
            </Badge>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link id="moderator-navigation-link-1" data-testId="moderator-navigation-link-1"
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
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

            {/* Forum Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button id="moderator-navigation-button-1" data-testId="moderator-navigation-button-1"
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
                    <Link id="moderator-navigation-link-2" data-testId="moderator-navigation-link-2"
                      href={category.href}
                      className="flex items-center justify-between"
                    >
                      <span id="moderator-navigation-span-1" data-testId="moderator-navigation-span-1">{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div id="moderator-navigation-flex-4" data-testId="moderator-navigation-flex-4" className="flex lg:hidden h-14 items-center justify-between">
          {/* Left side: Badge + Navigation (hidden when search is open) */}
          <div id="moderator-navigation-div-5" data-testId="moderator-navigation-div-5"
            className={cn(
              "flex items-center space-x-2 transition-all duration-300",
              searchOpen
                ? "opacity-0 pointer-events-none w-0 overflow-hidden"
                : "opacity-100 flex-1",
            )}
          >
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800 text-xs shrink-0"
            >
              <Shield className="h-3 w-3 mr-1" />
              <span id="moderator-navigation-span-2" data-testId="moderator-navigation-span-2" className="hidden sm:inline">Mod</span>
            </Badge>

            <div id="moderator-navigation-flex-6" data-testId="moderator-navigation-flex-6" className="flex items-center space-x-1">
              <Link id="moderator-navigation-link-3" data-testId="moderator-navigation-link-3"
                href="/"
                className={cn(
                  "flex items-center gap-1 px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
                  pathname === "/"
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
              >
                <Home className="h-4 w-4" />
                <span id="moderator-navigation-span-3" data-testId="moderator-navigation-span-3" className="hidden sm:inline">Home</span>
              </Link>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link id="moderator-navigation-link-4" data-testId="moderator-navigation-link-4"
                    href="/moderation"
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium rounded-md transition-colors border-2",
                      pathname === "/moderation"
                        ? "bg-purple-100 text-purple-800 border-purple-300"
                        : "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
                    )}
                  >
                    <Flag className="h-4 w-4" />
                    <span id="moderator-navigation-span-4" data-testId="moderator-navigation-span-4" className="hidden sm:inline font-semibold">
                      Moderation
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>View reported contents here</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Search Area */}
          <div id="moderator-navigation-div-7" data-testId="moderator-navigation-div-7"
            className={cn(
              "flex items-center transition-all duration-300",
              searchOpen ? "flex-1" : "shrink-0",
            )}
          >
            {searchOpen ? (
              <div id="moderator-navigation-flex-8" data-testId="moderator-navigation-flex-8" className="flex items-center gap-2 w-full animate-in fade-in slide-in-from-right-2 duration-200">
                <div id="moderator-navigation-div-9" data-testId="moderator-navigation-div-9" className="flex-1">
                  <SearchBar
                    placeholder="Search..."
                    autoFocus
                    onClose={() => setSearchOpen(false)}
                  />
                </div>
                <Button id="moderator-navigation-button-2" data-testId="moderator-navigation-button-2"
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(false)}
                  className="shrink-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button id="moderator-navigation-button-3" data-testId="moderator-navigation-button-3"
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
          <div id="moderator-navigation-div-10" data-testId="moderator-navigation-div-10"
            className={cn(
              "transition-all duration-300 shrink-0",
              searchOpen
                ? "opacity-0 pointer-events-none w-0 overflow-hidden ml-0"
                : "opacity-100 ml-2",
            )}
          >
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button id="moderator-navigation-button-4" data-testId="moderator-navigation-button-4" variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span id="moderator-navigation-span-5" data-testId="moderator-navigation-span-5" className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Moderator Navigation</SheetTitle>
                  <SheetDescription>
                    Content moderation and community management
                  </SheetDescription>
                </SheetHeader>
                <div id="moderator-navigation-div-11" data-testId="moderator-navigation-div-11" className="mt-6 space-y-6">
                  {/* Main Navigation */}
                  <div id="moderator-navigation-div-12" data-testId="moderator-navigation-div-12" className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Main
                    </h3>
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link id="moderator-navigation-link-5" data-testId="moderator-navigation-link-5"
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

                  <Separator />

                  {/* Forum Categories */}
                  <div id="moderator-navigation-div-13" data-testId="moderator-navigation-div-13" className="space-y-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Forum Categories
                    </h3>

                    {/* scrollable area */}
                    <div id="moderator-navigation-div-14" data-testId="moderator-navigation-div-14" className="max-h-56 overflow-y-auto pr-2 -mr-2 space-y-1">
                      {forumCategories.map((category) => (
                        <Link id="moderator-navigation-link-6" data-testId="moderator-navigation-link-6"
                          key={category.name}
                          href={category.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                        >
                          <span id="moderator-navigation-span-6" data-testId="moderator-navigation-span-6">{category.name}</span>
                        </Link>
                      ))}
                    </div>
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