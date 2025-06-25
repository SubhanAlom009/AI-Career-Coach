import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarIcon,
} from "lucide-react";
import { checkUser } from "@/lib/checkUser";

async function Header() {
  await checkUser();
  // This function checks if the user is logged in and creates a new user in the database if they are not.
  // It is called here to ensure that the user is checked before rendering the header.

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 border-b backdrop-blur-md supports-[backdrop-filter]:bg-background/60 p-4 shadow-md">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href={"/"} className="text-lg font-bold">
          <Image src={"/logo.png"} alt="logo" width={100} height={100} />
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href={"/dashboard"} className="ml-4 text-lg font-bold">
              <Button
                variant={"outline"}
                className="flex items-center cursor-pointer"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block">Industry Insights</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="cursor-pointer flex items-center">
                  <StarIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    href={"/resume"}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Build Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={"/ai-cover-letter"}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <PenBox className="mr-2 h-4 w-4" />
                    <span>Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={"/interview"}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <GraduationCap className="mr-2 h-4 w-4" />
                    <span>Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant={"outline"} className="px-4 cursor-pointer py-2 text-sm font-medium bg-primary text-white rounded">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-12 w-12",
                  userButtonAvatarImage: "h-8 w-8 rounded-full",
                  userButtonPopoverCard: "w-48",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Header;
