import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@tanstack/react-router";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; tone?: "brand" | "accent" | "paper" };

const tones = {
  brand: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
  paper: "bg-card text-card-foreground",
};

export function GameButton({ children, tone = "brand", className = "", ...props }: Props) {
  return <button className={`game-button ${tones[tone]} ${className}`} {...props}>{children}</button>;
}

export function GameLink({ children, to, tone = "brand" }: { children: ReactNode; to: "/" | "/aprenda" | "/exemplos" | "/explore" | "/desafio" | "/gabarito" | "/chefao"; tone?: Props["tone"] }) {
  return <Link to={to} className={`game-button ${tones[tone]}`}>{children}</Link>;
}
