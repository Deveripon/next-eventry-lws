import Image from "next/image";
import logoImage from "@/public/assets/logo.svg";
import Link from "next/link";
import LoginLogoutButtons from "./LoginLogoutButtons";

const Navabr = () => {
    return (
        <nav>
            <div className='container flex justify-between items-center py-4'>
                <div className='nav-brand'>
                    <Link href='/'>
                        <Image
                            src={logoImage}
                            alt='Eventry'
                            className='h-[45px]'
                        />
                    </Link>
                </div>
                <ul className='flex gap-4 text-[#9C9C9C]'>
                    <li>About</li>
                    <li>Contact Us</li>
                </ul>
                <LoginLogoutButtons />
            </div>
        </nav>
    );
};

export default Navabr;
