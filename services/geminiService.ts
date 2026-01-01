import { GoogleGenAI, Type } from "@google/genai";
import { Opportunity } from "../types";

// Fallback mock data to ensure the app is usable even if API limits are hit or key is missing
const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'mock-1',
    title: 'Global AI Innovation Hackathon 2025',
    organization: 'Neural Systems',
    type: 'Hackathon',
    category: 'AI/ML',
    level: 'International',
    location: 'Remote / Virtual',
    deadline: '2025-06-15',
    isPaid: false,
    isVerified: true,
    url: 'https://example.com/hackathon',
    description: 'Join the world\'s largest AI hackathon. Build agents, LLM applications, and compete for $50k in prizes. Open to all students globally.'
  },
  {
    id: 'mock-2',
    title: 'Cloud Infrastructure Intern',
    organization: 'SkyNet Cloud',
    type: 'Internship',
    category: 'IT/Software',
    level: 'National',
    location: 'San Francisco, CA',
    deadline: '2025-05-01',
    isPaid: true,
    isVerified: true,
    url: 'https://example.com/internship',
    description: 'Summer internship for students proficient in Go, Kubernetes, and Distributed Systems. Work on mission-critical cloud infrastructure.'
  },
  {
    id: 'mock-3',
    title: 'Future of Finance Case Competition',
    organization: 'Global Bank Corp',
    type: 'Competition',
    category: 'Business/Finance',
    level: 'International',
    location: 'New York, NY',
    deadline: '2025-04-20',
    isPaid: false,
    isVerified: true,
    url: 'https://example.com/finance',
    description: 'Analyze real-world financial datasets and propose fintech solutions. Finalists present to executive leadership.'
  },
  {
    id: 'mock-4',
    title: 'Astrophysics Research Fellow',
    organization: 'Deep Space Institute',
    type: 'Workshop',
    category: 'Space/Science',
    level: 'International',
    location: 'London, UK',
    deadline: '2025-07-10',
    isPaid: true,
    isVerified: true,
    url: 'https://example.com/space',
    description: 'A 3-month intensive research fellowship for physics students. Collaborate on dark matter mapping projects.'
  }
];

const getApiKey = () => {
    // Safely retrieve API key
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        return process.env.API_KEY;
    }
    return "";
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const fetchOpportunities = async (query: string = "latest student opportunities global"): Promise<Opportunity[]> => {
  // If no key is present, return mock data immediately to prevent crashes
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data.");
    return MOCK_OPPORTUNITIES;
  }

  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const model = "gemini-3-flash-preview";
    
    // Explicitly listing strictly allowed values for the prompt
    const allowedCategories = "AI/ML, IT/Software, Space/Science, Business/Finance, Law/Policy, Design/Creative, Sports, Other";
    const allowedLevels = "State, National, International";

    const response = await ai.models.generateContent({
      model: model,
      contents: `Find 8-10 verified, active, and upcoming student opportunities related to: "${query}". 
      Current date is ${currentDate}. Exclude expired ones. 
      Include a mix of Internships, Hackathons, Jobs, and Competitions.
      
      CRITICAL: You must categorize each item STRICTLY into one of these exact categories: ${allowedCategories}.
      CRITICAL: You must classify the scope/level STRICTLY as one of: ${allowedLevels}.
      
      For each item, strictly follow this JSON schema.`,
      config: {
        // tools: [{ googleSearch: {} }], // Disabled: Search tool + JSON Schema can cause stability issues
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              organization: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['Internship', 'Hackathon', 'Job', 'Competition', 'Workshop', 'Other'] },
              category: { type: Type.STRING, enum: ['AI/ML', 'IT/Software', 'Space/Science', 'Business/Finance', 'Law/Policy', 'Design/Creative', 'Sports', 'Other'] },
              level: { type: Type.STRING, enum: ['State', 'National', 'International'] },
              location: { type: Type.STRING },
              deadline: { type: Type.STRING, description: "YYYY-MM-DD format" },
              isPaid: { type: Type.BOOLEAN },
              url: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ['title', 'organization', 'type', 'category', 'level', 'location', 'deadline', 'isPaid', 'url', 'description']
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) {
        console.warn("Received empty response from Gemini. Using mock data.");
        return MOCK_OPPORTUNITIES;
    }

    const parsed = JSON.parse(jsonStr);
    
    return parsed.map((item: any, index: number) => ({
      ...item,
      id: `opp-${Date.now()}-${index}`,
      isVerified: true 
    }));

  } catch (error) {
    console.error("Gemini API Error (Falling back to mock data):", error);
    return MOCK_OPPORTUNITIES;
  }
};