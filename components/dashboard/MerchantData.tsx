import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

interface Merchant {
    id: string;
    name: string;
    station: string;
    tokensRedeemed: number;
    totalRedemptions: number;
}

interface MerchantDataProps {
    merchants: Merchant[];
}

export const MerchantData = ({ merchants }: MerchantDataProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Merchants</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {merchants.map((merchant) => (
                        <div key={merchant.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                                <ShoppingBag className="text-purple-500" />
                                <div>
                                    <p className="font-medium">{merchant.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Station: {merchant.station}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">{merchant.tokensRedeemed} Tokens</p>
                                <p className="text-sm text-muted-foreground">
                                    {merchant.totalRedemptions} Redemptions
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};