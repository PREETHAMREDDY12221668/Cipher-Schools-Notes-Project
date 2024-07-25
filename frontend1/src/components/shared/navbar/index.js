import React, { useState } from 'react';
import styles from './navbar.module.scss';
import { Icon } from '@iconify/react/dist/iconify.js';
import Input from "../../atoms/input";

function Navbar() {
    const [searchText, setSearchText] = useState("");

    return (
        <header className={styles.header}>
            <article className={styles.searchbar}>
                <Icon icon={"mingcute:search-line"} />
                <Input 
                    type="text" 
                    placeholder="Search Notes" 
                    className={styles["field"]}
                    value={searchText} 
                    onChange={e => setSearchText(e.target.value)} // Corrected here
                />
            </article>
            <div className={styles.theme}>
                <Icon icon={"hugeicons:sunset"} />
                
            </div>
        </header>
    );
}

export default Navbar;
