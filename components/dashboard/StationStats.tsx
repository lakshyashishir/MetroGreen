import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface StationStatsProps {
    data: {
        station: string;
        carbonSaved: number;
        users: number;
        redemptions: number;
    }[];
}

export const StationStats = ({ data }: StationStatsProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Station Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <BarChart width={800} height={300} data={data}>
                    <XAxis dataKey="station" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="carbonSaved" fill="#10b981" name="Carbon Saved (g)" />
                    <Bar dataKey="users" fill="#6366f1" name="Active Users" />
                    <Bar dataKey="redemptions" fill="#d946ef" name="Redemptions" />
                </BarChart>
            </CardContent>
        </Card>
    );
};