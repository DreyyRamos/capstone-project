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
  FileText,
  Hash,
  Menu,
  ChevronDown,
  Plus,
  GraduationCap,
  ChartArea,
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
  { name: "Leaderboard", href: "/leaderboard", icon: ChartArea },
];

const quickActions = [
  { name: "New Publication", href: "/publications/create", icon: FileText },
  { name: "Start Discussion", href: "/forum/create", icon: Hash },
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

export function StudentNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div id="student-navigation-div-1" data-testId="student-navigation-div-1" className="max-w-7xl mx-auto px-6">
        {/* Desktop Navigation */}
        <div id="student-navigation-div-2" data-testId="student-navigation-div-2" className="hidden lg:flex h-14 items-center justify-between">
          <div id="student-navigation-flex-3" data-testId="student-navigation-flex-3" className="flex items-center space-x-6">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <GraduationCap className="h-3 w-3 mr-1" />
              Student
            </Badge>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
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
          <div id="student-navigation-flex-4" data-testId="student-navigation-flex-4" className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="flex items-center gap-1">
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
                    <Link
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
        <div id="student-navigation-flex-5" data-testId="student-navigation-flex-5" className="flex lg:hidden h-14 items-center justify-between">
          {/* Left side: Badge + Navigation (hidden when search is open) */}
          <div id="student-navigation-div-6" data-testId="student-navigation-div-6" className={cn(
            "flex items-center space-x-2 sm:space-x-4 transition-all duration-300",
            searchOpen ? "opacity-0 pointer-events-none w-0 overflow-hidden" : "opacity-100 flex-1"
          )}>
            <Badge variant="secondary" className="bg-green-100 text-green-800 shrink-0">
              <GraduationCap className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Student</span>
            </Badge>

            <div id="student-navigation-flex-7" data-testId="student-navigation-flex-7" className="flex items-center space-x-1 sm:space-x-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
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
                    <span className="hidden sm:inline">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Search Area */}
          <div id="student-navigation-div-8" data-testId="student-navigation-div-8" className={cn(
            "flex items-center transition-all duration-300",
            searchOpen ? "flex-1" : "shrink-0"
          )}>
            {searchOpen ? (
              <div id="student-navigation-flex-9" data-testId="student-navigation-flex-9" className="flex items-center gap-2 w-full animate-in fade-in slide-in-from-right-2 duration-200">
                <div id="student-navigation-div-10" data-testId="student-navigation-div-10" className="flex-1">
                  <SearchBar placeholder="Search publications, forums..." />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(false)}
                  className="shrink-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
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
          <div id="student-navigation-div-11" data-testId="student-navigation-div-11" className={cn(
            "transition-all duration-300 shrink-0",
            searchOpen ? "opacity-0 pointer-events-none w-0 overflow-hidden ml-0" : "opacity-100 ml-2"
          )}>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-visible">
                <SheetHeader>
                  <SheetTitle>Student Navigation</SheetTitle>
                  <SheetDescription>
                    Access publications and participate in discussions
                  </SheetDescription>
                </SheetHeader>

                <div id="student-navigation-div-12" data-testId="student-navigation-div-12" className="mt-4 space-y-6">
                  {/* Main Navigation */}
                  <div id="student-navigation-div-13" data-testId="student-navigation-div-13" className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Main
                    </h3>
                    {navigation.map((item) => {
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

                  {/* Quick Actions */}
                  <div id="student-navigation-div-14" data-testId="student-navigation-div-14" className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Quick Actions
                    </h3>
                    {quickActions.map((action) => (
                      <Link
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
                  <div id="student-navigation-div-15" data-testId="student-navigation-div-15" className="space-y-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Forum Categories
                    </h3>
                    <div id="student-navigation-div-16" data-testId="student-navigation-div-16" className="max-h-56 overflow-y-auto pr-2 -mr-2 space-y-1">
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}


// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { Separator } from "@/components/ui/separator"
// import {
//   Home,
//   BookOpen,
//   MessageSquare,
//   FileText,
//   Hash,
//   Menu,
//   ChevronDown,
//   Plus,
//   GraduationCap,
//   ChartArea,
// } from "lucide-react";
// import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
// import SearchBar from "./search-bar";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";

// const navigation = [
//   { name: "Homepage", href: "/", icon: Home },
//   { name: "Publications", href: "/publications", icon: BookOpen },
//   { name: "Forum", href: "/forum", icon: MessageSquare },
//   { name: "Leaderboard", href: "/leaderboard", icon: ChartArea },
// ];

// const quickActions = [
//   { name: "New Publication", href: "/publications/create", icon: FileText },
//   { name: "Start Discussion", href: "/forum/create", icon: Hash },
// ];

// const slugify = (str: string) => {
//   return str;
// };

// const forumCategories = [
//   { name: "General Discussion" },
//   { name: "Academic" },
//   { name: "Clubs & Activities" },
//   { name: "Sports" },
//   { name: "Arts & Culture" },
//   { name: "Technology" },
//   { name: "Study Groups" },
//   { name: "Events" },
//   { name: "Help & Support" },
//   { name: "Uncategorized" },
// ].map((cat) => ({
//   ...cat,
//   href: `/forum/category/${slugify(cat.name)}`,
// }));

// export function StudentNavigation() {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <nav className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div id="student-navigation-div-17" data-testId="student-navigation-div-17" className="max-w-7xl mx-auto px-6">
//         {/* Desktop Navigation */}
//         <div id="student-navigation-div-18" data-testId="student-navigation-div-18" className="hidden lg:flex h-14 items-center justify-between">
//           <div id="student-navigation-flex-19" data-testId="student-navigation-flex-19" className="flex items-center space-x-6">
//             <Badge variant="secondary" className="bg-green-100 text-green-800">
//               <GraduationCap className="h-3 w-3 mr-1" />
//               Student
//             </Badge>
//             {navigation.map((item) => {
//               const isActive = pathname === item.href;
//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={cn(
//                     "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
//                     isActive
//                       ? "bg-secondary text-secondary-foreground"
//                       : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
//                   )}
//                 >
//                   <item.icon className="h-4 w-4" />
//                   {item.name}
//                 </Link>
//               );
//             })}

//             {/* Forum Categories Dropdown */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   className="flex items-center gap-1 text-sm font-medium"
//                 >
//                   Forum Categories
//                   <ChevronDown className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="start" className="w-56">
//                 <DropdownMenuLabel>Forum Categories</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 {forumCategories.map((category) => (
//                   <DropdownMenuItem key={category.name} asChild>
//                     <Link
//                       href={category.href}
//                       className="flex items-center justify-between"
//                     >
//                       <span>{category.name}</span>
//                     </Link>
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>

//           {/* Quick Actions */}
//           <div id="student-navigation-flex-20" data-testId="student-navigation-flex-20" className="flex items-center space-x-2">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button size="sm" className="flex items-center gap-1">
//                   <Plus className="h-4 w-4" />
//                   Create
//                   <ChevronDown className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 {quickActions.map((action) => (
//                   <DropdownMenuItem key={action.name} asChild>
//                     <Link
//                       href={action.href}
//                       className="flex items-center gap-2"
//                     >
//                       <action.icon className="h-4 w-4" />
//                       {action.name}
//                     </Link>
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <div id="student-navigation-flex-21" data-testId="student-navigation-flex-21" className="flex lg:hidden h-14 items-center justify-between">
//           <div id="student-navigation-flex-22" data-testId="student-navigation-flex-22" className="flex items-center space-x-4">
//             <Badge variant="secondary" className="bg-green-100 text-green-800">
//               <GraduationCap className="h-3 w-3 mr-1" />
//               Student
//             </Badge>

//             <div id="student-navigation-div-23" data-testId="student-navigation-div-23" className="px-4 py-3 relative z-50">
//               <SearchBar placeholder="Search publications, forums..." />
//             </div>
//             {navigation.map((item) => {
//               const isActive = pathname === item.href;
//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={cn(
//                     "flex items-center gap-1 px-2 py-1 text-sm font-medium rounded-md transition-colors",
//                     isActive
//                       ? "bg-secondary text-secondary-foreground"
//                       : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
//                   )}
//                 >
//                   <item.icon className="h-4 w-4" />
//                   <span className="hidden sm:inline">{item.name}</span>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Mobile Menu */}
//           <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost">
//                 <span className="text-xs">Menu</span>
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-80 overflow-visible">
//               <SheetHeader>
//                 <SheetTitle>Student Navigation</SheetTitle>
//                 <SheetDescription>
//                   Access publications and participate in discussions
//                 </SheetDescription>
//               </SheetHeader>

//               <div id="student-navigation-div-24" data-testId="student-navigation-div-24" className="mt-4 space-y-6">
//                 {/* Main Navigation */}
//                 <div id="student-navigation-div-25" data-testId="student-navigation-div-25" className="space-y-2">
//                   <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
//                     Main
//                   </h3>
//                   {navigation.map((item) => {
//                     const isActive = pathname === item.href;
//                     return (
//                       <Link
//                         key={item.name}
//                         href={item.href}
//                         onClick={() => setMobileMenuOpen(false)}
//                         className={cn(
//                           "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
//                           isActive
//                             ? "bg-secondary text-secondary-foreground"
//                             : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
//                         )}
//                       >
//                         <item.icon className="h-4 w-4" />
//                         {item.name}
//                       </Link>
//                     );
//                   })}
//                 </div>

//                 <Separator />

//                 {/* Quick Actions */}
//                 <div id="student-navigation-div-26" data-testId="student-navigation-div-26" className="space-y-2">
//                   <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
//                     Quick Actions
//                   </h3>
//                   {quickActions.map((action) => (
//                     <Link
//                       key={action.name}
//                       href={action.href}
//                       onClick={() => setMobileMenuOpen(false)}
//                       className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
//                     >
//                       <action.icon className="h-4 w-4" />
//                       {action.name}
//                     </Link>
//                   ))}
//                 </div>

//                 <Separator />

//                 {/* Forum Categories */}
//                 <div id="student-navigation-div-27" data-testId="student-navigation-div-27" className="space-y-2">
//                   <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//                     Forum Categories
//                   </h3>
//                   <div id="student-navigation-div-28" data-testId="student-navigation-div-28" className="max-h-56 overflow-y-auto pr-2 -mr-2 space-y-1">
//                     {forumCategories.map((category) => (
//                       <Link
//                         key={category.name}
//                         href={category.href}
//                         onClick={() => setMobileMenuOpen(false)}
//                         className="flex items-center justify-between px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
//                       >
//                         <span>{category.name}</span>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   );
// }
