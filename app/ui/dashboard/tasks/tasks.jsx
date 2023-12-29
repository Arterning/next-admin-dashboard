"use client"

import fetcher from '@/app/lib/fetcher';
import { useQuery } from '@tanstack/react-query';
import styles from "./tasks.module.css";
import React from 'react';
import { MdSupervisedUserCircle } from 'react-icons/md';
export const LatestTasks = () => {

    const { data, error, isLoading } = useQuery({
        key: 'latestTasks', 
        queryFn: () => fetcher('/api/tasks')
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Latest Tasks</h2>
        <div className={styles.taskCards}>
          {
            data.tasks.map((task) => (
              // must provide key
              <TaskCard key={task.id} task={task}/>
            ))
          }
        </div>
      </div>
    );
};

const TaskCard = ({ task }) => {
  return (
      <div className={styles.taskCard}>
        <MdSupervisedUserCircle size={24} />
        <div className={styles.taskCardText}>
          <span className={styles.taskCardTitle}>{task.title}</span>
          <span className={styles.taskCardCenter}>{task.description}</span>
          <span className={styles.taskCardDetail}>
            Detail
          </span>
        </div>
      </div>
  );
}