import { useRef, useState } from "react";

import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
import Canvas from "./Canvas.js";
import "react-image-crop/dist/ReactCrop.css";

import ModalComp from "@root/components/ModalComp";
import './InputImageComp.css'

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 77;

const InputImageComp = (props) => {

    const imgRef = useRef(null);
    const inputRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");

    function onSelectFile(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                if (error) setError("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setError(`Image must be at least ${MIN_DIMENSION} x ${MIN_DIMENSION} pixels.`);
                    return setImgSrc("");
                }
            });
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    function onImageLoad(e) {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    function handleModalClose() {
        setImgSrc("")
        inputRef.current.value = null
    }

    return (
        <>
            <input className="comp__form__img" style={{ alignSelf: 'center' }} ref={inputRef} type="file" accept="image/*" onChange={onSelectFile} />

            {error && <p className="text-danger">{error}</p>}

            {imgSrc && (
                <ModalComp
                    title='Crop Image'
                    content={
                        <>
                            <div className="comp__form__img__box">
                                <h3 className="comp__form__img__box__title">Old Image</h3>
                                <img className="comp__form__img__box__img" src={props.oldImage} alt='IOGM - Personalize' />
                            </div>
                            <div className="comp__form__img__box">
                                <h3 className="comp__form__img__box__title">New Image</h3>

                                <ReactCrop crop={crop} onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)} circularCrop keepSelection aspect={ASPECT_RATIO} minWidth={MIN_DIMENSION}>
                                    <img className="comp__form__img__box__img" ref={imgRef} src={imgSrc} alt="Upload" onLoad={onImageLoad} />
                                </ReactCrop>
                            </div>
                            <button className="button bg-primary" onClick={() => {
                                Canvas(
                                    imgRef.current, // HTMLImageElement
                                    previewCanvasRef.current, // HTMLCanvasElement
                                    convertToPixelCrop(
                                        crop,
                                        imgRef.current.width,
                                        imgRef.current.height
                                    )
                                );
                                const dataUrl = previewCanvasRef.current.toDataURL();
                                props.handleInputOnChange(dataUrl);
                                handleModalClose();
                            }} > Crop Image </button>
                        </>
                    }
                    handleClose={handleModalClose}
                />

            )}
            {crop && (
                <canvas
                    ref={previewCanvasRef}
                    style={{
                        display: "none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 150,
                        height: 150,
                    }}
                />
            )}
        </>
    );
};
export default InputImageComp;
