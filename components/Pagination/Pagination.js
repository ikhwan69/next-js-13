import React from 'react'
import propTypes from 'prop-types'
import styles from '../../styles/Component.module.css'

const Pagination = ({ activePage, pages, setActivePage }) => {
    //methods
    const getPages = () => {
        const elements = [];
        for (let i = 1; i <= pages; i++) {
            elements.push(
                <div
                    className={`${activePage === i ? `${styles.active}` : ""}`}
                    onClick={() => setActivePage(i)}
                    key={i}
                >{i < 10 ? `${i}` : i}
                </div>
            )
        }
        return elements;
    }

    return (
        <div className="grid grid-auto-columns h-20 mb-12">
            <div className={styles.pagination_wrapper}>
                <div
                    className={`${styles.pagination_arrow} ${activePage === 1 ? `${styles.inactive}` : ""}`}
                    onClick={() => activePage !== 1 && setActivePage((page) => page - 1)}
                >
                    {"<"}
                </div>
                {getPages()}
                <div
                    className={`${styles.pagination_arrow} ${activePage === pages ? `${styles.inactive}` : ""}`}
                    onClick={() => {
                        activePage !== pages && setActivePage((page) => page + 1)
                    }}
                >
                    {">"}{" "}
                </div>
            </div>
        </div>
    )
}

// activePage, setActivePage and pages will be passed down as props
Pagination.propTypes = {
    activePage: propTypes.number,
    pages: propTypes.number,
    setActivePage: propTypes.func,
}

export default Pagination