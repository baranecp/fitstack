"use client";

import {
  Home,
  Dumbbell,
  UtensilsCrossed,
  CalendarDays,
  User,
} from "lucide-react";
import NavLinks from "./nav-links";

const NavItems = () => {
  const navItems = [
    { path: "dashboard", label: "Dashboard", icon: Home },
    { path: "training-plans", label: "Training", icon: Dumbbell },
    { path: "meal-plans", label: "Meals", icon: UtensilsCrossed },
    { path: "calendar", label: "Calendar", icon: CalendarDays },
    { path: "profile", label: "Profile", icon: User },
  ];
  return (
    <div className='flex gap-1'>
      {navItems.map((item, idx) => (
        <div key={idx}>
          <NavLinks slug={item.path} icon={item.icon}>
            {item.label}
          </NavLinks>
        </div>
      ))}
    </div>
  );
};

export default NavItems;
