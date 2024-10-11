/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SiderMenu from "./SiderMenu";
import { GiMusicalNotes } from "react-icons/gi";
export default function Sider() {
  return (
    <>
      <div className="bg-[#212121] h-[100vh] fixed w-[280px]">
        <div className="bg-[#1C1C1C] py-[25px] px-[20px]">
          <Link href="/" className="flex items-center">
            <GiMusicalNotes className="text-primary text-[30px] mr-[8px]"/>
            <div className="text-primary text-[25px] font-bold">Music Tdmu</div>
          </Link>
        </div>
        <SiderMenu />
      </div>
    </>
  )
}