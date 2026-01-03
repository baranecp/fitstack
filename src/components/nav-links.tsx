"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const NavLinks = ({
  slug,
  icon,
  children,
}: {
  slug: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) => {
  const segment = useSelectedLayoutSegment();
  const isActive = slug === segment;
  const Icon = icon;

  return (
    <Link
      href={`/${slug}`}
      className={`flex gap-2 px-6 py-3 border border-transparent rounded-md ${
        isActive
          ? "bg-nav-active-bg text-nav-active-text"
          : "text-nav-inactive hover:bg-nav-hover"
      } `}>
      <Icon />
      {children}
    </Link>
  );
};

export default NavLinks;
