import { adminLinks } from "@/components/admin/AdminLinks";

export type LeftNavLinkGroup = {
    group: string;
    links: { href: string; title: string; key: string }[];
};

export default function SiteHomeLeftNav({ links, children }: { links: LeftNavLinkGroup[]; children?: React.ReactNode }) {
    return (
        <nav className="w-64 bg-bredagh-maroon text-bredagh-white flex-shrink-0 flex flex-col py-8 px-4 space-y-8">
            {children} 
            {links.map(group => (
                <div key={group.group}>
                    <div className="font-bold mb-2 text-lg">{group.group}</div>
                    <ul className="space-y-1 ml-2">
                        {group.links.map(link => (
                            <li key={link.key}>
                                <a href={link.href} className="hover:underline">
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            
        </nav>
    );
}




