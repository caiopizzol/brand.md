export type Screen = "landing" | "flow" | "generating" | "output";

export type FlowStep = "seed" | "people" | "react" | "confirm";

export const FLOW_STEPS: FlowStep[] = ["seed", "people", "react", "confirm"];

export interface FlowData {
  // Step 1: The Seed (what only the founder knows)
  brandName: string;
  description: string;
  url: string;

  // Step 2: The People (who and why)
  audience: string;
  whyBuilding: string;
  dream: string;

  // Step 3: The Reaction (founder reacts to agent research)
  referenceBrands: string;
  toneWords: string[];
  brandAttributes: string[];
  neverCommunicate: string[];

  // Step 4: Confirm
  language: string;
}

// Agent research results shown in step 3
export interface AgentResearch {
  competitors: { name: string; positioning: string }[];
  marketGap: string;
  suggestedTones: string[];
  suggestedAttributes: string[];
  suggestedGuardrails: string[];
  pricePositioning: string;
  audienceInsights: string;
}

export const INITIAL_FLOW_DATA: FlowData = {
  brandName: "",
  description: "",
  url: "",
  audience: "",
  whyBuilding: "",
  dream: "",
  referenceBrands: "",
  toneWords: [],
  brandAttributes: [],
  neverCommunicate: [],
  language: "en",
};

export type ModuleId =
  | "tese"
  | "proposito"
  | "cultura"
  | "filosofia"
  | "manifesto"
  | "tom"
  | "vocab"
  | "frases"
  | "visual";

export type ModuleStatus = "pending" | "active" | "done";

export interface ModuleProgress {
  id: ModuleId;
  name: string;
  status: ModuleStatus;
}

export const MODULE_LIST: ModuleProgress[] = [
  { id: "tese", name: "Market Thesis", status: "pending" },
  { id: "proposito", name: "Purpose, Vision & Mission", status: "pending" },
  { id: "cultura", name: "Cultural Principles", status: "pending" },
  { id: "filosofia", name: "Philosophy", status: "pending" },
  { id: "manifesto", name: "Manifesto", status: "pending" },
  { id: "tom", name: "Tone of Voice", status: "pending" },
  { id: "vocab", name: "Vocabulary", status: "pending" },
  { id: "frases", name: "Phrase System", status: "pending" },
  { id: "visual", name: "Visual Direction", status: "pending" },
];

export interface DotBrand {
  id: string;
  name: string;
  tagline: string;
  modules: Record<ModuleId, ModuleContent>;
}

export interface ModuleContent {
  id: ModuleId;
  title: string;
  html: string;
}

export interface CreateBrandRequest {
  flowData: FlowData;
}

export interface CreateBrandResponse {
  id: string;
}

export interface GenerateEvent {
  type: "module_start" | "module_done" | "complete";
  moduleId?: ModuleId;
  content?: ModuleContent;
}
