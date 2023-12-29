"use client"

import fetcher from '@/app/lib/fetcher';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
export const LatestTasks = () => {

    const { data, error, isLoading } = useQuery({
        key: 'latestTasks', 
        queryFn: () => fetcher('/api/tasks')
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
      <div>
          Here is LatestTasks Page
          {
            data.tasks.map((task) => (
              <div key={task.id}>
                {task.title}
              </div>
            ))
          }
      </div>
    );
};