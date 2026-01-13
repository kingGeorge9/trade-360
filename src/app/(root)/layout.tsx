import { Navbar, Footer } from "@/components";
import LoadingProvider from "@/components/LoadingProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <Navbar />
      {children}
      <Footer />
    </LoadingProvider>
  );
}
