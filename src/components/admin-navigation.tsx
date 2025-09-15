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
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Moderation",
    href: "/moderation",
    icon: Shield,
  },
  {
    title: "Content Manager",
    href: "/content",
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
  { name: "General Discussion", count: 45 },
  { name: "Academic", count: 23 },
  { name: "Clubs & Activities", count: 18 },
  { name: "Sports", count: 12 },
  { name: "Arts & Culture", count: 8 },
  { name: "Technology", count: 8 },
  { name: "Study Groups", count: 8 },
  { name: "Events", count: 8 },
  { name: "Help & Support", count: 8 },
  { name: "Uncategorized", count: 8 },
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
                <DropdownMenuItem>Add User</DropdownMenuItem>
                <DropdownMenuItem>Create Announcement</DropdownMenuItem>
                <DropdownMenuItem>Moderate Content</DropdownMenuItem>
                <DropdownMenuItem>Generate Report</DropdownMenuItem>
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
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
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
        <div className="flex lg:hidden h-14 items-center justify-between">
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
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Forum Categories
                  </h3>
                  {forumCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Link>
                  ))}
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
//   Users,
//   TrendingUp,
//   FileText,
//   Hash,
//   Menu,
//   ChevronDown,
//   Plus,
//   Shield,
// } from "lucide-react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"

// const navigation = [
//   { name: "Dashboard", href: "/", icon: Home },
//   { name: "Publications", href: "/publications", icon: BookOpen },
//   { name: "Forum", href: "/forum", icon: MessageSquare },
//   { name: "Users", href: "/users", icon: Users },
//   { name: "Analytics", href: "/analytics", icon: TrendingUp },
// ]

// const quickActions = [
//   { name: "New Publication", href: "/publications/create", icon: FileText },
//   { name: "Start Discussion", href: "/forum/create", icon: Hash },
//   { name: "Manage Users", href: "/users", icon: Users },
// ]

// const forumCategories = [
//   { name: "General Discussion", count: 45, href: "/forum/category/general-discussion" },
//   { name: "Academic", count: 23, href: "/forum/category/academic" },
//   { name: "Clubs & Activities", count: 18, href: "/forum/category/clubs-activities" },
//   { name: "Sports", count: 12, href: "/forum/category/sports" },
//   { name: "Arts", count: 8, href: "/forum/category/arts" },
// ]

// export function AdminNavigation() {
//   const pathname = usePathname()
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   return (
//     <nav className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Desktop Navigation */}
//         <div className="hidden lg:flex h-14 items-center justify-between">
//           <div className="flex items-center space-x-6">
//             <Badge variant="secondary" className="bg-red-100 text-red-800">
//               <Shield className="h-3 w-3 mr-1" />
//               Admin
//             </Badge>
//             {navigation.map((item) => {
//               const isActive = pathname === item.href
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
//               )
//             })}

//             {/* Forum Categories Dropdown */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="flex items-center gap-1 text-sm font-medium">
//                   Categories
//                   <ChevronDown className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="start" className="w-56">
//                 <DropdownMenuLabel>Forum Categories</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 {forumCategories.map((category) => (
//                   <DropdownMenuItem key={category.name} asChild>
//                     <Link href={category.href} className="flex items-center justify-between">
//                       <span>{category.name}</span>
//                       <Badge variant="secondary" className="text-xs">
//                         {category.count}
//                       </Badge>
//                     </Link>
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>

//           {/* Quick Actions */}
//           <div className="flex items-center space-x-2">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button size="sm" className="flex items-center gap-1">
//                   <Plus className="h-4 w-4" />
//                   Admin Actions
//                   <ChevronDown className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>Admin Actions</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 {quickActions.map((action) => (
//                   <DropdownMenuItem key={action.name} asChild>
//                     <Link href={action.href} className="flex items-center gap-2">
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
//         <div className="flex lg:hidden h-14 items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Badge variant="secondary" className="bg-red-100 text-red-800">
//               <Shield className="h-3 w-3 mr-1" />
//               Admin
//             </Badge>
//             {navigation.slice(0, 2).map((item) => {
//               const isActive = pathname === item.href
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
//               )
//             })}
//           </div>

//           {/* Mobile Menu */}
//           <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-80">
//               <SheetHeader>
//                 <SheetTitle>Admin Navigation</SheetTitle>
//                 <SheetDescription>Full administrative access</SheetDescription>
//               </SheetHeader>
//               <div className="mt-6 space-y-6">
//                 {/* Main Navigation */}
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Main</h3>
//                   {navigation.map((item) => {
//                     const isActive = pathname === item.href
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
//                     )
//                   })}
//                 </div>

//                 <Separator />

//                 {/* Quick Actions */}
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
//                     Admin Actions
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
//                 <div className="space-y-2">
//                   <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
//                     Forum Categories
//                   </h3>
//                   {forumCategories.map((category) => (
//                     <Link
//                       key={category.name}
//                       href={category.href}
//                       onClick={() => setMobileMenuOpen(false)}
//                       className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
//                     >
//                       <span>{category.name}</span>
//                       <Badge variant="secondary" className="text-xs">
//                         {category.count}
//                       </Badge>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   )
// }
