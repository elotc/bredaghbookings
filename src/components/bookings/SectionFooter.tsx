export default function SectionFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t p-4 bg-bredagh-maroon text-white flex flex-row justify-between items-center gap-4">
      {children}
    </div>
  );
}
