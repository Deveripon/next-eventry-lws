"use client";

import useDebounce from "@/app/_hooks/useDebounce";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Search = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams);

    const doSearch = useDebounce((searchQuery) => {
        if (searchQuery) {
            params.set(`query`, searchQuery);
        } else {
            params.delete(`query`);
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, 500);

    function handleSearch(searchQuery) {
        doSearch(searchQuery);
    }

    return (
        <div>
            <input
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
                type='text'
                placeholder='Search...'
                className='bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md'
            />
        </div>
    );
};

export default Search;
