"use client"

import React from 'react';
import styles from './table.module.css';
import Link from 'next/link';
import Pagination from '../pagination/pagination';


export const NingTable = ({data, count, viewUrl, deleteAction}) => {
    
    // 获取所有列的键
    const columns = data?.length > 0 ? Object.keys(data[0]) : [];

    return (
      <>
          <table className={styles.table} cellPadding={0} cellSpacing={0}>
            <thead>
                <tr>
                {columns?.map((column, index) => (
                    <td key={index}>{column}</td>
                ))}
                </tr>
            </thead>
            <tbody>
                {data?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                        <td key={colIndex}>{row[column]}</td>
                    ))}
                    <td>
                        <div className={styles.buttons}>
                        <Link href={viewUrl + row.id}>
                            <button className={`${styles.button} ${styles.view}`}>
                                View
                            </button>
                        </Link>
                        <form action={deleteAction}>
                            <input type="hidden" name="id" value={row.id} />
                            <button className={`${styles.button} ${styles.delete}`}>
                                Delete
                            </button>
                        </form>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
          </table>
          <Pagination count={count} />
      </>
    );
};