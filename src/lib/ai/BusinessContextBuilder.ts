import { BusinessSnapshot } from "./BusinessSnapshot";

export function buildBusinessSnapshot(
    snapshot: BusinessSnapshot
): string {

    return `
EXECUTIVE BUSINESS SNAPSHOT

Revenue Today:
₹${snapshot.revenue.todayRevenue}

Monthly Revenue:
₹${snapshot.revenue.monthlyRevenue}

Pending Collections:
₹${snapshot.revenue.pendingCollections}

Sales

Open Quotations:
${snapshot.sales.quotationsOpen}

Pending Approval:
${snapshot.sales.quotationsPending}

Pipeline Value:
₹${snapshot.sales.pipelineValue}

Service

Open Calls:
${snapshot.service.openCalls}

Overdue Calls:
${snapshot.service.overdueCalls}

Engineer Utilization:
${snapshot.service.engineerUtilization}%

Highest Risk Customers

${snapshot.customerRisks
    .map(c => `
${c.customer}
Financial Risk: ${c.financialRisk}
Service Risk: ${c.serviceRisk}
Outstanding: ₹${c.outstandingAmount ?? 0}
Open Tickets: ${c.openTickets ?? 0}
AMC: ${c.amcStatus ?? "Unknown"}
`)
.join("\n")}
`;
}