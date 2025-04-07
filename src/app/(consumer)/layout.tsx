import {ReactNode} from "react";
import Navbar from "@/app/(consumer)/components/Navbar";

type ConsumerLayoutProps = {
    children: ReactNode;
};

const ConsumerLayout = ({children}: ConsumerLayoutProps) => {
    return <>
        <Navbar />
        {children}
    </>;
}

export default ConsumerLayout;