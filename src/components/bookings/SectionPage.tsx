import SectionHeader from "./SectionHeader";
import SectionBody from "./SectionBody";
import SectionFooter from "./SectionFooter";

export default function SectionPage({
  thisPage,
  currentPage,
  pageTitles,
  bodyContent,
  footerContent
}: {
  thisPage: number;
  currentPage: number;
  pageTitles: string[];
  bodyContent: React.ReactNode;
  footerContent: React.ReactNode;
}) {
  return (
    <div className={`h-screen flex flex-col ${thisPage === currentPage ? "" : "hidden"}`} key={`Page${thisPage}`}>

      <SectionHeader>
        {pageTitles.map((title, idx) => (
          <span key={title} className={idx === thisPage - 1 ? "font-bold text-bredagh-accent" : "text-white"}>
            {title}
            {idx < pageTitles.length - 1 && <span className="mx-2 text-gray-400">/</span>}
          </span>
        ))}
      </SectionHeader>

      <div className="flex-1 overflow-y-auto">
        <SectionBody>{bodyContent}</SectionBody>
      </div>

      <SectionFooter>{footerContent}</SectionFooter>
    </div>
  );
}
