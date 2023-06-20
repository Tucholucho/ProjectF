import { useEffect, useRef } from "react";

export default function UploadWidget(props){
    const cloudinaryRef = useRef();
    contWidgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = windows.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudname: "Tucholucho",
                uploadPreset: "The Cook Book",
            },
            function (error, result){
                if(!error && result && result.event === "success") {
                    props.onUpload(result.info.secure_url);
                }
            }
        );
    }, [props]);

    return (
        <div className="widgetContainer">
            <span className="uploadText">Upload an Image</span>
            <br />
            <a onClick={() => widgetRef.current.open()}></a>
        </div>
    );
};