import Image from "next/image";
import { useEffect, useState } from "react";
import axiosInstance from "../libs/axiosInstance";
import { Formik, Form, Field } from "formik";
import { Upload /* , message, Button */ } from "antd";

export default function avatar() {
    const [urlAva, setUrlAva] = useState("/public/avatar.png");
    const [file, setFile] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState("/avatar.png");
    useEffect(async () => {
        try {
            const result = await axiosInstance.get("/me/avatar");

            setUrlAva(`http://127.0.0.1:8000/${result.data}`);

            console.log(result, "result in result");
        } catch (error) {
            console.log(error.response, "error in useEffect");
            // console.log("Token wrong, user don`t signed");
        }
    }, []);

    // ***************************
    async function _handleSubmit(e) {
        console.log(file, "file in _handleSubmit");

        if (e.preventDefault) {
            e.preventDefault();
        }

        let formData = new FormData();
        formData.append("avatar", file);
        try {
            const result = await axiosInstance.post("/me/avatar", formData);
            console.log(result, "result in _handleSubmit");
            setUrlAva(`http://127.0.0.1:8000/${result.data}`);
            console.log(formData, "formData");
        } catch (error) {
            console.log(error.request, "error in _handleSubmit");
        }
        console.log("handle uploading-", file);
    }

    function _handleImageChange(e) {
        console.log("_handleImageChange");
        e.preventDefault();

        // let reader = new FileReader();
        let formFile = e.target.files[0];

        setFile(formFile);

        // --- Для відображення превью
        let reader = new FileReader();
        // let file = e.target.files[0];

        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };

        reader.readAsDataURL(formFile);
        // ---
    }
    // ***************************
    //#region
    // const OnSubmit = async (event) => {
    //     console.log(event.target, "event.target.form OnSubmit");
    //     event.preventDefault();
    //     const formData = new FormData(event.target.form);

    //     const result = await axiosInstance
    //         .post("/me/avatar", formData, {
    //             headers: {
    //                 "Content-type": "multipart/form-data",
    //             },
    //         })
    //         .then((res) => {
    //             console.log(`Success` + res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err.response, "err in catch");
    //         });
    // };
    // ***************************
    //#endregion

    // const $imagePreview = null;
    // if (imagePreviewUrl) {
    //   $imagePreview = (<img src={imagePreviewUrl} />);
    // } else {
    //   $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    // }

    return (
        <>
            <div>
                <span>
                    <h1>Avatar from server</h1>
                </span>
                <Image src={urlAva} width="140" height="140" />
            </div>
            <div>
                <form
                    onSubmit={/* OnSubmit */ (e) => _handleSubmit(e)}
                    id="formImage"
                >
                    <input
                        className="fileInput"
                        type="file"
                        name="avatar"
                        onChange={(e) => _handleImageChange(e)}
                    />
                    <button
                        className="submitButton"
                        type="submit"
                        // onClick={(e) => _handleSubmit(e)}
                    >
                        Upload Image
                    </button>
                </form>
            </div>
            <div>
                <span>
                    <h1>preview new avatar</h1>
                </span>
                <Image src={imagePreviewUrl} width="140" height="140" />
            </div>
            <Formik
                initialValues={{
                    avatar: null,
                }}
                // validationSchema={signinSchema}
                onSubmit={(e) => _handleSubmit(e)}
            >
                <Form>
                    <div className="flex flex-col">
                        <Field
                            name="avatar"
                            // className={fieldStyle}
                            as="input"
                            type="file"
                            // allowClear
                            onChange={(e) => _handleImageChange(e)}
                        />
                        <button
                            type="submit"
                            className="bg-[#54C1FF] text-white mt-11 h-7"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}
