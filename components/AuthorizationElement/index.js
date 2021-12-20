import { Alert } from "antd";
import "antd/dist/antd.css";

import { Field, ErrorMessage } from "formik";
import classNames from "classnames";

export default function AuthorizationElement({ formName, title, type = "" }) {
    const fieldStyle = classNames(
        "border-[#949494] border w-full h-7 focus-visible:outline-none focus:border focus:border-[#949494] rounded-sm"
    );

    return (
        <div className="h-14">
            <span className="text-xs">{title}</span>
            <Field name={formName} className={fieldStyle} type={type} />
            <ErrorMessage
                name={formName}
                render={(msg) => (
                    <Alert
                        message={msg}
                        type="error"
                        showIcon
                        style={{ height: "25px" }}
                    ></Alert>
                )}
            />
        </div>
    );
}
