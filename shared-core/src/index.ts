export type { Product, User, UserRole } from "@shared/lib/types";
export { fetchProductById, fetchProducts } from "./api-client";
export {
  AuthProvider,
  authProvider,
  type AdminLevel,
  type Session,
} from "@shared/auth/auth-provider";
export { BlogLayout, type BlogLayoutProps } from "./components/BlogLayout";
export { BlogIndex, type BlogIndexProps } from "./components/BlogIndex";
export { AdminLayout, type AdminLayoutProps } from "./components/AdminLayout";
export { Navbar, type NavbarProps } from "./components/layout/Navbar";
export { Footer, type FooterProps } from "./components/layout/Footer";
export { Catalog, type CatalogProps } from "./components/Catalog";
export { CtaSection, type CtaSectionProps } from "./components/landing/CtaSection";
export { FeatureGrid, type Feature, type FeatureGridProps } from "./components/landing/FeatureGrid";
export { HeroSection, type HeroSectionProps } from "./components/landing/HeroSection";
export { LoginForm, type LoginFormProps } from "./components/LoginForm";
export { ProductCard, type ProductCardProps } from "./components/ProductCard";
export { ProductDetail, type ProductDetailProps } from "./components/ProductDetail";
export { ContactForm, type ContactFormProps } from "./components/ContactForm";
export {
  addItem,
  removeItem,
  getCartItems,
  clearCart,
  useCartStore,
  type CartItem,
} from "@shared/lib/cart-store";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./components/ui/card";
export { Badge, badgeVariants, type BadgeProps } from "./components/ui/badge";
export { Button, buttonVariants, type ButtonProps } from "./components/ui/button";
export { cn } from "./lib/utils";
