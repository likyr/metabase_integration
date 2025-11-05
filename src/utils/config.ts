import { defineMetabaseAuthConfig, type MetabaseAuthConfig } from '@metabase/embedding-sdk-react'

// US States
export const US_STATES = [
  { value: 'AK', label: 'AK - Alaska' },
  { value: 'AL', label: 'AL - Alabama' },
  { value: 'AR', label: 'AR - Arkansas' },
  { value: 'AZ', label: 'AZ - Arizona' },
  { value: 'CA', label: 'CA - California' },
  { value: 'CO', label: 'CO - Colorado' },
  { value: 'CT', label: 'CT - Connecticut' },
  { value: 'DE', label: 'DE - Delaware' },
  { value: 'FL', label: 'FL - Florida' },
  { value: 'GA', label: 'GA - Georgia' },
  { value: 'IA', label: 'IA - Iowa' },
  { value: 'ID', label: 'ID - Idaho' },
  { value: 'IL', label: 'IL - Illinois' },
  { value: 'IN', label: 'IN - Indiana' },
  { value: 'KS', label: 'KS - Kansas' },
  { value: 'KY', label: 'KY - Kentucky' },
  { value: 'LA', label: 'LA - Louisiana' },
  { value: 'MA', label: 'MA - Massachusetts' },
  { value: 'MD', label: 'MD - Maryland' },
  { value: 'ME', label: 'ME - Maine' },
  { value: 'MI', label: 'MI - Michigan' },
  { value: 'MN', label: 'MN - Minnesota' },
  { value: 'MO', label: 'MO - Missouri' },
  { value: 'MS', label: 'MS - Mississippi' },
  { value: 'MT', label: 'MT - Montana' },
  { value: 'NC', label: 'NC - North Carolina' },
  { value: 'NY', label: 'NY - New York' },
  { value: 'OH', label: 'OH - Ohio' },
  { value: 'TX', label: 'TX - Texas' },
] as const

// Users
export interface User {
  id: string
  name: string
  states: string[]
}

export const USERS: User[] = [
  {
    id: 'user1',
    name: 'User 1',
    states: ['MN', 'DE', 'NY'],
  },
  {
    id: 'user2',
    name: 'User 2',
    states: ['MD', 'IL', 'OH'],
  },
  {
    id: 'user3',
    name: 'User 3',
    states: ['GA', 'MI', 'NC'],
  },
]

export const getUserById = (userId: string): User | undefined => {
  return USERS.find(user => user.id === userId)
}

// Metabase Configuration
export interface MetabaseConfig {
  metabaseUrl: string
  apiKey: string
  questionIds: number[]
}

export const getMetabaseConfig = (): MetabaseConfig => {
  const metabaseUrl = (import.meta.env.VITE_METABASE_URL as string | undefined) || '/metabase'
  const apiKey = (import.meta.env.VITE_METABASE_API_KEY as string | undefined) || ''
  const questionIdsEnv = (import.meta.env.VITE_METABASE_QUESTION_IDS as string | undefined) || ''

  const questionIds = questionIdsEnv
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => Number(s))
    .filter((n) => Number.isFinite(n))

  return {
    metabaseUrl,
    apiKey,
    questionIds,
  }
}

export const createAuthConfig = (config: MetabaseConfig): MetabaseAuthConfig => {
  return defineMetabaseAuthConfig({
    metabaseInstanceUrl: config.metabaseUrl,
    apiKey: config.apiKey,
  })
}

export const buildStateParameters = (states: string[]): Record<string, string> => {
  const parameters: Record<string, string> = {}
  states.forEach((state, index) => {
    if (state) {
      parameters[`state${index + 1}`] = state
    }
  })
  return parameters
}

