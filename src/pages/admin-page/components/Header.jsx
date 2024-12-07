import Logo from '../../../assets/images/Logo.jpg';
import {Button} from "antd";

export default function Header() {
    return (
        <div className="flex flex-col md:flex-row h-auto bg-[#041025] py-1">
            {/* Left Section */}
            <div className=" md:basis-1/6 text-white flex gap-2 items-center justify-center md:justify-start p-2">
                <img className="max-h-10" src={Logo} alt="Logo" />
                <p className="text-sm md:text-base">Resolve</p>
            </div>

            <div className=" md:basis-5/6 p-2">
                <div className="text-center md:text-left text-white w-1/2 flex justify-between">
                   <p> Dashbord</p>
                    <Button>
                        <i className={"fa-solid fa-clock"}></i>
                        <p>New subject</p>
                    </Button>
                </div>
                <div className="text-center md:text-left text-white w-1/2 flex justify-between">

                </div>
            </div>
        </div>
    );
}
