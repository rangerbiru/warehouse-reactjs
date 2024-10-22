import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function LoadingSkeleton() {
  return (
    <Card className="w-full space-y-3 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-8 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-full rounded-lg">
          <div className="h-20 w-full rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
