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
      style={{
        fontWeight: isActive ? "bold" : "normal",
        display: "flex",
        gap: "0.5rem",
      }}>
      <Icon />
      {children}
    </Link>
  );
};

export default NavLinks;
