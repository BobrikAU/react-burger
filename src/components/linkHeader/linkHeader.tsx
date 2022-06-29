import React, { ReactComponentElement } from "react";
import styles from './linkHeader.module.css';

function LinkHeader(props: { icon: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
                             children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
                             textColor: string;}) {
  return(
    <a href="#" className={`pr-5 pl-5 ${styles.link}`}>
      {props.icon}
      <p className={`text text_type_main-default ml-2 ${props.textColor === 'active' ? styles.active : styles.inactive}`}>{props.children}</p>
    </a>
  )
}

export default LinkHeader;
