import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface CarbonMetricsProps {
    data: {
        date: string;
        carbonSaved: number;
        tokens: number;
    }[];
}

export const CarbonMetrics = ({ data }: CarbonMetricsProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Carbon Savings Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <LineChart width={800} height={300} data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="carbonSaved" 
                        stroke="#10b981" 
                        name="Carbon Saved (g)"
                    />
                    <Line 
                        type="monotone" 
                        dataKey="tokens" 
                        stroke="#6366f1" 
                        name="Tokens Minted"
                    />
                </LineChart>
            </CardContent>
        </Card>
    );
};