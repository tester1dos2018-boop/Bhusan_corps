export interface CustomerRisk {
  customer: string;
  financialRisk: "Low" | "Medium" | "High";
  serviceRisk: "Low" | "Medium" | "High";
  outstandingAmount?: number;
  openTickets?: number;
  amcStatus?: string;
}

export interface RevenueSnapshot {
  todayRevenue: number;
  monthlyRevenue: number;
  pendingCollections: number;
}

export interface ServiceSnapshot {
  openCalls: number;
  overdueCalls: number;
  engineerUtilization: number;
}

export interface SalesSnapshot {
  quotationsOpen: number;
  quotationsPending: number;
  pipelineValue: number;
}

export interface BusinessSnapshot {
  revenue: RevenueSnapshot;
  sales: SalesSnapshot;
  service: ServiceSnapshot;
  customerRisks: CustomerRisk[];
}