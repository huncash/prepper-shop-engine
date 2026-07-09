export {
  closeDataProvider,
  getProductById,
  getProducts,
  getUserByEmail,
  getUserById,
  getUsers,
  type Product,
  type User,
  type UserRole,
} from "@shared/lib/data-provider";
export { fetchProductById, fetchProducts } from "@shared/src/api-client";
export {
  AuthProvider,
  authProvider,
  type AdminLevel,
  type Session,
} from "@shared/auth/auth-provider";
export { BlogLayout, type BlogLayoutProps } from "@shared/src/components/BlogLayout";
export { BlogIndex, type BlogIndexProps } from "@shared/src/components/BlogIndex";
export { AdminLayout, type AdminLayoutProps } from "@shared/src/components/AdminLayout";
export { Navbar, type NavbarProps } from "@shared/src/components/layout/Navbar";
export { Footer, type FooterProps } from "@shared/src/components/layout/Footer";
export { Catalog, type CatalogProps } from "@shared/src/components/Catalog";
export { CtaSection, type CtaSectionProps } from "@shared/src/components/landing/CtaSection";
export { FeatureGrid, type Feature, type FeatureGridProps } from "@shared/src/components/landing/FeatureGrid";
export { HeroSection, type HeroSectionProps } from "@shared/src/components/landing/HeroSection";
export { LoginForm, type LoginFormProps } from "@shared/src/components/LoginForm";
export { ProductCard, type ProductCardProps } from "@shared/src/components/ProductCard";
export { ProductDetail, type ProductDetailProps } from "@shared/src/components/ProductDetail";
export { ContactForm, type ContactFormProps } from "@shared/src/components/ContactForm";
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
} from "@shared/src/components/ui/card";
export { Badge, badgeVariants, type BadgeProps } from "@shared/src/components/ui/badge";
export { Button, buttonVariants, type ButtonProps } from "@shared/src/components/ui/button";
export { cn } from "@shared/src/lib/utils";
