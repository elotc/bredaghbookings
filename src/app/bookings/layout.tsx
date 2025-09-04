import { BookingContextProvider } from "@/components/bookings/BookingContext";
import SiteHeader from "@/components/general/SiteHeader";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="flex min-h-screen min-w-full flex-col">
      <BookingContextProvider>
        {children}
      </BookingContextProvider>
    </div>
  );
}