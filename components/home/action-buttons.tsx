import Link from "next/link";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ActionButtons() {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <Link href="/scan">
          <Button className="w-full h-32 text-lg" variant="outline">
            <Camera className="mr-2 h-6 w-6" />
            Scan Ticket
          </Button>
        </Link>
      </Card>
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <Link href="/upload">
          <Button className="w-full h-32 text-lg" variant="outline">
            <Upload className="mr-2 h-6 w-6" />
            Upload Ticket
          </Button>
        </Link>
      </Card>
    </div>
  );
}