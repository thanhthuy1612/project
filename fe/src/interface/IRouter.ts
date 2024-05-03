import React from "react";

export interface IRouter {
  id: number;
  path: string;
  component: React.FC;
  layout?: React.FC<{ children: React.ReactNode }>;
}

export enum DateFormatType {
  Date = 0,
  FullDate = 1,
}
