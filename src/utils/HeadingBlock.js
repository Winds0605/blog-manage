import React from "react";
import Heading from "./Heading";


let style = {
    position: 'relative', top: '-44px', /*偏移值*/ display: 'block', height: '0', overflow: 'hidden'
}

export default ({ level, children }) => {
    let renderHtml = () => {
        if (children && children.length > 0) {
            const nodeValue = children[0].props.value;
            return (
                <Heading level={`h${level}`} id={nodeValue}>
                    <span className="title">{children}</span>
                    <a href={`${nodeValue}`} className={style}>
                    </a>
                </Heading>
            );
        } else {
            return <>{children}</>;
        }
    }

    return <>{renderHtml()}</>;
}

