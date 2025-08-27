import Image from "next/image";
import Link from "next/link";

export default function SiteLogo() {
    return (
        <Link href="/home">
            <Image
                src="/bredagh-crest.svg"
                alt="Bredagh Crest"
                width={48}
                height={48}
                className="mr-4 cursor-pointer"
            />
        </Link>
    );
}
