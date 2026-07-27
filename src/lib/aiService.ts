import { generateGeminiResponse } from './ai/providers/GeminiProvider';
import { BusinessState } from '../lib/businessData';


export interface AIContextPayload {
  selectedCustomer: string | null;
  selectedModule: string;
  selectedAction: string | null;
  selectedQuotation: string | null;
  selectedServiceCall: string | null;
  currentAIContext: string | null;
  businessSnapshot?: string;
  businessState: BusinessState; // Extend to include businessState
  // Add any additional properties if necessary
}

export interface AIResponse {
  summary: string;
  recommendation: string;
  source: 'gemini' | 'demo';
  errorMessage?: string;
}

export const buildAIContext = (payload: AIContextPayload) => {
  const businessState = payload.businessState; // Access businessState from payload

  const pendingQuotations = businessState.quotations.filter((q) => q.status === 'Pending').length;
  const scheduledServiceCalls = businessState.serviceVisits.filter((v) => v.status === 'Scheduled').length;
  const amcRenewals = businessState.amcs.filter((a) => a.status === 'Active' || a.status === 'Renewal Due').length;
  const recentActivity = businessState.timeline.slice(0, 5).map((e) => `• ${e.title}`).join('\n') || 'None';
  const criticalAlerts = businessState.notifications.filter((n) => n.tone === 'danger' || n.tone === 'warning').slice(0, 5).map((n) => `• ${n.title}`).join('\n') || 'None';
  const upcomingInstallations = businessState.serviceVisits
    .filter((v) => v.status === 'Scheduled' || v.status === 'Assigned')
    .slice(0, 3)
    .map((v) => `• ${v.customerName}`)
    .join('\n') || 'None';

  const snapshot = payload.businessSnapshot || `Quotations: ${pendingQuotations} pending · Service calls: ${scheduledServiceCalls} · AMC renewals: ${amcRenewals}`;

  return `
EXECUTIVE BUSINESS SNAPSHOT

Company:
Bhushancorp

Current module:
${payload.selectedModule}

Current action:
${payload.selectedAction || 'None'}

Selected customer:
${payload.selectedCustomer || 'None'}

Pending Quotations:
${pendingQuotations}

Scheduled Service Calls:
${scheduledServiceCalls}

AMC Renewals:
${amcRenewals}

Recent Activity
---------------
${recentActivity}

Critical Alerts
---------------
${criticalAlerts}

Upcoming Installations
----------------------
${upcomingInstallations}

Current Focus
-------------
${payload.currentAIContext || 'None'}

Business snapshot
----------------
${snapshot}
`;
};

export const generateDemoAIResponse = (prompt: string, payload: AIContextPayload): AIResponse => {
  const context = buildAIContext(payload);
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('board') || lowerPrompt.includes('report')) {
    return {
      summary: `Board-level review prepared using ${payload.selectedModule}. ${context}`,
      recommendation: 'Prioritize the highest-value renewal and escalation follow-up today.',
      source: 'demo',
    };
  }

  if (lowerPrompt.includes('customer') || lowerPrompt.includes('attention')) {
    return {
      summary: `Customer focus recommended for ${payload.selectedCustomer ?? 'the current account'} based on service risk and commercial health.`,
      recommendation: 'Route to customer intelligence and prepare a recovery action plan.',
      source: 'demo',
    };
  }

  if (lowerPrompt.includes('forecast') || lowerPrompt.includes('revenue')) {
    return {
      summary: 'Revenue outlook remains positive with renewal momentum across the active pipeline.',
      recommendation: 'Move the most qualified quotation into the sales workflow.',
      source: 'demo',
    };
  }

  if (lowerPrompt.includes('service') || lowerPrompt.includes('maintenance')) {
    return {
      summary: 'Service operations are stable, with one escalation requiring immediate operational oversight.',
      recommendation: 'Open the service workspace and keep the customer journey visible.',
      source: 'demo',
    };
  }

  return {
    summary: `Operational summary prepared for ${payload.selectedModule}. ${context}`,
    recommendation: 'Advance the recommended action into the relevant module.',
    source: 'demo',
  };
};

export const generateAIResponse = async (prompt: string, payload: AIContextPayload): Promise<AIResponse> => {
  const context = buildAIContext(payload);

  try {
    const geminiResponse = await generateGeminiResponse(prompt, context);
    return geminiResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    const demo = generateDemoAIResponse(prompt, payload);
    // attach error message for UI debugging/visibility
    (demo as AIResponse).errorMessage = error instanceof Error ? error.message : String(error);
    return demo as AIResponse;
}
};
