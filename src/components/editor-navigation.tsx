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
  Edit,
  FolderOpen,
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
  { name: "Content Manager", href: "/content-manager", icon: FolderOpen },
  { name: "Leaderboard", href: "/leaderboard", icon: BarChart3 },
];

// const quickActions = [
//   { name: "New Publication", href: "/publications/create", icon: FileText },
//   { name: "Start Discussion", href: "/forum/create", icon: Hash },
//   { name: "Manage Categories", href: "/categories", icon: FolderOpen },
// ];

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

export function EditorNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-visible">
      <div id="editor-navigation-div-1" data-testId="editor-navigation-div-1" className="max-w-7xl mx-auto px-6">
        {/* Desktop Navigation */}
        <div id="editor-navigation-div-2" data-testId="editor-navigation-div-2" className="hidden lg:flex h-14 items-center justify-between">
          <div id="editor-navigation-flex-3" data-testId="editor-navigation-flex-3" className="flex items-center space-x-6">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Edit className="h-3 w-3 mr-1" />
              Editor
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
        </div>

        {/* Mobile Navigation */}
        <div id="editor-navigation-flex-4" data-testId="editor-navigation-flex-4" className="flex lg:hidden h-14 items-center justify-between">
          {/* Left side: Badge + Navigation (hidden when search is open) */}
          <div id="editor-navigation-div-5" data-testId="editor-navigation-div-5" className={cn(
            "flex items-center space-x-2 transition-all duration-300",
            searchOpen ? "opacity-0 pointer-events-none w-0 overflow-hidden" : "opacity-100 flex-1"
          )}>
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 text-xs shrink-0"
            >
              <Edit className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Editor</span>
            </Badge>
            
            <div id="editor-navigation-flex-6" data-testId="editor-navigation-flex-6" className="flex items-center space-x-1">
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-1 px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
                  pathname === "/"
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/content-manager"
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium rounded-md transition-colors border-2",
                      pathname === "/content-manager"
                        ? "bg-blue-100 text-blue-800 border-blue-300"
                        : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    )}
                  >
                    <FolderOpen className="h-4 w-4" />
                    <span className="hidden sm:inline font-semibold">Content</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  View submitted publications here.
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Search Area */}
          <div id="editor-navigation-div-7" data-testId="editor-navigation-div-7" className={cn(
            "flex items-center transition-all duration-300",
            searchOpen ? "flex-1" : "shrink-0"
          )}>
            {searchOpen ? (
              <div id="editor-navigation-flex-8" data-testId="editor-navigation-flex-8" className="flex items-center gap-2 w-full animate-in fade-in slide-in-from-right-2 duration-200">
                <div id="editor-navigation-div-9" data-testId="editor-navigation-div-9" className="flex-1">
                  <SearchBar placeholder="Search..." autoFocus onClose={() => setSearchOpen(false)} />
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
          <div id="editor-navigation-div-10" data-testId="editor-navigation-div-10" className={cn(
            "transition-all duration-300 shrink-0",
            searchOpen ? "opacity-0 pointer-events-none w-0 overflow-hidden ml-0" : "opacity-100 ml-2"
          )}>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Editor Navigation</SheetTitle>
                  <SheetDescription>
                    Content creation and management tools
                  </SheetDescription>
                </SheetHeader>
                <div id="editor-navigation-div-11" data-testId="editor-navigation-div-11" className="mt-6 space-y-6 pb-6">
                  {/* Main Navigation */}
                  <div id="editor-navigation-div-12" data-testId="editor-navigation-div-12" className="space-y-2">
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

                  {/* Forum Categories */}
                  <div id="editor-navigation-div-13" data-testId="editor-navigation-div-13" className="space-y-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Forum Categories
                    </h3>

                    {/* scrollable area */}
                    <div id="editor-navigation-div-14" data-testId="editor-navigation-div-14" className="max-h-56 overflow-y-auto pr-2 -mr-2 space-y-1">
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
//   Edit,
//   FolderOpen,
//   BarChart3,
// } from "lucide-react";
// import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";

// const navigation = [
//   { name: "Homepage", href: "/", icon: Home },
//   { name: "Publications", href: "/publications", icon: BookOpen },
//   { name: "Forum", href: "/forum", icon: MessageSquare },
//   { name: "Content Manager", href: "/content-manager", icon: FolderOpen },
//   { name: "Leaderboard", href: "/leaderboard", icon: BarChart3 },
// ];

// // const quickActions = [
// //   { name: "New Publication", href: "/publications/create", icon: FileText },
// //   { name: "Start Discussion", href: "/forum/create", icon: Hash },
// //   { name: "Manage Categories", href: "/categories", icon: FolderOpen },
// // ];

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

// export function EditorNavigation() {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <nav className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-visible">
//       <div id="editor-navigation-div-15" data-testId="editor-navigation-div-15" className="max-w-7xl mx-auto px-6">
//         {/* Desktop Navigation */}
//         <div id="editor-navigation-div-16" data-testId="editor-navigation-div-16" className="hidden lg:flex h-14 items-center justify-between">
//           <div id="editor-navigation-flex-17" data-testId="editor-navigation-flex-17" className="flex items-center space-x-6">
//             <Badge variant="secondary" className="bg-blue-100 text-blue-800">
//               <Edit className="h-3 w-3 mr-1" />
//               Editor
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
//                       : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
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
//         </div>

//         {/* Mobile Navigation */}
//         <div id="editor-navigation-flex-18" data-testId="editor-navigation-flex-18" className="flex lg:hidden h-14 items-center justify-between">
//           <div id="editor-navigation-flex-19" data-testId="editor-navigation-flex-19" className="flex items-center space-x-2">
//             <Badge
//               variant="secondary"
//               className="bg-blue-100 text-blue-800 text-xs"
//             >
//               <Edit className="h-3 w-3 mr-1" />
//               Editor
//             </Badge>
//             <Link
//               href="/"
//               className={cn(
//                 "flex items-center gap-1 px-2 py-1 text-sm font-medium rounded-md transition-colors",
//                 pathname === "/"
//                   ? "bg-secondary text-secondary-foreground"
//                   : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
//               )}
//             >
//               <Home className="h-4 w-4" />
//             </Link>
//             <Tooltip>
//               <TooltipTrigger>
//                 <Link
//                   href="/content-manager"
//                   className={cn(
//                     "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors border-2",
//                     pathname === "/content-manager"
//                       ? "bg-blue-100 text-blue-800 border-blue-300"
//                       : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
//                   )}
//                 >
//                   <FolderOpen className="h-4 w-4" />
//                   <span className="font-semibold">Content Manager</span>
//                 </Link>
//                 <TooltipContent>
//                   View submitted publications here.
//                 </TooltipContent>
//               </TooltipTrigger>
//             </Tooltip>
//           </div>

//           {/* Mobile Menu */}
//           <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost">
//                 <span className="text-xs">Menu</span>
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-80 overflow-y-auto">
//               <SheetHeader>
//                 <SheetTitle>Editor Navigation</SheetTitle>
//                 <SheetDescription>
//                   Content creation and management tools
//                 </SheetDescription>
//               </SheetHeader>
//               <div id="editor-navigation-div-20" data-testId="editor-navigation-div-20" className="mt-6 space-y-6 pb-6">
//                 {/* Main Navigation */}
//                 <div id="editor-navigation-div-21" data-testId="editor-navigation-div-21" className="space-y-2">
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
//                             : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
//                         )}
//                       >
//                         <item.icon className="h-4 w-4" />
//                         {item.name}
//                       </Link>
//                     );
//                   })}
//                 </div>

//                 <Separator />

//                 {/* Forum Categories */}
//                 <div id="editor-navigation-div-22" data-testId="editor-navigation-div-22" className="space-y-2">
//                   <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
//                     Forum Categories
//                   </h3>

//                   {/* scrollable area */}
//                   <div id="editor-navigation-div-23" data-testId="editor-navigation-div-23" className="max-h-56 overflow-y-auto pr-2 -mr-2 space-y-1">
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

