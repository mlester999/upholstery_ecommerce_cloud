import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ActivityLog } from '../models/ActivityLog';

export const crudActivityLog = createApi({
  reducerPath: 'crudActivityLog',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['ActivityLogs'],
  endpoints: (builder) => ({
    getActivityLogs: builder.query<ActivityLog, void>({
      query: () => ({
        url: `activity-log/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['ActivityLogs'],
    }),
    getActivityLog: builder.query<ActivityLog, void>({
      query: (activityLogId) => ({
        url: `activity-log/${activityLogId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['ActivityLogs'],
    }),
  }),
});

export const {
  useGetActivityLogsQuery,
  useGetActivityLogQuery,
} = crudActivityLog;
