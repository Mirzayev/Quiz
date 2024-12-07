import {Button} from "antd";

export default function StudentList() {


    return (
        <div>
            <div className="row flex w-full justify-between px-5 my-[10px]">
                <h4 className={"text-xl font-semibold"}>Students list</h4>
                <Button className={"rounded-full px-4 py-2 h-full shadow-lg"}><p>Student directory</p>
                <i className={"fa-solid fa-arrow-right text-orange-400"}></i>
                </Button>
            </div>
            <div className="row flex items-center  px-5 py-[15px] gap-[15px]">
                <Button className={"px-6 py-1 bg-slate-100 rounded-full shadow-lg"}>Group1</Button>
                <Button className={"px-6 py-1 bg-slate-100 rounded-full shadow-lg"}>Group2</Button>
                <Button className={"px-6 py-1 bg-slate-100 rounded-full shadow-lg"}>Group3</Button>
            </div>
        </div>
    )
}