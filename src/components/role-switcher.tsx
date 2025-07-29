// "use client"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Badge } from "@/components/ui/badge";
// import { useRole } from "@/contexts/role-context";
// import { Shield, GraduationCap, Edit, Flag, ChevronDown } from "lucide-react";

// const roleConfig = {
//   ADMIN: { label: "Admin", icon: Shield, color: "bg-red-100 text-red-800" },
//   EDITOR: { label: "Editor", icon: Edit, color: "bg-blue-100 text-blue-800" },
//   MODERATOR: {
//     label: "Moderator",
//     icon: Flag,
//     color: "bg-purple-100 text-purple-800",
//   },
//   STUDENT: {
//     label: "Student",
//     icon: GraduationCap,
//     color: "bg-green-100 text-green-800",
//   },
// };

// export function RoleSwitcher() {
//   // const { user, setUser } = useRole();

//   // if (!user) return null;

//   // const currentRole = roleConfig[user.role];
//   // const CurrentIcon = currentRole.icon;

//   // const switchRole = (newRole: keyof typeof roleConfig) => {
//   //   setUser({
//   //     ...user,
//   //     role: newRole,
//   //   });
//   // };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="flex items-center gap-2">
//           <Badge className={currentRole.color}>
//             <CurrentIcon className="h-3 w-3 mr-1" />
//             {currentRole.label}
//           </Badge>
//           <ChevronDown className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuLabel>Switch Role (Demo)</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {/* {Object.entries(roleConfig).map(([role, config]) => {
//           const Icon = config.icon;
//           return (
//             <DropdownMenuItem
//               key={role}
//               onClick={() => switchRole(role as keyof typeof roleConfig)}
//               className="flex items-center gap-2"
//             >
//               <Icon className="h-4 w-4" />
//               {config.label}
//               {user.role === role && (
//                 <Badge variant="secondary" className="ml-auto text-xs">
//                   Current
//                 </Badge>
//               )}
//             </DropdownMenuItem>
//           );
//         })} */}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
