// components/SearchBar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  User,
  FileText,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useSearch,
  useDebounce,
  User as SearchUser,
  Publication,
  Forum,
} from "@/hooks/useSearch";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onClose?: () => void;
}

export default function SearchBar({
  className,
  placeholder = "Search publications, forums, users...",
  autoFocus = false,
  onClose,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "all" | "users" | "publications" | "forums"
  >("all");

  const debouncedQuery = useDebounce(query, 300);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: results,
    isLoading,
    error,
  } = useSearch({
    query: debouncedQuery,
    type: selectedType,
    enabled: debouncedQuery.length >= 2,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Open dropdown when typing
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  // Auto-focus effect
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
    onClose?.();
  };

  const getDisplayName = (user: SearchUser) => {
    return (
      `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const totalResults = results?.total || 0;

  return (
    <div id="search-bar-div-1" data-testId="search-bar-div-1" ref={searchRef} className={cn("relative", className)}>
      <div id="search-bar-div-2" data-testId="search-bar-div-2" className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (debouncedQuery.length >= 2) setIsOpen(true);
          }}
          className="pl-10 pr-10 w-full"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {isOpen && (
        <div id="search-bar-div-3" data-testId="search-bar-div-3" className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg z-50">
          {/* Search Type Filters - Scrollable on mobile */}
          <div id="search-bar-div-4" data-testId="search-bar-div-4" className="p-3 border-b">
            <div id="search-bar-flex-5" data-testId="search-bar-flex-5" className="flex gap-1 overflow-x-auto scrollbar-hide pb-1 -mb-1">
              {[
                { key: "all", label: "All", count: totalResults },
                {
                  key: "users",
                  label: "Users",
                  count: results?.users.length || 0,
                },
                {
                  key: "publications",
                  label: "Publications",
                  count: results?.publications.length || 0,
                },
                {
                  key: "forums",
                  label: "Forums",
                  count: results?.forums.length || 0,
                },
              ].map(({ key, label, count }) => (
                <Button
                  key={key}
                  variant={selectedType === key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedType(key as any)}
                  className="h-7 text-xs whitespace-nowrap shrink-0"
                >
                  {label} {count > 0 && `(${count})`}
                </Button>
              ))}
            </div>
          </div>

          <div id="search-bar-div-6" data-testId="search-bar-div-6" className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div id="search-bar-div-7" data-testId="search-bar-div-7" className="p-4 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Searching...</p>
              </div>
            ) : error ? (
              <div id="search-bar-div-8" data-testId="search-bar-div-8" className="p-4 text-center text-red-500">
                <p className="text-sm">
                  Something went wrong. Please try again.
                </p>
              </div>
            ) : totalResults === 0 && debouncedQuery.length >= 2 ? (
              <div id="search-bar-div-9" data-testId="search-bar-div-9" className="p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  No results found for &quot;{debouncedQuery}&quot;
                </p>
              </div>
            ) : (
              <div id="search-bar-div-10" data-testId="search-bar-div-10" className="py-2">
                {/* Users Section */}
                {(selectedType === "all" || selectedType === "users") &&
                  results?.users &&
                  results.users.length > 0 && (
                    <div id="search-bar-div-11" data-testId="search-bar-div-11">
                      <div id="search-bar-flex-12" data-testId="search-bar-flex-12" className="px-3 py-2 text-xs font-medium text-muted-foreground flex items-center gap-2">
                        <User className="h-3 w-3" />
                        Users ({results.users.length})
                      </div>
                      {results.users.map((user) => (
                        <Link
                          key={user.id}
                          href={`/visit/user/${user.id}`}
                          onClick={handleResultClick}
                          className="block px-3 py-2 hover:bg-muted/50 transition-colors"
                        >
                          <div id="search-bar-flex-13" data-testId="search-bar-flex-13" className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.profileImage || ""} />
                              <AvatarFallback className="text-xs">
                                {getDisplayName(user).charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div id="search-bar-div-14" data-testId="search-bar-div-14" className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {getDisplayName(user)}
                              </p>
                              <div id="search-bar-flex-15" data-testId="search-bar-flex-15" className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {user.role}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {user.reputationPoints} pts
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                {/* Publications Section */}
                {(selectedType === "all" || selectedType === "publications") &&
                  results?.publications &&
                  results.publications.length > 0 && (
                    <div id="search-bar-div-16" data-testId="search-bar-div-16">
                      <div id="search-bar-flex-17" data-testId="search-bar-flex-17" className="px-3 py-2 text-xs font-medium text-muted-foreground flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        Publications ({results.publications.length})
                      </div>
                      {results.publications.map((publication) => (
                        <Link
                          key={publication.pubId}
                          href={`/publications/${publication.pubId}`}
                          onClick={handleResultClick}
                          className="block px-3 py-2 hover:bg-muted/50 transition-colors"
                        >
                          <div id="search-bar-flex-18" data-testId="search-bar-flex-18" className="flex gap-3">
                            {publication.imageUrl && (
                              <img
                                src={publication.imageUrl}
                                alt=""
                                className="h-12 w-12 object-cover rounded shrink-0"
                              />
                            )}
                            <div id="search-bar-div-19" data-testId="search-bar-div-19" className="flex-1 min-w-0">
                              <div id="search-bar-flex-20" data-testId="search-bar-flex-20" className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-medium truncate">
                                  {publication.title}
                                </h4>
                                {publication.isFeatured && (
                                  <Badge variant="default" className="text-xs shrink-0">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                                {publication.excerpt}
                              </p>
                              <div id="search-bar-flex-21" data-testId="search-bar-flex-21" className="flex items-center justify-between flex-wrap gap-1">
                                <p className="text-xs text-muted-foreground">
                                  by {getDisplayName(publication.author as any)}{" "}
                                  • {formatDate(publication.updatedAt)}
                                </p>
                                <div id="search-bar-flex-22" data-testId="search-bar-flex-22" className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>
                                    {publication._count.pubLikes} likes
                                  </span>
                                  <span>
                                    {publication._count.pubComments} comments
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                {/* Forums Section */}
                {(selectedType === "all" || selectedType === "forums") &&
                  results?.forums &&
                  results.forums.length > 0 && (
                    <div id="search-bar-div-23" data-testId="search-bar-div-23">
                      <div id="search-bar-flex-24" data-testId="search-bar-flex-24" className="px-3 py-2 text-xs font-medium text-muted-foreground flex items-center gap-2">
                        <MessageSquare className="h-3 w-3" />
                        Forums ({results.forums.length})
                      </div>
                      {results.forums.map((forum) => (
                        <Link
                          key={forum.forumId}
                          href={`/forum/topic/${forum.forumId}`}
                          onClick={handleResultClick}
                          className="block px-3 py-2 hover:bg-muted/50 transition-colors"
                        >
                          <div id="search-bar-flex-25" data-testId="search-bar-flex-25" className="flex gap-3">
                            {forum.imageUrl && (
                              <img
                                src={forum.imageUrl}
                                alt=""
                                className="h-12 w-12 object-cover rounded shrink-0"
                              />
                            )}
                            <div id="search-bar-div-26" data-testId="search-bar-div-26" className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium truncate mb-1">
                                {forum.topicTitle}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                                {forum.description}
                              </p>
                              <div id="search-bar-flex-27" data-testId="search-bar-flex-27" className="flex items-center justify-between flex-wrap gap-1">
                                <p className="text-xs text-muted-foreground">
                                  by {getDisplayName(forum.author as any)} •{" "}
                                  {formatDate(forum.updatedAt)}
                                </p>
                                <div id="search-bar-flex-28" data-testId="search-bar-flex-28" className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{forum._count.forumLikes} likes</span>
                                  <span>
                                    {forum._count.forumComments} comments
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            )}
          </div>

          {totalResults > 0 && (
            <div id="search-bar-div-29" data-testId="search-bar-div-29" className="p-3 border-t">
              <Link
                href={`/search-results?q=${encodeURIComponent(
                  debouncedQuery
                )}&type=${selectedType}`}
                onClick={handleResultClick}
                className="text-sm text-primary hover:underline"
              >
                View all {totalResults} results →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// // components/SearchBar.tsx
// "use client";

// import { useState, useRef, useEffect } from "react";
// import {
//   Search,
//   X,
//   User,
//   FileText,
//   MessageSquare,
//   Loader2,
// } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   useSearch,
//   useDebounce,
//   User as SearchUser,
//   Publication,
//   Forum,
// } from "@/hooks/useSearch";
// import Link from "next/link";
// import { cn } from "@/lib/utils";

// interface SearchBarProps {
//   className?: string;
//   placeholder?: string;
// }

// export default function SearchBar({
//   className,
//   placeholder = "Search publications, forums, users...",
// }: SearchBarProps) {
//   const [query, setQuery] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedType, setSelectedType] = useState<
//     "all" | "users" | "publications" | "forums"
//   >("all");

//   const debouncedQuery = useDebounce(query, 300);
//   const searchRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const {
//     data: results,
//     isLoading,
//     error,
//   } = useSearch({
//     query: debouncedQuery,
//     type: selectedType,
//     enabled: debouncedQuery.length >= 2,
//   });

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Open dropdown when typing
//   useEffect(() => {
//     if (debouncedQuery.length >= 2) {
//       setIsOpen(true);
//     } else {
//       setIsOpen(false);
//     }
//   }, [debouncedQuery]);

//   const handleClear = () => {
//     setQuery("");
//     setIsOpen(false);
//     inputRef.current?.focus();
//   };

//   const handleResultClick = () => {
//     setIsOpen(false);
//     setQuery("");
//   };

//   const getDisplayName = (user: SearchUser) => {
//     return (
//       `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email
//     );
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   const totalResults = results?.total || 0;

//   return (
//     <div id="search-bar-div-30" data-testId="search-bar-div-30" ref={searchRef} className={cn("relative", className)}>
//       <div id="search-bar-div-31" data-testId="search-bar-div-31" className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//         <Input
//           ref={inputRef}
//           placeholder={placeholder}
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => {
//             if (debouncedQuery.length >= 2) setIsOpen(true);
//           }}
//           className="pl-10 pr-10 w-64"
//         />
//         {query && (
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={handleClear}
//             className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
//           >
//             <X className="h-3 w-3" />
//           </Button>
//         )}
//       </div>

//       {isOpen && (
//         <div id="search-bar-div-32" data-testId="search-bar-div-32" className="absolute top-full mt-1 w-96 bg-background border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
//           {/* Search Type Filters */}
//           <div id="search-bar-div-33" data-testId="search-bar-div-33" className="p-3 border-b">
//             <div id="search-bar-flex-34" data-testId="search-bar-flex-34" className="flex gap-1">
//               {[
//                 { key: "all", label: "All", count: totalResults },
//                 {
//                   key: "users",
//                   label: "Users",
//                   count: results?.users.length || 0,
//                 },
//                 {
//                   key: "publications",
//                   label: "Publications",
//                   count: results?.publications.length || 0,
//                 },
//                 {
//                   key: "forums",
//                   label: "Forums",
//                   count: results?.forums.length || 0,
//                 },
//               ].map(({ key, label, count }) => (
//                 <Button
//                   key={key}
//                   variant={selectedType === key ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setSelectedType(key as any)}
//                   className="h-7 text-xs"
//                 >
//                   {label} {count > 0 && `(${count})`}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           <div id="search-bar-div-35" data-testId="search-bar-div-35" className="max-h-80 overflow-y-auto">
//             {isLoading ? (
//               <div id="search-bar-div-36" data-testId="search-bar-div-36" className="p-4 text-center">
//                 <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
//                 <p className="text-sm text-muted-foreground">Searching...</p>
//               </div>
//             ) : error ? (
//               <div id="search-bar-div-37" data-testId="search-bar-div-37" className="p-4 text-center text-red-500">
//                 <p className="text-sm">
//                   Something went wrong. Please try again.
//                 </p>
//               </div>
//             ) : totalResults === 0 && debouncedQuery.length >= 2 ? (
//               <div id="search-bar-div-38" data-testId="search-bar-div-38" className="p-4 text-center">
//                 <p className="text-sm text-muted-foreground">
//                   No results found for &quot;{debouncedQuery}&quot;
//                 </p>
//               </div>
//             ) : (
//               <div id="search-bar-div-39" data-testId="search-bar-div-39" className="py-2">
//                 {/* Users Section */}
//                 {(selectedType === "all" || selectedType === "users") &&
//                   results?.users &&
//                   results.users.length > 0 && (
//                     <div id="search-bar-div-40" data-testId="search-bar-div-40">
//                       <div id="search-bar-flex-41" data-testId="search-bar-flex-41" className="px-3 py-2 text-xs font-medium text-muted-foreground flex items-center gap-2">
//                         <User className="h-3 w-3" />
//                         Users ({results.users.length})
//                       </div>
//                       {results.users.map((user) => (
//                         <Link
//                           key={user.id}
//                           href={`/visit/user/${user.id}`}
//                           onClick={handleResultClick}
//                           className="block px-3 py-2 hover:bg-muted/50 transition-colors"
//                         >
//                           <div id="search-bar-flex-42" data-testId="search-bar-flex-42" className="flex items-center gap-3">
//                             <Avatar className="h-8 w-8">
//                               <AvatarImage src={user.profileImage || ""} />
//                               <AvatarFallback className="text-xs">
//                                 {getDisplayName(user).charAt(0).toUpperCase()}
//                               </AvatarFallback>
//                             </Avatar>
//                             <div id="search-bar-div-43" data-testId="search-bar-div-43" className="flex-1 min-w-0">
//                               <p className="text-sm font-medium truncate">
//                                 {getDisplayName(user)}
//                               </p>
//                               <div id="search-bar-flex-44" data-testId="search-bar-flex-44" className="flex items-center gap-2 mt-1">
//                                 <Badge variant="secondary" className="text-xs">
//                                   {user.role}
//                                 </Badge>
//                                 <span className="text-xs text-muted-foreground">
//                                   {user.reputationPoints} pts
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       ))}
//                     </div>
//                   )}

//                 {/* Publications Section */}
//                 {(selectedType === "all" || selectedType === "publications") &&
//                   results?.publications &&
//                   results.publications.length > 0 && (
//                     <div id="search-bar-div-45" data-testId="search-bar-div-45">
//                       <div id="search-bar-flex-46" data-testId="search-bar-flex-46" className="px-3 py-2 text-xs font-medium text-muted-foreground flex items-center gap-2">
//                         <FileText className="h-3 w-3" />
//                         Publications ({results.publications.length})
//                       </div>
//                       {results.publications.map((publication) => (
//                         <Link
//                           key={publication.pubId}
//                           href={`/publications/${publication.pubId}`}
//                           onClick={handleResultClick}
//                           className="block px-3 py-2 hover:bg-muted/50 transition-colors"
//                         >
//                           <div id="search-bar-flex-47" data-testId="search-bar-flex-47" className="flex gap-3">
//                             {publication.imageUrl && (
//                               <img
//                                 src={publication.imageUrl}
//                                 alt=""
//                                 className="h-12 w-12 object-cover rounded"
//                               />
//                             )}
//                             <div id="search-bar-div-48" data-testId="search-bar-div-48" className="flex-1 min-w-0">
//                               <div id="search-bar-flex-49" data-testId="search-bar-flex-49" className="flex items-center gap-2 mb-1">
//                                 <h4 className="text-sm font-medium truncate">
//                                   {publication.title}
//                                 </h4>
//                                 {publication.isFeatured && (
//                                   <Badge variant="default" className="text-xs">
//                                     Featured
//                                   </Badge>
//                                 )}
//                               </div>
//                               <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
//                                 {publication.excerpt}
//                               </p>
//                               <div id="search-bar-flex-50" data-testId="search-bar-flex-50" className="flex items-center justify-between">
//                                 <p className="text-xs text-muted-foreground">
//                                   by {getDisplayName(publication.author as any)}{" "}
//                                   • {formatDate(publication.updatedAt)}
//                                 </p>
//                                 <div id="search-bar-flex-51" data-testId="search-bar-flex-51" className="flex items-center gap-2 text-xs text-muted-foreground">
//                                   <span>
//                                     {publication._count.pubLikes} likes
//                                   </span>
//                                   <span>
//                                     {publication._count.pubComments} comments
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       ))}
//                     </div>
//                   )}

//                 {/* Forums Section */}
//                 {(selectedType === "all" || selectedType === "forums") &&
//                   results?.forums &&
//                   results.forums.length > 0 && (
//                     <div id="search-bar-div-52" data-testId="search-bar-div-52">
//                       <div id="search-bar-flex-53" data-testId="search-bar-flex-53" className="px-3 py-2 text-xs font-medium text-muted-foreground flex items-center gap-2">
//                         <MessageSquare className="h-3 w-3" />
//                         Forums ({results.forums.length})
//                       </div>
//                       {results.forums.map((forum) => (
//                         <Link
//                           key={forum.forumId}
//                           href={`/forum/topic/${forum.forumId}`}
//                           onClick={handleResultClick}
//                           className="block px-3 py-2 hover:bg-muted/50 transition-colors"
//                         >
//                           <div id="search-bar-flex-54" data-testId="search-bar-flex-54" className="flex gap-3">
//                             {forum.imageUrl && (
//                               <img
//                                 src={forum.imageUrl}
//                                 alt=""
//                                 className="h-12 w-12 object-cover rounded"
//                               />
//                             )}
//                             <div id="search-bar-div-55" data-testId="search-bar-div-55" className="flex-1 min-w-0">
//                               <h4 className="text-sm font-medium truncate mb-1">
//                                 {forum.topicTitle}
//                               </h4>
//                               <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
//                                 {forum.description}
//                               </p>
//                               <div id="search-bar-flex-56" data-testId="search-bar-flex-56" className="flex items-center justify-between">
//                                 <p className="text-xs text-muted-foreground">
//                                   by {getDisplayName(forum.author as any)} •{" "}
//                                   {formatDate(forum.updatedAt)}
//                                 </p>
//                                 <div id="search-bar-flex-57" data-testId="search-bar-flex-57" className="flex items-center gap-2 text-xs text-muted-foreground">
//                                   <span>{forum._count.forumLikes} likes</span>
//                                   <span>
//                                     {forum._count.forumComments} comments
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//               </div>
//             )}
//           </div>

//           {totalResults > 0 && (
//             <div id="search-bar-div-58" data-testId="search-bar-div-58" className="p-3 border-t">
//               <Link
//                 href={`/search-results?q=${encodeURIComponent(
//                   debouncedQuery
//                 )}&type=${selectedType}`}
//                 onClick={handleResultClick}
//                 className="text-sm text-primary hover:underline"
//               >
//                 View all {totalResults} results →
//               </Link>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
